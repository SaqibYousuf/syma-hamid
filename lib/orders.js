import "server-only";
import crypto from "node:crypto";
import { query, transaction } from "./db";
import { EMAIL_RE, str, toInt } from "./validation";
import { todayPk } from "./workshops";

export const ORDER_STATUSES = ["pending", "confirmed", "cancelled"];
export const STATUS_LABELS = { pending: "Awaiting payment", confirmed: "Confirmed", cancelled: "Cancelled" };

// Pakistani mobile (0300 1234567 / +92 300 1234567) or any international number starting with +
const PHONE_RE = /^(?:(?:\+92|0)3\d{9}|\+\d{8,15})$/;

function newReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I to avoid confusion
  const bytes = crypto.randomBytes(6);
  return "IF-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

/**
 * Create a bank-transfer booking. Seats are checked inside a transaction with
 * the workshop row locked, so two people can't book the last seat at once.
 */
export async function createOrder(slug, input) {
  const fullName = str(input?.fullName, 191);
  const email = str(input?.email, 191).toLowerCase();
  const phone = str(input?.phone, 30).replace(/[\s-]/g, "");
  const notes = str(input?.notes, 2000) || null;
  const seats = toInt(input?.seats) || 0;

  if (fullName.length < 2) return { ok: false, status: 400, error: "Please enter your full name.", field: "fullName" };
  if (!EMAIL_RE.test(email)) return { ok: false, status: 400, error: "Please enter a valid email.", field: "email" };
  if (!PHONE_RE.test(phone)) return { ok: false, status: 400, error: "Please enter a valid mobile number, e.g. 0300 1234567.", field: "phone" };
  if (input?.agree !== true) return { ok: false, status: 400, error: "Please accept the booking terms.", field: "agree" };
  if (seats < 1) return { ok: false, status: 400, error: "Please choose at least one seat." };

  return transaction(async (conn) => {
    const [rows] = await conn.execute(
      `SELECT id, title, DATE_FORMAT(event_date, '%Y-%m-%d') AS event_date, price, total_seats, max_seats_per_order
         FROM workshops WHERE slug = ? AND is_published = 1 AND event_date >= ? LIMIT 1 FOR UPDATE`,
      [String(slug), todayPk()]
    );
    const w = rows[0];
    if (!w) return { ok: false, status: 404, error: "This workshop is no longer available." };

    const [[{ taken }]] = await conn.execute(
      "SELECT COALESCE(SUM(seats), 0) AS taken FROM workshop_orders WHERE workshop_id = ? AND status IN ('pending', 'confirmed')",
      [w.id]
    );
    const seatsLeft = Math.max(0, Number(w.total_seats) - Number(taken));
    if (seatsLeft <= 0) return { ok: false, status: 409, error: "Sorry, this workshop is now sold out." };
    const maxPerOrder = Number(w.max_seats_per_order) || 4;
    if (seats > Math.min(maxPerOrder, seatsLeft)) {
      return {
        ok: false,
        status: 409,
        error: seatsLeft < maxPerOrder ? `Only ${seatsLeft} seat(s) are left.` : `You can book up to ${maxPerOrder} seats per order.`,
      };
    }

    const unitPrice = Number(w.price);
    const total = unitPrice * seats;
    for (let attempt = 0; attempt < 5; attempt++) {
      const reference = newReference();
      try {
        const [res] = await conn.execute(
          `INSERT INTO workshop_orders (reference, workshop_id, workshop_title, workshop_date, full_name, email, phone, notes,
                  seats, unit_price, total_amount, payment_method, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'bank_transfer', 'pending')`,
          [reference, w.id, w.title, w.event_date, fullName, email, phone, notes, seats, unitPrice, total]
        );
        return { ok: true, order: { id: res.insertId, reference, seats, unitPrice, total, email } };
      } catch (e) {
        if (e.code !== "ER_DUP_ENTRY") throw e;
      }
    }
    throw new Error("Could not create a unique order reference");
  });
}

/* ────────────────────────────── admin ────────────────────────────── */

