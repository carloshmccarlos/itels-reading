import TextComponent from "@/components/TextComponent";
import type { CardProps } from "@/types/interface";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

function HorizontalCard({ article, className }: CardProps) {
	return (
		<Link
			href={`/article/${article.id}`}
			className={`shadow-sm p-4 lg:p-0 group hover:shadow-lg bg-gray-100 hover:bg-gray-50 transition-all duration-500 rounded-sm flex flex-row w-full ${className}`}
		>
			<div
				className={
					" rounded-l-sm relative w-1/4 lg:w-1/3 overflow-hidden aspect-square"
				}
			>
				<Image
					src={article.imageUrl}
					alt={article.title}
					fill
					className="rounded-sm lg:rounded-r-none object-cover transform group-hover:scale-105 transition-transform duration-200"
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
				/>
			</div>

			<TextComponent article={article} className={"w-3/4 lg:w-2/3"} />
		</Link>
	);
}

// Memoize the component to prevent unnecessary re-renders
export default memo(HorizontalCard);
