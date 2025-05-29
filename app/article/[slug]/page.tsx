import ArticleContent from "@/components/ArticleContent";
import Spinner from "@/components/Spinner";
import { getArticleById } from "@/data/article";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Update the Props interface to reflect that params is a Promise
interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export default async function ArticlePage({ params }: Props) {
	const { slug } = await params;

	const id = slug.split("-")[0];

	const article = await getArticleById(Number(id));

	if (!article) {
		notFound();
	}

	return (
		<Suspense fallback={<Spinner />}>
			{/* Pass the resolved article data to ArticleContent */}
			<ArticleContent article={article} />
		</Suspense>
	);
}
