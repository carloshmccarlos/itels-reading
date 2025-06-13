import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    
    // Get user profile and total read times in parallel
    const [user, totalReadTimes] = await Promise.all([
      prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          _count: {
            select: {
              MarkedArticles: true,
              ReadedTimeCount: true,
            },
          },
        },
      }),
      prisma.readedTimeCount.aggregate({
        where: {
          userId,
        },
        _sum: {
          times: true,
        },
      }),
    ]);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      user,
      totalReadTimes: totalReadTimes._sum.times || 0,
      session: { user: session.user },
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return NextResponse.json({ error: "Failed to fetch profile data" }, { status: 500 });
  }
} 