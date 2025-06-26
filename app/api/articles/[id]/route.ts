import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const id = Number.parseInt(params.id, 10);

		if (Number.isNaN(id)) {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
		}

		const article = await prisma.article.findUnique({
			where: { id },
			include: {
				Category: true,
			},
		});

		if (!article) {
			return NextResponse.json({ error: "Article not found" }, { status: 404 });
		}

		return NextResponse.json(article);
	} catch (error) {
		console.error("Error getting article:", error);
		return NextResponse.json(
			{ error: "Failed to get article" },
			{ status: 500 },
		);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const id = Number.parseInt(params.id, 10);
		if (Number.isNaN(id)) {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
		}

		const body = await request.json();

		const { title, imageUrl, content, description, categoryName } = body;

		// 验证必填字段
		if (!title || !imageUrl || !content || !description) {
			return NextResponse.json(
				{ error: "Title, image URL, content and description are required" },
				{ status: 400 },
			);
		}

		// 检查文章是否存在
		const existingArticle = await prisma.article.findUnique({
			where: { id },
		});

		if (!existingArticle) {
			return NextResponse.json({ error: "Article not found" }, { status: 404 });
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
		console.error("Error updating article:", error);
		return NextResponse.json(
			{ error: "Failed to update article" },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		// Check if user is admin
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		// Get user with role
		const user = await prisma.user.findUnique({
			where: { id: session.user.id },
			select: { role: true },
		});

		if (!user || user.role !== Role.ADMIN) {
			return NextResponse.json(
				{ message: "Forbidden: Admin access required" },
				{ status: 403 },
			);
		}

		// Delete the article
		const articleId = Number.parseInt(params.id);

		if (Number.isNaN(articleId)) {
			return NextResponse.json(
				{ message: "Invalid article ID" },
				{ status: 400 },
			);
		}

		// Check if article exists
		const article = await prisma.article.findUnique({
			where: { id: articleId },
		});

		if (!article) {
			return NextResponse.json(
				{ message: "Article not found" },
				{ status: 404 },
			);
		}

		// Delete the article
		await prisma.article.delete({
			where: { id: articleId },
		});
		revalidatePath("/admin/edit");

		return NextResponse.json({ message: "Article deleted successfully" });
	} catch (error) {
		console.error("Error deleting article:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
