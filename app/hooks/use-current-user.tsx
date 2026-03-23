"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchUser() {
	const res = await fetch("/api/me", {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch user");
	}

	return res.json();
}

export function useCurrentUser() {
	const query = useQuery({
		queryKey: ["current-user"],
		queryFn: fetchUser,
	});

	return {
		user: query.data,
		isLoading: query.isLoading,
		error: query.error,
	};
}
