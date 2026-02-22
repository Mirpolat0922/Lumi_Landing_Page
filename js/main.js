/**
 * LUMI — js/main.js
 *
 * CHANGES vs previous version:
 *  + Language persistence: reads/writes localStorage so lang survives page navigation
 *  + buildHeroCards()       — fills 3 booking card names from LUMI_CONFIG.HERO_BOOKINGS
 *                             and current language (was hardcoded "Robototexnika" only)
 *  + fillHeroImage()        — sets hero photo src from LUMI_CONFIG.HERO_IMAGE
 *  + fillCoinAmount()       — sets coin balance from LUMI_CONFIG.HERO_COIN_AMOUNT
 *  + buildAppScreenshots()  — fills partner-page screenshot imgs from LUMI_CONFIG.APP_SCREENSHOTS
 *  + buildPartnerDashboard()— fills partner hero floating card values from LUMI_CONFIG.PARTNER_DASHBOARD
 *  + openPartnerModal() / closePartnerModal() / handlePartnerForm() — partner application modal
 *  - setLang() now also calls buildHeroCards() + buildPartnerDashboard() to update multilingual names
 */

/* ═══════════════════════════════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════════════════════════════ */
const T = {
  uz: {
    // Nav
    nav_home:       "Bosh sahifa",
    nav_features:   "Afzalliklar",
    nav_activities: "Markazlar",
    nav_how:        "Qanday ishlaydi",
    nav_pricing:    "To'plamlar",
    nav_faq:        "Savollar",
    nav_partners:   "Hamkorlar",
    nav_contact:    "Aloqa",
    nav_cta:        "Ilovani Ochish",

    // Hero
    hero_badge:   "Toshkentning №1 bolalar platformasi",
    hero_h1a:     "Farzandingizning ",
    hero_h1b:     "yorqin kelajagi",
    hero_h1c:     " shu yerda boshlanadi",
    hero_p:       "Toshkentdagi 50+ hamkor markazni bir joydan toping va bron qiling — sport, san'at, ta'lim va ko'ngil ochar. Lumi Coin orqali.",
    hero_btn_web: "Ilovani Ochish",
    hero_btn_tg:  "Telegram orqali",
    hero_note:    "🔒 Bepul kirish — ro'yxatdan o'tish shart emas",
    stat_partners:"Hamkorlar",
    stat_dirs:    "Yo'nalishlar",
    stat_age:     "Yosh oralig'i",
    stat_support: "Qo'llab-quvvatlash",

    // Floating cards
    hfc_activity: "Bron qilindi",
    hfc_booked:   "Tasdiqlandi ✓",
    hfc_balance:  "Balansingiz",
    hfc_coins:    "Lumi Tangalari",

    // Partners strip
    partners_title: "50+ hamkor markaz biz bilan ishlaydi",

    // Features
    feat_tag:  "Nega Lumi?",
    feat_h2a:  "Farzandingizga kerak bo'lgan hamma narsa — ",
    feat_h2b:  "bir joyda",
    feat_p:    "Lumi sizni Toshkentdagi tekshirilgan markazlar bilan bog'laydi — sport, ijod, ta'lim hammasi bir platformada.",
    f1h: "Hammasi bir joyda",     f1p: "Bir qulay platforma orqali Toshkentdagi 50+ markaz va 100+ yo'nalishdan farzandingizga mosini toping.",
    f2h: "Vaqtingizni tejang",    f2p: "Darslar va mashg'ulotlarni osonlik bilan rejalashtiring. Barcha xizmatlar va eslatmalar bir platformada.",
    f3h: "Ishonchli hamkorlar",   f3p: "Faqat tekshirilgan va sifatli markazlar bilan ishlаymiz. Ota-onalar izohlari to'g'ri tanlov qilishga yordam beradi.",
    f4h: "Rivojlanishni kuzating",f4p: "Farzandingiz yutuqlarini kuzating va shaxsiylashtirilgan tavsiyalar oling.",
    f5h: "Pulingizni tejang",     f5p: "Lumi Coin to'plamlari orqali faqat foydalangan mashg'ulotlaringiz uchun to'laysiz. Isrof bo'ladigan abonementlar yo'q.",
    f6h: "Xavfsizlik birinchi",   f6p: "Farzandingiz har doim nazorat ostida va xavfsiz muhitda mashg'ulotlarda ishtirok etadi.",

    // Activities — UPDATED: bridge/marketplace messaging
    act_tag:       "Markazlar",
    act_h2a:       "100+ yo'nalish, ",
    act_h2b:       "50+ hamkor markaz",
    act_p:         "Lumi siz uchun Toshkentdagi eng yaxshi bolalar markazlarini jamladi. Bir joydan toping, bron qiling — markaz sizni kutadi.",
    act_at_centers:"markazlarda mavjud",
    act_book:      "Markazlarni Ko'rish →",
    a1h: "Robototexnika",        a1p: "Texnologiyani sevadigan bolalar uchun. Toshkentdagi robototexnika markazlarini toping va bron qiling.",
    a2h: "Ijodiy darslar",       a2p: "San'at, musiqa, rasm — hamkor ijod markazlarida farzandingizning iqtidorini kashf eting.",
    a3h: "Bolalar o'yingohlari", a3p: "Sifatli va xavfsiz o'yingohlarda dam olish. Markaz tanlang va bron qiling.",
    a4h: "Raqs va gimnastika",   a4p: "Professional raqs va gimnastika markazlari — chiroyli qomat va moslashuvchanlik uchun.",
    a5h: "Suzish",               a5p: "Malakali murabbiylar bilan suzishni o'rganish. Bolalar basseynlarini toping va yoziling.",
    a6h: "Futbol",               a6p: "Jamoaviy sport — kuch va do'stlik. Toshkentdagi futbol maktablarini bir joydan toping.",

    // Stats
    stats_h2a: "Raqamlarda — ",
    stats_h2b: "Lumi platformasi",
    s1v:"50+",  s1d:"Hamkorlar",
    s2v:"100+", s2d:"Yo'nalishlar",
    s3v:"6+",   s3d:"To'plamlar",
    s4v:"24/7", s4d:"Qo'llab-quvvatlash",

    // How it works
    how_tag: "Qanday ishlaydi",
    how_h2a: "4 oddiy qadamda ",
    how_h2b: "boshlang",
    how_p:   "Farzandingizni mashg'ulotga yozish juda oson.",
    s1h:"Ro'yxatdan o'ting",  s1p:"Telegram bot orqali tez va oson ro'yxatdan o'ting.",
    s2h:"To'plam oling",      s2p:"Sizga mos Lumi Coin to'plamini tanlang va xarid qiling.",
    s3h:"Markaz tanlang",     s3p:"50+ hamkor markaz orasidan farzandingizga mosini toping.",
    s4h:"Kuzating va sevining!", s4p:"Farzandingiz rivojlanishini platforma orqali kuzatib boring.",

    // Pricing
    price_tag: "To'plamlar",
    price_h2a: "O'zingizga mos ",
    price_h2b: "to'plamni tanlang",
    price_p:   "Lumi Coin sotib oling va istagan hamkor markazida istalgan mashg'ulotda foydalaning. Faqat foydalangan narsangiz uchun to'lang.",
    coin_label:"Lumi Tangalari",
    popular:   "Mashhur",
    plan_btn:  "Boshlash",
    p1n:"Qadam",      p1d:"15 kun",
    p2n:"Kashfiyot",  p2d:"1 oy",
    p3n:"Sarguzasht", p3d:"45 kun",
    p4n:"Parvoz",     p4d:"2 oy",
    p5n:"Ilhom",      p5d:"3 oy",
    p6n:"Kelajak",    p6d:"6 oy",

    // FAQ
    faq_tag: "Savollar",
    faq_h2a: "Ko'p so'raladigan ",
    faq_h2b: "savollar",
    faq_p:   "Savolingiz bormi? Javobimiz tayyor. Qo'shimcha savollar uchun Telegram orqali murojaat qiling.",
    q1:"Lumi nima?",                    a1:"Lumi — 0 dan 16 yoshgacha bo'lgan bolalar uchun Toshkentdagi 50+ hamkor markazni birlashtirgan platforma. Siz markazlarni qidirmaysiz — Lumi ularni sizga tavsiya qiladi. Sport, ijod, ta'lim — hammasi bir joyda.",
    q2:"Abonement bormi?",              a2:"Yo'q. Lumi Coin tizimi orqali faqat ishlatgan mashg'ulotlaringiz uchun to'laysiz. Kerak bo'lsa ko'p markaz orasida tanlash imkoniyati bor.",
    q3:"Lumi Tangalari qanday ishlaydi?",a3:"Lumi Tangalari — hamkor markazlardagi mashg'ulotlarga yozilish uchun raqamli birlik. Har bir markaz o'z narxini tangalarda belgilaydi. Bu sizga markazlar orasida erkin tanlov qilish imkonini beradi.",
    q4:"Ishlatilmagan tangalar saqlanadimi?", a4:"Yo'q, har bir to'plamning amal qilish muddati bor. Muddati tugagach, foydalanilmagan tangalar bekor qilinadi. Tangalarni faol ishlatish tavsiya etiladi.",
    q5:"Mashg'ulotga qanday yozilish mumkin?", a5:"Telegram botimizga o'ting — u veb-ilovamizni ochadi. U yerda barcha hamkor markazlarni ko'rib chiqib, birini tanlab, Lumi Tangalaringiz yordamida darhol band qilishingiz mumkin.",
    q6:"Qanday mashg'ulotlar mavjud?",  a6:"Sport (karate, suzish, futbol...), ijodiy (san'at, musiqa, raqs...), ta'limiy (ingliz tili, mantiq, matematika...), rivojlantiruvchi va ko'ngilochar mashg'ulotlar — 100+ yo'nalish.",

    // Final CTA
    cta_tag:    "Hoziroq boshlang",
    cta_h2:     "Farzandingizning yorqin kelajagi shu yerda!",
    cta_p:      "Toshkentdagi minglab oilalar qatori Lumi orqali farzandlaringiz uchun eng yaxshi markazlarni kashf eting.",
    cta_note:   "⭐ Eng qulay usul — to'g'ridan-to'g'ri veb-ilovamizdan boshlang",
    cta_webapp: "Veb-ilovani Ochish",
    cta_tg:     "Telegram orqali",
    cta_sub:    "Bepul · Ro'yxatdan o'tish shart emas",

    // Footer
    footer_tagline:  "Toshkentdagi bolalar uchun sport, san'at, ta'lim va ko'ngil ochar — 50+ hamkor markaz, bir platforma.",
    footer_company:  "Kompaniya",
    footer_legal:    "Huquqiy",
    footer_privacy:  "Maxfiylik siyosati",
    footer_offer:    "Ommaviy oferta",
    footer_contact:  "Aloqa",
    footer_rights:   "Barcha huquqlar himoyalangan.",
    footer_made:     "Toshkent bolalari uchun ❤️ bilan yaratildi",

    // Partners Page
    pp_badge:   "Biznes hamkorlar uchun",
    pp_h1a:     "Markazingiz daromadini ",
    pp_h1b:     "+50% gacha oshiring",
    pp_h1c:     " — atiga 20 daqiqada",
    pp_p:       "Lumi platformasiga qo'shiling va minglab ota-onalarga farzandlari uchun eng yaxshi markaz sifatida ko'rining.",
    pp_btn:     "Hamkor Bo'lish",
    pp_stat1v:"50+",     pp_stat1d:"Hamkor markazlar",
    pp_stat2v:"20 min",  pp_stat2d:"Ulash uchun vaqt",
    pp_stat3v:"+50%",    pp_stat3d:"O'rtacha daromad o'sishi",

    // Partner dashboard cards — NEW keys matching the HTML
    ppd_today_label:  "Bugungi bronlar",
    ppd_bookings:     "ta bron ✓",
    ppd_growing:      "📈 O'smoqda",
    ppd_schedule_label:"Dushanba jadvali",
    ppd_kids_booked:  "bola yozildi",
    ppd_new_label:    "Yangi mijozlar",
    // (legacy keys kept for compatibility)
    ppd_today:       "bugungi bron",
    ppd_week:        "bu hafta",
    ppd_next:        "Keyingi dars",
    ppd_monday:      "Dushanba",
    ppd_reservations:"rezervatsiya",
    ppd_new_clients: "Yangi mijozlar",
    ppd_this_week:   "bu hafta",

    pp_howuser_tag:"Foydalanuvchilar uchun",
    pp_howuser_h2a:"Foydalanuvchilar Lumida ",
    pp_howuser_h2b:"nima qilishadi?",
    pp_howuser_p:"Platformamiz ota-onalarni bevosita sizning markazingizga yo'naltiradi.",
    hu1h:"Ro'yxatdan o'tishadi", hu1p:"Lumi ilovasini yuklab olib ro'yxatdan o'tishadi.",
    hu2h:"Markaz tanlashadi",    hu2p:"Bolalar markazlari va mashg'ulotlarni ko'rib chiqishadi.",
    hu3h:"Yozilishadi",          hu3p:"To'g'ridan-to'g'ri sizning markazingizga yozilishadi.",
    hu4h:"Tashrif buyurishadi",  hu4p:"Kelishadi va QR-kodni skanerlashadi — to'lov avtomatik amalga oshadi.",

    pp_why_tag: "Afzalliklar",
    pp_why_h2a: "Nega Lumi bilan ",
    pp_why_h2b: "hamkorlik qilish kerak?",
    pp_why_p:   "Lumi orqali markazingizning taniqliligini oshiring, yangi mijozlarga ega bo'ling va daromadingizni ko'paytiring.",
    w1h:"Keng auditoriya",          w1p:"Platformamiz orqali minglab foydalanuvchilarga yetib boring va yangi mijozlarni jalb qiling.",
    w2h:"50% gacha daromad o'sishi",w2p:"Bizning tizimlar yordamida markazingiz sezilarli daromad o'sishiga erishadi.",
    w3h:"Tez integratsiya",         w3p:"Faqat 20 daqiqada ro'yxatdan o'tib, platformamizga qo'shiling.",
    w4h:"Tahlil va hisobot",        w4p:"Yo'nalishlar va talablar bo'yicha aniq ma'lumotlar bilan ishlang.",
    w5h:"Marketing imkoniyati",     w5p:"Lumi bilan birgalikda marketing targ'ibotlarida ishtirok eting, brendingizni kuchaytiring.",
    w6h:"Qaytuvchi mijozlar",       w6p:"Yaxshi xizmat bilan bolalarning 87% qayta keladi — Lumi bu jarayonni osonlashtiradi.",

    pp_models_tag: "Hamkorlik modellari",
    pp_models_h2a: "3 xil ",
    pp_models_h2b: "hamkorlik imkoniyati",
    m1n:"Standart",      m1d:"Ilovaga o'z jadvalingizni qo'shing va yangi mijozlarni oling. Eng mashhur model.",
    m2n:"Kengaytirilgan",m2d:"Talab va takliflarga binoan yangi faoliyat turlarini ishga tushiring.",
    m3n:"Franchise",     m3d:"Statistikamizga asoslangan holda yangi markazlar oching.",

    pp_steps_tag:  "Boshlash",
    pp_steps_h2a:  "4 oddiy qadamda ",
    pp_steps_h2b:  "qo'shiling",
    pp_steps_p:    "Siz hech narsa to'lamaysiz — biz sizga mijozlar beramiz va pul to'laymiz.",
    ps1h:"Platformaga ulaning",   ps1p:"Hamkorlik shartnomasini imzolab, 15-20 daqiqada akkaunt yaratiladi.",
    ps2h:"Jadval tuzing",         ps2p:"Qaysi bolalarni va qachon qabul qilishingizni belgilang.",
    ps3h:"Xizmat ko'rsating",     ps3p:"Yaxshi darslarda bolalar 87% hollarda qaytib keladi.",
    ps4h:"QR orqali to'lov",      ps4p:"Har safar QR kod skanerlansa, biz sizga to'laymiz.",

    pp_cta_h2:  "Hoziroq ariza qoldiring",
    pp_cta_p:   "Mutaxassislarimiz siz bilan bog'lanib, barcha savollaringizga javob berishadi.",
    pp_cta_btn: "Hamkor Bo'lish",
    pp_cta_sub: "Bepul · Majburiyat yo'q",

    // Partner Form Modal
    modal_title:         "Hamkor Bo'lish Uchun Ariza",
    modal_subtitle:      "Formani to'ldiring — biz 24 soat ichida siz bilan bog'lanamiz.",
    modal_sub:           "Formani to'ldiring — biz 24 soat ichida siz bilan bog'lanamiz",
    modal_f_name:        "To'liq ism",
    modal_f_center:      "Markaz nomi",
    modal_f_phone:       "Telefon raqami",
    modal_f_notes:       "Qo'shimcha ma'lumot",
    modal_optional:      "(ixtiyoriy)",
    modal_name:          "To'liq ismingiz *",
    modal_name_ph:       "Ism Familiya",
    modal_center:        "Markaz nomi *",
    modal_center_ph:     "Markazingiz nomi",
    modal_phone:         "Telefon raqami *",
    modal_phone_ph:      "+998 __ ___ __ __",
    modal_insta:         "Instagram (ixtiyoriy)",
    modal_insta_ph:      "@markaz_nomi",
    modal_tg:            "Telegram (ixtiyoriy)",
    modal_tg_ph:         "@markaz_nomi",
    modal_notes:         "Qo'shimcha ma'lumot (ixtiyoriy)",
    modal_notes_ph:      "Markazingiz haqida qisqacha...",
    modal_submit:        "Ariza Yuborish",
    modal_sending:       "Yuborilmoqda...",
    modal_ok_title:      "Ariza qabul qilindi! ✅",
    modal_ok_body:       "Mutaxassisimiz 24 soat ichida siz bilan bog'lanadi. Rahmat!",
    modal_ok_close:      "Yopish",
    modal_privacy:       "Ma'lumotlaringiz maxfiy saqlanadi",
    modal_error_req:     "Iltimos, majburiy maydonlarni to'ldiring",
    modal_error_send:    "Xatolik yuz berdi. Telegram orqali murojaat qiling.",
    modal_success_title: "Ariza qabul qilindi!",
    modal_success_sub:   "Biz 24 soat ichida siz bilan bog'lanamiz.",
  },

  en: {
    nav_home:"Home", nav_features:"Features", nav_activities:"Centers",
    nav_how:"How it works", nav_pricing:"Pricing", nav_faq:"FAQ",
    nav_partners:"For Partners", nav_contact:"Contact", nav_cta:"Open App",

    hero_badge:"Tashkent's #1 children's platform",
    hero_h1a:"Your child's ", hero_h1b:"bright future", hero_h1c:" starts here",
    hero_p:"Find and book the best children's activity centers in Tashkent — sports, arts, education and fun. All with Lumi Coins.",
    hero_btn_web:"Open App", hero_btn_tg:"Via Telegram",
    hero_note:"🔒 Free access — no sign-up required",
    stat_partners:"Partners", stat_dirs:"Directions", stat_age:"Age range", stat_support:"Support",
    hfc_activity:"Booked", hfc_booked:"Confirmed ✓", hfc_balance:"Your Balance",
    hfc_coins:"Lumi Coins",
    partners_title:"50+ partner centers work with us",

    feat_tag:"Why Lumi?",
    feat_h2a:"Everything your child needs — ", feat_h2b:"all in one place",
    feat_p:"Lumi connects you to verified children's activity centers across Tashkent — sports, arts and education on one platform.",
    f1h:"All in One Place",     f1p:"Find and book activities at 50+ partner centers from one convenient platform.",
    f2h:"Save Your Time",       f2p:"Schedule lessons effortlessly. All bookings, centers, and reminders in one place.",
    f3h:"Trusted Partners",     f3p:"We only work with verified centers. Parent reviews help you make the right choice.",
    f4h:"Track Progress",       f4p:"Monitor your child's achievements and get personalized recommendations.",
    f5h:"Save Money",           f5p:"With Lumi Coins you only pay for sessions you actually use. No wasted subscriptions.",
    f6h:"Safety First",         f6p:"Your child always participates in a supervised, safe environment.",

    act_tag:"Centers",
    act_h2a:"100+ activities at ", act_h2b:"50+ partner centers",
    act_p:"Lumi brings Tashkent's best children's centers together in one place. Find, book, and go — the center is waiting for you.",
    act_at_centers:"centers near you",
    act_book:"Browse Centers →",
    a1h:"Robotics",            a1p:"For tech-curious kids. Find and book robotics centers across Tashkent.",
    a2h:"Creative Classes",    a2p:"Art, music, drawing — discover your child's talent at partner creative studios.",
    a3h:"Playgrounds",         a3p:"Quality, safe playgrounds. Choose a center and book your slot.",
    a4h:"Dance & Gymnastics",  a4p:"Professional dance and gymnastics centers — for posture, flexibility, and rhythm.",
    a5h:"Swimming",            a5p:"Learn to swim with qualified coaches. Find children's pools and enroll.",
    a6h:"Football",            a6p:"Team sport — strength and friendship. Find football schools in Tashkent in one place.",

    stats_h2a:"Lumi in ", stats_h2b:"numbers",
    s1v:"50+",s1d:"Partners", s2v:"100+",s2d:"Directions", s3v:"6+",s3d:"Packages", s4v:"24/7",s4d:"Support",

    how_tag:"How it works",
    how_h2a:"Get started in ", how_h2b:"4 easy steps",
    how_p:"Booking an activity for your child through Lumi is simple.",
    s1h:"Sign Up",            s1p:"Register quickly via our Telegram bot.",
    s2h:"Get a Package",      s2p:"Choose the Lumi Coins package that suits you.",
    s3h:"Pick a Center",      s3p:"Find the perfect center from 50+ verified partners.",
    s4h:"Watch Them Grow!",   s4p:"Track your child's progress and achievements.",

    price_tag:"Packages",
    price_h2a:"Choose your ", price_h2b:"perfect plan",
    price_p:"Buy Lumi Coins and use them at any partner center. Pay only for what you actually use.",
    coin_label:"Lumi Coins", popular:"Popular", plan_btn:"Get Started",
    p1n:"Step",p1d:"15 days", p2n:"Discovery",p2d:"1 month", p3n:"Adventure",p3d:"45 days",
    p4n:"Flight",p4d:"2 months", p5n:"Inspiration",p5d:"3 months", p6n:"Future",p6d:"6 months",

    faq_tag:"FAQ", faq_h2a:"Frequently asked ", faq_h2b:"questions",
    faq_p:"Got a question? We've got the answer.",
    q1:"What is Lumi?",              a1:"Lumi is a platform that connects families to 50+ verified children's activity centers in Tashkent. Sports, arts, education — all in one place. You don't search for centers — Lumi recommends them to you.",
    q2:"Is there a subscription?",  a2:"No. With the Lumi Coins system you only pay for sessions you actually use. You can also choose between multiple centers freely.",
    q3:"How do Lumi Coins work?",   a3:"Lumi Coins are digital units for enrolling in activities at partner centers. Each center sets its own coin price — giving you the freedom to compare and choose.",
    q4:"Do unused coins expire?",   a4:"Yes, each package has a validity period. Unused coins are cancelled after expiry. We recommend using your coins actively.",
    q5:"How do I book an activity?",a5:"Go to our Telegram bot — it opens our web app. Browse all partner centers, pick one, and book instantly using your Lumi Coins.",
    q6:"What activities are available?",a6:"Sports (karate, swimming, football...), creative (art, music, dance...), educational (English, logic, math...), developmental and entertainment — 100+ directions.",

    cta_tag:"Start Now", cta_h2:"Your child's bright future starts here!",
    cta_p:"Join thousands of families in Tashkent discovering the best activity centers through Lumi.",
    cta_note:"⭐ Best experience — start directly from our web app",
    cta_webapp:"Open Web App", cta_tg:"Via Telegram", cta_sub:"Free · No registration required",

    footer_tagline:"Sports, arts, education and fun for children in Tashkent — 50+ partner centers, one platform.",
    footer_company:"Company", footer_legal:"Legal", footer_privacy:"Privacy Policy",
    footer_offer:"Public Offer", footer_contact:"Contact",
    footer_rights:"All rights reserved.", footer_made:"Made with ❤️ for children of Tashkent",

    pp_badge:"For business partners",
    pp_h1a:"Grow your center's revenue by ", pp_h1b:"+50%", pp_h1c:" — in just 20 minutes",
    pp_p:"Join Lumi and be visible to thousands of parents looking for the best center for their children.",
    pp_btn:"Become a Partner",
    pp_stat1v:"50+",pp_stat1d:"Partner centers", pp_stat2v:"20 min",pp_stat2d:"Time to join", pp_stat3v:"+50%",pp_stat3d:"Avg. revenue growth",

    ppd_today_label:"Today's bookings", ppd_bookings:"bookings ✓", ppd_growing:"📈 Growing",
    ppd_schedule_label:"Monday schedule", ppd_kids_booked:"kids enrolled",
    ppd_new_label:"New clients",
    ppd_today:"bookings today", ppd_week:"this week",
    ppd_next:"Next class", ppd_monday:"Monday",
    ppd_reservations:"reservations",
    ppd_new_clients:"New clients", ppd_this_week:"this week",

    pp_howuser_tag:"For users",
    pp_howuser_h2a:"How users ", pp_howuser_h2b:"use Lumi",
    pp_howuser_p:"Our platform directs parents directly to your center.",
    hu1h:"Sign up",       hu1p:"Download the Lumi app and register.",
    hu2h:"Browse centers",hu2p:"Browse children's centers and activities.",
    hu3h:"Enroll",        hu3p:"Enroll directly at your center.",
    hu4h:"Visit",         hu4p:"Come in and scan the QR code — payment is automatic.",

    pp_why_tag:"Benefits",
    pp_why_h2a:"Why partner ", pp_why_h2b:"with Lumi?",
    pp_why_p:"Grow your visibility, gain new clients, and boost revenue.",
    w1h:"Wide Audience",       w1p:"Reach thousands of users and attract new clients.",
    w2h:"Up to +50% Revenue",  w2p:"Our systems help your center achieve significant revenue growth.",
    w3h:"Fast Integration",    w3p:"Register in just 20 minutes and join our platform.",
    w4h:"Analytics & Reports", w4p:"Work with precise data on directions and demand.",
    w5h:"Marketing Support",   w5p:"Participate in Lumi marketing campaigns to strengthen your brand.",
    w6h:"Returning Clients",   w6p:"With great service 87% of children come back.",

    pp_models_tag:"Partnership",
    pp_models_h2a:"3 partnership ", pp_models_h2b:"models",
    m1n:"Standard",   m1d:"Add your schedule to the app and receive new clients. Most popular.",
    m2n:"Extended",   m2d:"Launch new activity types based on demand and market data.",
    m3n:"Franchise",  m3d:"Open new centers based on our analytics and market insights.",

    pp_steps_tag:"Get Started",
    pp_steps_h2a:"Join in ", pp_steps_h2b:"4 easy steps",
    pp_steps_p:"You pay nothing — we bring you clients and pay you.",
    ps1h:"Connect to Platform",    ps1p:"Sign the agreement — your account is created in 15–20 minutes.",
    ps2h:"Set Your Schedule",      ps2p:"Define which children you accept and when.",
    ps3h:"Deliver Great Service",  ps3p:"With great lessons, 87% of children come back.",
    ps4h:"QR Payment",             ps4p:"Every time a QR code is scanned, we pay you.",

    pp_cta_h2:"Submit your application now",
    pp_cta_p:"Our specialists will contact you and answer all your questions.",
    pp_cta_btn:"Become a Partner",
    pp_cta_sub:"Free · No obligation",

    modal_title:"Partner Application",
    modal_subtitle:"Fill out the form — we'll get back to you within 24 hours.",
    modal_sub:"Fill out the form — we'll get back to you within 24 hours",
    modal_f_name:"Full name", modal_f_center:"Center name", modal_f_phone:"Phone number", modal_f_notes:"Additional info",
    modal_optional:"(optional)",
    modal_name:"Full name *", modal_name_ph:"First Last",
    modal_center:"Center name *", modal_center_ph:"Your center's name",
    modal_phone:"Phone number *", modal_phone_ph:"+998 __ ___ __ __",
    modal_insta:"Instagram (optional)", modal_insta_ph:"@center_name",
    modal_tg:"Telegram (optional)", modal_tg_ph:"@center_name",
    modal_notes:"Additional info (optional)", modal_notes_ph:"Brief about your center...",
    modal_submit:"Submit Application", modal_sending:"Sending...",
    modal_ok_title:"Application received! ✅",
    modal_ok_body:"Our specialist will contact you within 24 hours. Thank you!",
    modal_ok_close:"Close",
    modal_privacy:"Your information is kept confidential",
    modal_error_req:"Please fill in all required fields",
    modal_error_send:"An error occurred. Please contact us via Telegram.",
    modal_success_title:"Application received!",
    modal_success_sub:"We'll contact you within 24 hours.",
  },

  ru: {
    nav_home:"Главная", nav_features:"Преимущества", nav_activities:"Центры",
    nav_how:"Как работает", nav_pricing:"Пакеты", nav_faq:"Вопросы",
    nav_partners:"Партнёрам", nav_contact:"Контакты", nav_cta:"Открыть приложение",

    hero_badge:"Платформа №1 для детей в Ташкенте",
    hero_h1a:"Светлое будущее ", hero_h1b:"вашего ребёнка", hero_h1c:" начинается здесь",
    hero_p:"Найдите и запишитесь в лучшие детские центры Ташкента — спорт, творчество, образование и развлечения. Всё через Lumi Coins.",
    hero_btn_web:"Открыть приложение", hero_btn_tg:"Через Telegram",
    hero_note:"🔒 Бесплатный доступ — регистрация не нужна",
    stat_partners:"Партнёры", stat_dirs:"Направлений", stat_age:"Возраст", stat_support:"Поддержка",
    hfc_activity:"Записано", hfc_booked:"Подтверждено ✓", hfc_balance:"Ваш баланс",
    hfc_coins:"Lumi Монеты",
    partners_title:"50+ партнёрских центров работают с нами",

    feat_tag:"Почему Lumi?",
    feat_h2a:"Всё, что нужно вашему ребёнку — ", feat_h2b:"в одном месте",
    feat_p:"Lumi соединяет вас с проверенными детскими центрами Ташкента — спорт, творчество, образование на одной платформе.",
    f1h:"Всё в одном месте",    f1p:"Находите и записывайтесь в 50+ центров с одной удобной платформы.",
    f2h:"Экономьте время",      f2p:"Планируйте занятия без усилий. Все центры, бронирования и напоминания в одном месте.",
    f3h:"Проверенные партнёры", f3p:"Работаем только с проверенными центрами. Отзывы помогут сделать выбор.",
    f4h:"Отслеживайте прогресс",f4p:"Следите за достижениями ребёнка и получайте рекомендации.",
    f5h:"Экономьте деньги",     f5p:"С Lumi Coins вы платите только за использованные занятия.",
    f6h:"Безопасность прежде всего",f6p:"Ваш ребёнок всегда занимается под наблюдением в безопасной среде.",

    act_tag:"Центры",
    act_h2a:"100+ направлений в ", act_h2b:"50+ партнёрских центрах",
    act_p:"Lumi собрал лучшие детские центры Ташкента в одном месте. Найдите, запишитесь — центр вас ждёт.",
    act_at_centers:"центров рядом",
    act_book:"Смотреть центры →",
    a1h:"Робототехника",      a1p:"Для любознательных детей. Найдите и запишитесь в центры робототехники Ташкента.",
    a2h:"Творческие занятия", a2p:"Искусство, музыка, рисование — откройте талант ребёнка в партнёрских студиях.",
    a3h:"Детские площадки",   a3p:"Качественные, безопасные площадки. Выберите центр и забронируйте место.",
    a4h:"Танцы и гимнастика", a4p:"Профессиональные танцевальные и гимнастические центры.",
    a5h:"Плавание",           a5p:"Учитесь плавать с квалифицированными тренерами. Найдите детские бассейны.",
    a6h:"Футбол",             a6p:"Командный спорт — сила и дружба. Найдите футбольные школы Ташкента.",

    stats_h2a:"Lumi в ", stats_h2b:"цифрах",
    s1v:"50+",s1d:"Партнёры", s2v:"100+",s2d:"Направлений", s3v:"6+",s3d:"Пакетов", s4v:"24/7",s4d:"Поддержка",

    how_tag:"Как работает",
    how_h2a:"Начните за ", how_h2b:"4 простых шага",
    how_p:"Записать ребёнка на занятие через Lumi очень просто.",
    s1h:"Зарегистрируйтесь",    s1p:"Быстро зарегистрируйтесь через Telegram-бот.",
    s2h:"Купите пакет",         s2p:"Выберите подходящий пакет Lumi Coins.",
    s3h:"Выберите центр",       s3p:"Найдите идеальный центр среди 50+ проверенных партнёров.",
    s4h:"Наблюдайте за ростом!",s4p:"Отслеживайте прогресс и достижения ребёнка.",

    price_tag:"Пакеты",
    price_h2a:"Выберите ", price_h2b:"подходящий план",
    price_p:"Купите Lumi Coins и используйте в любом центре. Платите только за то, что используете.",
    coin_label:"Lumi Монеты", popular:"Популярный", plan_btn:"Начать",
    p1n:"Шаг",p1d:"15 дней", p2n:"Открытие",p2d:"1 месяц", p3n:"Приключение",p3d:"45 дней",
    p4n:"Полёт",p4d:"2 месяца", p5n:"Вдохновение",p5d:"3 месяца", p6n:"Будущее",p6d:"6 месяцев",

    faq_tag:"Вопросы", faq_h2a:"Часто задаваемые ", faq_h2b:"вопросы",
    faq_p:"Есть вопрос? У нас есть ответ.",
    q1:"Что такое Lumi?",             a1:"Lumi — платформа, которая объединяет семьи с 50+ проверенными детскими центрами Ташкента. Спорт, творчество, образование — всё в одном месте.",
    q2:"Есть ли абонемент?",         a2:"Нет. Система Lumi Coins — вы платите только за использованные занятия и можете выбирать между разными центрами.",
    q3:"Как работают Lumi Coins?",   a3:"Lumi Coins — цифровые единицы для записи в центры. Каждый центр устанавливает свою цену в монетах.",
    q4:"Сгорают ли неиспользованные монеты?",a4:"Да, каждый пакет имеет срок действия. Рекомендуем активно использовать монеты.",
    q5:"Как записаться на занятие?", a5:"Перейдите в наш Telegram-бот — он открывает веб-приложение. Просматривайте центры и записывайтесь через Lumi Coins.",
    q6:"Какие занятия доступны?",    a6:"Спорт (каратэ, плавание, футбол...), творческие, образовательные, развивающие — 100+ направлений.",

    cta_tag:"Начните сейчас", cta_h2:"Светлое будущее вашего ребёнка здесь!",
    cta_p:"Присоединяйтесь к тысячам семей Ташкента, открывающих лучшие центры через Lumi.",
    cta_note:"⭐ Лучший опыт — начните через наше веб-приложение",
    cta_webapp:"Открыть веб-приложение", cta_tg:"Через Telegram", cta_sub:"Бесплатно · Без регистрации",

    footer_tagline:"Спорт, творчество, образование и развлечения для детей Ташкента — 50+ центров, одна платформа.",
    footer_company:"Компания", footer_legal:"Правовая информация",
    footer_privacy:"Конфиденциальность", footer_offer:"Публичная оферта",
    footer_contact:"Контакты", footer_rights:"Все права защищены.",
    footer_made:"Сделано с ❤️ для детей Ташкента",

    pp_badge:"Для бизнес-партнёров",
    pp_h1a:"Увеличьте доход на ", pp_h1b:"+50%", pp_h1c:" — за 20 минут",
    pp_p:"Присоединяйтесь к Lumi и станьте видимыми для тысяч родителей.",
    pp_btn:"Стать партнёром",
    pp_stat1v:"50+",pp_stat1d:"Партнёрских центров", pp_stat2v:"20 мин",pp_stat2d:"Время подключения", pp_stat3v:"+50%",pp_stat3d:"Рост дохода",

    ppd_today_label:"Броней сегодня", ppd_bookings:"бронирований ✓", ppd_growing:"📈 Растёт",
    ppd_schedule_label:"Расписание понедельника", ppd_kids_booked:"детей записано",
    ppd_new_label:"Новые клиенты",
    ppd_today:"броней сегодня", ppd_week:"за неделю",
    ppd_next:"Следующий урок", ppd_monday:"Понедельник",
    ppd_reservations:"резервации",
    ppd_new_clients:"Новые клиенты", ppd_this_week:"на этой неделе",

    pp_howuser_tag:"Для пользователей",
    pp_howuser_h2a:"Что делают пользователи ", pp_howuser_h2b:"в Lumi?",
    pp_howuser_p:"Наша платформа направляет родителей прямо в ваш центр.",
    hu1h:"Регистрируются",  hu1p:"Скачивают приложение и регистрируются.",
    hu2h:"Выбирают центр",  hu2p:"Просматривают детские центры и занятия.",
    hu3h:"Записываются",    hu3p:"Записываются напрямую в ваш центр.",
    hu4h:"Приходят",        hu4p:"Приходят и сканируют QR-код — оплата автоматически.",

    pp_why_tag:"Преимущества",
    pp_why_h2a:"Почему партнёриться ", pp_why_h2b:"с Lumi?",
    pp_why_p:"Повысьте узнаваемость, привлекайте клиентов, увеличивайте доход.",
    w1h:"Широкая аудитория",      w1p:"Охватите тысячи пользователей и привлекайте новых клиентов.",
    w2h:"До +50% дохода",         w2p:"Наши системы помогут достигнуть значительного роста.",
    w3h:"Быстрая интеграция",     w3p:"Зарегистрируйтесь за 20 минут.",
    w4h:"Аналитика и отчёты",     w4p:"Работайте с точными данными о спросе.",
    w5h:"Маркетинговая поддержка",w5p:"Участвуйте в акциях Lumi для усиления бренда.",
    w6h:"Возвращающиеся клиенты", w6p:"При хорошем обслуживании 87% детей возвращаются.",

    pp_models_tag:"Партнёрство",
    pp_models_h2a:"3 модели ", pp_models_h2b:"сотрудничества",
    m1n:"Стандартная",   m1d:"Добавьте расписание в приложение и получайте новых клиентов.",
    m2n:"Расширенная",   m2d:"Запустите новые виды занятий на основе спроса.",
    m3n:"Франшиза",      m3d:"Откройте новые центры на основе нашей аналитики.",

    pp_steps_tag:"Начало",
    pp_steps_h2a:"Присоединяйтесь за ", pp_steps_h2b:"4 шага",
    pp_steps_p:"Вы ничего не платите — мы приводим клиентов и платим вам.",
    ps1h:"Подключитесь",          ps1p:"Подпишите договор — аккаунт за 15–20 минут.",
    ps2h:"Составьте расписание",  ps2p:"Определите, каких детей и когда принимаете.",
    ps3h:"Оказывайте услуги",     ps3p:"При хорошем обслуживании 87% детей возвращаются.",
    ps4h:"Оплата по QR",          ps4p:"Каждый раз при сканировании QR-кода мы вам платим.",

    pp_cta_h2:"Оставьте заявку прямо сейчас",
    pp_cta_p:"Наши специалисты свяжутся и ответят на все вопросы.",
    pp_cta_btn:"Стать партнёром",
    pp_cta_sub:"Бесплатно · Без обязательств",

    modal_title:"Заявка на партнёрство",
    modal_subtitle:"Заполните форму — мы свяжемся с вами в течение 24 часов.",
    modal_sub:"Заполните форму — мы свяжемся с вами в течение 24 часов",
    modal_f_name:"Полное имя", modal_f_center:"Название центра", modal_f_phone:"Номер телефона", modal_f_notes:"Доп. информация",
    modal_optional:"(необязательно)",
    modal_name:"Полное имя *", modal_name_ph:"Имя Фамилия",
    modal_center:"Название центра *", modal_center_ph:"Название вашего центра",
    modal_phone:"Номер телефона *", modal_phone_ph:"+998 __ ___ __ __",
    modal_insta:"Instagram (необязательно)", modal_insta_ph:"@название_центра",
    modal_tg:"Telegram (необязательно)", modal_tg_ph:"@название_центра",
    modal_notes:"Дополнительная информация (необязательно)", modal_notes_ph:"Кратко о вашем центре...",
    modal_submit:"Отправить заявку", modal_sending:"Отправляется...",
    modal_ok_title:"Заявка принята! ✅",
    modal_ok_body:"Наш специалист свяжется с вами в течение 24 часов. Спасибо!",
    modal_ok_close:"Закрыть",
    modal_privacy:"Ваши данные хранятся конфиденциально",
    modal_error_req:"Пожалуйста, заполните обязательные поля",
    modal_error_send:"Произошла ошибка. Свяжитесь с нами через Telegram.",
    modal_success_title:"Заявка принята!",
    modal_success_sub:"Мы свяжемся с вами в течение 24 часов.",
  },
};

