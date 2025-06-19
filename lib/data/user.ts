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

export interface ApiProfileResponse {
	user: UserWithCounts;
	totalReadTimes: number;
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
 * Get user profile data for API endpoint
 * @param userId User ID
 * @returns Profile data for the API response or null if user not found
 */
export async function getProfileData(
	userId: string,
): Promise<ApiProfileResponse | null> {
	try {
		// Get user profile and total read times in parallel
		const [user, totalReadTimes] = await Promise.all([
			getUserProfile(userId),
			getUserTotalReadTimes(userId),
		]);

		if (!user) {
			return null;
		}

		return {
			user,
			totalReadTimes,
		};
	} catch (error) {
		console.error("Error fetching profile data:", error);
		return null;
	}
}

/**
 * Update user profile name
 * @param userId User ID
 * @param name New name for the user
 * @returns Updated profile data for the API response or null if update fails
 */
export async function updateUserProfile(
	userId: string,
	name: string,
): Promise<ApiProfileResponse | null> {
	try {
		// Update user name
		const updatedUser = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				name,
			},
			include: {
				_count: {
					select: {
						MarkedArticles: true,
						ReadedTimeCount: true,
					},
				},
			},
		});

		// Get total read times
		const totalReadTimes = await getUserTotalReadTimes(userId);

		return {
			user: updatedUser as UserWithCounts,
			totalReadTimes,
		};
	} catch (error) {
		console.error("Error updating profile data:", error);
		return null;
	}
}
