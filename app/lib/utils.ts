export const defaultImage =
	"https://res.cloudinary.com/dhcloxbs4/image/upload/v1773503946/default-user_rsq7tp.jpg";

export const status = [
	{ value: "in_progress", label: "In Progress" },
	{ value: "pending", label: "Pending" },
	{ value: "done", label: "Done" },
];

export const formatDateToLocal = (
	dateStr: string,
	locale: string = "en-US",
) => {
	const date = new Date(dateStr);
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "short",
		year: "numeric",
	};
	const formatter = Intl.DateTimeFormat(locale, options);
	return formatter.format(date);
};

export const formatTaskStatus = (status: string) => {
	// Cambia guion bajo por espacio y pone la primera letra en mayúscula
	return status.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
};

export const handleInput = (e: any) => {
	const el = e.currentTarget as HTMLTextAreaElement;
	el.style.height = "auto";
	el.style.height = el.scrollHeight + "px";
};
