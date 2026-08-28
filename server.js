// Tiny static server for the trace landing page.
// Serves the Vite build output (dist/) and falls back to index.html
// so client-side routes work. Used by the Render web service.
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, 'dist');

const app = express();
app.use(express.static(dist));
app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`trace landing serving ${dist} on :${port}`));