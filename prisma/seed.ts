import * as fs from "node:fs";
import { categories } from "@/data/sample-data";
import { prisma } from "@/lib/prisma";

async function main() {
	console.log("Start seeding ...");

	// Seed Categories
	/*for (const category of categories) {
		await prisma.category.create({
			data: {
				name: category.name,
			},
		});
	}
	console.log("Categories seeded.");*/

	const articles = JSON.parse(fs.readFileSync("./data/articles.json", "utf-8"));

	// Seed Articles
	for (const article of articles) {
		await prisma.article.create({
			data: {
				title: article.title,
				imageUrl: article.imageUrl,
				content: article.content,
				description: article.description,
				readTimes: article.readTimes,
				categoryName: article.categoryName,
			},
		});
	}
	console.log("Articles seeded.");

	console.log("Seeding finished.");
}

main()
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
