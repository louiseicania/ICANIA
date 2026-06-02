# Icania Brand Document

A scan of the live site (icania.co.uk) for every brand element worth codifying. Everything below is pulled directly from the site as built: index.html, styles.css, the share card, and the asset set.

---

## 1. Brand essence

**Icania** is a one woman womenswear consignment service in South West London. Louise collects your clothes, lists and sells them on her Vinted account, handles everything from photography to shipping, and splits the proceeds fifty fifty.

The feeling: soft luxury. Editorial, clean, calm, a little Steve Jobs minimal. Lots of whitespace, quiet confidence, nothing shouty.

**Positioning line:** South West London Clothing Consignment.

**One sentence promise:** We do the work. You keep half.

---

## 2. Name and wordmark

- **Name:** Icania (always capitalised I, lowercase rest).
- **Wordmark:** set in Cormorant Garamond, weight 400 to 500, with a fine purple sparkle mark to its left.
- On the share card the wordmark appears as **Icania.** with a full stop, underlined by a thin rule, with the subline **Vinted Reselling Service** in italic beneath.
- The nav wordmark pairs the text with a small animated fairy (fairy_stopmotion.gif) to its left.
- Sizes in use: nav 28px (24px once scrolled), footer 36px, loader 22px.

---

## 3. The fairy mark

The signature visual is a hand drawn line art fairy: navy outline, mid flight, wings spread, carrying a tote bag (the bag itself carries a tiny fairy emblem). It reads as whimsical but refined, never cartoonish.

**Asset files:**
- `fairy-mark.png` — static navy line art. Used as the section divider, the page hero marks (About, How it works, Reviews, FAQ, desktop only), the footer sparkle, and the share card illustration.
- `fairy_stopmotion.gif` — animated mark in the nav.
- `fairy_loader.gif` — animated mark on the page loader.

**Usage notes:**
- Hero fairy marks sit at 260px tall, desktop only. They are hidden on mobile.
- On scroll the big section fairies get a gentle rotateX float tilt (wanted, stronger on desktop). They never spin on the Z axis.
- The footer renders the mark large (60px, up to 92px tall on mobile).

---

## 4. Colour palette

Defined as CSS custom properties in styles.css.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#F6F3F4` | Background. A soft blush off white. |
| `--ink` | `#1F2540` | Primary text, buttons, lines. Deep navy. |
| `--accent` | `#8E7BA3` | Muted lavender purple. Sparkles, links on hover, hashes, accents. |

**Ink opacity ladder** (all built from the navy `#1F2540`):
`--ink-80` `.8` · `--ink-65` `.65` · `--ink-45` `.55` · `--ink-25` `.25` · `--ink-12` `.12` · `--ink-06` `.06`

**Accent tints:** `--accent-50` `rgba(142,123,163,.5)` · `--accent-30` `rgba(142,123,163,.3)`

**Supporting colours found in use:**
- Deep purple hover on arrow buttons: `#6E4FA3`
- Frosted nav scrolled state: `rgba(235,228,235,.95)`
- Product card hover wash: `#ECE2F2`
- Vinted teal (the one external brand colour): `#007782`, hover `#009AA8`
- Theme colour meta: `#1F2540`

**Share card palette names:** BLUSH `#F6F3F4`, NAVY `#1F2540`, MUTED `rgba(31,37,64,.58)`.

---

## 5. Typography

Two families do all the work.

- **Display / serif:** Cormorant Garamond (weights 300, 400, 500), with Cormorant for numerals. Used for every heading, the wordmark, taglines, pull quotes, prices, and the big stat numbers. Italic Cormorant is the signature for taglines and quotes.
  - Fallback stack: `'Times New Roman', Georgia, serif`.
- **Body / sans:** Helvetica Neue. Used for body copy, labels, nav links, buttons, captions.
  - Fallback stack: `Helvetica, Arial, sans-serif`.
- **Accent mono:** American Typewriter (light, 12px) for form placeholders and form help text. A small typewriter touch.

**Type scale (clamped, responsive):**
- `display-xxl` 72 to 220px, weight 300
- `display-xl` 54 to 160px
- `display-l` 44 to 104px (most page H1s)
- `display-m` 32 to 64px
- `display-s` 22 to 36px (mission statement, CTA copy)
- `body-l` 16 to 19px, line height 1.65
- `body` 15px, line height 1.7
- `caption` 12px, letter spacing 0.04em
- `eyebrow` 11px, uppercase, letter spacing 0.28em

**Headline character:** weight 400, line height roughly 1.0, slight negative letter spacing, `text-wrap: balance`. Big, airy, tightly set.

**Numbers:** Cormorant lining tabular figures inside a pill outlined in accent (the trust stats). Tabular nums elsewhere for alignment.

---

## 6. Voice and tone

First person, warm, plain spoken, quietly premium. Louise speaks as herself ("I collect your clothes"), and the service speaks as "we" for process detail. Honest about effort and money. No hype, no jargon, no exclamation marks.

