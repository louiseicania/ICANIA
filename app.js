/* Reusable loader: quick flash on first open, reappears while anything is loading */
window.__loader = (function () {
  var el = document.getElementById('page-loader');
  if (!el) return { begin: function () {}, end: function () {} };

  var busy = 0;            // number of in-flight loading tasks
  var visible = false;
  var shownAt = 0;
  var pendingShow = null;
  var DELAY = 120;         // a task must outlast this before it flashes the loader
  var MIN_VISIBLE = 550;   // once shown, hold at least this long so it reads as a flash

  function show() {
    if (pendingShow) { clearTimeout(pendingShow); pendingShow = null; }
    if (visible) return;
    el.classList.remove('hide');
    el.classList.add('show');
    visible = true;
    shownAt = Date.now();
  }
  function hide() {
    if (!visible) return;
    visible = false;
    el.classList.add('hide');
    setTimeout(function () {
      if (!visible) el.classList.remove('show', 'hide');
    }, 420);
  }
  function settle() {
    if (busy > 0 || !visible) return;
    var wait = Math.max(0, MIN_VISIBLE - (Date.now() - shownAt));
    setTimeout(function () { if (busy === 0) hide(); }, wait);
  }
  function begin(opts) {
    busy++;
    if (visible) return;
    if (opts && opts.immediate) { show(); return; }
    if (!pendingShow) {
      pendingShow = setTimeout(function () {
        pendingShow = null;
        if (busy > 0) show();
      }, DELAY);
    }
  }
  function end() {
    busy = Math.max(0, busy - 1);
    if (busy === 0) {
      if (pendingShow) { clearTimeout(pendingShow); pendingShow = null; }
      settle();
    }
  }
  return { begin: begin, end: end };
})();

/* First open: stay invisible on a normal load — the corner fairy is branding
   enough. The full-screen fairy loader only appears if the page is genuinely
   slow to come together (a poor connection), where it fills the wait and then
   clears the moment the DOM and web fonts are ready. */
(function () {
  var L = window.__loader;
  if (!L || !L.begin) return;

  var SLOW_AFTER = 800;   // only reveal the loader if still loading after this
  var ready = false;
  var shown = false;
  var pending = 1;        // DOM parse (+ web fonts, added below)

  var slowTimer = setTimeout(function () {
    slowTimer = null;
    if (ready) return;
    shown = true;
    L.begin({ immediate: true });
  }, SLOW_AFTER);

  function markReady() {
    if (ready || --pending > 0) return;
    ready = true;
    if (slowTimer) { clearTimeout(slowTimer); slowTimer = null; }
    if (shown) L.end();
  }

  if (document.fonts && document.fonts.ready) {
    pending++;
    document.fonts.ready.then(markReady, markReady);
  }
  if (document.readyState === 'complete' || document.readyState === 'interactive') markReady();
  else document.addEventListener('DOMContentLoaded', markReady);
})();

/* iOS/mobile defers GIF playback until the first repaint (which is why it only
   starts on scroll). Re-set the header mark's src once loaded to kick it off. */
(function () {
  function kick() {
    var mark = document.querySelector('.nav-anim');
    if (!mark) return;
    var s = mark.getAttribute('src');
    if (!s) return;
    mark.removeAttribute('src');
    setTimeout(function () { mark.src = s; }, 0);
  }
  if (document.readyState === 'complete') kick();
  else window.addEventListener('load', kick);
})();
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  });
}

/* ===== next block ===== */


