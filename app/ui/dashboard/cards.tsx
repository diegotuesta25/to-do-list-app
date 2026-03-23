import { TaskCount, TaskStatus } from "@/app/lib/definitions";
import clsx from "clsx";
import Image from "next/image";

type CardProps = {
	type: TaskStatus;
	count: number;
};

export default function Card({ type, count }: CardProps) {
	const taskConfig = {
		done: {
			label: "Task completed",
			image: "/done.svg",
		},

		pending: {
			label: "To-do tasks",
			image: "/pending.svg",
		},

		in_progress: {
			label: "Ongoing tasks",
			image: "/in_progress.svg",
		},
	};

	const config = taskConfig[type];

	return (
		<div
			className={clsx(
				"px-8 py-8 rounded-2xl flex gap-5 justify-between flex-wrap",
				{ "bg-black text-white": type === "done" },
				{ "bg-purple-500 text-white": type === "pending" },
				{ "bg-purple-200 text-black": type === "in_progress" },
			)}
		>
			{config && (
				<>
					<div className="flex flex-col gap-1 justify-center">
						<h1 className="font-semibold text-2xl ">{count}</h1>
						<p className="">{config.label}</p>
					</div>
					<div className="flex items-center">
						<Image
							src={config.image}
							width={500}
							height={500}
							alt={type}
							className="w-20 h-20 rounded-full object-cover"
						/>
					</div>
				</>
			)}
		</div>
	);
}
