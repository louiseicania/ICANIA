// Mirrors Louise's public Vinted closet into shop-data.json.
// Flow: load vinted.co.uk to mint an anonymous access_token_web, send it as a
// Bearer token to the public wardrobe endpoint, map each item to the shape
// webshop.html expects, and write the file.
//
// Safety: the file is ONLY rewritten on a confirmed good response (HTTP 200).
// A block (DataDome 403), auth failure, or network error leaves the existing
// shop-data.json untouched so a hiccup never blanks the live shop.
//
// An empty closet (holiday mode) IS a good response and will write [].

const https = require('https');
const fs = require('fs');
const path = require('path');

const USER_ID = '115231306'; // Icania (login: icaniaa)
const HOST = 'www.vinted.co.uk';
const OUT = path.join(__dirname, 'shop-data.json');
const PER_PAGE = 96;
const MAX_PHOTOS = 6;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

function request(pathname, headers) {
  return new Promise((resolve, reject) => {
    const req = https.request({ host: HOST, path: pathname, headers }, res => {
      let body = '';
      res.on('data', c => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    req.setTimeout(20000, () => req.destroy(new Error('timeout')));
    req.end();
  });
}

function categorise(title) {
  const t = (title || '').toLowerCase();
  if (/\b(dress|gown|frock)\b/.test(t)) return 'dresses';
  if (/\b(jean|trouser|short|skirt|legging|culotte)\b/.test(t)) return 'bottoms';
  if (/\b(coat|jacket|blazer|gilet|parka|mac)\b/.test(t)) return 'outerwear';
  if (/\b(jumper|knit|cardigan|sweater|sweatshirt|hoodie)\b/.test(t)) return 'knitwear';
  if (/\b(bag|scarf|belt|hat|boot|shoe|heel|trainer|jewel|earring|necklace)\b/.test(t)) return 'accessories';
  return 'tops';
}

function mapItem(it) {
  const photos = (it.photos || [])
    .map(p => p.url || p.full_size_url || (p.thumbnails && p.thumbnails.slice(-1)[0] && p.thumbnails.slice(-1)[0].url))
    .filter(Boolean)
    .slice(0, MAX_PHOTOS);
  const price = it.price && (it.price.amount != null ? it.price.amount : it.price);
  return {
    id: String(it.id),
    title: it.title || '',
    brand: it.brand_title || it.brand || '',
    size: it.size_title || it.size || '',
    condition: it.status || '',
    price: price != null ? Math.round(Number(price)) : null,
    category: categorise(it.title),
    photos,
    reserved: !!(it.is_reserved),
    url: it.url || ('https://www.vinted.co.uk/items/' + it.id)
  };
}

(async () => {
  // 1. Mint anonymous session cookies + access token.
  const home = await request('/', { 'User-Agent': UA, Accept: 'text/html' });
  const setCookies = home.headers['set-cookie'] || [];
  const jar = setCookies.map(c => c.split(';')[0]).join('; ');
  const tokenCookie = setCookies
    .map(c => c.split(';')[0])
    .filter(c => c.startsWith('access_token_web='))
    .pop();
  const token = tokenCookie ? tokenCookie.split('=').slice(1).join('=') : null;

  if (!token) {
    console.error('No access_token_web minted (status ' + home.status + ') — likely blocked. Keeping existing shop-data.json.');
    process.exit(1);
  }

  // 2. Read the public closet.
  const apiHeaders = { 'User-Agent': UA, Accept: 'application/json', Cookie: jar, Authorization: 'Bearer ' + token };
  const all = [];
  for (let page = 1; page <= 20; page++) {
    const res = await request(
      '/api/v2/wardrobe/' + USER_ID + '/items?page=' + page + '&per_page=' + PER_PAGE + '&order=newest_first',
      apiHeaders
    );
    if (res.status !== 200) {
      console.error('Wardrobe fetch failed (status ' + res.status + ') — keeping existing shop-data.json.');
      console.error(res.body.slice(0, 300));
      process.exit(1);
    }
    let data;
    try { data = JSON.parse(res.body); } catch (e) {
      console.error('Bad JSON from wardrobe — keeping existing shop-data.json.');
      process.exit(1);
    }
    const items = data.items || [];
    all.push(...items);
    const totalPages = data.pagination && data.pagination.total_pages;
    if (!items.length || !totalPages || page >= totalPages) break;
  }

  // 3. Map + write. Drop sold/hidden/draft; keep active and reserved.
  const mapped = all
    .filter(it => !it.is_closed && !it.is_hidden && !it.is_draft)
    .map(mapItem)
    .filter(it => it.photos.length && it.price != null);

  fs.writeFileSync(OUT, JSON.stringify(mapped, null, 2) + '\n');
  console.log('Wrote ' + mapped.length + ' items to shop-data.json (closet had ' + all.length + ' raw).');
})().catch(e => {
  console.error('Sync error — keeping existing shop-data.json:', e.message);
  process.exit(1);
});
