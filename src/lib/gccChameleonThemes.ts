/**
 * GCC Chameleon Theme System — 1:1 Pixel-Perfect Identity Sync
 * 
 * STRICT NON-INVASIVE: Only CSS/DOM visual injection. Zero logic modification.
 * All HEX codes, shadows, border-radius, and typography mirror official
 * GCC production apps (Nafath, SADAD, KNET, UAE Pass, BenefitPay, etc.)
 * 
 * Commit Lock: fd3b9de — Logic FROZEN. Visuals only.
 */

export interface ChameleonTheme {
  id: string;
  entityKey: string;
  nameEn: string;
  nameAr: string;
  country: string;
  category: 'government' | 'billing' | 'bank' | 'shipping' | 'utility';

  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    textOnPrimary: string;
    border: string;
    inputBorder: string;
    inputFocusRing: string;
    success: string;
    error: string;
    warning: string;
  };

  shadows: {
    card: string;
    cardElevated: string;
    button: string;
    buttonHover: string;
    input: string;
    header: string;
    modal: string;
  };

  borderRadius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
    button: string;
    card: string;
    input: string;
  };

  typography: {
    primary: string;
    secondary: string;
    arabic: string;
    numeric: string;
    sizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    weights: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
      black: number;
    };
  };

  spacing: {
    fieldPadding: string;
    cardPadding: string;
    sectionGap: string;
    buttonHeight: string;
    headerHeight: string;
  };

  assets: {
    logo: string;
    logoSvg?: string;
    hero?: string;
    coatOfArms?: string;
    favicon?: string;
    ogImage: string;
  };

  /** CSS class to inject on <body> for entity-specific overrides */
  bodyClass: string;

  /** Global payment icons to hide for this entity */
  hideGlobalIcons: string[];
}

// ──────────────────────────────────────────────
// SAUDI ARABIA — Government & Billing
// ──────────────────────────────────────────────

