import { fetchTask, fetchUsers } from "@/app/lib/data";
import Form from "@/app/ui/tasks/edit-form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const users = await fetchUsers();
	const { id } = await props.params;
	const [task] = await fetchTask(Number(id));

	return (
		<div className="fixed inset-x-0 top-36 bottom-0 md:flex md:inset-0 md:bg-black/40 md:justify-center md:items-center">
			<div className="w-full h-full p-6 bg-white md:rounded-xl md:max-h-[80vh] md:h-auto md:max-w-2xl md:overflow-y-auto">
				<Form users={users} task={task} />
			</div>
		</div>
	);
}
