// Shared formatting helpers (usable in server and client components)

const TIME_ZONE = process.env.NEXT_PUBLIC_TIME_ZONE || "Asia/Karachi";

export function formatDate(value) {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  });
}
