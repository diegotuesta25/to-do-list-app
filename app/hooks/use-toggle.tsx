import { useState } from "react";

export function useToggle(input: boolean) {
	const [isOpen, setIsOpen] = useState(input);

	const toggle = () => {
		setIsOpen(prevIsOpen => !prevIsOpen);
	};

	return { isOpen, toggle, setIsOpen };
}
