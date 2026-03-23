import { PlusIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Link from "next/link";
import TasksList from "@/app/ui/tasks/tasks-list";
import Search from "@/app/ui/tasks/search";
import { Suspense } from "react";
import { TasksListSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
	title: "Tasks",
};

export default async function Tasks(props: {
	searchParams?: Promise<{
		query?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || "";

	return (
		<div>
			<div className="">
				<p className="font-bold text-3xl">Tasks</p>
			</div>

			<div className="flex justify-between my-4 gap-2">
				<Search placeholder="Search a task..." />
				<div>
					<Link href="/dashboard/tasks/create">
						<button className="flex text-gray-500 font-medium bg-gray-200 gap-3 rounded-xl items-center justify-center px-3 py-2 cursor-pointer hover:bg-purple-300 hover:text-purple-600 hover:border-purple-900">
							<PlusIcon className="w-5" />
							<p className="">Add Task</p>
						</button>
					</Link>
				</div>
			</div>
			<Suspense key={query} fallback={<TasksListSkeleton />}>
				<TasksList query={query} />
			</Suspense>
		</div>
	);
}
