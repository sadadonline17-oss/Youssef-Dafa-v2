import { resolveChameleonTheme, ChameleonTheme } from '@/lib/gccChameleonThemes';

export type EntityId = 'SADAD' | 'NAFATH' | 'KNET' | 'ARAMEX' | 'UAE_PASS' | 'BENEFIT' | 'MAAL' | 'JAYWAN' | 'DIRHAM' | 'DEFAULT';

export interface PaymentEntityConfig {
  id: EntityId;
  name: string;
  nameAr: string;
  primary: string;
  accent: string;
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  font: string;
  logo: string;

  // Button specific
  btnRadius: string;
  btnHeight: string;
  btnShadow: string;
  btnTextWeight: string;

  // Input specific
  inputRadius: string;
  inputBorder: string;
  inputFocusRing: string;
  inputPadding: string;

  cardRadius: string;
  headerHeight: string;
  showShipment?: boolean;
}

export const paymentEntities: Record<EntityId, PaymentEntityConfig> = {
  SADAD: {
    id: 'SADAD',
    name: 'SADAD',
    nameAr: 'سداد',
    primary: '#FF6B00',
    accent: '#FF8A33',
    bg: '#F4F4F4',
    surface: '#FFFFFF',
    text: '#1C2526',
    textMuted: '#54565B',
    font: "'DIN Next Arabic Medium', system-ui, sans-serif",
    logo: '/gov-sadad-official.png',
    btnRadius: '12px',
    btnHeight: '56px',
    btnShadow: '0 4px 15px -2px rgb(255 107 0 / 0.30)',
    btnTextWeight: '600',
    inputRadius: '8px',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgb(255 107 0 / 0.20)',
    inputPadding: '16px 20px',
    cardRadius: '12px',
    headerHeight: '72px',
  },
  NAFATH: {
    id: 'NAFATH',
    name: 'Nafath',
    nameAr: 'نفاذ',
    primary: '#006C35',
    accent: '#00A650',
    bg: '#F8FAF7',
    surface: '#FFFFFF',
    text: '#1C2526',
    textMuted: '#4A4A4A',
    font: "'Taysir Arabic', system-ui, sans-serif",
    logo: '/gov-nafath.png',
    btnRadius: '8px',
    btnHeight: '52px',
    btnShadow: '0 3px 12px -2px rgb(0 108 53 / 0.25)',
    btnTextWeight: '600',
    inputRadius: '8px',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgb(0 108 53 / 0.20)',
    inputPadding: '16px 20px',
    cardRadius: '12px',
    headerHeight: '68px',
  },
  KNET: {
    id: 'KNET',
    name: 'KNET',
    nameAr: 'كي نت',
    primary: '#005696',
    accent: '#0078C2',
    bg: '#F5F7FA',
    surface: '#FFFFFF',
    text: '#1C2526',
    textMuted: '#4A4A4A',
    font: "'DIN Next Arabic', system-ui, sans-serif",
    logo: '/gov-knet-logo.png',
    btnRadius: '6px',
    btnHeight: '54px',
    btnShadow: '0 4px 14px -2px rgb(0 86 150 / 0.25)',
    btnTextWeight: '600',
    inputRadius: '8px',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgb(0 86 150 / 0.20)',
    inputPadding: '16px 20px',
    cardRadius: '10px',
    headerHeight: '70px',
  },
  ARAMEX: {
    id: 'ARAMEX',
    name: 'Aramex',
    nameAr: 'أرامكس',
    primary: '#DC291E',
    accent: '#FFCC00',
    bg: '#FFFFFF',
    surface: '#FAFAFA',
    text: '#1C2526',
    textMuted: '#555555',
    font: "system-ui, sans-serif",
    logo: '/logos/aramex-logo.svg',
    btnRadius: '10px',
    btnHeight: '56px',
    btnShadow: '0 4px 16px -2px rgb(220 41 30 / 0.28)',
    btnTextWeight: '600',
    inputRadius: '10px',
    inputBorder: '#E5E7EB',
    inputFocusRing: 'rgb(220 41 30 / 0.18)',
    inputPadding: '16px 20px',
    cardRadius: '12px',
    headerHeight: '64px',
    showShipment: true,
  },
  UAE_PASS: {
    id: 'UAE_PASS',
    name: 'UAE Pass',
    nameAr: 'UAE Pass',
    primary: '#1A1A1A',
    accent: '#C19B64',
    bg: '#FAF9F6',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    textMuted: '#555555',
    font: "'Dubai Font', system-ui, sans-serif",
    logo: '/gov-uae-pass.png',
    btnRadius: '20px',
    btnHeight: '56px',
    btnShadow: '0 4px 18px -2px rgb(193 155 100 / 0.22)',
    btnTextWeight: '600',
    inputRadius: '12px',
    inputBorder: '#E5E7EB',
    inputFocusRing: 'rgb(193 155 100 / 0.20)',
    inputPadding: '18px 22px',
    cardRadius: '16px',
    headerHeight: '72px',
  },
  BENEFIT: {
    id: 'BENEFIT',
    name: 'BENEFIT',
    nameAr: 'بنفت',
    primary: '#CE1126',
    accent: '#D32027',
    bg: '#FFFFFF',
    surface: '#F9F9F9',
    text: '#1C2526',
    textMuted: '#555555',
    font: "'DIN Next Arabic', system-ui, sans-serif",
    logo: '/gov-benefit-logo.png',
    btnRadius: '8px',
    btnHeight: '52px',
    btnShadow: '0 4px 14px -2px rgb(206 17 38 / 0.25)',
    btnTextWeight: '600',
    inputRadius: '8px',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgb(206 17 38 / 0.20)',
    inputPadding: '16px 20px',
    cardRadius: '12px',
    headerHeight: '68px',
  },
  MAAL: {
    id: 'MAAL',
    name: 'Maal',
    nameAr: 'مال',
    primary: '#D0032C',
    accent: '#009A44',
    bg: '#FFFFFF',
    surface: '#F8F8F8',
    text: '#1C2526',
    textMuted: '#555555',
    font: "'DIN Next Arabic', system-ui, sans-serif",
    logo: '/gov-maal-logo.jpg',
    btnRadius: '10px',
    btnHeight: '54px',
    btnShadow: '0 4px 14px -2px rgb(208 3 44 / 0.25)',
    btnTextWeight: '600',
    inputRadius: '8px',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgb(208 3 44 / 0.20)',
    inputPadding: '16px 20px',
    cardRadius: '12px',
    headerHeight: '68px',
  },
  JAYWAN: {
    id: 'JAYWAN',
    name: 'Jaywan',
    nameAr: 'جيوان',
    primary: '#CE1126',
    accent: '#00732F',
    bg: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#1C2526',
    textMuted: '#555555',
    font: "'Dubai Font', system-ui, sans-serif",
    logo: '/gov-jaywan.png',
    btnRadius: '10px',
    btnHeight: '54px',
    btnShadow: '0 4px 14px -2px rgb(206 17 38 / 0.25)',
    btnTextWeight: '600',
    inputRadius: '8px',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgb(206 17 38 / 0.20)',
    inputPadding: '16px 20px',
    cardRadius: '12px',
    headerHeight: '68px',
  },
  DIRHAM: {
    id: 'DIRHAM',
    name: 'eDirham',
    nameAr: 'الدرهم الإلكتروني',
    primary: '#CE1126',
    accent: '#00732F',
    bg: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#1C2526',
    textMuted: '#555555',
    font: "'Dubai Font', system-ui, sans-serif",
    logo: '/gov-dirham.png',
    btnRadius: '10px',
    btnHeight: '54px',
    btnShadow: '0 4px 14px -2px rgb(206 17 38 / 0.25)',
    btnTextWeight: '600',
    inputRadius: '8px',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgb(206 17 38 / 0.20)',
    inputPadding: '16px 20px',
    cardRadius: '12px',
    headerHeight: '68px',
  },
  DEFAULT: {
    id: 'DEFAULT',
    name: 'Payment',
    nameAr: 'الدفع',
    primary: '#006C35',
    accent: '#00A650',
    bg: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#1C2526',
    textMuted: '#6B6B6B',
    font: "system-ui, sans-serif",
    logo: '/assets/entities/default/logo.svg',
    btnRadius: '10px',
    btnHeight: '54px',
    btnShadow: '0 4px 12px -2px rgb(0 0 0 / 0.12)',
    btnTextWeight: '600',
    inputRadius: '8px',
    inputBorder: '#D1D5DB',
    inputFocusRing: 'rgb(0 108 53 / 0.15)',
    inputPadding: '16px 20px',
    cardRadius: '12px',
    headerHeight: '68px',
  },
};

