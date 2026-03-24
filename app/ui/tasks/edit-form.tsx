"use client";
import { TaskForm, UserFromTask } from "@/app/lib/definitions";
import TitleInput from "./title-input";
import StatusInput from "./status-input";
import CategoryInput from "./category-input";
import PeopleSelector from "./people-selector";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DescriptionInput from "./description-input";
import { editTask, State } from "@/app/lib/actions";
import { toast } from "sonner";
import SubmitButton from "./submit-button";

type FormProps = {
	users: UserFromTask[];
	task: TaskForm;
};

export default function Form({ users, task }: FormProps) {
	const [selectedUsersId, setSelectedUsersId] = useState<number[]>(
		task.user_ids,
	);
	const initialState: State = { message: null, errors: {} };
	const editTaskWithId = editTask.bind(null, task.id);
	// const editTaskWithId = (prevState: State, formAction: FormData) => {
	// 	return editTask(task.id, prevState, formAction);
	// };
	const [state, formAction] = useActionState(editTaskWithId, initialState);
	const router = useRouter();

	useEffect(() => {
		if (state?.message === "success") {
			router.back();
		}
	}, [state, router]);

	const handleAddUser = (id: number) => {
		if (!id) return;
		setSelectedUsersId(prev => [...prev, id]);
	};

	const handleRemoveUser = (id: number) => {
		setSelectedUsersId(prev => selectedUsersId.filter(userId => userId !== id));
	};

	return (
		<form action={formAction}>
			<div className="flex flex-col w-full h-full gap-2">
				<TitleInput value={task.title} />
				<div className="flex flex-col gap-3">
					<StatusInput value={task.status} />
					<CategoryInput value={task.type} />
					<PeopleSelector
						users={users}
						selectedUsersId={selectedUsersId}
						onAdd={handleAddUser}
						onRemove={handleRemoveUser}
					/>
				</div>
				{/* Description */}
				<div className="h-[1] w-full bg-gray-400 my-2"></div>
				<DescriptionInput value={task.description} />
				<div className="flex gap-3 justify-end">
					<button
						type="button"
						onClick={() => router.back()}
						className="min-w-24 px-3 py-2 rounded-xl border border-gray-300 shadow-lg cursor-pointer"
					>
						Cancel
					</button>
					<SubmitButton type="save-task" />
				</div>
			</div>
		</form>
	);
}
