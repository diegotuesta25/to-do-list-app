import postgres from "postgres";
import { TaskCount, TaskForm, Tasks, UserFromTask } from "./definitions";

const globalForSql = global as unknown as { sql: ReturnType<typeof postgres> };

export const sql =
	globalForSql.sql ??
	postgres(process.env.POSTGRES_URL!, {
		max: 5, // limit connections
	});

if (process.env.NODE_ENV !== "production") globalForSql.sql = sql;

export async function fetchTasksByUser(userId: number, query?: string | null) {
	try {
		let filter = sql``;

		if (query?.trim()) {
			filter = sql`AND t.title ILIKE ${"%" + query + "%"}`;
		}

		const data = await sql<Tasks[]>`
      SELECT
        t.id,
        t.title,
        t.description,
        t.status,
        t.created_at,
        t.type,
        json_agg(
          json_build_object(
            'id', u.id,
            'name', u.name,
            'email', u.email,
            'photo', u.photo_url
          )
        ) AS users
      FROM tasks t
      JOIN task_users tu ON t.id = tu.task_id
      JOIN users u ON tu.user_id = u.id
      WHERE t.id IN (
        SELECT task_id 
        FROM task_users 
        WHERE user_id = ${userId}
      )
      ${filter}
      GROUP BY t.id, t.title, t.description, t.status, t.created_at, t.type
      ORDER BY t.created_at DESC
    `;

		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch tasks");
	}
}

export async function fetchTaskCountsByUser(userId: number) {
	try {
		const data = await sql<TaskCount[]>`
      SELECT
        COUNT(*) FILTER (WHERE t.status = 'pending') AS pending,
        COUNT(*) FILTER (WHERE t.status = 'in_progress') AS in_progress,
        COUNT(*) FILTER (WHERE t.status = 'done') AS done
      FROM tasks t
      JOIN task_users tu ON t.id = tu.task_id
      WHERE tu.user_id = ${userId}
    `;

		return data[0];
	} catch (error) {
		console.log(error);
		throw new Error("Failed to fetch task counts");
	}
}

export async function fetchPendingTasksByUser(userId: number) {
	try {
		const data = await sql<Tasks[]>`
      SELECT
        t.id,
        t.title,
        t.description,
        t.status,
        t.created_at,
        t.type,
        json_agg(
          json_build_object(
            'id', u.id,
            'name', u.name,
            'email', u.email,
            'photo', u.photo_url
          )
        ) AS users
      FROM tasks t
      JOIN task_users tu ON t.id = tu.task_id
      JOIN users u ON tu.user_id = u.id
      WHERE t.id IN (
        SELECT task_id 
        FROM task_users 
        WHERE user_id = ${userId}
      )
      AND (t.status = 'pending' OR t.status = 'in_progress')
      GROUP BY t.id, t.title, t.description, t.status, t.created_at,t.type
      ORDER BY t.created_at DESC
      LIMIT 5
    `;
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch tasks");
	}
}

export async function fetchUserByEmail(email: string) {
	try {
		const [data] = await sql<UserFromTask[]>`
    SELECT
      id,
      name,
      email,
      photo_url AS photo
    FROM users WHERE email = ${email}
    `;
		return data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to fetch user");
	}
}

export async function fetchUsers() {
	try {
		const data = await sql<UserFromTask[]>`
    SELECT
      u.id,
      u.name,
      u.email,
      u.photo_url AS photo
    FROM users u
    `;
		return data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to fetch users");
	}
}

export async function fetchTask(taskId: number) {
	try {
		const data = await sql<TaskForm[]>`SELECT
        t.id,
        t.title,
        t.description,
        t.type,
        t.status,
        COALESCE(array_agg(tu.user_id) FILTER (WHERE tu.user_id IS NOT NULL), '{}') AS user_ids
      FROM tasks t
      LEFT JOIN task_users tu ON t.id = tu.task_id
      WHERE t.id = ${taskId}
      GROUP BY t.id`;
		return data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to fetch users");
	}
}
