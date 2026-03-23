"use client";
import { useState } from "react";
import SideNav from "../ui/dashboard/sidenav";
import { useCurrentUser } from "../hooks/use-current-user";
import ProfileForm from "../ui/profile/edit-profile-form";
import Profile from "../ui/profile/view-profile";

export default function Page() {
	const currentUser = useCurrentUser().user;
	const [isEditing, setIsEditing] = useState(false);

	const handleEditing = () => {
		setIsEditing(true);
	};

	const handleNotEditing = () => {
		setIsEditing(false);
	};

	if (!currentUser) return null;

	return (
		<div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-100 text-gray-900">
			<div className="w-full flex-none md:w-64">
				<SideNav />
			</div>

			{isEditing ? (
				<ProfileForm user={currentUser} onEdit={handleNotEditing} />
			) : (
				<Profile user={currentUser} onEdit={handleEditing} />
			)}
		</div>
	);
}
