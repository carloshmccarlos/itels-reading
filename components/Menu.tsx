"use client";

import LoginButton from "@/components/LoginButton";
import MenuIcon from "@/components/MenuIcon";
import NavLinks from "@/components/NavLinks";
import RegisterButton from "@/components/RegisterButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import type { Category } from "@/lib/generated/prisma";
import { useRef } from "react";

interface Props {
	categories: Category[];
}

function Menu({ categories }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<Sheet>
			<SheetTrigger className={"text-start"}>
				<div className={" hover:cursor-pointer hover:bg-gray-300"}>
					<MenuIcon />
				</div>
			</SheetTrigger>
			<SheetContent
				side={"left"}
				className={"w-3/4 xl:w-1/4  lg:w-1/3 md:w-1/2"}
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<SheetHeader>
					<SheetTitle className={"text-2xl font-bold text-center"}>
						MENU
					</SheetTitle>
				</SheetHeader>

				<div className="w-full flex items-center px-4 relative bg-gray-100 py-4 group">
					<Input
						ref={inputRef}
						type="text"
						placeholder="Search..."
						className="bg-white rounded-none border-2 border-black w-full
               hover:border-3 hover:border-gray-700
               focus:border-3
               group-hover:border-3 group-hover:border-gray-700"
						autoFocus={false}
					/>
					<Button
						type="button"
						className="absolute top-4 right-4 cursor-pointer
                group-hover:bg-gray-700 hover:bg-gray-700
               rounded-none border-transparent"
					>
						Search
					</Button>
				</div>

				{/* login and register function, hidden for now, realised later*/}
				{/*	<div className={"flex justify-center items-center gap-2 md:gap-4"}>
					<RegisterButton />
					<LoginButton />
				</div>*/}

				<NavLinks
					categories={categories}
					type={"col"}
					className={"flex flex-col py-2 px-4 "}
				/>
			</SheetContent>
		</Sheet>
	);
}

export default Menu;
