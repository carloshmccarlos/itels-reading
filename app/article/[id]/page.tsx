import ArticleContent from "@/components/ArticleContent";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { getArticleById } from "@/lib/data/sample-articles";

import { notFound } from "next/navigation";
import { Suspense } from "react";

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
