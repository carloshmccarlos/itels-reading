import { prisma } from "@/lib/prisma";
import type { ArticleWithCategory } from "@/types/interface";

export async function getArticleById(
	id: string,
): Promise<ArticleWithCategory | null> {
	return prisma.article.findUnique({
		where: { id: id },
		include: {
			Category: true,
		},
	});
}

export async function getArticlesByCategory(
	categoryName: string,
): Promise<ArticleWithCategory[]> {
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

export async function searchArticles(
	query: string,
): Promise<ArticleWithCategory[]> {
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

export async function getLatestArticles(): Promise<ArticleWithCategory[]> {
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

export async function getHottestArticles(): Promise<ArticleWithCategory[]> {
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
