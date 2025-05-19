import type { Article } from "@/types/article";

import Image from "next/image";

function ArticleContent({ article }: { article: Article }) {
	return (
		<article className="py-8 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
			<header className="mb-8">
				<div className="flex items-center gap-4 mb-4">
					<div className="text-sm font-medium text-blue-600">
						{article.category}
					</div>
				</div>

				<h1 className="text-4xl font-bold mb-4">{article.title}</h1>

				<div className="flex items-center gap-4 mb-4">
					<time className="text-sm text-gray-500">
						{new Date(article.publishedDate).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
				</div>

				{article.description && (
					<p className="text-lg text-gray-600 mb-4">{article.description}</p>
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

			<div className="mt-8 pt-8 border-t border-gray-200">
				<h2 className="text-2xl font-bold mb-4">Share this article</h2>
				<div className="flex gap-4">
					{/* Add your social sharing buttons here */}
				</div>
			</div>
		</article>
	);
}

export default ArticleContent;