function buildFilters({ status, workshopId, q, from, to }) {
  const where = [];
  const params = [];
  if (status && ORDER_STATUSES.includes(status)) {
    where.push("o.status = ?");
    params.push(status);
  }
  if (workshopId) {
    where.push("o.workshop_id = ?");
    params.push(workshopId);
  }
  if (q) {
    where.push("(o.full_name LIKE ? OR o.email LIKE ? OR o.phone LIKE ? OR o.reference LIKE ?)");
    params.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
  }
  if (from) {
    where.push("o.created_at >= ?");
    params.push(`${from} 00:00:00`);
  }
  if (to) {
    where.push("o.created_at <= ?");
    params.push(`${to} 23:59:59`);
  }
  return { sql: where.length ? `WHERE ${where.join(" AND ")}` : "", params };
}

const ORDER_COLUMNS = `o.*, DATE_FORMAT(o.workshop_date, '%Y-%m-%d') AS workshop_date_str`;

export async function listOrders({ page = 1, pageSize = 20, ...filters } = {}) {
  const { sql, params } = buildFilters(filters);
  const size = Math.min(Math.max(toInt(pageSize) || 20, 1), 200);
  const current = Math.max(toInt(page) || 1, 1);
  const [{ total }] = await query(`SELECT COUNT(*) AS total FROM workshop_orders o ${sql}`, params);
  const rows = await query(
    `SELECT ${ORDER_COLUMNS} FROM workshop_orders o ${sql}
      ORDER BY o.created_at DESC, o.id DESC LIMIT ${size} OFFSET ${(current - 1) * size}`,
    params
  );
  return { rows, total: Number(total), page: current, pageSize: size, pages: Math.max(1, Math.ceil(Number(total) / size)) };
}

export async function getOrder(id) {
  const rows = await query(`SELECT ${ORDER_COLUMNS} FROM workshop_orders o WHERE o.id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function updateOrder(id, { status, admin_note }) {
  const sets = [];
  const params = [];
  if (status !== undefined) {
    if (!ORDER_STATUSES.includes(status)) return { ok: false, status: 400, error: "Unknown status" };
    sets.push("status = ?");
    params.push(status);
  }
  if (admin_note !== undefined) {
    sets.push("admin_note = ?");
    params.push(str(admin_note, 2000) || null);
  }
  if (!sets.length) return { ok: false, status: 400, error: "Nothing to update" };

  // Don't let a cancelled order be re-activated if the workshop no longer has room
  if (status && status !== "cancelled") {
    const order = await getOrder(id);
    if (!order) return { ok: false, status: 404, error: "Order not found" };
    if (order.status === "cancelled" && order.workshop_id) {
      const [w] = await query(
        `SELECT w.total_seats - COALESCE((SELECT SUM(seats) FROM workshop_orders x
                 WHERE x.workshop_id = w.id AND x.status IN ('pending','confirmed')), 0) AS seats_left
           FROM workshops w WHERE w.id = ?`,
        [order.workshop_id]
      );
      if (w && Number(w.seats_left) < order.seats) {
        return { ok: false, status: 409, error: `Not enough seats left to restore this order (${Math.max(0, w.seats_left)} left).` };
      }
    }
  }

  const res = await query(`UPDATE workshop_orders SET ${sets.join(", ")} WHERE id = ?`, [...params, id]);
  if (res.affectedRows === 0) return { ok: false, status: 404, error: "Order not found" };
  return { ok: true, order: await getOrder(id) };
}

export async function deleteOrder(id) {
  const res = await query("DELETE FROM workshop_orders WHERE id = ?", [id]);
  return res.affectedRows > 0;
}

export async function exportOrders(filters = {}) {
  const { sql, params } = buildFilters(filters);
  return query(`SELECT ${ORDER_COLUMNS} FROM workshop_orders o ${sql} ORDER BY o.created_at DESC, o.id DESC LIMIT 10000`, params);
}

export async function orderStats() {
  const [row] = await query(
    `SELECT
       (SELECT COUNT(*) FROM workshop_orders WHERE status = 'pending') AS pending,
       (SELECT COUNT(*) FROM workshop_orders WHERE status = 'confirmed') AS confirmed,
       (SELECT COALESCE(SUM(total_amount), 0) FROM workshop_orders WHERE status = 'confirmed') AS revenue`
  );
  return { pending: Number(row.pending), confirmed: Number(row.confirmed), revenue: Number(row.revenue) };
}
