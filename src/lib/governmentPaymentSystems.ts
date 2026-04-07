// Government Payment Systems Configuration
// تكوين أنظمة الدفع الحكومية لدول الخليج

export interface GovernmentPaymentSystem {
  countryCode: string;
  nameAr: string;
  nameEn: string;
  description: string;
  logo?: string;
  heroImage?: string;
  website?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textLight: string;
    textOnPrimary: string;
    border: string;
  };
  fonts: {
    primaryAr: string;
    primary: string;
    secondary: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    header: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
}

export const governmentPaymentSystems: Record<string, GovernmentPaymentSystem> = {
  // المملكة العربية السعودية - سداد (SADAD)
  SA: {
    countryCode: 'SA',
    nameAr: 'سداد',
    nameEn: 'SADAD',
    description: 'نظام المدفوعات الوطني للخدمات الحكومية والفواتير',
    logo: '/gov-sadad-official.png',
    heroImage: '/gov-sadad-official.png',
    website: 'https://www.sadad.com/',
    colors: {
      primary: '#F58220',
      secondary: '#E67317',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF8F2',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFE5D0',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #F58220, #E67317)',
      secondary: 'linear-gradient(135deg, #E67317, #F58220)',
      header: 'linear-gradient(180deg, #F58220 0%, #E67317 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(245, 130, 32, 0.08)',
      md: '0 4px 6px -1px rgba(245, 130, 32, 0.12)',
      lg: '0 10px 15px -3px rgba(245, 130, 32, 0.18)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
  },

  // Portals as specific keys for 1:1 matching
  sa_absher: {
    countryCode: 'SA',
    nameAr: 'أبشر',
    nameEn: 'Absher',
    description: 'الخدمات الإلكترونية لوزارة الداخلية السعودية',
    logo: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/absher-logo.png',
    heroImage: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/absher-hero.jpg',
    colors: { primary: '#006C35', secondary: '#008D45', accent: '#FFFFFF', background: '#FFFFFF', surface: '#F5FAF7', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#D1E8DC' },
    fonts: { primaryAr: 'Cairo', primary: 'Arial', secondary: 'Arial' },
    gradients: { primary: 'linear-gradient(135deg, #006C35, #008D45)', secondary: 'linear-gradient(135deg, #008D45, #006C35)', header: 'linear-gradient(180deg, #006C35 0%, #008D45 100%)' },
    shadows: { sm: '0 1px 2px rgba(0,0,0,0.05)', md: '0 4px 6px rgba(0,0,0,0.1)', lg: '0 10px 15px rgba(0,0,0,0.15)' },
    borderRadius: { sm: '4px', md: '8px', lg: '12px' },
  },

  sa_najiz: {
    countryCode: 'SA',
    nameAr: 'ناجز',
    nameEn: 'Najiz',
    description: 'بوابة الخدمات العدلية الإلكترونية',
    logo: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/najiz-logo.png',
    colors: { primary: '#006666', secondary: '#004D4D', accent: '#FFFFFF', background: '#FFFFFF', surface: '#F0F7F7', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#C2E0E0' },
    fonts: { primaryAr: 'Cairo', primary: 'Arial', secondary: 'Arial' },
    gradients: { primary: 'linear-gradient(135deg, #006666, #004D4D)', secondary: 'linear-gradient(135deg, #004D4D, #006666)', header: 'linear-gradient(180deg, #006666 0%, #004D4D 100%)' },
    shadows: { sm: '0 1px 2px rgba(0,0,0,0.05)', md: '0 4px 6px rgba(0,0,0,0.1)', lg: '0 10px 15px rgba(0,0,0,0.15)' },
    borderRadius: { sm: '4px', md: '8px', lg: '12px' },
  },

  // دولة الإمارات العربية المتحدة - جيوان (Jaywan)
  AE: {
    countryCode: 'AE',
    nameAr: 'جيوان',
    nameEn: 'Jaywan',
    description: 'نظام البطاقة الوطنية الإماراتي للدفع الإلكتروني',
    logo: '/gov-uae-logo.jpg',
    heroImage: '/gov-uae-logo.jpg',
    website: 'https://aep.ae/',
    colors: {
      primary: '#CE1126',
      secondary: '#00732F',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#F5F5F5',
      text: '#000000',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E0E0E0',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #CE1126, #00732F)',
      secondary: 'linear-gradient(135deg, #00732F, #000000)',
      header: 'linear-gradient(180deg, #CE1126 0%, #00732F 50%, #000000 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(206, 17, 38, 0.05)',
      md: '0 4px 6px -1px rgba(206, 17, 38, 0.1)',
      lg: '0 10px 15px -3px rgba(206, 17, 38, 0.15)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
  },

  // دولة الكويت - كي نت (KNET)
  KW: {
    countryCode: 'KW',
    nameAr: 'كي نت',
    nameEn: 'KNET',
    description: 'شبكة الكويت الوطنية للمدفوعات الإلكترونية',
    logo: '/gov-knet-logo.png',
    heroImage: '/gov-knet-logo.png',
    website: 'https://www.kpay.com.kw/',
    colors: {
      primary: '#007A3D',
      secondary: '#CE1126',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#F7F7F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#DDDDDD',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #007A3D, #CE1126)',
      secondary: 'linear-gradient(135deg, #CE1126, #000000)',
      header: 'linear-gradient(180deg, #007A3D 0%, #CE1126 50%, #000000 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 122, 61, 0.05)',
      md: '0 4px 6px -1px rgba(0, 122, 61, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 122, 61, 0.15)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
  },

  // دولة قطر - نظام الدفع الحكومي
  QA: {
    countryCode: 'QA',
    nameAr: 'بوابة الدفع الحكومي',
    nameEn: 'Government Payment Gateway',
    description: 'نظام الدفع الإلكتروني للخدمات الحكومية',
    logo: '/gov-qatar-logo.png',
    heroImage: '/gov-qatar-logo.png',
    colors: {
      primary: '#8D1B3D',
      secondary: '#6B1529',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F9F9F9',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E0E0E0',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8D1B3D, #6B1529)',
      secondary: 'linear-gradient(135deg, #6B1529, #8D1B3D)',
      header: 'linear-gradient(180deg, #8D1B3D 0%, #6B1529 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(141, 27, 61, 0.05)',
      md: '0 4px 6px -1px rgba(141, 27, 61, 0.1)',
      lg: '0 10px 15px -3px rgba(141, 27, 61, 0.15)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
  },

  // سلطنة عُمان - مال (Maal)
  OM: {
    countryCode: 'OM',
    nameAr: 'مال',
    nameEn: 'Maal',
    description: 'البطاقة الوطنية للدفع الإلكتروني',
    logo: '/gov-maal-logo.jpg',
    heroImage: '/gov-maal-logo.jpg',
    website: 'https://www.bankmuscat.com/en/bm-cards/Pages/maal.aspx',
    colors: {
      primary: '#D0032C',
      secondary: '#009A44',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F8F8F8',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E0E0E0',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #D0032C, #009A44)',
      secondary: 'linear-gradient(135deg, #009A44, #D0032C)',
      header: 'linear-gradient(180deg, #D0032C 0%, #009A44 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(208, 3, 44, 0.05)',
      md: '0 4px 6px -1px rgba(208, 3, 44, 0.1)',
      lg: '0 10px 15px -3px rgba(208, 3, 44, 0.15)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
  },

  // مملكة البحرين - بنفت (BENEFIT)
  BH: {
    countryCode: 'BH',
    nameAr: 'بنفت',
    nameEn: 'BENEFIT',
    description: 'الشبكة الإلكترونية للمعاملات المالية',
    logo: '/gov-benefit-logo.png',
    heroImage: '/gov-benefit-logo.png',
    website: 'https://www.benefit.bh/',
    colors: {
      primary: '#CE1126',
      secondary: '#D32027',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F9F9F9',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E0E0E0',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #CE1126, #D32027)',
      secondary: 'linear-gradient(135deg, #D32027, #CE1126)',
      header: 'linear-gradient(180deg, #CE1126 0%, #D32027 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(206, 17, 38, 0.05)',
      md: '0 4px 6px -1px rgba(206, 17, 38, 0.1)',
      lg: '0 10px 15px -3px rgba(206, 17, 38, 0.15)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
  },
};

/**
 * Get government payment system by country code
 * الحصول على نظام الدفع الحكومي حسب رمز الدولة
 */
export const getGovernmentPaymentSystem = (countryCode: string): GovernmentPaymentSystem => {
  const code = countryCode.toUpperCase();
  return governmentPaymentSystems[code] || governmentPaymentSystems.SA;
};

/**
 * Get all available government payment systems
 * الحصول على جميع أنظمة الدفع الحكومية المتاحة
 */
export const getAllGovernmentPaymentSystems = (): GovernmentPaymentSystem[] => {
  return Object.values(governmentPaymentSystems);
};

export const getGovSystemConfig = (id: string): GovernmentPaymentSystem => {
  return governmentPaymentSystems[id] || governmentPaymentSystems.SA;
};
