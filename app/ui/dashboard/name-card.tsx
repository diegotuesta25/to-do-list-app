"use client";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function NameCard() {
	const currentUser = useCurrentUser().user;

	const avatars = [
		{ name: "lemur", image: "/avatar-1.png" },
		{ name: "penguin", image: "/avatar-2.png" },
		{ name: "lion", image: "/avatar-3.png" },
		{ name: "zebra", image: "/avatar-4.png" },
	];

	if (!currentUser) return;

	return (
		<div className="flex bg-white px-5 py-7 rounded-2xl items-center gap-4 justify-between">
			<div className="flex flex-col gap-1">
				<h1 className=" text-xl md:text-2xl font-semibold">
					Good Morning, {currentUser.name.split(" ")[0]}
				</h1>
				<p className="text-sm font-medium md:text-base text-gray-400 ">
					What do you plan to do today?
				</p>
			</div>
			<div className="flex gap-2">
				<div className="flex flex-col items-center gap-2">
					<div className="flex">
						{avatars.map((avatar, index) => (
							<Image
								key={avatar.name}
								src={avatar.image}
								width={500}
								height={500}
								alt={avatar.name}
								className={`w-7 h-7 rounded-full border-2 border-white ${index !== 0 ? "-ml-2" : ""}`}
							/>
						))}
					</div>
					<h1 className="font-semibold text-sm md:text-base text-center truncate">
						Dimat Studio
					</h1>
				</div>
				<div className="mt-auto">
					<div className="flex border border-gray-300 rounded-md items-center px-2">
						<UserIcon className="w3 h-3 text-gray-500" />
						<p className="font-bold text-sm">1.354</p>
					</div>
				</div>
			</div>
		</div>
	);
}
