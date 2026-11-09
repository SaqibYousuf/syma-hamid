import "server-only";
import mysql from "mysql2/promise";

/**
 * Shared MySQL connection pool (mysql2).
 * The pool is cached on globalThis so hot-reload in dev doesn't open new pools.
 */
function createPool() {
  const common = {
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
    queueLimit: 0,
    charset: "utf8mb4",
    timezone: "Z",
    dateStrings: false,
  };

  if (process.env.DATABASE_URL) {
    return mysql.createPool({ uri: process.env.DATABASE_URL, ...common });
  }

  return mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "syma_hamid",
    ...common,
  });
}

const globalForDb = globalThis;

export const pool = globalForDb.__symaDbPool ?? createPool();
if (process.env.NODE_ENV !== "production") globalForDb.__symaDbPool = pool;

/** Run a query and return rows. */
export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

/** Run a function inside a transaction. The callback receives a connection. */
export async function transaction(fn) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await fn(conn);
    await conn.commit();
    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}