const PRODUCTS = [
  {
    "id": "01",
    "brand": "Ganni",
    "title": "Floral cotton poplin mini dress",
    "price": 55,
    "size": "S",
    "category": "dresses",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "02",
    "brand": "Reformation",
    "title": "Sage linen midi, button-front",
    "price": 75,
    "size": "M",
    "category": "dresses",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "03",
    "brand": "Sandro",
    "title": "Black silk satin slip dress",
    "price": 95,
    "size": "8",
    "category": "dresses",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "04",
    "brand": "Whistles",
    "title": "Navy crepe wrap dress",
    "price": 45,
    "size": "10",
    "category": "dresses",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "05",
    "brand": "& Other Stories",
    "title": "White voile tiered maxi",
    "price": 38,
    "size": "S",
    "category": "dresses",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "06",
    "brand": "Vintage",
    "title": "Cream cotton 70s prairie dress",
    "price": 65,
    "size": "8",
    "category": "dresses",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "07",
    "brand": "COS",
    "title": "Charcoal wool wide-leg trouser",
    "price": 55,
    "size": "8",
    "category": "trousers",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "08",
    "brand": "Frame",
    "title": "Le Crop Mini boot, mid-rise denim",
    "price": 65,
    "size": "26",
    "category": "trousers",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "09",
    "brand": "Toteme",
    "title": "Cream wool straight-leg trouser",
    "price": 125,
    "size": "6",
    "category": "trousers",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "10",
    "brand": "Ba&sh",
    "title": "Olive cotton twill cargo",
    "price": 42,
    "size": "M",
    "category": "trousers",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "11",
    "brand": "Levi's",
    "title": "Vintage 501 mid-blue, original",
    "price": 48,
    "size": "28",
    "category": "trousers",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "12",
    "brand": "Acne Studios",
    "title": "Pale grey cashmere crewneck",
    "price": 95,
    "size": "S",
    "category": "tops",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "13",
    "brand": "A.P.C.",
    "title": "Navy and cream striped breton",
    "price": 42,
    "size": "M",
    "category": "tops",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "14",
    "brand": "Studio Nicholson",
    "title": "Oversized white linen shirt",
    "price": 58,
    "size": "S",
    "category": "tops",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "15",
    "brand": "AllSaints",
    "title": "Black ribbed cotton vest",
    "price": 24,
    "size": "8",
    "category": "tops",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "16",
    "brand": "Vintage",
    "title": "Ivory silk blouse, unbranded",
    "price": 48,
    "size": "10",
    "category": "tops",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "17",
    "brand": "Isabel Marant",
    "title": "\u00c9toile cream and pink tweed blazer",
    "price": 165,
    "size": "36",
    "category": "jackets",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "18",
    "brand": "Whistles",
    "title": "Stone cotton trench coat",
    "price": 85,
    "size": "10",
    "category": "jackets",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "19",
    "brand": "Levi's",
    "title": "Vintage 90s mid-wash denim trucker",
    "price": 68,
    "size": "M",
    "category": "jackets",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "20",
    "brand": "Reiss",
    "title": "Camel double-breasted wool coat",
    "price": 125,
    "size": "8",
    "category": "jackets",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "21",
    "brand": "Coach",
    "title": "Tabby tan leather shoulder bag",
    "price": 180,
    "size": "One size",
    "category": "accessories",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "22",
    "brand": "Vintage",
    "title": "Geometric print silk scarf",
    "price": 28,
    "size": "One size",
    "category": "accessories",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "23",
    "brand": "Mulberry",
    "title": "Bayswater black leather wallet",
    "price": 95,
    "size": "One size",
    "category": "accessories",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  },
  {
    "id": "24",
    "brand": "Ganni",
    "title": "Black leather knee-high western boots",
    "price": 125,
    "size": "38",
    "category": "accessories",
    "image": "",
    "vintedUrl": "https://www.vinted.co.uk/",
    "sold": false
  }
];
const REVIEWS = {
  "totalBuyerReviews": 651,
  "buyers": [
    {
      "stars": 5,
      "quote": "Great Vinted experience. Item as described. Great communication. Super fast delivery. Highly recommended seller.",
      "name": "samcarron",
      "date": "May 2026"
    },
    {
      "stars": 5,
      "quote": "Thanks so much. This was a super quick purchase, along with prompt payment. Much appreciated.",
      "name": "jayamanda",
      "date": "May 2026"
    },
    {
      "stars": 5,
      "quote": "Quick delivery and item as described.",
      "name": "kstephenson19",
      "date": "May 2026"
    },
    {
      "stars": 5,
      "quote": "Excellent seller, super fast postage.",
      "name": "mbsbazaar",
      "date": "May 2026"
    },
    {
      "stars": 5,
      "quote": "Lovely pieces. Thank you!",
      "name": "katiedellal",
      "date": "May 2026"
    },
    {
      "stars": 5,
      "quote": "Lovely, great communication, always so helpful, thank you.",
      "name": "maryde210",
      "date": "May 2026"
    },
    {
      "stars": 5,
      "quote": "Delivered to US no issues, recommended seller!",
      "name": "77riri77",
      "date": "May 2026"
    },
    {
      "stars": 5,
      "quote": "Great bag, thanks.",
      "name": "mich220678",
      "date": "May 2026"
    },
    {
      "stars": 5,
      "quote": "Absolutely gorgeous suit, packed really well and sent out quickly. Brilliant seller xx",
      "name": "thisisski",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Great and lovely seller! Item is exactly as in photo.",
      "name": "jessica12leo",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Great trousers in a perfect condition, thank you!",
      "name": "swiderka96",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Lovely heels in great condition, thank you!",
      "name": "alicenaishxox",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Beautiful bag to add to my collection. Packaged well and quick delivery.",
      "name": "shellalex2026",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Great, speedy delivery and just as described. Thank you!",
      "name": "snodj",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Beautiful colours and design. Many thanks.",
      "name": "windflu",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Perfect! Thank you! Speedy delivery.",
      "name": "sueh345",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Lovely and as described. Thanks.",
      "name": "njm100",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Lovely dress, thank you!",
      "name": "babyyoda2016",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Scarf vibrant and arrived quickly!",
      "name": "maybelissima",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Great seller. Amazing jacket.",
      "name": "prettiesallmine",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Fast delivery time, good item, thank you.",
      "name": "dollydaydreams23",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Great seller, love the dress.",
      "name": "traceym252",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Gorgeous, thank you.",
      "name": "laurenheard",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Fabulous seller.",
      "name": "idapeel1991",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Beautiful jumper, thank you.",
      "name": "eccles2410",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Lovely dress, thank you.",
      "name": "jenh609",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Fast communication and delivery.",
      "name": "selchgat",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Came really quick xxx",
      "name": "milliesteventon",
      "date": "April 2026"
    },
    {
      "stars": 5,
      "quote": "Gorgeous top exactly as described and fast shipping - thank you!",
      "name": "georgina0905",
      "date": "March 2026"
    },
    {
      "stars": 5,
      "quote": "Fantastic top, perfect condition. Thank you.",
      "name": "gdown21",
      "date": "March 2026"
    },
    {
      "stars": 5,
      "quote": "Looked like the image, good condition and I was overall happy with the item itself.",
      "name": "lamps.com1",
      "date": "March 2026"
    },
    {
      "stars": 5,
      "quote": "Lovely. Thank you.",
      "name": "kira20048",
      "date": "March 2026"
    }
  ],
  "sellers": [
    {
      "quote": "I had two black bin bags of clothes I'd been meaning to deal with for over a year. Louise came round on a Tuesday morning, took everything, and three weeks later I had over four hundred pounds in my account. I genuinely would have given those clothes away.",
      "name": "Caroline M.",
      "pieces": 28,
      "earned": 412,
      "area": "Putney"
    },
    {
      "quote": "What I liked was the call beforehand. She was honest about what would and wouldn't sell, took the bits she thought she could move, and was upfront about the rest. No pretending.",
      "name": "Sophia L.",
      "pieces": 14,
      "earned": 286,
      "area": "Fulham"
    },
    {
      "quote": "I'm a working mother with two kids. The idea of taking individual photos and listing things one by one on Vinted was never going to happen. Icania was the only way these clothes were ever going to leave my wardrobe.",
      "name": "Helena G.",
      "pieces": 21,
      "earned": 524,
      "area": "Barnes"
    },
    {
      "quote": "The split feels fair when you see how much work goes into it. Steaming, photographing, listing, dealing with messages, packing, posting. I tried doing my own and gave up after three items.",
      "name": "Amelia R.",
      "pieces": 12,
      "earned": 198,
      "area": "Chiswick"
    },
    {
      "quote": "I downsized after my divorce and had a wardrobe full of designer pieces I never wore. Louise took the lot. The stuff she didn't think would sell, she suggested charities. Refreshingly honest.",
      "name": "Imogen P.",
      "pieces": 34,
      "earned": 891,
      "area": "Wandsworth"
    },
    {
      "quote": "Three months in, I'd made enough to cover a long weekend in Lisbon. From clothes I was about to give away.",
      "name": "Tabitha B.",
      "pieces": 18,
      "earned": 376,
      "area": "Battersea"
    }
  ]
};

