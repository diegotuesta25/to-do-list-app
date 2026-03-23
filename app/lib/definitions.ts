export type User = {
	id: number;
	name: string;
	email: string;
	password: string;
	photo: string;
};

export type UserFromTask = {
	id: number;
	name: string;
	email: string;
	photo: string;
};

export type TaskStatus = "pending" | "done" | "in_progress";

export type Tasks = {
	id: number;
	title: string;
	description: string;
	status: TaskStatus;
	type: string;
	created_at: string;
	users: UserFromTask[];
};

export type TaskUser = {
	task_id: number;
	user_id: number;
};

export type TaskForm = {
	id: number;
	title: string;
	description: string;
	type: string;
	status: TaskStatus;
	user_ids: number[];
};

export type TaskCount = {
	done: number;
	pending: number;
	in_progress: number;
};
