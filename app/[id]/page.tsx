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

// Generate metadata for SEO
export async function generateMetadata({
	params,
}: ArticlePageParams): Promise<Metadata> {
	const article = await getArticle(params.id);

	if (!article) {
		return {
			title: "Article Not Found",
		};
	}

	return {
		title: article.title,
		description: article.description,
		openGraph: {
			title: article.title,
			description: article.description,
			type: "article",
			publishedTime: article.publishedDate,
			authors: article.author ? [article.author] : undefined,
			images: article.imageUrl ? [article.imageUrl] : [],
		},
		twitter: {
			card: "summary_large_image",
			title: article.title,
			description: article.description,
		},
	};
}

// Add static params generation for static optimization
export async function generateStaticParams() {
	// In a real app, fetch all valid article IDs
	const articleIds = ["1", "2", "3"]; // Replace with your article IDs
	return articleIds.map((id) => ({
		id,
	}));
}

// This is a mock function - in a real application, you would fetch from an API or database
async function getArticle(id: string): Promise<Article | null> {
	try {
		// In production, use proper caching and error handling
		const article = {
			id: "1",
			title:
				"All living things emit an eerie glow that is snuffed out upon death",
			category: "Life",
			description:
				"Growing evidence suggests a source of nutrition might be right under our noses. But how important are such aeronutrients – and can we harness them to better treat deficiencies?",
			content: "Your full article content here...",
			publishedDate: "2024-03-20",
			author: "John Doe",
			imageUrl: "/content-image/1.png",
			readingTime: "5 min read",
			tags: ["science", "biology", "research"],
		};

		return article.id === id ? article : null;
	} catch (error) {
		console.error("Error fetching article:", error);
		return null;
	}
}

// Loading component for Suspense
function ArticleSkeleton() {
	return (
		<div className="animate-pulse py-8 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
			<div className="h-4 bg-gray-200 rounded w-32 mb-4" />
			<div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
			<div className="h-4 bg-gray-200 rounded w-full mb-2" />
			<div className="h-4 bg-gray-200 rounded w-2/3" />
		</div>
	);
}

// Separate Article Content component for better organization
function ArticleContent({ article }: { article: Article }) {
	return (
		<article className="py-8 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
			<header className="mb-8">
				<div className="flex items-center gap-4 mb-4">
					<div className="text-sm font-medium text-blue-600">
						{article.category}
					</div>
					{article.readingTime && (
						<div className="text-sm text-gray-500">{article.readingTime}</div>
					)}
				</div>

				<h1 className="text-4xl font-bold mb-4">{article.title}</h1>

				<div className="flex items-center gap-4 mb-4">
					{article.author && (
						<div className="text-sm text-gray-700">By {article.author}</div>
					)}
					<time className="text-sm text-gray-500">
						{new Date(article.publishedDate).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
				</div>

				<p className="text-lg text-gray-600 mb-4">{article.description}</p>

				{article.tags && (
					<div className="flex gap-2 flex-wrap">
						{article.tags.map((tag) => (
							<span
								key={tag}
								className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</header>

			{article.imageUrl && (
				<div className="relative w-full mb-6 aspect-[10/6]">
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

			<div className="prose prose-lg max-w-none">{article.content}</div>

			<div className="mt-8 pt-8 border-t border-gray-200">
				<h2 className="text-2xl font-bold mb-4">Share this article</h2>
				<div className="flex gap-4">
					{/* Add your social sharing buttons here */}
				</div>
			</div>
		</article>
	);
}

export default async function ArticlePage({
	params,
	searchParams,
}: ArticlePageParams) {
	return (
		<Suspense fallback={<ArticleSkeleton />}>
			<ArticleContent article={(await getArticle(params.id)) ?? notFound()} />
		</Suspense>
	);
}
