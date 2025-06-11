import { CategoryName } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { title, imageUrl, content, description, categoryName } = body;

		console.log({ title, imageUrl, content, description, categoryName });
		// 验证必填字段
		if (!title || !imageUrl || !content || !description || !categoryName) {
			return NextResponse.json(
				{ error: "所有字段都是必填的" },
				{ status: 400 },
			);
		}

		if (
			!Object.values(CategoryName).includes(
				categoryName.replaceAll("-", "_") as CategoryName,
			)
		) {
			return NextResponse.json({ error: "无效的分类名称" }, { status: 400 });
		}
		// 创建文章

		const article = await prisma.article.create({
			data: {
				title,
				imageUrl,
				content,
				description,
				categoryName: categoryName.replaceAll("-", "_") as CategoryName,
			},
			include: {
				Category: true,
			},
		});

		console.log(article);
		return NextResponse.json(article, { status: 201 });
	} catch (error) {
		console.error("创建文章时出错:", error);
		return NextResponse.json({ error: "创建文章失败" }, { status: 500 });
	}
}
