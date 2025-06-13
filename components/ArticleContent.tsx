"use client";

import MarkdownRenderer from "@/components/MarkdownRender";
import { Button } from "@/components/ui/button";
import { SmilePlus, Star } from "lucide-react";
import Image from "next/image";

import {
	getUserArticleStats,
	incrementReadCount,
	toggleMarkArticle,
} from "@/data/article-stats";
import { transformCategoryName } from "@/lib/utils";
import type { ArticleWithCategory } from "@/types/interface";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
	article: ArticleWithCategory;
}

function ArticleContent({ article }: Props) {
	const showCategoryName = transformCategoryName(article.Category?.name || "");
	const [isMarked, setIsMarked] = useState(false);
	const [readTimes, setReadTimes] = useState(0);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Load user stats for this article
	useEffect(() => {
		async function loadStats() {
			try {
				const stats = await getUserArticleStats(article.id);
				setIsMarked(stats.marked);
				setReadTimes(stats.readTimes);
				setIsLoggedIn(stats.isLoggedIn);
			} catch (error) {
				console.error("Failed to load article stats:", error);
			}
		}

		loadStats().then();
	}, [article.id]);

	// Handle marking/unmarking the article
	const handleToggleMark = async () => {
		if (!isLoggedIn) {
			toast.error("You must be logged in to mark articles");
			return;
		}

		try {
			setIsLoading(true);
			const result = await toggleMarkArticle(article.id);
			setIsMarked(result.marked);
			toast.success(result.marked ? "Article marked" : "Article unmarked");
		} catch (error) {
			console.error("Failed to toggle mark:", error);
			toast.error("Failed to update mark status");
		} finally {
			setIsLoading(false);
		}
	};

	// Handle incrementing read count
	const handleIncrementReadCount = async () => {
		if (!isLoggedIn) {
			toast.error("You must be logged in to track read times");
			return;
		}

		try {
			setIsLoading(true);
			const result = await incrementReadCount(article.id);
			setReadTimes(result.times);
			toast.success(`You've read this article ${result.times} times`);
		} catch (error) {
			console.error("Failed to increment read count:", error);
			toast.error("Failed to update read count");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<article className="py-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto relative">
			<header className="mb-8">
				<div className="flex items-center gap-4 mb-4">
					<div className="text-lg font-bold text-red-700 ">
						{showCategoryName}
					</div>
				</div>

				<h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
					{article.title}
				</h1>

				<div className="flex items-center justify-between gap-4 mb-4">
					<time className="text-sm text-gray-500">
						{new Date(article.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
				</div>

				{article.description && (
					<p className="text-lg md:text-xl text-gray-600 leading-relaxed">
						{article.description}
					</p>
				)}
			</header>

			{article.imageUrl && (
				<div className=" relative w-full mb-8 aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
					<Image
						src={article.imageUrl}
						alt={article.title}
						fill
						className="object-cover"
						priority
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
					/>
				</div>
			)}

			<MarkdownRenderer content={article.content} />

			<div className={"flex gap-4 py-16 justify-end"}>
				<Button
					variant="outline"
					className="cursor-pointer flex items-center gap-2"
					onClick={handleToggleMark}
					disabled={isLoading}
				>
					<Star className={`w-4 h-4 ${isMarked ? "fill-yellow-400" : ""}`} />
					{isMarked ? "Marked" : "Mark"}
				</Button>

				<Button
					variant="outline"
					className="cursor-pointer flex items-center gap-2"
					onClick={handleIncrementReadCount}
					disabled={isLoading}
				>
					<SmilePlus className="w-4 h-4" />
					Finished {readTimes} times
				</Button>
			</div>
		</article>
	);
}

export default ArticleContent;
