import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getAllCategories } from "@/lib/data/category";
import type React from "react";

export const metadata: Metadata = {
	title: "I READ",
	description: "Reading is the best way to learn",
	icons: {
		icon: [
			{
				url: "/favicon.ico",
				sizes: "any",
			},
		],
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const categories = await getAllCategories();

	if (!categories) {
		return null;
	}

	return (
		<html lang="en">
			<body className="flex flex-col font-serif justify-center antialiased ">
				<Navbar categories={categories} />
				{children}
			</body>
		</html>
	);
}
