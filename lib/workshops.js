import "server-only";
import { query, transaction } from "./db";
import { imagePath, slugify, str, strOrNull } from "./validation";
import { formatDuration, formatTimeRange, formatWorkshopDate } from "@/components/workshops/workshops";

// Orders with these statuses hold seats
export const SEAT_HOLDING_STATUSES = ["pending", "confirmed"];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

/** Today's date in Pakistan, as YYYY-MM-DD */
export function todayPk() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: process.env.NEXT_PUBLIC_TIME_ZONE || "Asia/Karachi" }).format(new Date());
}

const SELECT_WITH_SEATS = `
  SELECT w.*, DATE_FORMAT(w.event_date, '%Y-%m-%d') AS event_date_str,
         COALESCE((SELECT SUM(o.seats) FROM workshop_orders o
                    WHERE o.workshop_id = w.id AND o.status IN ('pending', 'confirmed')), 0) AS seats_taken
    FROM workshops w`;

function mapRow(row) {
  const seatsTaken = Number(row.seats_taken || 0);
  return {
    id: row.id,
    slug: row.slug,
    series: row.series || "",
    title: row.title,
    description: row.description || "",
    host: row.host || "",
    host_role: row.host_role || "",
    banner: row.banner || "",
    event_date: row.event_date_str,
    start_time: row.start_time ? String(row.start_time).slice(0, 5) : "",
    end_time: row.end_time ? String(row.end_time).slice(0, 5) : "",
    location: row.location || "",
    city: row.city || "",
    price: Number(row.price),
    total_seats: Number(row.total_seats),
    max_seats_per_order: Number(row.max_seats_per_order) || 4,
    contact_name: row.contact_name || "",
    contact_phones: row.contact_phones || "",
    is_published: Boolean(row.is_published),
    sort_order: row.sort_order,
    seats_taken: seatsTaken,
    seats_left: Math.max(0, Number(row.total_seats) - seatsTaken),
  };
}

/** Shape used by the public pages (matches the original WorkshopCard / checkout props) */
export function toPublicWorkshop(w) {
  return {
    id: w.id,
    slug: w.slug,
    series: w.series,
    title: w.title,
    description: w.description,
    host: w.host,
    hostRole: w.host_role,
    banner: w.banner || "/images/workshops/inner-flow-relationships.jpeg",
    eventDate: w.event_date,
    dateLabel: formatWorkshopDate(w.event_date),
    time: formatTimeRange(w.start_time, w.end_time),
    duration: formatDuration(w.start_time, w.end_time),
    location: w.location,
    city: w.city,
    price: w.price,
    seatsLeft: w.seats_left,
    maxSeatsPerOrder: w.max_seats_per_order,
    contact: {
      name: w.contact_name,
      phones: w.contact_phones.split(",").map((p) => p.trim()).filter(Boolean),
    },
  };
}

/* ────────────────────────────── public ────────────────────────────── */

/** Published workshops that haven't happened yet, soonest first */
export async function listUpcomingWorkshops() {
  const rows = await query(
    `${SELECT_WITH_SEATS} WHERE w.is_published = 1 AND w.event_date >= ? ORDER BY w.event_date ASC, w.start_time ASC, w.sort_order ASC`,
    [todayPk()]
  );
  return rows.map(mapRow).map(toPublicWorkshop);
}

/** A published, upcoming workshop by slug (for checkout) */
export async function getPublicWorkshop(slug) {
  const rows = await query(`${SELECT_WITH_SEATS} WHERE w.slug = ? AND w.is_published = 1 AND w.event_date >= ? LIMIT 1`, [
    String(slug),
    todayPk(),
  ]);
  return rows.length ? toPublicWorkshop(mapRow(rows[0])) : null;
}

/* ────────────────────────────── admin ────────────────────────────── */

export async function listWorkshopsAdmin() {
  const rows = await query(
    `SELECT x.*, (SELECT COUNT(*) FROM workshop_orders o WHERE o.workshop_id = x.id) AS order_count
       FROM (${SELECT_WITH_SEATS}) x
      ORDER BY x.event_date DESC, x.start_time DESC`
  );
  return rows.map((r) => ({ ...mapRow(r), order_count: Number(r.order_count) }));
}

