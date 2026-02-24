/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  LUMI — js/config.js                                        │
 * │  THIS IS YOUR MAIN EDIT FILE.                               │
 * └─────────────────────────────────────────────────────────────┘
 *
 * CHANGES vs previous version:
 *  + HERO_IMAGE            — hero photo path (was hardcoded in HTML)
 *  + PARTNERS_HERO_IMAGE   — partners page hero photo path
 *  + HERO_COIN_AMOUNT      — coin balance (was hardcoded 150)
 *  + HERO_BOOKINGS         — 3 booking cards (was hardcoded robotics only)
 *  + APP_SCREENSHOTS       — 4 screenshot paths (was hardcoded placeholder divs)
 *  + PARTNER_DASHBOARD     — partner hero card values (was hardcoded)
 *  + PARTNER_FORM_ENDPOINT — Google Apps Script URL (see setup/)
 */

const LUMI_CONFIG = {

  // ── Google Analytics 4 ──────────────────────────────────────
  GA_ID: "G-XXXXXXXXXX",

  // ── Primary CTA: Web App ────────────────────────────────────
  WEBAPP_URL: "https://app.lumipass.uz/en",

  // ── Secondary CTA: Telegram Bot ─────────────────────────────
  TELEGRAM_BOT_URL: "https://t.me/lumipassbot",

  // ── Partner Form ────────────────────────────────────────────
  // Paste your Google Apps Script deployment URL here.
  // Instructions: see setup/google-apps-script.js
  // Leave "" to fall back to opening the Telegram bot.
  PARTNER_FORM_ENDPOINT: "https://script.google.com/macros/s/AKfycbwuwZEi0hvb6fkJETi23LxedZwBXqqqjG76PHh0Pz7grIFSI7_OZLeCWEbHwYZtCLsjJg/exec",

  // ── Social & Contact Links ───────────────────────────────────
  // Set any value to "" to hide that item in the footer.
  SOCIAL: {
    telegram_channel : "https://t.me/lumipass_uz",
    telegram_display : "@lumipass_uz",
    instagram        : "https://www.instagram.com/lumipass.uz",
    instagram_display: "@lumipass.uz",
    phone            : "tel:+998937111708",
    phone_display    : "+998 (93) 711-17-08",
  },

  // ── Images ──────────────────────────────────────────────────
  // Replace .svg with your real .jpg or .webp once you have photos.
  HERO_IMAGE:          "assets/images/hero-children.jpg",
  PARTNERS_HERO_IMAGE: "assets/images/partners-hero.jpg",

  // ── App Screenshots (partners page "How Users Use Lumi") ────
  // 4 portrait phone screenshots, ~360x640px each.
  APP_SCREENSHOTS: [
    "assets/images/screenshot-register.jpeg",  // Step 1: register/sign-up
    "assets/images/screenshot-browse.jpeg",    // Step 2: browse centers
    "assets/images/screenshot-book.jpeg",      // Step 3: book activity
    "assets/images/screenshot-qr.webp",        // Step 4: QR code / check-in
  ],

  // ── Hero Floating Cards (index.html) ────────────────────────
  // Coin balance shown in the top-right floating card.
  HERO_COIN_AMOUNT: 340,

  // 3 booking cards shown in the hero visual.
  HERO_BOOKINGS: [
    {
      emoji: "🤖",
      name: { uz: "Robototexnika", en: "Robotics",  ru: "Робототехника" },
      time: "15:00 — 16:30",
    },
    {
      emoji: "🏊",
      name: { uz: "Suzish",       en: "Swimming",   ru: "Плавание" },
      time: "10:00 — 11:00",
    },
    {
      emoji: "🛝",
      name: { uz: "O'yingoh",     en: "Playground", ru: "Площадка" },
      time: "14:00 — 22:00",
    },
  ],

  // ── Partner Dashboard Cards (partners.html hero) ─────────────
  PARTNER_DASHBOARD: {
    today_bookings  : 5,
    week_bookings   : 23,
    monday_bookings : 3,
    new_clients     : 2,
    activity: {
      emoji: "🎾",
      name: { uz: "Tennis", en: "Tennis", ru: "Теннис" },
    },
  },

  // ── Partner Logos Strip ──────────────────────────────────────
  PARTNERS: [
    { src: "assets/logos/partners/partner-01.jpeg", alt: "Partner Center 1", url: "" },
    { src: "assets/logos/partners/partner-02.jpeg", alt: "Partner Center 2", url: "" },
    { src: "assets/logos/partners/partner-03.jpeg", alt: "Partner Center 3", url: "" },
    { src: "assets/logos/partners/partner-04.jpeg", alt: "Partner Center 4", url: "" },
    { src: "assets/logos/partners/partner-05.jpeg", alt: "Partner Center 5", url: "" },
    { src: "assets/logos/partners/partner-06.jpeg", alt: "Partner Center 6", url: "" },
    { src: "assets/logos/partners/partner-07.jpeg", alt: "Partner Center 7", url: "" },
    { src: "assets/logos/partners/partner-08.png", alt: "Partner Center 8", url: "" },
    { src: "assets/logos/partners/partner-09.png", alt: "Partner Center 9", url: "" },
  ],

  // ── Site Metadata ────────────────────────────────────────────
  META: {
    site_url : "https://lumipass.uz",
    og_image : "https://lumipass.uz/assets/images/og-image.png",
  },

};
