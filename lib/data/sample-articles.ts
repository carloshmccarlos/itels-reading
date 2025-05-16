import type { Article } from "@/types/article";

export const sampleArticles: Article[] = [
	{
		id: "1",
		title: "Scientists Discover New Method to Predict Solar Flares",
		category: "Space",
		description:
			"A groundbreaking study reveals a new technique using artificial intelligence to predict dangerous solar flares up to 24 hours before they occur, potentially revolutionizing space weather forecasting.",
		imageUrl: "/content-image/1.png",
		slug: "new-method-predict-solar-flares",
		publishedDate: "2024-03-20",
	},
	{
		id: "2",
		title: "Breakthrough in Quantum Computing Achieves New Milestone",
		category: "Technology",
		description:
			"Researchers have successfully demonstrated quantum supremacy in a new class of quantum computers, solving complex problems that would take traditional supercomputers thousands of years.",
		imageUrl: "/content-image/1.png",
		slug: "quantum-computing-milestone",
		publishedDate: "2024-03-19",
	},
	{
		id: "3",
		title: "Ancient Human Footprints Rewrite History of Americas",
		category: "Archaeology",
		description:
			"New archaeological findings in New Mexico suggest humans arrived in North America thousands of years earlier than previously thought, challenging existing migration theories.",
		imageUrl: "/content-image/1.png",
		slug: "ancient-footprints-america",
		publishedDate: "2024-03-18",
	},
	{
		id: "4",
		title: "Revolutionary Battery Technology Promises Week-Long Phone Charge",
		category: "Technology",
		description:
			"A new type of lithium-sulfur battery technology could extend smartphone battery life to over a week, while being more environmentally friendly than current solutions.",
		imageUrl: "/content-image/1.png",
		slug: "revolutionary-battery-technology",
		publishedDate: "2024-03-17",
	},
	{
		id: "5",
		title: "Ocean Cleanup Project Shows Promising Results",
		category: "Environment",
		description:
			"The latest ocean cleanup initiative has successfully removed over 100,000 tons of plastic from the Pacific Ocean, showing promising results for marine ecosystem recovery.",
		imageUrl: "/content-image/1.png",
		slug: "ocean-cleanup-results",
		publishedDate: "2024-03-16",
	},
	{
		id: "6",
		title: "AI System Masters Complex Mathematical Proofs",
		category: "Technology",
		description:
			"A new artificial intelligence system has demonstrated the ability to solve complex mathematical theorems and generate proofs that have eluded mathematicians for decades.",
		imageUrl: "/content-image/1.png",
		slug: "ai-masters-math-proofs",
		publishedDate: "2024-03-15",
	},
	{
		id: "7",
		title: "New Species of Deep-Sea Creatures Found in Pacific",
		category: "Marine Biology",
		description:
			"Marine biologists have discovered previously unknown species of bioluminescent creatures living in the deepest parts of the Pacific Ocean, expanding our understanding of deep-sea life.",
		imageUrl: "/content-image/1.png",
		slug: "new-deep-sea-species",
		publishedDate: "2024-03-14",
	},
	{
		id: "8",
		title: "Climate Change Affecting Bird Migration Patterns",
		category: "Environment",
		description:
			"Recent studies show significant changes in bird migration patterns across continents, raising concerns about the impact of climate change on wildlife behavior.",
		imageUrl: "/content-image/1.png",
		slug: "climate-change-bird-migration",
		publishedDate: "2024-03-13",
	},
	{
		id: "9",
		title: "Breakthrough in Alzheimer's Treatment Shows Promise",
		category: "Health",
		description:
			"Clinical trials of a new drug combination have shown unprecedented success in slowing the progression of Alzheimer's disease in early-stage patients.",
		imageUrl: "/content-image/1.png",
		slug: "alzheimers-treatment-breakthrough",
		publishedDate: "2024-03-12",
	},
	{
		id: "10",
		title: "Mars Rover Makes Surprising Discovery About Ancient Water",
		category: "Space",
		description:
			"NASA's latest Mars rover has uncovered evidence suggesting that liquid water existed on the red planet much more recently than previously believed.",
		imageUrl: "/content-image/1.png",
		slug: "mars-rover-water-discovery",
		publishedDate: "2024-03-11",
	},
];

// Helper function to get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
	return sampleArticles.find((article) => article.slug === slug);
}

// Helper function to get article by id
export function getArticleById(id: string): Article | undefined {
	return sampleArticles.find((article) => article.id === id);
}

// Helper function to get articles by category
export function getArticlesByCategory(category: string): Article[] {
	return sampleArticles.filter((article) => article.category === category);
}

// Helper function to get latest articles
export function getLatestArticles(limit?: number): Article[] {
	const sortedArticles = [...sampleArticles].sort(
		(a, b) =>
			new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
	);
	return limit ? sortedArticles.slice(0, limit) : sortedArticles;
}

export function getAllArticles(): Article[] {
	return sampleArticles;
}
