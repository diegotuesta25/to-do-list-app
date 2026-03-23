import { fetchPendingTasksByUser } from "@/app/lib/data";
import { auth } from "@/auth";
import PendingTaskCard from "./pending-task-card";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export default async function PendingTasks() {
	const session = await auth();

	const pendingTasks = await fetchPendingTasksByUser(Number(session?.user?.id));

	if (!session?.user) return null;

	return (
		<div className="flex flex-col bg-white py-7 px-5 rounded-2xl gap-1 md:gap-3 flex-1 min-w-0 overflow-hidden">
			<div className="flex justify-between items-center">
				<h1 className="text-lg md:text-2xl font-bold">Recent To Do Tasks</h1>
				<div>
					<Link href="/dashboard/tasks/create">
						<button className="flex text-gray-500 font-medium bg-gray-200 gap-3 rounded-xl items-center justify-center px-3 py-2 cursor-pointer">
							<PlusIcon className="w-5" />
							<p className="text-sm md:text-base">Add Task</p>
						</button>
					</Link>
				</div>
			</div>
			<div
				className={`flex flex-col flex-1 w-full ${pendingTasks.length === 0 ? "justify-center" : ""}`}
			>
				{pendingTasks.length === 0 ? (
					<div className="font-bold text-center">No tasks for today 🎉</div>
				) : (
					pendingTasks.map(task => (
						<PendingTaskCard key={task.id} task={task} />
					))
				)}
			</div>
		</div>
	);
}
