import { useFormStatus } from "react-dom";

export default function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="min-w-24 px-3 py-2 rounded-xl bg-blue-500 shadow-sm shadow-blue-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{pending ? "Saving..." : "Save"}
		</button>
	);
}
