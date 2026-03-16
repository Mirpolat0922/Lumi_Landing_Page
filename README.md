# Lumi — Website Package
## Two-page multilingual site · UZ / EN / RU · Production-ready

---

## 📁 File Structure

```
lumi/
├── index.html              ← Main landing page (for parents)
├── partners.html           ← Partners / B2B page
├── css/
│   └── styles.css          ← All styles (shared by both pages)
├── js/
│   ├── config.js           ← ✏️  YOUR MAIN EDIT FILE — links, GA ID, partners
│   └── main.js             ← Translations, analytics, FAQ, animations
└── assets/
    ├── images/             ← Replace .svg placeholders with real .jpg / .webp
    │   ├── hero-children.svg       → hero-children.jpg     (800×600px)
    │   ├── activity-robotics.svg   → activity-robotics.jpg (600×400px)
    │   ├── activity-art.svg        → activity-art.jpg      (600×400px)
    │   ├── activity-playground.svg → activity-playground.jpg
    │   ├── activity-dance.svg      → activity-dance.jpg
    │   ├── activity-swimming.svg   → activity-swimming.jpg
    │   ├── activity-football.svg   → activity-football.jpg
    │   ├── partners-hero.svg       → partners-hero.jpg     (1200×600px)
    │   └── og-image.jpg            ← CREATE THIS: 1200×630px social sharing image
    └── logos/
        ├── logo-lumi.svg           ← Replace with your real Lumi logo
        ├── logo-coin.svg           ← Replace with your real Lumi Coin logo
        └── partners/
            ├── partner-01.svg      ← Replace with real partner logos
            ├── partner-02.svg        (SVG preferred, PNG ok)
            └── ...                   (200×80px, transparent background)
```

---

## ✅ Setup Checklist

### 1️⃣  Edit `js/config.js` — the only file you need to touch for most changes

```js
const LUMI_CONFIG = {
  GA_ID:            "G-XXXXXXXXXX",    // ← Your Google Analytics 4 ID
  WEBAPP_URL:       "https://app.lumipass.uz/en",
  TELEGRAM_BOT_URL: "https://t.me/lumipassbot",
  PARTNER_FORM_URL: "https://t.me/lumipassbot",  // or your form URL

  SOCIAL: {
    telegram_channel:  "https://t.me/lumi_uzb",
    instagram:         "https://www.instagram.com/lumi_uzb",
    phone:             "tel:+998937111708",
    ...
  },

  PARTNERS: [
    { src: "assets/logos/partners/partner-01.svg", alt: "RoboKids Academy", url: "" },
    { src: "assets/logos/partners/partner-02.svg", alt: "ArtSpace Tashkent", url: "" },
    ...
  ],
};
```

### 2️⃣  Get your Google Analytics 4 ID
1. Go to [analytics.google.com](https://analytics.google.com)
2. Admin → Data Streams → your stream → Measurement ID
3. Copy `G-XXXXXXXXXX` and paste into `config.js`

### 3️⃣  Replace image placeholders
- Keep the same filename, just change extension: `hero-children.svg` → `hero-children.jpg`
- Compress images at [squoosh.app](https://squoosh.app) or [tinypng.com](https://tinypng.com) (target: under 200KB each)
- Use `.webp` for best performance

### 4️⃣  Replace logos
- Drop your real logo files into `assets/logos/`
- Keep filenames: `logo-lumi.svg` and `logo-coin.svg` (or `.png`)
- Drop partner logos into `assets/logos/partners/` and update `config.js`

### 5️⃣  Create the OG social image
Create `assets/images/og-image.jpg` at **1200×630px**.
This appears as the preview image when your link is shared on Telegram, WhatsApp, etc.

### 6️⃣  Update meta tags (optional, for custom domains/descriptions)
In both `index.html` and `partners.html`, update:
- `<meta name="description">` — page descriptions
- `<meta property="og:url">` — your exact URL
- `<link rel="canonical">` — your exact URL

### 7️⃣  Deploy
Upload the entire `lumi/` folder to your hosting. Static files only — no server needed.

---

## 📊 Google Analytics Events Tracked

| Event | Trigger |
|-------|---------|
| `cta_click` · `cta_type: web_app` | Every "Open App" button |
| `cta_click` · `cta_type: telegram` | Every Telegram button |
| `cta_click` · `cta_type: partner_form` | Partner page CTA buttons |
| `pricing_click` · `plan_name` | Each pricing plan click |
| `scroll_depth` · `depth: 25/50/75/90/100` | Scroll milestones |
| `section_view` · `section: id` | When each section enters viewport |
| `faq_open` · `question` | FAQ accordion opens |
| `language_change` · `language` | Language switcher |

---

## 🌐 Languages
All text in `js/main.js` inside the `T` object.
- `T.uz` — Uzbek
- `T.en` — English  
- `T.ru` — Russian

To add/edit any text, find the key in all three language objects and update them.

---

## 🎨 Brand Colors (edit in `css/styles.css` `:root`)
```css
--brand:       #6C4EF2;   /* Primary purple */
--brand-dark:  #4A2FD4;   /* Darker purple */
--gold:        #FFB830;   /* Coin / accent */
--coral:       #FF6B55;   /* Secondary accent */
--teal:        #2DD4BF;   /* Tertiary accent */
--navy:        #0E0C2B;   /* Dark backgrounds */
```
