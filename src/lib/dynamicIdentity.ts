import { hexToHsl } from './colorUtils';

export interface DynamicIdentity {
  primaryColor: string;
  name?: string;
}

export interface DynamicIdentityEntity {
  name: string;
  primaryColor: string;
  logo: string;
  fonts: string[];
  colors: {
    background: string;
    primary: string;
    secondary: string;
  };
  buttons: {
    style: 'rounded' | 'square' | 'pill';
  };
  animated_header_images: string[];
  auto_apply?: boolean;
}

const entityRegistry: Record<string, DynamicIdentityEntity> = {
  aramex: {
    name: 'Aramex',
    primaryColor: '#E31E40',
    logo: 'aramex-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF5F5', primary: '#E31E40', secondary: '#333333' },
    buttons: { style: 'rounded' },
    animated_header_images: ['hero-aramex.jpg'],
    auto_apply: true,
  },
  dhl: {
    name: 'DHL',
    primaryColor: '#FFCC00',
    logo: 'dhl-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFFDE7', primary: '#FFCC00', secondary: '#D40511' },
    buttons: { style: 'rounded' },
    animated_header_images: ['hero-dhl.jpg'],
    auto_apply: true,
  },
  fedex: {
    name: 'FedEx',
    primaryColor: '#4D148C',
    logo: 'fedex-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#F3E8FF', primary: '#4D148C', secondary: '#FF6200' },
    buttons: { style: 'rounded' },
    animated_header_images: ['hero-fedex.jpg'],
    auto_apply: true,
  },
  smsa: {
    name: 'SMSA Express',
    primaryColor: '#003366',
    logo: 'smsa-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E8F0FE', primary: '#003366', secondary: '#FF6600' },
    buttons: { style: 'rounded' },
    animated_header_images: ['hero-smsa.jpg'],
    auto_apply: true,
  },
  naqel: {
    name: 'Naqel Express',
    primaryColor: '#F7941D',
    logo: 'naqel-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF8E1', primary: '#F7941D', secondary: '#333333' },
    buttons: { style: 'rounded' },
    animated_header_images: ['hero-naqel.jpg'],
    auto_apply: true,
  },
  ups: {
    name: 'UPS',
    primaryColor: '#351C15',
    logo: 'ups-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#FFF3E0', primary: '#351C15', secondary: '#FFB500' },
    buttons: { style: 'rounded' },
    animated_header_images: ['hero-ups.jpg'],
    auto_apply: true,
  },
  zajil: {
    name: 'Zajil',
    primaryColor: '#0057B8',
    logo: 'zajil-logo.svg',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E3F2FD', primary: '#0057B8', secondary: '#333333' },
    buttons: { style: 'rounded' },
    animated_header_images: ['hero-zajil.jpg'],
    auto_apply: true,
  },
  empost: {
    name: 'Emirates Post',
    primaryColor: '#00573F',
    logo: 'empost-logo.png',
    fonts: ['Inter', 'sans-serif'],
    colors: { background: '#E8F5E9', primary: '#00573F', secondary: '#C8102E' },
    buttons: { style: 'rounded' },
    animated_header_images: ['hero-empost.jpg'],
    auto_apply: true,
  },
};

export function detectEntityFromURL(): string | null {
  if (typeof window === 'undefined') return null;
  const pathname = window.location.pathname;
  const parts = pathname.split('/').filter(Boolean);

  // /p/:id/:company/...
  if (parts[0] === 'p' && parts.length >= 2) {
    const company = parts[1].toLowerCase();
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

export function getEntityIdentity(entityKey: string): DynamicIdentityEntity | null {
  return entityRegistry[entityKey.toLowerCase()] || null;
}

export function applyDynamicIdentity(identity: DynamicIdentity | string): void {
  const root = document.documentElement;
  const color = typeof identity === 'string' ? identity : identity.primaryColor;
  try {
    const { h, s, l } = hexToHsl(color);
    root.style.setProperty('--dynamic-primary-h', `${h}`);
    root.style.setProperty('--dynamic-primary-s', `${s}%`);
    root.style.setProperty('--dynamic-primary-l', `${l}%`);
    root.style.setProperty('--dynamic-primary-hsl', `${h} ${s}% ${l}%`);
    root.style.setProperty('--dynamic-primary', `hsl(${h} ${s}% ${l}%)`);
    root.style.setProperty('--dynamic-primary-hover', `hsl(${h} ${s}% ${Math.max(l - 8, 0)}%)`);
    root.style.setProperty('--dynamic-primary-active', `hsl(${h} ${s}% ${Math.max(l - 16, 0)}%)`);
    root.style.setProperty('--dynamic-primary-highlight', `hsl(${h} ${Math.round(s * 0.3)}% ${Math.min(l + 38, 96)}%)`);
    console.log(`✅ Identity applied: hsl(${h}, ${s}%, ${l}%)`);
  } catch (err) {
    console.error('❌ HSL injection failed:', err);
  }
}

export function removeDynamicIdentity(): void {
  const props = [
    '--dynamic-primary-h','--dynamic-primary-s','--dynamic-primary-l',
    '--dynamic-primary-hsl','--dynamic-primary','--dynamic-primary-hover',
    '--dynamic-primary-active','--dynamic-primary-highlight',
  ];
  props.forEach(p => document.documentElement.style.removeProperty(p));
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
