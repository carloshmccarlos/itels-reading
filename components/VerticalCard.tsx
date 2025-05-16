"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import TextComponent from "@/components/TextComponent";
import type { CardProps } from "@/types/article";

function VerticalCard({ article, priority, className }: CardProps) {
	return (
		<Link
			href={`/${article.id}`}
			className={`shadow-sm hover:shadow-lg group bg-gray-100  transition-all duration-500 rounded-sm flex flex-col h-full ${className}`}
		>
			<div className="rounded-t-sm relative aspect-[10/7] sm:aspect-[3/2] overflow-hidden">
				<Image
					src={article.imageUrl}
					alt={article.title}
					fill
					className="object-cover rounded-t-sm transform group-hover:scale-105 transition-transform duration-200"
					sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
					priority={priority}
				/>
			</div>

			<TextComponent article={article} />
		</Link>
	);
}

export default memo(VerticalCard);
