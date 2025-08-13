// scripts/update-html-images.js
const fs = require('fs');
const path = require('path');

const HTML_DIRS = [
  path.join(__dirname, '../'),              // root
  path.join(__dirname, '../assets'),        // assets folder
  path.join(__dirname, '../gallery'),       // gallery folder
  path.join(__dirname, '../screenshorts')   // screenshorts folder
];
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

function listFilesRecursive(dir, filterFn) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFilesRecursive(full, filterFn));
    else if (filterFn(full)) out.push(full);
  }
  return out;
}

function resolveImagePath(htmlFilePath, imgSrc) {
  if (/^(https?:)?\/\//i.test(imgSrc) || imgSrc.startsWith('data:')) return null;
  const htmlDir = path.dirname(htmlFilePath);
  return path.resolve(htmlDir, imgSrc);
}

function toWebpPath(imgPath) {
  const ext = path.extname(imgPath);
  return imgPath.slice(0, -ext.length) + '.webp';
}

function transformImgTag(imgTag, htmlFilePath) {
  const attr = (name) => {
    const re = new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
    const m = imgTag.match(re);
    if (!m) return null;
    return m[2] || m[3] || m[4] || null;
  };

  const src = attr('src');
  if (!src) return imgTag;

  const ext = path.extname(src).toLowerCase();
  if (!IMAGE_EXTS.includes(ext) || ext === '.webp') return imgTag;

  const absImg = resolveImagePath(htmlFilePath, src);
  if (!absImg) return imgTag;

  const absWebp = toWebpPath(absImg);
  const hasWebp = fs.existsSync(absWebp);
  if (!hasWebp) return imgTag;

  const htmlDir = path.dirname(htmlFilePath);
  const relWebp = path.relative(htmlDir, absWebp).split(path.sep).join('/');

  const alt = attr('alt');
  const width = attr('width');
  const height = attr('height');
  const loading = attr('loading');
  const cls = attr('class');
  const id = attr('id');
  const isHero = attr('data-hero');

  const fallbackSrc = src;
  const loadingAttr = isHero ? '' : (loading ? '' : ' loading="lazy"');

  const preserved = [
    `src="${fallbackSrc}"`,
    alt ? `alt="${alt}"` : '',
    width ? `width="${width}"` : '',
    height ? `height="${height}"` : '',
    cls ? `class="${cls}"` : '',
    id ? `id="${id}"` : '',
    isHero ? `data-hero="${isHero}"` : ''
  ].filter(Boolean).join(' ');

  return `<picture>
  <source srcset="${relWebp}" type="image/webp">
  <img ${preserved}${loadingAttr}>
</picture>`;
}

function processHtmlFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('<img')) return false;
  const imgTagRe = /<img\b[^>]*>/gi;
  let changed = false;
  const updated = html.replace(imgTagRe, (m) => {
    const out = transformImgTag(m, filePath);
    if (out !== m) changed = true;
    return out;
  });
  if (changed) fs.writeFileSync(filePath, updated, 'utf8');
  return changed;
}

function main() {
  const htmlFiles = [];
  for (const dir of HTML_DIRS) {
    htmlFiles.push(...listFilesRecursive(dir, (f) => f.toLowerCase().endsWith('.html')));
  }
  if (htmlFiles.length === 0) {
    console.log('No HTML files found to process.');
    return;
  }
  let totalChanged = 0;
  for (const file of htmlFiles) {
    try {
      const changed = processHtmlFile(file);
      console.log((changed ? 'Updated: ' : 'No change: ') + path.relative(process.cwd(), file));
      if (changed) totalChanged++;
    } catch (e) {
      console.error(`Error processing ${file}: ${e.message}`);
    }
  }
  console.log(`Done. Files updated: ${totalChanged}/${htmlFiles.length}`);
}

main();
