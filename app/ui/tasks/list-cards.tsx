import { Tasks } from "@/app/lib/definitions";
import Card from "./card";

type ListCardsProps = {
	tasks: Tasks[];
	currentUserId: number;
};

export default function ListCards({ tasks, currentUserId }: ListCardsProps) {
	return (
		<div>
			{tasks.map(task => (
				<Card key={task.id} task={task} currentUserId={currentUserId} />
			))}
		</div>
	);
}
