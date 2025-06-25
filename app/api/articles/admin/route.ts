import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";
import { Role } from "@prisma/client";
import { headers } from "next/headers";

export async function GET() {
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
      select: { role: true }
    });

    if (!user || user.role !== Role.ADMIN) {
      return NextResponse.json({ message: "Forbidden: Admin access required" }, { status: 403 });
    }

    // Get all articles with their categories
    const articles = await prisma.article.findMany({
      include: {
        Category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
} 