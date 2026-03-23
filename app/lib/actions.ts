"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { defaultImage } from "./utils";

const globalForSql = global as unknown as { sql: ReturnType<typeof postgres> };

export const sql =
	globalForSql.sql ??
	postgres(process.env.POSTGRES_URL!, {
		max: 5, // limit connections
	});

if (process.env.NODE_ENV !== "production") globalForSql.sql = sql;

//It would be better to be TaskState
export type State = {
	errors?: {
		title?: string[];
		status?: string[];
		type?: string[];
		description?: string[];
		usersId?: string[];
	};
	message?: string | null;
};

export type UserState = {
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
		photo?: string[];
	};
	message?: string | null;
};

export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		await signIn("credentials", formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return "Invalid credentials.";
				default:
					return "Something went wrong.";
			}
		}
		throw error;
	}
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
	revalidatePath("/");
}

export async function createTask(
	prevState: State,
	formData: FormData,
): Promise<State> {
	const title = formData.get("title") as string;
	const status = formData.get("status") as string;
	const type = formData.get("type") as string;
	const description = formData.get("description") as string;
	const usersId = formData.getAll("usersId") as string[];

	try {
		await sql.begin(async (tx: any) => {
			const [task] = await tx`
                INSERT INTO tasks(title,description,status,type)
                VALUES (${title},${description},${status},${type})
                RETURNING id
            `;

			const taskId = task.id;

			if (usersId.length > 0) {
				await tx`
                    INSERT INTO task_users ${tx(
											usersId.map(u => ({
												task_id: taskId,
												user_id: u,
											})),
										)}
                `;
			}
		});
	} catch (error) {
		throw new Error("Failed to create a task.");
	}

	revalidatePath("/dashboard/tasks");
	return { message: "success" };
}

export async function editTask(
	id: number,
	prevState: State,
	formData: FormData,
): Promise<State> {
	const title = formData.get("title") as string;
	const status = formData.get("status") as string;
	const type = formData.get("type") as string;
	const description = formData.get("description") as string;
	const usersId = formData.getAll("usersId") as string[];

	try {
		await sql.begin(async (tx: any) => {
			await tx`
        UPDATE tasks
        SET title = ${title},
            description = ${description},
            status = ${status},
            type = ${type}
        WHERE id = ${id}
      `;

			await tx`
        DELETE FROM task_users
        WHERE task_id = ${id}
      `;

			if (usersId.length > 0) {
				await tx`
          INSERT INTO task_users ${tx(
						usersId.map(u => ({
							task_id: id,
							user_id: u,
						})),
					)}
        `;
			}
		});
	} catch (error) {
		console.log(error);
		throw new Error("Failed to edit the task.");
	}

	revalidatePath("/dashboard/tasks");
	return { message: "success" };
}

export async function deleteTask(id: number) {
	await sql.begin(async (tx: any) => {
		await tx`
		DELETE FROM tasks
		WHERE id = ${id}
		`;

		await tx`
		DELETE FROM task_users
		WHERE task_id = ${id}`;
	});
	revalidatePath("/dashboard/tasks");
}

export async function createUser(
	prevState: UserState,
	formData: FormData,
): Promise<UserState> {
	console.log(formData);
	const name = (await formData.get("name")) as string;
	const email = (await formData.get("email")) as string;
	const password = (await formData.get("password")) as string;
	const hashedPassword = await bcrypt.hash(password, 10);

	console.log(name, email, hashedPassword);

	try {
		await sql`
			INSERT INTO users(name,email,password,photo_url)
			VALUES (${name},${email},${hashedPassword},${defaultImage})
		`;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to create a user");
	}
	revalidatePath("/");
	redirect("/");
}

export async function updateUser(
	id: number,
	prevState: UserState,
	formData: FormData,
): Promise<UserState> {
	const name = (await formData.get("name")) as string;
	const email = (await formData.get("email")) as string;
	const file = ((await formData.get("file")) as File) || null;

	let photoUrl = formData.get("photo_url") as string;

	console.log("Foto God", photoUrl);
	if (file && file.size > 0) {
		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "To_do_list_cloudinary");
		data.append("cloud_name", "dhcloxbs4");

		const res = await fetch(
			"https://api.cloudinary.com/v1_1/dhcloxbs4/image/upload",
			{
				method: "POST",
				body: data,
			},
		);

		const uploadedImageURL = await res.json();
		photoUrl = uploadedImageURL.secure_url;
	}

	console.log("Foto ya pasada", photoUrl);
	try {
		await sql`
			UPDATE users
			SET
				name = ${name},
				email= ${email},
				photo_url =${photoUrl}
			WHERE id = ${id}
		`;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to update a user");
	}
	revalidatePath("/profile");
	return { message: "success" };
}
