// scripts/update-html-images.js
// Rewrites <img src="x.jpg"> to:
// <picture>
//   <source type="image/webp" srcset="x.webp">
//   <img src="x.jpg" ... loading="lazy">
// </picture>
// Skips "hero" or "above-the-fold" images based on a simple heuristic.

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const cheerio = require('cheerio');

// Configure which HTML files to process
const HTML_GLOB = '**/*.html';

// Heuristic: treat images with classes/ids hinting "hero", "logo" as non-lazy (do not add loading="lazy")
const NON_LAZY_HINTS = ['hero', 'header', 'banner', 'logo', 'site-logo'];

function hasNonLazyHint(el) {
  const classAttr = (el.attr('class') || '').toLowerCase();
  const idAttr = (el.attr('id') || '').toLowerCase();
  return NON_LAZY_HINTS.some(h => classAttr.includes(h) || idAttr.includes(h));
}

function toWebpPath(src) {
  if (!src) return null;
  const ext = path.extname(src).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null;
  return src.slice(0, -ext.length) + '.webp';
}

function fileExistsRelative(htmlFile, imgPath) {
  // Handle absolute and relative paths
  try {
    // If it's an absolute URL (http/https), skip file existence check
    if (/^https?:\/\//i.test(imgPath)) return false;
    const baseDir = path.dirname(htmlFile);
    const full = path.resolve(baseDir, imgPath);
    return fs.existsSync(full);
  } catch {
    return false;
  }
}

function rewriteHtml(file) {
  const original = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(original, { decodeEntities: false });

  let updatedCount = 0;

  $('img').each((_, img) => {
    const $img = $(img);
    const src = $img.attr('src');

    if (!src) return;

    // Only process local JPG/PNG
    const webpSrc = toWebpPath(src);
    if (!webpSrc) return;

    // Ensure the matching .webp exists next to the referenced file
    if (!fileExistsRelative(file, webpSrc)) return;

    // Build <picture>
    // Keep alt, width, height, decoding, referrerpolicy, etc.
    const attrs = $img.attr();
    // Ensure lazy loading for non-hero images (best practice: don't lazy-load above-the-fold[6][12][17])
    if (!hasNonLazyHint($img)) {
      attrs.loading = attrs.loading || 'lazy';
    } else {
      // Ensure hero images do NOT have loading="lazy"
      if (attrs.loading === 'lazy') delete attrs.loading;
    }

    // Always keep the original src on <img> as the fallback
    const fallbackImg = $('<img/>', attrs);

    const $picture = $('<picture></picture>');
    // First source: WebP
    $picture.append(`<source type="image/webp" srcset="${webpSrc}">`);
    // Optional: an explicit JPEG/PNG source before <img> is OK, but not required.
    // The <img> itself is the universal fallback[3][2][14].

    $picture.append(fallbackImg);

    // Replace the original <img> with <picture>
    $img.replaceWith($picture);
    updatedCount++;
  });

  if (updatedCount > 0) {
    fs.writeFileSync(file, $.html(), 'utf8');
    console.log(`Updated: ${file} (${updatedCount} image${updatedCount > 1 ? 's' : ''})`);
    return true;
  } else {
    console.log(`No changes: ${file}`);
    return false;
  }
}

function run() {
  const files = glob.sync(HTML_GLOB, {
    ignore: ['node_modules/**', '.git/**', 'dist/**', 'build/**']
  });

  if (files.length === 0) {
    console.log('No HTML files found.');
    process.exit(0);
  }

  let changed = 0;
  files.forEach(f => {
    const didChange = rewriteHtml(f);
    if (didChange) changed++;
  });

  if (changed === 0) {
    console.log('No HTML files required updates (either already converted, or no matching .webp found).');
  } else {
    console.log(`Done. Updated ${changed} HTML file(s).`);
  }
}

run();
