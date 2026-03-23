import { Tasks } from "@/app/lib/definitions";
import Card from "./card";

type ListCardsProps = {
	tasks: Tasks[];
};

export default function ListCards({ tasks }: ListCardsProps) {
	return (
		<div>
			{tasks.map(task => (
				<div key={task.id}>
					<Card task={task} />
				</div>
			))}
		</div>
	);
}
