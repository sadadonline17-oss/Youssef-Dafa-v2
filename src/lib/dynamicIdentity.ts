import { hexToHsl } from './colorUtils';

// ============================
// UNIFIED BRAND SCHEMA (Target Architecture)
// ============================

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textLight: string;
  textOnPrimary: string;
  border: string;
}

export interface BrandFonts {
  primaryAr: string;
  primary: string;
  secondary: string;
}

export interface BrandGradients {
  primary: string;
  secondary: string;
  header: string;
}

export interface BrandShadows {
  sm: string;
  md: string;
  lg: string;
}

export interface BrandRadius {
  sm: string;
  md: string;
  lg: string;
}

export interface BrandObject {
  name: string;
  colors: BrandColors;
  fonts: BrandFonts;
  gradients: BrandGradients;
  shadows: BrandShadows;
  borderRadius: BrandRadius;
  logo: string;
  animated_header_images: string[];
  auto_apply?: boolean;
}

// Legacy alias for backward compatibility
export interface DynamicIdentityEntity extends BrandObject {}
export interface DynamicIdentity {
  primaryColor: string;
  name?: string;
}

/**
 * GCC Chameleon Sovereign Mirror — Full Entity Registry
 * Covers: Shipping Carriers, Government Systems, Banks, Wallets, Service Types
 * Colors normalized to official live-app hex values.
 *
 * Helper: normalizeBrandEntity() fills missing properties from the full brand_object spec.
 */