/* ---------- Scroll-reveal observer ---------- */
const __revealSelector = '.numbered-row, .faq-item, .next-step, .trust-item, .review-card, .seller-card';
let __revealObserver = null;
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  __revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
})();
function __observeReveals(scope) {
  if (!__revealObserver) return;
  (scope || document).querySelectorAll(__revealSelector).forEach((el) => {
    el.classList.add('scroll-reveal');
    if (!el.classList.contains('in-view')) __revealObserver.observe(el);
  });
}

/* ---------- Path router (SPA on GitHub Pages) ---------- */
(function () {
  const views = document.querySelectorAll('[data-view]');
  const navLinks = document.querySelectorAll('[data-nav]');
  const knownViews = new Set(Array.from(views).map((v) => v.dataset.view));

  const DEFAULT_DESC = 'Sell your wardrobe without the hassle. Icania is a South West London womenswear consignment service. We photograph, list, and sell your clothes on Vinted and split the proceeds 50/50.';
  const META = {
    home: { title: 'Icania · South West London womenswear consignment', desc: DEFAULT_DESC },
    shop: { title: 'Shop · Icania', desc: 'Browse pieces from Icania. Currently selling on Vinted with 651 reviews averaging 4.9 stars.' },
    sell: { title: 'Sell your wardrobe · Icania', desc: 'Tell us what you’d like to consign. We’ll be in touch within 24 hours to confirm what we can take and arrange collection.' },
    'how-it-works': { title: 'Vinted reselling service · we sell your clothes for you · Icania', desc: 'Icania is a South West London Vinted reselling service. We list and sell your clothes on Vinted for you and split the proceeds 50/50. No upfront cost, no contracts, no dealing with buyers.' },
    reviews: { title: 'Reviews · Icania', desc: '651 buyer reviews on Vinted averaging 4.9 stars, plus stories from sellers across South West London.' },
    about: { title: 'About · Icania', desc: 'A small, careful South West London consignment service. We do the work, you keep half.' },
    faq: { title: 'FAQ · Icania', desc: 'Brands we accept, how long pieces take to sell, the 50/50 split, payment, and more.' },
    privacy: { title: 'Privacy policy · Icania', desc: 'What personal information Icania collects, why, how we look after it, and your rights.' },
    terms: { title: 'Terms · Icania', desc: 'The terms of Icania’s consignment service.' }
  };
  const descTag = document.querySelector('meta[name="description"]');
  function applyMeta(name) {
    const m = META[name] || META.home;
    document.title = m.title;
    if (descTag) descTag.setAttribute('content', m.desc);
  }

  function pathToView(pathname) {
    const slug = (pathname || '/').replace(/\.html$/, '').replace(/^\/+|\/+$/g, '');
    if (!slug) return 'home';
    return knownViews.has(slug) ? slug : 'home';
  }

  function setView(name) {
    if (!name) name = 'home';
    let matched = false;
    views.forEach((v) => {
      const isActive = v.dataset.view === name;
      v.style.display = isActive ? '' : 'none';
      if (isActive) {
        matched = true;
        // Re-trigger the parent view fade-in
        v.style.animation = 'none';
        void v.offsetWidth;
        v.style.animation = '';
        // Re-trigger the staggered fade-ups inside
        v.querySelectorAll('.fade-up').forEach((el) => {
          el.style.animation = 'none';
          void el.offsetWidth;
          el.style.animation = '';
        });
        // Reset scroll-reveal elements inside this view and re-observe them
        v.querySelectorAll('.scroll-reveal').forEach((el) => el.classList.remove('in-view'));
        __observeReveals(v);
      }
    });
    if (!matched) {
      const home = document.querySelector('[data-view="home"]');
      if (home) home.style.display = '';
    }
    navLinks.forEach((a) => {
      a.classList.toggle('active', a.dataset.nav === name);
    });
    applyMeta(matched ? name : 'home');
    if (name === 'reviews' && typeof window.__renderReviews === 'function') {
      window.__renderReviews();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Intercept clicks on internal links and route via pushState
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href[0] !== '/' || href.startsWith('//')) return;
    if (a.target && a.target !== '_self') return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (href !== window.location.pathname + window.location.search) {
      window.history.pushState({}, '', href);
    }
    setView(pathToView(window.location.pathname));
    // Close mobile nav after navigation
    const links = document.querySelector('.nav-links');
    const toggle = document.querySelector('.nav-toggle');
    if (links && links.classList.contains('mobile-open')) {
      links.classList.remove('mobile-open');
      if (toggle) {
        toggle.textContent = 'Menu';
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  window.addEventListener('popstate', () => setView(pathToView(window.location.pathname)));
  setView(pathToView(window.location.pathname));
})();

/* ---------- Header compaction + big-fairy float tilt ---------- */
// The big section fairies tilt on rotateX as they pass through the viewport so
// they read as "floating off the page." Tilt is stronger on desktop. This is a
// scroll-driven *tilt*, not a spin: section marks never rotate on Z.
(function () {
  var nav = document.querySelector('.nav');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var marks = reduce ? [] : Array.prototype.slice.call(document.querySelectorAll('.section-mark img'));
  var ticking = false;
  function frame() {
    ticking = false;
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (nav) nav.classList.toggle('scrolled', y > 28);
    if (marks.length) {
      var vh = window.innerHeight;
      var desktop = window.innerWidth >= 720;
      var tilt = desktop ? -34 : -18;   // stronger float on desktop
      var driftK = desktop ? -0.20 : -0.16;
      for (var i = 0; i < marks.length; i++) {
        var r = marks[i].getBoundingClientRect();
        var offset = (r.top + r.height / 2) - vh / 2;
        var drift = offset * driftK;
        var norm = Math.max(-1, Math.min(1, offset / (vh / 2)));
        var rotX = norm * tilt;
        marks[i].style.transform =
          'perspective(680px) translateY(' + drift.toFixed(1) + 'px) rotateX(' + rotX.toFixed(1) + 'deg)';
      }
    }
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  frame();
})();

/* ---------- In-page smooth scroll for [data-scroll] anchors ---------- */
(function () {
  var DURATION = 1200;   // leisurely, so the descent reads clearly
  var NAV_OFFSET = 88;   // clear the sticky header
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function glideTo(targetY) {
    var startY = window.pageYOffset;
    var diff = targetY - startY;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(diff) < 4) {
      window.scrollTo(0, targetY);
      return;
    }
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / DURATION);
      window.scrollTo(0, Math.round(startY + diff * easeInOutCubic(t)));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[data-scroll][href^="#"]');
    if (!link) return;
    var target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    var targetY = window.pageYOffset + target.getBoundingClientRect().top - NAV_OFFSET;
    glideTo(Math.max(0, targetY));
  });
})();

/* ---------- Floating "Submit enquiry" CTA (mobile, glass, adaptive) ---------- */
(function () {
  const cta = document.querySelector('.sticky-sell-cta');
  if (!cta) return;
  const form = document.querySelector('form[data-sell-form]');

  function onSell() {
    return window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') === '/sell';
  }

  // Land with the form's top just below the sticky nav, not hidden behind it
  function scrollToForm(f) {
    if (!f) return;
    const y = window.pageYOffset + f.getBoundingClientRect().top - 96;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  cta.addEventListener('click', () => {
    if (onSell()) {
      scrollToForm(form);
      return;
    }
    // SPA-navigate to /sell, then drop the visitor at the form
    history.pushState({}, '', '/sell');
    window.dispatchEvent(new PopStateEvent('popstate'));
    setTimeout(() => {
      scrollToForm(document.querySelector('form[data-sell-form]'));
    }, 140);
  });

})();

/* ---------- Mobile nav toggle ---------- */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('mobile-open');
    toggle.textContent = isOpen ? 'Close' : 'Menu';
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
})();

