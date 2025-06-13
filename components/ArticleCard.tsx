import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { ArticleWithCategory } from "@/data/user";
import { transformCategoryName } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
	article: ArticleWithCategory;
	readCount: number | null;
}

export default function ArticleCard({ article, readCount }: ArticleCardProps) {
	const categoryName = transformCategoryName(article.Category?.name || "");

	return (
		<Card className="pt-0 overflow-hidden hover:shadow-lg transition-shadow">
			<div className="relative w-full h-48">
				<Image
					src={article.imageUrl || "/placeholder-image.jpg"}
					alt={article.title}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
			<CardHeader className="pb-2">
				<div className="flex justify-between items-center">
					<span className="text-sm font-medium text-red-700">
						{categoryName}
					</span>
					{readCount && (
						<span className="text-sm text-gray-500">
							Read {readCount} times
						</span>
					)}
				</div>
				<CardTitle className="line-clamp-2 text-lg">
					<Link href={`/article/${article.id}`} className="hover:text-blue-700">
						{article.title}
					</Link>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription className="line-clamp-2">
					{article.description}
				</CardDescription>
				<div className="mt-4 text-xs text-gray-500">
					{new Date(article.createdAt).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>
			</CardContent>
		</Card>
	);
}
