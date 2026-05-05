"use client";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { authenticate } from "../lib/actions";
import {
	ExclamationCircleIcon,
	EyeIcon,
	EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useToggle } from "../hooks/use-toggle";

export default function LoginForm() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined,
	);
	const { isOpen, toggle, setIsOpen } = useToggle(false);
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
				<label htmlFor="password" className="text-sm font-medium text-gray-900">
					Password
				</label>
				<div className="relative">
					<input
						className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black"
						id="password"
						type={isOpen ? "text" : "password"}
						name="password"
						placeholder="Enter password"
						required
					/>

					{isOpen ? (
						<button
							aria-label="Show password"
							className="cursor-pointer"
							onClick={toggle}
							type="button"
						>
							<EyeSlashIcon
								width={25}
								className="absolute right-4 top-2 text-gray-700"
							/>
						</button>
					) : (
						<button
							aria-label="Hid password"
							className="cursor-pointer"
							onClick={toggle}
							type="button"
						>
							<EyeIcon
								width={25}
								className="absolute right-4 top-2 text-gray-700"
							/>
						</button>
					)}
				</div>
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
