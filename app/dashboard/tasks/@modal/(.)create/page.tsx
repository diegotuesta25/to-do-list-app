import { fetchUsers } from "@/app/lib/data";
import Form from "@/app/ui/tasks/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Task",
};

export default async function CreateTaskModal() {
	const users = await fetchUsers();

	return (
		<div className="fixed inset-x-0 bottom-0 top-36 md:inset-0 md:bg-black/40 md:flex md:items-center md:justify-center ">
			<div className="bg-white w-full h-full p-6 md:rounded-xl md:max-w-2xl md:h-auto md:max-h-[80vh] md:overflow-y-auto">
				<Form users={users} />
			</div>
		</div>
	);
}
