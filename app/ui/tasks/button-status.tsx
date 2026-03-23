import { formatTaskStatus } from "@/app/lib/utils";
import { ClipboardDocumentIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type ButtonStatusProps = {
	status: string;
};

export default function ButtonStatus({ status }: ButtonStatusProps) {
	return (
		<div
			className={clsx(
				"flex border-2  items-center justify-between px-3 py-2 rounded-xl  text-lg font-medium",
				{
					"border-purple-700 text-purple-600": status === "in_progress",
				},
				{ "border-yellow-700 text-yellow-600": status === "pending" },
				{ "border-blue-700 text-blue-600": status === "done" },
			)}
		>
			<div className="flex gap-2 ">
				<ClipboardDocumentIcon className="w-5 " />
				<p className="  ">{formatTaskStatus(status)}</p>
			</div>
		</div>
	);
}
