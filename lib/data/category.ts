import type { Category } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function getAllCategories(): Promise<Category[]> {
	return prisma.category.findMany({
		orderBy: {
			name: "asc",
		},
	});
}
export async function getCategoryByName(
	name: string,
): Promise<Category | null> {
	return prisma.category.findUnique({
		where: { name },
	});
}

export async function createCategory(name: string): Promise<Category> {
	return prisma.category.create({
		data: { name },
	});
}

export async function updateCategory(name: string): Promise<Category> {
	return prisma.category.update({
		where: { name },
		data: { name },
	});
}
