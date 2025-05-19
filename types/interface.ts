import type { Article } from "@/lib/generated/prisma";

export interface CardProps {
	article: Article;
	className?: string;
}