**Examples of the voice:**
- "Sell your wardrobe without the hassle."
- "You don't lift a finger."
- "We price to move, not to maximise."
- "honestly, she takes almost everything."
- "Whatever sells, we split fifty fifty."

**Hard copy rule:** never use em dashes, en dashes, or hyphens in reader facing copy. They read as an AI tell. The site already follows this: "five star" not five-star, "fifty fifty" not fifty-fifty, "one woman" not one-woman. Keep it that way everywhere.

Spell numbers in prose where natural (fifty fifty, ten pieces, three months) but use figures for stats and proof points (651, 50/50, 3).

---

## 7. Taglines and signature phrases

- **South West London Clothing Consignment.** (positioning)
- **We do the work. You keep half.** (footer, social)
- **Sell your wardrobe without the hassle.** (home H1)
- **Empty your wardrobe here.** (sell H1)
- **A small, careful operation.** (about H1)
- **What people say.** (reviews H1)

**The process poem** (share card, set as a staggered Cormorant list):
> I collect.
> I photograph.
> I publish.
> Clothes sell.
> I ship.
> We split.

**The home three step, in Louise's own words:**
1. I collect your clothes.
2. I publish your clothes on my Vinted account.
3. Your clothes sell, we split the money, I handle shipping.

---

## 8. Proof points and key facts

These recur across the site and are the load bearing trust signals.

- **651** five star reviews on Vinted (averaging 4.9 stars). Also written as "650+".
- **50/50** split with sellers.
- **3** month selling period.
- Minimum **ten pieces** to consign.
- Around **60%** of accepted items sell in month one, **80%** by month three.
- Roughly **30 to 45 minutes** of work per piece before it sells.
- Womenswear only. Every brand accepted except Shein, Primark, H&M, Boohoo, Missguided. Unbranded vintage welcome.
- No upfront cost. The only optional cost is home collection, deducted from the final payment.
- Unsold pieces returned washed and folded, or donated to FARA or Oxfam with a receipt.
- Serving South West London only: Barnes, Putney, Fulham, Wandsworth, Chiswick, Battersea.

---

## 9. UI and component style

- **Primary button (`.btn`):** navy fill, blush text, 4px radius, 11px uppercase label at 0.24em tracking, soft drop shadow. Inverts to outline on hover.
- **Arrow button (`.btn-arrow`):** lavender accent fill, trailing arrow that slides right on hover, deepens to `#6E4FA3`. The main call to action.
- **Vinted button (`.btn-vinted`):** Vinted teal `#007782`. The only place a non brand colour leads, because it points off site to Vinted.
- **Text button (`.btn-text`):** italic Cormorant, 18px, thin underline. Quiet inline link style.
- **Lines:** hairline rules everywhere, 1px at 12% ink. All full width rules are the same thin hairline (including the line above the footer).
- **Forms:** underline only fields (no boxes), border turns accent on focus, an x mark for invalid. Inputs 16px to avoid iOS zoom.
- **Stat pills:** accent outlined rounded pills that invert to navy on hover.
- **Motion:** fade up on entry with a slight overshoot spring, scroll reveal on deeper elements, cross fade between views. Respects `prefers-reduced-motion`.
- **Spacing:** generous. Gutter 56px desktop, 24px mobile. Max width 1440px. Whitespace is the look, but never wasted vertical gaps.

---

## 10. Iconography and ornament

- **Sparkle / star ornament (`.spark`):** small accent mark beside the wordmark.
- **Sent envelope:** line drawn envelope with an accent four point star, gentle float animation on the sell confirmation.
- **Chevrons:** thin 1.4 stroke chevrons for FAQ and accordion toggles, rotate 180 on open.
- **Social glyphs:** thin line Instagram and TikTok marks in the footer.
- All icons share the same fine line, navy or accent, no fills. Consistent with the fairy line art.

---

## 11. Channels and contact

- **Site:** icania.co.uk
- **Email:** louise@icania.co.uk
- **Vinted:** vinted.co.uk/member/115231306-icaniaa
- **Instagram:** @__icaniaa__ (two underscores each side)
- **TikTok:** @_icaniaa_ (one underscore each side)
- **Area served:** South West London (Barnes, Putney, Fulham, Wandsworth, Chiswick, Battersea)
- **Legal entity:** sole trader, Louise.

---

## 12. Quick do and do not

**Do**
- Lead with the fairy mark and the blush plus navy plus lavender trio.
- Set headlines and taglines in Cormorant, big and airy.
- Keep the voice first person, honest, calm.
- Use the real numbers (651, 50/50, 3) as proof.
- Keep the Vinted teal only for the Vinted link.

**Do not**
- No em dashes, en dashes, or hyphens in reader facing copy.
- No exclamation marks or hype.
- No Z axis spin on the fairy (float tilt only).
- No box outlined form fields. Underlines only.
- No wasted vertical whitespace, even though the look is spacious.
- No colours outside the palette, except the single Vinted teal.
