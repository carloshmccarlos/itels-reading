import ArticleContent from "@/components/ArticleContent";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { getArticleById } from "@/lib/data/sample-articles"; // Assuming getArticleById is an async function

import { notFound } from "next/navigation";
import { Suspense } from "react";

// Update the Props interface to reflect that params is a Promise
interface Props {
	params: Promise<{
		id: string;
	}>;
}

export default async function ArticlePage({ params }: Props) {
	// Await the params to access its properties
	const { id } = await params;

	// Assuming getArticleById is an asynchronous function, await its result
	const article = await getArticleById(id);

	// notFound() is a Next.js function that throws an error to render the not-found page.
	// We check for the article's existence before passing it to ArticleContent.
	if (!article) {
		notFound();
	}

	return (
		<Suspense fallback={<ArticleSkeleton />}>
			{/* Pass the resolved article data to ArticleContent */}
			<ArticleContent article={article} />
		</Suspense>
	);
}
