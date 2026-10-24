import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PORT || 4173);
const MIME = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8', '.xml':'application/xml; charset=utf-8', '.txt':'text/plain; charset=utf-8',
  '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.webp':'image/webp', '.ico':'image/x-icon', '.woff2':'font/woff2'
};

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    let requested = decodeURIComponent(requestUrl.pathname);
    if (requested.includes('\0')) throw new Error('Invalid path');
    let filePath = path.resolve(ROOT, `.${requested}`);
    if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
      res.writeHead(403, {'Content-Type':'text/plain; charset=utf-8'}); res.end('Forbidden'); return;
    }
    let info;
    try { info = await stat(filePath); } catch { info = null; }
    if (info?.isDirectory()) filePath = path.join(filePath, 'index.html');
    else if (!info && !path.extname(filePath)) {
      const folderPath = path.join(filePath, 'index.html');
      try { await stat(folderPath); filePath = folderPath; } catch { /* normal 404 below */ }
    }
    const body = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'});
    res.end(body);
  } catch (error) {
    const status = error?.code === 'ENOENT' ? 404 : 500;
    res.writeHead(status, {'Content-Type':'text/plain; charset=utf-8'});
    res.end(status === 404 ? 'Not found' : 'Local preview server error');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`AURA WALL preview is running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server.');
});
