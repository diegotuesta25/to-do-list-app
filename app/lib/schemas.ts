import { z } from "zod";

export const SignupSchema = z.object({
	name: z.string().trim().min(2, "Name is too short").max(60),
	email: z.string().trim().toLowerCase().email("Invalid email"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(128),
});
