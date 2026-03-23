import { Metadata } from "next";
import NameCard from "../ui/dashboard/name-card";
import Card from "../ui/dashboard/cards";
import PendingTasks from "../ui/dashboard/pending-tasks";
import Image from "next/image";
import { fetchTaskCountsByUser } from "../lib/data";
import { auth } from "@/auth";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function Dashboard() {
	const session = await auth();

	const tasksCount = await fetchTaskCountsByUser(Number(session?.user?.id));

	if (!session?.user) return null;

	return (
		<>
			<div className="grid lg:grid-cols-3 lg:h-full gap-5">
				<div className="flex flex-col gap-5 lg:col-span-2 lg:h-full">
					<NameCard />
					<div className="grid lg:grid-cols-3 gap-5">
						<Card type="done" count={tasksCount.done} />
						<Card type="pending" count={tasksCount.pending} />
						<Card type="in_progress" count={tasksCount.in_progress} />
					</div>
					<PendingTasks />
				</div>
				<Image
					src="/dashboard-photo.jpg"
					width={1000}
					height={1000}
					alt="Dashboard Photo"
					className="rounded-2xl h-full w-full object-cover"
				/>
			</div>
		</>
	);
}
