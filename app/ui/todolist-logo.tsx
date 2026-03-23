import Image from "next/image";
import { poppins } from "./fonts";

type LogoProps = {
	className?: string;
	imageClassName?: string;
	textClassName?: string;
};

export default function LogoToDoList({
	className,
	imageClassName,
	textClassName,
}: LogoProps) {
	return (
		<div className={`flex items-center gap-2 ${className || ""}`}>
			<Image
				src="/logo-todo.svg"
				width={50}
				height={50}
				alt="Logo"
				className={`object-contain ${imageClassName || ""}`}
			/>
			<h1
				className={`${poppins.className}  ${textClassName || "text-xl md:text-3xl "} `}
			>
				To Do List App
			</h1>
		</div>
	);
}
