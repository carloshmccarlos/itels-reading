import type { Prisma } from "@/lib/generated/prisma";

export interface CardProps {
	article: ArticleWithCategory;
	className?: string;
	readCount?: number | null;
}

export type ArticleWithCategory = Prisma.ArticleGetPayload<{
	include: {
		Category: true;
	};
}>;
