"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { Category } from "@/lib/generated/prisma";
import { cn, generateToPath } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
	className?: string;
	type: "row" | "col";
	categories: Category[];
}

function NavLinks({ className, type, categories }: Props) {
	const pathname = usePathname();

	const currentCategory = pathname.split("/")[2]; // string1-string2;

	return (
		<ScrollArea className={cn("h-4/5 w-full", className)}>
			<div className="flex flex-col space-y-1 p-2">
				<Link
					href="/"
					className={cn(
						" rounded-sm px-3 py-2 text-xl font-semibold transition-colors border-b border-gray-100",
						pathname === "/"
							? "bg-gray-100 border-l-8 border-black"
							: "hover:bg-gray-100",
					)}
				>
					Home
				</Link>
				{type === "col" &&
					categories.map((category) => (
						<Link
							key={category.name}
							href={`/category/${generateToPath(category.name)}`}
							className={cn(
								"rounded-sm px-3 py-2 text-xl font-semibold transition-colors border-b border-gray-100",
								currentCategory === generateToPath(category.name)
									? "bg-gray-100 border-l-8 border-l-black"
									: "hover:bg-gray-100",
							)}
						>
							{category.name}
						</Link>
					))}
			</div>
		</ScrollArea>
	);
}

export default NavLinks;