export const sadadSA: ChameleonTheme = {
  id: 'sadad_sa',
  entityKey: 'sadad',
  nameEn: 'SADAD',
  nameAr: 'سداد',
  country: 'SA',
  category: 'billing',
  colors: {
    primary: '#006633',
    secondary: '#F58220',
    accent: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#F0FAF5',
    surfaceAlt: '#E8F5EE',
    text: '#1A1A1A',
    textMuted: '#6B7280',
    textOnPrimary: '#FFFFFF',
    border: '#C2E0D1',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(0, 102, 51, 0.20)',
    success: '#006633',
    error: '#DC2626',
    warning: '#F58220',
  },
  shadows: {
    card: '0 1px 3px rgba(0, 102, 51, 0.08), 0 1px 2px rgba(0, 102, 51, 0.06)',
    cardElevated: '0 10px 25px -3px rgba(0, 102, 51, 0.15), 0 4px 6px -2px rgba(0, 102, 51, 0.08)',
    button: '0 4px 14px -2px rgba(0, 102, 51, 0.30)',
    buttonHover: '0 6px 20px -2px rgba(0, 102, 51, 0.40)',
    input: '0 1px 2px rgba(0, 102, 51, 0.06)',
    header: '0 2px 8px rgba(0, 102, 51, 0.08)',
    modal: '0 25px 50px -12px rgba(0, 102, 51, 0.25)',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    button: '10px',
    card: '12px',
    input: '8px',
  },
  typography: {
    primary: "'DIN Next Arabic', 'DIN Next', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'DIN Next Arabic', 'Tajawal', sans-serif",
    numeric: "'DIN Next', 'DIN Next Arabic', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '52px',
    headerHeight: '64px',
  },
  assets: {
    logo: '/gov-sadad-official.png',
    logoSvg: '/assets/mirrors/gov/sadad-logo.svg',
    hero: '/src/assets/gov-hero-sadad.svg',
    coatOfArms: '/assets/mirrors/coats-of-arms/saudi-coat.svg',
    ogImage: '/og-sadad.jpg',
  },
  bodyClass: 'entity-sadad-sa',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

export const nafathSA: ChameleonTheme = {
  id: 'nafath_sa',
  entityKey: 'nafath',
  nameEn: 'Nafath',
  nameAr: 'نفاذ',
  country: 'SA',
  category: 'government',
  colors: {
    primary: '#006C35',
    secondary: '#00A650',
    accent: '#D4AF37',
    background: '#F8FAF7',
    surface: '#FFFFFF',
    surfaceAlt: '#F0F7F2',
    text: '#1C2526',
    textMuted: '#4A5568',
    textOnPrimary: '#FFFFFF',
    border: '#D1E8DC',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(0, 108, 53, 0.20)',
    success: '#006C35',
    error: '#DC2626',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(0, 108, 53, 0.08), 0 1px 2px rgba(0, 108, 53, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(0, 108, 53, 0.12), 0 4px 6px -2px rgba(0, 108, 53, 0.06)',
    button: '0 3px 12px -2px rgba(0, 108, 53, 0.25)',
    buttonHover: '0 6px 16px -2px rgba(0, 108, 53, 0.35)',
    input: '0 1px 2px rgba(0, 108, 53, 0.04)',
    header: '0 2px 8px rgba(0, 108, 53, 0.06)',
    modal: '0 25px 50px -12px rgba(0, 108, 53, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    button: '8px',
    card: '12px',
    input: '8px',
  },
  typography: {
    primary: "'Taysir Arabic', 'Taysir', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'Taysir Arabic', 'Tajawal', sans-serif",
    numeric: "'Taysir', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '52px',
    headerHeight: '68px',
  },
  assets: {
    logo: '/gov-nafath.png',
    logoSvg: '/assets/mirrors/gov/nafath-logo.svg',
    hero: '/src/assets/gov-hero-nafath.svg',
    coatOfArms: '/assets/mirrors/coats-of-arms/saudi-coat.svg',
    ogImage: '/og-nafath.jpg',
  },
  bodyClass: 'entity-nafath-sa',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

export const absherSA: ChameleonTheme = {
  id: 'absher_sa',
  entityKey: 'absher',
  nameEn: 'Absher',
  nameAr: 'أبشر',
  country: 'SA',
  category: 'government',
  colors: {
    primary: '#004B87',
    secondary: '#00A651',
    accent: '#FFFFFF',
    background: '#F5F8FC',
    surface: '#FFFFFF',
    surfaceAlt: '#EDF2F9',
    text: '#1C2526',
    textMuted: '#4A5568',
    textOnPrimary: '#FFFFFF',
    border: '#D4E2F1',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(0, 75, 135, 0.20)',
    success: '#00A651',
    error: '#DC2626',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(0, 75, 135, 0.08), 0 1px 2px rgba(0, 75, 135, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(0, 75, 135, 0.12), 0 4px 6px -2px rgba(0, 75, 135, 0.06)',
    button: '0 4px 14px -2px rgba(0, 75, 135, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(0, 75, 135, 0.35)',
    input: '0 1px 2px rgba(0, 75, 135, 0.04)',
    header: '0 2px 8px rgba(0, 75, 135, 0.06)',
    modal: '0 25px 50px -12px rgba(0, 75, 135, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    button: '10px',
    card: '12px',
    input: '8px',
  },
  typography: {
    primary: "'DIN Next Arabic', 'DIN Next', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'DIN Next Arabic', 'Tajawal', sans-serif",
    numeric: "'DIN Next', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '52px',
    headerHeight: '64px',
  },
  assets: {
    logo: '/gov-absher.png',
    logoSvg: '/assets/mirrors/gov/absher-logo.svg',
    coatOfArms: '/assets/mirrors/coats-of-arms/saudi-coat.svg',
    ogImage: '/og-absher.jpg',
  },
  bodyClass: 'entity-absher-sa',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

export const stcPaySA: ChameleonTheme = {
  id: 'stc_pay_sa',
  entityKey: 'stc_pay',
  nameEn: 'STC Pay',
  nameAr: 'إس تي سي باي',
  country: 'SA',
  category: 'billing',
  colors: {
    primary: '#4F008C',
    secondary: '#FF0000',
    accent: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#FAF5FF',
    surfaceAlt: '#F3E8FF',
    text: '#1A1A1A',
    textMuted: '#6B7280',
    textOnPrimary: '#FFFFFF',
    border: '#E9D5FF',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(79, 0, 140, 0.20)',
    success: '#00A651',
    error: '#DC2626',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(79, 0, 140, 0.08), 0 1px 2px rgba(79, 0, 140, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(79, 0, 140, 0.12), 0 4px 6px -2px rgba(79, 0, 140, 0.06)',
    button: '0 4px 14px -2px rgba(79, 0, 140, 0.28)',
    buttonHover: '0 6px 18px -2px rgba(79, 0, 140, 0.38)',
    input: '0 1px 2px rgba(79, 0, 140, 0.04)',
    header: '0 2px 8px rgba(79, 0, 140, 0.06)',
    modal: '0 25px 50px -12px rgba(79, 0, 140, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
    button: '12px',
    card: '16px',
    input: '10px',
  },
  typography: {
    primary: "'DIN Next Arabic', 'Tajawal', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'DIN Next Arabic', 'Tajawal', sans-serif",
    numeric: "'DIN Next', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '54px',
    headerHeight: '64px',
  },
  assets: {
    logo: '/assets/mirrors/gov/stc-pay-logo.svg',
    ogImage: '/og-stc-pay.jpg',
  },
  bodyClass: 'entity-stc-pay-sa',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

export const madaSA: ChameleonTheme = {
  id: 'mada_sa',
  entityKey: 'mada',
  nameEn: 'mada',
  nameAr: 'مدى',
  country: 'SA',
  category: 'bank',
  colors: {
    primary: '#004B87',
    secondary: '#00A651',
    accent: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#F5F8FC',
    surfaceAlt: '#EDF2F9',
    text: '#1A1A1A',
    textMuted: '#6B7280',
    textOnPrimary: '#FFFFFF',
    border: '#D4E2F1',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(0, 75, 135, 0.20)',
    success: '#00A651',
    error: '#DC2626',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(0, 75, 135, 0.08), 0 1px 2px rgba(0, 75, 135, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(0, 75, 135, 0.12), 0 4px 6px -2px rgba(0, 75, 135, 0.06)',
    button: '0 4px 14px -2px rgba(0, 75, 135, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(0, 75, 135, 0.35)',
    input: '0 1px 2px rgba(0, 75, 135, 0.04)',
    header: '0 2px 8px rgba(0, 75, 135, 0.06)',
    modal: '0 25px 50px -12px rgba(0, 75, 135, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    button: '10px',
    card: '12px',
    input: '8px',
  },
  typography: {
    primary: "'DIN Next Arabic', 'DIN Next', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'DIN Next Arabic', 'Tajawal', sans-serif",
    numeric: "'DIN Next', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '52px',
    headerHeight: '64px',
  },
  assets: {
    logo: '/assets/mirrors/bank/mada-logo.svg',
    ogImage: '/og-mada.jpg',
  },
  bodyClass: 'entity-mada-sa',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

// ──────────────────────────────────────────────
// KUWAIT — Government & Billing
// ──────────────────────────────────────────────

export const knetKW: ChameleonTheme = {
  id: 'knet_kw',
  entityKey: 'knet',
  nameEn: 'KNET',
  nameAr: 'كي نت',
  country: 'KW',
  category: 'billing',
  colors: {
    primary: '#003366',
    secondary: '#CE1126',
    accent: '#000000',
    background: '#FFFFFF',
    surface: '#F5F8FA',
    surfaceAlt: '#EDF2F7',
    text: '#1A1A1A',
    textMuted: '#4A5568',
    textOnPrimary: '#FFFFFF',
    border: '#D4DDE6',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(0, 51, 102, 0.20)',
    success: '#00A651',
    error: '#CE1126',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(0, 51, 102, 0.08), 0 1px 2px rgba(0, 51, 102, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(0, 51, 102, 0.12), 0 4px 6px -2px rgba(0, 51, 102, 0.06)',
    button: '0 4px 14px -2px rgba(0, 51, 102, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(0, 51, 102, 0.35)',
    input: '0 1px 2px rgba(0, 51, 102, 0.04)',
    header: '0 2px 8px rgba(0, 51, 102, 0.06)',
    modal: '0 25px 50px -12px rgba(0, 51, 102, 0.20)',
  },
  borderRadius: {
    xs: '3px',
    sm: '5px',
    md: '8px',
    lg: '10px',
    xl: '14px',
    full: '9999px',
    button: '6px',
    card: '10px',
    input: '8px',
  },
  typography: {
    primary: "'Kuwait Standard', 'DIN Next Arabic', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'Kuwait Standard', 'Tajawal', sans-serif",
    numeric: "'Kuwait Standard', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '54px',
    headerHeight: '70px',
  },
  assets: {
    logo: '/gov-knet-logo.png',
    logoSvg: '/assets/mirrors/gov/knet-logo.svg',
    hero: '/src/assets/gov-hero-knet.svg',
    coatOfArms: '/assets/mirrors/coats-of-arms/kuwait-coat.svg',
    ogImage: '/og-knet.jpg',
  },
  bodyClass: 'entity-knet-kw',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

export const tasdeedKW: ChameleonTheme = {
  id: 'tasdeed_kw',
  entityKey: 'tasdeed',
  nameEn: 'Tasdeed',
  nameAr: 'تسديد',
  country: 'KW',
  category: 'billing',
  colors: {
    primary: '#003087',
    secondary: '#00A3E0',
    accent: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#F5F9FC',
    surfaceAlt: '#E8F4FD',
    text: '#1A1A1A',
    textMuted: '#4A5568',
    textOnPrimary: '#FFFFFF',
    border: '#D4E2F1',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(0, 48, 135, 0.20)',
    success: '#00A651',
    error: '#CE1126',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(0, 48, 135, 0.08), 0 1px 2px rgba(0, 48, 135, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(0, 48, 135, 0.12), 0 4px 6px -2px rgba(0, 48, 135, 0.06)',
    button: '0 4px 14px -2px rgba(0, 48, 135, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(0, 48, 135, 0.35)',
    input: '0 1px 2px rgba(0, 48, 135, 0.04)',
    header: '0 2px 8px rgba(0, 48, 135, 0.06)',
    modal: '0 25px 50px -12px rgba(0, 48, 135, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    button: '8px',
    card: '12px',
    input: '8px',
  },
  typography: {
    primary: "'Kuwait Standard', 'DIN Next Arabic', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'Kuwait Standard', 'Tajawal', sans-serif",
    numeric: "'Kuwait Standard', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '52px',
    headerHeight: '64px',
  },
  assets: {
    logo: '/assets/mirrors/gov/tasdeed-logo.svg',
    coatOfArms: '/assets/mirrors/coats-of-arms/kuwait-coat.svg',
    ogImage: '/og-tasdeed.jpg',
  },
  bodyClass: 'entity-tasdeed-kw',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

// ──────────────────────────────────────────────
// UAE — Government & Billing
// ──────────────────────────────────────────────

export const uaePassAE: ChameleonTheme = {
  id: 'uae_pass_ae',
  entityKey: 'uae_pass',
  nameEn: 'UAE Pass',
  nameAr: 'UAE Pass',
  country: 'AE',
  category: 'government',
  colors: {
    primary: '#1A1A1A',
    secondary: '#C19B64',
    accent: '#FFFFFF',
    background: '#FAF9F6',
    surface: '#FFFFFF',
    surfaceAlt: '#F5F3EF',
    text: '#1A1A1A',
    textMuted: '#555555',
    textOnPrimary: '#FFFFFF',
    border: '#E5E0D5',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(193, 155, 100, 0.20)',
    success: '#00A651',
    error: '#DC2626',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(26, 26, 26, 0.06), 0 1px 2px rgba(26, 26, 26, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(26, 26, 26, 0.10), 0 4px 6px -2px rgba(26, 26, 26, 0.04)',
    button: '0 4px 18px -2px rgba(193, 155, 100, 0.22)',
    buttonHover: '0 6px 22px -2px rgba(193, 155, 100, 0.32)',
    input: '0 1px 2px rgba(26, 26, 26, 0.04)',
    header: '0 2px 8px rgba(26, 26, 26, 0.06)',
    modal: '0 25px 50px -12px rgba(26, 26, 26, 0.18)',
  },
  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
    button: '20px',
    card: '16px',
    input: '12px',
  },
  typography: {
    primary: "'Dubai Font', 'Dubai Regular', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'Dubai Font', 'Tajawal', sans-serif",
    numeric: "'Dubai Font', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '16px 18px',
    cardPadding: '28px',
    sectionGap: '24px',
    buttonHeight: '56px',
    headerHeight: '72px',
  },
  assets: {
    logo: '/gov-uae-pass.png',
    logoSvg: '/assets/mirrors/gov/uae-pass-logo.svg',
    hero: '/src/assets/gov-hero-uae.svg',
    coatOfArms: '/assets/mirrors/coats-of-arms/uae-coat.svg',
    ogImage: '/og-uae-pass.jpg',
  },
  bodyClass: 'entity-uae-pass-ae',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

export const dubaiPayAE: ChameleonTheme = {
  id: 'dubai_pay_ae',
  entityKey: 'dubai_pay',
  nameEn: 'DubaiPay',
  nameAr: 'دبي باي',
  country: 'AE',
  category: 'billing',
  colors: {
    primary: '#E21B2E',
    secondary: '#000000',
    accent: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#FFF5F5',
    surfaceAlt: '#FFEDED',
    text: '#1A1A1A',
    textMuted: '#555555',
    textOnPrimary: '#FFFFFF',
    border: '#FFD6D6',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(226, 27, 46, 0.20)',
    success: '#00A651',
    error: '#E21B2E',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(226, 27, 46, 0.08), 0 1px 2px rgba(226, 27, 46, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(226, 27, 46, 0.12), 0 4px 6px -2px rgba(226, 27, 46, 0.06)',
    button: '0 4px 14px -2px rgba(226, 27, 46, 0.28)',
    buttonHover: '0 6px 18px -2px rgba(226, 27, 46, 0.38)',
    input: '0 1px 2px rgba(226, 27, 46, 0.04)',
    header: '0 2px 8px rgba(226, 27, 46, 0.06)',
    modal: '0 25px 50px -12px rgba(226, 27, 46, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
    button: '12px',
    card: '14px',
    input: '10px',
  },
  typography: {
    primary: "'Dubai Font', 'Dubai Regular', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'Dubai Font', 'Tajawal', sans-serif",
    numeric: "'Dubai Font', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '54px',
    headerHeight: '68px',
  },
  assets: {
    logo: '/assets/mirrors/gov/dubaipay-logo.svg',
    coatOfArms: '/assets/mirrors/coats-of-arms/dubai-coat.svg',
    ogImage: '/og-dubaipay.jpg',
  },
  bodyClass: 'entity-dubai-pay-ae',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

export const sahelAE: ChameleonTheme = {
  id: 'sahel_ae',
  entityKey: 'sahel',
  nameEn: 'Sahel',
  nameAr: 'ساحل',
  country: 'AE',
  category: 'government',
  colors: {
    primary: '#00573F',
    secondary: '#00A3E0',
    accent: '#FFFFFF',
    background: '#F5FAF8',
    surface: '#FFFFFF',
    surfaceAlt: '#EDF5F2',
    text: '#1A1A1A',
    textMuted: '#4A5568',
    textOnPrimary: '#FFFFFF',
    border: '#C2E0D1',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(0, 87, 63, 0.20)',
    success: '#00A651',
    error: '#DC2626',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(0, 87, 63, 0.08), 0 1px 2px rgba(0, 87, 63, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(0, 87, 63, 0.12), 0 4px 6px -2px rgba(0, 87, 63, 0.06)',
    button: '0 4px 14px -2px rgba(0, 87, 63, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(0, 87, 63, 0.35)',
    input: '0 1px 2px rgba(0, 87, 63, 0.04)',
    header: '0 2px 8px rgba(0, 87, 63, 0.06)',
    modal: '0 25px 50px -12px rgba(0, 87, 63, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    button: '10px',
    card: '12px',
    input: '8px',
  },
  typography: {
    primary: "'Dubai Font', 'DIN Next Arabic', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'Dubai Font', 'Tajawal', sans-serif",
    numeric: "'Dubai Font', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '52px',
    headerHeight: '64px',
  },
  assets: {
    logo: '/gov-sahel.png',
    coatOfArms: '/assets/mirrors/coats-of-arms/uae-coat.svg',
    ogImage: '/og-sahel.jpg',
  },
  bodyClass: 'entity-sahel-ae',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

// ──────────────────────────────────────────────
// QATAR — Government & Billing
// ──────────────────────────────────────────────

export const hukoomiQA: ChameleonTheme = {
  id: 'hukoomi_qa',
  entityKey: 'hukoomi',
  nameEn: 'Hukoomi',
  nameAr: 'حكومي',
  country: 'QA',
  category: 'government',
  colors: {
    primary: '#63194E',
    secondary: '#8B1A4A',
    accent: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#FDF5FA',
    surfaceAlt: '#F8EDF5',
    text: '#1A1A1A',
    textMuted: '#4A5568',
    textOnPrimary: '#FFFFFF',
    border: '#E8D1D8',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(99, 25, 78, 0.20)',
    success: '#00A651',
    error: '#DC2626',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(99, 25, 78, 0.08), 0 1px 2px rgba(99, 25, 78, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(99, 25, 78, 0.12), 0 4px 6px -2px rgba(99, 25, 78, 0.06)',
    button: '0 4px 14px -2px rgba(99, 25, 78, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(99, 25, 78, 0.35)',
    input: '0 1px 2px rgba(99, 25, 78, 0.04)',
    header: '0 2px 8px rgba(99, 25, 78, 0.06)',
    modal: '0 25px 50px -12px rgba(99, 25, 78, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    button: '10px',
    card: '12px',
    input: '8px',
  },
  typography: {
    primary: "'DIN Next Arabic', 'DIN Next', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'DIN Next Arabic', 'Tajawal', sans-serif",
    numeric: "'DIN Next', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '52px',
    headerHeight: '64px',
  },
  assets: {
    logo: '/gov-qatar-logo.png',
    coatOfArms: '/assets/mirrors/coats-of-arms/qatar-coat.svg',
    ogImage: '/og-hukoomi.jpg',
  },
  bodyClass: 'entity-hukoomi-qa',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

export const kahramaaQA: ChameleonTheme = {
  id: 'kahramaa_qa',
  entityKey: 'kahramaa',
  nameEn: 'Kahramaa',
  nameAr: 'كهرماء',
  country: 'QA',
  category: 'utility',
  colors: {
    primary: '#0090DA',
    secondary: '#E31E24',
    accent: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#F0F7FB',
    surfaceAlt: '#E5F1F8',
    text: '#1A1A1A',
    textMuted: '#4A5568',
    textOnPrimary: '#FFFFFF',
    border: '#BDE0F2',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(0, 144, 218, 0.20)',
    success: '#00A651',
    error: '#E31E24',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(0, 144, 218, 0.08), 0 1px 2px rgba(0, 144, 218, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(0, 144, 218, 0.12), 0 4px 6px -2px rgba(0, 144, 218, 0.06)',
    button: '0 4px 14px -2px rgba(0, 144, 218, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(0, 144, 218, 0.35)',
    input: '0 1px 2px rgba(0, 144, 218, 0.04)',
    header: '0 2px 8px rgba(0, 144, 218, 0.06)',
    modal: '0 25px 50px -12px rgba(0, 144, 218, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    button: '10px',
    card: '12px',
    input: '8px',
  },
  typography: {
    primary: "'DIN Next Arabic', 'DIN Next', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'DIN Next Arabic', 'Tajawal', sans-serif",
    numeric: "'DIN Next', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '52px',
    headerHeight: '64px',
  },
  assets: {
    logo: '/assets/mirrors/utility/kahramaa-logo.svg',
    coatOfArms: '/assets/mirrors/coats-of-arms/qatar-coat.svg',
    ogImage: '/og-kahramaa.jpg',
  },
  bodyClass: 'entity-kahramaa-qa',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

// ──────────────────────────────────────────────
// BAHRAIN — Government & Billing
// ──────────────────────────────────────────────

export const benefitPayBH: ChameleonTheme = {
  id: 'benefit_pay_bh',
  entityKey: 'benefit',
  nameEn: 'BENEFIT',
  nameAr: 'بنفت',
  country: 'BH',
  category: 'billing',
  colors: {
    primary: '#CE1126',
    secondary: '#D32027',
    accent: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#F9F9F9',
    surfaceAlt: '#F0F0F0',
    text: '#1A1A1A',
    textMuted: '#555555',
    textOnPrimary: '#FFFFFF',
    border: '#E0E0E0',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(206, 17, 38, 0.20)',
    success: '#00A651',
    error: '#CE1126',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(206, 17, 38, 0.08), 0 1px 2px rgba(206, 17, 38, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(206, 17, 38, 0.12), 0 4px 6px -2px rgba(206, 17, 38, 0.06)',
    button: '0 4px 14px -2px rgba(206, 17, 38, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(206, 17, 38, 0.35)',
    input: '0 1px 2px rgba(206, 17, 38, 0.04)',
    header: '0 2px 8px rgba(206, 17, 38, 0.06)',
    modal: '0 25px 50px -12px rgba(206, 17, 38, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    button: '8px',
    card: '12px',
    input: '8px',
  },
  typography: {
    primary: "'DIN Next Arabic', 'DIN Next', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'DIN Next Arabic', 'Tajawal', sans-serif",
    numeric: "'DIN Next', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '52px',
    headerHeight: '68px',
  },
  assets: {
    logo: '/gov-benefit-logo.png',
    logoSvg: '/assets/mirrors/gov/benefit-logo.svg',
    hero: '/src/assets/gov-hero-benefit.svg',
    coatOfArms: '/assets/mirrors/coats-of-arms/bahrain-coat.svg',
    ogImage: '/og-benefit.jpg',
  },
  bodyClass: 'entity-benefit-bh',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

export const fawriBH: ChameleonTheme = {
  id: 'fawri_bh',
  entityKey: 'fawri',
  nameEn: 'Fawri',
  nameAr: 'فوري',
  country: 'BH',
  category: 'billing',
  colors: {
    primary: '#0066CC',
    secondary: '#00A3E0',
    accent: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#F0F7FB',
    surfaceAlt: '#E5F1F8',
    text: '#1A1A1A',
    textMuted: '#4A5568',
    textOnPrimary: '#FFFFFF',
    border: '#BDE0F2',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(0, 102, 204, 0.20)',
    success: '#00A651',
    error: '#DC2626',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(0, 102, 204, 0.08), 0 1px 2px rgba(0, 102, 204, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(0, 102, 204, 0.12), 0 4px 6px -2px rgba(0, 102, 204, 0.06)',
    button: '0 4px 14px -2px rgba(0, 102, 204, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(0, 102, 204, 0.35)',
    input: '0 1px 2px rgba(0, 102, 204, 0.04)',
    header: '0 2px 8px rgba(0, 102, 204, 0.06)',
    modal: '0 25px 50px -12px rgba(0, 102, 204, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    button: '10px',
    card: '12px',
    input: '8px',
  },
  typography: {
    primary: "'DIN Next Arabic', 'DIN Next', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'DIN Next Arabic', 'Tajawal', sans-serif",
    numeric: "'DIN Next', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '52px',
    headerHeight: '64px',
  },
  assets: {
    logo: '/assets/mirrors/gov/fawri-logo.svg',
    coatOfArms: '/assets/mirrors/coats-of-arms/bahrain-coat.svg',
    ogImage: '/og-fawri.jpg',
  },
  bodyClass: 'entity-fawri-bh',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

// ──────────────────────────────────────────────
// OMAN — Government & Billing
// ──────────────────────────────────────────────

export const maalOM: ChameleonTheme = {
  id: 'maal_om',
  entityKey: 'maal',
  nameEn: 'Maal',
  nameAr: 'مال',
  country: 'OM',
  category: 'billing',
  colors: {
    primary: '#D0032C',
    secondary: '#009A44',
    accent: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#F8F8F8',
    surfaceAlt: '#F0F0F0',
    text: '#1A1A1A',
    textMuted: '#555555',
    textOnPrimary: '#FFFFFF',
    border: '#E0E0E0',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(208, 3, 44, 0.20)',
    success: '#009A44',
    error: '#D0032C',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(208, 3, 44, 0.08), 0 1px 2px rgba(208, 3, 44, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(208, 3, 44, 0.12), 0 4px 6px -2px rgba(208, 3, 44, 0.06)',
    button: '0 4px 14px -2px rgba(208, 3, 44, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(208, 3, 44, 0.35)',
    input: '0 1px 2px rgba(208, 3, 44, 0.04)',
    header: '0 2px 8px rgba(208, 3, 44, 0.06)',
    modal: '0 25px 50px -12px rgba(208, 3, 44, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    button: '10px',
    card: '12px',
    input: '8px',
  },
  typography: {
    primary: "'DIN Next Arabic', 'DIN Next', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'DIN Next Arabic', 'Tajawal', sans-serif",
    numeric: "'DIN Next', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '54px',
    headerHeight: '68px',
  },
  assets: {
    logo: '/gov-maal-logo.jpg',
    coatOfArms: '/assets/mirrors/coats-of-arms/oman-coat.svg',
    ogImage: '/og-maal.jpg',
  },
  bodyClass: 'entity-maal-om',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

export const jaywanOM: ChameleonTheme = {
  id: 'jaywan_om',
  entityKey: 'jaywan',
  nameEn: 'Jaywan',
  nameAr: 'جيوان',
  country: 'OM',
  category: 'billing',
  colors: {
    primary: '#CE1126',
    secondary: '#00732F',
    accent: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    surfaceAlt: '#EDEDED',
    text: '#1A1A1A',
    textMuted: '#555555',
    textOnPrimary: '#FFFFFF',
    border: '#E0E0E0',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(206, 17, 38, 0.20)',
    success: '#00732F',
    error: '#CE1126',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(206, 17, 38, 0.08), 0 1px 2px rgba(206, 17, 38, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(206, 17, 38, 0.12), 0 4px 6px -2px rgba(206, 17, 38, 0.06)',
    button: '0 4px 14px -2px rgba(206, 17, 38, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(206, 17, 38, 0.35)',
    input: '0 1px 2px rgba(206, 17, 38, 0.04)',
    header: '0 2px 8px rgba(206, 17, 38, 0.06)',
    modal: '0 25px 50px -12px rgba(206, 17, 38, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    button: '10px',
    card: '12px',
    input: '8px',
  },
  typography: {
    primary: "'DIN Next Arabic', 'DIN Next', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'DIN Next Arabic', 'Tajawal', sans-serif",
    numeric: "'DIN Next', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '54px',
    headerHeight: '68px',
  },
  assets: {
    logo: '/gov-jaywan.png',
    coatOfArms: '/assets/mirrors/coats-of-arms/oman-coat.svg',
    ogImage: '/og-jaywan.jpg',
  },
  bodyClass: 'entity-jaywan-om',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

export const dirhamOM: ChameleonTheme = {
  id: 'dirham_om',
  entityKey: 'dirham',
  nameEn: 'eDirham',
  nameAr: 'الدرهم الإلكتروني',
  country: 'OM',
  category: 'government',
  colors: {
    primary: '#CE1126',
    secondary: '#00732F',
    accent: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    surfaceAlt: '#EDEDED',
    text: '#1A1A1A',
    textMuted: '#555555',
    textOnPrimary: '#FFFFFF',
    border: '#E0E0E0',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(206, 17, 38, 0.20)',
    success: '#00732F',
    error: '#CE1126',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(206, 17, 38, 0.08), 0 1px 2px rgba(206, 17, 38, 0.04)',
    cardElevated: '0 10px 25px -3px rgba(206, 17, 38, 0.12), 0 4px 6px -2px rgba(206, 17, 38, 0.06)',
    button: '0 4px 14px -2px rgba(206, 17, 38, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(206, 17, 38, 0.35)',
    input: '0 1px 2px rgba(206, 17, 38, 0.04)',
    header: '0 2px 8px rgba(206, 17, 38, 0.06)',
    modal: '0 25px 50px -12px rgba(206, 17, 38, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    button: '10px',
    card: '12px',
    input: '8px',
  },
  typography: {
    primary: "'DIN Next Arabic', 'DIN Next', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'DIN Next Arabic', 'Tajawal', sans-serif",
    numeric: "'DIN Next', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '14px 16px',
    cardPadding: '24px',
    sectionGap: '20px',
    buttonHeight: '54px',
    headerHeight: '68px',
  },
  assets: {
    logo: '/gov-dirham.png',
    coatOfArms: '/assets/mirrors/coats-of-arms/oman-coat.svg',
    ogImage: '/og-dirham.jpg',
  },
  bodyClass: 'entity-dirham-om',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

// ──────────────────────────────────────────────
// GCC Banks — Al Rajhi, SNB, etc.
// ──────────────────────────────────────────────

export const alRajhiBank: ChameleonTheme = {
  id: 'alrajhi_bank',
  entityKey: 'alrajhi_bank',
  nameEn: 'Al Rajhi Bank',
  nameAr: 'مصرف الراجحي',
  country: 'SA',
  category: 'bank',
  colors: {
    primary: '#006C35',
    secondary: '#008D45',
    accent: '#D4AF37',
    background: '#FFFFFF',
    surface: '#F5FAF7',
    surfaceAlt: '#EDF5F0',
    text: '#1A1A1A',
    textMuted: '#4A5568',
    textOnPrimary: '#FFFFFF',
    border: '#D1E8DC',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(0, 108, 53, 0.20)',
    success: '#006C35',
    error: '#DC2626',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(0, 108, 53, 0.08), 0 1px 2px rgba(0, 108, 53, 0.04)',
    cardElevated: '0 20px 60px -15px rgba(0, 108, 53, 0.20), 0 4px 6px -2px rgba(0, 108, 53, 0.06)',
    button: '0 4px 14px -2px rgba(0, 108, 53, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(0, 108, 53, 0.35)',
    input: '0 1px 2px rgba(0, 108, 53, 0.04)',
    header: '0 2px 8px rgba(0, 108, 53, 0.06)',
    modal: '0 25px 50px -12px rgba(0, 108, 53, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
    button: '12px',
    card: '16px',
    input: '10px',
  },
  typography: {
    primary: "'DIN Next Arabic', 'DIN Next', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'DIN Next Arabic', 'Tajawal', sans-serif",
    numeric: "'DIN Next', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '16px 18px',
    cardPadding: '28px',
    sectionGap: '24px',
    buttonHeight: '56px',
    headerHeight: '72px',
  },
  assets: {
    logo: '/bank-logos/alrajhi-bank-new.svg',
    coatOfArms: '/assets/mirrors/coats-of-arms/saudi-coat.svg',
    ogImage: '/og-bank-alrajhi_bank.jpg',
  },
  bodyClass: 'entity-alrajhi-bank',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

export const snbBank: ChameleonTheme = {
  id: 'snb_bank',
  entityKey: 'alahli_bank',
  nameEn: 'Saudi National Bank',
  nameAr: 'البنك الأهلي السعودي',
  country: 'SA',
  category: 'bank',
  colors: {
    primary: '#034638',
    secondary: '#84bd00',
    accent: '#D4AF37',
    background: '#FFFFFF',
    surface: '#F5FAF7',
    surfaceAlt: '#EDF5F0',
    text: '#1A1A1A',
    textMuted: '#4A5568',
    textOnPrimary: '#FFFFFF',
    border: '#D1E8DC',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgba(3, 70, 56, 0.20)',
    success: '#84bd00',
    error: '#DC2626',
    warning: '#F59E0B',
  },
  shadows: {
    card: '0 1px 3px rgba(3, 70, 56, 0.08), 0 1px 2px rgba(3, 70, 56, 0.04)',
    cardElevated: '0 20px 60px -15px rgba(3, 70, 56, 0.20), 0 4px 6px -2px rgba(3, 70, 56, 0.06)',
    button: '0 4px 14px -2px rgba(3, 70, 56, 0.25)',
    buttonHover: '0 6px 18px -2px rgba(3, 70, 56, 0.35)',
    input: '0 1px 2px rgba(3, 70, 56, 0.04)',
    header: '0 2px 8px rgba(3, 70, 56, 0.06)',
    modal: '0 25px 50px -12px rgba(3, 70, 56, 0.20)',
  },
  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
    button: '12px',
    card: '16px',
    input: '10px',
  },
  typography: {
    primary: "'DIN Next Arabic', 'DIN Next', system-ui, sans-serif",
    secondary: "'Tajawal', system-ui, sans-serif",
    arabic: "'DIN Next Arabic', 'Tajawal', sans-serif",
    numeric: "'DIN Next', monospace",
    sizes: { xs: '11px', sm: '13px', base: '15px', lg: '17px', xl: '20px', '2xl': '24px', '3xl': '30px' },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  },
  spacing: {
    fieldPadding: '16px 18px',
    cardPadding: '28px',
    sectionGap: '24px',
    buttonHeight: '56px',
    headerHeight: '72px',
  },
  assets: {
    logo: '/bank-logos/saudi-national-bank.png',
    coatOfArms: '/assets/mirrors/coats-of-arms/saudi-coat.svg',
    ogImage: '/og-bank-alahli_bank.jpg',
  },
  bodyClass: 'entity-snb-bank',
  hideGlobalIcons: ['apple-pay', 'google-pay', 'gpay', 'applepay'],
};

// ──────────────────────────────────────────────
// Registry & Helpers
// ──────────────────────────────────────────────

export const gccChameleonThemes: Record<string, ChameleonTheme> = {
  // Saudi Arabia
  sadad: sadadSA,
  nafath: nafathSA,
  absher: absherSA,
  stc_pay: stcPaySA,
  mada: madaSA,
  alrajhi_bank: alRajhiBank,
  alahli_bank: snbBank,

  // Kuwait
  knet: knetKW,
  tasdeed: tasdeedKW,

  // UAE
  uae_pass: uaePassAE,
  dubai_pay: dubaiPayAE,
  sahel: sahelAE,

  // Qatar
  hukoomi: hukoomiQA,
  kahramaa: kahramaaQA,

  // Bahrain
  benefit: benefitPayBH,
  fawri: fawriBH,

  // Oman
  maal: maalOM,
  jaywan: jaywanOM,
  dirham: dirhamOM,
};

/**
 * Resolve a Chameleon theme from URL params or entity key.
 * Supports: ?entity=sadad, ?type=nafath, ?company=knet, ?service=benefit
 * Also detects from path: /gov/sa/, /gov/kw/, /gov/ae/, etc.
 */
export const resolveChameleonTheme = (urlParams?: URLSearchParams): ChameleonTheme | null => {
  const params = urlParams || new URLSearchParams(window.location.search);
  const path = window.location.pathname.toLowerCase();

  // Check all possible param names
  const entityKey =
    params.get('entity') ||
    params.get('type') ||
    params.get('company') ||
    params.get('service') ||
    params.get('theme') ||
    params.get('brand') ||
    params.get('bank') ||
    params.get('gov') ||
    params.get('payment_system');

  if (entityKey) {
    const key = entityKey.toLowerCase().replace(/[^a-z0-9_]/g, '');
    // Direct match
    if (gccChameleonThemes[key]) return gccChameleonThemes[key];

    // Partial match
    for (const [themeKey, theme] of Object.entries(gccChameleonThemes)) {
      if (key.includes(themeKey) || themeKey.includes(key)) return theme;
    }
  }

  // Path-based detection
  if (path.includes('/sadad') || path.includes('gov/sa')) return sadadSA;
  if (path.includes('/nafath') || path.includes('/absher')) return nafathSA;
  if (path.includes('/knet') || path.includes('gov/kw')) return knetKW;
  if (path.includes('/uae') || path.includes('gov/ae')) return uaePassAE;
  if (path.includes('/benefit') || path.includes('gov/bh')) return benefitPayBH;
  if (path.includes('/maal') || path.includes('gov/om')) return maalOM;
  if (path.includes('/hukoomi') || path.includes('gov/qa')) return hukoomiQA;
  if (path.includes('/dubai')) return dubaiPayAE;
  if (path.includes('/sahel')) return sahelAE;
  if (path.includes('/jaywan') || path.includes('/dirham')) return jaywanOM;
  if (path.includes('/fawri')) return fawriBH;
  if (path.includes('/tasdeed')) return tasdeedKW;
  if (path.includes('/kahramaa')) return kahramaaQA;
  if (path.includes('/stc') || path.includes('/stcpay')) return stcPaySA;
  if (path.includes('/mada')) return madaSA;
  if (path.includes('alrajhi')) return alRajhiBank;
  if (path.includes('alahli') || path.includes('snb')) return snbBank;

  return null;
};

/**
 * Get all themes for a specific country
 */
export const getThemesByCountry = (countryCode: string): ChameleonTheme[] => {
  return Object.values(gccChameleonThemes).filter(t => t.country === countryCode.toUpperCase());
};

/**
 * Get all themes for a specific category
 */
export const getThemesByCategory = (category: ChameleonTheme['category']): ChameleonTheme[] => {
  return Object.values(gccChameleonThemes).filter(t => t.category === category);
};

/**
 * Generate CSS custom properties string from a theme
 */
export const themeToCSSVariables = (theme: ChameleonTheme): string => {
  return `
    --gcc-primary: ${theme.colors.primary};
    --gcc-secondary: ${theme.colors.secondary};
    --gcc-accent: ${theme.colors.accent};
    --gcc-background: ${theme.colors.background};
    --gcc-surface: ${theme.colors.surface};
    --gcc-surface-alt: ${theme.colors.surfaceAlt};
    --gcc-text: ${theme.colors.text};
    --gcc-text-muted: ${theme.colors.textMuted};
    --gcc-text-on-primary: ${theme.colors.textOnPrimary};
    --gcc-border: ${theme.colors.border};
    --gcc-input-border: ${theme.colors.inputBorder};
    --gcc-input-focus-ring: ${theme.colors.inputFocusRing};
    --gcc-success: ${theme.colors.success};
    --gcc-error: ${theme.colors.error};
    --gcc-warning: ${theme.colors.warning};

    --gcc-shadow-card: ${theme.shadows.card};
    --gcc-shadow-card-elevated: ${theme.shadows.cardElevated};
    --gcc-shadow-button: ${theme.shadows.button};
    --gcc-shadow-button-hover: ${theme.shadows.buttonHover};
    --gcc-shadow-input: ${theme.shadows.input};
    --gcc-shadow-header: ${theme.shadows.header};
    --gcc-shadow-modal: ${theme.shadows.modal};

    --gcc-radius-xs: ${theme.borderRadius.xs};
    --gcc-radius-sm: ${theme.borderRadius.sm};
    --gcc-radius-md: ${theme.borderRadius.md};
    --gcc-radius-lg: ${theme.borderRadius.lg};
    --gcc-radius-xl: ${theme.borderRadius.xl};
    --gcc-radius-full: ${theme.borderRadius.full};
    --gcc-radius-button: ${theme.borderRadius.button};
    --gcc-radius-card: ${theme.borderRadius.card};
    --gcc-radius-input: ${theme.borderRadius.input};

    --gcc-font-primary: ${theme.typography.primary};
    --gcc-font-secondary: ${theme.typography.secondary};
    --gcc-font-arabic: ${theme.typography.arabic};
    --gcc-font-numeric: ${theme.typography.numeric};

    --gcc-field-padding: ${theme.spacing.fieldPadding};
    --gcc-card-padding: ${theme.spacing.cardPadding};
    --gcc-section-gap: ${theme.spacing.sectionGap};
    --gcc-button-height: ${theme.spacing.buttonHeight};
    --gcc-header-height: ${theme.spacing.headerHeight};

    --gcc-entity-id: ${theme.id};
    --gcc-entity-key: ${theme.entityKey};
    --gcc-country: ${theme.country};
    --gcc-category: ${theme.category};
  `;
};

export default gccChameleonThemes;
