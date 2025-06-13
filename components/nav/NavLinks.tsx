"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { Category } from "@/lib/generated/prisma";
import { categoryToPath, cn, transformCategoryName } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
	className?: string;
	type: "row" | "col";
	categories: Category[];
}

function NavLinks({ className, type, categories }: Props) {
	const pathname = usePathname();
	let currentCategory = pathname.split("/")[2];

	if (currentCategory) {
		currentCategory = currentCategory.replace("-", "_");
		// string1-string2;
		if (!categories.some((category) => category.name === currentCategory)) {
			const pathnameList = pathname.split("/")[2].split("-");
			currentCategory = `${pathnameList[1]}_${pathnameList[2]}`;
		}
	}

	console.log(currentCategory);

	return (
		<ScrollArea className={cn("h-9/10 w-full", className)}>
			<div className="flex flex-col space-y-1 p-2">
				<Link
					href="/"
					className={cn(
						" rounded-sm px-3 py-2 text-xl font-semibold transition-colors border-b border-gray-100",
						pathname === "/"
							? "bg-gray-100 border-l-8 border-l-black"
							: "hover:bg-gray-100",
					)}
				>
					Home
				</Link>
				{type === "col" &&
					categories.map((category) => (
						<Link
							key={category.name}
							href={`/category/${categoryToPath(category.name)}`}
							className={cn(
								"rounded-sm px-3 py-2 text-xl font-semibold transition-colors border-b border-gray-100",
								currentCategory === category.name
									? "bg-b-100 border-l-8 border-l-black"
									: "hover:bg-gray-100",
							)}
						>
							{transformCategoryName(category.name)}
						</Link>
					))}
			</div>
		</ScrollArea>
	);
}

export default NavLinks;