/* ═══════════════════════════════════════════════════════════════
   LANGUAGE SYSTEM
   CHANGE: reads/writes localStorage so language persists across pages
   ═══════════════════════════════════════════════════════════════ */
let currentLang = "uz";

function setLang(lang) {
  currentLang = lang;
  const t = T[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (t[k] !== undefined) el.textContent = t[k];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const k = el.getAttribute("data-i18n-ph");
    if (t[k] !== undefined) el.setAttribute("placeholder", t[k]);
  });
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  document.documentElement.lang = lang;

  // CHANGE: persist across pages
  try { localStorage.setItem("lumi_lang", lang); } catch(e) {}

  // CHANGE: update multilingual dynamic content
  buildHeroCards();
  buildPartnerDashboard();

  gaEvent("language_change", { language: lang });
}

/* ═══════════════════════════════════════════════════════════════
   GOOGLE ANALYTICS 4
   ═══════════════════════════════════════════════════════════════ */
function gaEvent(name, params = {}) {
  if (typeof gtag === "function") gtag("event", name, params);
}
function trackWebApp(location) {
  gaEvent("cta_click", { cta_type: "web_app", cta_location: location });
}
function trackTelegram(location) {
  gaEvent("cta_click", { cta_type: "telegram", cta_location: location });
}
function trackPartnerCTA(location) {
  gaEvent("cta_click", { cta_type: "partner_form", cta_location: location });
}
function trackPricing(planName) {
  gaEvent("pricing_click", { plan_name: planName });
}

