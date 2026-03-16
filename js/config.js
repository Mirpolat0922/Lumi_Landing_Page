/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  LUMI — js/config.js                                        │
 * │  THIS IS YOUR MAIN EDIT FILE.                               │
 * └─────────────────────────────────────────────────────────────┘
 *
 *  + HERO_IMAGE            — hero photo path
 *  + PARTNERS_HERO_IMAGE   — partners page hero photo path
 *  + HERO_COIN_AMOUNT      — coin balance shown in hero card
 *  + HERO_BOOKINGS         — 3 booking cards in hero visual
 *  + APP_SCREENSHOTS       — 4 screenshot paths (partners page)
 *  + PARTNER_DASHBOARD     — partner hero floating card values
 *  + PARTNER_FORM_ENDPOINT — Google Apps Script URL (see setup/)
 *  + ACTIVITIES            — 9 direction cards (name, desc, image per language)
 *  + PACKAGES              — 4 coin packages (name, price, coins, featured flag)
 *
 * ANALYTICS:
 *  Yandex Metrica replaces Google Analytics.
 *  1. Go to https://metrika.yandex.com and create a counter.
 *  2. Copy the numeric counter ID (e.g. 98765432).
 *  3. Paste it below as YM_ID.
 */

const LUMI_CONFIG = {

  // ── Yandex Metrica ───────────────────────────────────────────
  YM_ID: 106987893,

  // ── Primary CTA: Web App ────────────────────────────────────
  WEBAPP_URL: "https://app.lumipass.uz/en",

  // ── Secondary CTA: Telegram Bot ─────────────────────────────
  TELEGRAM_BOT_URL: "https://t.me/lumipassbot",

  // ── Partner Form ────────────────────────────────────────────
  PARTNER_FORM_ENDPOINT: "https://script.google.com/macros/s/AKfycbwuwZEi0hvb6fkJETi23LxedZwBXqqqjG76PHh0Pz7grIFSI7_OZLeCWEbHwYZtCLsjJg/exec",

  // ── Legal Docs ───────────────────────────────────────────────
  PRIVACY_URL: "privacy-policy.html",
  OFFER_URL:   "public-offer.html",

  // ── Activity Direction Cards ─────────────────────────────────
  // 9 directions shown in the "Markazlar" section.
  // image: upload your photo and set the path here.
  //        Leave "" to show a gradient placeholder until you add an image.
  // name / desc: translations in uz, en, ru.
  ACTIVITIES: [
    {
      image: "assets/images/activity-art.jpg",  // e.g. "assets/images/activity-ijod.jpg"
      name: { uz: "Ijod",             en: "Creativity",     ru: "Творчество"  },
      desc: {
        uz: "San'at, chizmachilik, qo'l ishi va boshqa ijodiy mashg'ulotlar — farzandingizning iqtidorini kashf eting.",
        en: "Art, drawing, crafts and more — discover your child's creative talent at partner studios.",
        ru: "Рисование, поделки и другое творчество — откройте талант вашего ребёнка в студиях-партнёрах.",
      },
    },
    {
      image: "assets/images/activity-education.png",  // e.g. "assets/images/activity-talim.jpg"
      name: { uz: "Ta'lim",           en: "Education",      ru: "Образование" },
      desc: {
        uz: "Tillar, matematika, mantiq va boshqa ta'limiy yo'nalishlar — bilim salohiyatini kengaytiring.",
        en: "Languages, math, logic and more — expand your child's knowledge and academic potential.",
        ru: "Языки, математика, логика и другое — расширьте академические возможности ребёнка.",
      },
    },
    {
      image: "assets/images/activity-sport.png",  // e.g. "assets/images/activity-sport.jpg"
      name: { uz: "Sport",            en: "Sports",         ru: "Спорт"       },
      desc: {
        uz: "Futbol, karate, tennis va boshqa sport turlari — kuch, sog'lom tana va jamoaviy ruh.",
        en: "Football, karate, tennis and more — strength, fitness and teamwork for your child.",
        ru: "Футбол, каратэ, теннис и другое — сила, здоровье и командный дух для вашего ребёнка.",
      },
    },
    {
      image: "assets/images/activity-playground.png",  // e.g. "assets/images/activity-kongilochar.jpg"
      name: { uz: "Ko'ngilochar",     en: "Entertainment",  ru: "Развлечения" },
      desc: {
        uz: "O'yingohlari, interaktiv o'yinlar va quvnoq dam olish — farzandingizga eng yaxshi o'yin muhiti.",
        en: "Playgrounds, interactive fun and joyful leisure — the best play environment for your child.",
        ru: "Площадки, игры и весёлый отдых — лучшая игровая среда для вашего ребёнка.",
      },
    },
    {
      image: "assets/images/activity-rivojlantiruvchi.png",  // e.g. "assets/images/activity-rivojlantiruvchi.jpg"
      name: { uz: "Rivojlantiruvchi", en: "Developmental",  ru: "Развивающие" },
      desc: {
        uz: "Aql, xotira, e'tibor va mantiqiy fikrlashni rivojlantiruvchi mashg'ulotlar.",
        en: "Activities that develop intellect, memory, attention and critical thinking skills.",
        ru: "Занятия для развития интеллекта, памяти, внимания и логического мышления.",
      },
    },
    {
      image: "assets/images/activity-health.png",  // e.g. "assets/images/activity-soglik.jpg"
      name: { uz: "Sog'liq",          en: "Health",         ru: "Здоровье"    },
      desc: {
        uz: "Sog'lom turmush tarzi, gimnastika va sog'liqni saqlashga yo'naltirilgan mashg'ulotlar.",
        en: "Healthy lifestyle, gymnastics and wellness-focused activities for growing children.",
        ru: "Здоровый образ жизни, гимнастика и занятия для укрепления здоровья детей.",
      },
    },
    {
      image: "assets/images/activity-dance.png",  // e.g. "assets/images/activity-raqs.jpg"
      name: { uz: "Raqs",             en: "Dance",          ru: "Танцы"       },
      desc: {
        uz: "Professional raqs markazlari — chiroyli harakatlar, ritm va moslashuvchanlik.",
        en: "Professional dance centers — grace, rhythm and flexibility for your child.",
        ru: "Профессиональные танцевальные центры — пластика, ритм и гибкость.",
      },
    },
    {
      image: "assets/images/activity-swimming.png",  // e.g. "assets/images/activity-suzish.jpg"
      name: { uz: "Suzish",           en: "Swimming",       ru: "Плавание"    },
      desc: {
        uz: "Malakali murabbiylar bilan suzishni o'rganish. Bolalar basseynlarini toping va yoziling.",
        en: "Learn to swim with qualified coaches. Find children's pools and enroll.",
        ru: "Учитесь плавать с профессиональными тренерами. Найдите детские бассейны.",
      },
    },
    {
      image: "assets/images/activity-music.png",  // e.g. "assets/images/activity-musiqa.jpg"
      name: { uz: "Musiqa",           en: "Music",          ru: "Музыка"      },
      desc: {
        uz: "Musiqa asboblari, vokal va musiqa nazariyasi — yosh musiqachilar uchun hamkor markazlar.",
        en: "Musical instruments, vocals and music theory — partner centers for young musicians.",
        ru: "Музыкальные инструменты, вокал и теория — центры для юных музыкантов.",
      },
    },
  ],

  // ── Coin Packages ────────────────────────────────────────────
  // 4 packages. Set featured: true for the highlighted "Popular" card.
  // price: display string (e.g. "189 000"). coins: integer.
  // name supports uz, en, ru translations.
  PACKAGES: [
    {
      name:     { uz: "Qadam",      en: "Step",        ru: "Шаг"         },
      price:    "189 000",
      coins:    45,
      featured: false,
    },
    {
      name:     { uz: "Sarguzasht", en: "Adventure",   ru: "Приключение" },
      price:    "489 000",
      coins:    120,
      featured: true,
    },
    {
      name:     { uz: "Parvoz",     en: "Flight",      ru: "Полёт"       },
      price:    "999 000",
      coins:    250,
      featured: false,
    },
    {
      name:     { uz: "Ilhom",      en: "Inspiration", ru: "Вдохновение" },
      price:    "1 589 000",
      coins:    400,
      featured: false,
    },
  ],

  // ── Social & Contact Links ───────────────────────────────────
  SOCIAL: {
    telegram_channel : "https://t.me/lumipass_uz",
    telegram_display : "@lumipass_uz",
    instagram        : "https://www.instagram.com/lumipass.uz",
    instagram_display: "@lumipass.uz",
    phone            : "tel:+998937111708",
    phone_display    : "+998 (93) 711-17-08",
  },

  // ── Images ──────────────────────────────────────────────────
  HERO_IMAGE:          "assets/images/hero-children.jpg",
  PARTNERS_HERO_IMAGE: "assets/images/partners-hero.jpg",

  // ── App Screenshots (partners page) ─────────────────────────
  APP_SCREENSHOTS: [
    "assets/images/screenshot-register.jpeg",
    "assets/images/screenshot-browse.jpeg",
    "assets/images/screenshot-book.jpeg",
    "assets/images/screenshot-qr.webp",
  ],

  // ── Hero Floating Cards ──────────────────────────────────────
  HERO_COIN_AMOUNT: 340,

  HERO_BOOKINGS: [
    {
      emoji: "🎨",
      name: { uz: "Ijod",   en: "Creativity", ru: "Творчество" },
      time: "15:00 — 16:30",
    },
    {
      emoji: "🏊",
      name: { uz: "Suzish", en: "Swimming",   ru: "Плавание"   },
      time: "10:00 — 11:00",
    },
    {
      emoji: "🎵",
      name: { uz: "Musiqa", en: "Music",      ru: "Музыка"     },
      time: "14:00 — 15:30",
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
    { src: "assets/logos/partners/partner-08.png",  alt: "Partner Center 8", url: "" },
    { src: "assets/logos/partners/partner-09.png",  alt: "Partner Center 9", url: "" },
  ],

  // ── Site Metadata ────────────────────────────────────────────
  META: {
    site_url : "https://lumipass.uz",
    og_image : "https://lumipass.uz/assets/images/og-image.png",
  },

};
