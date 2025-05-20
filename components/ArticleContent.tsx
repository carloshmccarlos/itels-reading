import MarkdownRenderer from "@/components/MarkdownRender";
import { Button } from "@/components/ui/button";

import type { ArticleWithCategory } from "@/types/interface";
import { Share2 } from "lucide-react";
import Image from "next/image";

interface Props {
	article: ArticleWithCategory;
}

function ArticleContent({ article }: Props) {
	return (
		<article className="py-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto relative">
			<header className="mb-8">
				<div className="flex items-center gap-4 mb-4">
					<div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
						{article.Category.name}
					</div>
				</div>

				<h1 className="text-4xl font-bold mb-4 leading-tight">
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
					<Button
						variant="outline"
						className="cursor-pointer flex items-center gap-2"
					>
						<Share2 className="w-4 h-4" />
						Share
					</Button>
				</div>

				{article.description && (
					<p className="text-lg text-gray-600 mb-4 leading-relaxed">
						{article.description}
					</p>
				)}
			</header>

			{article.imageUrl && (
				<div className="relative w-full mb-8 aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
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

			<MarkdownRenderer markdownContent={article.content} />
		</article>
	);
}

export default ArticleContent;
