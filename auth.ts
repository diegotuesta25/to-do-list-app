import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcryptjs";
import postgres from "postgres";

const globalForSql = global as unknown as { sql: ReturnType<typeof postgres> };

export const sql =
	globalForSql.sql ??
	postgres(process.env.POSTGRES_URL!, {
		max: 5, // limit connections
	});

if (process.env.NODE_ENV !== "production") globalForSql.sql = sql;

async function getUser(email: string): Promise<User | undefined> {
	try {
		const user = await sql<
			User[]
		>`SELECT id,password,name,email,photo_url as photo FROM users WHERE email=${email}`;
		return user[0];
	} catch (error) {
		console.error("Failed to fetch user:", error);
		throw new Error("Failed to fetch user.");
	}
}

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(6) })
					.safeParse(credentials);

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const user = await getUser(email);
					if (!user) return null;
					const passwordsMatch = await bcrypt.compare(password, user.password);
					if (passwordsMatch)
						return {
							id: user.id.toString(),
							name: user.name,
							email: user.email,
							image: user.photo,
						};
				}

				return null;
			},
		}),
	],
});
