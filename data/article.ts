import { prisma } from "@/lib/prisma";

export async function deleteArticle() {
	return prisma.article.deleteMany();
}
export async function createArticle() {
	return prisma.article.createMany({
		data: data,
	});
}

export async function getArticleById(id: number) {
	return prisma.article.findUnique({
		where: { id: id },
		include: {
			Category: true,
		},
	});
}

export async function getArticlesByCategory(categoryName: string) {
	return prisma.article.findMany({
		where: {
			categoryName: categoryName,
		},
		include: {
			Category: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
}

export async function searchArticles(query: string) {
	return prisma.article.findMany({
		where: {
			OR: [
				{
					title: {
						contains: query,
						mode: "insensitive",
					},
				},
			],
		},
		include: {
			Category: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
}

export async function getLatestArticles() {
	return prisma.article.findMany({
		take: 9,
		include: {
			Category: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
}

export async function getHottestArticles() {
	return prisma.article.findMany({
		take: 7,
		include: {
			Category: true,
		},
		orderBy: {
			readTimes: "desc",
		},
	});
}