/* ---------- FAQ accordion (single-open) ---------- */
(function () {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const willOpen = !item.classList.contains('open');
      // Close every other item
      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          const otherQ = other.querySelector('.faq-q');
          if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', willOpen);
      q.setAttribute('aria-expanded', String(willOpen));
    });
  });
})();

/* ---------- Reviews tabs ---------- */
(function () {
  const tabs = document.querySelectorAll('.review-tab');
  const panels = document.querySelectorAll('[data-review-panel]');
  if (!tabs.length) return;

  function activate(name) {
    tabs.forEach((t) => t.classList.toggle('active', t.dataset.reviewTab === name));
    panels.forEach((p) => {
      p.style.display = p.dataset.reviewPanel === name ? '' : 'none';
    });
  }
  tabs.forEach((t) => t.addEventListener('click', () => activate(t.dataset.reviewTab)));
  const initial = document.querySelector('.review-tab.active') || tabs[0];
  if (initial) activate(initial.dataset.reviewTab);
})();

/* ---------- Brand chip input (sell form) ---------- */
(function () {
  const wrap = document.querySelector('.chip-input');
  if (!wrap) return;
  const field = wrap.querySelector('.chip-input-field');
  const hidden = document.querySelector('input[name="brands"]');

  function syncHidden() {
    if (!hidden) return;
    hidden.value = Array.from(wrap.querySelectorAll('.chip')).map((c) => c.dataset.value).join(', ');
  }
  function addChip(value) {
    const v = (value || '').trim();
    if (!v) return;
    for (const c of wrap.querySelectorAll('.chip')) {
      if (c.dataset.value.toLowerCase() === v.toLowerCase()) return;
    }
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.dataset.value = v;
    chip.innerHTML = v + '<button type="button" class="chip-x" aria-label="Remove ' + v + '">×</button>';
    wrap.insertBefore(chip, field);
    chip.querySelector('.chip-x').addEventListener('click', () => { chip.remove(); syncHidden(); });
    syncHidden();
  }
  field.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addChip(field.value);
      field.value = '';
    } else if (e.key === 'Backspace' && field.value === '') {
      const chips = wrap.querySelectorAll('.chip');
      const last = chips[chips.length - 1];
      if (last) { last.remove(); syncHidden(); }
    }
  });
  field.addEventListener('blur', () => {
    if (field.value.trim()) { addChip(field.value); field.value = ''; }
  });
  wrap.addEventListener('click', (e) => { if (e.target === wrap) field.focus(); });
})();

