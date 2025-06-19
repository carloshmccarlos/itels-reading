"use client";

import ArticleCard from "@/components/ArticleCard";
import Spinner from "@/components/Spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth/auth-client";
import type {
	ArticleWithCategory,
	MarkedArticle,
	ReadHistory,
	UserData,
} from "@/lib/data/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CollectionPage() {
	const session = authClient.useSession();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [userData, setUserData] = useState<UserData | null>(null);

	useEffect(() => {
		if (!session) {
			router.push("/");
			return;
		}

		const fetchUserData = async () => {
			try {
				const response = await fetch("/api/user/collection");

				if (!response.ok) {
					if (response.status === 401) {
						router.push("/auth/login");
						return;
					}
					throw new Error(`Error ${response.status}: ${response.statusText}`);
				}

				const data = await response.json();
				setUserData(data);
			} catch (err) {
				console.error("Failed to fetch collection data:", err);
				setError(
					err instanceof Error ? err.message : "Failed to load collection data",
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserData().then();
	}, [router, session]);

	// Show loading state
	if (isLoading) {
		return (
			<div className="container mx-auto py-10 px-4 md:px-8">
				<Spinner />
			</div>
		);
	}

	// Show error state
	if (error || !userData) {
		return (
			<div className="container mx-auto py-10 px-4 md:px-8">
				<h1 className="text-3xl font-bold mb-8">Error</h1>
				<p className="text-red-500">
					{error || "Failed to load collection data"}
				</p>
				<button
					type="button"
					onClick={() => router.refresh()}
					className="mt-4 text-blue-600 hover:underline"
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className="max-w-[2000px] mx-auto px-2 sm:px-4 lg:px-8 xl:px-16 2xl:px-32 py-2 sm:py-2 lg:py-4">
			<h1 className="text-3xl font-bold mb-8">My Reading Collection</h1>

			<Tabs defaultValue="marked" className="w-full">
				<TabsList className="mb-6">
					<TabsTrigger value="marked">
						Marked Articles ({userData.markedArticles.length})
					</TabsTrigger>
					<TabsTrigger value="history">
						Reading History ({userData.readHistory.length})
					</TabsTrigger>
				</TabsList>

				<TabsContent value="marked" className="space-y-6">
					{userData.markedArticles.length === 0 ? (
						<div className="text-center py-10">
							<p className="text-gray-500">
								You haven't marked any articles yet.
							</p>
							<Link
								href="/public"
								className="text-blue-600 hover:underline mt-2 inline-block"
							>
								Browse articles
							</Link>
						</div>
					) : (
						<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{userData.markedArticles.map((item) => (
								<ArticleCard
									readCount={null}
									key={item.article.id}
									article={item.article}
								/>
							))}
						</div>
					)}
				</TabsContent>

				<TabsContent value="history" className="space-y-6">
					{userData.readHistory.length === 0 ? (
						<div className="text-center py-10">
							<p className="text-gray-500">
								You haven't read any articles yet.
							</p>
							<Link
								href="/public"
								className="text-blue-600 hover:underline mt-2 inline-block"
							>
								Browse articles
							</Link>
						</div>
					) : (
						<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{userData.readHistory.map((item) => (
								<ArticleCard
									key={item.article.id}
									article={item.article}
									readCount={item.times}
								/>
							))}
						</div>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
}
