import Image from "next/image";

const shimmer =
	"before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
	return (
		<div
			className={`${shimmer} relative flex bg-white px-5 py-7 rounded-2xl items-center justify-between overflow-hidden`}
		>
			<div className="flex flex-col gap-2 justify-center">
				<div className="h-8 w-12 bg-gray-200 rounded-md" />
				<div className="h-4 w-24 bg-gray-200 rounded-md" />
			</div>

			<div className="w-20 h-20 rounded-full bg-gray-200" />
		</div>
	);
}

export function CardWrapperSkeleton() {
	return (
		<div className="grid lg:grid-cols-3 gap-5">
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
		</div>
	);
}

export function NameCardSkeleton() {
	return (
		<div
			className={`${shimmer} relative flex bg-white px-5 py-7 rounded-2xl items-center gap-4 justify-between overflow-hidden`}
		>
			<div className="flex flex-col gap-2">
				<div className="h-7 w-48 bg-gray-200 rounded-md" />
				<div className="h-4 w-36 bg-gray-200 rounded-md" />
			</div>

			<div className="flex gap-2 items-end">
				<div className="flex flex-col items-center gap-2">
					<div className="flex">
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className={`w-7 h-7 rounded-full bg-gray-200 border-2 border-white ${i !== 0 ? "-ml-2" : ""}`}
							/>
						))}
					</div>
					<div className="h-4 w-16 bg-gray-200 rounded-md" />
				</div>

				<div className="h-6 w-12 bg-gray-200 rounded-md mb-auto mt-auto" />
			</div>
		</div>
	);
}

export function PendingTasksSkeleton() {
	return (
		<div
			className={`${shimmer} relative flex flex-col bg-white py-7 px-5 rounded-2xl gap-3 flex-1 min-w-0 overflow-hidden`}
		>
			<div className="flex justify-between items-center">
				<div className="h-8 w-48 bg-gray-200 rounded-md" />
				<div className="h-9 w-28 bg-gray-200 rounded-xl" />
			</div>

			<div className="flex flex-col flex-1 gap-4">
				{[...Array(5)].map((_, i) => (
					<div
						key={i}
						className="flex justify-between px-4 py-5 items-center border-b-2 border-gray-200 gap-4"
					>
						<div className="flex flex-col gap-2 flex-1 min-w-0">
							<div className="h-3 w-16 bg-gray-200 rounded-md" />
							<div className="h-5 w-3/4 bg-gray-200 rounded-md" />
						</div>

						<div className="flex w-44 gap-2 items-center justify-end">
							<div className="h-7 w-24 bg-gray-200 rounded-lg" />
							<div className="h-9 w-9 bg-gray-200 rounded-full" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default function DashboardSkeleton() {
	return (
		<div className="grid lg:grid-cols-3 lg:h-full gap-5">
			<div className="flex flex-col gap-5 lg:col-span-2 lg:h-full min-w-0">
				<NameCardSkeleton />
				<CardWrapperSkeleton />
				<PendingTasksSkeleton />
			</div>
			<Image
				src="/dashboard-photo.jpg"
				width={1000}
				height={1000}
				alt="Dashboard Photo"
				className="rounded-2xl h-full w-full object-cover"
				priority
			/>
		</div>
	);
}

function TaskCardSkeleton() {
	return (
		<div className="w-full rounded-xl p-4 my-4 bg-gray-100 border border-gray-200">
			{/* type badge + menu button */}
			<div className="flex items-center justify-between mb-3">
				<div className="h-7 w-20 bg-gray-200 rounded-full" />
				<div className="h-8 w-8 bg-gray-200 rounded-md" />
			</div>

			{/* title + description */}
			<div className="flex flex-col gap-2 mb-3">
				<div className="h-5 w-3/4 bg-gray-200 rounded-md" />
				<div className="h-4 w-full bg-gray-200 rounded-md" />
			</div>

			{/* avatars + name */}
			<div className="flex flex-col gap-1 my-2">
				<div className="flex">
					{[...Array(2)].map((_, i) => (
						<div
							key={i}
							className={`h-10 w-10 rounded-full bg-gray-200 border-2 border-white ${i !== 0 ? "-ml-3" : ""}`}
						/>
					))}
				</div>
				<div className="h-4 w-24 bg-gray-200 rounded-md" />
			</div>

			<div className="bg-gray-200 w-full h-0.5 mb-2" />

			{/* date */}
			<div className="flex gap-2 items-center">
				<div className="h-5 w-5 bg-gray-200 rounded-md" />
				<div className="h-4 w-28 bg-gray-200 rounded-md" />
			</div>
		</div>
	);
}

function TaskColumnSkeleton() {
	return (
		<div>
			{/* ButtonStatus placeholder */}
			<div className="h-9 w-32 bg-gray-200 rounded-xl mb-1" />
			{/* 3 card skeletons per column */}
			{[...Array(3)].map((_, i) => (
				<TaskCardSkeleton key={i} />
			))}
		</div>
	);
}

export function TasksListSkeleton() {
	return (
		<div
			className={`${shimmer} relative grid grid-cols-1 lg:grid-cols-3 gap-5 overflow-hidden`}
		>
			<TaskColumnSkeleton />
			<TaskColumnSkeleton />
			<TaskColumnSkeleton />
		</div>
	);
}
