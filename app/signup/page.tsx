import Image from "next/image";
import SignupForm from "../ui/signup-form";
import LogoToDoList from "../ui/todolist-logo";
import Link from "next/link";

export default function Page() {
	return (
		<div className="flex bg-gray-50 min-h-screen flex-col md:flex-row-reverse">
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
			<div className="flex flex-col flex-1 md:w-1/2 items-center justify-between">
				<LogoToDoList className="my-10 md:mt-20" />
				<div className=" flex flex-col gap-3 ">
					<div className="flex flex-col items-center">
						<h1 className="font-bold text-xl md:text-3xl text-gray-900">
							Create an account
						</h1>
						<div className="flex gap-1 ">
							<p>or </p>
							<Link href="/" className="text-gray-500">
								sign in
							</Link>
						</div>
					</div>

					<SignupForm />
				</div>
				<div className="my-20"></div>
			</div>
		</div>
	);
}
