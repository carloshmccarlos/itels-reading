import { articles, categories } from "@/lib/data/sample-data";
import { prisma } from "@/lib/prisma";

async function main() {
	console.log("Start seeding ...");

	// Seed Categories
	for (const category of categories) {
		// Prisma automatically handles new Date() for createdAt and updatedAt if default values are set in schema
		// However, sample-data provides them, so we can use them or let Prisma handle it.
		// For simplicity, if your schema has defaults like `default(now())`, you can omit them here.
		// Otherwise, ensure the dates from sample-data are correctly formatted if needed.
		await prisma.category.create({
			data: {
				id: category.id,
				name: category.name,
				// Assuming your Prisma schema for Category has createdAt and updatedAt fields
				// and they accept Date objects or are automatically handled.
				createdAt: category.createdAt,
				updatedAt: category.updatedAt,
			},
		});
	}
	console.log("Categories seeded.");

	// Seed Articles
	for (const article of articles) {
		await prisma.article.create({
			data: {
				id: article.id,
				title: article.title,
				imageUrl: article.imageUrl,
				content: article.content,
				description: article.description,
				readTimes: article.readTimes,
				// Assuming your Prisma schema for Article has createdAt and updatedAt fields
				createdAt: article.createdAt,
				updatedAt: article.updatedAt,
				categoryId: article.categoryId,
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
