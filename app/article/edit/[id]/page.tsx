"use client";

import { $Enums } from "@/lib/generated/prisma";
import type { CategoryName } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Define form validation schema
const formSchema = z.object({
	title: z.string().min(1, { message: "Title cannot be empty" }),
	imageUrl: z.string().min(1, { message: "Image URL cannot be empty" }),
	description: z.string().min(1, { message: "Description cannot be empty" }),
	categoryName: z.string().min(1, { message: "Please select a category" }),
	content: z.string().min(1, { message: "Content cannot be empty" }),
});

type FormValues = z.infer<typeof formSchema>;

interface Article {
	id: number;
	title: string;
	imageUrl: string;
	content: string;
	description: string;
	categoryName: CategoryName | null;
}

export default function EditArticlePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const router = useRouter();
	const { id } = use(params);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Initialize form
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			imageUrl: "",
			description: "",
			categoryName: "",
			content: "",
		},
	});

	// Fetch article data
	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const response = await fetch(`/api/articles/${id}`);
				if (!response.ok) {
					throw new Error("Failed to fetch article");
				}
				const data = await response.json();
				
				// Set form values
				form.reset({
					title: data.title,
					imageUrl: data.imageUrl,
					description: data.description,
					categoryName: data.categoryName || "",
					content: data.content,
				});
			} catch (err) {
				setError("Error fetching article data");
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchArticle().then();
	}, [id, form]);

	// Submit form
	const onSubmit = async (values: FormValues) => {
		setIsSubmitting(true);

		try {
			const response = await fetch(`/api/articles/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				throw new Error("Update failed");
			}

			router.push(`/article/${id}`);
			router.refresh();
		} catch (error) {
			console.error("Error updating article:", error);
			setError("Failed to update article. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	// Convert enum values to option list
	const categoryOptions = Object.keys($Enums.CategoryName).map((key) => {
		const value = key.replace("_", "-");
		const label = key
			.replace(/_/g, "-")
			.replace(/-([a-z])/g, (_, letter) => ` ${letter.toUpperCase()}`);
		return { value, label: label.charAt(0).toUpperCase() + label.slice(1) };
	});

	if (isLoading) {
		return <div className="text-center p-10">Loading...</div>;
	}

	if (error && !form.formState.isDirty) {
		return (
			<div className="text-center p-10 text-red-500">
				{error || "Article not found"}
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Edit Article</h1>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Image URL</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea rows={3} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="categoryName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<Select 
									onValueChange={field.onChange} 
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{categoryOptions.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Content</FormLabel>
								<FormControl>
									<Textarea rows={10} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{error && (
						<div className="text-red-500 text-sm">{error}</div>
					)}

					<div className="flex justify-end">
						<Button
							type="button"
							variant="outline"
							onClick={() => {
								router.push(`/article/${id}`);
								router.refresh();
							}}
							className="mr-2"
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Saving..." : "Save Changes"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
