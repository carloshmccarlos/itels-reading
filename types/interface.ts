import type { Prisma } from "@/lib/generated/prisma";

export interface CardProps {
	article: ArticleWithCategory;
	className?: string;
}

export type ArticleWithCategory = Prisma.ArticleGetPayload<{
	include: {
		Category: true;
	};
}>;
