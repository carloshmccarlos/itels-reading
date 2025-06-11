import { ArticleForm } from "@/components/ArticleForm";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function EditArticlePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const session = await auth.api.getSession({
		headers: await headers(), // you need to pass the headers object.
	});

	if (!session) {
		redirect("/auth/login");
	}
	const { id: articleId } = await params;
	return (
		<div className="w-full min-h-screen mx-auto px-2 sm:px-4 lg:px-8 xl:px-16 2xl:px-32 py-2 sm:py-2 lg:py-4">
			<div className="bg-white shadow-lg overflow-hidden">
				<div className="bg-black text-white py-8 px-6 sm:px-10">
					<div className="max-w-7xl mx-auto">
						<h1 className="text-3xl font-bold text-white">Edit Article</h1>
					</div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-10 py-8">
					<ArticleForm articleId={articleId} />
				</div>
			</div>
		</div>
	);
}
