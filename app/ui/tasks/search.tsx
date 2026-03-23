"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearchTask = useDebouncedCallback((task: string) => {
		const params = new URLSearchParams(searchParams);
		if (task) {
			params.set("query", task);
		} else {
			params.delete("query");
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div className="flex flex-1 md:flex-0 bg-white border border-gray-400 shadow-sm rounded-xl px-3 items-center gap-3 text-gray-600">
			<MagnifyingGlassIcon className="w-5" />
			<input
				type="text"
				placeholder={placeholder}
				onChange={e => handleSearchTask(e.target.value)}
				className="focus:outline-none"
				defaultValue={searchParams.get("query")?.toString()}
			/>
		</div>
	);
}
