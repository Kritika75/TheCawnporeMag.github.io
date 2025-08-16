// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const roots = [
  path.join(__dirname, '../assets/gallery'),
  path.join(__dirname, '../screenshorts'),
  path.join(__dirname, '../')
];

const validExt = new Set(['.jpg', '.jpeg', '.png']);

function listFilesRecursive(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFilesRecursive(full));
    else out.push(full);
  }
  return out;
}

async function toWebP(input) {
  const ext = path.extname(input).toLowerCase();
  if (!validExt.has(ext)) return;

  const dir = path.dirname(input);
  const base = path.basename(input, ext);
  const out = path.join(dir, `${base}.webp`);

  try {
    await sharp(input).toFormat('webp', { quality: 80 }).toFile(out);
    console.log(`OK  ${path.relative(process.cwd(), input)} -> ${path.relative(process.cwd(), out)}`);
  } catch (e) {
    console.error(`ERR ${input}: ${e.message}`);
  }
}

(async () => {
  for (const root of roots) {
    if (!fs.existsSync(root)) {
      console.warn(`Skip (missing): ${root}`);
      continue;
    }
    const files = listFilesRecursive(root);
    for (const f of files) {
      await toWebP(f);
    }
  }
})();
