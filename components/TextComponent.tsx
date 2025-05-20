import { cn } from "@/lib/utils";
import type { ArticleWithCategory } from "@/types/interface";

interface Props {
	className?: string;
	article: ArticleWithCategory;
	titleSize?: string;
}

async function TextComponent({ className, article, titleSize }: Props) {
	return (
		<>
			<div
				className={cn(
					"py-2 px-4 flex flex-col flex-grow gap-2 flex-wrap transform group-hover:scale-101" +
						" transition-all duration-300",
					className,
				)}
			>
				<div className="text-lg font-bold text-red-700 ">
					{article.Category.name}
				</div>
				<h2 className={`${titleSize ? titleSize : "text-lg"}    font-bold `}>
					<span
						className=" bg-[length:0%_2px]   bg-gradient-to-r from-pink-700 to-violet-700
					bg-no-repeat bg-left-bottom transition-all duration-700 group-hover:bg-[length:100%_2px]
					group-hover:bg-[position:left_bottom]"
					>
						{article.title}
					</span>
				</h2>

				{titleSize && (
					<p className="text-gray-600 line-clamp-2 sm:line-clamp-3">
						{article.description}
					</p>
				)}
				<time className="text-sm text-gray-500 mt-auto">
					{new Date(article.createdAt).toLocaleDateString()}
				</time>
			</div>
		</>
	);
}

export default TextComponent;
