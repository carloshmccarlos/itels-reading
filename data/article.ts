import { prisma } from "@/lib/prisma";

export async function getArticleById(id: number) {
	return prisma.article.findUnique({
		where: { id: id },
		include: {
			Category: true,
		},
	});
}

export async function getArticlesByCategory(categoryName: string, skip = 0, take = 17) {
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
		skip,
		take,
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

export async function countArticlesByCategory(categoryName: string) {
	return prisma.article.count({
		where: {
			categoryName: categoryName,
		},
	});
}
