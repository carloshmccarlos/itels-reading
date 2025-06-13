"use server";

import { auth } from "@/lib/auth/auth";
import type { Article, Category, User } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Define types for our data
export interface ArticleWithCategory extends Article {
	Category: Category | null;
}

export interface MarkedArticle {
	id: number;
	articleId: number;
	userId: string;
	article: ArticleWithCategory;
}

export interface ReadHistory {
	id: number;
	times: number;
	articleId: number;
	userId: string;
	article: ArticleWithCategory;
}

export interface SessionUser {
	id: string;
	name?: string;
	email: string;
	image?: string | null;
}

export interface UserData {
	markedArticles: MarkedArticle[];
	readHistory: ReadHistory[];
	user: SessionUser;
}

export interface UserWithCounts extends User {
	_count: {
		MarkedArticles: number;
		ReadedTimeCount: number;
	};
}

export interface ProfileData {
	user: UserWithCounts;
	totalReadTimes: number;
	session: {
		user: SessionUser;
	};
}

/**
 * Get the current user session
 * @returns User session or redirects to login if not authenticated
 */
export async function getCurrentUser(): Promise<SessionUser> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return redirect("/auth/login");
	}

	return session.user;
}

/**
 * Get marked articles for the current user
 * @param userId User ID
 * @returns Array of marked articles with their categories
 */
export async function getUserMarkedArticles(userId: string) {
	return prisma.markedArticles.findMany({
		where: {
			userId: userId,
		},
		include: {
			article: {
				include: {
					Category: true,
				},
			},
		},
		orderBy: {
			article: {
				createdAt: "desc",
			},
		},
	});
}

/**
 * Get reading history for the current user
 * @param userId User ID
 * @returns Array of read articles with their categories and read count
 */
export async function getUserReadHistory(userId: string) {
	return prisma.readedTimeCount.findMany({
		where: {
			userId: userId,
		},
		include: {
			article: {
				include: {
					Category: true,
				},
			},
		},
		orderBy: {
			times: "desc",
		},
	});
}

/**
 * Get user profile with counts of marked articles and read history
 * @param userId User ID
 * @returns User with counts or null if not found
 */
export async function getUserProfile(
	userId: string,
): Promise<UserWithCounts | null> {
	return prisma.user.findUnique({
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
	}) as Promise<UserWithCounts | null>;
}

/**
 * Get total read times for a user
 * @param userId User ID
 * @returns Total number of read times
 */
export async function getUserTotalReadTimes(userId: string): Promise<number> {
	const readStats = await prisma.readedTimeCount.aggregate({
		where: {
			userId: userId,
		},
		_sum: {
			times: true,
		},
	});

	return readStats._sum.times || 0;
}

/**
 * Get all user data including marked articles and reading history
 * @returns User data or redirects to login if not authenticated
 */
export async function getUserData(): Promise<UserData> {
	const user = await getCurrentUser();
	const userId = user.id;

	// Get marked articles and read history in parallel
	const [markedArticles, readHistory] = await Promise.all([
		getUserMarkedArticles(userId),
		getUserReadHistory(userId),
	]);

	return {
		markedArticles,
		readHistory,
		user,
	};
}

/**
 * Get user profile data including stats
 * @returns Profile data or redirects to login if not authenticated
 */
export async function getProfileData(): Promise<ProfileData> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return redirect("/auth/login");
	}

	const userId = session.user.id;

	// Get user profile and total read times in parallel
	const [user, totalReadTimes] = await Promise.all([
		getUserProfile(userId),
		getUserTotalReadTimes(userId),
	]);

	if (!user) {
		return redirect("/auth/login");
	}

	return {
		user,
		totalReadTimes,
		session: { user: session.user },
	};
}