/**
 * Convert a ChameleonTheme to PaymentEntityConfig for use with ThemedButton/Card/Header
 * This bridges the Chameleon V50 visual system with existing themed components
 */
const chameleonToEntityConfig = (theme: ChameleonTheme): PaymentEntityConfig => ({
  id: theme.entityKey.toUpperCase().replace(/[^A-Z0-9_]/g, '') as EntityId,
  name: theme.nameEn,
  nameAr: theme.nameAr,
  primary: theme.colors.primary,
  accent: theme.colors.secondary,
  bg: theme.colors.background,
  surface: theme.colors.surface,
  text: theme.colors.text,
  textMuted: theme.colors.textMuted,
  font: theme.typography.arabic,
  logo: theme.assets.logo,
  btnRadius: theme.borderRadius.button,
  btnHeight: theme.spacing.buttonHeight,
  btnShadow: theme.shadows.button,
  btnTextWeight: String(theme.typography.weights.semibold),
  inputRadius: theme.borderRadius.input,
  inputBorder: theme.colors.inputBorder,
  inputFocusRing: theme.colors.inputFocusRing,
  inputPadding: theme.spacing.fieldPadding,
  cardRadius: theme.borderRadius.card,
  headerHeight: theme.spacing.headerHeight,
});

export const resolveEntity = (companyKey?: string): PaymentEntityConfig => {
  if (!companyKey) return paymentEntities.DEFAULT;

  // Chameleon V50: Try official GCC theme first (1:1 pixel-perfect colors)
  const chameleonTheme = resolveChameleonTheme();
  if (chameleonTheme) {
    return chameleonToEntityConfig(chameleonTheme);
  }

  // Legacy fallback
  const key = companyKey.toLowerCase();
  if (key.includes('sadad') || key.includes('gov_sa')) return paymentEntities.SADAD;
  if (key.includes('nafath') || key.includes('absher')) return paymentEntities.NAFATH;
  if (key.includes('knet') || key.includes('gov_kw')) return paymentEntities.KNET;
  if (key.includes('aramex')) return paymentEntities.ARAMEX;
  if (key.includes('uae') || key.includes('gov_ae')) return paymentEntities.UAE_PASS;
  if (key.includes('benefit') || key.includes('gov_bh')) return paymentEntities.BENEFIT;
  if (key.includes('maal') || key.includes('gov_om')) return paymentEntities.MAAL;
  if (key.includes('jaywan') || key.includes('dirham')) return paymentEntities.JAYWAN;

  return paymentEntities.DEFAULT;
};