/* ---------- Photo upload preview ---------- */
(function () {
  const MAX = 8;
  const input = document.querySelector('input[name="photos"]');
  const list = document.querySelector('.upload-list');
  const counter = document.querySelector('[data-upload-count]');
  if (!input || !list) return;
  const dt = new DataTransfer();

  function formatSize(bytes) {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  }

  function render() {
    list.innerHTML = '';
    const files = Array.from(dt.files);
    if (counter) {
      if (files.length === 0) {
        counter.hidden = true;
        counter.textContent = '';
      } else {
        const total = files.reduce((sum, f) => sum + f.size, 0);
        counter.hidden = false;
        counter.textContent =
          files.length + ' photo' + (files.length === 1 ? '' : 's') +
          ' · ' + formatSize(total) +
          (files.length >= MAX ? ' · max reached' : '');
      }
    }
    files.forEach((file, idx) => {
      const reader = new FileReader();
      const thumb = document.createElement('div');
      thumb.className = 'upload-thumb';
      const x = document.createElement('button');
      x.type = 'button';
      x.className = 'upload-thumb-x';
      x.setAttribute('aria-label', 'Remove ' + file.name);
      x.textContent = '×';
      x.addEventListener('click', () => {
        const newDt = new DataTransfer();
        Array.from(dt.files).forEach((f, i) => { if (i !== idx) newDt.items.add(f); });
        while (dt.items.length) dt.items.remove(0);
        Array.from(newDt.files).forEach((f) => dt.items.add(f));
        input.files = dt.files;
        render();
      });
      thumb.appendChild(x);
      reader.onload = (e) => { thumb.style.backgroundImage = 'url(' + e.target.result + ')'; };
      reader.readAsDataURL(file);
      list.appendChild(thumb);
    });
  }
  input.addEventListener('change', (e) => {
    Array.from(e.target.files).forEach((f) => {
      if (dt.items.length < MAX) dt.items.add(f);
    });
    input.files = dt.files;
    render();
  });
})();

