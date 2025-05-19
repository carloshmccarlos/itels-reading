import ArticleContent from "@/components/ArticleContent";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { getArticleById } from "@/lib/data/sample-articles";

import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
	params: {
		id: string;
	};
}
// Separate Article Content component for better organization

export default function ArticlePage({ params }: Props) {
	return (
		<Suspense fallback={<ArticleSkeleton />}>
			<ArticleContent article={getArticleById(params.id) ?? notFound()} />
		</Suspense>
	);
}
