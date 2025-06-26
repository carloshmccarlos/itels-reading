import { auth } from "@/lib/auth/auth";
import { getUserCollections } from "@/lib/data/user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		const user = session?.user;
		if (!user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const collections = await getUserCollections(user.id);

		return NextResponse.json({ ...collections, user });
	} catch (error) {
		console.error("Error fetching user collection data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch user collection data" },
			{ status: 500 },
		);
	}
}
