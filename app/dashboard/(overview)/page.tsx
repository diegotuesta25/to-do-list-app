import CardWrapper from "@/app/ui/dashboard/card-wrapper";
import NameCard from "@/app/ui/dashboard/name-card";
import PendingTasks from "@/app/ui/dashboard/pending-tasks";
import {
	CardWrapperSkeleton,
	NameCardSkeleton,
	PendingTasksSkeleton,
} from "@/app/ui/skeletons";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function Dashboard() {
	return (
		<>
			<div className="grid lg:grid-cols-3 lg:h-full gap-5 ">
				<div className="flex flex-col gap-5 lg:col-span-2 lg:h-full min-w-0">
					<Suspense fallback={<NameCardSkeleton />}>
						<NameCard />
					</Suspense>
					<Suspense fallback={<CardWrapperSkeleton />}>
						<CardWrapper />
					</Suspense>
					<Suspense fallback={<PendingTasksSkeleton />}>
						<PendingTasks />
					</Suspense>
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
