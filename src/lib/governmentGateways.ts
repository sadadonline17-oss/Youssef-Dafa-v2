// GCC Government Identity & Digital Gateway Systems
// Sovereign Mirror V13 - Exact Official UI Replication

export interface GovernmentGateway {
  id: string;
  nameEn: string;
  nameAr: string;
  country: 'SA' | 'AE' | 'QA' | 'KW' | 'BH' | 'OM';
  platformType: 'government' | 'bank' | 'wallet' | 'identity';
  // Official branding
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    background: string;
    surface: string;
    text: string;
    textLight: string;
    textOnPrimary: string;
    border: string;
  };
  // Typography - Official fonts
  typography: {
    primary: string;  // Official Arabic font
    secondary: string;
    weight: {
      regular: number;
      medium: number;
      bold: number;
    };
  };
  // UI Specifications - Exact mobile app dimensions
  uiSpecs: {
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    inputHeight: string;  // Official input field height
    buttonHeight: string; // Official button height
    fontSize: {
      small: string;
      base: string;
      large: string;
      xl: string;
    };
  };
  // Official assets
  assets: {
    logo: string;
    coa?: string; // Coat of Arms
    backgroundPattern?: string;
    iconSet?: string[];
  };
  // Platform-specific features
  features: {
    supportsOTP: boolean;
    supportsBiometric: boolean;
    supportsDigitalSignature: boolean;
    twoFactorMethod: 'sms' | 'app' | 'hardware';
  };
  // Official URLs
  urls: {
    officialSite: string;
    privacyPolicy?: string;
    termsOfService?: string;
  };
}

