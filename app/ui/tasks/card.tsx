"use client";
import { Tasks } from "@/app/lib/definitions";
import {
	defaultImage,
	formatDateToLocal,
	formatTaskStatus,
} from "@/app/lib/utils";
import Image from "next/image";
import { Bars3Icon, CalendarIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { deleteTask } from "@/app/lib/actions";
import { useState } from "react";

export type CardProps = {
	task: Tasks;
	currentUserId: number;
};

export default function Card({ task, currentUserId }: CardProps) {
	const [open, setOpen] = useState(false);
	const deleteTaskWithId = deleteTask.bind(null, task.id);

	const orderedUsers = [...task.users].sort((a, b) => {
		if (a.id === currentUserId) return -1;
		if (b.id === currentUserId) return 1;
		return 0;
	});

	return (
		<div
			className={clsx(
				"w-full rounded-xl p-4 my-4 shadow-sm",
				{
					"bg-linear-to-b from-blue-200 to-white": task.status === "done",
				},
				{
					"bg-linear-to-b from-yellow-100 to-white": task.status === "pending",
				},
				{
					"bg-linear-to-b from-purple-200 to-white":
						task.status === "in_progress",
				},
			)}
		>
			<div className="flex items-center justify-between mb-3 min-w-0">
				<p className="bg-white rounded-4xl text-gray-600 font-bold text-sm py-1.5 px-2.5 min-h-7 min-w-7 truncate">
					{formatTaskStatus(task.type)}
				</p>
				<form action={deleteTaskWithId}>
					<button
						type="button"
						onClick={() => setOpen(prev => !prev)}
						className="bg-white p-1.5 rounded-md"
					>
						<Bars3Icon className="w-5" />
					</button>

					{open && (
						<div className="absolute rounded-lg  bg-white shadow-lg">
							<button
								type="submit"
								className="w-full text-left px-3 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
							>
								Delete
							</button>
						</div>
					)}
				</form>
			</div>
			<Link href={`/dashboard/tasks/edit/${task.id}`}>
				<div className="flex flex-col">
					<h1 className="font-bold truncate min-h-6">{task.title}</h1>
					<p className="truncate text-sm font-medium min-h-5 text-gray-500">
						{task.description}
					</p>
					<div className="my-2">
						<div className="flex truncate">
							{orderedUsers.map((user, index) => (
								<div
									key={user.name}
									className={`h-10 w-10 overflow-hidden rounded-full border-white border-2 shadow-lg ${index !== 0 ? "-ml-3" : ""}`}
									// style={{ zIndex: task.users.length - index }}
								>
									<Image
										src={user.photo || defaultImage}
										width={100}
										height={100}
										alt={user.name}
										className="w-full h-full object-cover"
									/>
								</div>
							))}
						</div>

						<div className="flex">
							<p className="text-sm font-bold truncate">
								{orderedUsers.length === 1
									? orderedUsers[0].name
									: orderedUsers.map(u => u.name.split(" ")[0]).join(", ")}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-gray-200 w-full h-0.5 mb-2" />
				<div className="flex gap-2 items-center mt-auto">
					<CalendarIcon className="w-5 text-gray-500 " />
					<p className="text-sm text-gray-500 font-bold">
						{formatDateToLocal(task.created_at)}
					</p>
				</div>
			</Link>
		</div>
	);
}
