#!/usr/bin/env node
/*
 * Static-route generator for Icania.
 *
 * The site is authored as ONE shell (index.html + styles.css + app.js) that
 * behaves as a client-side SPA. That shell is great for humans but bad for
 * crawlers: deep routes only existed via the 404 redirect trick, so Google saw
 * a 404 for /how-it-works, /sell, etc.
 *
 * This script reads the shell and emits a real, crawlable .html file per route,
 * each returning HTTP 200 with its own <title>/description/canonical/OG tags and
 * with the correct page section already visible (no JS required). GitHub Pages
 * serves /sell from /sell.html directly, so the clean URL keeps working and the
 * SPA still enhances on top once app.js loads.
 *
 * Single source of truth: per-route titles/descriptions are read out of the
 * META map in app.js, so editing copy there updates both the SPA and these pages.
 *
 * Run:  node build.js   (or: npm run build)
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE = 'https://icania.co.uk';
const ROUTES = ['how-it-works', 'sell', 'about', 'faq'];

const shell = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const appjs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

// --- Pull DEFAULT_DESC + META out of app.js (one source of truth) ---
const ddMatch = appjs.match(/const DEFAULT_DESC = (['"`])([\s\S]*?)\1;/);
const metaMatch = appjs.match(/const META = (\{[\s\S]*?\n {2}\});/);
if (!ddMatch || !metaMatch) {
  throw new Error('build.js: could not locate DEFAULT_DESC / META in app.js');
}
const DEFAULT_DESC = ddMatch[2];
const META = new Function('DEFAULT_DESC', 'return ' + metaMatch[1] + ';')(DEFAULT_DESC);

function escAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Show only `route`'s section; hide every other data-view section.
function setVisibleSection(html, route) {
  return html.replace(/<section data-view="([a-z-]+)"([^>]*)>/g, (m, name, attrs) => {
    const cleaned = attrs.replace(/\s*style="display:none;"/, '');
    return name === route
      ? `<section data-view="${name}"${cleaned}>`
      : `<section data-view="${name}"${cleaned} style="display:none;">`;
  });
}

// Swap the head meta to this route's title/description/url.
function setHead(html, route) {
  const url = `${SITE}/${route}`;
  const title = META[route].title;
  const desc = META[route].desc;
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escAttr(title)}</title>`)
    .replace(/(<meta name="description" content=")[\s\S]*?(">)/, `$1${escAttr(desc)}$2`)
    .replace(/(<link rel="canonical" href=")[\s\S]*?(">)/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[\s\S]*?(">)/, `$1${escAttr(title)}$2`)
    .replace(/(<meta property="og:description" content=")[\s\S]*?(">)/, `$1${escAttr(desc)}$2`)
    .replace(/(<meta property="og:url" content=")[\s\S]*?(">)/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[\s\S]*?(">)/, `$1${escAttr(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[\s\S]*?(">)/, `$1${escAttr(desc)}$2`);
}

// The FAQPage JSON-LD only belongs on the FAQ page; strip it elsewhere.
function stripFaqLd(html) {
  return html.replace(
    / {2}<script type="application\/ld\+json">(?:(?!<\/script>)[\s\S])*?"@type": "FAQPage"(?:(?!<\/script>)[\s\S])*?<\/script>\n/,
    ''
  );
}

let count = 0;
for (const route of ROUTES) {
  if (!META[route]) throw new Error(`build.js: no META entry for "${route}"`);
  let html = shell;
  html = setHead(html, route);
  html = setVisibleSection(html, route);
  if (route !== 'faq') html = stripFaqLd(html);
  const out = path.join(ROOT, `${route}.html`);
  fs.writeFileSync(out, html);
  console.log(`  wrote ${route}.html  (${META[route].title})`);
  count++;
}
console.log(`Done: ${count} static route pages generated.`);
