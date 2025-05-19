import ArticleContent from "@/components/ArticleContent";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { getAllArticles, getArticleById } from "@/lib/data/sample-articles";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Extend the Article type with more SEO-friendly fields
interface Article {
	id: string;
	title: string;
	category: string;
	description: string;
	content: string;
	publishedDate: string;
	author?: string;
	imageUrl?: string;
	readingTime?: string;
	tags?: string[];
}

// Define the params type for the page
type ArticlePageParams = {
	params: {
		id: string;
	};
	searchParams?: { [key: string]: string | string[] | undefined };
};

// Separate Article Content component for better organization

export default async function ArticlePage({ params }: ArticlePageParams) {
	return (
		<Suspense fallback={<ArticleSkeleton />}>
			<ArticleContent article={getArticleById(params.id) ?? notFound()} />
		</Suspense>
	);
}
