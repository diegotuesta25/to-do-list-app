import { fetchTask, fetchUsers } from "@/app/lib/data";
import Form from "@/app/ui/tasks/edit-form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const [task] = await fetchTask(Number(id));
	const users = await fetchUsers();

	return (
		<div>
			<div>
				<Form users={users} task={task} />
			</div>
		</div>
	);
}
