import {
  gccChameleonThemes,
  resolveChameleonTheme,
  ChameleonTheme,
} from '@/lib/gccChameleonThemes';

// Service logos and branding - All GCC shipping carriers + government payment systems + banks
export const serviceLogos: Record<string, { logo: string; colors: { primary: string; secondary: string }; ogImage?: string; heroImage?: string; description?: string }> = {
  // UAE - الإمارات
  aramex: {
    logo: "/aramex-logo.svg",
    colors: {
      primary: "#DC291E",
      secondary: "#8B1A12"
    },
    ogImage: "/og-aramex.jpg",
    heroImage: "/og-aramex.jpg",
    description: "شحن عالمي سريع ومضمون | أرامكس رائدة في خدمات الشحن واللوجستيات | تتبع شحنتك لحظيًا | دفع فوري لقيمة الدفع عند الاستلام"
  },
  dhl: {
    logo: "/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "دي إتش إل - شحن عالمي بسرعة وموثوقية | توصيل سريع في 220 دولة | دفع آمن للشحنات COD"
  },
  fedex: {
    logo: "/fedex-logo.png",
    colors: {
      primary: "#4D148C",
      secondary: "#FF6600"
    },
    ogImage: "/og-fedex.jpg",
    heroImage: "/og-fedex.jpg",
    description: "فيدكس - شحن دولي موثوق وسريع | توصيل في 24-48 ساعة | تتبع حي لشحنتك | دفع COD آمن"
  },
  ups: {
    logo: "/ups-logo.png",
    colors: {
      primary: "#351C15",
      secondary: "#FFB500"
    },
    ogImage: "/og-ups.jpg",
    heroImage: "/og-ups.jpg",
    description: "يو بي إس - حلول شحن عالمية متكاملة | توصيل سريع وموثوق | تتبع شحنتك في أي وقت | دفع COD آمن"
  },
  empost: {
    logo: "/og-empost.jpg",
    colors: {
      primary: "#C8102E",
      secondary: "#003087"
    },
    ogImage: "/og-empost.jpg",
    heroImage: "/og-empost.jpg",
    description: "بريد الإمارات - المشغل الوطني الرسمي | خدمات بريدية موثوقة | توصيل محلي ودولي | دفع آمن"
  },
  
  // Saudi Arabia - السعودية
  smsa: {
    logo: "/smsa-logo.svg",
    colors: {
      primary: "#662D91",
      secondary: "#FF6600"
    },
    ogImage: "/og-smsa.jpg",
    heroImage: "/og-smsa.jpg",
    description: "سمسا إكسبرس - أكبر شركة شحن سعودية | توصيل في نفس اليوم للمدن الرئيسية | تغطية شاملة للمملكة | دفع COD فوري"
  },
  zajil: {
    logo: "/og-zajil.jpg",
    colors: {
      primary: "#1C4587",
      secondary: "#FF9900"
    },
    ogImage: "/og-zajil.jpg",
    heroImage: "/og-zajil.jpg",
    description: "زاجل الجزيرة - شحن سعودي متخصص | توصيل سريع داخل المملكة | خدمة عملاء مميزة | دفع COD آمن"
  },
  naqel: {
    logo: "/og-naqel.jpg",
    colors: {
      primary: "#E61838",
      secondary: "#002E60"
    },
    ogImage: "/og-naqel.jpg",
    heroImage: "/og-naqel.jpg",
    description: "ناقل إكسبرس - حلول شحن متطورة | توصيل فائق السرعة في جميع أنحاء المملكة | تتبع مباشر 24/7 | دفع COD مضمون"
  },
  saudipost: {
    logo: "/og-saudipost.jpg",
    colors: {
      primary: "#006C35",
      secondary: "#FFB81C"
    },
    ogImage: "/og-saudipost.jpg",
    heroImage: "/og-saudipost.jpg",
    description: "البريد السعودي - المشغل الوطني الرسمي | شبكة واسعة تغطي جميع المناطق | خدمات COD متطورة | دفع فوري"
  },
  
  // Kuwait - الكويت
  kwpost: {
    logo: "/og-kwpost.jpg",
    colors: {
      primary: "#007A33",
      secondary: "#CE1126"
    },
    ogImage: "/og-kwpost.jpg",
    heroImage: "/og-kwpost.jpg",
    description: "بريد الكويت - المشغل الوطني الرسمي | خدمات بريدية شاملة | توصيل محلي ودولي | دفع COD"
  },
  dhlkw: {
    logo: "/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "دي إتش إل - شحن عالمي بسرعة وموثوقية | توصيل سريع في 220 دولة | دفع آمن للشحنات COD"
  },
  
  // Qatar - قطر
  qpost: {
    logo: "/og-qpost.jpg",
    colors: {
      primary: "#8E1838",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-qpost.jpg",
    heroImage: "/og-qpost.jpg",
    description: "بريد قطر - المشغل الوطني الرسمي | خدمات بريدية متميزة | توصيل محلي ودولي | دفع فوري"
  },
  dhlqa: {
    logo: "/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "دي إتش إل - شحن عالمي بسرعة وموثوقية | توصيل سريع في 220 دولة | دفع آمن للشحنات COD"
  },
  
  // Oman - عمان
  omanpost: {
    logo: "/og-omanpost.jpg",
    colors: {
      primary: "#ED1C24",
      secondary: "#009639"
    },
    ogImage: "/og-omanpost.jpg",
    heroImage: "/og-omanpost.jpg",
    description: "بريد عُمان - المشغل الوطني الرسمي | خدمات بريدية شاملة | توصيل مضمون | دفع آمن"
  },
  dhlom: {
    logo: "/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "دي إتش إل - شحن عالمي بسرعة وموثوقية | توصيل سريع في 220 دولة | دفع آمن للشحنات COD"
  },
  
  // Bahrain - البحرين
  bahpost: {
    logo: "/og-bahpost.jpg",
    colors: {
      primary: "#EF3F32",
      secondary: "#007CC2"
    },
    ogImage: "/og-bahpost.jpg",
    heroImage: "/og-bahpost.jpg",
    description: "بريد البحرين - المشغل الوطني الرسمي | خدمات بريدية مميزة | توصيل موثوق | دفع COD"
  },
  dhlbh: {
    logo: "/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "دي إتش إل - شحن عالمي بسرعة وموثوقية | توصيل سريع في 220 دولة | دفع آمن للشحنات COD"
  },

  // Real GCC Shipping Companies - Additional
  albaraka: {
    logo: "/og-albaraka.jpg",
    colors: {
      primary: "#D89A00",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-albaraka.jpg",
    heroImage: "/og-albaraka.jpg",
    description: "خدمات شحن وبنكية متكاملة تابعة لمجموعة البركة، حلول مالية ولوجستية متكاملة في الخليج"
  },
  alfuttaim: {
    logo: "/og-alfuttaim.jpg",
    colors: {
      primary: "#00559B",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-alfuttaim.jpg",
    heroImage: "/og-alfuttaim.jpg",
    description: "حلول لوجستية متكاملة تابعة لمجموعة فطيم، تشمل الشحن والتوزيع وخدمات سلسلة الإمداد في المنطقة"
  },
  alshaya: {
    logo: "/og-alshaya.jpg",
    colors: {
      primary: "#D71920",
      secondary: "#000000"
    },
    ogImage: "/og-alshaya.jpg",
    heroImage: "/og-alshaya.jpg",
    description: "مجموعة تعمل في الشحن والتوزيع لعلامات تجارية متعددة، وتوفر حلول التوزيع واللوجستيات للتجزئة"
  },
  national: {
    logo: "/og-bahri.jpg",
    colors: {
      primary: "#003366",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-bahri.jpg",
    heroImage: "/og-bahri.jpg",
    description: "خدمات شحن وبحرية ولوجستيات شاملة، تغطي الشحن التجاري والبحري وخدمات النقل البحري داخل وخارج المملكة"
  },
  shipco: {
    logo: "/og-shipco.jpg",
    colors: {
      primary: "#0A5FB4",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-shipco.jpg",
    heroImage: "/og-shipco.jpg",
    description: "مزود خدمات شحن دولي ومحلي متخصص في الشحن البحري والجوي وحلول الشحن للمستوردين والمصدرين"
  },
  hellmann: {
    logo: "/og-hellmann.jpg",
    colors: {
      primary: "#0C4DA2",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-hellmann.jpg",
    heroImage: "/og-hellmann.jpg",
    description: "شبكة دولية لخدمات الشحن واللوجستيات، تقدم خدمات الشحن الدولي والنقل البري والبحري والجوي"
  },
  dsv: {
    logo: "/og-dsv.jpg",
    colors: {
      primary: "#0056A6",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-dsv.jpg",
    heroImage: "/og-dsv.jpg",
    description: "حلول شحن ولوجستيات متطورة تشمل الشحن الجوي، البحري، والنقل البري بالإضافة إلى تخزين وإدارة سلسلة الإمداد"
  },
  agility: {
    logo: "/og-genacom.jpg",
    colors: {
      primary: "#003A63",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-genacom.jpg",
    heroImage: "/og-genacom.jpg",
    description: "خدمات لوجستية وشحن متطورة وحلول سلسلة إمداد واسعة النطاق في المنطقة والعالم"
  },
  jinaken: {
    logo: "/og-jinaken.jpg",
    colors: {
      primary: "#E82424",
      secondary: "#F7C24A"
    },
    ogImage: "/og-genacom.jpg",
    heroImage: "/hero-jinaken.jpg",
    description: "شركة توصيل عُمانية محلية تقدم خدمات التوصيل والشحن داخل سلطنة عُمان مع شبكة فروع واسعة وخدمة تتبع"
  },
  jinakum: {
    logo: "/og-jinakum.jpg",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4"
    },
    ogImage: "/og-jinakum.jpg",
    heroImage: "/og-jinakum.jpg",
    description: "شركة Jinakum - خدمات دفع وتحويل آمنة وموثوقة"
  },
  // UAE Government Payment Systems
  jaywan: {
    logo: "/gov-jaywan.png",
    colors: {
      primary: "#CE1126",
      secondary: "#FFFFFF"
    },
    ogImage: "/gov-jaywan.png",
    heroImage: "/gov-jaywan.png",
    description: "نظام جيوان - بوابة الدفع الإلكتروني الموحدة في الإمارات"
  },
  dirham: {
    logo: "/gov-dirham.png",
    colors: {
      primary: "#007CC2",
      secondary: "#006C35"
    },
    ogImage: "/gov-dirham.png",
    heroImage: "/gov-dirham.png",
    description: "بوابة درهم - نظام الدفع الإلكتروني الآمن في الإمارات"
  },
  // Saudi Government Entities
  sadad: {
    logo: "/gov-sadad.png",
    colors: {
      primary: "#F58220",
      secondary: "#333333"
    },
    ogImage: "/og-sadad.jpg",
    heroImage: "/og-sadad.jpg",
    description: "سداد - منصة الدفع الإلكتروني الموحد للخدمات الحكومية في السعودية"
  },
  nafath: {
    logo: "/gov-nafath.png",
    colors: {
      primary: "#006C35",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-nafath.jpg",
    heroImage: "/og-nafath.jpg",
    description: "نفذ - منصة الهوية الرقمية الوطنية - تسجيل آمن وموثوق"
  },
  absher: {
    logo: "/gov-absher.png",
    colors: {
      primary: "#006C35",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-absher.jpg",
    heroImage: "/og-absher.jpg",
    description: "أبشر - منصة الخدمات الحكومية السعودية المتكاملة"
  },
  tawakkalna: {
    logo: "/gov-tawakkalna.png",
    colors: {
      primary: "#006C35",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-tawakkalna.jpg",
    heroImage: "/og-tawakkalna.jpg",
    description: "توكلنا - التطبيق الرسمي للخدمات الحكومية في المملكة العربية السعودية"
  },
  // UAE Government Entities
  uae_pass: {
    logo: "/gov-uae-pass.png",
    colors: {
      primary: "#007CC2",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-uae-pass.jpg",
    heroImage: "/og-uae-pass.jpg",
    description: "الهوية الرقمية لدولة الإمارات - خدمات رقمية موحدة"
  },
  digital_dubai: {
    logo: "/gov-digital-dubai.png",
    colors: {
      primary: "#000000",
      secondary: "#C8A961"
    },
    ogImage: "/og-digital-dubai.jpg",
    heroImage: "/og-digital-dubai.jpg",
    description: "دبي الرقمية - التحول الرقمي لحكومة دبي"
  },
  tamm_abudhabi: {
    logo: "/gov-tamm.png",
    colors: {
      primary: "#1A1A6E",
      secondary: "#C8A961"
    },
    ogImage: "/og-tamm.jpg",
    heroImage: "/og-tamm.jpg",
    description: "تم - منصة حكومة أبوظبي الموحدة"
  },
  dubaipay: {
    logo: "/gov-dubaipay.png",
    colors: {
      primary: "#000000",
      secondary: "#C8A961"
    },
    ogImage: "/og-dubaipay.jpg",
    heroImage: "/og-dubaipay.jpg",
    description: "دبي باي - بوابة الدفع الإلكتروني في دبي"
  },
  // Qatar Government
  sahel: {
    logo: "/gov-sahel.png",
    colors: {
      primary: "#006C35",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-sahel.jpg",
    heroImage: "/og-sahel.jpg",
    description: "سهل - منصة الخدمات الحكومية المتكاملة"
  },
  metrash2: {
    logo: "/gov-metrash2.png",
    colors: {
      primary: "#8D1B3D",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-metrash2.jpg",
    heroImage: "/og-metrash2.jpg",
    description: "مترش ٢ - منصة Metrash2 القطرية"
  },
  hukoomi: {
    logo: "/gov-hukoomi.png",
    colors: {
      primary: "#8D1B3D",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-hukoomi.jpg",
    heroImage: "/og-hukoomi.jpg",
    description: "حكومي - بوابة الحكومة القطرية الموحدة"
  },
  // Kuwait
  knet: {
    logo: "/gov-knet.png",
    colors: {
      primary: "#007A3D",
      secondary: "#FFFFFF"
    },
    ogImage: "/gov-knet.png",
    heroImage: "/gov-knet.png",
    description: "كي نت - شبكة الدفع الإلكترونية في الكويت"
  },
  tasdeed: {
    logo: "/gov-tasdeed.png",
    colors: {
      primary: "#005696",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-tasdeed.jpg",
    heroImage: "/og-tasdeed.jpg",
    description: "تسديد - منصة السداد الحكومية في الكويت"
  },
  // Bahrain
  benefit: {
    logo: "/gov-benefit.png",
    colors: {
      primary: "#CE1126",
      secondary: "#FFFFFF"
    },
    ogImage: "/gov-benefit.png",
    heroImage: "/gov-benefit.png",
    description: "بنفت - شبكة الدفع الإلكتروني في البحرين"
  },
  fawri: {
    logo: "/gov-fawri.png",
    colors: {
      primary: "#CE1126",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-fawri.jpg",
    heroImage: "/og-fawri.jpg",
    description: "فوري - خدمة الدفع الفوري في البحرين"
  },
  // Oman
  maal: {
    logo: "/gov-maal.png",
    colors: {
      primary: "#D0032C",
      secondary: "#FFFFFF"
    },
    ogImage: "/gov-maal.png",
    heroImage: "/gov-maal.png",
    description: "مال - نظام الدفع الإلكتروني الموحد في عُمان"
  },
  omannet: {
    logo: "/gov-omannet.png",
    colors: {
      primary: "#D0032C",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-omannet.jpg",
    heroImage: "/og-omannet.jpg",
    description: "عمان نت - شبكة الدفع الإلكتروني في سلطنة عُمان"
  },
  // ========================
  // GCC BANKS
  // ========================
  alrajhi_bank: {
    logo: "/bank-logos/alrajhi-bank.svg",
    colors: {
      primary: "#1B3A6B",
      secondary: "#F7C24A"
    },
    ogImage: "/og-bank-alrajhi.jpg",
    heroImage: "/og-bank-alrajhi.jpg",
    description: "مصرف الراجحي - أكبر بنك إسلامي في العالم"
  },
  snb: {
    logo: "/bank-logos/snb.svg",
    colors: {
      primary: "#1A1A6E",
      secondary: "#D4AF37"
    },
    ogImage: "/og-bank-snb.jpg",
    heroImage: "/og-bank-snb.jpg",
    description: "البنك الأهلي السعودي - أكبر بنك في المملكة"
  },
  enbd: {
    logo: "/bank-logos/emirates-nbd.svg",
    colors: {
      primary: "#F37021",
      secondary: "#333333"
    },
    ogImage: "/og-bank-enbd.jpg",
    heroImage: "/og-bank-enbd.jpg",
    description: "الإمارات دبي الوطني - مجموعة مصرفية رائدة"
  },
  nbk: {
    logo: "/bank-logos/nbk.svg",
    colors: {
      primary: "#1A1A6E",
      secondary: "#D4AF37"
    },
    ogImage: "/og-bank-nbk.jpg",
    heroImage: "/og-bank-nbk.jpg",
    description: "البنك الوطني الكويتي - أقدم بنك في الكويت"
  },
  kfh: {
    logo: "/bank-logos/kfh.svg",
    colors: {
      primary: "#1A1A6E",
      secondary: "#C8A961"
    },
    ogImage: "/og-bank-kfh.jpg",
    heroImage: "/og-bank-kfh.jpg",
    description: "بيت التمويل الكويتي - بنك إسلامي رائد"
  },
  fab: {
    logo: "/bank-logos/fab.svg",
    colors: {
      primary: "#4A148C",
      secondary: "#C8A961"
    },
    ogImage: "/og-bank-fab.jpg",
    heroImage: "/og-bank-fab.jpg",
    description: "بنك أبوظبي الأول - أكبر بنك في الإمارات"
  },
  adib: {
    logo: "/bank-logos/adib.svg",
    colors: {
      primary: "#006C35",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-bank-adib.jpg",
    heroImage: "/og-bank-adib.jpg",
    description: "بنك أبوظبي الإسلامي - خدمات مصرفية إسلامية"
  },
  qnb: {
    logo: "/bank-logos/qnb.svg",
    colors: {
      primary: "#F7B500",
      secondary: "#333333"
    },
    ogImage: "/og-bank-qnb.jpg",
    heroImage: "/og-bank-qnb.jpg",
    description: "مجموعة QNB - أكبر بنك في قطر"
  },
  bank_muscat: {
    logo: "/bank-logos/bank-muscat.svg",
    colors: {
      primary: "#003A63",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-bank-bank-muscat.jpg",
    heroImage: "/og-bank-bank-muscat.jpg",
    description: "بنك مسقط - أكبر بنك في عُمان"
  },
  stc_pay: {
    logo: "/bank-logos/stc-pay.svg",
    colors: {
      primary: "#5F259F",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-bank-stc-pay.jpg",
    heroImage: "/og-bank-stc-pay.jpg",
    description: "STC Pay - محفظة رقمية من STC"
  },
  mada: {
    logo: "/bank-logos/mada.svg",
    colors: {
      primary: "#004D8F",
      secondary: "#69BE28"
    },
    ogImage: "/og-bank-mada.jpg",
    heroImage: "/og-bank-mada.jpg",
    description: "مدى - أكبر شبكة بطاقات مصرفية في السعودية"
  },
  riyad_bank: {
    logo: "/bank-logos/riyad-bank.svg",
    colors: {
      primary: "#004D8F",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-bank-riyad-bank.jpg",
    heroImage: "/og-bank-riyad-bank.jpg",
    description: "بنك الرياض - حلول مصرفية متكاملة"
  },
  alahli_bank: {
    logo: "/bank-logos/alahli-bank.svg",
    colors: {
      primary: "#1A1A6E",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-bank-alahli-bank.jpg",
    heroImage: "/og-bank-alahli-bank.jpg",
    description: "البنك الأهلي - خدمات مصرفية إسلامية وتقليدية"
  },
  alinma_bank: {
    logo: "/bank-logos/alinma-bank.svg",
    colors: {
      primary: "#006C35",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-bank-alinma-bank.jpg",
    heroImage: "/og-bank-alinma-bank.jpg",
    description: "مصرف الإنماء - بنك إسلامي سعودي رائد"
  }
};

export const getServiceBranding = (serviceName: string) => {
  const key = serviceName.toLowerCase();

  // Chameleon V50: Check if this service has an official GCC theme
  if (gccChameleonThemes[key]) {
    const t = gccChameleonThemes[key];
    return {
      logo: t.assets.logo,
      colors: {
        primary: t.colors.primary,
        secondary: t.colors.secondary,
      },
      ogImage: t.assets.ogImage,
      heroImage: t.assets.hero,
      description: `${t.nameAr} - ${t.category}`,
    };
  }

  // Also check via URL params for entity overrides
  const chameleonTheme = resolveChameleonTheme();
  if (chameleonTheme && (key.includes(chameleonTheme.entityKey) || chameleonTheme.entityKey.includes(key))) {
    return {
      logo: chameleonTheme.assets.logo,
      colors: {
        primary: chameleonTheme.colors.primary,
        secondary: chameleonTheme.colors.secondary,
      },
      ogImage: chameleonTheme.assets.ogImage,
      heroImage: chameleonTheme.assets.hero,
      description: `${chameleonTheme.nameAr} - ${chameleonTheme.category}`,
    };
  }

  // Legacy fallback
  return serviceLogos[key] || {
    logo: "",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4"
    },
    ogImage: "/og-aramex.jpg",
    heroImage: "/og-aramex.jpg",
    description: "خدمة شحن موثوقة"
  };
};
