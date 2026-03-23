import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useActionState, useEffect, useState } from "react";
import { defaultImage } from "@/app/lib/utils";
import { updateUser } from "@/app/lib/actions";
import { useQueryClient } from "@tanstack/react-query";

type ProfileFormProps = {
	user: any;
	onEdit: () => void;
};

export default function ProfileForm({ user, onEdit }: ProfileFormProps) {
	const initialState = { message: null, errors: {} };
	const updateUserWithId = updateUser.bind(null, Number(user.id));
	const [state, formAction] = useActionState(updateUserWithId, initialState);
	const queryClient = useQueryClient();
	const [image, setImage] = useState(defaultImage);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file) return;

		const isHeic =
			file.type === "image/heic" ||
			file.type === "image/heif" ||
			file.name.toLowerCase().endsWith(".heic") ||
			file.name.toLowerCase().endsWith(".heif");

		if (isHeic) {
			alert(
				"iPhone images (.HEIC) are not supported. Please convert to JPG or PNG.",
			);
			return;
		}

		const preview = URL.createObjectURL(file);
		setImage(preview);
	};

	useEffect(() => {
		if (user) {
			setImage(user.image || defaultImage);
		}
	}, [user]);

	useEffect(() => {
		if (state?.message === "success") {
			queryClient.setQueryData(["current-user"], (old: any) => ({
				...old,
				image: image,
			}));

			queryClient.invalidateQueries({ queryKey: ["current-user"] });

			onEdit();
		}
	}, [state, queryClient, image, onEdit]);

	useEffect(() => {
		return () => {
			if (image.startsWith("blob:")) {
				URL.revokeObjectURL(image);
			}
		};
	}, [image]);

	if (!user) {
		return <div className="p-12">Loading...</div>;
	}

	return (
		<form action={formAction}>
			<div className="grow p-6 md:overflow-y-auto md:p-12">
				<div className="flex justify-between items-center">
					<div>
						<p className="font-bold text-3xl">Profile</p>
						<p className="text-sm text-gray-500">Set your account details.</p>
					</div>

					<div className="flex gap-3">
						<button
							type="submit"
							className="min-w-24 h-10 px-3 py-2 rounded-xl bg-blue-500 shadow-sm shadow-blue-900 cursor-pointer text-white"
						>
							Save
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
							></input>
						</div>
						<div className="flex flex-col">
							<label className="text-gray-500">Email</label>
							<input
								type="email"
								name="email"
								className="w-full rounded-md border border-gray-500 px-2 py-1 md:w-sm"
								defaultValue={user.email}
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
							src={image || defaultImage}
							width={100000}
							height={100000}
							alt={user.name}
							className="w-40 h-40 object-cover rounded-full border-2 border-white shadow-xl"
						></Image>

						<div className="flex items-center gap-1">
							<input type="hidden" name="photo_url" value={image} />
							<label className="cursor-pointer rounded-xl border px-3 py-1 hover:bg-gray-200">
								Edit photo
								<input
									type="file"
									name="file"
									accept="image/png, image/jpeg, image/webp"
									className="hidden"
									onChange={handleFileUpload}
								/>
							</label>

							<button
								onClick={() => setImage(defaultImage)}
								type="button"
								className="border border-gray-500 rounded-full cursor-pointer hover:bg-red-300 p-2 hover:text-red-800"
							>
								<TrashIcon width={18} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}
