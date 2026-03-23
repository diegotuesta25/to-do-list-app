import { deleteTask } from "@/app/lib/actions";
import { Tasks } from "@/app/lib/definitions";
import { formatTaskStatus } from "@/app/lib/utils";
import { Bars3BottomLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

type PendingTaskCardProps = {
	task: Tasks;
};

export default function PendingTaskCard({ task }: PendingTaskCardProps) {
	const deleteTaskWithId = deleteTask.bind(null, task.id);

	return (
		<div className="flex justify-between px-4 py-5 items-center border-b-2 border-gray-200 gap-4 min-w-0">
			<Link
				href={`/dashboard/tasks/edit/${task.id}`}
				className="flex flex-col flex-1 min-w-0"
			>
				<div className="flex gap-1 items-center">
					<Bars3BottomLeftIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 shrink-0" />
					<p className="text-xs font-semibold text-gray-400 truncate">
						{task.type}
					</p>
				</div>
				<h1 className="text-sm md:text-lg font-bold truncate">{task.title}</h1>
			</Link>
			<div className="flex w-44 gap-2 items-center justify-end">
				<div
					className={clsx(
						"border rounded-lg px-2 py-1 flex items-center gap-1",
						{
							"border-yellow-300 bg-yellow-100 text-yellow-500":
								task.status === "pending",
						},
						{
							"border-purple-300 bg-purple-200 text-purple-400":
								task.status === "in_progress",
						},
					)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="size-3"
					>
						<path
							fillRule="evenodd"
							d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
							clipRule="evenodd"
						/>
					</svg>
					{formatTaskStatus(task.status)}
				</div>
				<form action={deleteTaskWithId}>
					<button
						type="submit"
						className="text-left p-2 rounded-full  hover:bg-gray-300 hover:border-gray-400 hover:shadow-gray-900 hover:shadow-xs cursor-pointer"
					>
						<TrashIcon className="w-5 h-5 rounded-lg  shadow-lg" />
					</button>
				</form>
			</div>
		</div>
	);
}
