import NavLinks from "@/components/nav/NavLinks";
import { auth } from "@/lib/auth/auth";
import { getRoleByUserId } from "@/lib/data/user";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		redirect("/auth/login");
	}

	// Check if user is admin
	const userRole = await getRoleByUserId(session.user.id);
	if (userRole?.role !== "ADMIN") {
		redirect("/");
	}

	const queryClient = new QueryClient();

	return (
		/*<QueryClientProvider client={queryClient}>
			<div className="flex min-h-screen">
				<div className="flex flex-col flex-1">
					<main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
						{children}
					</main>
					<footer className="bg-gray-50 text-center p-4 border-t">
						<p>Admin Panel © {new Date().getFullYear()}</p>
					</footer>
				</div>
			</div>
		</QueryClientProvider>*/
		<div className="flex min-h-screen">
			<div className="flex flex-col flex-1">
				<main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
					{children}
				</main>
				<footer className="bg-gray-50 text-center text-xs text-muted-foreground p-4 border-t">
					<p>Admin Panel © {new Date().getFullYear()}</p>
				</footer>
			</div>
		</div>
	);
}
