import { auth } from "@/lib/auth/auth";
import { getUserData } from "@/lib/data/user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const data = await getUserData();

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching user collection data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch user collection data" },
			{ status: 500 },
		);
	}
}
