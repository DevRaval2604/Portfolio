// Serve the production export with Node, without an extra package dependency.
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../out");
const mimeTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2" };
try { await stat(resolve(root, "index.html")); }
catch { console.error("Run npm run build before npm start."); process.exit(1); }

createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method ?? "")) {
    response.writeHead(405, { Allow: "GET, HEAD" }); response.end(); return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname); }
  catch { response.writeHead(400); response.end("Bad request"); return; }
  const candidate = resolve(root, `.${pathname}`);
  if ((candidate !== root && !candidate.startsWith(root + sep)) || pathname.includes("\0")) {
    response.writeHead(403); response.end("Forbidden"); return;
  }
  let file;
  let status = 200;
  for (const option of [candidate, resolve(candidate, "index.html"), `${candidate}.html`]) {
    try { if ((await stat(option)).isFile()) { file = option; break; } } catch { /* Try the next static route. */ }
  }
  if (!file) { file = resolve(root, "404.html"); status = 404; }
  try {
    const info = await stat(file);
    response.writeHead(status, {
      "Content-Type": mimeTypes[extname(file)] ?? (pathname === "/opengraph-image" ? "image/png" : "application/octet-stream"),
      "Content-Length": info.size,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": pathname.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "no-cache",
    });
    if (request.method === "HEAD") { response.end(); return; }
    const stream = createReadStream(file);
    stream.on("error", () => response.destroy());
    stream.pipe(response);
  } catch { response.writeHead(404); response.end("Not found"); }
}).listen(Number(process.env.PORT ?? 3000), "127.0.0.1", () => {
  console.log(`Portfolio running at http://localhost:${process.env.PORT ?? 3000}`);
});
