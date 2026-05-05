"use client";
import { createUser, UserState } from "../lib/actions";
import { useActionState } from "react";
import SubmitButton from "./tasks/submit-button";

export default function SignupForm() {
	const initialState: UserState = { message: null, errors: {} };
	const [state, formAction] = useActionState(createUser, initialState);

	return (
		<form
			action={formAction}
			className="flex flex-col gap-3 w-full max-w-sm text-gray-900"
		>
			{/* Name */}
			<div className="grid grid-cols-1 gap-1">
				<label htmlFor="name" className="text-sm font-medium text-gray-900">
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

				<span className="text-xs text-red-500">{state.errors?.name}</span>
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
				<span className="text-xs text-red-500">{state.errors?.email}</span>
			</div>
			{/* Password */}
			<div className="grid grid-cols-1 gap-1">
				<label htmlFor="password" className="text-sm font-medium text-gray-900">
					Password
				</label>
				<input
					className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
					id="password"
					type="password"
					name="password"
					minLength={6}
					placeholder="Enter password"
					required
				/>
				<span className="text-xs text-red-500">{state.errors?.password}</span>
			</div>

			<>
				<p className="text-xs text-red-500">{state.message}</p>
				<SubmitButton type="sign-up" />
			</>
		</form>
	);
}
