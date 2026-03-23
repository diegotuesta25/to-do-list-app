import { fetchTasksByUser } from "@/app/lib/data";
import ButtonStatus from "./button-status";
import ListCards from "./list-cards";
import { auth } from "@/auth";

type TasksListProps = {
	query?: string;
};

export default async function TasksList({ query }: TasksListProps) {
	const session = await auth();

	if (!session?.user?.email) {
		throw new Error("User not authenticated");
	}

	const tasks = await fetchTasksByUser(Number(session.user.id), query);
	const inProgressTasks = tasks.filter(t => t.status === "in_progress");
	const pendingTasks = tasks.filter(t => t.status === "pending");
	const doneTasks = tasks.filter(t => t.status === "done");

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
			<div className="">
				<ButtonStatus status="in_progress" />
				<ListCards tasks={inProgressTasks} />
			</div>
			<div>
				<ButtonStatus status="pending" />
				<ListCards tasks={pendingTasks} />
			</div>
			<div>
				<ButtonStatus status="done" />
				<ListCards tasks={doneTasks} />
			</div>
		</div>
	);
}
