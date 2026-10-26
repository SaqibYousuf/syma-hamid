#!/usr/bin/env node
/**
 * Database setup: creates tables, the admin user and the starting assessments.
 *
 *   npm run db:setup                 # safe to run any time
 *   npm run db:setup -- --reset-admin  # also resets the admin password from env
 *
 * Reads DB settings from .env.local / .env (DATABASE_URL or DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { seedAssessments } from "../database/seed-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
for (const file of [".env.local", ".env"]) {
  const full = path.join(root, file);
  if (fs.existsSync(full)) process.loadEnvFile(full);
}

const resetAdmin = process.argv.includes("--reset-admin");
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "syma-hamid";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "symahamid@321+-";

function connectionConfig() {
  if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    return {
      host: url.hostname,
      port: Number(url.port || 3306),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.replace(/^\//, ""),
    };
  }
  return {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    // password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "syma_hamid",
  };
}

async function main() {
  const { database, ...server } = connectionConfig();

  // 1) Create the database if we are allowed to (ignored on shared hosting).
  try {
    const c = await mysql.createConnection(server);
    await c.query(
      `CREATE DATABASE IF NOT EXISTS \`${database.replace(/`/g, "")}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await c.end();
  } catch (e) {
    console.warn(`! Could not create database automatically (${e.code || e.message}). Assuming it exists.`);
  }

  const db = await mysql.createConnection({ ...server, database, multipleStatements: true, charset: "utf8mb4" });

  // 2) Tables
  const schema = fs.readFileSync(path.join(root, "database", "schema.sql"), "utf8");
  await db.query(schema);
  console.log("✓ Tables ready");

  // 3) Admin user
  const [admins] = await db.query("SELECT id FROM admins WHERE username = ?", [ADMIN_USERNAME]);
  const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  if (admins.length === 0) {
    await db.query("INSERT INTO admins (username, password_hash) VALUES (?, ?)", [ADMIN_USERNAME, hash]);
    console.log(`✓ Admin user created: ${ADMIN_USERNAME}`);
  } else if (resetAdmin) {
    await db.query("UPDATE admins SET password_hash = ? WHERE id = ?", [hash, admins[0].id]);
    console.log(`✓ Admin password reset for: ${ADMIN_USERNAME}`);
  } else {
    console.log(`• Admin user already exists: ${ADMIN_USERNAME}`);
  }

  // 4) Starting content (only if there are no assessments yet)
  const [[{ count }]] = await db.query("SELECT COUNT(*) AS count FROM assessments");
  if (count > 0) {
    console.log(`• ${count} assessment(s) already exist — seed skipped`);
  } else {
    await db.beginTransaction();
    try {
      for (const [index, a] of seedAssessments.entries()) {
        const [res] = await db.query(
          `INSERT INTO assessments (slug, title, description, intro_text, image, duration, closing_title, closing_text, final_reflection, is_published, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
          [a.slug, a.title, a.description, a.intro_text || null, a.image, a.duration, a.closing_title || null, a.closing_text || null, a.final_reflection || null, index + 1]
        );
        const assessmentId = res.insertId;

        const profileIds = [];
        for (const [pi, p] of (a.profiles || []).entries()) {
          const [pr] = await db.query(
            `INSERT INTO assessment_profiles (assessment_id, title, short_description, image, quote, core_insight, notices, pattern_steps, reflection, sort_order)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [assessmentId, p.title, p.short_description, p.image, p.quote, p.core_insight, JSON.stringify(p.notices), JSON.stringify(p.pattern_steps), p.reflection, pi + 1]
          );
          profileIds.push(pr.insertId);
        }

        for (const [qi, q] of (a.questions || []).entries()) {
          const [qr] = await db.query(
            "INSERT INTO assessment_questions (assessment_id, question, type, sort_order) VALUES (?, ?, ?, ?)",
            [assessmentId, q.question, q.type, qi + 1]
          );
          for (const [oi, o] of (q.options || []).entries()) {
            await db.query(
              "INSERT INTO assessment_options (question_id, option_text, profile_id, sort_order) VALUES (?, ?, ?, ?)",
              [qr.insertId, o.text, profileIds[o.profileIndex] ?? null, oi + 1]
            );
          }
        }
      }
      await db.commit();
      console.log(`✓ Seeded ${seedAssessments.length} assessments`);
    } catch (e) {
      await db.rollback();
      throw e;
    }
  }

  // 5) Dummy workshops (only if there are none yet)
  const [[{ workshopCount }]] = await db.query("SELECT COUNT(*) AS workshopCount FROM workshops");
  if (workshopCount > 0) {
    console.log(`• ${workshopCount} workshop(s) already exist — dummy workshops skipped`);
  } else {
    const sql = fs.readFileSync(path.join(root, "database", "workshops.sql"), "utf8");
    await db.query(sql.slice(sql.indexOf("INSERT IGNORE INTO workshops")));
    console.log("✓ Added dummy workshops");
  }

  await db.end();
  console.log("Done.");
}

main().catch((e) => {
  console.error("✗ Database setup failed:", e.message);
  process.exit(1);
});
