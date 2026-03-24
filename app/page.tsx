import Image from "next/image";
import LogoToDoList from "./ui/todolist-logo";
import LoginForm from "./ui/login-form";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
	return (
		<main className="flex bg-gray-50 h-screen flex-col md:flex-row-reverse">
			<div className="relative h-64 w-full md:h-auto md:w-1/2">
				<Image
					src="/home-desktop.jpg"
					fill
					alt="Desktop Image"
					className="object-cover hidden md:block"
					priority
				></Image>
				<Image
					src="/home-mobile.jpg"
					fill
					alt="Desktop Image"
					className="object-cover block md:hidden"
					priority
				></Image>
			</div>
			<div className="flex flex-col flex-1 items-center justify-between md:w-1/2">
				<div className="my-10 md:mt-20">
					<LogoToDoList />
				</div>
				<div className="flex flex-col items-center gap-3">
					<div className="flex flex-col items-center">
						<h1 className="font-bold text-xl md:text-3xl text-gray-900">
							Login
						</h1>

						<div className="flex gap-1">
							<p>or </p>
							<Link href="/signup" className="text-gray-500">
								create an account
							</Link>
						</div>
					</div>
					{/* Login Form */}
					<Suspense>
						<LoginForm />
					</Suspense>
				</div>
				<div className="my-20 mx-20">
					<p className="text-gray-400 text-center">
						Join thousands of people and easily organize all your tasks, keep
						track of what you’ve already completed, and prioritize the most
						important ones to make the most of your time and be more productive
						every day.
					</p>
				</div>
			</div>
		</main>
	);
}
