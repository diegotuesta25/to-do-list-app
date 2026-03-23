"use client";
import Link from "next/link";
import { createUser, UserState } from "../lib/actions";
import { useActionState } from "react";

export default function SignupForm() {
	const initialState: UserState = { message: null, errors: {} };
	const [state, formAction] = useActionState(createUser, initialState);

	return (
		<form
			action={formAction}
			className="space-y-6 w-full max-w-sm text-gray-900"
		>
			{/* Name */}
			<div className="grid grid-cols-1 gap-1">
				<label htmlFor="email" className="text-sm font-medium text-gray-900">
					Name
				</label>
				<input
					className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
					id="name"
					type="text"
					name="name"
					placeholder="Enter your name"
					required
				/>
			</div>
			{/* Email */}
			<div className="grid grid-cols-1 gap-1">
				<label htmlFor="email" className="text-sm font-medium text-gray-900">
					Email
				</label>
				<input
					className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
					id="email"
					type="email"
					name="email"
					placeholder="Enter Email"
					required
				/>
			</div>
			{/* Password */}
			<div className="grid grid-cols-1 gap-1">
				<label className="text-sm font-medium text-gray-900">Password</label>
				<input
					className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
					id="password"
					type="password"
					name="password"
					placeholder="Enter password"
					required
				/>
			</div>

			<button
				type="submit"
				className="w-full px-5 py-2 font-bold border rounded-xl bg-black text-white hover:bg-gray-500 transition cursor-pointer focus:ring-black focus:ring-2"
			>
				Submit
			</button>
		</form>
	);
}
