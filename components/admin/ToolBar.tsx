import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { transformCategoryName } from "@/lib/utils";
import type { Category } from "@prisma/client";
import Link from "next/link";

interface Props {
	value: string;
	onChange: (value: string) => void;
	categories: Category[];
	handleDeleteSelected: () => void;
	isDeleting: boolean;
	selectedRowCount: number;
}

export default function ToolBar({
	value,
	onChange,
	categories,
	handleDeleteSelected,
	isDeleting,
	selectedRowCount,
}: Props) {
	return (
		<div className="flex w-full items-center justify-end space-x-4">
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
	);
}
