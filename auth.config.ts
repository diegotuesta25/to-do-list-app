import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "/",
	},

	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnDashboard =
				nextUrl.pathname.startsWith("/dashboard") ||
				nextUrl.pathname.startsWith("/profile");

			if (isOnDashboard) return isLoggedIn;

			if (isLoggedIn) {
				return Response.redirect(new URL("/dashboard", nextUrl));
			}

			return true;
		},

		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.photo = user.image;
			}
			return token;
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.image = token.photo as string;
			}
			return session;
		},
	},

	providers: [],
} satisfies NextAuthConfig;
