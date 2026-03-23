import { status } from "@/app/lib/utils";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";

type StatusInputProps = {
	value?: string;
};

export default function StatusInput({ value }: StatusInputProps) {
	return (
		<div className="flex gap-3 items-center">
			<div className="flex gap-1 min-w-24">
				<CubeTransparentIcon className="w-5" />
				<p className="text-sm">Status</p>
			</div>
			<select name="status" defaultValue={value ?? ""}>
				{status.map(s => (
					<option key={s.value} value={s.value}>
						{s.label}
					</option>
				))}
			</select>
		</div>
	);
}
