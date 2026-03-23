import { auth } from "@/auth";
import Card from "./cards";
import { fetchTaskCountsByUser } from "@/app/lib/data";

export default async function CardWrapper() {
	const session = await auth();

	const tasksCount = await fetchTaskCountsByUser(Number(session?.user?.id));

	if (!session?.user) return null;
	return (
		<div className="grid lg:grid-cols-3 gap-5">
			<Card type="done" count={tasksCount.done} />
			<Card type="pending" count={tasksCount.pending} />
			<Card type="in_progress" count={tasksCount.in_progress} />
		</div>
	);
}