/** Generate derived CSS values from a primary hex color */
function deriveBrandCSSValues(primaryColor: string): {
  colors: BrandColors;
  gradients: BrandGradients;
  shadows: BrandShadows;
  borderRadius: BrandRadius;
} {
  const hsl = hexToHsl(primaryColor);
  if (!hsl) {
    // Fallback to safe defaults
    return {
      colors: {
        primary: primaryColor, secondary: '#333333', accent: primaryColor,
        background: '#f5f5f5', surface: '#ffffff', text: '#1a1a1a',
        textLight: '#6b7280', textOnPrimary: '#ffffff', border: '#e5e7eb',
      },
      gradients: {
        primary: `linear-gradient(135deg, ${primaryColor}, #333333)`,
        secondary: `linear-gradient(135deg, #333333, ${primaryColor})`,
        header: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor} 100%)`,
      },
      shadows: {
        sm: '0 1px 3px rgba(0,0,0,0.12)',
        md: '0 4px 12px rgba(0,0,0,0.15)',
        lg: '0 8px 32px rgba(0,0,0,0.2)',
      },
      borderRadius: { sm: '6px', md: '12px', lg: '20px' },
    };
  }

  const h = hsl.h;
  const s = Math.min(hsl.s, 100);
  const l = hsl.l;

  const darkerH = h;
  const darkerS = Math.min(s + 10, 100);
  const darkerL = Math.max(l - 15, 10);
  const darkerHex = hslToHex(h, darkerS, darkerL);

  const accentH = (h + 30) % 360;
  const accentS = Math.max(s - 10, 20);
  const accentL = Math.min(l + 10, 60);
  const accentHex = hslToHex(accentH, accentS, accentL);

  const textOnPrimary = l > 55 ? '#1a1a1a' : '#ffffff';

  return {
    colors: {
      primary: primaryColor,
      secondary: darkerHex,
      accent: accentHex,
      background: `hsl(${h} ${Math.max(s - 20, 5)}% ${Math.min(l + 35, 97)}%)`,
      surface: '#ffffff',
      text: '#1a1a1a',
      textLight: '#6b7280',
      textOnPrimary,
      border: `hsl(${h} ${Math.max(s - 30, 10)}% ${Math.min(l + 20, 85)}%)`,
    },
    gradients: {
      primary: `linear-gradient(135deg, ${primaryColor}, ${darkerHex})`,
      secondary: `linear-gradient(135deg, ${darkerHex}, ${primaryColor})`,
      header: `linear-gradient(135deg, ${primaryColor} 0%, ${accentHex} 100%)`,
    },
    shadows: {
      sm: `0 1px 3px hsla(${h} ${s}% ${l}% / 0.12)`,
      md: `0 4px 12px hsla(${h} ${s}% ${l}% / 0.15)`,
      lg: `0 8px 32px hsla(${h} ${s}% ${l}% / 0.2)`,
    },
    borderRadius: { sm: '6px', md: '12px', lg: '20px' },
  };
}

/** Convert HSL to hex color string */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/** Normalize a partial entity definition into a full BrandObject */
function normalizeBrandEntity(partial: {
  name: string;
  primaryColor: string;
  logo: string;
  fonts?: string[] | BrandFonts;
  colors?: Partial<BrandColors>;
  animated_header_images?: string[];
  auto_apply?: boolean;
}): BrandObject {
  const derived = deriveBrandCSSValues(partial.primaryColor);
  const fonts = Array.isArray(partial.fonts)
    ? { primaryAr: partial.fonts[0] || 'Almarai', primary: partial.fonts[0] || 'Inter', secondary: partial.fonts[1] || 'sans-serif' }
    : partial.fonts || { primaryAr: 'Almarai', primary: 'Inter', secondary: 'sans-serif' };

  return {
    name: partial.name,
    colors: { ...derived.colors, ...(partial.colors || {}) },
    fonts,
    gradients: derived.gradients,
    shadows: derived.shadows,
    borderRadius: derived.borderRadius,
    logo: partial.logo,
    animated_header_images: partial.animated_header_images || [],
    auto_apply: partial.auto_apply,
  };
}
const entityRegistry: Record<string, DynamicIdentityEntity> = {

  // ========================
  // SHIPPING CARRIERS (GCC)
  // ========================
  aramex: {
    name: 'Aramex',
    primaryColor: '#DC291E',
    logo: '/aramex-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#DC291E', secondary: '#8B1A12' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-aramex.svg'],
    auto_apply: true,
  },
  dhl: {
    name: 'DHL',
    primaryColor: '#FFCC00',
    logo: '/dhl-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFFDE7', primary: '#FFCC00', secondary: '#D40511' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-dhl.svg'],
    auto_apply: true,
  },
  fedex: {
    name: 'FedEx',
    primaryColor: '#4D148C',
    logo: '/fedex-logo.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F3E8FF', primary: '#4D148C', secondary: '#FF6600' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-fedex.svg'],
    auto_apply: true,
  },
  smsa: {
    name: 'SMSA Express',
    primaryColor: '#662D91',
    logo: '/smsa-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#EDE7F6', primary: '#662D91', secondary: '#FF6600' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-smsa.svg'],
    auto_apply: true,
  },
  naqel: {
    name: 'Naqel Express',
    primaryColor: '#E61838',
    logo: '/og-naqel.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#E61838', secondary: '#002E60' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-naqel.svg'],
    auto_apply: true,
  },
  ups: {
    name: 'UPS',
    primaryColor: '#351C15',
    logo: '/ups-logo.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF3E0', primary: '#351C15', secondary: '#FFB500' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-ups.svg'],
    auto_apply: true,
  },
  zajil: {
    name: 'Zajil',
    primaryColor: '#1C4587',
    logo: '/og-zajil.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#1C4587', secondary: '#FF9900' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-zajil.svg'],
    auto_apply: true,
  },
  empost: {
    name: 'Emirates Post',
    primaryColor: '#C8102E',
    logo: '/og-empost.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#C8102E', secondary: '#003087' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-empost.svg'],
    auto_apply: true,
  },
  saudipost: {
    name: 'Saudi Post',
    primaryColor: '#006C35',
    logo: '/og-saudipost.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E8F5E9', primary: '#006C35', secondary: '#FFB81C' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-saudipost.svg'],
    auto_apply: true,
  },
  qpost: {
    name: 'Qatar Post',
    primaryColor: '#8E1838',
    logo: '/og-qpost.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FCE4EC', primary: '#8E1838', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-qpost.svg'],
    auto_apply: true,
  },
  kwpost: {
    name: 'Kuwait Post',
    primaryColor: '#007A33',
    logo: '/og-kwpost.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E8F5E9', primary: '#007A33', secondary: '#CE1126' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-kwpost.svg'],
    auto_apply: true,
  },
  omanpost: {
    name: 'Oman Post',
    primaryColor: '#ED1C24',
    logo: '/og-omanpost.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#ED1C24', secondary: '#009639' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-omanpost.svg'],
    auto_apply: true,
  },
  bahpost: {
    name: 'Bahrain Post',
    primaryColor: '#EF3F32',
    logo: '/og-bahpost.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#EF3F32', secondary: '#007CC2' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-bahpost.svg'],
    auto_apply: true,
  },
  albaraka: {
    name: 'Al Baraka Group',
    primaryColor: '#D89A00',
    logo: '/og-albaraka.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF8E1', primary: '#D89A00', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-albaraka.svg'],
    auto_apply: true,
  },
  alfuttaim: {
    name: 'Al-Futtaim Group',
    primaryColor: '#00559B',
    logo: '/og-alfuttaim.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#00559B', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-alfuttaim.svg'],
    auto_apply: true,
  },
  alshaya: {
    name: 'Alshaya Group',
    primaryColor: '#D71920',
    logo: '/og-alshaya.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#D71920', secondary: '#000000' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-alshaya.svg'],
    auto_apply: true,
  },
  national: {
    name: 'National Shipping',
    primaryColor: '#003366',
    logo: '/og-bahri.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#003366', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-national.svg'],
    auto_apply: true,
  },
  shipco: {
    name: 'Shipco Transport',
    primaryColor: '#0A5FB4',
    logo: '/og-shipco.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#0A5FB4', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-shipco.svg'],
    auto_apply: true,
  },
  hellmann: {
    name: 'Hellmann Worldwide',
    primaryColor: '#0C4DA2',
    logo: '/og-hellmann.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#0C4DA2', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-hellmann.svg'],
    auto_apply: true,
  },
  dsv: {
    name: 'DSV',
    primaryColor: '#0056A6',
    logo: '/og-dsv.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#0056A6', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-dsv.svg'],
    auto_apply: true,
  },
  agility: {
    name: 'Agility Logistics',
    primaryColor: '#003A63',
    logo: '/og-genacom.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#003A63', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-agility.svg'],
    auto_apply: true,
  },
  jinaken: {
    name: 'Jinaken (Genacom)',
    primaryColor: '#E82424',
    logo: '/og-jinaken.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#E82424', secondary: '#F7C24A' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-jinaken.svg'],
    auto_apply: true,
  },
  jinakum: {
    name: 'Jinakum',
    primaryColor: '#0EA5E9',
    logo: '/og-jinakum.jpg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E0F7FA', primary: '#0EA5E9', secondary: '#06B6D4' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-jinakum.svg'],
    auto_apply: true,
  },
  dhlkw: {
    name: 'DHL Kuwait',
    primaryColor: '#FFCC00',
    logo: '/dhl-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFFDE7', primary: '#FFCC00', secondary: '#D40511' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-dhl.svg'],
    auto_apply: true,
  },
  dhlqa: {
    name: 'DHL Qatar',
    primaryColor: '#FFCC00',
    logo: '/dhl-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFFDE7', primary: '#FFCC00', secondary: '#D40511' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-dhl.svg'],
    auto_apply: true,
  },
  dhlom: {
    name: 'DHL Oman',
    primaryColor: '#FFCC00',
    logo: '/dhl-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFFDE7', primary: '#FFCC00', secondary: '#D40511' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-dhl.svg'],
    auto_apply: true,
  },
  dhlbh: {
    name: 'DHL Bahrain',
    primaryColor: '#FFCC00',
    logo: '/dhl-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFFDE7', primary: '#FFCC00', secondary: '#D40511' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-dhl.svg'],
    auto_apply: true,
  },

  // ========================
  // GOVERNMENT PAYMENT SYSTEMS (GCC)
  // ========================
  sadad: {
    name: 'SADAD (سداد)',
    primaryColor: '#F58220',
    logo: '/gov-sadad.png',
    fonts: ['Taysir', 'Inter', 'sans-serif'],
    colors: { background: '#FFF8F0', primary: '#F58220', secondary: '#333333' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-sadad.svg'],
    auto_apply: true,
  },
  jaywan: {
    name: 'Jaywan (جيوان)',
    primaryColor: '#CE1126',
    logo: '/gov-jaywan.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#CE1126', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-jaywan.svg'],
    auto_apply: true,
  },
  dirham: {
    name: 'Dirham (درهم)',
    primaryColor: '#007CC2',
    logo: '/gov-dirham.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#007CC2', secondary: '#006C35' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-dirham.svg'],
    auto_apply: true,
  },
  knet: {
    name: 'KNET (كي نت)',
    primaryColor: '#007A3D',
    logo: '/gov-knet.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E8F5E9', primary: '#007A3D', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-knet.svg'],
    auto_apply: true,
  },
  benefit: {
    name: 'BENEFIT (بنفت)',
    primaryColor: '#CE1126',
    logo: '/gov-benefit.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#CE1126', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-benefit.svg'],
    auto_apply: true,
  },
  maal: {
    name: 'Maal (مال)',
    primaryColor: '#D0032C',
    logo: '/gov-maal.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#D0032C', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-maal.svg'],
    auto_apply: true,
  },
  qatar_gov: {
    name: 'Qatar Government Payment',
    primaryColor: '#8D1B3D',
    logo: '/gov-qatar.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#8D1B3D', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-qatar-gov.svg'],
    auto_apply: true,
  },
  nafath: {
    name: 'Nafath IAM',
    primaryColor: '#006C35',
    logo: '/gov-nafath.png',
    fonts: ['Taysir', 'Inter', 'sans-serif'],
    colors: { background: '#E8F5E9', primary: '#006C35', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-nafath.svg'],
    auto_apply: true,
  },
  absher: {
    name: 'Absher',
    primaryColor: '#006C35',
    logo: '/gov-absher.png',
    fonts: ['Taysir', 'Inter', 'sans-serif'],
    colors: { background: '#E8F5E9', primary: '#006C35', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-absher.svg'],
    auto_apply: true,
  },
  uae_pass: {
    name: 'UAE Pass',
    primaryColor: '#007CC2',
    logo: '/gov-uae-pass.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#007CC2', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-uae-pass.svg'],
    auto_apply: true,
  },
  sahel: {
    name: 'Sahel App',
    primaryColor: '#006C35',
    logo: '/gov-sahel.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E8F5E9', primary: '#006C35', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-sahel.svg'],
    auto_apply: true,
  },
  metrash2: {
    name: 'Metrash2',
    primaryColor: '#8D1B3D',
    logo: '/gov-metrash2.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#8D1B3D', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-metrash2.svg'],
    auto_apply: true,
  },
  tawakkalna: {
    name: 'Tawakkalna (توكلنا)',
    primaryColor: '#006C35',
    logo: '/gov-tawakkalna.png',
    fonts: ['Taysir', 'Inter', 'sans-serif'],
    colors: { background: '#E8F5E9', primary: '#006C35', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-tawakkalna.svg'],
    auto_apply: true,
  },
  digital_dubai: {
    name: 'Digital Dubai',
    primaryColor: '#000000',
    logo: '/gov-digital-dubai.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F5F5F5', primary: '#000000', secondary: '#C8A961' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-digital-dubai.svg'],
    auto_apply: true,
  },
  tamm_abudhabi: {
    name: 'TAMM Abu Dhabi',
    primaryColor: '#1A1A6E',
    logo: '/gov-tamm.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F0F0FF', primary: '#1A1A6E', secondary: '#C8A961' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-tamm.svg'],
    auto_apply: true,
  },

  // ========================
  // BILLING / NATIONAL PAYMENT PORTALS
  // ========================
  tasdeed: {
    name: 'Tasdeed (تسديد)',
    primaryColor: '#005696',
    logo: '/gov-tasdeed.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#005696', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-tasdeed.svg'],
    auto_apply: true,
  },
  dubaipay: {
    name: 'DubaiPay',
    primaryColor: '#000000',
    logo: '/gov-dubaipay.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F5F5F5', primary: '#000000', secondary: '#C8A961' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-dubaipay.svg'],
    auto_apply: true,
  },
  hukoomi: {
    name: 'Hukoomi (حكومي)',
    primaryColor: '#8D1B3D',
    logo: '/gov-hukoomi.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#8D1B3D', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-hukoomi.svg'],
    auto_apply: true,
  },
  fawri: {
    name: 'Fawri (فوري)',
    primaryColor: '#CE1126',
    logo: '/gov-fawri.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#CE1126', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-fawri.svg'],
    auto_apply: true,
  },
  omannet: {
    name: 'OmanNet',
    primaryColor: '#D0032C',
    logo: '/gov-omannet.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#D0032C', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-omannet.svg'],
    auto_apply: true,
  },

  // ========================
  // BANKS (GCC)
  // ========================
  alrajhi_bank: {
    name: 'Al Rajhi Bank',
    primaryColor: '#1B3A6B',
    logo: '/bank-logos/alrajhi-bank.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F0F4F8', primary: '#1B3A6B', secondary: '#F7C24A' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-alrajhi.svg'],
    auto_apply: true,
  },
  snb: {
    name: 'SNB (Saudi National Bank)',
    primaryColor: '#1A1A6E',
    logo: '/bank-logos/snb.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F0F0FF', primary: '#1A1A6E', secondary: '#D4AF37' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-snb.svg'],
    auto_apply: true,
  },
  enbd: {
    name: 'Emirates NBD',
    primaryColor: '#F37021',
    logo: '/bank-logos/emirates-nbd.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF8F0', primary: '#F37021', secondary: '#333333' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-enbd.svg'],
    auto_apply: true,
  },
  nbk: {
    name: 'NBK (National Bank of Kuwait)',
    primaryColor: '#1A1A6E',
    logo: '/bank-logos/nbk.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F0F0FF', primary: '#1A1A6E', secondary: '#D4AF37' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-nbk.svg'],
    auto_apply: true,
  },
  qnb: {
    name: 'QNB Group',
    primaryColor: '#F7B500',
    logo: '/bank-logos/qnb.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF8E1', primary: '#F7B500', secondary: '#333333' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-qnb.svg'],
    auto_apply: true,
  },
  bank_muscat: {
    name: 'Bank Muscat',
    primaryColor: '#003A63',
    logo: '/bank-logos/bank-muscat.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#003A63', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-bank-muscat.svg'],
    auto_apply: true,
  },
  stc_pay: {
    name: 'STC Pay',
    primaryColor: '#5F259F',
    logo: '/bank-logos/stc-pay.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F3E8FF', primary: '#5F259F', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-stc-pay.svg'],
    auto_apply: true,
  },
  mada: {
    name: 'mada',
    primaryColor: '#004D8F',
    logo: '/bank-logos/mada.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#004D8F', secondary: '#69BE28' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-mada.svg'],
    auto_apply: true,
  },
  riyad_bank: {
    name: 'Riyad Bank',
    primaryColor: '#004D8F',
    logo: '/bank-logos/riyad-bank.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#004D8F', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-riyad-bank.svg'],
    auto_apply: true,
  },
  alahli_bank: {
    name: 'Al Ahli Bank',
    primaryColor: '#1A1A6E',
    logo: '/bank-logos/alahli-bank.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F0F0FF', primary: '#1A1A6E', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-alahli-bank.svg'],
    auto_apply: true,
  },
  alinma_bank: {
    name: 'Alinma Bank',
    primaryColor: '#006C35',
    logo: '/bank-logos/alinma-bank.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E8F5E9', primary: '#006C35', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-alinma-bank.svg'],
    auto_apply: true,
  },
  kfh: {
    name: 'KFH (Kuwait Finance House)',
    primaryColor: '#1A1A6E',
    logo: '/bank-logos/kfh.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F0F0FF', primary: '#1A1A6E', secondary: '#C8A961' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-kfh.svg'],
    auto_apply: true,
  },
  fab: {
    name: 'FAB (First Abu Dhabi Bank)',
    primaryColor: '#4A148C',
    logo: '/bank-logos/fab.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F3E8FF', primary: '#4A148C', secondary: '#C8A961' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-fab.svg'],
    auto_apply: true,
  },
  adib: {
    name: 'ADIB (Abu Dhabi Islamic Bank)',
    primaryColor: '#006C35',
    logo: '/bank-logos/adib.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E8F5E9', primary: '#006C35', secondary: '#FFFFFF' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-adib.svg'],
    auto_apply: true,
  },

  // ========================
  // SERVICE TYPES (Non-Shipping)
  // ========================
  government_payment: {
    name: 'Government Payment',
    primaryColor: '#F58220',
    logo: '/assets/dynamic-identity/hero-gov.svg',
    fonts: ['Taysir', 'Inter', 'sans-serif'],
    colors: { background: '#FFF8F0', primary: '#F58220', secondary: '#333333' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-gov.svg', 'hero-sadad.svg'],
    auto_apply: true,
  },
  health_links: {
    name: 'Health Services',
    primaryColor: '#00A651',
    logo: '/assets/dynamic-identity/hero-health.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E8F5E9', primary: '#00A651', secondary: '#333333' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-health.svg'],
    auto_apply: true,
  },
  chalets: {
    name: 'Chalet Booking',
    primaryColor: '#0EA5E9',
    logo: '/assets/dynamic-identity/hero-chalets.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E0F7FA', primary: '#0EA5E9', secondary: '#06B6D4' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-chalets.svg'],
    auto_apply: true,
  },
  invoices: {
    name: 'Invoice Management',
    primaryColor: '#6366F1',
    logo: '/assets/dynamic-identity/hero-invoice.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#EEF2FF', primary: '#6366F1', secondary: '#333333' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-invoice.svg'],
    auto_apply: true,
  },
  contracts: {
    name: 'Contract Management',
    primaryColor: '#8B5CF6',
    logo: '/assets/dynamic-identity/hero-contract.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F3E8FF', primary: '#8B5CF6', secondary: '#333333' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-contract.svg'],
    auto_apply: true,
  },
  local_payment: {
    name: 'Local Payment',
    primaryColor: '#0EA5E9',
    logo: '/assets/dynamic-identity/hero-local.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E0F7FA', primary: '#0EA5E9', secondary: '#06B6D4' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-local.svg'],
    auto_apply: true,
  },
  bank_pages: {
    name: 'Bank Pages',
    primaryColor: '#1B3A6B',
    logo: '/assets/dynamic-identity/hero-bank.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F0F4F8', primary: '#1B3A6B', secondary: '#F7C24A' },
    buttons: { style: 'rounded', hover: 'darken' },
    animated_header_images: ['hero-bank.svg'],
    auto_apply: true,
  },
};

/** Build the full normalized registry by applying normalizeBrandEntity to every entry */
const normalizedRegistry: Record<string, BrandObject> = {};
for (const [key, entity] of Object.entries(entityRegistry)) {
  normalizedRegistry[key] = normalizeBrandEntity({
    name: entity.name,
    primaryColor: entity.primaryColor,
    logo: entity.logo,
    fonts: entity.fonts,
    colors: entity.colors as Partial<BrandColors>,
    animated_header_images: entity.animated_header_images,
    auto_apply: entity.auto_apply,
  });
}

export function detectEntityFromURL(): string | null {
  if (typeof window === 'undefined') return null;
  const pathname = window.location.pathname;
  const parts = pathname.split('/').filter(Boolean);

  // /p/:id/:company/:currency/:amount — company is at index 2
  if (parts[0] === 'p' && parts.length >= 3) {
    const company = parts[2].toLowerCase();
    if (entityRegistry[company]) return company;
  }

  // /pay/:company/...
  if (parts[0] === 'pay' && parts.length >= 2) {
    const company = parts[1].toLowerCase();
    if (entityRegistry[company]) return company;
  }

  // Query param fallback
  const params = new URLSearchParams(window.location.search);
  const queryCompany = params.get('company') || params.get('c') || params.get('service');
  if (queryCompany) {
    const key = queryCompany.toLowerCase();
    if (entityRegistry[key]) return key;
  }

  return null;
}

export function getEntityIdentity(entityKey: string): BrandObject | null {
  const normalized = normalizedRegistry[entityKey.toLowerCase()];
  if (normalized) return normalized;
  // Fallback to raw registry if not yet normalized
  const raw = entityRegistry[entityKey.toLowerCase()];
  if (!raw) return null;
  return normalizeBrandEntity({
    name: raw.name,
    primaryColor: raw.primaryColor,
    logo: raw.logo,
    fonts: raw.fonts,
    colors: raw.colors as Partial<BrandColors>,
    animated_header_images: raw.animated_header_images,
    auto_apply: raw.auto_apply,
  });
}

export function applyDynamicIdentity(identity: DynamicIdentity | string): void {
  try {
    if (typeof identity === 'string') {
      const brand = getEntityIdentity(identity);
      if (brand) {
        applyFullBrandCSS(brand);
        return;
      }
    } else if (identity && identity.primaryColor) {
      const root = document.documentElement;
      const { h, s, l } = hexToHsl(identity.primaryColor) || { h: 0, s: 0, l: 50 };
      root.style.setProperty('--dynamic-primary-h', `${h}`);
      root.style.setProperty('--dynamic-primary-s', `${s}%`);
      root.style.setProperty('--dynamic-primary-l', `${l}%`);
      root.style.setProperty('--dynamic-primary-hsl', `${h} ${s}% ${l}%`);
      root.style.setProperty('--dynamic-primary', `hsl(${h} ${s}% ${l}%)`);
      root.style.setProperty('--dynamic-primary-hover', `hsl(${h} ${s}% ${Math.max(l - 8, 0)}%)`);
      root.style.setProperty('--dynamic-primary-active', `hsl(${h} ${s}% ${Math.max(l - 16, 0)}%)`);
      root.style.setProperty('--dynamic-primary-highlight', `hsl(${h} ${Math.round(s * 0.3)}% ${Math.min(l + 38, 96)}%)`);
      return;
    }
  } catch (err) {
    console.error('❌ applyDynamicIdentity failed:', err);
  }
}

/** Apply ALL CSS variables from a full BrandObject */
export function applyFullBrandCSS(brand: BrandObject): void {
  const root = document.documentElement;
  const { colors, fonts, gradients, shadows, borderRadius } = brand;

  try {
    // --brand-* variables
    root.style.setProperty('--brand-primary', colors.primary);
    root.style.setProperty('--brand-secondary', colors.secondary);
    root.style.setProperty('--brand-accent', colors.accent);
    root.style.setProperty('--brand-background', colors.background);
    root.style.setProperty('--brand-surface', colors.surface);
    root.style.setProperty('--brand-text', colors.text);
    root.style.setProperty('--brand-text-light', colors.textLight);
    root.style.setProperty('--brand-text-on-primary', colors.textOnPrimary);
    root.style.setProperty('--brand-border', colors.border);

    // --brand-gradient-* variables
    root.style.setProperty('--brand-gradient-primary', gradients.primary);
    root.style.setProperty('--brand-gradient-secondary', gradients.secondary);
    root.style.setProperty('--brand-gradient-header', gradients.header);

    // --brand-shadow-* variables
    root.style.setProperty('--brand-shadow-sm', shadows.sm);
    root.style.setProperty('--brand-shadow-md', shadows.md);
    root.style.setProperty('--brand-shadow-lg', shadows.lg);

    // --brand-radius-* variables
    root.style.setProperty('--brand-radius-sm', borderRadius.sm);
    root.style.setProperty('--brand-radius-md', borderRadius.md);
    root.style.setProperty('--brand-radius-lg', borderRadius.lg);

    // Legacy --dynamic-* variables (backward compatibility)
    const primaryHsl = hexToHsl(colors.primary);
    if (primaryHsl) {
      root.style.setProperty('--dynamic-primary-h', `${primaryHsl.h}`);
      root.style.setProperty('--dynamic-primary-s', `${primaryHsl.s}%`);
      root.style.setProperty('--dynamic-primary-l', `${primaryHsl.l}%`);
      root.style.setProperty('--dynamic-primary-hsl', `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
      root.style.setProperty('--dynamic-primary', `hsl(${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%)`);
      root.style.setProperty('--dynamic-primary-hover', `hsl(${primaryHsl.h} ${primaryHsl.s}% ${Math.max(primaryHsl.l - 8, 0)}%)`);
      root.style.setProperty('--dynamic-primary-active', `hsl(${primaryHsl.h} ${primaryHsl.s}% ${Math.max(primaryHsl.l - 16, 0)}%)`);
      root.style.setProperty('--dynamic-primary-highlight', `hsl(${primaryHsl.h} ${Math.round(primaryHsl.s * 0.3)}% ${Math.min(primaryHsl.l + 38, 96)}%)`);
    } else {
      root.style.setProperty('--dynamic-primary', colors.primary);
    }
    root.style.setProperty('--dynamic-secondary', colors.secondary);
    root.style.setProperty('--dynamic-background', colors.background);
    root.style.setProperty('--dynamic-font-primary', fonts.primary);
    root.style.setProperty('--dynamic-font-secondary', fonts.secondary);

    // Font application on body — safely
    if (document.body) {
      document.body.style.fontFamily = `${fonts.primaryAr}, ${fonts.primary}, sans-serif`;
    }

    console.log(`✅ Full brand applied: ${brand.name}`);
  } catch (err) {
    console.error('❌ applyFullBrandCSS failed:', err);
  }
}

