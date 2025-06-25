"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import type { Article, Category } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ArticleWithCategory = Article & {
	Category: Category | null;
};

export default function ManageArticlesPage() {
	const [articles, setArticles] = useState<ArticleWithCategory[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchArticles().then();
	}, []);

	async function fetchArticles() {
		try {
			setLoading(true);
			const response = await fetch("/api/articles/admin");
			if (!response.ok) throw new Error("Failed to fetch articles");
			const data = await response.json();
			setArticles(data);
		} catch (error) {
			console.error("Error fetching articles:", error);
			toast.error("Failed to load articles");
		} finally {
			setLoading(false);
		}
	}

	async function handleDeleteArticle(id: number) {
		if (!confirm("Are you sure you want to delete this article?")) {
			return;
		}

		try {
			const response = await fetch(`/api/articles/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to delete article");
			}

			toast.success("Article deleted successfully");
			// Refresh the article list
			await fetchArticles();
		} catch (error) {
			console.error("Error deleting article:", error);
			toast.error(
				error instanceof Error ? error.message : "Failed to delete article",
			);
		}
	}

	const columns: ColumnDef<ArticleWithCategory>[] = [
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
				<div className="text-left">{row.original.Category?.name || "None"}</div>
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
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Manage Articles</h1>
					<p className="text-muted-foreground mt-1">
						Edit or delete existing articles
					</p>
				</div>
				<Link
					href="/admin/create"
					className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md transition-colors"
				>
					Create New Article
				</Link>
			</div>

			{loading ? (
				<div className="flex justify-center py-8">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary">
						{""}
					</div>
				</div>
			) : (
				<DataTable columns={columns} data={articles} />
			)}
		</div>
	);
}
