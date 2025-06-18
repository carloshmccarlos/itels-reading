import ArticleContent from "@/components/ArticleContent";
import Spinner from "@/components/Spinner";
import { getArticleById, increaseReadTimes } from "@/data/article";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { cache } from "react";

// Cache the article fetching to avoid redundant database calls
const getArticle = cache(async (id: number) => {
	return getArticleById(id);
});

// Cache the read count increment to ensure it only happens once per request
const incrementReadCount = cache(async (id: number) => {
	return increaseReadTimes(id);
});

// Update the Props interface to reflect that params is a Promise
interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export default async function ArticlePage({ params }: Props) {
	const { slug } = await params;

	if (slug.length === 1) {
		notFound();
	}

	const id = slug.split("-")[0];
	const articleId = Number(id);

	// Fetch article data and increment read count in parallel
	const [article] = await Promise.all([
		getArticle(articleId),
		incrementReadCount(articleId),
	]);

	if (!article) {
		notFound();
	}

	return (
		<Suspense fallback={<Spinner />}>
			<Link href={`/article/edit/${id}`}>Edit</Link>
			{/* Pass the resolved article data to ArticleContent */}
			<ArticleContent article={article} />
		</Suspense>
	);
}
