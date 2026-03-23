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
		<div className="flex flex-col gap-4">
			<p className="font-bold text-3xl">Tasks</p>

			<div className="flex justify-between gap-3">
				<Search placeholder="Search a task..." />
				<Link href="/dashboard/tasks/create" className="self-start">
					<button className="flex text-gray-500 font-medium bg-gray-200 gap-3 rounded-xl items-center justify-center px-3 py-2 cursor-pointer hover:bg-purple-300 hover:text-purple-600 hover:border-purple-900">
						<PlusIcon className="w-5 shrink-0" />
						<p className="text-sm md:text-base">Add Task</p>
					</button>
				</Link>
			</div>
			<Suspense key={query} fallback={<TasksListSkeleton />}>
				<TasksList query={query} />
			</Suspense>
		</div>
	);
}
