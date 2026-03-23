import { fetchTask, fetchUsers } from "@/app/lib/data";
import Form from "@/app/ui/tasks/edit-form";
import ModalWrapper from "@/app/ui/tasks/modal-wrapper"; // path to wrapper

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const users = await fetchUsers();
	const { id } = await props.params;
	const [task] = await fetchTask(Number(id));

	return (
		<div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center overflow-auto p-4">
			<div className="w-full h-full md:h-auto md:max-h-[80vh] md:max-w-2xl bg-white rounded-xl overflow-y-auto p-6">
				<Form users={users} task={task} />
			</div>
		</div>
	);
}
