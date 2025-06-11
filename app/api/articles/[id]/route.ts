import type { CategoryName } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const id = Number.parseInt((await params).id, 10);

		if (Number.isNaN(id)) {
			return NextResponse.json({ error: "无效的ID" }, { status: 400 });
		}

		const article = await prisma.article.findUnique({
			where: { id },
			include: {
				Category: true,
			},
		});

		if (!article) {
			return NextResponse.json({ error: "文章不存在" }, { status: 404 });
		}

		return NextResponse.json(article);
	} catch (error) {
		console.error("获取文章时出错:", error);
		return NextResponse.json({ error: "获取文章失败" }, { status: 500 });
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const id = Number.parseInt((await params).id, 10);
		if (Number.isNaN(id)) {
			return NextResponse.json({ error: "无效的ID" }, { status: 400 });
		}

		const body = await request.json();

		const { title, imageUrl, content, description, categoryName } = body;

		// 验证必填字段
		if (!title || !imageUrl || !content || !description) {
			return NextResponse.json(
				{ error: "标题、图片URL、内容和描述是必填的" },
				{ status: 400 },
			);
		}

		// 检查文章是否存在
		const existingArticle = await prisma.article.findUnique({
			where: { id },
		});

		if (!existingArticle) {
			return NextResponse.json({ error: "文章不存在" }, { status: 404 });
		}

		// 更新文章
		console.log(categoryName);

		const updatedArticle = await prisma.article.update({
			where: { id },
			data: {
				title,
				imageUrl,
				content,
				description,
				categoryName: categoryName,
			},
			include: {
				Category: true,
			},
		});

		return NextResponse.json(updatedArticle);
	} catch (error) {
		console.error("更新文章时出错:", error);
		return NextResponse.json({ error: "更新文章失败" }, { status: 500 });
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const id = Number.parseInt((await params).id, 10);
		if (Number.isNaN(id)) {
			return NextResponse.json({ error: "无效的ID" }, { status: 400 });
		}

		// 检查文章是否存在
		const existingArticle = await prisma.article.findUnique({
			where: { id },
		});

		if (!existingArticle) {
			return NextResponse.json({ error: "文章不存在" }, { status: 404 });
		}

		// 删除文章
		await prisma.article.delete({
			where: { id },
		});

		return NextResponse.json({ message: "文章已成功删除" });
	} catch (error) {
		console.error("删除文章时出错:", error);
		return NextResponse.json({ error: "删除文章失败" }, { status: 500 });
	}
}
