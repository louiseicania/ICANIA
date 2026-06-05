# Icania

**You can get in touch for me to make refinements on this anytime you need. There is a hidden url /brand which presents a deck of all colours, fonts and style rules I used. The rest of this document is written by Claude, hope you're good b x**

---

This is the website for Icania, a one woman womenswear consignment service in South West London. Louise collects clothes, lists and sells them on Vinted, handles photography through to shipping, and splits the proceeds fifty fifty. The site is live at **[icania.co.uk](https://icania.co.uk)** and is a plain static site served by GitHub Pages. No database, no backend, nothing running that can fall over.

The section below is written for another Claude. If you are an assistant helping Louise with this repository, read it in full before you change anything. It tells you how the site is built, what is safe to touch, and the few rules that matter.

---

## Handover for the next assistant

### What this repo is

A static, client rendered site. One HTML shell (`index.html`) acts as a single page app and also as the template that a small build step stamps into a real HTML file for every route. There is no framework, no bundler, no npm dependencies to install. Plain HTML, CSS and vanilla JavaScript.

Pushing to the `main` branch of the live repository is the deploy. GitHub Pages publishes within a minute or two. There is no staging environment, so treat `main` as production and verify before you push.

### Repository topology

- **`origin`** is `louiseicania/ICANIA`. This is the live site. It owns the `CNAME` file that claims `icania.co.uk`. Pushing here changes what the public sees.
- **`backup`** is `wjames12345/ICANIA`, a private mirror. It deliberately has **no** `CNAME` (a commit named "Remove CNAME for private repo" removes it) so it never competes for the domain. When you mirror a change to the backup, cherry pick onto its history rather than force pushing, so you do not drag the `CNAME` back in.

### The single source of truth, and the build

`index.html` is the whole site. Every visitable page is generated from it.

1. **Page metadata** lives in one place: the `META` object near the top of the visible script in `app.js`. Each route has a `title` and `desc`. This is the only place to edit a page title or meta description.
2. **`build.js`** reads `index.html` and the `META` object out of `app.js`, then writes one real `.html` file per route, each with the correct `<title>`, description, canonical and Open Graph tags, and with the right section already visible so the page works with JavaScript disabled and so crawlers get a clean 200.
3. Run it with `npm run build` (which is just `node build.js`). It regenerates: `sell.html`, `about.html`, `faq.html`, `how-it-works.html`, `shop.html`, `reviews.html`, `privacy.html`, `terms.html`.

**Never hand edit those eight generated files.** Your change will be wiped the next time anyone runs the build. Edit `index.html` (structure and copy), `styles.css` (look), or `app.js` (behaviour and metadata), then run `npm run build`, then commit the source and the regenerated pages together.

### Routing, the part that surprises people

GitHub Pages has no server side routing, so clean urls like `/sell` are made to work with two tricks:

- **`app.js`** is a tiny client router. It intercepts clicks on internal links, calls `history.pushState`, and shows or hides the matching `data-view` section. `pathToView()` maps a url slug to a view name.
- **`404.html`** catches any deep link that lands as a real navigation (a hard refresh, a shared link) and bounces the path back into `index.html` so the router can restore it. This is the standard spa on GitHub Pages redirect.

**To add a new route** you must do three things or it will not be crawlable:
1. Add a `<section data-view="your-route">` to `index.html`.
2. Add a `your-route` entry to `META` in `app.js`.
3. Add `'your-route'` to the `ROUTES` array in `build.js`, then run `npm run build`, then add the url to `sitemap.xml`.

### The hidden brand page

`brand.html` is served at **[icania.co.uk/brand](https://icania.co.uk/brand)**. It is a self contained visual deck of the whole design system: palette, type, the fairy mark and its usage, spacing, the share card, the voice. It is deliberately hidden: it carries `noindex, nofollow` and is intentionally absent from `sitemap.xml`, and nothing on the site links to it. **Keep it that way.** Do not link it, do not add it to the sitemap.

It is built, not hand written. `build-brand.py` reads `brand.template.html`, inlines the animated fairy frames from `fairy_stopmotion.gif` as base64 data uris, and writes `brand.html` as one file. Edit the template, then run `python3 build-brand.py` (needs Python with Pillow). A written companion to the deck lives in `BRAND.md`; read it before any visual change.

### The shop, which runs itself

The shop at **/webshop** mirrors Louise's public Vinted closet.

- `fetch-shop.js` reads the public closet and writes `shop-data.json`.
- A GitHub Action, `.github/workflows/shop-sync.yml`, runs that script once a day (16:00 UTC, so 5pm UK in summer and 4pm in winter) and commits `shop-data.json` if it changed. So new listings appear on their own.
- `shop-data.json` is **generated output**. Never edit it by hand; the next sync overwrites it. Because the action commits to `main`, you will sometimes need to `git pull --rebase` before you can push your own work.
- If the shop ever looks empty, check whether the Vinted closet is in holiday mode, and remember that a datacenter IP can be blocked by Vinted where a normal home IP is not.
- `shopprep.html` and the older `/shop` page are thin redirects or teasers pointing at `/webshop`; the live shop is `/webshop`.

### Forms, fonts, tracking

- The enquiry form on the Sell page posts to **FormSubmit** (`formsubmit.co/louise@icania.co.uk`). There is no backend; submissions arrive by email. If the destination address ever changes, it is the `action` attribute on the `data-sell-form` form in `index.html`.
- Fonts are **Cormorant Garamond** and **Cormorant**, loaded from Google Fonts.
- There is **no analytics, no advertising, no third party trackers, and no cookies**. This is a deliberate promise made on the Privacy page. Do not add any without Louise asking.

### Caching, and why a change might not show

- `app.js` is loaded with a cache busting query in `index.html` (for example `app.js?v=20260602c`). If you ship a behavioural change and want to be certain browsers fetch the new file, bump that version string.
- There is a service worker, `sw.js`, with a `CACHE_VERSION` constant (currently around `v23`). It is network first for HTML, CSS and JS, so deploys are normally picked up straight away. **Bump `CACHE_VERSION` whenever you change the list of pre cached assets**, otherwise old assets can linger.

### House rules that are easy to miss

- **No dashes in human readable copy.** Avoid em dashes, en dashes and hyphens in any text a person reads. They read as a sign a machine wrote it. Use commas, full stops, or reword. (Hyphens inside file names, urls and code, like `how-it-works`, are fine.)
- **The fairy has movement rules.** The line art fairy never spins on its own axis. The gentle tilt the large section fairies do as you scroll is wanted and is stronger on desktop. Keep that distinction if you touch the animation.
- **Soft luxury tone.** Editorial, calm, lots of whitespace, quiet confidence, nothing shouty. Match it in any new copy.

### A safe change, end to end

1. Edit `index.html` / `styles.css` / `app.js`.
2. `npm run build` (and `python3 build-brand.py` only if you changed the brand template).
3. Eyeball the result, ideally by opening `index.html` and the affected route locally.
4. `git pull --rebase origin main` in case the shop sync has run.
5. Commit the source and the regenerated files together, then `git push origin main`.
6. If you keep the backup in step, cherry pick the same commit onto `backup/main` without touching its `CNAME` removal.

---

## File map

| File | What it is |
| --- | --- |
| `index.html` | The home page and the shell every other page is generated from |
| `styles.css` | Every style for the site |
| `app.js` | Client router, menu, enquiry form, animation, and the `META` source of truth |
| `build.js` | Generates the eight route pages from `index.html` + `META` |
| `404.html` | The spa redirect that keeps clean urls working |
| `brand.template.html` | Source for the hidden /brand deck |
| `build-brand.py` | Builds `brand.html` from that template |
| `BRAND.md` | The brand written out in words |
| `fetch-shop.js` | Pulls Louise's Vinted closet into `shop-data.json` |
| `shop-data.json` | Generated shop data (do not hand edit) |
| `webshop.html` | The live shop page that renders `shop-data.json` |
| `sw.js` | Service worker and cache versioning |
| `sitemap.xml`, `robots.txt` | Crawl directives (note: /brand is intentionally excluded) |
| `CNAME` | Binds the live repo to icania.co.uk (live repo only) |
| `og-card.html`, `og-card.png` | The social share card |

---

## Who looks after it

The site is maintained by James. Louise owns the repository. If anything needs adjusting, a fresh page, a colour tweak, new copy, just ask and it gets done.