/* Scroll Depth */
(function () {
  const fired = new Set();
  window.addEventListener("scroll", function () {
    const pct = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    [25, 50, 75, 90, 100].forEach(m => {
      if (pct >= m && !fired.has(m)) { fired.add(m); gaEvent("scroll_depth", { depth: m }); }
    });
  }, { passive: true });
})();

/* Section visibility */
(function () {
  if (!window.IntersectionObserver) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) gaEvent("section_view", { section: e.target.id }); });
  }, { threshold: 0.35 });
  document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
})();

/* ═══════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════ */
function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  const isOpen = item.classList.contains("open");
  document.querySelectorAll(".faq-item.open").forEach(el => el.classList.remove("open"));
  if (!isOpen) {
    item.classList.add("open");
    gaEvent("faq_open", { question: btn.querySelector("[data-i18n]")?.textContent || "" });
  }
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE MENU
   ═══════════════════════════════════════════════════════════════ */
function openMobileMenu()  { document.getElementById("mobileMenu")?.classList.add("open"); }
function closeMobileMenu() { document.getElementById("mobileMenu")?.classList.remove("open"); }

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════════════════ */
function initReveal() {
  if (!window.IntersectionObserver) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   PARTNER LOGOS STRIP
   ═══════════════════════════════════════════════════════════════ */
function buildPartnersStrip() {
  const track = document.getElementById("partnersTrack");
  if (!track || typeof LUMI_CONFIG === "undefined") return;
  function renderPartners() {
    return LUMI_CONFIG.PARTNERS.map(p => {
      const inner = `<img src="${p.src}" alt="${p.alt}" class="partner-logo" loading="lazy" />`;
      return p.url ? `<a href="${p.url}" target="_blank" rel="noopener">${inner}</a>` : `<span>${inner}</span>`;
    }).join("");
  }
  track.innerHTML = renderPartners() + renderPartners();
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR SHADOW
   ═══════════════════════════════════════════════════════════════ */
function initNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.style.boxShadow = window.scrollY > 20 ? "0 4px 24px rgba(108,78,242,.10)" : "none";
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER LINKS  (from LUMI_CONFIG.SOCIAL)
   ═══════════════════════════════════════════════════════════════ */
function buildFooterLinks() {
  if (typeof LUMI_CONFIG === "undefined") return;
  const s = LUMI_CONFIG.SOCIAL;

  const phoneEl = document.getElementById("footer-phone");
  if (phoneEl) {
    if (s.phone) { phoneEl.href = s.phone; phoneEl.querySelector(".fc-link-text").textContent = s.phone_display; }
    else phoneEl.closest("li")?.remove();
  }

  const tgEl = document.getElementById("footer-telegram");
  if (tgEl) {
    if (s.telegram_channel) { tgEl.href = s.telegram_channel; tgEl.querySelector(".fc-link-text").textContent = s.telegram_display; }
    else tgEl.closest("li")?.remove();
  }

  const igEl = document.getElementById("footer-instagram");
  if (igEl) {
    if (s.instagram) { igEl.href = s.instagram; igEl.querySelector(".fc-link-text").textContent = s.instagram_display; }
    else igEl.closest("li")?.remove();
  }
}

/* ═══════════════════════════════════════════════════════════════
   HERO IMAGE  (from LUMI_CONFIG.HERO_IMAGE)
   NEW: fills hero photo src from config instead of being hardcoded
   ═══════════════════════════════════════════════════════════════ */
function fillHeroImage() {
  if (typeof LUMI_CONFIG === "undefined") return;
  const img = document.getElementById("heroPhoto");
  if (img && LUMI_CONFIG.HERO_IMAGE) img.src = LUMI_CONFIG.HERO_IMAGE;
}

/* ═══════════════════════════════════════════════════════════════
   HERO COIN AMOUNT  (from LUMI_CONFIG.HERO_COIN_AMOUNT)
   NEW: fills coin balance number from config (was hardcoded 150)
   ═══════════════════════════════════════════════════════════════ */
function fillCoinAmount() {
  if (typeof LUMI_CONFIG === "undefined") return;
  const el = document.getElementById("hfcCoinAmount");
  if (el && LUMI_CONFIG.HERO_COIN_AMOUNT !== undefined) {
    el.textContent = LUMI_CONFIG.HERO_COIN_AMOUNT.toLocaleString();
  }
}

/* ═══════════════════════════════════════════════════════════════
   HERO BOOKING CARDS  (from LUMI_CONFIG.HERO_BOOKINGS)
   NEW: fills 3 booking card names+times from config and current language
        (was hardcoded "Robototexnika" only in all 3 cards)
   ═══════════════════════════════════════════════════════════════ */
function buildHeroCards() {
  if (typeof LUMI_CONFIG === "undefined") return;
  const bookings = LUMI_CONFIG.HERO_BOOKINGS;
  if (!bookings || !bookings.length) return;

  bookings.forEach((b, i) => {
    const idx = i + 1; // cards are hfc-booking-1, hfc-booking-2, hfc-booking-3
    const emojiEl = document.getElementById(`hfc-b${idx}-emoji`);
    const nameEl  = document.getElementById(`hfc-b${idx}-name`);
    const timeEl  = document.getElementById(`hfc-b${idx}-time`);
    if (emojiEl) emojiEl.textContent = b.emoji;
    if (nameEl)  nameEl.textContent  = b.name[currentLang] || b.name.uz;
    if (timeEl)  timeEl.textContent  = b.time;
  });
}

/* ═══════════════════════════════════════════════════════════════
   APP SCREENSHOTS  (from LUMI_CONFIG.APP_SCREENSHOTS)
   NEW: fills partner-page step screenshot imgs from config
        (was hardcoded placeholder divs)
   ═══════════════════════════════════════════════════════════════ */
function buildAppScreenshots() {
  if (typeof LUMI_CONFIG === "undefined") return;
  const shots = LUMI_CONFIG.APP_SCREENSHOTS;
  if (!shots) return;
  shots.forEach((src, i) => {
    const el = document.getElementById(`app-screenshot-${i + 1}`);
    if (el) { el.src = src; el.style.display = "block"; }
    const ph = document.getElementById(`app-screenshot-ph-${i + 1}`);
    if (ph && src) ph.style.display = "none";
  });
}

/* ═══════════════════════════════════════════════════════════════
   PARTNER DASHBOARD CARDS  (from LUMI_CONFIG.PARTNER_DASHBOARD)
   NEW: fills partner hero floating card values from config
        (was hardcoded in HTML)
   ═══════════════════════════════════════════════════════════════ */
function buildPartnerDashboard() {
  if (typeof LUMI_CONFIG === "undefined") return;
  const d = LUMI_CONFIG.PARTNER_DASHBOARD;
  if (!d) return;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set("ppd-today",          d.today_bookings);
  set("ppd-week-pct",       "+" + d.week_bookings + "%");
  set("ppd-monday-count",   d.monday_bookings);
  set("ppd-new-clients",    "+" + d.new_clients);

  // Activity name (multilingual)
  if (d.activity) {
    const emojiEl = document.getElementById("ppd-activity-emoji");
    const nameEl  = document.getElementById("ppd-activity-name");
    if (emojiEl) emojiEl.textContent = d.activity.emoji;
    if (nameEl)  nameEl.textContent  = d.activity.name[currentLang] || d.activity.name.uz;
  }

  // Fill partners hero photo
  const heroImg = document.getElementById("partnersHeroPhoto");
  if (heroImg && LUMI_CONFIG.PARTNERS_HERO_IMAGE) heroImg.src = LUMI_CONFIG.PARTNERS_HERO_IMAGE;
}

/* ═══════════════════════════════════════════════════════════════
   PARTNER APPLICATION MODAL
   NEW: opened by "Become a Partner" button instead of linking to Telegram
   ═══════════════════════════════════════════════════════════════ */
function openPartnerModal() {
  const modal = document.getElementById("partnerModal");
  if (!modal) return;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  // Reset to form view (in case success was shown before)
  const formEl    = document.getElementById("modalForm");
  const successEl = document.getElementById("modalSuccess");
  const errorEl   = document.getElementById("modalError");
  if (formEl)    formEl.style.display = "";
  if (successEl) successEl.style.display = "none";
  if (errorEl)   errorEl.style.display = "none";
  // Clear fields
  ["f-name","f-center","f-phone","f-insta","f-tg","f-notes"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  gaEvent("partner_modal_open");
  trackPartnerCTA("modal_open");
}

function closePartnerModal() {
  const modal = document.getElementById("partnerModal");
  if (!modal) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

async function handlePartnerForm() {
  const t = T[currentLang];

  const name   = document.getElementById("f-name")?.value?.trim();
  const center = document.getElementById("f-center")?.value?.trim();
  const phone  = document.getElementById("f-phone")?.value?.trim();

  // Validate required fields
  const errorEl = document.getElementById("modalError");
  if (!name || !center || !phone) {
    if (errorEl) { errorEl.textContent = t.modal_error_req; errorEl.style.display = "block"; }
    return;
  }
  if (errorEl) errorEl.style.display = "none";

  const data = {
    name,
    center,
    phone,
    instagram : document.getElementById("f-insta")?.value?.trim() || "",
    telegram  : document.getElementById("f-tg")?.value?.trim()    || "",
    notes     : document.getElementById("f-notes")?.value?.trim() || "",
    lang      : currentLang,
    submitted_at: new Date().toISOString(),
  };

  const submitBtn = document.getElementById("modalSubmitBtn");
  if (submitBtn) submitBtn.textContent = t.modal_sending;
  if (submitBtn) submitBtn.disabled = true;

  const endpoint = (typeof LUMI_CONFIG !== "undefined") ? LUMI_CONFIG.PARTNER_FORM_ENDPOINT : "";

  if (!endpoint) {
    // No endpoint configured — fall back to Telegram
    gaEvent("partner_form_fallback_tg");
    window.open((typeof LUMI_CONFIG !== "undefined") ? LUMI_CONFIG.TELEGRAM_BOT_URL : "#", "_blank");
    if (submitBtn) { submitBtn.textContent = t.modal_submit; submitBtn.disabled = false; }
    return;
  }

  try {
    // Google Apps Script requires no-cors mode — response is opaque
    await fetch(endpoint, {
      method  : "POST",
      headers : { "Content-Type": "application/json" },
      body    : JSON.stringify(data),
      mode    : "no-cors",
    });
    // With no-cors we can't read the response; assume success
    document.getElementById("modalForm").style.display = "none";
    const successEl = document.getElementById("modalSuccess");
    if (successEl) successEl.style.display = "flex";
    gaEvent("partner_form_submit", { center_name: center });
  } catch (err) {
    // Network error — show message
    if (errorEl) { errorEl.textContent = t.modal_error_send; errorEl.style.display = "block"; }
    if (submitBtn) { submitBtn.textContent = t.modal_submit; submitBtn.disabled = false; }
  }
}

// Close modal on Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closePartnerModal();
});

/* ═══════════════════════════════════════════════════════════════
   INIT
   CHANGE: reads saved language from localStorage (page-to-page persistence)
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  // CHANGE: read saved language (default to uz)
  let savedLang = "uz";
  try { savedLang = localStorage.getItem("lumi_lang") || "uz"; } catch(e) {}
  if (!T[savedLang]) savedLang = "uz";

  setLang(savedLang);      // sets language, fills cards + dashboard
  fillHeroImage();          // NEW: fills hero photo from config
  fillCoinAmount();         // NEW: fills coin balance from config
  buildAppScreenshots();    // NEW: fills screenshot imgs from config
  initReveal();
  initNavbar();
  buildPartnersStrip();
  buildFooterLinks();

  document.getElementById("hamburgerBtn")?.addEventListener("click", openMobileMenu);
  document.getElementById("mobileClose")?.addEventListener("click",  closeMobileMenu);
});
