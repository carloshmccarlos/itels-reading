import type { Article } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function getAllArticles(): Promise<Article[]> {
	return prisma.article.findMany({
		include: {
			Category: true,
		},
		orderBy: {
			date: "desc",
		},
	});
}

export async function getArticleById(id: string): Promise<Article | null> {
	return prisma.article.findUnique({
		where: { id },
		include: {
			Category: true,
		},
	});
}

export async function getArticlesByCategory(
	categoryId: string,
): Promise<Article[]> {
	return prisma.article.findMany({
		where: {
			categoryId,
		},
		include: {
			Category: true,
		},
		orderBy: {
			date: "desc",
		},
	});
}

export async function searchArticles(query: string): Promise<Article[]> {
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
			date: "desc",
		},
	});
}
