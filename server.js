/**
 * Custom Node.js server for hosts that need a startup file
 * (cPanel "Setup Node.js App", Plesk, Passenger, PM2, etc.).
 *
 *   npm run build          # once, after every code change
 *   node server.js         # start in production mode
 *   node server.js --dev   # start in development mode
 *
 * Uses PORT (default 3000) and HOSTNAME (default 0.0.0.0) from the environment.
 * .env.local / .env are loaded automatically by Next.js.
 */
const { createServer } = require("http");
const next = require("next");

const dev = false;
if (!dev) process.env.NODE_ENV = "production";

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";

const app = next({ dev, dir: __dirname, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => {
      handle(req, res).catch((err) => {
        console.error("Error handling", req.url, err);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end("Internal server error");
        }
      });
    });

    server.listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname === "0.0.0.0" ? "localhost" : hostname}:${port} (${dev ? "development" : "production"})`);
    });

    // Graceful shutdown (PM2 / Passenger restarts)
    const shutdown = () => server.close(() => process.exit(0));
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  })
  .catch((err) => {
    console.error("Failed to start the server:", err);
    if (/Could not find a production build/i.test(String(err?.message))) {
      console.error('Run "npm run build" first.');
    }
    process.exit(1);
  });