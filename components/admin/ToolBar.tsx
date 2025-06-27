import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { transformCategoryName } from "@/lib/utils";
import type { Category } from "@prisma/client";
import type { Table } from "@tanstack/react-table";
import Link from "next/link";
import { useRef } from "react";

interface Props<TData> {
	value: string;
	onChange: (value: string) => void;
	categories: Category[];
	handleDeleteSelected: () => void;
	isDeleting: boolean;
	selectedRowCount: number;
	table: Table<TData>;
}

export default function ToolBar<TData>({
	value,
	onChange,
	categories,
	handleDeleteSelected,
	isDeleting,
	selectedRowCount,
	table,
}: Props<TData>) {
	const searchRef = useRef<HTMLInputElement>(null);
	return (
		<div className="flex w-full items-center justify-between">
			<div className="flex items-center relative w-1/4 ">
				<Input ref={searchRef} placeholder="Search title..." />
				<Button
					className={"bg-slate-950 rounded-l-none absolute top-0 right-0"}
					type={"button"}
					onClick={() => {
						table.getColumn("title")?.setFilterValue(searchRef.current?.value);
					}}
				>
					Search
				</Button>
			</div>
			<div className="flex items-center justify-end space-x-4">
				<Select onValueChange={onChange} value={value}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filter by category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						{categories.map((category) => (
							<SelectItem key={category.name} value={category.name}>
								{transformCategoryName(category.name)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button asChild>
					<Link href="/admin/create">Create New Article</Link>
				</Button>
				<Button
					variant="destructive"
					onClick={handleDeleteSelected}
					disabled={isDeleting || selectedRowCount <= 0}
				>
					Delete Selected ({selectedRowCount})
				</Button>
			</div>
		</div>
	);
}
