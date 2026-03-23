import { useCurrentUser } from "@/app/hooks/use-current-user";
import { UserFromTask } from "@/app/lib/definitions";
import { defaultImage } from "@/app/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type SelectedUserItemProps = {
	user: any;
	onRemove?: (id: number) => void;
};

export default function SelectedUserItem({
	user,
	onRemove,
}: SelectedUserItemProps) {
	const currentUser = useCurrentUser();

	if (!currentUser.user) return null;

	const currentUserId = Number(currentUser.user.id);

	return (
		<div className="flex items-center gap-2">
			<input type="hidden" name="usersId" value={user.id} />
			<Image
				src={user.photo ?? user.image}
				width={50}
				height={50}
				alt={user.name ?? "User"}
				className="w-9 h-9 rounded-full object-cover border-gray-400 border"
			/>
			<div className="">
				<p className="text-sm font-bold">{user.name}</p>
				<p className="text-xs text-gray-500">{user.email}</p>
			</div>
			{onRemove && currentUserId !== Number(user.id) && (
				<button type="button" onClick={() => onRemove(user.id)}>
					<XMarkIcon className="w-5 h-5 text-gray-500 ml-2 cursor-pointer" />
				</button>
			)}
		</div>
	);
}
