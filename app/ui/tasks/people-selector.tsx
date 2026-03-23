import { UserIcon } from "@heroicons/react/24/outline";
import SelectedUserItem from "./selected-user-item";
import { UserFromTask } from "@/app/lib/definitions";
import { useCurrentUser } from "@/app/hooks/use-current-user";

type PeopleSelectorProps = {
	selectedUsersId: number[];
	users: UserFromTask[];
	onAdd: (id: number) => void;
	onRemove: (id: number) => void;
};

export default function PeopleSelector({
	selectedUsersId,
	users,
	onAdd,
	onRemove,
}: PeopleSelectorProps) {
	const currentUser = useCurrentUser();

	if (!currentUser.user) return null;

	const setUsersId = new Set(selectedUsersId);
	const availableUsers = users.filter(user => !setUsersId.has(user.id));
	const selectedUsers = users.filter(user => setUsersId.has(user.id));
	return (
		<div className="flex flex-col gap-3">
			<div className="flex gap-3 items-center ">
				<div className="flex gap-1 min-w-24">
					<UserIcon className="w-5" />
					<p className="text-sm">People</p>
				</div>
				<select onChange={e => onAdd(Number(e.target.value))}>
					<option value="">Select a person</option>
					{availableUsers.map(u => (
						<option key={u.id} value={u.id}>
							{u.name}
						</option>
					))}
				</select>
			</div>
			<div className="flex">
				<div className="flex gap-1 min-w-28 h-full" />
				<div className="flex flex-wrap gap-3">
					<SelectedUserItem user={currentUser.user} />
					{selectedUsers
						.filter(userId => userId.id !== Number(currentUser.user.id))
						.map(user => (
							<SelectedUserItem key={user.id} user={user} onRemove={onRemove} />
						))}
				</div>
			</div>
		</div>
	);
}
