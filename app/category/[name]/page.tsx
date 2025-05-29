import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import BigCard from "@/components/BigCard";
import Footer from "@/components/Footer";
import HorizontalCard from "@/components/HorizontalCard";
import NoImageCard from "@/components/NoImageCard";
import Spinner from "@/components/Spinner";
import VerticalCard from "@/components/VerticalCard";
import { getArticlesByCategory } from "@/data/article";
import { transformCategoryName } from "@/lib/utils";

interface Props {
	params: Promise<{
		name: string;
	}>;
}

export default async function ArticleByCategory({ params }: Props) {
	const { name: categoryName } = await params;

	const articles = await getArticlesByCategory(categoryName);

	if (!articles || articles.length === 0) {
		notFound();
	}

	return (
		<main className="min-h-screen">
			<div className="max-w-[2000px] mx-auto px-2 sm:px-4 lg:px-8 xl:px-16 2xl:px-32 py-2 sm:py-2 lg:py-4">
				<h2 className="lg:text-4xl text-3xl font-bold mb-6">
					{transformCategoryName(categoryName)}
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 items-stretch">
					{/* Latest Big Card  */}
					<div className="lg:col-span-4 ">
						<BigCard article={articles[0]} />
					</div>

					{/* Horizontal Cards */}
					<div className="lg:col-span-2 grid grid-cols-1 gap-4 sm:gap-6 ">
						<HorizontalCard article={articles[1]} />
						<HorizontalCard article={articles[2]} />
					</div>
				</div>

				{/* Vertical Card Section */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-12">
					{articles.slice(3, 9).map((article) => (
						<VerticalCard
							key={`${article.title}-VerticalCard`}
							article={article}
						/>
					))}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{/* Two Big Cards on the left */}
					<div className="flex items-center justify-center">
						<BigCard article={articles[9]} />
					</div>

					{/* NoImageCards on the right */}
					<div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-3 gap-4">
						{articles.slice(10, 17).map((article) => (
							<NoImageCard
								key={`${article.title}${article.id}`}
								article={article}
							/>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</main>
	);
}
