import clsx from "clsx";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
	type: string;
};

export default function SubmitButton({ type }: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className={clsx(
				`min-w-24 px-3 py-2 rounded-xl  shadow-sm  cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`,
				{
					"bg-blue-500 shadow-blue-900": type === "save-task",
				},
				{
					"bg-black text-white hover:bg-gray-500 transition cursor-pointer focus:ring-black focus:ring-2":
						type === "sign-up",
				},
			)}
		>
			{pending ? "Saving..." : "Save"}
		</button>
	);
}
