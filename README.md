# Dr. Syma Hamid — Website

Next.js 16 (App Router) + Tailwind CSS 4 + MySQL (`mysql2`).

## What's inside

| Area | Path |
| --- | --- |
| Public website | `app/(site)/…` — Home, About, Services, Inner Alchemy, Assessments, Wheel of Emotions, Blog, Contact |
| Admin panel | `app/admin/…` — `/admin` (login at `/admin/login`) |
| API | `app/api/…` |
| Database helpers | `lib/db.js`, `lib/assessments.js`, `lib/submissions.js` |
| Database schema & seed | `database/schema.sql`, `database/seed.sql`, `scripts/setup-db.mjs` |

## 1. Setup

Requirements: Node.js 20+ and MySQL 5.7+ / 8 (or MariaDB 10.4+).

```bash
npm install
cp .env.example .env.local      # then fill in your DB details + SESSION_SECRET
npm run db:setup                # creates tables, the admin user and the starting assessments
npm run dev                     # http://localhost:3000
```

`npm run db:setup` is safe to run again — it never deletes data.
To reset the admin password from `.env.local`: `npm run db:setup -- --reset-admin`.

**No terminal access to MySQL (e.g. cPanel / phpMyAdmin)?** Create the database, then import
`database/schema.sql` followed by `database/seed.sql`.

### Environment variables (`.env.local`)

| Variable | Description |
| --- | --- |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | MySQL connection (or a single `DATABASE_URL=mysql://user:pass@host:3306/db`) |
| `SESSION_SECRET` | Long random string (32+ chars) used to sign the admin login cookie. **Required.** |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Used only by `npm run db:setup` to create the first admin |
| `UPLOAD_DIR` | Where admin-uploaded images are saved (default `./uploads`) |
| `NEXT_PUBLIC_TIME_ZONE` | Time zone for dates in the admin panel (default `Asia/Karachi`) |

Generate a secret: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

## 2. Admin panel

Go to **`/admin`** and sign in (default user `syma-hamid` — change the password in production with
`--reset-admin`).

- **Dashboard** — totals, results from the last 7 days, recent results, most common results.
- **Assessments** — create / edit / duplicate / delete, publish or unpublish, change the order shown on the website.
  - *Details*: title, card description, intro text, duration, card image (upload or path), closing screen.
  - *Result profiles*: the possible outcomes (e.g. “The Overthinker”) with quote, core insight, “you may notice”, pattern steps and reflection.
  - *Questions*: multiple-choice (scored) or written reflection (not scored). Every option is linked to a result profile.
  - A published assessment with no questions shows as **“Coming soon”** on the website.
- **Results** — every completed assessment with name, email, result and all answers. Search, filter by assessment / result / date, view details, delete, and **Export CSV**.

### How scoring works

Each chosen option adds one point to its result profile. The profile with the most points is the
visitor's result (a tie goes to the profile listed first). Scoring happens on the server — the
browser never sees which option maps to which profile. Visitors must enter their name and email
before seeing the result.

Results store a copy of the question / answer text, so editing or deleting an assessment later
never breaks old results.

## 3. Security notes

- Passwords hashed with bcrypt; admin session is a signed, `httpOnly` cookie (8 hours).
- `/admin/*` and `/api/admin/*` are protected in `proxy.js` **and** re-checked on the server in every page / API route.
- Login is rate-limited (5 tries / 15 min) and public submissions (20 / 10 min per IP).
- All SQL uses parameterised queries. Uploads are checked by file content (PNG/JPG/WEBP/GIF, max 5 MB).
- CSV export escapes formula characters so it is safe to open in Excel.

## 4. Deploying

```bash
npm run build
npm start
```

Works on any Node.js host (VPS, cPanel Node app, Railway, Render…). Make sure:

- the environment variables are set on the server,
- the `uploads/` folder (or `UPLOAD_DIR`) is **writable and persistent** — on serverless hosts like Vercel
  the filesystem is temporary, so use image paths/URLs instead of uploads there,
- the rate limiter is in-memory, which is fine for a single server.

## 5. Still to do (content)

- Services, Wheel of Emotions, Blog and Contact pages are placeholders ready for real content.
- Social media links are `#` — set them in `components/constants/site-links.js`.
- The five assessments other than “Identify Your Pattern” have no questions yet (they show “Coming soon”); add them from the admin panel.