export async function getWorkshopAdmin(id) {
  const rows = await query(`${SELECT_WITH_SEATS} WHERE w.id = ? LIMIT 1`, [id]);
  return rows.length ? mapRow(rows[0]) : null;
}

export function normalizeWorkshopInput(input) {
  const errors = [];
  const num = (v, fallback = 0) => {
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? Math.round(n) : fallback;
  };
  const data = {
    title: str(input?.title, 255),
    slug: slugify(input?.slug || input?.title),
    series: strOrNull(input?.series, 191),
    description: strOrNull(input?.description, 5000),
    host: strOrNull(input?.host, 191),
    host_role: strOrNull(input?.host_role, 191),
    banner: imagePath(input?.banner),
    event_date: str(input?.event_date, 10),
    start_time: str(input?.start_time, 8) || null,
    end_time: str(input?.end_time, 8) || null,
    location: strOrNull(input?.location, 500),
    city: strOrNull(input?.city, 100),
    price: num(input?.price),
    total_seats: num(input?.total_seats),
    max_seats_per_order: Math.max(1, num(input?.max_seats_per_order, 4)),
    contact_name: strOrNull(input?.contact_name, 191),
    contact_phones: strOrNull(input?.contact_phones, 255),
    is_published: Boolean(input?.is_published),
  };
  if (!data.title) errors.push("Title is required.");
  if (!data.slug) errors.push("A URL slug could not be created from the title.");
  if (!DATE_RE.test(data.event_date)) errors.push("Please choose the workshop date.");
  if (data.start_time && !TIME_RE.test(data.start_time)) errors.push("Start time is not valid.");
  if (data.end_time && !TIME_RE.test(data.end_time)) errors.push("End time is not valid.");
  if (data.start_time && data.end_time && data.end_time <= data.start_time) errors.push("End time must be after the start time.");
  if (data.is_published && data.total_seats < 1) errors.push("Set the number of seats before publishing.");
  return { data, errors };
}

async function uniqueSlug(conn, base, excludeId) {
  let slug = base;
  for (let n = 2; n < 1000; n++) {
    const [rows] = await conn.execute("SELECT id FROM workshops WHERE slug = ? AND (? IS NULL OR id <> ?) LIMIT 1", [slug, excludeId, excludeId]);
    if (!rows.length) return slug;
    slug = `${base}-${n}`;
  }
  return `${base}-${Date.now()}`;
}

/** Create (id = null) or update a workshop. Returns the id. */
export async function saveWorkshop(id, data) {
  return transaction(async (conn) => {
    const slug = await uniqueSlug(conn, data.slug, id ?? null);
    const values = [
      slug, data.series, data.title, data.description, data.host, data.host_role, data.banner, data.event_date,
      data.start_time, data.end_time, data.location, data.city, data.price, data.total_seats, data.max_seats_per_order,
      data.contact_name, data.contact_phones, data.is_published ? 1 : 0,
    ];
    if (id) {
      const [res] = await conn.execute(
        `UPDATE workshops SET slug=?, series=?, title=?, description=?, host=?, host_role=?, banner=?, event_date=?,
                start_time=?, end_time=?, location=?, city=?, price=?, total_seats=?, max_seats_per_order=?,
                contact_name=?, contact_phones=?, is_published=? WHERE id=?`,
        [...values, id]
      );
      if (res.affectedRows === 0) throw Object.assign(new Error("Workshop not found"), { status: 404 });
      return id;
    }
    const [res] = await conn.execute(
      `INSERT INTO workshops (slug, series, title, description, host, host_role, banner, event_date, start_time, end_time,
              location, city, price, total_seats, max_seats_per_order, contact_name, contact_phones, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values
    );
    return res.insertId;
  });
}

export async function setWorkshopPublished(id, isPublished) {
  const res = await query("UPDATE workshops SET is_published = ? WHERE id = ?", [isPublished ? 1 : 0, id]);
  return res.affectedRows > 0;
}

export async function deleteWorkshop(id) {
  const res = await query("DELETE FROM workshops WHERE id = ?", [id]);
  return res.affectedRows > 0;
}