export function removeDynamicIdentity(): void {
  const root = document.documentElement;
  const props = [
    // --brand-* variables
    '--brand-primary', '--brand-secondary', '--brand-accent',
    '--brand-background', '--brand-surface', '--brand-text',
    '--brand-text-light', '--brand-text-on-primary', '--brand-border',
    // --brand-gradient-* variables
    '--brand-gradient-primary', '--brand-gradient-secondary', '--brand-gradient-header',
    // --brand-shadow-* variables
    '--brand-shadow-sm', '--brand-shadow-md', '--brand-shadow-lg',
    // --brand-radius-* variables
    '--brand-radius-sm', '--brand-radius-md', '--brand-radius-lg',
    // Legacy --dynamic-* variables
    '--dynamic-primary-h', '--dynamic-primary-s', '--dynamic-primary-l',
    '--dynamic-primary-hsl', '--dynamic-primary', '--dynamic-primary-hover',
    '--dynamic-primary-active', '--dynamic-primary-highlight',
    '--dynamic-secondary', '--dynamic-background',
    '--dynamic-font-primary', '--dynamic-font-secondary',
  ];
  try {
    props.forEach(p => root.style.removeProperty(p));
  } catch (err) {
    console.error('❌ removeDynamicIdentity failed:', err);
  }
  try {
    root.removeAttribute('data-entity');
  } catch { /* ignore */ }
  try {
    if (document.body) {
      document.body.style.fontFamily = '';
    }
  } catch { /* ignore */ }
}

export { removeDynamicIdentity as resetDynamicIdentity };

export function getEntityPaymentShareImage(entityKey: string): string | null {
  const entity = entityRegistry[entityKey.toLowerCase()];
  if (!entity) return null;
  return `/og-${entityKey.toLowerCase()}.jpg`;
}

export function getBankOGImage(bankId: string): string | null {
  if (!bankId) return null;
  return `/og-bank-${bankId}.jpg`;
}

export function getEntityLogo(entityKey: string): string | null {
  const entity = entityRegistry[entityKey.toLowerCase()];
  if (!entity) return null;
  return entity.logo;
}

export function getEntityHeaderImages(entityKey: string): { images: string[]; primaryColor: string } | null {
  const entity = entityRegistry[entityKey.toLowerCase()];
  if (!entity) return null;
  return {
    images: entity.animated_header_images,
    primaryColor: entity.primaryColor,
  };
}
