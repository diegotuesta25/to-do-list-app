import { PaintBrushIcon } from "@heroicons/react/24/outline";

type CategoryInputProps = {
	value?: string;
};

export default function CategoryInput({ value }: CategoryInputProps) {
	return (
		<div className="flex gap-3 items-center">
			<div className="flex gap-1 min-w-24">
				<PaintBrushIcon className="w-5" />
				<p className="text-sm">Category</p>
			</div>

			<input
				name="type"
				type="text"
				placeholder="Empty"
				defaultValue={value ?? ""}
				className="focus:outline-none pl-1"
			/>
		</div>
	);
}
