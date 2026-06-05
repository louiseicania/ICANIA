# Icania

**You can get in touch for me to make refinements on this anytime you need. There is a hidden url /brand which presents a deck of all colours, fonts and style rules I used. The rest of this document is written by Claude, hope you're good b x**

---

This is the website for Icania, the South West London womenswear consignment service. It is live at **[icania.co.uk](https://icania.co.uk)**, served straight from this repository by GitHub Pages. It is a plain static site: no database, no server, nothing to keep running.

---

## The hidden brand page

Visit **[icania.co.uk/brand](https://icania.co.uk/brand)**.

It is a single visual deck showing every colour, font and style rule the site is built from: the palette swatches, the typefaces, the fairy mark and how it is used, spacing, the share card, and the voice. It is not linked from anywhere on the site and it is set to hide from Google, so only someone who knows the address will find it. It is the quickest way to see the whole design at a glance, and a handy reference if anything new ever needs to match.

A written version of the same thing lives in [BRAND.md](BRAND.md). Read it before changing anything visual.

---

## How the site is laid out

| File | What it is |
| --- | --- |
| `index.html` | The home page and the shell the whole site is built on |
| `styles.css` | Every style for the site |
| `app.js` | The page behaviour: navigation, the menu, the enquiry form, animation, and the `META` map of every page title and description |
| `build.js` | Generates the visitable route pages from `index.html` |
| `brand.template.html` | The source for the hidden /brand page |
| `build-brand.py` | Builds `brand.html` from that template |
| `BRAND.md` | The brand written out in words |
| `fetch-shop.js` | Pulls Louise's Vinted closet into `shop-data.json` |

The pages a visitor can reach (sell, how it works, about, faq, shop, reviews, privacy, terms) are **generated** from `index.html` by `build.js`, so the look stays identical everywhere.

---

## Making changes

Edit `index.html`, `styles.css` or `app.js`, then run:

```
npm run build
```

That rewrites the generated route pages so they match. Commit and push, and GitHub Pages updates the live site within a minute or two. The custom domain is set by the `CNAME` file, leave it alone.

The hidden /brand page is rebuilt separately, only when its design changes:

```
python3 build-brand.py
```

---

## Things worth knowing before you touch it

- **Do not hand edit the generated pages** (`sell.html`, `about.html`, `faq.html`, `how-it-works.html`, `shop.html`, `reviews.html`, `privacy.html`, `terms.html`). They are overwritten by `npm run build` every time. Edit `index.html` and rerun the build instead. To change a page's title or description, edit the `META` map in `app.js`, which is the single source of truth the build reads from.
- **The clean urls are a trick.** GitHub Pages has no server routing, so deep links survive through `404.html`, which bounces the path back into `index.html`. If you add a new route, add it to the `ROUTES` list in `build.js`, give it a `META` entry in `app.js`, and add it to `sitemap.xml`.
- **Keep /brand hidden.** `brand.html` carries `noindex, nofollow` and is deliberately left out of `sitemap.xml`. Do not link it from the site and do not add it to the sitemap.
- **The shop runs itself.** A GitHub Action (`.github/workflows/shop-sync.yml`) runs `fetch-shop.js` once a day and commits any changes to `shop-data.json`, which feeds the **/webshop** page. That file is generated, so never edit it by hand. If the shop ever looks empty, check whether the Vinted closet is in holiday mode first.
- **The fairy has rules.** The line art fairy never spins on its own axis. The gentle tilt the big section fairies do as you scroll is wanted, and is stronger on desktop. Keep that distinction.
- **House writing style.** In any copy a person reads, avoid em dashes, en dashes and hyphens. They read as a tell that a machine wrote it. Use commas, full stops or a reworded sentence instead.
- **Always run the build before committing** if you changed `index.html`, `styles.css` or `app.js`, otherwise the live route pages will fall out of step with the home page.

---

## Who looks after it

The site is maintained by James. Louise owns the repository. If anything needs adjusting, a fresh page, a colour tweak, new copy, just ask and it gets done.