export const GOVERNMENT_GATEWAYS: Record<string, GovernmentGateway> = {
  // SAUDI ARABIA - Royals & Government Platforms
  nafath: {
    id: 'nafath',
    nameEn: 'Nafath Identity Platform',
    nameAr: 'منصة نفاذ المسار',
    country: 'SA',
    platformType: 'government',
    colors: {
      primary: '#007C3A', // Saudi official green
      secondary: '#FFFFFF',
      accent: '#FFB81C',
      background: '#F8F9FA',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    typography: {
      primary: 'Noto Sans Arabic, system-ui, sans-serif',
      secondary: 'Arial, sans-serif',
      weight: {
        regular: 400,
        medium: 500,
        bold: 700,
      },
    },
    uiSpecs: {
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      inputHeight: '56px', // Official mobile input height
      buttonHeight: '52px', // Official mobile button height
      fontSize: {
        small: '14px',
        base: '16px',
        large: '18px',
        xl: '20px',
      },
    },
    assets: {
      logo: '/assets/gov-coats-of-arms/saudi-coat-of-arms.svg',
      coa: '/assets/gov-coats-of-arms/saudi-coat-of-arms.svg',
      backgroundPattern: '/assets/gov-patterns/saudi-pattern.svg',
    },
    features: {
      supportsOTP: true,
      supportsBiometric: true,
      supportsDigitalSignature: true,
      twoFactorMethod: 'app',
    },
    urls: {
      officialSite: 'https://nafath.gov.sa',
      privacyPolicy: 'https://nafath.gov.sa/privacy',
      termsOfService: 'https://nafath.gov.sa/terms',
    },
  },

  absher: {
    id: 'absher',
    nameEn: 'Absher Digital Platform',
    nameAr: 'منصة أبشر الإلكترونية',
    country: 'SA',
    platformType: 'government',
    colors: {
      primary: '#1E3A8A', // Saudi police blue
      secondary: '#FFFFFF',
      accent: '#DC2626',
      background: '#F8F9FA',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    typography: {
      primary: 'Noto Sans Arabic, system-ui, sans-serif',
      secondary: 'Arial, sans-serif',
      weight: {
        regular: 400,
        medium: 500,
        bold: 700,
      },
    },
    uiSpecs: {
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      inputHeight: '48px',
      buttonHeight: '48px',
      fontSize: {
        small: '13px',
        base: '15px',
        large: '17px',
        xl: '19px',
      },
    },
    assets: {
      logo: '/assets/gov-logos/absher-logo.svg',
      coa: '/assets/gov-coats-of-arms/saudi-police-coat.svg',
    },
    features: {
      supportsOTP: true,
      supportsBiometric: true,
      supportsDigitalSignature: false,
      twoFactorMethod: 'sms',
    },
    urls: {
      officialSite: 'https://absher.sa',
    },
  },

  tawakkalna: {
    id: 'tawakkalna',
    nameEn: 'Tawakkalna Services',
    nameAr: 'خدمات توكلنا',
    country: 'SA',
    platformType: 'government',
    colors: {
      primary: '#00A651', // Health green
      secondary: '#FFFFFF',
      accent: '#007A3D',
      background: '#F0FDF4',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#BBF7D0',
    },
    typography: {
      primary: 'Noto Sans Arabic, system-ui, sans-serif',
      secondary: 'Arial, sans-serif',
      weight: {
        regular: 400,
        medium: 500,
        bold: 600,
      },
    },
    uiSpecs: {
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
      spacing: {
        xs: '8px',
        sm: '12px',
        md: '20px',
        lg: '28px',
        xl: '36px',
      },
      inputHeight: '60px',
      buttonHeight: '56px',
      fontSize: {
        small: '15px',
        base: '17px',
        large: '19px',
        xl: '21px',
      },
    },
    assets: {
      logo: '/assets/gov-logos/tawakkalna-logo.svg',
      coa: '/assets/gov-coats-of-arms/saudi-health-ministry.svg',
    },
    features: {
      supportsOTP: true,
      supportsBiometric: true,
      supportsDigitalSignature: false,
      twoFactorMethod: 'sms',
    },
    urls: {
      officialSite: 'https://tawakkalna.sa',
    },
  },

  // UAE - Emirates Government Platforms
  uaepass: {
    id: 'uaepass',
    nameEn: 'UAE Pass Digital Identity',
    nameAr: 'هوية الإمارات الرقمية',
    country: 'AE',
    platformType: 'identity',
    colors: {
      primary: '#000000', // UAE official black
      secondary: '#FFFFFF',
      accent: '#C8102E',
      background: '#F8F8F8',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E5E5',
    },
    typography: {
      primary: 'Noto Sans Arabic, Segoe UI, system-ui, sans-serif',
      secondary: 'Arial, sans-serif',
      weight: {
        regular: 400,
        medium: 500,
        bold: 700,
      },
    },
    uiSpecs: {
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '10px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
      inputHeight: '50px',
      buttonHeight: '48px',
      fontSize: {
        small: '14px',
        base: '16px',
        large: '18px',
        xl: '20px',
      },
    },
    assets: {
      logo: '/assets/gov-logos/uaepass-logo.svg',
      coa: '/assets/gov-coats-of-arms/uae-coat-of-arms.svg',
    },
    features: {
      supportsOTP: true,
      supportsBiometric: true,
      supportsDigitalSignature: true,
      twoFactorMethod: 'app',
    },
    urls: {
      officialSite: 'https://uaepass.ae',
      privacyPolicy: 'https://uaepass.ae/privacy',
    },
  },

  dubainow: {
    id: 'dubainow',
    nameEn: 'Dubai Now Application',
    nameAr: 'تطبيق دبي الآن',
    country: 'AE',
    platformType: 'government',
    colors: {
      primary: '#007A3D', // Dubai green
      secondary: '#FFFFFF',
      accent: '#CE1126',
      background: '#F8F9FA',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    typography: {
      primary: 'Noto Sans Arabic, Segoe UI, system-ui, sans-serif',
      secondary: 'Arial, sans-serif',
      weight: {
        regular: 400,
        medium: 500,
        bold: 600,
      },
    },
    uiSpecs: {
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      inputHeight: '56px',
      buttonHeight: '54px',
      fontSize: {
        small: '15px',
        base: '17px',
        large: '19px',
        xl: '21px',
      },
    },
    assets: {
      logo: '/assets/gov-logos/dubai-now-logo.svg',
      coa: '/assets/gov-coats-of-arms/dubai-government.svg',
    },
    features: {
      supportsOTP: true,
      supportsBiometric: true,
      supportsDigitalSignature: false,
      twoFactorMethod: 'sms',
    },
    urls: {
      officialSite: 'https://dubainow.gov.ae',
    },
  },

  // QATAR - Government Platforms
  metrash2: {
    id: 'metrash2',
    nameEn: 'Metrash2 Secure Portal',
    nameAr: 'بوابة متراش2 الآمنة',
    country: 'QA',
    platformType: 'government',
    colors: {
      primary: '#8E1838', // Qatar maroon
      secondary: '#FFFFFF',
      accent: '#F9D416',
      background: '#F8F8F8',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E5E5',
    },
    typography: {
      primary: 'Noto Sans Arabic, Segoe UI, system-ui, sans-serif',
      secondary: 'Arial, sans-serif',
      weight: {
        regular: 400,
        medium: 500,
        bold: 700,
      },
    },
    uiSpecs: {
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
      inputHeight: '48px',
      buttonHeight: '46px',
      fontSize: {
        small: '14px',
        base: '16px',
        large: '18px',
        xl: '20px',
      },
    },
    assets: {
      logo: '/assets/gov-logos/metrash2-logo.svg',
      coa: '/assets/gov-coats-of-arms/qatar-coat-of-arms.svg',
    },
    features: {
      supportsOTP: true,
      supportsBiometric: false,
      supportsDigitalSignature: true,
      twoFactorMethod: 'sms',
    },
    urls: {
      officialSite: 'https://metrash2.gov.qa',
    },
  },

  // KUWAIT - Government Platforms
  sahel: {
    id: 'sahel',
    nameEn: 'Sahel Government App',
    nameAr: 'تطبيق سهل الحكومي',
    country: 'KW',
    platformType: 'government',
    colors: {
      primary: '#007A33', // Kuwait green
      secondary: '#FFFFFF',
      accent: '#CE1126',
      background: '#F8F9FA',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    typography: {
      primary: 'Noto Sans Arabic, Segoe UI, system-ui, sans-serif',
      secondary: 'Arial, sans-serif',
      weight: {
        regular: 400,
        medium: 500,
        bold: 700,
      },
    },
    uiSpecs: {
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '18px',
      },
      spacing: {
        xs: '6px',
        sm: '10px',
        md: '14px',
        lg: '20px',
        xl: '28px',
      },
      inputHeight: '52px',
      buttonHeight: '50px',
      fontSize: {
        small: '14px',
        base: '16px',
        large: '18px',
        xl: '20px',
      },
    },
    assets: {
      logo: '/assets/gov-logos/sahel-logo.svg',
      coa: '/assets/gov-coats-of-arms/kuwait-coat-of-arms.svg',
    },
    features: {
      supportsOTP: true,
      supportsBiometric: true,
      supportsDigitalSignature: false,
      twoFactorMethod: 'app',
    },
    urls: {
      officialSite: 'https://sahel.gov.kw',
    },
  },

  // BAHRAIN - Government Platforms
  benefitpay: {
    id: 'benefitpay',
    nameEn: 'BenefitPay Digital Wallet',
    nameAr: 'محفظة بنفت الرقمية',
    country: 'BH',
    platformType: 'wallet',
    colors: {
      primary: '#CE1126', // Benefit red
      secondary: '#FFFFFF',
      accent: '#007CC2',
      background: '#F8F8F8',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E5E5',
    },
    typography: {
      primary: 'Noto Sans Arabic, Segoe UI, system-ui, sans-serif',
      secondary: 'Arial, sans-serif',
      weight: {
        regular: 400,
        medium: 500,
        bold: 600,
      },
    },
    uiSpecs: {
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
      spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      inputHeight: '58px',
      buttonHeight: '56px',
      fontSize: {
        small: '15px',
        base: '17px',
        large: '19px',
        xl: '21px',
      },
    },
    assets: {
      logo: '/assets/gov-logos/benefitpay-logo.svg',
      coa: '/assets/gov-coats-of-arms/bahrain-coat-of-arms.svg',
    },
    features: {
      supportsOTP: true,
      supportsBiometric: true,
      supportsDigitalSignature: false,
      twoFactorMethod: 'sms',
    },
    urls: {
      officialSite: 'https://benefit.bh',
    },
  },

  // OMAN - Government Platforms
  omanpass: {
    id: 'omanpass',
    nameEn: 'OmanPass Digital Identity',
    nameAr: 'هوية عمان الرقمية',
    country: 'OM',
    platformType: 'identity',
    colors: {
      primary: '#ED1C24', // Oman red
      secondary: '#FFFFFF',
      accent: '#009639',
      background: '#F8F9FA',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    typography: {
      primary: 'Noto Sans Arabic, Segoe UI, system-ui, sans-serif',
      secondary: 'Arial, sans-serif',
      weight: {
        regular: 400,
        medium: 500,
        bold: 700,
      },
    },
    uiSpecs: {
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
      inputHeight: '50px',
      buttonHeight: '48px',
      fontSize: {
        small: '14px',
        base: '16px',
        large: '18px',
        xl: '20px',
      },
    },
    assets: {
      logo: '/assets/gov-logos/omanpass-logo.svg',
      coa: '/assets/gov-coats-of-arms/oman-coat-of-arms.svg',
    },
    features: {
      supportsOTP: true,
      supportsBiometric: true,
      supportsDigitalSignature: true,
      twoFactorMethod: 'sms',
    },
    urls: {
      officialSite: 'https://omanpass.gov.om',
    },
  },
};

// Helper function to get government gateway by ID
export const getGovernmentGateway = (gatewayId: string): GovernmentGateway | undefined => {
  return GOVERNMENT_GATEWAYS[gatewayId];
};

// Get all gateways by country
export const getGatewaysByCountry = (countryCode: string): GovernmentGateway[] => {
  return Object.values(GOVERNMENT_GATEWAYS).filter(
    (gw) => gw.country === countryCode
  );
};

// Get all sovereign platforms (government + major banks)
export const getSovereignPlatforms = (countryCode: string): Array<GovernmentGateway & { type: 'government' | 'bank' }> => {
  const govGateways = getGatewaysByCountry(countryCode).map(gw => ({ ...gw, type: 'government' as const }));
  
  // Add major national banks for that country
  const nationalBanks = getBanksByCountry(countryCode)
    .filter(bank => isNationalBank(bank.id))
    .map(bank => createBankAsGovernmentPlatform(bank, countryCode));
  
  return [...govGateways, ...nationalBanks];
};

// Helper to identify national/systemically important banks
const isNationalBank = (bankId: string): boolean => {
  const nationalBanks = [
    'alrajhi_bank',    // KSA - Al Rajhi
    'alahli_bank',     // KSA - Saudi National Bank
    'nbk',             // Kuwait - National Bank of Kuwait
    'qnb',             // Qatar - Qatar National Bank
    'emirates_nbd',    // UAE - Emirates NBD
    'fab',             // UAE - First Abu Dhabi Bank
    'nbb',             // Bahrain - National Bank of Bahrain
    'bank_muscat',     // Oman - Bank Muscat
  ];
  return nationalBanks.includes(bankId);
};

// Convert bank data to government platform format
const createBankAsGovernmentPlatform = (bank: any, countryCode: string): any => {
  return {
    id: `bank_${bank.id}`,
    nameEn: bank.name,
    nameAr: bank.nameAr,
    country: countryCode as any,
    platformType: 'bank' as const,
    type: 'bank' as const,
    colors: {
      primary: bank.color,
      secondary: '#FFFFFF',
      accent: bank.color,
      background: '#FFFFFF',
      surface: '#F8F8F8',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E5E5',
    },
    typography: {
      primary: 'Noto Sans Arabic, system-ui, sans-serif',
      secondary: 'Arial, sans-serif',
      weight: {
        regular: 400,
        medium: 500,
        bold: 700,
      },
    },
    uiSpecs: {
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      inputHeight: '52px',
      buttonHeight: '50px',
      fontSize: {
        small: '14px',
        base: '16px',
        large: '18px',
        xl: '20px',
      },
    },
    assets: {
      logo: bank.logo || '/assets/bank-logos/default-bank.svg',
    },
    features: {
      supportsOTP: true,
      supportsBiometric: true,
      supportsDigitalSignature: false,
      twoFactorMethod: 'sms',
    },
    urls: {
      officialSite: '#',
    },
  };
};