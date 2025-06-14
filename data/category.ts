import type { Category, CategoryName } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function getAllCategories() {
	return prisma.category.findMany({
		orderBy: {
			name: "asc",
		},
	});
}
export async function getCategoryByName(
	name: CategoryName,
): Promise<Category | null> {
	return prisma.category.findUnique({
		where: { name },
	});
}
