"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
	className?: string;
	type: "row" | "col";
}

function NavLinks({ className, type }: Props) {
	let pathname = usePathname();
	if (!pathname) pathname = "/home";
	const pathnameList = pathname.split("/");

	const links = ["/", "/about", "/services", "/contact"];

	return (
		<div className={cn("flex gap-4", className)}>
			{links.map((link) => {
				if (type === "col") {
					return (
						<Link
							key={link}
							href={link}
							className={`border-b border-b-gray-100 ${pathnameList[1] === link.slice(1) && "border-black border-l-6"}  py-2 px-4 text-xl font-semibold text-gray-900 hover:bg-gray-100`}
						>
							{link === "/"
								? "Home"
								: link.slice(1, 2).toUpperCase() + link.slice(2)}
						</Link>
					);
				}

				if (type === "row") {
					return (
						<Link
							key={link}
							href={link}
							className={`${pathnameList[1] === link.slice(1) && "border-black border-b-4"} border-none py-2 px-4 text-2xl font-black text-gray-900 hover:bg-gray-100`}
						>
							{link === "/"
								? "Home"
								: link.slice(1, 2).toUpperCase() + link.slice(2)}
						</Link>
					);
				}
			})}
		</div>
	);
}

export default NavLinks;
