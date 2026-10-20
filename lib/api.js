import "server-only";
import { NextResponse } from "next/server";

export function jsonError(error, status = 400, extra = {}) {
  return NextResponse.json({ error, ...extra }, { status });
}

/** Wrap a route handler so unexpected errors become a clean 500 JSON response. */
export function handle(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error?.status && error.status < 500) return jsonError(error.message, error.status);
      console.error("[api]", error);
      const dbDown = ["ECONNREFUSED", "ER_ACCESS_DENIED_ERROR", "ER_BAD_DB_ERROR", "ENOTFOUND"].includes(error?.code);
      return jsonError(dbDown ? "Database connection failed. Please try again later." : "Something went wrong. Please try again.", 500);
    }
  };
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
