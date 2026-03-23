import { fetchUsers } from "@/app/lib/data";
import Form from "@/app/ui/tasks/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Task",
};

export default async function CreateTaskModal() {
	const users = await fetchUsers();

	return (
		<div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center overflow-auto p-4">
			<div className="w-full h-full md:h-auto md:max-h-[80vh] md:max-w-2xl bg-white rounded-xl overflow-y-auto p-6">
				<Form users={users} />
			</div>
		</div>
	);
}
