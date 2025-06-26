"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";

import ToolBar from "@/components/admin/ToolBar";
import { transformCategoryName } from "@/lib/utils";
import type { Article, Category } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ArticleWithCategory = Article & {
	Category: Category | null;
};

async function fetchArticles(): Promise<ArticleWithCategory[]> {
	const response = await fetch("/api/articles/admin");
	if (!response.ok) {
		throw new Error("Failed to fetch articles");
	}
	return response.json();
}

async function deleteArticle(id: number) {
	const response = await fetch(`/api/articles/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Failed to delete article");
	}
}

async function deleteArticles(ids: number[]) {
	const response = await fetch("/api/articles", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ids }),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Failed to delete articles");
	}
}

export function ArticleTable() {
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [filteredCategory, setFilteredCategory] = useState("all");
	const queryClient = useQueryClient();
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await fetch("/api/category");
				if (!response.ok) {
					return;
				}

				const categories: Category[] = await response.json();

				setCategories(categories);
			} catch (error) {
				console.error(error);
				toast.error("Failed to get categories.");
			}
		};

		getCategories();
	}, []);

	const {
		data: articles,
		isLoading,
		isError,
		error,
	} = useQuery<ArticleWithCategory[], Error>({
		queryKey: ["articles"],
		queryFn: fetchArticles,
	});

	const showedArticles =
		filteredCategory && filteredCategory !== "all" && articles
			? articles.filter(
					(article) => article.Category?.name === filteredCategory,
				)
			: articles;

	const deleteMutation = useMutation({
		mutationFn: deleteArticle,
		onSuccess: () => {
			toast.success("Article deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["articles"] }).then();
		},
		onError: (error) => {
			console.error("Error deleting article:", error);
			toast.error(
				error instanceof Error ? error.message : "Failed to delete article",
			);
		},
	});

	const deleteArticlesMutation = useMutation({
		mutationFn: deleteArticles,
		onSuccess: () => {
			toast.success("Articles deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["articles"] });
			setRowSelection({});
		},
		onError: (error) => {
			console.error("Error deleting articles:", error);
			toast.error(
				error instanceof Error ? error.message : "Failed to delete articles",
			);
		},
	});

	function handleDeleteArticle(id: number) {
		if (!confirm("Are you sure you want to delete this article?")) {
			return;
		}
		deleteMutation.mutate(id);
	}

	const columns: ColumnDef<ArticleWithCategory>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "id",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "desc")
						}
					>
						Id
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
		},
		{
			accessorKey: "title",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Title
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
		},
		{
			accessorKey: "Category.name",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Category
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="text-left">
					{transformCategoryName(row.original.categoryName || "") || "None"}
				</div>
			),
		},
		{
			accessorKey: "readTimes",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Read Count
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="font-mono text-left">{row.original.readTimes}</div>
			),
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Created
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="font-mono text-left">
					{new Date(row.original.createdAt).toLocaleDateString()}
				</div>
			),
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const article = row.original;
				return (
					<div className="flex space-x-2">
						<Button asChild size="icon" variant="outline">
							<Link href={`/admin/edit/${article.id}`}>
								<Edit className="h-4 w-4" />
							</Link>
						</Button>
						<Button
							size="icon"
							variant="outline"
							className="text-red-600 hover:bg-red-100 hover:text-red-700"
							onClick={() => handleDeleteArticle(article.id)}
							disabled={deleteMutation.isPending}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				);
			},
		},
	];

	useEffect(() => {
		if (showedArticles) {
			const selectedIds = Object.keys(rowSelection)
				.filter((key) => rowSelection[key])
				.map((key) => showedArticles[Number(key)].id);
			console.log("Selected article IDs:", selectedIds);
		}
	}, [rowSelection, showedArticles]);

	const selectedRowCount = Object.values(rowSelection).filter(Boolean).length;

	function handleDeleteSelected() {
		if (
			!confirm(`Are you sure you want to delete ${selectedRowCount} articles?`)
		) {
			return;
		}
		if (showedArticles) {
			const selectedIds = Object.keys(rowSelection)
				.filter((key) => rowSelection[key])
				.map((key) => showedArticles[Number(key)].id);
			deleteArticlesMutation.mutate(selectedIds);
		}
	}

	if (isLoading) {
		return (
			<div className="flex justify-center py-8">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary">
					{""}
				</div>
			</div>
		);
	}

	if (isError) {
		toast.error(error.message);
		return (
			<div className="flex justify-center py-8 text-red-500">
				Failed to load articles.
			</div>
		);
	}

	return (
		<div>
			<DataTable
				columns={columns}
				data={showedArticles ?? []}
				rowSelection={rowSelection}
				onRowSelectionChange={setRowSelection}
				toolbar={
					<ToolBar
						value={filteredCategory}
						onChange={setFilteredCategory}
						categories={categories}
						handleDeleteSelected={handleDeleteSelected}
						isDeleting={deleteArticlesMutation.isPending}
						selectedRowCount={selectedRowCount}
					/>
				}
			/>
		</div>
	);
}
