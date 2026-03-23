import type { Metadata } from "next";
import { inter } from "./ui/fonts";
import "./ui/globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
	title: {
		template: "%s | To Do List App",
		default: "To Do List App",
	},
	description: "You can make your to do list here",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
