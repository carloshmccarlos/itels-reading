import type { Category } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function getAllCategories(): Promise<Category[]> {
	return prisma.category.findMany({
		include: {
			articles: true,
		},
		orderBy: {
			name: "asc",
		},
	});
}

export async function getCategoryById(id: string): Promise<Category | null> {
	return prisma.category.findUnique({
		where: { id },
		include: {
			articles: true,
		},
	});
}

export async function getCategoryByName(
	name: string,
): Promise<Category | null> {
	return prisma.category.findUnique({
		where: { name },
		include: {
			articles: true,
		},
	});
}

export async function createCategory(name: string): Promise<Category> {
	return prisma.category.create({
		data: { name },
		include: {
			articles: true,
		},
	});
}

export async function updateCategory(
	id: string,
	name: string,
): Promise<Category> {
	return prisma.category.update({
		where: { id },
		data: { name },
		include: {
			articles: true,
		},
	});
}

export async function deleteCategory(id: string): Promise<Category> {
	return prisma.category.delete({
		where: { id },
		include: {
			articles: true,
		},
	});
}
