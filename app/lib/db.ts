import postgres from "postgres";

const globalForSql = global as unknown as {
	sql?: ReturnType<typeof postgres>;
};

export const sql =
	globalForSql.sql ?? postgres(process.env.POSTGRES_URL!, { max: 5 });

if (process.env.NODE_ENV !== "production") globalForSql.sql = sql;