/* ---------- Shop ---------- */
(function () {
  const grid = document.querySelector('.product-grid');
  if (!grid) return;
  const filterButtons = document.querySelectorAll('.filter-btn');
  const countEl = document.querySelector('.filter-count');
  let activeCat = 'all';

  function placeholderImage(brand) {
    const text = (brand || 'ICANIA').toUpperCase();
    const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 750' preserveAspectRatio='xMidYMid slice'><rect width='600' height='750' fill='#1F2540'/><text x='300' y='395' text-anchor='middle' font-family='Helvetica, Arial, sans-serif' font-size='30' fill='#DDE4F0' letter-spacing='6'>" + text + "</text></svg>";
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function render() {
    const live = PRODUCTS.filter((p) => !p.sold);
    const visible = activeCat === 'all' ? live : live.filter((p) => p.category === activeCat);
    if (countEl) countEl.textContent = visible.length + ' ' + (visible.length === 1 ? 'piece' : 'pieces');
    if (!visible.length) {
      grid.innerHTML = '<div class="product-empty">No pieces in this category right now. New stock added weekly.</div>';
      return;
    }
    grid.innerHTML = visible.map((p) => {
      const img = (p.image && p.image.length) ? p.image : placeholderImage(p.brand);
      return '<a class="product-card" href="' + p.vintedUrl + '" target="_blank" rel="noopener">' +
             '<div class="product-img" style="background-image: url(&quot;' + img + '&quot;)" aria-label="' + p.brand + ' ' + p.title + '"></div>' +
             '<div class="product-meta"><span class="product-brand">' + p.brand + '</span><span class="product-price">£' + p.price + '</span></div>' +
             '<div class="product-desc">' + p.title + '</div>' +
             '<div class="product-size">Size ' + p.size + '</div>' +
             '</a>';
    }).join('');
    // Flash the loader while real (remote) product images load
    var L = window.__loader;
    if (L && L.begin) {
      visible.forEach(function (p) {
        if (!p.image) return; // placeholders are inline data URIs — instant
        var im = new Image();
        L.begin();
        var fin = function () { L.end(); };
        im.onload = fin;
        im.onerror = fin;
        im.src = p.image;
        if (im.complete) fin();
      });
    }
  }
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.category;
      render();
    });
  });
  render();
})();

