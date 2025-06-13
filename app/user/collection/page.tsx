import ArticleCard from "@/components/ArticleCard";
import VerticalCard from "@/components/VerticalCard";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ArticleWithCategory, getUserData } from "@/data/user";
import { transformCategoryName } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function MyPage() {
	const data = await getUserData();

	return (
		<div className="max-w-[2000px] mx-auto px-2 sm:px-4 lg:px-8 xl:px-16 2xl:px-32 py-2 sm:py-2 lg:py-4">
			<h1 className="text-3xl font-bold mb-8">My Reading Collection</h1>

			<Tabs defaultValue="marked" className="w-full">
				<TabsList className="mb-6">
					<TabsTrigger value="marked">
						Marked Articles ({data.markedArticles.length})
					</TabsTrigger>
					<TabsTrigger value="history">
						Reading History ({data.readHistory.length})
					</TabsTrigger>
				</TabsList>

				<TabsContent value="marked" className="space-y-6">
					{data.markedArticles.length === 0 ? (
						<div className="text-center py-10">
							<p className="text-gray-500">
								You haven't marked any articles yet.
							</p>
							<Link
								href="/"
								className="text-blue-600 hover:underline mt-2 inline-block"
							>
								Browse articles
							</Link>
						</div>
					) : (
						<div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{data.markedArticles.map((item) => (
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
					{data.readHistory.length === 0 ? (
						<div className="text-center py-10">
							<p className="text-gray-500">
								You haven't read any articles yet.
							</p>
							<Link
								href="/"
								className="text-blue-600 hover:underline mt-2 inline-block"
							>
								Browse articles
							</Link>
						</div>
					) : (
						<div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{data.readHistory.map((item) => (
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
