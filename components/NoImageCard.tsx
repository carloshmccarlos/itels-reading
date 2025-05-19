import TextComponent from "@/components/TextComponent";
import type { CardProps } from "@/types/article";
import Image from "next/image";
import Link from "next/link";

function NoImageCard({ article, priority, className }: CardProps) {
	return (
		<Link
			href={`/article/${article.id}`}
			className={`flex flex-col flex-grow shadow-sm hover:shadow-lg group
			 bg-gray-100  transition-all duration-500 rounded-sm  ${className}`}
		>
			<TextComponent article={article} />
		</Link>
	);
}

export default NoImageCard;