/* ---------- Reviews loader (lazy: renders the first time /reviews opens) ---------- */
window.__renderReviews = (function () {
  let rendered = false;
  return function () {
    if (rendered) return;
    const buyerWrap = document.querySelector('[data-review-panel="buyers"]');
    const sellerWrap = document.querySelector('[data-review-panel="sellers"]');
    if (!buyerWrap || !sellerWrap) return;
    rendered = true;

    const buyerCountEl = document.querySelector('[data-review-tab="buyers"] .count');
    const sellerCountEl = document.querySelector('[data-review-tab="sellers"] .count');

    const buyerGrid = buyerWrap.querySelector('.review-grid');
    if (buyerGrid) {
      buyerGrid.innerHTML = REVIEWS.buyers.map((r) =>
        '<article class="review-card">' +
          '<div class="review-stars">' + '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars) + '</div>' +
          '<p class="review-quote">' + r.quote + '</p>' +
          '<div class="review-meta"><span>' + r.name + '</span><span>' + r.date + '</span></div>' +
        '</article>'
      ).join('');
    }
    if (buyerCountEl) buyerCountEl.textContent = REVIEWS.totalBuyerReviews || REVIEWS.buyers.length;

    const sellerList = sellerWrap.querySelector('.seller-list');
    if (sellerList) {
      sellerList.innerHTML = REVIEWS.sellers.map((s) =>
        '<article class="review-card">' +
          '<div class="review-stars">' + '★'.repeat(5) + '</div>' +
          '<p class="review-quote">' + s.quote + '</p>' +
          '<div class="seller-stats">' +
            '<span><b>' + s.pieces + '</b> pieces sold</span>' +
            '<span><b>£' + s.earned + '</b> earned</span>' +
          '</div>' +
          '<div class="review-meta"><span>' + s.name + '</span><span>' + s.area + '</span></div>' +
        '</article>'
      ).join('');
    }
    if (sellerCountEl) sellerCountEl.textContent = REVIEWS.sellers.length;
  };
})();
// If we landed directly on /reviews, render immediately.
if (window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') === '/reviews') {
  window.__renderReviews();
}

