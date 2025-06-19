"use server";

import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

/**
 * Mark or unmark an article for the current user
 */
export async function toggleMarkArticle(articleId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session?.user?.id) {
    throw new Error("You must be logged in to mark articles");
  }
  
  const userId = session.user.id;
  
  // Check if the article is already marked by this user
  const existingMark = await prisma.markedArticles.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });
  
  if (existingMark) {
    // If marked, unmark it
    await prisma.markedArticles.delete({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
    });
    return { marked: false };
  }
  
  // If not marked, mark it
  await prisma.markedArticles.create({
    data: {
      userId,
      articleId,
    },
  });
  return { marked: true };
}

/**
 * Increment the read count for an article by the current user
 */
export async function incrementReadCount(articleId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session?.user?.id) {
    throw new Error("You must be logged in to track read times");
  }
  
  const userId = session.user.id;
  
  // Check if the user has already read this article
  const existingReadCount = await prisma.readedTimeCount.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });
  
  if (existingReadCount) {
    // Increment the existing read count
    await prisma.readedTimeCount.update({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
      data: {
        times: existingReadCount.times + 1,
      },
    });
    
    return { times: existingReadCount.times + 1 };
  }
  
  // Create a new read count record
  await prisma.readedTimeCount.create({
    data: {
      userId,
      articleId,
      times: 1,
    },
  });
  
  return { times: 1 };
}

/**
 * Get the current user's mark status and read count for an article
 */
export async function getUserArticleStats(articleId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session?.user?.id) {
    return { marked: false, readTimes: 0, isLoggedIn: false };
  }
  
  const userId = session.user.id;
  
  // Get mark status
  const mark = await prisma.markedArticles.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });
  
  // Get read count
  const readCount = await prisma.readedTimeCount.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });
  
  return {
    marked: !!mark,
    readTimes: readCount?.times || 0,
    isLoggedIn: true
  };
} 