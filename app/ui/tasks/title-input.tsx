import { handleInput } from "@/app/lib/utils";

type TitleInputProps = {
	value?: string;
};

export default function TitleInput({ value }: TitleInputProps) {
	return (
		<textarea
			onInput={handleInput}
			rows={1}
			defaultValue={value ?? ""}
			onKeyDown={e => {
				if (e.key === "Enter") {
					e.preventDefault();
					document.getElementById("next-input")?.focus();
				}
			}}
			name="title"
			placeholder="New Task"
			className="w-full resize-none overflow-hidden focus:outline-none text-4xl font-bold"
		/>
	);
}