/* ---------- Form: validation + submit state ---------- */
(function () {
  const form = document.querySelector('form[data-sell-form]');
  if (!form) return;
  const submitBtn = form.querySelector('button[type="submit"]');
  const message = form.querySelector('[data-form-message]');

  function wrapperFor(field) {
    return field.closest('.form-field') || field.closest('.form-check');
  }

  function clearInvalid(wrap) {
    if (wrap) wrap.classList.remove('field-invalid');
  }

  function attachClearer(field) {
    const wrap = wrapperFor(field);
    const evt = field.type === 'checkbox' ? 'change' : 'input';
    const handler = () => {
      if (field.checkValidity && field.checkValidity()) clearInvalid(wrap);
    };
    if (!field.dataset.clearerAttached) {
      field.addEventListener(evt, handler);
      field.dataset.clearerAttached = 'true';
    }
  }

  function showMessage(text) {
    if (!message) return;
    message.hidden = false;
    message.textContent = text;
  }
  function hideMessage() {
    if (!message) return;
    message.hidden = true;
    message.textContent = '';
  }

  form.addEventListener('submit', (e) => {
    const required = form.querySelectorAll('[required]');
    let firstInvalid = null;
    let invalidCount = 0;

    required.forEach((field) => {
      const wrap = wrapperFor(field);
      const valid = field.checkValidity();
      if (!valid) {
        if (wrap) wrap.classList.add('field-invalid');
        invalidCount++;
        if (!firstInvalid) firstInvalid = wrap || field;
        attachClearer(field);
      } else if (wrap) {
        wrap.classList.remove('field-invalid');
      }
    });

    if (invalidCount > 0) {
      e.preventDefault();
      showMessage(invalidCount === 1
        ? 'Please complete the highlighted field above.'
        : 'Please complete the ' + invalidCount + ' highlighted fields above.');
      if (firstInvalid && firstInvalid.scrollIntoView) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    hideMessage();
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.busy = 'true';
      submitBtn.textContent = 'Sending…';
    }
  });
})();

/* ---------- Form: post-submit success state ---------- */
(function () {
  const params = new URLSearchParams(window.location.search);
  if (params.get('sent') !== '1') return;
  const form = document.querySelector('form[data-sell-form]');
  const sent = document.querySelector('[data-sell-sent]');
  if (form) form.style.display = 'none';
  if (sent) sent.hidden = false;
  // Strip ?sent=1 from the URL but stay on /sell so a refresh doesn't re-trigger the success state
  window.history.replaceState({}, '', '/sell');
})();

