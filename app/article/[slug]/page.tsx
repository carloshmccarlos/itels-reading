import ArticleContent from "@/components/ArticleContent";
import Spinner from "@/components/Spinner";
import { getArticleById } from "@/data/article";
import Link from "next/link";
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

	if (slug.length === 1) {
		notFound();
	}

	const id = slug.split("-")[0];

	const article = await getArticleById(Number(id));

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
