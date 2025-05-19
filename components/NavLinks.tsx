"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { Category } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
	className?: string;
	type: "row" | "col";
	categories: Category[];
}

function NavLinks({ className, type, categories }: Props) {
	const pathname = usePathname();

	const currentCategory = pathname.split("/")[2];

	return (
		<ScrollArea className={cn("h-screen w-full", className)}>
			<div className="flex flex-col space-y-1 p-2">
				<Link
					href="/"
					className={cn(
						"rounded-sm px-3 py-2 text-xl font-semibold transition-colors",
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
							key={category.id}
							href={`/category/${category.id}`}
							className={cn(
								"rounded-sm px-3 py-2 text-xl font-semibold transition-colors",
								currentCategory === category.id
									? "bg-gray-100 border-l-8 border-black"
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
