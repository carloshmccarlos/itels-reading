"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth/auth-client";
import { BookMarked, Power, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
	const session = authClient.useSession();
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className=" flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-black hover:text-white ">
				<User className="h-8 w-8 font-bold" />
				<span className={"font-bold text-xl hidden lg:block"}>
					{session?.data?.user?.name || "Profile"}
				</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild className={" cursor-pointer text-[16px]"}>
					<Link href="/user/collection">
						<BookMarked className=" h-4 w-4 inline" />
						Collection
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild className={" cursor-pointer text-[16px]"}>
					<Link href="/user/profile">
						<User className="h-4 w-4 inline" />
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				{/*<DropdownMenuItem
					onClick={() =>
						authClient.signOut({
							fetchOptions: {
								onSuccess: () => {
									router.push("/");
								},
							},
						})
					}
					className=" text-destructive focus:text-destructive cursor-pointer text-[16px]"
				>
					<Power className={"h-4 w-4 inline"} />
					Sign out
				</DropdownMenuItem>*/}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
