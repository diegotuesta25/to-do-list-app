import type { Metadata } from "next";
import { inter } from "./ui/fonts";
import "./ui/globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
	title: {
		template: "%s | Taskboard App",
		default: "Taskboard App",
	},
	description: "You can manage your tasks here",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<Providers>
					<NextTopLoader color="#E982FF" height={3} showSpinner={false} />
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
