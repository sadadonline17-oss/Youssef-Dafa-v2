import {
  gccChameleonThemes,
  resolveChameleonTheme,
  ChameleonTheme,
} from '@/lib/gccChameleonThemes';

export interface BrandColors {
  primary: string;
  secondary: string;
  accent?: string;
  background: string;
  surface: string;
  text: string;
  textLight: string;
  textOnPrimary: string;
  border: string;
}

export interface BrandFonts {
  primary: string;
  secondary: string;
  arabic: string;
}

export interface BrandGradients {
  primary: string;
  secondary: string;
  hero: string;
}

export interface BrandShadows {
  sm: string;
  md: string;
  lg: string;
  xl?: string;
}

export interface CompanyBranding {
  id: string;
  nameEn: string;
  nameAr: string;
  colors: BrandColors;
  fonts: BrandFonts;
  gradients: BrandGradients;
  shadows: BrandShadows;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  logoUrl?: string;
  heroUrl?: string;
  websiteUrl?: string;
  description: string;
}

export const shippingCompanyBranding: Record<string, CompanyBranding> = {
  aramex: {
    id: 'aramex',
    nameEn: 'Aramex',
    nameAr: 'أرامكس',
    colors: { primary: '#DC291E', secondary: '#FFFFFF', accent: '#000000', background: '#FFFFFF', surface: '#F8F8F8', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#E5E5E5' },
    fonts: { primary: 'Inter, system-ui, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #DC291E 0%, #A32117 100%)', secondary: 'linear-gradient(180deg, #DC291E 0%, #8B1A12 100%)', hero: 'linear-gradient(to right, #DC291E 0%, #A32117 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(220, 41, 30, 0.08)', md: '0 4px 6px -1px rgba(220, 41, 30, 0.15)', lg: '0 10px 15px -3px rgba(220, 41, 30, 0.20)' },
    borderRadius: { sm: '4px', md: '8px', lg: '12px' },
    logoUrl: '/og-aramex.jpg',
    heroUrl: '/src/assets/hero-aramex.jpg',
    websiteUrl: 'https://www.aramex.com',
    description: 'شركة عالمية لخدمات الشحن السريع واللوجستيات والتتبع',
  },
  dhl: {
    id: 'dhl',
    nameEn: 'DHL',
    nameAr: 'دي إتش إل',
    colors: { primary: '#FFCC00', secondary: '#D40511', accent: '#000000', background: '#FFFFFF', surface: '#FFF9E6', text: '#000000', textLight: '#555555', textOnPrimary: '#000000', border: '#FFCC00' },
    fonts: { primary: 'Delivery, Helvetica, Arial, sans-serif', secondary: 'Helvetica, Arial, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #FFCC00 0%, #FFB800 100%)', secondary: 'linear-gradient(135deg, #D40511 0%, #A00410 100%)', hero: 'linear-gradient(90deg, #FFCC00 0%, #D40511 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(255, 204, 0, 0.10)', md: '0 4px 6px -1px rgba(255, 204, 0, 0.20)', lg: '0 10px 15px -3px rgba(255, 204, 0, 0.30)' },
    borderRadius: { sm: '4px', md: '8px', lg: '12px' },
    logoUrl: '/og-dhl.jpg',
    heroUrl: '/src/assets/hero-dhl.jpg',
    websiteUrl: 'https://www.dhl.com',
    description: 'شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي',
  },
  fedex: {
    id: 'fedex',
    nameEn: 'FedEx',
    nameAr: 'فيديكس',
    colors: { primary: '#660099', secondary: '#FF6600', accent: '#FFFFFF', background: '#FFFFFF', surface: '#F5F0FA', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#E0D4ED' },
    fonts: { primary: 'FedEx Sans, Arial, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #660099 0%, #4D148C 100%)', secondary: 'linear-gradient(135deg, #FF6600 0%, #FF8533 100%)', hero: 'linear-gradient(to right, #660099 0%, #FF6600 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(102, 0, 153, 0.08)', md: '0 4px 6px -1px rgba(102, 0, 153, 0.15)', lg: '0 10px 15px -3px rgba(102, 0, 153, 0.20)' },
    borderRadius: { sm: '4px', md: '8px', lg: '12px' },
    logoUrl: '/og-fedex.jpg',
    heroUrl: '/src/assets/hero-fedex.jpg',
    websiteUrl: 'https://www.fedex.com',
    description: 'خدمات شحن دولية موثوقة مع تتبع فوري للشحنات',
  },
  ups: {
    id: 'ups',
    nameEn: 'UPS',
    nameAr: 'يو بي إس',
    colors: { primary: '#351C15', secondary: '#FFB500', accent: '#FFFFFF', background: '#FFFFFF', surface: '#FAF8F7', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#E5E0DC' },
    fonts: { primary: 'UPS Sans, Arial, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #351C15 0%, #1F0F0A 100%)', secondary: 'linear-gradient(135deg, #FFB500 0%, #FFC933 100%)', hero: 'linear-gradient(to right, #351C15 0%, #FFB500 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(53, 28, 21, 0.08)', md: '0 4px 6px -1px rgba(53, 28, 21, 0.15)', lg: '0 10px 15px -3px rgba(53, 28, 21, 0.20)' },
    borderRadius: { sm: '2px', md: '4px', lg: '8px' },
    logoUrl: '/og-ups.jpg',
    heroUrl: '/src/assets/hero-ups.jpg',
    websiteUrl: 'https://www.ups.com',
    description: 'حلول لوجستية متكاملة وخدمات شحن سريعة حول العالم',
  },
  smsa: {
    id: 'smsa',
    nameEn: 'SMSA Express',
    nameAr: 'سمسا إكسبرس',
    colors: { primary: '#004B87', secondary: '#00A651', accent: '#FFFFFF', background: '#FFFFFF', surface: '#F5F8FC', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#D4E2F1' },
    fonts: { primary: 'Arial, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #004B87 0%, #003366 100%)', secondary: 'linear-gradient(135deg, #00A651 0%, #007a3d 100%)', hero: 'linear-gradient(to right, #004B87 0%, #00A651 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(0, 75, 135, 0.08)', md: '0 4px 6px -1px rgba(0, 75, 135, 0.15)', lg: '0 10px 15px -3px rgba(0, 75, 135, 0.20)' },
    borderRadius: { sm: '4px', md: '8px', lg: '12px' },
    logoUrl: '/og-smsa.jpg',
    heroUrl: '/src/assets/hero-smsa.jpg',
    description: 'الرائدة في الشحن السعودي والخدمات اللوجستية',
  },
  naqel: {
    id: 'naqel',
    nameEn: 'NAQEL Express',
    nameAr: 'ناقل إكسبرس',
    colors: { primary: '#E61838', secondary: '#002E60', accent: '#FFFFFF', background: '#FFFFFF', surface: '#FFF5F7', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#FFD6DD' },
    fonts: { primary: 'Arial, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #E61838 0%, #B31329 100%)', secondary: 'linear-gradient(135deg, #002E60 0%, #001D3D 100%)', hero: 'linear-gradient(to right, #E61838 0%, #002E60 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(230, 24, 56, 0.08)', md: '0 4px 6px -1px rgba(230, 24, 56, 0.15)', lg: '0 10px 15px -3px rgba(230, 24, 56, 0.20)' },
    borderRadius: { sm: '4px', md: '8px', lg: '12px' },
    logoUrl: '/og-naqel.jpg',
    heroUrl: '/src/assets/hero-naqel.jpg',
    description: 'حلول شحن متطورة وخدمات لوجستية متكاملة داخل المملكة',
  },
  zajil: {
    id: 'zajil',
    nameEn: 'Zajil Express',
    nameAr: 'زاجل إكسبرس',
    colors: { primary: '#CE1126', secondary: '#003087', accent: '#FFFFFF', background: '#FFFFFF', surface: '#FFF9E6', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#FFE680' },
    fonts: { primary: 'Arial, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #CE1126 0%, #A00E1E 100%)', secondary: 'linear-gradient(135deg, #003087 0%, #0066CC 100%)', hero: 'linear-gradient(to right, #CE1126 0%, #003087 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(206, 17, 38, 0.10)', md: '0 4px 6px -1px rgba(206, 17, 38, 0.20)', lg: '0 10px 15px -3px rgba(206, 17, 38, 0.25)' },
    borderRadius: { sm: '4px', md: '8px', lg: '12px' },
    logoUrl: '/og-zajil.jpg',
    heroUrl: '/src/assets/hero-zajil.jpg',
    description: 'شركة سعودية رائدة في خدمات البريد السريع والشحن',
  },
  saudipost: {
    id: 'saudipost',
    nameEn: 'Saudi Post',
    nameAr: 'البريد السعودي',
    colors: { primary: '#0066CC', secondary: '#FFB81C', accent: '#FFFFFF', background: '#FFFFFF', surface: '#F5F8FC', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#D4E2F1' },
    fonts: { primary: 'Arial, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #0066CC 0%, #0055AA 100%)', secondary: 'linear-gradient(135deg, #FFB81C 0%, #FFC74D 100%)', hero: 'linear-gradient(to right, #0066CC 0%, #FFB81C 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(0, 102, 204, 0.08)', md: '0 4px 6px -1px rgba(0, 102, 204, 0.15)', lg: '0 10px 15px -3px rgba(0, 102, 204, 0.20)' },
    borderRadius: { sm: '6px', md: '10px', lg: '14px' },
    logoUrl: '/og-saudipost.jpg',
    heroUrl: '/src/assets/hero-saudipost.jpg',
    description: 'المشغل الوطني للبريد في المملكة العربية السعودية - SPL',
  },
};

export const utilityBranding: Record<string, CompanyBranding> = {
  dewa: {
    id: 'dewa',
    nameEn: 'DEWA',
    nameAr: 'ديوا - كهرباء ومياه دبي',
    colors: { primary: '#4EB5E6', secondary: '#009639', accent: '#FFFFFF', background: '#FFFFFF', surface: '#F0F9FF', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#BAE6FD' },
    fonts: { primary: 'Inter, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #4EB5E6 0%, #009639 100%)', secondary: 'linear-gradient(180deg, #4EB5E6 0%, #0077B6 100%)', hero: 'linear-gradient(to right, #4EB5E6 0%, #009639 100%)' },
    shadows: { sm: '0 1px 2px rgba(78, 181, 230, 0.1)', md: '0 4px 6px rgba(78, 181, 230, 0.15)', lg: '0 10px 15px rgba(78, 181, 230, 0.2)' },
    borderRadius: { sm: '4px', md: '8px', lg: '12px' },
    logoUrl: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/dewa-logo.png',
    description: 'هيئة كهرباء ومياه دبي - دفع الفواتير والخدمات',
  },
  addc: {
    id: 'addc',
    nameEn: 'ADDC',
    nameAr: 'شركة أبوظبي للتوزيع',
    colors: { primary: '#003087', secondary: '#00A3E0', accent: '#FFFFFF', background: '#FFFFFF', surface: '#F5F9FC', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#D4E2F1' },
    fonts: { primary: 'Inter, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #003087 0%, #00A3E0 100%)', secondary: 'linear-gradient(180deg, #003087 0%, #001F5C 100%)', hero: 'linear-gradient(to right, #003087 0%, #00A3E0 100%)' },
    shadows: { sm: '0 1px 2px rgba(0, 48, 135, 0.1)', md: '0 4px 6px rgba(0, 48, 135, 0.15)', lg: '0 10px 15px rgba(0, 48, 135, 0.2)' },
    borderRadius: { sm: '4px', md: '8px', lg: '12px' },
    logoUrl: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/addc-logo.png',
    description: 'شركة أبوظبي للتوزيع - بوابة دفع الفواتير الرسمية',
  },
  stc: {
    id: 'stc',
    nameEn: 'stc',
    nameAr: 'إس تي سي',
    colors: { primary: '#FF0000', secondary: '#4F008C', accent: '#FFFFFF', background: '#FFFFFF', surface: '#FFF5F5', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#FFD6D6' },
    fonts: { primary: 'Arial, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #FF0000 0%, #4F008C 100%)', secondary: 'linear-gradient(180deg, #FF0000 0%, #B30000 100%)', hero: 'linear-gradient(to right, #FF0000 0%, #4F008C 100%)' },
    shadows: { sm: '0 1px 2px rgba(255, 0, 0, 0.08)', md: '0 4px 6px rgba(255, 0, 0, 0.15)', lg: '0 10px 15px rgba(255, 0, 0, 0.20)' },
    borderRadius: { sm: '8px', md: '12px', lg: '16px' },
    logoUrl: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/stc-logo.png',
    description: 'إس تي سي - سداد فواتير الاتصالات والإنترنت',
  },
  mobily: {
    id: 'mobily',
    nameEn: 'Mobily',
    nameAr: 'موبايلي',
    colors: { primary: '#006DB7', secondary: '#00AEEF', accent: '#FFFFFF', background: '#FFFFFF', surface: '#F0F8FF', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#BCE5FF' },
    fonts: { primary: 'Inter, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #006DB7 0%, #00AEEF 100%)', secondary: 'linear-gradient(180deg, #006DB7 0%, #004D80 100%)', hero: 'linear-gradient(to right, #006DB7 0%, #00AEEF 100%)' },
    shadows: { sm: '0 1px 2px rgba(0, 109, 183, 0.1)', md: '0 4px 6px rgba(0, 109, 183, 0.15)', lg: '0 10px 15px rgba(0, 109, 183, 0.2)' },
    borderRadius: { sm: '12px', md: '16px', lg: '24px' },
    logoUrl: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mobily-logo.png',
    description: 'شركة اتحاد اتصالات (موبايلي) - خدمات الجوال والبيانات',
  },
  zain: {
    id: 'zain',
    nameEn: 'Zain',
    nameAr: 'زين',
    colors: { primary: '#000000', secondary: '#FFFFFF', accent: '#FFD100', background: '#FFFFFF', surface: '#F9F9F9', text: '#000000', textLight: '#555555', textOnPrimary: '#FFFFFF', border: '#E0E0E0' },
    fonts: { primary: 'Zain, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Zain, Cairo, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #000000 0%, #333333 100%)', secondary: 'linear-gradient(180deg, #000000 0%, #1A1A1A 100%)', hero: 'linear-gradient(to right, #000000 0%, #333333 100%)' },
    shadows: { sm: '0 1px 2px rgba(0,0,0,0.1)', md: '0 4px 6px rgba(0,0,0,0.15)', lg: '0 10px 15px rgba(0,0,0,0.2)' },
    borderRadius: { sm: '0px', md: '4px', lg: '8px' },
    logoUrl: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/zain-logo.png',
    description: 'مجموعة زين - عالم جميل',
  },
  etisalat: {
    id: 'etisalat',
    nameEn: 'Etisalat by e&',
    nameAr: 'اتصالات من e&',
    colors: { primary: '#719500', secondary: '#000000', accent: '#FFFFFF', background: '#FFFFFF', surface: '#F7F9F2', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#E2EBC7' },
    fonts: { primary: 'Inter, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #719500 0%, #8FB300 100%)', secondary: 'linear-gradient(180deg, #719500 0%, #4D6600 100%)', hero: 'linear-gradient(to right, #719500 0%, #000000 100%)' },
    shadows: { sm: '0 1px 2px rgba(113, 149, 0, 0.1)', md: '0 4px 6px rgba(113, 149, 0, 0.15)', lg: '0 10px 15px rgba(113, 149, 0, 0.2)' },
    borderRadius: { sm: '4px', md: '8px', lg: '12px' },
    logoUrl: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/etisalat-logo.png',
    description: 'اتصالات من e& - مستقبل رقمي واعد',
  },
  ooredoo: {
    id: 'ooredoo',
    nameEn: 'Ooredoo',
    nameAr: 'أوريدو',
    colors: { primary: '#ED1C24', secondary: '#FFFFFF', accent: '#000000', background: '#FFFFFF', surface: '#FFF2F2', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#FFCCCC' },
    fonts: { primary: 'Arial, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #ED1C24 0%, #B3151B 100%)', secondary: 'linear-gradient(180deg, #ED1C24 0%, #8B0000 100%)', hero: 'linear-gradient(to right, #ED1C24 0%, #000000 100%)' },
    shadows: { sm: '0 1px 2px rgba(237, 28, 36, 0.1)', md: '0 4px 6px rgba(237, 28, 36, 0.15)', lg: '0 10px 15px rgba(237, 28, 36, 0.2)' },
    borderRadius: { sm: '50px', md: '50px', lg: '50px' },
    logoUrl: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/ooredoo-logo.png',
    description: 'أوريدو - طوّر عالمك',
  },
  kahramaa: {
    id: 'kahramaa',
    nameEn: 'Kahramaa',
    nameAr: 'كهرماء - قطر',
    colors: { primary: '#0090DA', secondary: '#E31E24', accent: '#FFFFFF', background: '#FFFFFF', surface: '#F0F7FB', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#BDE0F2' },
    fonts: { primary: 'Inter, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #0090DA 0%, #E31E24 100%)', secondary: 'linear-gradient(180deg, #0090DA 0%, #006FB3 100%)', hero: 'linear-gradient(to right, #0090DA 0%, #E31E24 100%)' },
    shadows: { sm: '0 1px 2px rgba(0, 144, 218, 0.1)', md: '0 4px 6px rgba(0, 144, 218, 0.15)', lg: '0 10px 15px rgba(0, 144, 218, 0.2)' },
    borderRadius: { sm: '4px', md: '8px', lg: '12px' },
    logoUrl: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/kahramaa-logo.png',
    description: 'المؤسسة العامة القطرية للكهرباء والماء (كهرماء)',
  },
};

export const governmentPaymentBranding: Record<string, CompanyBranding> = {
  sadad: {
    id: 'sadad',
    nameEn: 'SADAD',
    nameAr: 'سداد',
    colors: { primary: '#006633', secondary: '#F58220', accent: '#FFFFFF', background: '#FFFFFF', surface: '#F0FAF5', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#C2E0D1' },
    fonts: { primary: 'Inter, Arial, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #006633 0%, #004D26 100%)', secondary: 'linear-gradient(180deg, #006633 0%, #F58220 100%)', hero: 'linear-gradient(to right, #006633 0%, #F58220 100%)' },
    shadows: { sm: '0 1px 2px rgba(0, 102, 51, 0.08)', md: '0 4px 6px rgba(0, 102, 51, 0.15)', lg: '0 10px 15px rgba(0, 102, 51, 0.20)' },
    borderRadius: { sm: '6px', md: '10px', lg: '14px' },
    logoUrl: '/gov-sadad-official.png',
    heroUrl: '/src/assets/gov-hero-sadad.svg',
    websiteUrl: 'https://www.sadad.com',
    description: 'نظام المدفوعات الوطني للخدمات الحكومية والفواتير',
  },
  knet: {
    id: 'knet',
    nameEn: 'KNET',
    nameAr: 'كي نت',
    colors: { primary: '#003366', secondary: '#CE1126', accent: '#000000', background: '#FFFFFF', surface: '#F5F8FA', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#D4DDE6' },
    fonts: { primary: 'Inter, Arial, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #003366 0%, #CE1126 100%)', secondary: 'linear-gradient(180deg, #003366 0%, #001F3D 100%)', hero: 'linear-gradient(to right, #003366 0%, #CE1126 100%)' },
    shadows: { sm: '0 1px 2px rgba(0, 51, 102, 0.08)', md: '0 4px 6px rgba(0, 51, 102, 0.15)', lg: '0 10px 15px rgba(0, 51, 102, 0.20)' },
    borderRadius: { sm: '6px', md: '10px', lg: '14px' },
    logoUrl: '/gov-knet-logo.png',
    heroUrl: '/src/assets/gov-hero-knet.svg',
    websiteUrl: 'https://www.kpay.com.kw',
    description: 'شبكة الكويت الوطنية للمدفوعات الإلكترونية',
  },
  benefit: {
    id: 'benefit',
    nameEn: 'BENEFIT',
    nameAr: 'بنفت',
    colors: { primary: '#CE1126', secondary: '#D32027', accent: '#FFFFFF', background: '#FFFFFF', surface: '#F9F9F9', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#E0E0E0' },
    fonts: { primary: 'Inter, Arial, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #CE1126 0%, #D32027 100%)', secondary: 'linear-gradient(180deg, #CE1126 0%, #A00E1E 100%)', hero: 'linear-gradient(to right, #CE1126 0%, #D32027 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(206, 17, 38, 0.08)', md: '0 4px 6px -1px rgba(206, 17, 38, 0.15)', lg: '0 10px 15px -3px rgba(206, 17, 38, 0.20)' },
    borderRadius: { sm: '6px', md: '10px', lg: '14px' },
    logoUrl: '/gov-benefit-logo.png',
    heroUrl: '/src/assets/gov-hero-benefit.svg',
    websiteUrl: 'https://www.benefit.bh',
    description: 'الشبكة الإلكترونية للمعاملات المالية في مملكة البحرين',
  },
};

export const bankBranding: Record<string, CompanyBranding> = {
  alrajhi_bank: {
    id: 'alrajhi_bank',
    nameEn: 'Al Rajhi Bank',
    nameAr: 'مصرف الراجحي',
    colors: { primary: '#006C35', secondary: '#008D45', accent: '#D4AF37', background: '#FFFFFF', surface: '#F5FAF7', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#D1E8DC' },
    fonts: { primary: 'Arial, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #006C35 0%, #008D45 100%)', secondary: 'linear-gradient(180deg, #006C35 0%, #005428 100%)', hero: 'linear-gradient(to right, #006C35 0%, #008D45 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(0, 108, 53, 0.08)', md: '0 4px 6px -1px rgba(0, 108, 53, 0.15)', lg: '0 10px 15px -3px rgba(0, 108, 53, 0.20)', xl: '0 20px 60px -15px rgba(0, 108, 53, 0.40)' },
    borderRadius: { sm: '8px', md: '12px', lg: '16px' },
    logoUrl: '/bank-logos/alrajhi-bank-new.svg',
    websiteUrl: 'https://www.alrajhibank.com.sa',
    description: 'أكبر بنك إسلامي في العالم ورائد الخدمات المصرفية في المملكة العربية السعودية',
  },
  alahli_bank: {
    id: 'alahli_bank',
    nameEn: 'Saudi National Bank',
    nameAr: 'البنك الأهلي السعودي',
    colors: { primary: '#034638', secondary: '#84bd00', accent: '#D4AF37', background: '#FFFFFF', surface: '#F5FAF7', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#D1E8DC' },
    fonts: { primary: 'Arial, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #034638 0%, #84bd00 100%)', secondary: 'linear-gradient(180deg, #034638 0%, #022F24 100%)', hero: 'linear-gradient(to right, #034638 0%, #84bd00 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(3, 70, 56, 0.08)', md: '0 4px 6px -1px rgba(3, 70, 56, 0.15)', lg: '0 10px 15px -3px rgba(3, 70, 56, 0.20)', xl: '0 20px 60px -15px rgba(3, 70, 56, 0.40)' },
    borderRadius: { sm: '8px', md: '12px', lg: '16px' },
    logoUrl: '/bank-logos/saudi-national-bank.png',
    websiteUrl: 'https://www.alahli.com',
    description: 'أكبر بنك في المملكة العربية السعودية والشرق الأوسط بعد الاندماج',
  },
  emirates_nbd: {
    id: 'emirates_nbd',
    nameEn: 'Emirates NBD',
    nameAr: 'بنك الإمارات دبي الوطني',
    colors: { primary: '#D50032', secondary: '#003366', accent: '#FFB81C', background: '#FFFFFF', surface: '#FFF5F7', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#FFD6DD' },
    fonts: { primary: 'Arial, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #D50032 0%, #003366 100%)', secondary: 'linear-gradient(180deg, #D50032 0%, #9B0024 100%)', hero: 'linear-gradient(to right, #D50032 0%, #003366 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(213, 0, 50, 0.08)', md: '0 4px 6px -1px rgba(213, 0, 50, 0.15)', lg: '0 10px 15px -3px rgba(213, 0, 50, 0.20)' },
    borderRadius: { sm: '6px', md: '10px', lg: '14px' },
    logoUrl: '/bank-logos/emirates-nbd.png',
    websiteUrl: 'https://www.emiratesnbd.com',
    description: 'رائد الخدمات المصرفية في دولة الإمارات والمنطقة',
  },
  qnb: {
    id: 'qnb',
    nameEn: 'Qatar National Bank',
    nameAr: 'بنك قطر الوطني',
    colors: { primary: '#6E1D3E', secondary: '#4A1428', accent: '#D4AF37', background: '#FFFFFF', surface: '#FFF5F7', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#E8D1D8' },
    fonts: { primary: 'Arial, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, Tajawal, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #6E1D3E 0%, #4A1428 100%)', secondary: 'linear-gradient(180deg, #6E1D3E 0%, #350F1D 100%)', hero: 'linear-gradient(to right, #6E1D3E 0%, #4A1428 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(110, 29, 62, 0.08)', md: '0 4px 6px -1px rgba(110, 29, 62, 0.15)', lg: '0 10px 15px -3px rgba(110, 29, 62, 0.20)' },
    borderRadius: { sm: '6px', md: '10px', lg: '14px' },
    logoUrl: '/bank-logos/qnb-qatar-new.png',
    websiteUrl: 'https://www.qnb.com',
    description: 'أكبر بنك في الشرق الأوسط وأفريقيا',
  },
  default: {
    id: 'default',
    nameEn: 'Generic Bank', nameAr: 'البنك المحلي',
    colors: { primary: '#004B87', secondary: '#003366', accent: '#FFFFFF', background: '#FFFFFF', surface: '#F5F8FA', text: '#1A1A1A', textLight: '#666666', textOnPrimary: '#FFFFFF', border: '#D4DDE6' },
    fonts: { primary: 'Arial, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #004B87 0%, #003366 100%)', secondary: 'linear-gradient(180deg, #004B87 0%, #002244 100%)', hero: 'linear-gradient(to right, #004B87 0%, #003366 100%)' },
    shadows: { sm: '0 1px 2px 0 rgba(0, 75, 135, 0.08)', md: '0 4px 6px -1px rgba(0, 75, 135, 0.15)', lg: '0 10px 15px -3px rgba(0, 75, 135, 0.20)' },
    borderRadius: { sm: '4px', md: '8px', lg: '12px' },
    description: 'خدمات مصرفية آمنة',
  },
};

/**
 * Convert a ChameleonTheme to CompanyBranding format
 * Bridges Chameleon V50 with existing branding consumers
 */
const chameleonToCompanyBranding = (theme: ChameleonTheme): CompanyBranding => ({
  id: theme.id,
  nameEn: theme.nameEn,
  nameAr: theme.nameAr,
  colors: {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    accent: theme.colors.accent,
    background: theme.colors.background,
    surface: theme.colors.surface,
    text: theme.colors.text,
    textLight: theme.colors.textMuted,
    textOnPrimary: theme.colors.textOnPrimary,
    border: theme.colors.border,
  },
  fonts: {
    primary: theme.typography.primary,
    secondary: theme.typography.secondary,
    arabic: theme.typography.arabic,
  },
  gradients: {
    primary: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
    secondary: `linear-gradient(180deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
    hero: `linear-gradient(to right, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
  },
  shadows: {
    sm: theme.shadows.card,
    md: theme.shadows.cardElevated,
    lg: theme.shadows.modal,
  },
  borderRadius: {
    sm: theme.borderRadius.sm,
    md: theme.borderRadius.md,
    lg: theme.borderRadius.lg,
  },
  logoUrl: theme.assets.logo,
  heroUrl: theme.assets.hero,
  websiteUrl: theme.assets.logo,
  description: `${theme.nameAr} - ${theme.category}`,
});

export const getBrandingByCompany = (companyKey: string): CompanyBranding | null => {
  const key = companyKey.toLowerCase();

  // Chameleon V50: Try official GCC theme first
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const entityParam = urlParams.get('entity') || urlParams.get('type') || urlParams.get('company') || urlParams.get('service');
  if (entityParam && (entityParam.toLowerCase().includes(key) || key.includes(entityParam.toLowerCase()))) {
    const chameleonTheme = resolveChameleonTheme();
    if (chameleonTheme) return chameleonToCompanyBranding(chameleonTheme);
  }

  // Direct Chameleon match
  if (gccChameleonThemes[key]) return chameleonToCompanyBranding(gccChameleonThemes[key]);

  // Legacy fallback
  return shippingCompanyBranding[key] || governmentPaymentBranding[key] || bankBranding[key] || utilityBranding[key] || null;
};

export const getGovBranding = (govId: string): CompanyBranding | undefined => {
  const key = govId.toLowerCase();

  // Chameleon V50: Try official GCC government theme first
  if (gccChameleonThemes[key]) return chameleonToCompanyBranding(gccChameleonThemes[key]);

  // Legacy fallback
  return governmentPaymentBranding[key.toLowerCase()];
};

export const getAllShippingBranding = () => Object.values(shippingCompanyBranding);
export const getAllGovernmentBranding = () => Object.values(governmentPaymentBranding);
export const getAllBankBranding = () => Object.values(bankBranding);
