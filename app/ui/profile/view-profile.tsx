import { defaultImage } from "@/app/lib/utils";
import Image from "next/image";

type ProfileProps = {
	user: any;
	onEdit: () => void;
};

export default function Profile({ user, onEdit }: ProfileProps) {
	return (
		<div className="p-6 md:overflow-y-auto md:p-12">
			<div className="flex justify-between items-center">
				<div>
					<p className="font-bold text-3xl">Profile</p>
					<p className="text-sm text-gray-500">Set your account details.</p>
				</div>

				<div className="flex gap-3">
					<button
						type="button"
						className="min-w-24 h-10 px-3 py-2 rounded-xl bg-blue-500 shadow-sm shadow-blue-900 cursor-pointer text-white"
						onClick={() => onEdit()}
					>
						Edit
					</button>
				</div>
			</div>

			<div className="flex flex-col gap-10 md:items-center md:flex-wrap md:flex-row py-6">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col">
						<label className="text-gray-500">Name</label>
						<input
							type="text"
							name="name"
							className="w-full rounded-md border border-gray-500 px-2 py-1 md:w-sm"
							defaultValue={user.name}
							disabled
						></input>
					</div>
					<div className="flex flex-col">
						<label className="text-gray-500">Email</label>
						<input
							type="email"
							name="email"
							className="w-full rounded-md border border-gray-500 px-2 py-1 md:w-sm"
							defaultValue={user.email}
							disabled
						></input>
					</div>

					<div className="flex flex-col">
						<label className="text-gray-500">Password</label>
						<input
							type="password"
							placeholder="***********"
							className="w-full rounded-md border border-gray-500 px-2 py-1 md:w-sm"
							disabled
						></input>
					</div>
				</div>

				<div className="flex flex-col gap-2 items-center">
					<Image
						src={user.image || defaultImage}
						width={100000}
						height={100000}
						alt={user.name}
						className="w-40 h-40 object-cover rounded-full border-2 border-white shadow-xl"
					></Image>
				</div>
			</div>
		</div>
	);
}
