"use client";

import { $Enums } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CategoryName = $Enums.CategoryName;

export default function CreateArticlePage() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		imageUrl: "",
		content: "",
		description: "",
		categoryName: "",
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/articles", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("提交失败");
			}

			const data = await response.json();
			router.push(`/article/${data.id}`);
			router.refresh();
		} catch (error) {
			console.error("提交文章时出错:", error);
			alert("提交文章失败，请重试");
		} finally {
			setIsSubmitting(false);
		}
	};

	// 将枚举值转换为选项列表
	const categoryOptions = Object.keys(CategoryName).map((key) => {
		const value = key.replace("_", "-");
		const label = key
			.replace(/_/g, "-")
			.replace(/-([a-z])/g, (_, letter) => ` ${letter.toUpperCase()}`);
		return { value, label: label.charAt(0).toUpperCase() + label.slice(1) };
	});

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">创建新文章</h1>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label htmlFor="title" className="block text-sm font-medium mb-2">
						标题
					</label>
					<input
						type="text"
						id="title"
						name="title"
						value={formData.title}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div>
					<label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
						图片URL
					</label>
					<input
						type="text"
						id="imageUrl"
						name="imageUrl"
						value={formData.imageUrl}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium mb-2"
					>
						描述
					</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						required
						rows={3}
						className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div>
					<label
						htmlFor="categoryName"
						className="block text-sm font-medium mb-2"
					>
						分类
					</label>
					<select
						id="categoryName"
						name="categoryName"
						value={formData.categoryName}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="">选择分类</option>
						{categoryOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>

				<div>
					<label htmlFor="content" className="block text-sm font-medium mb-2">
						内容
					</label>
					<textarea
						id="content"
						name="content"
						value={formData.content}
						onChange={handleChange}
						required
						rows={10}
						className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div className="flex justify-end">
					<button
						type="button"
						onClick={() => router.back()}
						className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
					>
						取消
					</button>
					<button
						type="submit"
						disabled={isSubmitting}
						className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
					>
						{isSubmitting ? "提交中..." : "创建文章"}
					</button>
				</div>
			</form>
		</div>
	);
}
