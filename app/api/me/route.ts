import { sql } from "@/app/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
	const session = await auth();

	if (!session?.user?.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const [user] = await sql`
		SELECT id, name, email, photo_url as photo
		FROM users
		WHERE id = ${session.user.id}
	`;

	if (!user) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	return NextResponse.json(user);
}
