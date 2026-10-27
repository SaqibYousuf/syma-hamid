// Formatting helpers for workshops (safe to use in server and client components).
// Workshop data itself now comes from the database — see lib/workshops.js and Admin > Workshops.

/** 8000 → "Rs 8,000" (same output on server and browser) */
export const formatPrice = (amount) => `Rs ${String(Math.round(Number(amount) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-11-15" → "Sunday, 15 November 2026" (same output on server and browser) */
export function formatWorkshopDate(isoDate) {
  if (!isoDate) return "";
  const [y, m, d] = String(isoDate).slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return "";
  const date = new Date(Date.UTC(y, m - 1, d));
  return `${DAYS[date.getUTCDay()]}, ${d} ${MONTHS[m - 1]} ${y}`;
}

/** "15:30:00" → "3:30 pm" */
export function formatTime(time) {
  if (!time) return "";
  const [h, min] = String(time).split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(min).padStart(2, "0")} ${suffix}`;
}

/** "3:30 pm to 5:30 pm" */
export function formatTimeRange(start, end) {
  if (!start) return "";
  return end ? `${formatTime(start)} to ${formatTime(end)}` : formatTime(start);
}

/** "2 hours", "1 hour 30 minutes" */
export function formatDuration(start, end) {
  if (!start || !end) return "";
  const toMin = (t) => {
    const [h, m] = String(t).split(":").map(Number);
    return h * 60 + m;
  };
  const total = toMin(end) - toMin(start);
  if (total <= 0) return "";
  const h = Math.floor(total / 60);
  const m = total % 60;
  const parts = [];
  if (h) parts.push(`${h} ${h === 1 ? "hour" : "hours"}`);
  if (m) parts.push(`${m} minutes`);
  return parts.join(" ");
}
