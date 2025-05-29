import TextComponent from "@/components/TextComponent";
import type { CardProps } from "@/types/interface";

import { generateToPath } from "@/lib/utils";
import Link from "next/link";

function NoImageCard({ article, className }: CardProps) {
	if (!article) {
		return null;
	}
	const toPath = generateToPath(article.title);
	return (
		<Link
			href={`/article/${article.id}-${toPath}`}
			className={` flex flex-col flex-grow shadow-sm hover:shadow-lg group
			 bg-gray-100  transition-all duration-500 rounded-sm  ${className}`}
		>
			<TextComponent article={article} />
		</Link>
	);
}

export default NoImageCard;
