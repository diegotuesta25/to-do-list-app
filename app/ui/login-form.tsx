"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { authenticate } from "../lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined,
	);
	return (
		<form
			action={formAction}
			className="space-y-6 w-full max-w-sm text-gray-900"
		>
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
			<input type="hidden" name="redirectTo" value={callbackUrl} />
			<button
				type="submit"
				className="w-full px-5 py-2 font-bold border rounded-xl bg-black text-white hover:bg-gray-500 transition cursor-pointer focus:ring-black focus:ring-2"
				aria-disabled={isPending}
			>
				Continue
			</button>
			<div
				className="flex h-8 items-end space-x-1"
				aria-live="polite"
				aria-atomic="true"
			>
				{errorMessage && (
					<>
						<ExclamationCircleIcon className="h-5 w-5 text-red-500" />
						<p className="text-sm text-red-500">{errorMessage}</p>
					</>
				)}
			</div>
		</form>
	);
}
