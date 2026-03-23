"use client";
import { useEffect } from "react";

export default function ModalWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		// Lock body scroll
		document.body.style.overflow = "hidden";

		return () => {
			// Unlock body scroll on unmount
			document.body.style.overflow = "";
		};
	}, []);

	return <>{children}</>;
}
