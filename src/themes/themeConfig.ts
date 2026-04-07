import { CreditCard, Building2, Truck, Plane } from 'lucide-react';

export type CourierID =
  | 'fedex' | 'dhl' | 'aramex' | 'ups' | 'smsa' | 'spl'
  | 'imile' | 'jt' | 'aymakan' | 'postaplus' | 'ubex'
  | 'emirates_post' | 'zajil' | 'naqel';

export interface ThemeConfig {
  id: CourierID;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  logo: string; // Path to logo image
  direction: 'rtl' | 'ltr';
}

// Alias for backward compatibility
export type CompanyTheme = ThemeConfig;

export const couriers: Record<CourierID, ThemeConfig> = {
  fedex: {
    id: 'fedex',
    name: 'FedEx',
    colors: { primary: '#4D148C', secondary: '#FF6600', accent: '#FFFFFF', text: '#1F2937' },
    logo: '/logos/fedex-logo.png',
    direction: 'rtl'
  },
  dhl: {
    id: 'dhl',
    name: 'DHL',
    colors: { primary: '#FFCC00', secondary: '#D40511', accent: '#000000', text: '#1F2937' },
    logo: '/logos/dhl-logo.svg',
    direction: 'rtl'
  },
  aramex: {
    id: 'aramex',
    name: 'Aramex',
    colors: { primary: '#D22128', secondary: '#313131', accent: '#FFFFFF', text: '#1F2937' },
    logo: '/logos/aramex-logo.svg',
    direction: 'rtl'
  },
  ups: {
    id: 'ups',
    name: 'UPS',
    colors: { primary: '#351C15', secondary: '#FFB500', accent: '#FFFFFF', text: '#1F2937' },
    logo: '/logos/ups-logo.svg',
    direction: 'rtl'
  },
  smsa: {
    id: 'smsa',
    name: 'SMSA Express',
    colors: { primary: '#0066CC', secondary: '#FF6600', accent: '#FFFFFF', text: '#1F2937' },
    logo: '/logos/smsa-logo.png',
    direction: 'rtl'
  },
  spl: {
    id: 'spl',
    name: 'SPL',
    colors: { primary: '#0066CC', secondary: '#FF6600', accent: '#FFFFFF', text: '#1F2937' },
    logo: '/logos/spl-logo.png',
    direction: 'rtl'
  },
  // ADD THESE 5 MISSING GULF COURIERS:
  imile: {
    id: 'imile',
    name: 'iMile',
    colors: { primary: '#FF0000', secondary: '#000000', accent: '#FFF0F0', text: '#1F2937' },
    logo: '/logos/imile.png',
    direction: 'rtl'
  },
  jt: {
    id: 'jt',
    name: 'J&T Express',
    colors: { primary: '#E60012', secondary: '#FFFFFF', accent: '#FEF2F2', text: '#1F2937' },
    logo: '/logos/jt.png',
    direction: 'rtl'
  },
  aymakan: {
    id: 'aymakan',
    name: 'Ay Makan',
    colors: { primary: '#F37021', secondary: '#231F20', accent: '#FFF7ED', text: '#1F2937' },
    logo: '/logos/aymakan.png',
    direction: 'rtl'
  },
  postaplus: {
    id: 'postaplus',
    name: 'Postaplus',
    colors: { primary: '#002E6D', secondary: '#F58220', accent: '#EFF6FF', text: '#1F2937' },
    logo: '/logos/postaplus.png',
    direction: 'rtl'
  },
  ubex: {
    id: 'ubex',
    name: 'Ubex',
    colors: { primary: '#EA1D2D', secondary: '#231F20', accent: '#FEF2F2', text: '#1F2937' },
    logo: '/logos/ubex.png',
    direction: 'rtl'
  },
  emirates_post: {
    id: 'emirates_post',
    name: 'Emirates Post',
    colors: { primary: '#C8102E', secondary: '#003087', accent: '#FFFFFF', text: '#1F2937' },
    logo: '/logos/emirates-post-logo.png',
    direction: 'rtl'
  },
  zajil: {
    id: 'zajil',
    name: 'Zajil',
    colors: { primary: '#1C4587', secondary: '#FF9900', accent: '#FFFFFF', text: '#1F2937' },
    logo: '/logos/zajil-logo.png',
    direction: 'rtl'
  },
  naqel: {
    id: 'naqel',
    name: 'Naqel Express',
    colors: { primary: '#0052A3', secondary: '#FF6B00', accent: '#FFFFFF', text: '#1F2937' },
    logo: '/logos/naqel-logo.png',
    direction: 'rtl'
  }
};

// LOGIC: Get currency based on country code (From payment-omar)
export const getCurrency = (countryCode: string): string => {
  const map: Record<string, string> = {
    'SA': 'SAR',
    'AE': 'AED',
    'KW': 'KWD',
    'QA': 'QAR',
    'OM': 'OMR',
    'BH': 'BHD'
  };
  return map[countryCode?.toUpperCase()] || 'SAR';
};

// Get theme configuration by courier ID
export const getThemeById = (id: CourierID): ThemeConfig => {
  return couriers[id];
};
