import HorizontalCard from "@/components/HorizontalCard";
import VerticalCard from "@/components/VerticalCard";

import BigCard from "@/components/BigCard";
import NoImageCard from "@/components/NoImageCard";
import Footer from "@/components/Footer";
import { getAllArticles, sampleArticles } from "@/lib/data/sample-articles";
import type { Article } from "@/types/article";

export default function Home() {
	const articles: Article[] = getAllArticles();

	return (
		<>
			<main className="min-h-screen">
				{/* Latest Card Section */}
				<div className="max-w-[2000px] mx-auto px-2 sm:px-4 lg:px-8 xl:px-16 2xl:px-32 py-2 sm:py-2 lg:py-4">
					<h2 className="text-3xl font-bold mb-6">Latest Articles</h2>
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
							<VerticalCard key={article.title} article={article} />
						))}
					</div>

					{/* Hottest Section */}
					<h2 className="text-3xl font-bold mb-6">Hottest Articles</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						{/* Two Big Cards on the left */}
						<div className="flex items-center justify-center">
							<BigCard article={articles[0]} />
						</div>

						{/* NoImageCards on the right */}
						<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
							{articles.slice(0, 6).map((article) => (
								<NoImageCard key={article.title} article={article} />
							))}
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}

// Generate static metadata
export const metadata = {
	title: "Latest Articles",
	description: "Discover our latest articles and stay informed",
};
