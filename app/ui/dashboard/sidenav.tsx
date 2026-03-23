"use client";
import Link from "next/link";
import LogoToDoList from "../todolist-logo";
import NavLinks from "./nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOutAction } from "@/app/lib/actions";
import { useState } from "react";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { defaultImage } from "@/app/lib/utils";

export default function SideNav() {
	const pathname = usePathname();

	const isProfilePage = pathname === "/profile";

	const currentUser = useCurrentUser().user;

	if (!currentUser) return null;

	return (
		<div className="flex h-full flex-col px-3 py-4 bg-gray-200">
			{/* Logo arriba */}
			<Link
				href="/dashboard"
				className="mb-6 flex items-center justify-center md:justify-start"
			>
				<LogoToDoList
					textClassName="text-xl md:text-2xl"
					imageClassName="h-10 w-10"
				/>
			</Link>

			{/* NavLinks */}
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				<div className="flex grow gap-2 md:flex-col ">
					<NavLinks />
				</div>

				{/* Sign Out abajo */}
				{isProfilePage ? (
					<form action={signOutAction}>
						<div className="mt-auto">
							<button
								type="submit"
								className="flex h-12 grow w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-200 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer"
							>
								<PowerIcon className="w-6" />
								<p className="hidden md:block">SignOut</p>
							</button>
						</div>
					</form>
				) : (
					<Link
						href="/profile"
						className="flex items-center gap-2 cursor-pointer "
					>
						<Image
							src={currentUser.image || defaultImage}
							width={500}
							height={500}
							alt={currentUser.name}
							className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-xl"
						></Image>
						<div className="md:flex md:flex-col md:justify-center hidden min-w-0">
							<p className="font-semibold truncate">{currentUser.name}</p>
							<p className="text-sm text-gray-500 truncate">
								{currentUser.email}
							</p>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
}
