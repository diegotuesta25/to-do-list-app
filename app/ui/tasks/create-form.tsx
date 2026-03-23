"use client";

import { createTask, State } from "@/app/lib/actions";
import { UserFromTask } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useState } from "react";
import TitleInput from "./title-input";
import DescriptionInput from "./description-input";
import StatusInput from "./status-input";
import CategoryInput from "./category-input";
import PeopleSelector from "./people-selector";
import { useCurrentUser } from "@/app/hooks/use-current-user";

export default function Form({ users }: { users: UserFromTask[] }) {
	const user = useCurrentUser().user;

	const [selectedUsersId, setSelectedUsersId] = useState<number[]>([]);

	useEffect(() => {
		if (user) {
			setSelectedUsersId([Number(user.id)]);
		}
	}, [user]);

	const initialState: State = { message: null, errors: {} };
	const [state, formAction] = useActionState(createTask, initialState);

	const router = useRouter();

	useEffect(() => {
		if (state?.message === "success") router.back();
	}, [state, router]);

	if (!user) return null;

	//Not expensive enough for optimization
	//const setUsersId = useMemo(() => new Set(selectedUsersId), [selectedUsersId]);

	const handleAddUser = (id: number) => {
		if (!id) return;
		setSelectedUsersId(prev => [...prev, id]);
	};

	const handleRemoveUser = (id: number) => {
		setSelectedUsersId(prev => prev.filter(userId => userId !== id));
	};

	return (
		<form action={formAction}>
			<div className="flex flex-col w-full h-full gap-2">
				<TitleInput />
				<div className="flex flex-col gap-3">
					<StatusInput />
					<CategoryInput />
					<PeopleSelector
						selectedUsersId={selectedUsersId}
						users={users}
						onAdd={handleAddUser}
						onRemove={handleRemoveUser}
					/>
				</div>
				{/* Description  */}
				<div className="h-[1] w-full bg-gray-400 my-2"></div>
				<DescriptionInput />
				<div className="flex gap-3 justify-end">
					<button
						type="button"
						onClick={() => router.back()}
						className="min-w-24 px-3 py-2 rounded-xl border border-gray-300 shadow-lg cursor-pointer"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="min-w-24 px-3 py-2 rounded-xl bg-blue-500 shadow-sm shadow-blue-900 cursor-pointer"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
}
