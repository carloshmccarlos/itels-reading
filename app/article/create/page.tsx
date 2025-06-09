"use client";

import { $Enums } from "@/lib/generated/prisma";
import Image from "next/image";
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
		<div className="w-full min-h-screen mx-auto px-2 sm:px-4 lg:px-8 xl:px-16 2xl:px-32 py-2 sm:py-2 lg:py-4">
			<div className="bg-white shadow-lg overflow-hidden">
				<div className="bg-black text-white py-8 px-6 sm:px-10">
					<div className="max-w-7xl mx-auto">
						<h1 className="text-3xl font-bold text-white">创建新文章</h1>
					</div>
				</div>

				<form
					onSubmit={handleSubmit}
					className="max-w-7xl mx-auto px-4 sm:px-10 py-8"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="space-y-6">
							<div>
								<label
									htmlFor="title"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									标题
								</label>
								<input
									type="text"
									id="title"
									name="title"
									value={formData.title}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="请输入文章标题"
								/>
							</div>

							<div>
								<label
									htmlFor="imageUrl"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									图片URL
								</label>
								<input
									type="text"
									id="imageUrl"
									name="imageUrl"
									value={formData.imageUrl}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="请输入图片链接"
								/>
							</div>

							<div>
								<label
									htmlFor="categoryName"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									分类
								</label>
								<select
									id="categoryName"
									name="categoryName"
									value={formData.categoryName}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
								<label
									htmlFor="description"
									className="block text-sm font-medium text-gray-700 mb-2"
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
									className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="请输入文章简短描述"
								/>
							</div>
						</div>

						<div className="space-y-6 ">
							{formData.imageUrl && (
								<div className="border rounded-md p-4 bg-gray-50">
									<p className="text-sm font-medium text-gray-700 mb-2">
										图片预览
									</p>
									<div className="relative h-100 w-full overflow-hidden rounded-md">
										<Image
											src={formData.imageUrl}
											alt="文章图片预览"
											fill
											className="object-cover"
											onError={(e) => {
												e.currentTarget.src =
													"https://via.placeholder.com/400x300?text=图片加载失败";
											}}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
					<div>
						<label
							htmlFor="content"
							className=" block text-sm font-medium text-gray-700 mb-2"
						>
							内容
						</label>
						<textarea
							id="content"
							name="content"
							value={formData.content}
							onChange={handleChange}
							required
							rows={12}
							className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="请输入文章内容"
						/>
					</div>
					<div className="mt-10 pt-6 border-t border-gray-200 flex justify-end">
						<button
							type="button"
							onClick={() => router.back()}
							className="px-8 py-3 mr-5 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
						>
							取消
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className="px-8 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							{isSubmitting ? "提交中..." : "创建文章"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
