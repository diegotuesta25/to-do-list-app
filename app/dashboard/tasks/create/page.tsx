import { fetchUsers } from "@/app/lib/data";
import Form from "@/app/ui/tasks/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Task",
};

export default async function CreateTaskModal() {
	const users = await fetchUsers();
	return (
		<div>
			<Form users={users} />
		</div>
	);
}
