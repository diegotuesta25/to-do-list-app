"use client";

import {
	HomeIcon,
	ClipboardDocumentCheckIcon,
	PhoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
	{ name: "Dashboard", href: "/dashboard", icon: HomeIcon },
	{ name: "Tasks", href: "/dashboard/tasks", icon: ClipboardDocumentCheckIcon },
];

export default function NavLinks() {
	const pathname = usePathname();
	return (
		<>
			{links.map(link => {
				const LinkIcon = link.icon;
				return (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(
							"flex h-12 grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-purple-100 hover:text-purple-600 md:flex-none md:justify-start md:p-2 md:px-3",
							{ "bg-purple-100 text-purple-600": link.href === pathname },
						)}
					>
						<LinkIcon className="w-6" />
						<p className="hidden md:block">{link.name}</p>
					</Link>
				);
			})}
		</>
	);
}
