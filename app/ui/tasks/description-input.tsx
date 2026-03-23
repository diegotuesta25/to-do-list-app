import { handleInput } from "@/app/lib/utils";

type DescriptionInputProps = {
	value?: string;
};

export default function DescriptionInput({ value }: DescriptionInputProps) {
	return (
		<textarea
			onInput={handleInput}
			name="description"
			rows={20}
			defaultValue={value ?? ""}
			placeholder="Write a description here..."
			className="w-full focus:outline-none resize-none"
		/>
	);
}
