import { sql } from "@/app/lib/actions";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
	const session = await auth();

	if (!session?.user?.id) {
		return NextResponse.json(null);
	}

	const result = await sql`
		SELECT id, name, email, photo_url as image
		FROM users
		WHERE id = ${session.user.id}
	`;

	const user = result[0];

	return NextResponse.json(user);
}
