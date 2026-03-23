import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
export default NextAuth(authConfig).auth;

export const config = {
	matcher: [
		// Exclude API routes, _next/static, _next/image, and common image types
		"/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|heic)$).*)",
	],
};
