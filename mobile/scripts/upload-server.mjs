import express from 'express';
import fs from 'node:fs';
import path from 'node:path';

const app = express();
app.use(express.json({ limit: '50mb' }));

const projectRoot = path.resolve(path.join(process.cwd()));
const outDir = path.join(projectRoot, 'screenshots', 'device');
fs.mkdirSync(outDir, { recursive: true });

app.post('/upload', async (req, res) => {
  try {
    const { filename, dataBase64 } = req.body || {};
    if (!filename || !dataBase64) return res.status(400).json({ ok: false, error: 'filename and dataBase64 required' });
    const safeName = filename.replace(/[^a-zA-Z0-9._-]+/g, '_');
    const filePath = path.join(outDir, safeName);
    const buffer = Buffer.from(dataBase64, 'base64');
    fs.writeFileSync(filePath, buffer);
    return res.json({ ok: true, saved: filePath });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'failed to save' });
  }
});

const port = process.env.UPLOAD_PORT || 5123;
app.listen(port, () => {
  console.log(`Screenshot upload server listening on http://127.0.0.1:${port}`);
  console.log(`Saving to: ${outDir}`);
});


