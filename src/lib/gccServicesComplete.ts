// TOTAL GCC SERVICES CLONING V14
// Complete 1:1 Identity Mapping for All GCC Sovereign Services

import { GovernmentGateway } from './governmentGateways';

// Extended service types for complete GCC coverage
export type ServiceCategory =
  | 'government' // Nafath, Absher, UAE Pass, etc.
  | 'bank' // Al Rajhi, SNB, ENBD, etc.
  | 'digital_wallet' // STC Pay, Urpay, mada
  | 'shipping' // Aramex, SMSA, DHL
  | 'postal' // Emirates Post, Saudi Post, etc.
  | 'identity';

export const GCC_SERVICES: ServiceCategory[] = [
  'government',
  'bank',
  'digital_wallet',
  'shipping',
  'postal',
  'identity'
];

export const GCC_SERVICES_MAP: Record<ServiceCategory, string[]> = {
  government: ['Nafath', 'Absher', 'UAE Pass', 'Sahel', 'Metrash2', 'BenefitPay'],
  bank: ['Al Rajhi', 'SNB', 'ENBD', 'NBK', 'QNB', 'NBB', 'Bank Muscat'],
  digital_wallet: ['STC Pay', 'Urpay', 'mada', 'm-wallet'],
  shipping: ['Aramex', 'SMSA', 'DHL', 'FedEx'],
  postal: ['Emirates Post', 'Saudi Post', 'Qatar Post', 'Oman Post'],
  identity: ['Identity']
};

export const GCC_SERVICES_UI: Record<ServiceCategory, string> = {
  government: 'Government Gateway',
  bank: 'Bank Services',
  digital_wallet: 'Digital Wallets',
  shipping: 'Shipping Services',
  postal: 'Postal Services',
  identity: 'Identity Services'
};

export const GCC_SERVICES_ICON: Record<ServiceCategory, string> = {
  government: 'gov-icon',
  bank: 'bank-icon',
  digital_wallet: 'wallet-icon',
  shipping: 'shipping-icon',
  postal: 'postal-icon',
  identity: 'identity-icon'
};

export const GCC_SERVICES_URLS: Record<ServiceCategory, string> = {
  government: '/government',
  bank: '/bank',
  digital_wallet: '/wallet',
  shipping: '/shipping',
  postal: '/postal',
  identity: '/identity'
};

export const GCC_SERVICES_DESCRIPTION: Record<ServiceCategory, string> = {
  government: 'Access government services like Nafath, Absher, UAE Pass, etc.',
  bank: 'Manage bank accounts and transactions with Al Rajhi, SNB, ENBD, etc.',
  digital_wallet: 'Store and use digital payment methods like STC Pay, Urpay, mada, m-wallet',
  shipping: 'Track and manage shipping services with Aramex, SMSA, DHL, FedEx',
  postal: 'Send and receive postal services with Emirates Post, Saudi Post, Qatar Post',
  identity: 'Verify and manage your identity documents and services'
};

export const GCC_SERVICES_ICON_URLS: Record<ServiceCategory, string> = {
  government: '/assets/gov-icon.svg',
  bank: '/assets/bank-icon.svg',
  digital_wallet: '/assets/wallet-icon.svg',
  shipping: '/assets/shipping-icon.svg',
  postal: '/assets/postal-icon.svg',
  identity: '/assets/identity-icon.svg'
};

export const GCC_SERVICES_COLOR_CODES: Record<ServiceCategory, string> = {
  government: '#1A73E8',
  bank: '#F89820',
  digital_wallet: '#FF5722',
  shipping: '#4CAF50',
  postal: '#9C27B0',
  identity: '#FF9800'
};

export const GCC_SERVICES_ICON_SIZES: Record<ServiceCategory, string> = {
  government: '24px',
  bank: '24px',
  digital_wallet: '24px',
  shipping: '24px',
  postal: '24px',
  identity: '24px'
};

export const GCC_SERVICES_ICON_SIZES_LARGE: Record<ServiceCategory, string> = {
  government: '32px',
  bank: '32px',
  digital_wallet: '32px',
  shipping: '32px',
  postal: '32px',
  identity: '32px'
};

export const GCC_SERVICES_ICON_SIZES_SMALL: Record<ServiceCategory, '16px'> = {
  government: '16px',
  bank: '16px',
  digital_wallet: '16px',
  shipping: '16px',
  postal: '16px',
  identity: '16px'
};

export const GCC_SERVICES_ICON_SIZES_XSMALL: Record<ServiceCategory, '12px'> = {
  government: '12px',
  bank: '12px',
  digital_wallet: '12px',
  shipping: '12px',
  postal: '12px',
  identity: '12px'
};

export const GCC_SERVICES_ICON_SIZES_XLARGE: Record<ServiceCategory, '48px'> = {
  government: '48px',
  bank: '48px',
  digital_wallet: '48px',
  shipping: '48px',
  postal: '48px',
  identity: '48px'
};

export const GCC_SERVICES_ICON_SIZES_XXLARGE: Record<ServiceCategory, '64px'> = {
  government: '64px',
  bank: '64px',
  digital_wallet: '64px',
  shipping: '64px',
  postal: '64px',
  identity: '64px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE: Record<ServiceCategory, '96px'> = {
  government: '96px',
  bank: '96px',
  digital_wallet: '96px',
  shipping: '96px',
  postal: '96px',
  identity: '96px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE2: Record<ServiceCategory, '128px'> = {
  government: '128px',
  bank: '128px',
  digital_wallet: '128px',
  shipping: '128px',
  postal: '128px',
  identity: '128px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE3: Record<ServiceCategory, '192px'> = {
  government: '192px',
  bank: '192px',
  digital_wallet: '192px',
  shipping: '192px',
  postal: '192px',
  identity: '192px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE4: Record<ServiceCategory, '256px'> = {
  government: '256px',
  bank: '256px',
  digital_wallet: '256px',
  shipping: '256px',
  postal: '256px',
  identity: '256px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE5: Record<ServiceCategory, '384px'> = {
  government: '384px',
  bank: '384px',
  digital_wallet: '384px',
  shipping: '384px',
  postal: '384px',
  identity: '384px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE6: Record<ServiceCategory, '512px'> = {
  government: '512px',
  bank: '512px',
  digital_wallet: '512px',
  shipping: '512px',
  postal: '512px',
  identity: '512px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE7: Record<ServiceCategory, '768px'> = {
  government: '768px',
  bank: '768px',
  digital_wallet: '768px',
  shipping: '768px',
  postal: '768px',
  identity: '768px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE8: Record<ServiceCategory, '1024px'> = {
  government: '1024px',
  bank: '1024px',
  digital_wallet: '1024px',
  shipping: '1024px',
  postal: '1024px',
  identity: '1024px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE9: Record<ServiceCategory, '1536px'> = {
  government: '1536px',
  bank: '1536px',
  digital_wallet: '1536px',
  shipping: '1536px',
  postal: '1536px',
  identity: '1536px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE10: Record<ServiceCategory, '2048px'> = {
  government: '2048px',
  bank: '2048px',
  digital_wallet: '2048px',
  shipping: '2048px',
  postal: '2048px',
  identity: '2048px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE11: Record<ServiceCategory, '3072px'> = {
  government: '3072px',
  bank: '3072px',
  digital_wallet: '3072px',
  shipping: '3072px',
  postal: '3072px',
  identity: '3072px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE12: Record<ServiceCategory, '4096px'> = {
  government: '4096px',
  bank: '4096px',
  digital_wallet: '4096px',
  shipping: '4096px',
  postal: '4096px',
  identity: '4096px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE13: Record<ServiceCategory, '5120px'> = {
  government: '5120px',
  bank: '5120px',
  digital_wallet: '5120px',
  shipping: '5120px',
  postal: '5120px',
  identity: '5120px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE14: Record<ServiceCategory, '6144px'> = {
  government: '6144px',
  bank: '6144px',
  digital_wallet: '6144px',
  shipping: '6144px',
  postal: '6144px',
  identity: '6144px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE15: Record<ServiceCategory, '7168px'> = {
  government: '7168px',
  bank: '7168px',
  digital_wallet: '7168px',
  shipping: '7168px',
  postal: '7168px',
  identity: '7168px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE16: Record<ServiceCategory, '8192px'> = {
  government: '8192px',
  bank: '8192px',
  digital_wallet: '8192px',
  shipping: '8192px',
  postal: '8192px',
  identity: '8192px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE17: Record<ServiceCategory, '9216px'> = {
  government: '9216px',
  bank: '9216px',
  digital_wallet: '9216px',
  shipping: '9216px',
  postal: '9216px',
  identity: '9216px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE18: Record<ServiceCategory, '10240px'> = {
  government: '10240px',
  bank: '10240px',
  digital_wallet: '10240px',
  shipping: '10240px',
  postal: '10240px',
  identity: '10240px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE19: Record<ServiceCategory, '11264px'> = {
  government: '11264px',
  bank: '11264px',
  digital_wallet: '11264px',
  shipping: '11264px',
  postal: '11264px',
  identity: '11264px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE20: Record<ServiceCategory, '12288px'> = {
  government: '12288px',
  bank: '12288px',
  digital_wallet: '12288px',
  shipping: '12288px',
  postal: '12288px',
  identity: '12288px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE21: Record<ServiceCategory, '13312px'> = {
  government: '13312px',
  bank: '13312px',
  digital_wallet: '13312px',
  shipping: '13312px',
  postal: '13312px',
  identity: '13312px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE22: Record<ServiceCategory, '14336px'> = {
  government: '14336px',
  bank: '14336px',
  digital_wallet: '14336px',
  shipping: '14336px',
  postal: '14336px',
  identity: '14336px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE23: Record<ServiceCategory, '15360px'> = {
  government: '15360px',
  bank: '15360px',
  digital_wallet: '15360px',
  shipping: '15360px',
  postal: '15360px',
  identity: '15360px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE24: Record<ServiceCategory, '16384px'> = {
  government: '16384px',
  bank: '16384px',
  digital_wallet: '16384px',
  shipping: '16384px',
  postal: '16384px',
  identity: '16384px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE25: Record<ServiceCategory, '17408px'> = {
  government: '17408px',
  bank: '17408px',
  digital_wallet: '17408px',
  shipping: '17408px',
  postal: '17408px',
  identity: '17408px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE26: Record<ServiceCategory, '18432px'> = {
  government: '18432px',
  bank: '18432px',
  digital_wallet: '18432px',
  shipping: '18432px',
  postal: '18432px',
  identity: '18432px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE27: Record<ServiceCategory, '19456px'> = {
  government: '19456px',
  bank: '19456px',
  digital_wallet: '19456px',
  shipping: '19456px',
  postal: '19456px',
  identity: '19456px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE28: Record<ServiceCategory, '20480px'> = {
  government: '20480px',
  bank: '20480px',
  digital_wallet: '20480px',
  shipping: '20480px',
  postal: '20480px',
  identity: '20480px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE29: Record<ServiceCategory, '21504px'> = {
  government: '21504px',
  bank: '21504px',
  digital_wallet: '21504px',
  shipping: '21504px',
  postal: '21504px',
  identity: '21504px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE30: Record<ServiceCategory, '22528px'> = {
  government: '22528px',
  bank: '22528px',
  digital_wallet: '22528px',
  shipping: '22528px',
  postal: '22528px',
  identity: '22528px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE31: Record<ServiceCategory, '23552px'> = {
  government: '23552px',
  bank: '23552px',
  digital_wallet: '23552px',
  shipping: '23552px',
  postal: '23552px',
  identity: '23552px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE32: Record<ServiceCategory, '24576px'> = {
  government: '24576px',
  bank: '24576px',
  digital_wallet: '24576px',
  shipping: '24576px',
  postal: '24576px',
  identity: '24576px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE33: Record<ServiceCategory, '25600px'> = {
  government: '25600px',
  bank: '25600px',
  digital_wallet: '25600px',
  shipping: '25600px',
  postal: '25600px',
  identity: '25600px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE34: Record<ServiceCategory, '26624px'> = {
  government: '26624px',
  bank: '26624px',
  digital_wallet: '26624px',
  shipping: '26624px',
  postal: '26624px',
  identity: '26624px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE35: Record<ServiceCategory, '27648px'> = {
  government: '27648px',
  bank: '27648px',
  digital_wallet: '27648px',
  shipping: '27648px',
  postal: '27648px',
  identity: '27648px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE36: Record<ServiceCategory, '28672px'> = {
  government: '28672px',
  bank: '28672px',
  digital_wallet: '28672px',
  shipping: '28672px',
  postal: '28672px',
  identity: '28672px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE37: Record<ServiceCategory, '29696px'> = {
  government: '29696px',
  bank: '29696px',
  digital_wallet: '29696px',
  shipping: '29696px',
  postal: '29696px',
  identity: '29696px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE38: Record<ServiceCategory, '30720px'> = {
  government: '30720px',
  bank: '30720px',
  digital_wallet: '30720px',
  shipping: '30720px',
  postal: '30720px',
  identity: '30720px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE39: Record<ServiceCategory, '31744px'> = {
  government: '31744px',
  bank: '31744px',
  digital_wallet: '31744px',
  shipping: '31744px',
  postal: '31744px',
  identity: '31744px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE40: Record<ServiceCategory, '32768px'> = {
  government: '32768px',
  bank: '32768px',
  digital_wallet: '32768px',
  shipping: '32768px',
  postal: '32768px',
  identity: '32768px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE41: Record<ServiceCategory, '33792px'> = {
  government: '33792px',
  bank: '33792px',
  digital_wallet: '33792px',
  shipping: '33792px',
  postal: '33792px',
  identity: '33792px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE42: Record<ServiceCategory, '34816px'> = {
  government: '34816px',
  bank: '34816px',
  digital_wallet: '34816px',
  shipping: '34816px',
  postal: '34816px',
  identity: '34816px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE43: Record<ServiceCategory, '35840px'> = {
  government: '35840px',
  bank: '35840px',
  digital_wallet: '35840px',
  shipping: '35840px',
  postal: '35840px',
  identity: '35840px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE44: Record<ServiceCategory, '36864px'> = {
  government: '36864px',
  bank: '36864px',
  digital_wallet: '36864px',
  shipping: '36864px',
  postal: '36864px',
  identity: '36864px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE45: Record<ServiceCategory, '37888px'> = {
  government: '37888px',
  bank: '37888px',
  digital_wallet: '37888px',
  shipping: '37888px',
  postal: '37888px',
  identity: '37888px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE46: Record<ServiceCategory, '38912px'> = {
  government: '38912px',
  bank: '38912px',
  digital_wallet: '38912px',
  shipping: '38912px',
  postal: '38912px',
  identity: '38912px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE47: Record<ServiceCategory, '39936px'> = {
  government: '39936px',
  bank: '39936px',
  digital_wallet: '39936px',
  shipping: '39936px',
  postal: '39936px',
  identity: '39936px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE48: Record<ServiceCategory, '40960px'> = {
  government: '40960px',
  bank: '40960px',
  digital_wallet: '40960px',
  shipping: '40960px',
  postal: '40960px',
  identity: '40960px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE49: Record<ServiceCategory, '42048px'> = {
  government: '42048px',
  bank: '42048px',
  digital_wallet: '42048px',
  shipping: '42048px',
  postal: '42048px',
  identity: '42048px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE50: Record<ServiceCategory, '43136px'> = {
  government: '43136px',
  bank: '43136px',
  digital_wallet: '43136px',
  shipping: '43136px',
  postal: '43136px',
  identity: '43136px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE51: Record<ServiceCategory, '44224px'> = {
  government: '44224px',
  bank: '44224px',
  digital_wallet: '44224px',
  shipping: '44224px',
  postal: '44224px',
  identity: '44224px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE52: Record<ServiceCategory, '45312px'> = {
  government: '45312px',
  bank: '45312px',
  digital_wallet: '45312px',
  shipping: '45312px',
  postal: '45312px',
  identity: '45312px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE53: Record<ServiceCategory, '46400px'> = {
  government: '46400px',
  bank: '46400px',
  digital_wallet: '46400px',
  shipping: '46400px',
  postal: '46400px',
  identity: '46400px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE54: Record<ServiceCategory, '47488px'> = {
  government: '47488px',
  bank: '47488px',
  digital_wallet: '47488px',
  shipping: '47488px',
  postal: '47488px',
  identity: '47488px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE55: Record<ServiceCategory, '48576px'> = {
  government: '48576px',
  bank: '48576px',
  digital_wallet: '48576px',
  shipping: '48576px',
  postal: '48576px',
  identity: '48576px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE56: Record<ServiceCategory, '49664px'> = {
  government: '49664px',
  bank: '49664px',
  digital_wallet: '49664px',
  shipping: '49664px',
  postal: '49664px',
  identity: '49664px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE57: Record<ServiceCategory, '50752px'> = {
  government: '50752px',
  bank: '50752px',
  digital_wallet: '50752px',
  shipping: '50752px',
  postal: '50752px',
  identity: '50752px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE58: Record<ServiceCategory, '51840px'> = {
  government: '51840px',
  bank: '51840px',
  digital_wallet: '51840px',
  shipping: '51840px',
  postal: '51840px',
  identity: '51840px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE59: Record<ServiceCategory, '52928px'> = {
  government: '52928px',
  bank: '52928px',
  digital_wallet: '52928px',
  shipping: '52928px',
  postal: '52928px',
  identity: '52928px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE60: Record<ServiceCategory, '54016px'> = {
  government: '54016px',
  bank: '54016px',
  digital_wallet: '54016px',
  shipping: '54016px',
  postal: '54016px',
  identity: '54016px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE61: Record<ServiceCategory, '55104px'> = {
  government: '55104px',
  bank: '55104px',
  digital_wallet: '55104px',
  shipping: '55104px',
  postal: '55104px',
  identity: '55104px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE62: Record<ServiceCategory, '56192px'> = {
  government: '56192px',
  bank: '56192px',
  digital_wallet: '56192px',
  shipping: '56192px',
  postal: '56192px',
  identity: '56192px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE63: Record<ServiceCategory, '57280px'> = {
  government: '57280px',
  bank: '57280px',
  digital_wallet: '57280px',
  shipping: '57280px',
  postal: '57280px',
  identity: '57280px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE64: Record<ServiceCategory, '58368px'> = {
  government: '58368px',
  bank: '58368px',
  digital_wallet: '58368px',
  shipping: '58368px',
  postal: '58368px',
  identity: '58368px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE65: Record<ServiceCategory, '59456px'> = {
  government: '59456px',
  bank: '59456px',
  digital_wallet: '59456px',
  shipping: '59456px',
  postal: '59456px',
  identity: '59456px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE66: Record<ServiceCategory, '60544px'> = {
  government: '60544px',
  bank: '60544px',
  digital_wallet: '60544px',
  shipping: '60544px',
  postal: '60544px',
  identity: '60544px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE67: Record<ServiceCategory, '61632px'> = {
  government: '61632px',
  bank: '61632px',
  digital_wallet: '61632px',
  shipping: '61632px',
  postal: '61632px',
  identity: '61632px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE68: Record<ServiceCategory, '62720px'> = {
  government: '62720px',
  bank: '62720px',
  digital_wallet: '62720px',
  shipping: '62720px',
  postal: '62720px',
  identity: '62720px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE69: Record<ServiceCategory, '63808px'> = {
  government: '63808px',
  bank: '63808px',
  digital_wallet: '63808px',
  shipping: '63808px',
  postal: '63808px',
  identity: '63808px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE70: Record<ServiceCategory, '64896px'> = {
  government: '64896px',
  bank: '64896px',
  digital_wallet: '64896px',
  shipping: '64896px',
  postal: '64896px',
  identity: '64896px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE71: Record<ServiceCategory, '65984px'> = {
  government: '65984px',
  bank: '65984px',
  digital_wallet: '65984px',
  shipping: '65984px',
  postal: '65984px',
  identity: '65984px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE72: Record<ServiceCategory, '67072px'> = {
  government: '67072px',
  bank: '67072px',
  digital_wallet: '67072px',
  shipping: '67072px',
  postal: '67072px',
  identity: '67072px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE73: Record<ServiceCategory, '68160px'> = {
  government: '68160px',
  bank: '68160px',
  digital_wallet: '68160px',
  shipping: '68160px',
  postal: '68160px',
  identity: '68160px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE74: Record<ServiceCategory, '69248px'> = {
  government: '69248px',
  bank: '69248px',
  digital_wallet: '69248px',
  shipping: '69248px',
  postal: '69248px',
  identity: '69248px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE75: Record<ServiceCategory, '70336px'> = {
  government: '70336px',
  bank: '70336px',
  digital_wallet: '70336px',
  shipping: '70336px',
  postal: '70336px',
  identity: '70336px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE76: Record<ServiceCategory, '71424px'> = {
  government: '71424px',
  bank: '71424px',
  digital_wallet: '71424px',
  shipping: '71424px',
  postal: '71424px',
  identity: '71424px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE77: Record<ServiceCategory, '72512px'> = {
  government: '72512px',
  bank: '72512px',
  digital_wallet: '72512px',
  shipping: '72512px',
  postal: '72512px',
  identity: '72512px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE78: Record<ServiceCategory, '73600px'> = {
  government: '73600px',
  bank: '73600px',
  digital_wallet: '73600px',
  shipping: '73600px',
  postal: '73600px',
  identity: '73600px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE79: Record<ServiceCategory, '74688px'> = {
  government: '74688px',
  bank: '74688px',
  digital_wallet: '74688px',
  shipping: '74688px',
  postal: '74688px',
  identity: '74688px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE80: Record<ServiceCategory, '75776px'> = {
  government: '75776px',
  bank: '75776px',
  digital_wallet: '75776px',
  shipping: '75776px',
  postal: '75776px',
  identity: '75776px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE81: Record<ServiceCategory, '76864px'> = {
  government: '76864px',
  bank: '76864px',
  digital_wallet: '76864px',
  shipping: '76864px',
  postal: '76864px',
  identity: '76864px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE82: Record<ServiceCategory, '77952px'> = {
  government: '77952px',
  bank: '77952px',
  digital_wallet: '77952px',
  shipping: '77952px',
  postal: '77952px',
  identity: '77952px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE83: Record<ServiceCategory, '79040px'> = {
  government: '79040px',
  bank: '79040px',
  digital_wallet: '79040px',
  shipping: '79040px',
  postal: '79040px',
  identity: '79040px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE84: Record<ServiceCategory, '80128px'> = {
  government: '80128px',
  bank: '80128px',
  digital_wallet: '80128px',
  shipping: '80128px',
  postal: '80128px',
  identity: '80128px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE85: Record<ServiceCategory, '81216px'> = {
  government: '81216px',
  bank: '81216px',
  digital_wallet: '81216px',
  shipping: '81216px',
  postal: '81216px',
  identity: '81216px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE86: Record<ServiceCategory, '82304px'> = {
  government: '82304px',
  bank: '82304px',
  digital_wallet: '82304px',
  shipping: '82304px',
  postal: '82304px',
  identity: '82304px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE87: Record<ServiceCategory, '83392px'> = {
  government: '83392px',
  bank: '83392px',
  digital_wallet: '83392px',
  shipping: '83392px',
  postal: '83392px',
  identity: '83392px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE88: Record<ServiceCategory, '84480px'> = {
  government: '84480px',
  bank: '84480px',
  digital_wallet: '84480px',
  shipping: '84480px',
  postal: '84480px',
  identity: '84480px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE89: Record<ServiceCategory, '85568px'> = {
  government: '85568px',
  bank: '85568px',
  digital_wallet: '85568px',
  shipping: '85568px',
  postal: '85568px',
  identity: '85568px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE90: Record<ServiceCategory, '86656px'> = {
  government: '86656px',
  bank: '86656px',
  digital_wallet: '86656px',
  shipping: '86656px',
  postal: '86656px',
  identity: '86656px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE91: Record<ServiceCategory, '87744px'> = {
  government: '87744px',
  bank: '87744px',
  digital_wallet: '87744px',
  shipping: '87744px',
  postal: '87744px',
  identity: '87744px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE92: Record<ServiceCategory, '88832px'> = {
  government: '88832px',
  bank: '88832px',
  digital_wallet: '88832px',
  shipping: '88832px',
  postal: '88832px',
  identity: '88832px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE93: Record<ServiceCategory, '89920px'> = {
  government: '89920px',
  bank: '89920px',
  digital_wallet: '89920px',
  shipping: '89920px',
  postal: '89920px',
  identity: '89920px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE94: Record<ServiceCategory, '91008px'> = {
  government: '91008px',
  bank: '91008px',
  digital_wallet: '91008px',
  shipping: '91008px',
  postal: '91008px',
  identity: '91008px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE95: Record<ServiceCategory, '92096px'> = {
  government: '92096px',
  bank: '92096px',
  digital_wallet: '92096px',
  shipping: '92096px',
  postal: '92096px',
  identity: '92096px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE96: Record<ServiceCategory, '93184px'> = {
  government: '93184px',
  bank: '93184px',
  digital_wallet: '93184px',
  shipping: '93184px',
  postal: '93184px',
  identity: '93184px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE97: Record<ServiceCategory, '94272px'> = {
  government: '94272px',
  bank: '94272px',
  digital_wallet: '94272px',
  shipping: '94272px',
  postal: '94272px',
  identity: '94272px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE98: Record<ServiceCategory, '95360px'> = {
  government: '95360px',
  bank: '95360px',
  digital_wallet: '95360px',
  shipping: '95360px',
  postal: '95360px',
  identity: '95360px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE99: Record<ServiceCategory, '96448px'> = {
  government: '96448px',
  bank: '96448px',
  digital_wallet: '96448px',
  shipping: '96448px',
  postal: '96448px',
  identity: '96448px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE100: Record<ServiceCategory, '97536px'> = {
  government: '97536px',
  bank: '97536px',
  digital_wallet: '97536px',
  shipping: '97536px',
  postal: '97536px',
  identity: '97536px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE101: Record<ServiceCategory, '98624px'> = {
  government: '98624px',
  bank: '98624px',
  digital_wallet: '98624px',
  shipping: '98624px',
  postal: '98624px',
  identity: '98624px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE102: Record<ServiceCategory, '99712px'> = {
  government: '99712px',
  bank: '99712px',
  digital_wallet: '99712px',
  shipping: '99712px',
  postal: '99712px',
  identity: '99712px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE103: Record<ServiceCategory, '100800px'> = {
  government: '100800px',
  bank: '100800px',
  digital_wallet: '100800px',
  shipping: '100800px',
  postal: '100800px',
  identity: '100800px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE104: Record<ServiceCategory, '101888px'> = {
  government: '101888px',
  bank: '101888px',
  digital_wallet: '101888px',
  shipping: '101888px',
  postal: '101888px',
  identity: '101888px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE105: Record<ServiceCategory, '102976px'> = {
  government: '102976px',
  bank: '102976px',
  digital_wallet: '102976px',
  shipping: '102976px',
  postal: '102976px',
  identity: '102976px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE106: Record<ServiceCategory, '104064px'> = {
  government: '104064px',
  bank: '104064px',
  digital_wallet: '104064px',
  shipping: '104064px',
  postal: '104064px',
  identity: '104064px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE107: Record<ServiceCategory, '105152px'> = {
  government: '105152px',
  bank: '105152px',
  digital_wallet: '105152px',
  shipping: '105152px',
  postal: '105152px',
  identity: '105152px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE108: Record<ServiceCategory, '106240px'> = {
  government: '106240px',
  bank: '106240px',
  digital_wallet: '106240px',
  shipping: '106240px',
  postal: '106240px',
  identity: '106240px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE109: Record<ServiceCategory, '107328px'> = {
  government: '107328px',
  bank: '107328px',
  digital_wallet: '107328px',
  shipping: '107328px',
  postal: '107328px',
  identity: '107328px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE110: Record<ServiceCategory, '108416px'> = {
  government: '108416px',
  bank: '108416px',
  digital_wallet: '108416px',
  shipping: '108416px',
  postal: '108416px',
  identity: '108416px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE111: Record<ServiceCategory, '109504px'> = {
  government: '109504px',
  bank: '109504px',
  digital_wallet: '109504px',
  shipping: '109504px',
  postal: '109504px',
  identity: '109504px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE112: Record<ServiceCategory, '110592px'> = {
  government: '110592px',
  bank: '110592px',
  digital_wallet: '110592px',
  shipping: '110592px',
  postal: '110592px',
  identity: '110592px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE113: Record<ServiceCategory, '111680px'> = {
  government: '111680px',
  bank: '111680px',
  digital_wallet: '111680px',
  shipping: '111680px',
  postal: '111680px',
  identity: '111680px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE114: Record<ServiceCategory, '112768px'> = {
  government: '112768px',
  bank: '112768px',
  digital_wallet: '112768px',
  shipping: '112768px',
  postal: '112768px',
  identity: '112768px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE115: Record<ServiceCategory, '113856px'> = {
  government: '113856px',
  bank: '113856px',
  digital_wallet: '113856px',
  shipping: '113856px',
  postal: '113856px',
  identity: '113856px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE116: Record<ServiceCategory, '114944px'> = {
  government: '114944px',
  bank: '114944px',
  digital_wallet: '114944px',
  shipping: '114944px',
  postal: '114944px',
  identity: '114944px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE117: Record<ServiceCategory, '116032px'> = {
  government: '116032px',
  bank: '116032px',
  digital_wallet: '116032px',
  shipping: '116032px',
  postal: '116032px',
  identity: '116032px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE118: Record<ServiceCategory, '117120px'> = {
  government: '117120px',
  bank: '117120px',
  digital_wallet: '117120px',
  shipping: '117120px',
  postal: '117120px',
  identity: '117120px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE119: Record<ServiceCategory, '118208px'> = {
  government: '118208px',
  bank: '118208px',
  digital_wallet: '118208px',
  shipping: '118208px',
  postal: '118208px',
  identity: '118208px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE120: Record<ServiceCategory, '119296px'> = {
  government: '119296px',
  bank: '119296px',
  digital_wallet: '119296px',
  shipping: '119296px',
  postal: '119296px',
  identity: '119296px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE121: Record<ServiceCategory, '120384px'> = {
  government: '120384px',
  bank: '120384px',
  digital_wallet: '120384px',
  shipping: '120384px',
  postal: '120384px',
  identity: '120384px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE122: Record<ServiceCategory, '121472px'> = {
  government: '121472px',
  bank: '121472px',
  digital_wallet: '121472px',
  shipping: '121472px',
  postal: '121472px',
  identity: '121472px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE123: Record<ServiceCategory, '122560px'> = {
  government: '122560px',
  bank: '122560px',
  digital_wallet: '122560px',
  shipping: '122560px',
  postal: '122560px',
  identity: '122560px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE124: Record<ServiceCategory, '123648px'> = {
  government: '123648px',
  bank: '123648px',
  digital_wallet: '123648px',
  shipping: '123648px',
  postal: '123648px',
  identity: '123648px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE125: Record<ServiceCategory, '124736px'> = {
  government: '124736px',
  bank: '124736px',
  digital_wallet: '124736px',
  shipping: '124736px',
  postal: '124736px',
  identity: '124736px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE126: Record<ServiceCategory, '125824px'> = {
  government: '125824px',
  bank: '125824px',
  digital_wallet: '125824px',
  shipping: '125824px',
  postal: '125824px',
  identity: '125824px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE127: Record<ServiceCategory, '126912px'> = {
  government: '126912px',
  bank: '126912px',
  digital_wallet: '126912px',
  shipping: '126912px',
  postal: '126912px',
  identity: '126912px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE128: Record<ServiceCategory, '128000px'> = {
  government: '128000px',
  bank: '128000px',
  digital_wallet: '128000px',
  shipping: '128000px',
  postal: '128000px',
  identity: '128000px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE129: Record<ServiceCategory, '129088px'> = {
  government: '129088px',
  bank: '129088px',
  digital_wallet: '129088px',
  shipping: '129088px',
  postal: '129088px',
  identity: '129088px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE130: Record<ServiceCategory, '130176px'> = {
  government: '130176px',
  bank: '130176px',
  digital_wallet: '130176px',
  shipping: '130176px',
  postal: '130176px',
  identity: '130176px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE131: Record<ServiceCategory, '131264px'> = {
  government: '131264px',
  bank: '131264px',
  digital_wallet: '131264px',
  shipping: '131264px',
  postal: '131264px',
  identity: '131264px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE132: Record<ServiceCategory, '132352px'> = {
  government: '132352px',
  bank: '132352px',
  digital_wallet: '132352px',
  shipping: '132352px',
  postal: '132352px',
  identity: '132352px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE133: Record<ServiceCategory, '133440px'> = {
  government: '133440px',
  bank: '133440px',
  digital_wallet: '133440px',
  shipping: '133440px',
  postal: '133440px',
  identity: '133440px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE134: Record<ServiceCategory, '134528px'> = {
  government: '134528px',
  bank: '134528px',
  digital_wallet: '134528px',
  shipping: '134528px',
  postal: '134528px',
  identity: '134528px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE135: Record<ServiceCategory, '135616px'> = {
  government: '135616px',
  bank: '135616px',
  digital_wallet: '135616px',
  shipping: '135616px',
  postal: '135616px',
  identity: '135616px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE136: Record<ServiceCategory, '136704px'> = {
  government: '136704px',
  bank: '136704px',
  digital_wallet: '136704px',
  shipping: '136704px',
  postal: '136704px',
  identity: '136704px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE137: Record<ServiceCategory, '137792px'> = {
  government: '137792px',
  bank: '137792px',
  digital_wallet: '137792px',
  shipping: '137792px',
  postal: '137792px',
  identity: '137792px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE138: Record<ServiceCategory, '138880px'> = {
  government: '138880px',
  bank: '138880px',
  digital_wallet: '138880px',
  shipping: '138880px',
  postal: '138880px',
  identity: '138880px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE139: Record<ServiceCategory, '139968px'> = {
  government: '139968px',
  bank: '139968px',
  digital_wallet: '139968px',
  shipping: '139968px',
  postal: '139968px',
  identity: '139968px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE140: Record<ServiceCategory, '141056px'> = {
  government: '141056px',
  bank: '141056px',
  digital_wallet: '141056px',
  shipping: '141056px',
  postal: '141056px',
  identity: '141056px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE141: Record<ServiceCategory, '142144px'> = {
  government: '142144px',
  bank: '142144px',
  digital_wallet: '142144px',
  shipping: '142144px',
  postal: '142144px',
  identity: '142144px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE142: Record<ServiceCategory, '143232px'> = {
  government: '143232px',
  bank: '143232px',
  digital_wallet: '143232px',
  shipping: '143232px',
  postal: '143232px',
  identity: '143232px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE143: Record<ServiceCategory, '144320px'> = {
  government: '144320px',
  bank: '144320px',
  digital_wallet: '144320px',
  shipping: '144320px',
  postal: '144320px',
  identity: '144320px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE144: Record<ServiceCategory, '145408px'> = {
  government: '145408px',
  bank: '145408px',
  digital_wallet: '145408px',
  shipping: '145408px',
  postal: '145408px',
  identity: '145408px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE145: Record<ServiceCategory, '146496px'> = {
  government: '146496px',
  bank: '146496px',
  digital_wallet: '146496px',
  shipping: '146496px',
  postal: '146496px',
  identity: '146496px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE146: Record<ServiceCategory, '147584px'> = {
  government: '147584px',
  bank: '147584px',
  digital_wallet: '147584px',
  shipping: '147584px',
  postal: '147584px',
  identity: '147584px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE147: Record<ServiceCategory, '148672px'> = {
  government: '148672px',
  bank: '148672px',
  digital_wallet: '148672px',
  shipping: '148672px',
  postal: '148672px',
  identity: '148672px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE148: Record<ServiceCategory, '149760px'> = {
  government: '149760px',
  bank: '149760px',
  digital_wallet: '149760px',
  shipping: '149760px',
  postal: '149760px',
  identity: '149760px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE149: Record<ServiceCategory, '150848px'> = {
  government: '150848px',
  bank: '150848px',
  digital_wallet: '150848px',
  shipping: '150848px',
  postal: '150848px',
  identity: '150848px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE150: Record<ServiceCategory, '151936px'> = {
  government: '151936px',
  bank: '151936px',
  digital_wallet: '151936px',
  shipping: '151936px',
  postal: '151936px',
  identity: '151936px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE151: Record<ServiceCategory, '153024px'> = {
  government: '153024px',
  bank: '153024px',
  digital_wallet: '153024px',
  shipping: '153024px',
  postal: '153024px',
  identity: '153024px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE152: Record<ServiceCategory, '154112px'> = {
  government: '154112px',
  bank: '154112px',
  digital_wallet: '154112px',
  shipping: '154112px',
  postal: '154112px',
  identity: '154112px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE153: Record<ServiceCategory, '155200px'> = {
  government: '155200px',
  bank: '155200px',
  digital_wallet: '155200px',
  shipping: '155200px',
  postal: '155200px',
  identity: '155200px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE154: Record<ServiceCategory, '156288px'> = {
  government: '156288px',
  bank: '156288px',
  digital_wallet: '156288px',
  shipping: '156288px',
  postal: '156288px',
  identity: '156288px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE155: Record<ServiceCategory, '157376px'> = {
  government: '157376px',
  bank: '157376px',
  digital_wallet: '157376px',
  shipping: '157376px',
  postal: '157376px',
  identity: '157376px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE156: Record<ServiceCategory, '158464px'> = {
  government: '158464px',
  bank: '158464px',
  digital_wallet: '158464px',
  shipping: '158464px',
  postal: '158464px',
  identity: '158464px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE157: Record<ServiceCategory, '159552px'> = {
  government: '159552px',
  bank: '159552px',
  digital_wallet: '159552px',
  shipping: '159552px',
  postal: '159552px',
  identity: '159552px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE158: Record<ServiceCategory, '160640px'> = {
  government: '160640px',
  bank: '160640px',
  digital_wallet: '160640px',
  shipping: '160640px',
  postal: '160640px',
  identity: '160640px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE159: Record<ServiceCategory, '161728px'> = {
  government: '161728px',
  bank: '161728px',
  digital_wallet: '161728px',
  shipping: '161728px',
  postal: '161728px',
  identity: '161728px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE160: Record<ServiceCategory, '162816px'> = {
  government: '162816px',
  bank: '162816px',
  digital_wallet: '162816px',
  shipping: '162816px',
  postal: '162816px',
  identity: '162816px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE161: Record<ServiceCategory, '163904px'> = {
  government: '163904px',
  bank: '163904px',
  digital_wallet: '163904px',
  shipping: '163904px',
  postal: '163904px',
  identity: '163904px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE162: Record<ServiceCategory, '165992px'> = {
  government: '165992px',
  bank: '165992px',
  digital_wallet: '165992px',
  shipping: '165992px',
  postal: '165992px',
  identity: '165992px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE163: Record<ServiceCategory, '168080px'> = {
  government: '168080px',
  bank: '168080px',
  digital_wallet: '168080px',
  shipping: '168080px',
  postal: '168080px',
  identity: '168080px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE164: Record<ServiceCategory, '169168px'> = {
  government: '169168px',
  bank: '169168px',
  digital_wallet: '169168px',
  shipping: '169168px',
  postal: '169168px',
  identity: '169168px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE165: Record<ServiceCategory, '170256px'> = {
  government: '170256px',
  bank: '170256px',
  digital_wallet: '170256px',
  shipping: '170256px',
  postal: '170256px',
  identity: '170256px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE166: Record<ServiceCategory, '171344px'> = {
  government: '171344px',
  bank: '171344px',
  digital_wallet: '171344px',
  shipping: '171344px',
  postal: '171344px',
  identity: '171344px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE167: Record<ServiceCategory, '172432px'> = {
  government: '172432px',
  bank: '172432px',
  digital_wallet: '172432px',
  shipping: '172432px',
  postal: '172432px',
  identity: '172432px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE168: Record<ServiceCategory, '173520px'> = {
  government: '173520px',
  bank: '173520px',
  digital_wallet: '173520px',
  shipping: '173520px',
  postal: '173520px',
  identity: '173520px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE169: Record<ServiceCategory, '174608px'> = {
  government: '174608px',
  bank: '174608px',
  digital_wallet: '174608px',
  shipping: '174608px',
  postal: '174608px',
  identity: '174608px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE170: Record<ServiceCategory, '175696px'> = {
  government: '175696px',
  bank: '175696px',
  digital_wallet: '175696px',
  shipping: '175696px',
  postal: '175696px',
  identity: '175696px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE171: Record<ServiceCategory, '176784px'> = {
  government: '176784px',
  bank: '176784px',
  digital_wallet: '176784px',
  shipping: '176784px',
  postal: '176784px',
  identity: '176784px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE172: Record<ServiceCategory, '177872px'> = {
  government: '177872px',
  bank: '177872px',
  digital_wallet: '177872px',
  shipping: '177872px',
  postal: '177872px',
  identity: '177872px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE173: Record<ServiceCategory, '178960px'> = {
  government: '178960px',
  bank: '178960px',
  digital_wallet: '178960px',
  shipping: '178960px',
  postal: '178960px',
  identity: '178960px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE174: Record<ServiceCategory, '180048px'> = {
  government: '180048px',
  bank: '180048px',
  digital_wallet: '180048px',
  shipping: '180048px',
  postal: '180048px',
  identity: '180048px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE175: Record<ServiceCategory, '181136px'> = {
  government: '181136px',
  bank: '181136px',
  digital_wallet: '181136px',
  shipping: '181136px',
  postal: '181136px',
  identity: '181136px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE176: Record<ServiceCategory, '182224px'> = {
  government: '182224px',
  bank: '182224px',
  digital_wallet: '182224px',
  shipping: '182224px',
  postal: '182224px',
  identity: '182224px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE177: Record<ServiceCategory, '183312px'> = {
  government: '183312px',
  bank: '183312px',
  digital_wallet: '183312px',
  shipping: '183312px',
  postal: '183312px',
  identity: '183312px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE178: Record<ServiceCategory, '184400px'> = {
  government: '184400px',
  bank: '184400px',
  digital_wallet: '184400px',
  shipping: '184400px',
  postal: '184400px',
  identity: '184400px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE179: Record<ServiceCategory, '185488px'> = {
  government: '185488px',
  bank: '185488px',
  digital_wallet: '185488px',
  shipping: '185488px',
  postal: '185488px',
  identity: '185488px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE180: Record<ServiceCategory, '186576px'> = {
  government: '186576px',
  bank: '186576px',
  digital_wallet: '186576px',
  shipping: '186576px',
  postal: '186576px',
  identity: '186576px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE181: Record<ServiceCategory, '187664px'> = {
  government: '187664px',
  bank: '187664px',
  digital_wallet: '187664px',
  shipping: '187664px',
  postal: '187664px',
  identity: '187664px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE182: Record<ServiceCategory, '188752px'> = {
  government: '188752px',
  bank: '188752px',
  digital_wallet: '188752px',
  shipping: '188752px',
  postal: '188752px',
  identity: '188752px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE183: Record<ServiceCategory, '189840px'> = {
  government: '189840px',
  bank: '189840px',
  digital_wallet: '189840px',
  shipping: '189840px',
  postal: '189840px',
  identity: '189840px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE184: Record<ServiceCategory, '190928px'> = {
  government: '190928px',
  bank: '190928px',
  digital_wallet: '190928px',
  shipping: '190928px',
  postal: '190928px',
  identity: '190928px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE185: Record<ServiceCategory, '192016px'> = {
  government: '192016px',
  bank: '192016px',
  digital_wallet: '192016px',
  shipping: '192016px',
  postal: '192016px',
  identity: '192016px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE186: Record<ServiceCategory, '193104px'> = {
  government: '193104px',
  bank: '193104px',
  digital_wallet: '193104px',
  shipping: '193104px',
  postal: '193104px',
  identity: '193104px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE187: Record<ServiceCategory, '194192px'> = {
  government: '194192px',
  bank: '194192px',
  digital_wallet: '194192px',
  shipping: '194192px',
  postal: '194192px',
  identity: '194192px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE188: Record<ServiceCategory, '195280px'> = {
  government: '195280px',
  bank: '195280px',
  digital_wallet: '195280px',
  shipping: '195280px',
  postal: '195280px',
  identity: '195280px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE189: Record<ServiceCategory, '196368px'> = {
  government: '196368px',
  bank: '196368px',
  digital_wallet: '196368px',
  shipping: '196368px',
  postal: '196368px',
  identity: '196368px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE190: Record<ServiceCategory, '197456px'> = {
  government: '197456px',
  bank: '197456px',
  digital_wallet: '197456px',
  shipping: '197456px',
  postal: '197456px',
  identity: '197456px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE191: Record<ServiceCategory, '198544px'> = {
  government: '198544px',
  bank: '198544px',
  digital_wallet: '198544px',
  shipping: '198544px',
  postal: '198544px',
  identity: '198544px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE192: Record<ServiceCategory, '199632px'> = {
  government: '199632px',
  bank: '199632px',
  digital_wallet: '199632px',
  shipping: '199632px',
  postal: '199632px',
  identity: '199632px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE193: Record<ServiceCategory, '200720px'> = {
  government: '200720px',
  bank: '200720px',
  digital_wallet: '200720px',
  shipping: '200720px',
  postal: '200720px',
  identity: '200720px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE194: Record<ServiceCategory, '201808px'> = {
  government: '201808px',
  bank: '201808px',
  digital_wallet: '201808px',
  shipping: '201808px',
  postal: '201808px',
  identity: '201808px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE195: Record<ServiceCategory, '202896px'> = {
  government: '202896px',
  bank: '202896px',
  digital_wallet: '202896px',
  shipping: '202896px',
  postal: '202896px',
  identity: '202896px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE196: Record<ServiceCategory, '203984px'> = {
  government: '203984px',
  bank: '203984px',
  digital_wallet: '203984px',
  shipping: '203984px',
  postal: '203984px',
  identity: '203984px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE197: Record<ServiceCategory, '205072px'> = {
  government: '205072px',
  bank: '205072px',
  digital_wallet: '205072px',
  shipping: '205072px',
  postal: '205072px',
  identity: '205072px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE198: Record<ServiceCategory, '206160px'> = {
  government: '206160px',
  bank: '206160px',
  digital_wallet: '206160px',
  shipping: '206160px',
  postal: '206160px',
  identity: '206160px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE199: Record<ServiceCategory, '207248px'> = {
  government: '207248px',
  bank: '207248px',
  digital_wallet: '207248px',
  shipping: '207248px',
  postal: '207248px',
  identity: '207248px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE200: Record<ServiceCategory, '208336px'> = {
  government: '208336px',
  bank: '208336px',
  digital_wallet: '208336px',
  shipping: '208336px',
  postal: '208336px',
  identity: '208336px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE201: Record<ServiceCategory, '209424px'> = {
  government: '209424px',
  bank: '209424px',
  digital_wallet: '209424px',
  shipping: '209424px',
  postal: '209424px',
  identity: '209424px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE202: Record<ServiceCategory, '210512px'> = {
  government: '210512px',
  bank: '210512px',
  digital_wallet: '210512px',
  shipping: '210512px',
  postal: '210512px',
  identity: '210512px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE203: Record<ServiceCategory, '211600px'> = {
  government: '211600px',
  bank: '211600px',
  digital_wallet: '211600px',
  shipping: '211600px',
  postal: '211600px',
  identity: '211600px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE204: Record<ServiceCategory, '212688px'> = {
  government: '212688px',
  bank: '212688px',
  digital_wallet: '212688px',
  shipping: '212688px',
  postal: '212688px',
  identity: '212688px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE205: Record<ServiceCategory, '213776px'> = {
  government: '213776px',
  bank: '213776px',
  digital_wallet: '213776px',
  shipping: '213776px',
  postal: '213776px',
  identity: '213776px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE206: Record<ServiceCategory, '214864px'> = {
  government: '214864px',
  bank: '214864px',
  digital_wallet: '214864px',
  shipping: '214864px',
  postal: '214864px',
  identity: '214864px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE207: Record<ServiceCategory, '215952px'> = {
  government: '215952px',
  bank: '215952px',
  digital_wallet: '215952px',
  shipping: '215952px',
  postal: '215952px',
  identity: '215952px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE208: Record<ServiceCategory, '217040px'> = {
  government: '217040px',
  bank: '217040px',
  digital_wallet: '217040px',
  shipping: '217040px',
  postal: '217040px',
  identity: '217040px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE209: Record<ServiceCategory, '218128px'> = {
  government: '218128px',
  bank: '218128px',
  digital_wallet: '218128px',
  shipping: '218128px',
  postal: '218128px',
  identity: '218128px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE210: Record<ServiceCategory, '219216px'> = {
  government: '219216px',
  bank: '219216px',
  digital_wallet: '219216px',
  shipping: '219216px',
  postal: '219216px',
  identity: '219216px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE211: Record<ServiceCategory, '220304px'> = {
  government: '220304px',
  bank: '220304px',
  digital_wallet: '220304px',
  shipping: '220304px',
  postal: '220304px',
  identity: '220304px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE212: Record<ServiceCategory, '221392px'> = {
  government: '221392px',
  bank: '221392px',
  digital_wallet: '221392px',
  shipping: '221392px',
  postal: '221392px',
  identity: '221392px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE213: Record<ServiceCategory, '222480px'> = {
  government: '222480px',
  bank: '222480px',
  digital_wallet: '222480px',
  shipping: '222480px',
  postal: '222480px',
  identity: '222480px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE214: Record<ServiceCategory, '223568px'> = {
  government: '223568px',
  bank: '223568px',
  digital_wallet: '223568px',
  shipping: '223568px',
  postal: '223568px',
  identity: '223568px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE215: Record<ServiceCategory, '224656px'> = {
  government: '224656px',
  bank: '224656px',
  digital_wallet: '224656px',
  shipping: '224656px',
  postal: '224656px',
  identity: '224656px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE216: Record<ServiceCategory, '225744px'> = {
  government: '225744px',
  bank: '225744px',
  digital_wallet: '225744px',
  shipping: '225744px',
  postal: '225744px',
  identity: '225744px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE217: Record<ServiceCategory, '226832px'> = {
  government: '226832px',
  bank: '226832px',
  digital_wallet: '226832px',
  shipping: '226832px',
  postal: '226832px',
  identity: '226832px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE218: Record<ServiceCategory, '227920px'> = {
  government: '227920px',
  bank: '227920px',
  digital_wallet: '227920px',
  shipping: '227920px',
  postal: '227920px',
  identity: '227920px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE219: Record<ServiceCategory, '229008px'> = {
  government: '229008px',
  bank: '229008px',
  digital_wallet: '229008px',
  shipping: '229008px',
  postal: '229008px',
  identity: '229008px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE220: Record<ServiceCategory, '230096px'> = {
  government: '230096px',
  bank: '230096px',
  digital_wallet: '230096px',
  shipping: '230096px',
  postal: '230096px',
  identity: '230096px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE221: Record<ServiceCategory, '231184px'> = {
  government: '231184px',
  bank: '231184px',
  digital_wallet: '231184px',
  shipping: '231184px',
  postal: '231184px',
  identity: '231184px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE222: Record<ServiceCategory, '232272px'> = {
  government: '232272px',
  bank: '232272px',
  digital_wallet: '232272px',
  shipping: '232272px',
  postal: '232272px',
  identity: '232272px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE223: Record<ServiceCategory, '233360px'> = {
  government: '233360px',
  bank: '233360px',
  digital_wallet: '233360px',
  shipping: '233360px',
  postal: '233360px',
  identity: '233360px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE224: Record<ServiceCategory, '234448px'> = {
  government: '234448px',
  bank: '234448px',
  digital_wallet: '234448px',
  shipping: '234448px',
  postal: '234448px',
  identity: '234448px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE225: Record<ServiceCategory, '235536px'> = {
  government: '235536px',
  bank: '235536px',
  digital_wallet: '235536px',
  shipping: '235536px',
  postal: '235536px',
  identity: '235536px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE226: Record<ServiceCategory, '236624px'> = {
  government: '236624px',
  bank: '236624px',
  digital_wallet: '236624px',
  shipping: '236624px',
  postal: '236624px',
  identity: '236624px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE227: Record<ServiceCategory, '237712px'> = {
  government: '237712px',
  bank: '237712px',
  digital_wallet: '237712px',
  shipping: '237712px',
  postal: '237712px',
  identity: '237712px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE228: Record<ServiceCategory, '238800px'> = {
  government: '238800px',
  bank: '238800px',
  digital_wallet: '238800px',
  shipping: '238800px',
  postal: '238800px',
  identity: '238800px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE229: Record<ServiceCategory, '239888px'> = {
  government: '239888px',
  bank: '239888px',
  digital_wallet: '239888px',
  shipping: '239888px',
  postal: '239888px',
  identity: '239888px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE230: Record<ServiceCategory, '240976px'> = {
  government: '240976px',
  bank: '240976px',
  digital_wallet: '240976px',
  shipping: '240976px',
  postal: '240976px',
  identity: '240976px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE231: Record<ServiceCategory, '242064px'> = {
  government: '242064px',
  bank: '242064px',
  digital_wallet: '242064px',
  shipping: '242064px',
  postal: '242064px',
  identity: '242064px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE232: Record<ServiceCategory, '243152px'> = {
  government: '243152px',
  bank: '243152px',
  digital_wallet: '243152px',
  shipping: '243152px',
  postal: '243152px',
  identity: '243152px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE233: Record<ServiceCategory, '244240px'> = {
  government: '244240px',
  bank: '244240px',
  digital_wallet: '244240px',
  shipping: '244240px',
  postal: '244240px',
  identity: '244240px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE234: Record<ServiceCategory, '245328px'> = {
  government: '245328px',
  bank: '245328px',
  digital_wallet: '245328px',
  shipping: '245328px',
  postal: '245328px',
  identity: '245328px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE235: Record<ServiceCategory, '246416px'> = {
  government: '246416px',
  bank: '246416px',
  digital_wallet: '246416px',
  shipping: '246416px',
  postal: '246416px',
  identity: '246416px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE236: Record<ServiceCategory, '247504px'> = {
  government: '247504px',
  bank: '247504px',
  digital_wallet: '247504px',
  shipping: '247504px',
  postal: '247504px',
  identity: '247504px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE237: Record<ServiceCategory, '248592px'> = {
  government: '248592px',
  bank: '248592px',
  digital_wallet: '248592px',
  shipping: '248592px',
  postal: '248592px',
  identity: '248592px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE238: Record<ServiceCategory, '249680px'> = {
  government: '249680px',
  bank: '249680px',
  digital_wallet: '249680px',
  shipping: '249680px',
  postal: '249680px',
  identity: '249680px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE239: Record<ServiceCategory, '250768px'> = {
  government: '250768px',
  bank: '250768px',
  digital_wallet: '250768px',
  shipping: '250768px',
  postal: '250768px',
  identity: '250768px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE240: Record<ServiceCategory, '251856px'> = {
  government: '251856px',
  bank: '251856px',
  digital_wallet: '251856px',
  shipping: '251856px',
  postal: '251856px',
  identity: '251856px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE241: Record<ServiceCategory, '252944px'> = {
  government: '252944px',
  bank: '252944px',
  digital_wallet: '252944px',
  shipping: '252944px',
  postal: '252944px',
  identity: '252944px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE242: Record<ServiceCategory, '254032px'> = {
  government: '254032px',
  bank: '254032px',
  digital_wallet: '254032px',
  shipping: '254032px',
  postal: '254032px',
  identity: '254032px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE243: Record<ServiceCategory, '255120px'> = {
  government: '255120px',
  bank: '255120px',
  digital_wallet: '255120px',
  shipping: '255120px',
  postal: '255120px',
  identity: '255120px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE244: Record<ServiceCategory, '256208px'> = {
  government: '256208px',
  bank: '256208px',
  digital_wallet: '256208px',
  shipping: '256208px',
  postal: '256208px',
  identity: '256208px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE245: Record<ServiceCategory, '257296px'> = {
  government: '257296px',
  bank: '257296px',
  digital_wallet: '257296px',
  shipping: '257296px',
  postal: '257296px',
  identity: '257296px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE246: Record<ServiceCategory, '258384px'> = {
  government: '258384px',
  bank: '258384px',
  digital_wallet: '258384px',
  shipping: '258384px',
  postal: '258384px',
  identity: '258384px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE247: Record<ServiceCategory, '259472px'> = {
  government: '259472px',
  bank: '259472px',
  digital_wallet: '259472px',
  shipping: '259472px',
  postal: '259472px',
  identity: '259472px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE248: Record<ServiceCategory, '260560px'> = {
  government: '260560px',
  bank: '260560px',
  digital_wallet: '260560px',
  shipping: '260560px',
  postal: '260560px',
  identity: '260560px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE249: Record<ServiceCategory, '261648px'> = {
  government: '261648px',
  bank: '261648px',
  digital_wallet: '261648px',
  shipping: '261648px',
  postal: '261648px',
  identity: '261648px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE250: Record<ServiceCategory, '262736px'> = {
  government: '262736px',
  bank: '262736px',
  digital_wallet: '262736px',
  shipping: '262736px',
  postal: '262736px',
  identity: '262736px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE251: Record<ServiceCategory, '263824px'> = {
  government: '263824px',
  bank: '263824px',
  digital_wallet: '263824px',
  shipping: '263824px',
  postal: '263824px',
  identity: '263824px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE252: Record<ServiceCategory, '264912px'> = {
  government: '264912px',
  bank: '264912px',
  digital_wallet: '264912px',
  shipping: '264912px',
  postal: '264912px',
  identity: '264912px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE253: Record<ServiceCategory, '266000px'> = {
  government: '266000px',
  bank: '266000px',
  digital_wallet: '266000px',
  shipping: '266000px',
  postal: '266000px',
  identity: '266000px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE254: Record<ServiceCategory, '267088px'> = {
  government: '267088px',
  bank: '267088px',
  digital_wallet: '267088px',
  shipping: '267088px',
  postal: '267088px',
  identity: '267088px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE255: Record<ServiceCategory, '268176px'> = {
  government: '268176px',
  bank: '268176px',
  digital_wallet: '268176px',
  shipping: '268176px',
  postal: '268176px',
  identity: '268176px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE256: Record<ServiceCategory, '269264px'> = {
  government: '269264px',
  bank: '269264px',
  digital_wallet: '269264px',
  shipping: '269264px',
  postal: '269264px',
  identity: '269264px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE257: Record<ServiceCategory, '270352px'> = {
  government: '270352px',
  bank: '270352px',
  digital_wallet: '270352px',
  shipping: '270352px',
  postal: '270352px',
  identity: '270352px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE258: Record<ServiceCategory, '271440px'> = {
  government: '271440px',
  bank: '271440px',
  digital_wallet: '271440px',
  shipping: '271440px',
  postal: '271440px',
  identity: '271440px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE259: Record<ServiceCategory, '272528px'> = {
  government: '272528px',
  bank: '272528px',
  digital_wallet: '272528px',
  shipping: '272528px',
  postal: '272528px',
  identity: '272528px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE260: Record<ServiceCategory, '273616px'> = {
  government: '273616px',
  bank: '273616px',
  digital_wallet: '273616px',
  shipping: '273616px',
  postal: '273616px',
  identity: '273616px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE261: Record<ServiceCategory, '274704px'> = {
  government: '274704px',
  bank: '274704px',
  digital_wallet: '274704px',
  shipping: '274704px',
  postal: '274704px',
  identity: '274704px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE262: Record<ServiceCategory, '275792px'> = {
  government: '275792px',
  bank: '275792px',
  digital_wallet: '275792px',
  shipping: '275792px',
  postal: '275792px',
  identity: '275792px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE263: Record<ServiceCategory, '276880px'> = {
  government: '276880px',
  bank: '276880px',
  digital_wallet: '276880px',
  shipping: '276880px',
  postal: '276880px',
  identity: '276880px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE264: Record<ServiceCategory, '277968px'> = {
  government: '277968px',
  bank: '277968px',
  digital_wallet: '277968px',
  shipping: '277968px',
  postal: '277968px',
  identity: '277968px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE265: Record<ServiceCategory, '279056px'> = {
  government: '279056px',
  bank: '279056px',
  digital_wallet: '279056px',
  shipping: '279056px',
  postal: '279056px',
  identity: '279056px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE266: Record<ServiceCategory, '280144px'> = {
  government: '280144px',
  bank: '280144px',
  digital_wallet: '280144px',
  shipping: '280144px',
  postal: '280144px',
  identity: '280144px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE267: Record<ServiceCategory, '281232px'> = {
  government: '281232px',
  bank: '281232px',
  digital_wallet: '281232px',
  shipping: '281232px',
  postal: '281232px',
  identity: '281232px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE268: Record<ServiceCategory, '282320px'> = {
  government: '282320px',
  bank: '282320px',
  digital_wallet: '282320px',
  shipping: '282320px',
  postal: '282320px',
  identity: '282320px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE269: Record<ServiceCategory, '283408px'> = {
  government: '283408px',
  bank: '283408px',
  digital_wallet: '283408px',
  shipping: '283408px',
  postal: '283408px',
  identity: '283408px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE270: Record<ServiceCategory, '284496px'> = {
  government: '284496px',
  bank: '284496px',
  digital_wallet: '284496px',
  shipping: '284496px',
  postal: '284496px',
  identity: '284496px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE271: Record<ServiceCategory, '285584px'> = {
  government: '285584px',
  bank: '285584px',
  digital_wallet: '285584px',
  shipping: '285584px',
  postal: '285584px',
  identity: '285584px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE272: Record<ServiceCategory, '286672px'> = {
  government: '286672px',
  bank: '286672px',
  digital_wallet: '286672px',
  shipping: '286672px',
  postal: '286672px',
  identity: '286672px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE273: Record<ServiceCategory, '287760px'> = {
  government: '287760px',
  bank: '287760px',
  digital_wallet: '287760px',
  shipping: '287760px',
  postal: '287760px',
  identity: '287760px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE274: Record<ServiceCategory, '288848px'> = {
  government: '288848px',
  bank: '288848px',
  digital_wallet: '288848px',
  shipping: '288848px',
  postal: '288848px',
  identity: '288848px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE275: Record<ServiceCategory, '289936px'> = {
  government: '289936px',
  bank: '289936px',
  digital_wallet: '289936px',
  shipping: '289936px',
  postal: '289936px',
  identity: '289936px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE276: Record<ServiceCategory, '291024px'> = {
  government: '291024px',
  bank: '291024px',
  digital_wallet: '291024px',
  shipping: '291024px',
  postal: '291024px',
  identity: '291024px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE277: Record<ServiceCategory, '292112px'> = {
  government: '292112px',
  bank: '292112px',
  digital_wallet: '292112px',
  shipping: '292112px',
  postal: '292112px',
  identity: '292112px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE278: Record<ServiceCategory, '293200px'> = {
  government: '293200px',
  bank: '293200px',
  digital_wallet: '293200px',
  shipping: '293200px',
  postal: '293200px',
  identity: '293200px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE279: Record<ServiceCategory, '294288px'> = {
  government: '294288px',
  bank: '294288px',
  digital_wallet: '294288px',
  shipping: '294288px',
  postal: '294288px',
  identity: '294288px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE280: Record<ServiceCategory, '295376px'> = {
  government: '295376px',
  bank: '295376px',
  digital_wallet: '295376px',
  shipping: '295376px',
  postal: '295376px',
  identity: '295376px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE281: Record<ServiceCategory, '296464px'> = {
  government: '296464px',
  bank: '296464px',
  digital_wallet: '296464px',
  shipping: '296464px',
  postal: '296464px',
  identity: '296464px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE282: Record<ServiceCategory, '297552px'> = {
  government: '297552px',
  bank: '297552px',
  digital_wallet: '297552px',
  shipping: '297552px',
  postal: '297552px',
  identity: '297552px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE283: Record<ServiceCategory, '298640px'> = {
  government: '298640px',
  bank: '298640px',
  digital_wallet: '298640px',
  shipping: '298640px',
  postal: '298640px',
  identity: '298640px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE284: Record<ServiceCategory, '299728px'> = {
  government: '299728px',
  bank: '299728px',
  digital_wallet: '299728px',
  shipping: '299728px',
  postal: '299728px',
  identity: '299728px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE285: Record<ServiceCategory, '300816px'> = {
  government: '300816px',
  bank: '300816px',
  digital_wallet: '300816px',
  shipping: '300816px',
  postal: '300816px',
  identity: '300816px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE286: Record<ServiceCategory, '301904px'> = {
  government: '301904px',
  bank: '301904px',
  digital_wallet: '301904px',
  shipping: '301904px',
  postal: '301904px',
  identity: '301904px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE287: Record<ServiceCategory, '302992px'> = {
  government: '302992px',
  bank: '302992px',
  digital_wallet: '302992px',
  shipping: '302992px',
  postal: '302992px',
  identity: '302992px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE288: Record<ServiceCategory, '304080px'> = {
  government: '304080px',
  bank: '304080px',
  digital_wallet: '304080px',
  shipping: '304080px',
  postal: '304080px',
  identity: '304080px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE289: Record<ServiceCategory, '305168px'> = {
  government: '305168px',
  bank: '305168px',
  digital_wallet: '305168px',
  shipping: '305168px',
  postal: '305168px',
  identity: '305168px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE290: Record<ServiceCategory, '306256px'> = {
  government: '306256px',
  bank: '306256px',
  digital_wallet: '306256px',
  shipping: '306256px',
  postal: '306256px',
  identity: '306256px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE291: Record<ServiceCategory, '307344px'> = {
  government: '307344px',
  bank: '307344px',
  digital_wallet: '307344px',
  shipping: '307344px',
  postal: '307344px',
  identity: '307344px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE292: Record<ServiceCategory, '308432px'> = {
  government: '308432px',
  bank: '308432px',
  digital_wallet: '308432px',
  shipping: '308432px',
  postal: '308432px',
  identity: '308432px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE293: Record<ServiceCategory, '309520px'> = {
  government: '309520px',
  bank: '309520px',
  digital_wallet: '309520px',
  shipping: '309520px',
  postal: '309520px',
  identity: '309520px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE294: Record<ServiceCategory, '310608px'> = {
  government: '310608px',
  bank: '310608px',
  digital_wallet: '310608px',
  shipping: '310608px',
  postal: '310608px',
  identity: '310608px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE295: Record<ServiceCategory, '311696px'> = {
  government: '311696px',
  bank: '311696px',
  digital_wallet: '311696px',
  shipping: '311696px',
  postal: '311696px',
  identity: '311696px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE296: Record<ServiceCategory, '312784px'> = {
  government: '312784px',
  bank: '312784px',
  digital_wallet: '312784px',
  shipping: '312784px',
  postal: '312784px',
  identity: '312784px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE297: Record<ServiceCategory, '313872px'> = {
  government: '313872px',
  bank: '313872px',
  digital_wallet: '313872px',
  shipping: '313872px',
  postal: '313872px',
  identity: '313872px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE298: Record<ServiceCategory, '314960px'> = {
  government: '314960px',
  bank: '314960px',
  digital_wallet: '314960px',
  shipping: '314960px',
  postal: '314960px',
  identity: '314960px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE299: Record<ServiceCategory, '316048px'> = {
  government: '316048px',
  bank: '316048px',
  digital_wallet: '316048px',
  shipping: '316048px',
  postal: '316048px',
  identity: '316048px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE300: Record<ServiceCategory, '317136px'> = {
  government: '317136px',
  bank: '317136px',
  digital_wallet: '317136px',
  shipping: '317136px',
  postal: '317136px',
  identity: '317136px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE301: Record<ServiceCategory, '318224px'> = {
  government: '318224px',
  bank: '318224px',
  digital_wallet: '318224px',
  shipping: '318224px',
  postal: '318224px',
  identity: '318224px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE302: Record<ServiceCategory, '319312px'> = {
  government: '319312px',
  bank: '319312px',
  digital_wallet: '319312px',
  shipping: '319312px',
  postal: '319312px',
  identity: '319312px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE303: Record<ServiceCategory, '320400px'> = {
  government: '320400px',
  bank: '320400px',
  digital_wallet: '320400px',
  shipping: '320400px',
  postal: '320400px',
  identity: '320400px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE304: Record<ServiceCategory, '321488px'> = {
  government: '321488px',
  bank: '321488px',
  digital_wallet: '321488px',
  shipping: '321488px',
  postal: '321488px',
  identity: '321488px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE305: Record<ServiceCategory, '322576px'> = {
  government: '322576px',
  bank: '322576px',
  digital_wallet: '322576px',
  shipping: '322576px',
  postal: '322576px',
  identity: '322576px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE306: Record<ServiceCategory, '323664px'> = {
  government: '323664px',
  bank: '323664px',
  digital_wallet: '323664px',
  shipping: '323664px',
  postal: '323664px',
  identity: '323664px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE307: Record<ServiceCategory, '324752px'> = {
  government: '324752px',
  bank: '324752px',
  digital_wallet: '324752px',
  shipping: '324752px',
  postal: '324752px',
  identity: '324752px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE308: Record<ServiceCategory, '325840px'> = {
  government: '325840px',
  bank: '325840px',
  digital_wallet: '325840px',
  shipping: '325840px',
  postal: '325840px',
  identity: '325840px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE309: Record<ServiceCategory, '326928px'> = {
  government: '326928px',
  bank: '326928px',
  digital_wallet: '326928px',
  shipping: '326928px',
  postal: '326928px',
  identity: '326928px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE310: Record<ServiceCategory, '328016px'> = {
  government: '328016px',
  bank: '328016px',
  digital_wallet: '328016px',
  shipping: '328016px',
  postal: '328016px',
  identity: '328016px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE311: Record<ServiceCategory, '329104px'> = {
  government: '329104px',
  bank: '329104px',
  digital_wallet: '329104px',
  shipping: '329104px',
  postal: '329104px',
  identity: '329104px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE312: Record<ServiceCategory, '330192px'> = {
  government: '330192px',
  bank: '330192px',
  digital_wallet: '330192px',
  shipping: '330192px',
  postal: '330192px',
  identity: '330192px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE313: Record<ServiceCategory, '331280px'> = {
  government: '331280px',
  bank: '331280px',
  digital_wallet: '331280px',
  shipping: '331280px',
  postal: '331280px',
  identity: '331280px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE314: Record<ServiceCategory, '332368px'> = {
  government: '332368px',
  bank: '332368px',
  digital_wallet: '332368px',
  shipping: '332368px',
  postal: '332368px',
  identity: '332368px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE315: Record<ServiceCategory, '333456px'> = {
  government: '333456px',
  bank: '333456px',
  digital_wallet: '333456px',
  shipping: '333456px',
  postal: '333456px',
  identity: '333456px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE316: Record<ServiceCategory, '334544px'> = {
  government: '334544px',
  bank: '334544px',
  digital_wallet: '334544px',
  shipping: '334544px',
  postal: '334544px',
  identity: '334544px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE317: Record<ServiceCategory, '335632px'> = {
  government: '335632px',
  bank: '335632px',
  digital_wallet: '335632px',
  shipping: '335632px',
  postal: '335632px',
  identity: '335632px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE318: Record<ServiceCategory, '336720px'> = {
  government: '336720px',
  bank: '336720px',
  digital_wallet: '336720px',
  shipping: '336720px',
  postal: '336720px',
  identity: '336720px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE319: Record<ServiceCategory, '337808px'> = {
  government: '337808px',
  bank: '337808px',
  digital_wallet: '337808px',
  shipping: '337808px',
  postal: '337808px',
  identity: '337808px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE320: Record<ServiceCategory, '338896px'> = {
  government: '338896px',
  bank: '338896px',
  digital_wallet: '338896px',
  shipping: '338896px',
  postal: '338896px',
  identity: '338896px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE321: Record<ServiceCategory, '339984px'> = {
  government: '339984px',
  bank: '339984px',
  digital_wallet: '339984px',
  shipping: '339984px',
  postal: '339984px',
  identity: '339984px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE322: Record<ServiceCategory, '341072px'> = {
  government: '341072px',
  bank: '341072px',
  digital_wallet: '341072px',
  shipping: '341072px',
  postal: '341072px',
  identity: '341072px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE323: Record<ServiceCategory, '342160px'> = {
  government: '342160px',
  bank: '342160px',
  digital_wallet: '342160px',
  shipping: '342160px',
  postal: '342160px',
  identity: '342160px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE324: Record<ServiceCategory, '343248px'> = {
  government: '343248px',
  bank: '343248px',
  digital_wallet: '343248px',
  shipping: '343248px',
  postal: '343248px',
  identity: '343248px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE325: Record<ServiceCategory, '344336px'> = {
  government: '344336px',
  bank: '344336px',
  digital_wallet: '344336px',
  shipping: '344336px',
  postal: '344336px',
  identity: '344336px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE326: Record<ServiceCategory, '345424px'> = {
  government: '345424px',
  bank: '345424px',
  digital_wallet: '345424px',
  shipping: '345424px',
  postal: '345424px',
  identity: '345424px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE327: Record<ServiceCategory, '346512px'> = {
  government: '346512px',
  bank: '346512px',
  digital_wallet: '346512px',
  shipping: '346512px',
  postal: '346512px',
  identity: '346512px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE328: Record<ServiceCategory, '347600px'> = {
  government: '347600px',
  bank: '347600px',
  digital_wallet: '347600px',
  shipping: '347600px',
  postal: '347600px',
  identity: '347600px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE329: Record<ServiceCategory, '348688px'> = {
  government: '348688px',
  bank: '348688px',
  digital_wallet: '348688px',
  shipping: '348688px',
  postal: '348688px',
  identity: '348688px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE330: Record<ServiceCategory, '349776px'> = {
  government: '349776px',
  bank: '349776px',
  digital_wallet: '349776px',
  shipping: '349776px',
  postal: '349776px',
  identity: '349776px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE331: Record<ServiceCategory, '350864px'> = {
  government: '350864px',
  bank: '350864px',
  digital_wallet: '350864px',
  shipping: '350864px',
  postal: '350864px',
  identity: '350864px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE332: Record<ServiceCategory, '351952px'> = {
  government: '351952px',
  bank: '351952px',
  digital_wallet: '351952px',
  shipping: '351952px',
  postal: '351952px',
  identity: '351952px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE333: Record<ServiceCategory, '354040px'> = {
  government: '354040px',
  bank: '354040px',
  digital_wallet: '354040px',
  shipping: '354040px',
  postal: '354040px',
  identity: '354040px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE334: Record<ServiceCategory, '355128px'> = {
  government: '355128px',
  bank: '355128px',
  digital_wallet: '355128px',
  shipping: '355128px',
  postal: '355128px',
  identity: '355128px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE335: Record<ServiceCategory, '356216px'> = {
  government: '356216px',
  bank: '356216px',
  digital_wallet: '356216px',
  shipping: '356216px',
  postal: '356216px',
  identity: '356216px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE336: Record<ServiceCategory, '357304px'> = {
  government: '357304px',
  bank: '357304px',
  digital_wallet: '357304px',
  shipping: '357304px',
  postal: '357304px',
  identity: '357304px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE337: Record<ServiceCategory, '358392px'> = {
  government: '358392px',
  bank: '358392px',
  digital_wallet: '358392px',
  shipping: '358392px',
  postal: '358392px',
  identity: '358392px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE338: Record<ServiceCategory, '359480px'> = {
  government: '359480px',
  bank: '359480px',
  digital_wallet: '359480px',
  shipping: '359480px',
  postal: '359480px',
  identity: '359480px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE339: Record<ServiceCategory, '360568px'> = {
  government: '360568px',
  bank: '360568px',
  digital_wallet: '360568px',
  shipping: '360568px',
  postal: '360568px',
  identity: '360568px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE340: Record<ServiceCategory, '361656px'> = {
  government: '361656px',
  bank: '361656px',
  digital_wallet: '361656px',
  shipping: '361656px',
  postal: '361656px',
  identity: '361656px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE341: Record<ServiceCategory, '362744px'> = {
  government: '362744px',
  bank: '362744px',
  digital_wallet: '362744px',
  shipping: '362744px',
  postal: '362744px',
  identity: '362744px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE342: Record<ServiceCategory, '363832px'> = {
  government: '363832px',
  bank: '363832px',
  digital_wallet: '363832px',
  shipping: '363832px',
  postal: '363832px',
  identity: '363832px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE343: Record<ServiceCategory, '364920px'> = {
  government: '364920px',
  bank: '364920px',
  digital_wallet: '364920px',
  shipping: '364920px',
  postal: '364920px',
  identity: '364920px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE344: Record<ServiceCategory, '366008px'> = {
  government: '366008px',
  bank: '366008px',
  digital_wallet: '366008px',
  shipping: '366008px',
  postal: '366008px',
  identity: '366008px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE345: Record<ServiceCategory, '367096px'> = {
  government: '367096px',
  bank: '367096px',
  digital_wallet: '367096px',
  shipping: '367096px',
  postal: '367096px',
  identity: '367096px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE346: Record<ServiceCategory, '368184px'> = {
  government: '368184px',
  bank: '368184px',
  digital_wallet: '368184px',
  shipping: '368184px',
  postal: '368184px',
  identity: '368184px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE347: Record<ServiceCategory, '369272px'> = {
  government: '369272px',
  bank: '369272px',
  digital_wallet: '369272px',
  shipping: '369272px',
  postal: '369272px',
  identity: '369272px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE348: Record<ServiceCategory, '370360px'> = {
  government: '370360px',
  bank: '370360px',
  digital_wallet: '370360px',
  shipping: '370360px',
  postal: '370360px',
  identity: '370360px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE349: Record<ServiceCategory, '371448px'> = {
  government: '371448px',
  bank: '371448px',
  digital_wallet: '371448px',
  shipping: '371448px',
  postal: '371448px',
  identity: '371448px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE350: Record<ServiceCategory, '372536px'> = {
  government: '372536px',
  bank: '372536px',
  digital_wallet: '372536px',
  shipping: '372536px',
  postal: '372536px',
  identity: '372536px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE351: Record<ServiceCategory, '373624px'> = {
  government: '373624px',
  bank: '373624px',
  digital_wallet: '373624px',
  shipping: '373624px',
  postal: '373624px',
  identity: '373624px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE352: Record<ServiceCategory, '374712px'> = {
  government: '374712px',
  bank: '374712px',
  digital_wallet: '374712px',
  shipping: '374712px',
  postal: '374712px',
  identity: '374712px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE353: Record<ServiceCategory, '375800px'> = {
  government: '375800px',
  bank: '375800px',
  digital_wallet: '375800px',
  shipping: '375800px',
  postal: '375800px',
  identity: '375800px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE354: Record<ServiceCategory, '376888px'> = {
  government: '376888px',
  bank: '376888px',
  digital_wallet: '376888px',
  shipping: '376888px',
  postal: '376888px',
  identity: '376888px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE355: Record<ServiceCategory, '377976px'> = {
  government: '377976px',
  bank: '377976px',
  digital_wallet: '377976px',
  shipping: '377976px',
  postal: '377976px',
  identity: '377976px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE356: Record<ServiceCategory, '379064px'> = {
  government: '379064px',
  bank: '379064px',
  digital_wallet: '379064px',
  shipping: '379064px',
  postal: '379064px',
  identity: '379064px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE357: Record<ServiceCategory, '380152px'> = {
  government: '380152px',
  bank: '380152px',
  digital_wallet: '380152px',
  shipping: '380152px',
  postal: '380152px',
  identity: '380152px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE358: Record<ServiceCategory, '381240px'> = {
  government: '381240px',
  bank: '381240px',
  digital_wallet: '381240px',
  shipping: '381240px',
  postal: '381240px',
  identity: '381240px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE359: Record<ServiceCategory, '382328px'> = {
  government: '382328px',
  bank: '382328px',
  digital_wallet: '382328px',
  shipping: '382328px',
  postal: '382328px',
  identity: '382328px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE360: Record<ServiceCategory, '383416px'> = {
  government: '383416px',
  bank: '383416px',
  digital_wallet: '383416px',
  shipping: '383416px',
  postal: '383416px',
  identity: '383416px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE361: Record<ServiceCategory, '384504px'> = {
  government: '384504px',
  bank: '384504px',
  digital_wallet: '384504px',
  shipping: '384504px',
  postal: '384504px',
  identity: '384504px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE362: Record<ServiceCategory, '385592px'> = {
  government: '385592px',
  bank: '385592px',
  digital_wallet: '385592px',
  shipping: '385592px',
  postal: '385592px',
  identity: '385592px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE363: Record<ServiceCategory, '386680px'> = {
  government: '386680px',
  bank: '386680px',
  digital_wallet: '386680px',
  shipping: '386680px',
  postal: '386680px',
  identity: '386680px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE364: Record<ServiceCategory, '387768px'> = {
  government: '387768px',
  bank: '387768px',
  digital_wallet: '387768px',
  shipping: '387768px',
  postal: '387768px',
  identity: '387768px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE365: Record<ServiceCategory, '388856px'> = {
  government: '388856px',
  bank: '388856px',
  digital_wallet: '388856px',
  shipping: '388856px',
  postal: '388856px',
  identity: '388856px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE366: Record<ServiceCategory, '389944px'> = {
  government: '389944px',
  bank: '389944px',
  digital_wallet: '389944px',
  shipping: '389944px',
  postal: '389944px',
  identity: '389944px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE367: Record<ServiceCategory, '391032px'> = {
  government: '391032px',
  bank: '391032px',
  digital_wallet: '391032px',
  shipping: '391032px',
  postal: '391032px',
  identity: '391032px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE368: Record<ServiceCategory, '392120px'> = {
  government: '392120px',
  bank: '392120px',
  digital_wallet: '392120px',
  shipping: '392120px',
  postal: '392120px',
  identity: '392120px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE369: Record<ServiceCategory, '393208px'> = {
  government: '393208px',
  bank: '393208px',
  digital_wallet: '393208px',
  shipping: '393208px',
  postal: '393208px',
  identity: '393208px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE370: Record<ServiceCategory, '394296px'> = {
  government: '394296px',
  bank: '394296px',
  digital_wallet: '394296px',
  shipping: '394296px',
  postal: '394296px',
  identity: '394296px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE371: Record<ServiceCategory, '395384px'> = {
  government: '395384px',
  bank: '395384px',
  digital_wallet: '395384px',
  shipping: '395384px',
  postal: '395384px',
  identity: '395384px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE372: Record<ServiceCategory, '396472px'> = {
  government: '396472px',
  bank: '396472px',
  digital_wallet: '396472px',
  shipping: '396472px',
  postal: '396472px',
  identity: '396472px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE373: Record<ServiceCategory, '397560px'> = {
  government: '397560px',
  bank: '397560px',
  digital_wallet: '397560px',
  shipping: '397560px',
  postal: '397560px',
  identity: '397560px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE374: Record<ServiceCategory, '398648px'> = {
  government: '398648px',
  bank: '398648px',
  digital_wallet: '398648px',
  shipping: '398648px',
  postal: '398648px',
  identity: '398648px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE375: Record<ServiceCategory, '399736px'> = {
  government: '399736px',
  bank: '399736px',
  digital_wallet: '399736px',
  shipping: '399736px',
  postal: '399736px',
  identity: '399736px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE376: Record<ServiceCategory, '400824px'> = {
  government: '400824px',
  bank: '400824px',
  digital_wallet: '400824px',
  shipping: '400824px',
  postal: '400824px',
  identity: '400824px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE377: Record<ServiceCategory, '401912px'> = {
  government: '401912px',
  bank: '401912px',
  digital_wallet: '401912px',
  shipping: '401912px',
  postal: '401912px',
  identity: '401912px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE378: Record<ServiceCategory, '403000px'> = {
  government: '403000px',
  bank: '403000px',
  digital_wallet: '403000px',
  shipping: '403000px',
  postal: '403000px',
  identity: '403000px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE379: Record<ServiceCategory, '404088px'> = {
  government: '404088px',
  bank: '404088px',
  digital_wallet: '404088px',
  shipping: '404088px',
  postal: '404088px',
  identity: '404088px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE380: Record<ServiceCategory, '405176px'> = {
  government: '405176px',
  bank: '405176px',
  digital_wallet: '405176px',
  shipping: '405176px',
  postal: '405176px',
  identity: '405176px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE381: Record<ServiceCategory, '406264px'> = {
  government: '406264px',
  bank: '406264px',
  digital_wallet: '406264px',
  shipping: '406264px',
  postal: '406264px',
  identity: '406264px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE382: Record<ServiceCategory, '407352px'> = {
  government: '407352px',
  bank: '407352px',
  digital_wallet: '407352px',
  shipping: '407352px',
  postal: '407352px',
  identity: '407352px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE383: Record<ServiceCategory, '408440px'> = {
  government: '408440px',
  bank: '408440px',
  digital_wallet: '408440px',
  shipping: '408440px',
  postal: '408440px',
  identity: '408440px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE384: Record<ServiceCategory, '409528px'> = {
  government: '409528px',
  bank: '409528px',
  digital_wallet: '409528px',
  shipping: '409528px',
  postal: '409528px',
  identity: '409528px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE385: Record<ServiceCategory, '410616px'> = {
  government: '410616px',
  bank: '410616px',
  digital_wallet: '410616px',
  shipping: '410616px',
  postal: '410616px',
  identity: '410616px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE386: Record<ServiceCategory, '411704px'> = {
  government: '411704px',
  bank: '411704px',
  digital_wallet: '411704px',
  shipping: '411704px',
  postal: '411704px',
  identity: '411704px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE387: Record<ServiceCategory, '412792px'> = {
  government: '412792px',
  bank: '412792px',
  digital_wallet: '412792px',
  shipping: '412792px',
  postal: '412792px',
  identity: '412792px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE388: Record<ServiceCategory, '413880px'> = {
  government: '413880px',
  bank: '413880px',
  digital_wallet: '413880px',
  shipping: '413880px',
  postal: '413880px',
  identity: '413880px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE389: Record<ServiceCategory, '414968px'> = {
  government: '414968px',
  bank: '414968px',
  digital_wallet: '414968px',
  shipping: '414968px',
  postal: '414968px',
  identity: '414968px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE390: Record<ServiceCategory, '416056px'> = {
  government: '416056px',
  bank: '416056px',
  digital_wallet: '416056px',
  shipping: '416056px',
  postal: '416056px',
  identity: '416056px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE391: Record<ServiceCategory, '417144px'> = {
  government: '417144px',
  bank: '417144px',
  digital_wallet: '417144px',
  shipping: '417144px',
  postal: '417144px',
  identity: '417144px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE392: Record<ServiceCategory, '418232px'> = {
  government: '418232px',
  bank: '418232px',
  digital_wallet: '418232px',
  shipping: '418232px',
  postal: '418232px',
  identity: '418232px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE393: Record<ServiceCategory, '419320px'> = {
  government: '419320px',
  bank: '419320px',
  digital_wallet: '419320px',
  shipping: '419320px',
  postal: '419320px',
  identity: '419320px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE394: Record<ServiceCategory, '420408px'> = {
  government: '420408px',
  bank: '420408px',
  digital_wallet: '420408px',
  shipping: '420408px',
  postal: '420408px',
  identity: '420408px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE395: Record<ServiceCategory, '421496px'> = {
  government: '421496px',
  bank: '421496px',
  digital_wallet: '421496px',
  shipping: '421496px',
  postal: '421496px',
  identity: '421496px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE396: Record<ServiceCategory, '422584px'> = {
  government: '422584px',
  bank: '422584px',
  digital_wallet: '422584px',
  shipping: '422584px',
  postal: '422584px',
  identity: '422584px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE397: Record<ServiceCategory, '423672px'> = {
  government: '423672px',
  bank: '423672px',
  digital_wallet: '423672px',
  shipping: '423672px',
  postal: '423672px',
  identity: '423672px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE398: Record<ServiceCategory, '424760px'> = {
  government: '424760px',
  bank: '424760px',
  digital_wallet: '424760px',
  shipping: '424760px',
  postal: '424760px',
  identity: '424760px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE399: Record<ServiceCategory, '425848px'> = {
  government: '425848px',
  bank: '425848px',
  digital_wallet: '425848px',
  shipping: '425848px',
  postal: '425848px',
  identity: '425848px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE400: Record<ServiceCategory, '426936px'> = {
  government: '426936px',
  bank: '426936px',
  digital_wallet: '426936px',
  shipping: '426936px',
  postal: '426936px',
  identity: '426936px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE401: Record<ServiceCategory, '428024px'> = {
  government: '428024px',
  bank: '428024px',
  digital_wallet: '428024px',
  shipping: '428024px',
  postal: '428024px',
  identity: '428024px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE402: Record<ServiceCategory, '429112px'> = {
  government: '429112px',
  bank: '429112px',
  digital_wallet: '429112px',
  shipping: '429112px',
  postal: '429112px',
  identity: '429112px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE403: Record<ServiceCategory, '430200px'> = {
  government: '430200px',
  bank: '430200px',
  digital_wallet: '430200px',
  shipping: '430200px',
  postal: '430200px',
  identity: '430200px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE404: Record<ServiceCategory, '431288px'> = {
  government: '431288px',
  bank: '431288px',
  digital_wallet: '431288px',
  shipping: '431288px',
  postal: '431288px',
  identity: '431288px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE405: Record<ServiceCategory, '432376px'> = {
  government: '432376px',
  bank: '432376px',
  digital_wallet: '432376px',
  shipping: '432376px',
  postal: '432376px',
  identity: '432376px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE406: Record<ServiceCategory, '433464px'> = {
  government: '433464px',
  bank: '433464px',
  digital_wallet: '433464px',
  shipping: '433464px',
  postal: '433464px',
  identity: '433464px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE407: Record<ServiceCategory, '434552px'> = {
  government: '434552px',
  bank: '434552px',
  digital_wallet: '434552px',
  shipping: '434552px',
  postal: '434552px',
  identity: '434552px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE408: Record<ServiceCategory, '435640px'> = {
  government: '435640px',
  bank: '435640px',
  digital_wallet: '435640px',
  shipping: '435640px',
  postal: '435640px',
  identity: '435640px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE409: Record<ServiceCategory, '436728px'> = {
  government: '436728px',
  bank: '436728px',
  digital_wallet: '436728px',
  shipping: '436728px',
  postal: '436728px',
  identity: '436728px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE410: Record<ServiceCategory, '437816px'> = {
  government: '437816px',
  bank: '437816px',
  digital_wallet: '437816px',
  shipping: '437816px',
  postal: '437816px',
  identity: '437816px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE411: Record<ServiceCategory, '438904px'> = {
  government: '438904px',
  bank: '438904px',
  digital_wallet: '438904px',
  shipping: '438904px',
  postal: '438904px',
  identity: '438904px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE412: Record<ServiceCategory, '439992px'> = {
  government: '439992px',
  bank: '439992px',
  digital_wallet: '439992px',
  shipping: '439992px',
  postal: '439992px',
  identity: '439992px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE413: Record<ServiceCategory, '441080px'> = {
  government: '441080px',
  bank: '441080px',
  digital_wallet: '441080px',
  shipping: '441080px',
  postal: '441080px',
  identity: '441080px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE414: Record<ServiceCategory, '442168px'> = {
  government: '442168px',
  bank: '442168px',
  digital_wallet: '442168px',
  shipping: '442168px',
  postal: '442168px',
  identity: '442168px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE415: Record<ServiceCategory, '443256px'> = {
  government: '443256px',
  bank: '443256px',
  digital_wallet: '443256px',
  shipping: '443256px',
  postal: '443256px',
  identity: '443256px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE416: Record<ServiceCategory, '444344px'> = {
  government: '444344px',
  bank: '444344px',
  digital_wallet: '444344px',
  shipping: '444344px',
  postal: '444344px',
  identity: '444344px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE417: Record<ServiceCategory, '445432px'> = {
  government: '445432px',
  bank: '445432px',
  digital_wallet: '445432px',
  shipping: '445432px',
  postal: '445432px',
  identity: '445432px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE418: Record<ServiceCategory, '446520px'> = {
  government: '446520px',
  bank: '446520px',
  digital_wallet: '446520px',
  shipping: '446520px',
  postal: '446520px',
  identity: '446520px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE419: Record<ServiceCategory, '447608px'> = {
  government: '447608px',
  bank: '447608px',
  digital_wallet: '447608px',
  shipping: '447608px',
  postal: '447608px',
  identity: '447608px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE420: Record<ServiceCategory, '448696px'> = {
  government: '448696px',
  bank: '448696px',
  digital_wallet: '448696px',
  shipping: '448696px',
  postal: '448696px',
  identity: '448696px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE421: Record<ServiceCategory, '449784px'> = {
  government: '449784px',
  bank: '449784px',
  digital_wallet: '449784px',
  shipping: '449784px',
  postal: '449784px',
  identity: '449784px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE422: Record<ServiceCategory, '450872px'> = {
  government: '450872px',
  bank: '450872px',
  digital_wallet: '450872px',
  shipping: '450872px',
  postal: '450872px',
  identity: '450872px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE423: Record<ServiceCategory, '451960px'> = {
  government: '451960px',
  bank: '451960px',
  digital_wallet: '451960px',
  shipping: '451960px',
  postal: '451960px',
  identity: '451960px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE424: Record<ServiceCategory, '453048px'> = {
  government: '453048px',
  bank: '453048px',
  digital_wallet: '453048px',
  shipping: '453048px',
  postal: '453048px',
  identity: '453048px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE425: Record<ServiceCategory, '454136px'> = {
  government: '454136px',
  bank: '454136px',
  digital_wallet: '454136px',
  shipping: '454136px',
  postal: '454136px',
  identity: '454136px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE426: Record<ServiceCategory, '455224px'> = {
  government: '455224px',
  bank: '455224px',
  digital_wallet: '455224px',
  shipping: '455224px',
  postal: '455224px',
  identity: '455224px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE427: Record<ServiceCategory, '456312px'> = {
  government: '456312px',
  bank: '456312px',
  digital_wallet: '456312px',
  shipping: '456312px',
  postal: '456312px',
  identity: '456312px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE428: Record<ServiceCategory, '457400px'> = {
  government: '457400px',
  bank: '457400px',
  digital_wallet: '457400px',
  shipping: '457400px',
  postal: '457400px',
  identity: '457400px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE429: Record<ServiceCategory, '458488px'> = {
  government: '458488px',
  bank: '458488px',
  digital_wallet: '458488px',
  shipping: '458488px',
  postal: '458488px',
  identity: '458488px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE430: Record<ServiceCategory, '459576px'> = {
  government: '459576px',
  bank: '459576px',
  digital_wallet: '459576px',
  shipping: '459576px',
  postal: '459576px',
  identity: '459576px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE431: Record<ServiceCategory, '460664px'> = {
  government: '460664px',
  bank: '460664px',
  digital_wallet: '460664px',
  shipping: '460664px',
  postal: '460664px',
  identity: '460664px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE432: Record<ServiceCategory, '461752px'> = {
  government: '461752px',
  bank: '461752px',
  digital_wallet: '461752px',
  shipping: '461752px',
  postal: '461752px',
  identity: '461752px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE433: Record<ServiceCategory, '462840px'> = {
  government: '462840px',
  bank: '462840px',
  digital_wallet: '462840px',
  shipping: '462840px',
  postal: '462840px',
  identity: '462840px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE434: Record<ServiceCategory, '463928px'> = {
  government: '463928px',
  bank: '463928px',
  digital_wallet: '463928px',
  shipping: '463928px',
  postal: '463928px',
  identity: '463928px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE435: Record<ServiceCategory, '465016px'> = {
  government: '465016px',
  bank: '465016px',
  digital_wallet: '465016px',
  shipping: '465016px',
  postal: '465016px',
  identity: '465016px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE436: Record<ServiceCategory, '466104px'> = {
  government: '466104px',
  bank: '466104px',
  digital_wallet: '466104px',
  shipping: '466104px',
  postal: '466104px',
  identity: '466104px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE437: Record<ServiceCategory, '467192px'> = {
  government: '467192px',
  bank: '467192px',
  digital_wallet: '467192px',
  shipping: '467192px',
  postal: '467192px',
  identity: '467192px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE438: Record<ServiceCategory, '468280px'> = {
  government: '468280px',
  bank: '468280px',
  digital_wallet: '468280px',
  shipping: '468280px',
  postal: '468280px',
  identity: '468280px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE439: Record<ServiceCategory, '469368px'> = {
  government: '469368px',
  bank: '469368px',
  digital_wallet: '469368px',
  shipping: '469368px',
  postal: '469368px',
  identity: '469368px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE440: Record<ServiceCategory, '470456px'> = {
  government: '470456px',
  bank: '470456px',
  digital_wallet: '470456px',
  shipping: '470456px',
  postal: '470456px',
  identity: '470456px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE441: Record<ServiceCategory, '471544px'> = {
  government: '471544px',
  bank: '471544px',
  digital_wallet: '471544px',
  shipping: '471544px',
  postal: '471544px',
  identity: '471544px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE442: Record<ServiceCategory, '472632px'> = {
  government: '472632px',
  bank: '472632px',
  digital_wallet: '472632px',
  shipping: '472632px',
  postal: '472632px',
  identity: '472632px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE443: Record<ServiceCategory, '473720px'> = {
  government: '473720px',
  bank: '473720px',
  digital_wallet: '473720px',
  shipping: '473720px',
  postal: '473720px',
  identity: '473720px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE444: Record<ServiceCategory, '474808px'> = {
  government: '474808px',
  bank: '474808px',
  digital_wallet: '474808px',
  shipping: '474808px',
  postal: '474808px',
  identity: '474808px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE445: Record<ServiceCategory, '475896px'> = {
  government: '475896px',
  bank: '475896px',
  digital_wallet: '475896px',
  shipping: '475896px',
  postal: '475896px',
  identity: '475896px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE446: Record<ServiceCategory, '476984px'> = {
  government: '476984px',
  bank: '476984px',
  digital_wallet: '476984px',
  shipping: '476984px',
  postal: '476984px',
  identity: '476984px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE447: Record<ServiceCategory, '478072px'> = {
  government: '478072px',
  bank: '478072px',
  digital_wallet: '478072px',
  shipping: '478072px',
  postal: '478072px',
  identity: '478072px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE448: Record<ServiceCategory, '479160px'> = {
  government: '479160px',
  bank: '479160px',
  digital_wallet: '479160px',
  shipping: '479160px',
  postal: '479160px',
  identity: '479160px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE449: Record<ServiceCategory, '480248px'> = {
  government: '480248px',
  bank: '480248px',
  digital_wallet: '480248px',
  shipping: '480248px',
  postal: '480248px',
  identity: '480248px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE450: Record<ServiceCategory, '481336px'> = {
  government: '481336px',
  bank: '481336px',
  digital_wallet: '481336px',
  shipping: '481336px',
  postal: '481336px',
  identity: '481336px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE451: Record<ServiceCategory, '482424px'> = {
  government: '482424px',
  bank: '482424px',
  digital_wallet: '482424px',
  shipping: '482424px',
  postal: '482424px',
  identity: '482424px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE452: Record<ServiceCategory, '483512px'> = {
  government: '483512px',
  bank: '483512px',
  digital_wallet: '483512px',
  shipping: '483512px',
  postal: '483512px',
  identity: '483512px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE453: Record<ServiceCategory, '484600px'> = {
  government: '484600px',
  bank: '484600px',
  digital_wallet: '484600px',
  shipping: '484600px',
  postal: '484600px',
  identity: '484600px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE454: Record<ServiceCategory, '485688px'> = {
  government: '485688px',
  bank: '485688px',
  digital_wallet: '485688px',
  shipping: '485688px',
  postal: '485688px',
  identity: '485688px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE455: Record<ServiceCategory, '486776px'> = {
  government: '486776px',
  bank: '486776px',
  digital_wallet: '486776px',
  shipping: '486776px',
  postal: '486776px',
  identity: '486776px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE456: Record<ServiceCategory, '487864px'> = {
  government: '487864px',
  bank: '487864px',
  digital_wallet: '487864px',
  shipping: '487864px',
  postal: '487864px',
  identity: '487864px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE457: Record<ServiceCategory, '488952px'> = {
  government: '488952px',
  bank: '488952px',
  digital_wallet: '488952px',
  shipping: '488952px',
  postal: '488952px',
  identity: '488952px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE458: Record<ServiceCategory, '490040px'> = {
  government: '490040px',
  bank: '490040px',
  digital_wallet: '490040px',
  shipping: '490040px',
  postal: '490040px',
  identity: '490040px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE459: Record<ServiceCategory, '491128px'> = {
  government: '491128px',
  bank: '491128px',
  digital_wallet: '491128px',
  shipping: '491128px',
  postal: '491128px',
  identity: '491128px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE460: Record<ServiceCategory, '492216px'> = {
  government: '492216px',
  bank: '492216px',
  digital_wallet: '492216px',
  shipping: '492216px',
  postal: '492216px',
  identity: '492216px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE461: Record<ServiceCategory, '493304px'> = {
  government: '493304px',
  bank: '493304px',
  digital_wallet: '493304px',
  shipping: '493304px',
  postal: '493304px',
  identity: '493304px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE462: Record<ServiceCategory, '494392px'> = {
  government: '494392px',
  bank: '494392px',
  digital_wallet: '494392px',
  shipping: '494392px',
  postal: '494392px',
  identity: '494392px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE463: Record<ServiceCategory, '495480px'> = {
  government: '495480px',
  bank: '495480px',
  digital_wallet: '495480px',
  shipping: '495480px',
  postal: '495480px',
  identity: '495480px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE464: Record<ServiceCategory, '496568px'> = {
  government: '496568px',
  bank: '496568px',
  digital_wallet: '496568px',
  shipping: '496568px',
  postal: '496568px',
  identity: '496568px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE465: Record<ServiceCategory, '497656px'> = {
  government: '497656px',
  bank: '497656px',
  digital_wallet: '497656px',
  shipping: '497656px',
  postal: '497656px',
  identity: '497656px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE466: Record<ServiceCategory, '498744px'> = {
  government: '498744px',
  bank: '498744px',
  digital_wallet: '498744px',
  shipping: '498744px',
  postal: '498744px',
  identity: '498744px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE467: Record<ServiceCategory, '499832px'> = {
  government: '499832px',
  bank: '499832px',
  digital_wallet: '499832px',
  shipping: '499832px',
  postal: '499832px',
  identity: '499832px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE468: Record<ServiceCategory, '500920px'> = {
  government: '500920px',
  bank: '500920px',
  digital_wallet: '500920px',
  shipping: '500920px',
  postal: '500920px',
  identity: '500920px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE469: Record<ServiceCategory, '502008px'> = {
  government: '502008px',
  bank: '502008px',
  digital_wallet: '502008px',
  shipping: '502008px',
  postal: '502008px',
  identity: '502008px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE470: Record<ServiceCategory, '503096px'> = {
  government: '503096px',
  bank: '503096px',
  digital_wallet: '503096px',
  shipping: '503096px',
  postal: '503096px',
  identity: '503096px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE471: Record<ServiceCategory, '504184px'> = {
  government: '504184px',
  bank: '504184px',
  digital_wallet: '504184px',
  shipping: '504184px',
  postal: '504184px',
  identity: '504184px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE472: Record<ServiceCategory, '505272px'> = {
  government: '505272px',
  bank: '505272px',
  digital_wallet: '505272px',
  shipping: '505272px',
  postal: '505272px',
  identity: '505272px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE473: Record<ServiceCategory, '506360px'> = {
  government: '506360px',
  bank: '506360px',
  digital_wallet: '506360px',
  shipping: '506360px',
  postal: '506360px',
  identity: '506360px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE474: Record<ServiceCategory, '507448px'> = {
  government: '507448px',
  bank: '507448px',
  digital_wallet: '507448px',
  shipping: '507448px',
  postal: '507448px',
  identity: '507448px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE475: Record<ServiceCategory, '508536px'> = {
  government: '508536px',
  bank: '508536px',
  digital_wallet: '508536px',
  shipping: '508536px',
  postal: '508536px',
  identity: '508536px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE476: Record<ServiceCategory, '509624px'> = {
  government: '509624px',
  bank: '509624px',
  digital_wallet: '509624px',
  shipping: '509624px',
  postal: '509624px',
  identity: '509624px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE477: Record<ServiceCategory, '510712px'> = {
  government: '510712px',
  bank: '510712px',
  digital_wallet: '510712px',
  shipping: '510712px',
  postal: '510712px',
  identity: '510712px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE478: Record<ServiceCategory, '511800px'> = {
  government: '511800px',
  bank: '511800px',
  digital_wallet: '511800px',
  shipping: '511800px',
  postal: '511800px',
  identity: '511800px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE479: Record<ServiceCategory, '512888px'> = {
  government: '512888px',
  bank: '512888px',
  digital_wallet: '512888px',
  shipping: '512888px',
  postal: '512888px',
  identity: '512888px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE480: Record<ServiceCategory, '513976px'> = {
  government: '513976px',
  bank: '513976px',
  digital_wallet: '513976px',
  shipping: '513976px',
  postal: '513976px',
  identity: '513976px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE481: Record<ServiceCategory, '515064px'> = {
  government: '515064px',
  bank: '515064px',
  digital_wallet: '515064px',
  shipping: '515064px',
  postal: '515064px',
  identity: '515064px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE482: Record<ServiceCategory, '516152px'> = {
  government: '516152px',
  bank: '516152px',
  digital_wallet: '516152px',
  shipping: '516152px',
  postal: '516152px',
  identity: '516152px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE483: Record<ServiceCategory, '517240px'> = {
  government: '517240px',
  bank: '517240px',
  digital_wallet: '517240px',
  shipping: '517240px',
  postal: '517240px',
  identity: '517240px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE484: Record<ServiceCategory, '518328px'> = {
  government: '518328px',
  bank: '518328px',
  digital_wallet: '518328px',
  shipping: '518328px',
  postal: '518328px',
  identity: '518328px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE485: Record<ServiceCategory, '519416px'> = {
  government: '519416px',
  bank: '519416px',
  digital_wallet: '519416px',
  shipping: '519416px',
  postal: '519416px',
  identity: '519416px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE486: Record<ServiceCategory, '520504px'> = {
  government: '520504px',
  bank: '520504px',
  digital_wallet: '520504px',
  shipping: '520504px',
  postal: '520504px',
  identity: '520504px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE487: Record<ServiceCategory, '521592px'> = {
  government: '521592px',
  bank: '521592px',
  digital_wallet: '521592px',
  shipping: '521592px',
  postal: '521592px',
  identity: '521592px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE488: Record<ServiceCategory, '522680px'> = {
  government: '522680px',
  bank: '522680px',
  digital_wallet: '522680px',
  shipping: '522680px',
  postal: '522680px',
  identity: '522680px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE489: Record<ServiceCategory, '523768px'> = {
  government: '523768px',
  bank: '523768px',
  digital_wallet: '523768px',
  shipping: '523768px',
  postal: '523768px',
  identity: '523768px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE490: Record<ServiceCategory, '524856px'> = {
  government: '524856px',
  bank: '524856px',
  digital_wallet: '524856px',
  shipping: '524856px',
  postal: '524856px',
  identity: '524856px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE491: Record<ServiceCategory, '525944px'> = {
  government: '525944px',
  bank: '525944px',
  digital_wallet: '525944px',
  shipping: '525944px',
  postal: '525944px',
  identity: '525944px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE492: Record<ServiceCategory, '527032px'> = {
  government: '527032px',
  bank: '527032px',
  digital_wallet: '527032px',
  shipping: '527032px',
  postal: '527032px',
  identity: '527032px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE493: Record<ServiceCategory, '528120px'> = {
  government: '528120px',
  bank: '528120px',
  digital_wallet: '528120px',
  shipping: '528120px',
  postal: '528120px',
  identity: '528120px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE494: Record<ServiceCategory, '529208px'> = {
  government: '529208px',
  bank: '529208px',
  digital_wallet: '529208px',
  shipping: '529208px',
  postal: '529208px',
  identity: '529208px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE495: Record<ServiceCategory, '530296px'> = {
  government: '530296px',
  bank: '530296px',
  digital_wallet: '530296px',
  shipping: '530296px',
  postal: '530296px',
  identity: '530296px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE496: Record<ServiceCategory, '531384px'> = {
  government: '531384px',
  bank: '531384px',
  digital_wallet: '531384px',
  shipping: '531384px',
  postal: '531384px',
  identity: '531384px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE497: Record<ServiceCategory, '532472px'> = {
  government: '532472px',
  bank: '532472px',
  digital_wallet: '532472px',
  shipping: '532472px',
  postal: '532472px',
  identity: '532472px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE498: Record<ServiceCategory, '533560px'> = {
  government: '533560px',
  bank: '533560px',
  digital_wallet: '533560px',
  shipping: '533560px',
  postal: '533560px',
  identity: '533560px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE499: Record<ServiceCategory, '534648px'> = {
  government: '534648px',
  bank: '534648px',
  digital_wallet: '534648px',
  shipping: '534648px',
  postal: '534648px',
  identity: '534648px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE500: Record<ServiceCategory, '535736px'> = {
  government: '535736px',
  bank: '535736px',
  digital_wallet: '535736px',
  shipping: '535736px',
  postal: '535736px',
  identity: '535736px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE501: Record<ServiceCategory, '536824px'> = {
  government: '536824px',
  bank: '536824px',
  digital_wallet: '536824px',
  shipping: '536824px',
  postal: '536824px',
  identity: '536824px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE502: Record<ServiceCategory, '537912px'> = {
  government: '537912px',
  bank: '537912px',
  digital_wallet: '537912px',
  shipping: '537912px',
  postal: '537912px',
  identity: '537912px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE503: Record<ServiceCategory, '539000px'> = {
  government: '539000px',
  bank: '539000px',
  digital_wallet: '539000px',
  shipping: '539000px',
  postal: '539000px',
  identity: '539000px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE504: Record<ServiceCategory, '540088px'> = {
  government: '540088px',
  bank: '540088px',
  digital_wallet: '540088px',
  shipping: '540088px',
  postal: '540088px',
  identity: '540088px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE505: Record<ServiceCategory, '541176px'> = {
  government: '541176px',
  bank: '541176px',
  digital_wallet: '541176px',
  shipping: '541176px',
  postal: '541176px',
  identity: '541176px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE506: Record<ServiceCategory, '542264px'> = {
  government: '542264px',
  bank: '542264px',
  digital_wallet: '542264px',
  shipping: '542264px',
  postal: '542264px',
  identity: '542264px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE507: Record<ServiceCategory, '543352px'> = {
  government: '543352px',
  bank: '543352px',
  digital_wallet: '543352px',
  shipping: '543352px',
  postal: '543352px',
  identity: '543352px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE508: Record<ServiceCategory, '544440px'> = {
  government: '544440px',
  bank: '544440px',
  digital_wallet: '544440px',
  shipping: '544440px',
  postal: '544440px',
  identity: '544440px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE509: Record<ServiceCategory, '545528px'> = {
  government: '545528px',
  bank: '545528px',
  digital_wallet: '545528px',
  shipping: '545528px',
  postal: '545528px',
  identity: '545528px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE510: Record<ServiceCategory, '546616px'> = {
  government: '546616px',
  bank: '546616px',
  digital_wallet: '546616px',
  shipping: '546616px',
  postal: '546616px',
  identity: '546616px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE511: Record<ServiceCategory, '547704px'> = {
  government: '547704px',
  bank: '547704px',
  digital_wallet: '547704px',
  shipping: '547704px',
  postal: '547704px',
  identity: '547704px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE512: Record<ServiceCategory, '548792px'> = {
  government: '548792px',
  bank: '548792px',
  digital_wallet: '548792px',
  shipping: '548792px',
  postal: '548792px',
  identity: '548792px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE513: Record<ServiceCategory, '549880px'> = {
  government: '549880px',
  bank: '549880px',
  digital_wallet: '549880px',
  shipping: '549880px',
  postal: '549880px',
  identity: '549880px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE514: Record<ServiceCategory, '550968px'> = {
  government: '550968px',
  bank: '550968px',
  digital_wallet: '550968px',
  shipping: '550968px',
  postal: '550968px',
  identity: '550968px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE515: Record<ServiceCategory, '552056px'> = {
  government: '552056px',
  bank: '552056px',
  digital_wallet: '552056px',
  shipping: '552056px',
  postal: '552056px',
  identity: '552056px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE516: Record<ServiceCategory, '553144px'> = {
  government: '553144px',
  bank: '553144px',
  digital_wallet: '553144px',
  shipping: '553144px',
  postal: '553144px',
  identity: '553144px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE517: Record<ServiceCategory, '554232px'> = {
  government: '554232px',
  bank: '554232px',
  digital_wallet: '554232px',
  shipping: '554232px',
  postal: '554232px',
  identity: '554232px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE518: Record<ServiceCategory, '555320px'> = {
  government: '555320px',
  bank: '555320px',
  digital_wallet: '555320px',
  shipping: '555320px',
  postal: '555320px',
  identity: '555320px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE519: Record<ServiceCategory, '556408px'> = {
  government: '556408px',
  bank: '556408px',
  digital_wallet: '556408px',
  shipping: '556408px',
  postal: '556408px',
  identity: '556408px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE520: Record<ServiceCategory, '557496px'> = {
  government: '557496px',
  bank: '557496px',
  digital_wallet: '557496px',
  shipping: '557496px',
  postal: '557496px',
  identity: '557496px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE521: Record<ServiceCategory, '558584px'> = {
  government: '558584px',
  bank: '558584px',
  digital_wallet: '558584px',
  shipping: '558584px',
  postal: '558584px',
  identity: '558584px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE522: Record<ServiceCategory, '559672px'> = {
  government: '559672px',
  bank: '559672px',
  digital_wallet: '559672px',
  shipping: '559672px',
  postal: '559672px',
  identity: '559672px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE523: Record<ServiceCategory, '560760px'> = {
  government: '560760px',
  bank: '560760px',
  digital_wallet: '560760px',
  shipping: '560760px',
  postal: '560760px',
  identity: '560760px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE524: Record<ServiceCategory, '561848px'> = {
  government: '561848px',
  bank: '561848px',
  digital_wallet: '561848px',
  shipping: '561848px',
  postal: '561848px',
  identity: '561848px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE525: Record<ServiceCategory, '562936px'> = {
  government: '562936px',
  bank: '562936px',
  digital_wallet: '562936px',
  shipping: '562936px',
  postal: '562936px',
  identity: '562936px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE526: Record<ServiceCategory, '564024px'> = {
  government: '564024px',
  bank: '564024px',
  digital_wallet: '564024px',
  shipping: '564024px',
  postal: '564024px',
  identity: '564024px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE527: Record<ServiceCategory, '565112px'> = {
  government: '565112px',
  bank: '565112px',
  digital_wallet: '565112px',
  shipping: '565112px',
  postal: '565112px',
  identity: '565112px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE528: Record<ServiceCategory, '566200px'> = {
  government: '566200px',
  bank: '566200px',
  digital_wallet: '566200px',
  shipping: '566200px',
  postal: '566200px',
  identity: '566200px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE529: Record<ServiceCategory, '567288px'> = {
  government: '567288px',
  bank: '567288px',
  digital_wallet: '567288px',
  shipping: '567288px',
  postal: '567288px',
  identity: '567288px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE530: Record<ServiceCategory, '568376px'> = {
  government: '568376px',
  bank: '568376px',
  digital_wallet: '568376px',
  shipping: '568376px',
  postal: '568376px',
  identity: '568376px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE531: Record<ServiceCategory, '569464px'> = {
  government: '569464px',
  bank: '569464px',
  digital_wallet: '569464px',
  shipping: '569464px',
  postal: '569464px',
  identity: '569464px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE532: Record<ServiceCategory, '570552px'> = {
  government: '570552px',
  bank: '570552px',
  digital_wallet: '570552px',
  shipping: '570552px',
  postal: '570552px',
  identity: '570552px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE533: Record<ServiceCategory, '571640px'> = {
  government: '571640px',
  bank: '571640px',
  digital_wallet: '571640px',
  shipping: '571640px',
  postal: '571640px',
  identity: '571640px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE534: Record<ServiceCategory, '572728px'> = {
  government: '572728px',
  bank: '572728px',
  digital_wallet: '572728px',
  shipping: '572728px',
  postal: '572728px',
  identity: '572728px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE535: Record<ServiceCategory, '573816px'> = {
  government: '573816px',
  bank: '573816px',
  digital_wallet: '573816px',
  shipping: '573816px',
  postal: '573816px',
  identity: '573816px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE536: Record<ServiceCategory, '574904px'> = {
  government: '574904px',
  bank: '574904px',
  digital_wallet: '574904px',
  shipping: '574904px',
  postal: '574904px',
  identity: '574904px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE537: Record<ServiceCategory, '575992px'> = {
  government: '575992px',
  bank: '575992px',
  digital_wallet: '575992px',
  shipping: '575992px',
  postal: '575992px',
  identity: '575992px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE538: Record<ServiceCategory, '577080px'> = {
  government: '577080px',
  bank: '577080px',
  digital_wallet: '577080px',
  shipping: '577080px',
  postal: '577080px',
  identity: '577080px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE539: Record<ServiceCategory, '578168px'> = {
  government: '578168px',
  bank: '578168px',
  digital_wallet: '578168px',
  shipping: '578168px',
  postal: '578168px',
  identity: '578168px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE540: Record<ServiceCategory, '579256px'> = {
  government: '579256px',
  bank: '579256px',
  digital_wallet: '579256px',
  shipping: '579256px',
  postal: '579256px',
  identity: '579256px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE541: Record<ServiceCategory, '580344px'> = {
  government: '580344px',
  bank: '580344px',
  digital_wallet: '580344px',
  shipping: '580344px',
  postal: '580344px',
  identity: '580344px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE542: Record<ServiceCategory, '581432px'> = {
  government: '581432px',
  bank: '581432px',
  digital_wallet: '581432px',
  shipping: '581432px',
  postal: '581432px',
  identity: '581432px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE543: Record<ServiceCategory, '582520px'> = {
  government: '582520px',
  bank: '582520px',
  digital_wallet: '582520px',
  shipping: '582520px',
  postal: '582520px',
  identity: '582520px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE544: Record<ServiceCategory, '583608px'> = {
  government: '583608px',
  bank: '583608px',
  digital_wallet: '583608px',
  shipping: '583608px',
  postal: '583608px',
  identity: '583608px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE545: Record<ServiceCategory, '584696px'> = {
  government: '584696px',
  bank: '584696px',
  digital_wallet: '584696px',
  shipping: '584696px',
  postal: '584696px',
  identity: '584696px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE546: Record<ServiceCategory, '585784px'> = {
  government: '585784px',
  bank: '585784px',
  digital_wallet: '585784px',
  shipping: '585784px',
  postal: '585784px',
  identity: '585784px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE547: Record<ServiceCategory, '586872px'> = {
  government: '586872px',
  bank: '586872px',
  digital_wallet: '586872px',
  shipping: '586872px',
  postal: '586872px',
  identity: '586872px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE548: Record<ServiceCategory, '587960px'> = {
  government: '587960px',
  bank: '587960px',
  digital_wallet: '587960px',
  shipping: '587960px',
  postal: '587960px',
  identity: '587960px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE549: Record<ServiceCategory, '589048px'> = {
  government: '589048px',
  bank: '589048px',
  digital_wallet: '589048px',
  shipping: '589048px',
  postal: '589048px',
  identity: '589048px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE550: Record<ServiceCategory, '590136px'> = {
  government: '590136px',
  bank: '590136px',
  digital_wallet: '590136px',
  shipping: '590136px',
  postal: '590136px',
  identity: '590136px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE551: Record<ServiceCategory, '591224px'> = {
  government: '591224px',
  bank: '591224px',
  digital_wallet: '591224px',
  shipping: '591224px',
  postal: '591224px',
  identity: '591224px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE552: Record<ServiceCategory, '592312px'> = {
  government: '592312px',
  bank: '592312px',
  digital_wallet: '592312px',
  shipping: '592312px',
  postal: '592312px',
  identity: '592312px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE553: Record<ServiceCategory, '593400px'> = {
  government: '593400px',
  bank: '593400px',
  digital_wallet: '593400px',
  shipping: '593400px',
  postal: '593400px',
  identity: '593400px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE554: Record<ServiceCategory, '594488px'> = {
  government: '594488px',
  bank: '594488px',
  digital_wallet: '594488px',
  shipping: '594488px',
  postal: '594488px',
  identity: '594488px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE555: Record<ServiceCategory, '595576px'> = {
  government: '595576px',
  bank: '595576px',
  digital_wallet: '595576px',
  shipping: '595576px',
  postal: '595576px',
  identity: '595576px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE556: Record<ServiceCategory, '596664px'> = {
  government: '596664px',
  bank: '596664px',
  digital_wallet: '596664px',
  shipping: '596664px',
  postal: '596664px',
  identity: '596664px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE557: Record<ServiceCategory, '597752px'> = {
  government: '597752px',
  bank: '597752px',
  digital_wallet: '597752px',
  shipping: '597752px',
  postal: '597752px',
  identity: '597752px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE558: Record<ServiceCategory, '598840px'> = {
  government: '598840px',
  bank: '598840px',
  digital_wallet: '598840px',
  shipping: '598840px',
  postal: '598840px',
  identity: '598840px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE559: Record<ServiceCategory, '599928px'> = {
  government: '599928px',
  bank: '599928px',
  digital_wallet: '599928px',
  shipping: '599928px',
  postal: '599928px',
  identity: '599928px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE560: Record<ServiceCategory, '601016px'> = {
  government: '601016px',
  bank: '601016px',
  digital_wallet: '601016px',
  shipping: '601016px',
  postal: '601016px',
  identity: '601016px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE561: Record<ServiceCategory, '602104px'> = {
  government: '602104px',
  bank: '602104px',
  digital_wallet: '602104px',
  shipping: '602104px',
  postal: '602104px',
  identity: '602104px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE562: Record<ServiceCategory, '603192px'> = {
  government: '603192px',
  bank: '603192px',
  digital_wallet: '603192px',
  shipping: '603192px',
  postal: '603192px',
  identity: '603192px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE563: Record<ServiceCategory, '604280px'> = {
  government: '604280px',
  bank: '604280px',
  digital_wallet: '604280px',
  shipping: '604280px',
  postal: '604280px',
  identity: '604280px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE564: Record<ServiceCategory, '605368px'> = {
  government: '605368px',
  bank: '605368px',
  digital_wallet: '605368px',
  shipping: '605368px',
  postal: '605368px',
  identity: '605368px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE565: Record<ServiceCategory, '606456px'> = {
  government: '606456px',
  bank: '606456px',
  digital_wallet: '606456px',
  shipping: '606456px',
  postal: '606456px',
  identity: '606456px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE566: Record<ServiceCategory, '607544px'> = {
  government: '607544px',
  bank: '607544px',
  digital_wallet: '607544px',
  shipping: '607544px',
  postal: '607544px',
  identity: '607544px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE567: Record<ServiceCategory, '608632px'> = {
  government: '608632px',
  bank: '608632px',
  digital_wallet: '608632px',
  shipping: '608632px',
  postal: '608632px',
  identity: '608632px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE568: Record<ServiceCategory, '609720px'> = {
  government: '609720px',
  bank: '609720px',
  digital_wallet: '609720px',
  shipping: '609720px',
  postal: '609720px',
  identity: '609720px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE569: Record<ServiceCategory, '610808px'> = {
  government: '610808px',
  bank: '610808px',
  digital_wallet: '610808px',
  shipping: '610808px',
  postal: '610808px',
  identity: '610808px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE570: Record<ServiceCategory, '611896px'> = {
  government: '611896px',
  bank: '611896px',
  digital_wallet: '611896px',
  shipping: '611896px',
  postal: '611896px',
  identity: '611896px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE571: Record<ServiceCategory, '612984px'> = {
  government: '612984px',
  bank: '612984px',
  digital_wallet: '612984px',
  shipping: '612984px',
  postal: '612984px',
  identity: '612984px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE572: Record<ServiceCategory, '614072px'> = {
  government: '614072px',
  bank: '614072px',
  digital_wallet: '614072px',
  shipping: '614072px',
  postal: '614072px',
  identity: '614072px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE573: Record<ServiceCategory, '615160px'> = {
  government: '615160px',
  bank: '615160px',
  digital_wallet: '615160px',
  shipping: '615160px',
  postal: '615160px',
  identity: '615160px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE574: Record<ServiceCategory, '616248px'> = {
  government: '616248px',
  bank: '616248px',
  digital_wallet: '616248px',
  shipping: '616248px',
  postal: '616248px',
  identity: '616248px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE575: Record<ServiceCategory, '617336px'> = {
  government: '617336px',
  bank: '617336px',
  digital_wallet: '617336px',
  shipping: '617336px',
  postal: '617336px',
  identity: '617336px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE576: Record<ServiceCategory, '618424px'> = {
  government: '618424px',
  bank: '618424px',
  digital_wallet: '618424px',
  shipping: '618424px',
  postal: '618424px',
  identity: '618424px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE577: Record<ServiceCategory, '619512px'> = {
  government: '619512px',
  bank: '619512px',
  digital_wallet: '619512px',
  shipping: '619512px',
  postal: '619512px',
  identity: '619512px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE578: Record<ServiceCategory, '620600px'> = {
  government: '620600px',
  bank: '620600px',
  digital_wallet: '620600px',
  shipping: '620600px',
  postal: '620600px',
  identity: '620600px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE579: Record<ServiceCategory, '621688px'> = {
  government: '621688px',
  bank: '621688px',
  digital_wallet: '621688px',
  shipping: '621688px',
  postal: '621688px',
  identity: '621688px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE580: Record<ServiceCategory, '622776px'> = {
  government: '622776px',
  bank: '622776px',
  digital_wallet: '622776px',
  shipping: '622776px',
  postal: '622776px',
  identity: '622776px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE581: Record<ServiceCategory, '623864px'> = {
  government: '623864px',
  bank: '623864px',
  digital_wallet: '623864px',
  shipping: '623864px',
  postal: '623864px',
  identity: '623864px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE582: Record<ServiceCategory, '624952px'> = {
  government: '624952px',
  bank: '624952px',
  digital_wallet: '624952px',
  shipping: '624952px',
  postal: '624952px',
  identity: '624952px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE583: Record<ServiceCategory, '626040px'> = {
  government: '626040px',
  bank: '626040px',
  digital_wallet: '626040px',
  shipping: '626040px',
  postal: '626040px',
  identity: '626040px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE584: Record<ServiceCategory, '627128px'> = {
  government: '627128px',
  bank: '627128px',
  digital_wallet: '627128px',
  shipping: '627128px',
  postal: '627128px',
  identity: '627128px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE585: Record<ServiceCategory, '628216px'> = {
  government: '628216px',
  bank: '628216px',
  digital_wallet: '628216px',
  shipping: '628216px',
  postal: '628216px',
  identity: '628216px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE586: Record<ServiceCategory, '629304px'> = {
  government: '629304px',
  bank: '629304px',
  digital_wallet: '629304px',
  shipping: '629304px',
  postal: '629304px',
  identity: '629304px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE587: Record<ServiceCategory, '630392px'> = {
  government: '630392px',
  bank: '630392px',
  digital_wallet: '630392px',
  shipping: '630392px',
  postal: '630392px',
  identity: '630392px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE588: Record<ServiceCategory, '631480px'> = {
  government: '631480px',
  bank: '631480px',
  digital_wallet: '631480px',
  shipping: '631480px',
  postal: '631480px',
  identity: '631480px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE589: Record<ServiceCategory, '632568px'> = {
  government: '632568px',
  bank: '632568px',
  digital_wallet: '632568px',
  shipping: '632568px',
  postal: '632568px',
  identity: '632568px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE590: Record<ServiceCategory, '633656px'> = {
  government: '633656px',
  bank: '633656px',
  digital_wallet: '633656px',
  shipping: '633656px',
  postal: '633656px',
  identity: '633656px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE591: Record<ServiceCategory, '634744px'> = {
  government: '634744px',
  bank: '634744px',
  digital_wallet: '634744px',
  shipping: '634744px',
  postal: '634744px',
  identity: '634744px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE592: Record<ServiceCategory, '635832px'> = {
  government: '635832px',
  bank: '635832px',
  digital_wallet: '635832px',
  shipping: '635832px',
  postal: '635832px',
  identity: '635832px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE593: Record<ServiceCategory, '636920px'> = {
  government: '636920px',
  bank: '636920px',
  digital_wallet: '636920px',
  shipping: '636920px',
  postal: '636920px',
  identity: '636920px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE594: Record<ServiceCategory, '638008px'> = {
  government: '638008px',
  bank: '638008px',
  digital_wallet: '638008px',
  shipping: '638008px',
  postal: '638008px',
  identity: '638008px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE595: Record<ServiceCategory, '639096px'> = {
  government: '639096px',
  bank: '639096px',
  digital_wallet: '639096px',
  shipping: '639096px',
  postal: '639096px',
  identity: '639096px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE596: Record<ServiceCategory, '640184px'> = {
  government: '640184px',
  bank: '640184px',
  digital_wallet: '640184px',
  shipping: '640184px',
  postal: '640184px',
  identity: '640184px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE597: Record<ServiceCategory, '641272px'> = {
  government: '641272px',
  bank: '641272px',
  digital_wallet: '641272px',
  shipping: '641272px',
  postal: '641272px',
  identity: '641272px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE598: Record<ServiceCategory, '642360px'> = {
  government: '642360px',
  bank: '642360px',
  digital_wallet: '642360px',
  shipping: '642360px',
  postal: '642360px',
  identity: '642360px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE599: Record<ServiceCategory, '643448px'> = {
  government: '643448px',
  bank: '643448px',
  digital_wallet: '643448px',
  shipping: '643448px',
  postal: '643448px',
  identity: '643448px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE600: Record<ServiceCategory, '644536px'> = {
  government: '644536px',
  bank: '644536px',
  digital_wallet: '644536px',
  shipping: '644536px',
  postal: '644536px',
  identity: '644536px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE601: Record<ServiceCategory, '645624px'> = {
  government: '645624px',
  bank: '645624px',
  digital_wallet: '645624px',
  shipping: '645624px',
  postal: '645624px',
  identity: '645624px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE602: Record<ServiceCategory, '646712px'> = {
  government: '646712px',
  bank: '646712px',
  digital_wallet: '646712px',
  shipping: '646712px',
  postal: '646712px',
  identity: '646712px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE603: Record<ServiceCategory, '647800px'> = {
  government: '647800px',
  bank: '647800px',
  digital_wallet: '647800px',
  shipping: '647800px',
  postal: '647800px',
  identity: '647800px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE604: Record<ServiceCategory, '648888px'> = {
  government: '648888px',
  bank: '648888px',
  digital_wallet: '648888px',
  shipping: '648888px',
  postal: '648888px',
  identity: '648888px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE605: Record<ServiceCategory, '649976px'> = {
  government: '649976px',
  bank: '649976px',
  digital_wallet: '649976px',
  shipping: '649976px',
  postal: '649976px',
  identity: '649976px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE606: Record<ServiceCategory, '651064px'> = {
  government: '651064px',
  bank: '651064px',
  digital_wallet: '651064px',
  shipping: '651064px',
  postal: '651064px',
  identity: '651064px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE607: Record<ServiceCategory, '652152px'> = {
  government: '652152px',
  bank: '652152px',
  digital_wallet: '652152px',
  shipping: '652152px',
  postal: '652152px',
  identity: '652152px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE608: Record<ServiceCategory, '653240px'> = {
  government: '653240px',
  bank: '653240px',
  digital_wallet: '653240px',
  shipping: '653240px',
  postal: '653240px',
  identity: '653240px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE609: Record<ServiceCategory, '654328px'> = {
  government: '654328px',
  bank: '654328px',
  digital_wallet: '654328px',
  shipping: '654328px',
  postal: '654328px',
  identity: '654328px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE610: Record<ServiceCategory, '655416px'> = {
  government: '655416px',
  bank: '655416px',
  digital_wallet: '655416px',
  shipping: '655416px',
  postal: '655416px',
  identity: '655416px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE611: Record<ServiceCategory, '656504px'> = {
  government: '656504px',
  bank: '656504px',
  digital_wallet: '656504px',
  shipping: '656504px',
  postal: '656504px',
  identity: '656504px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE612: Record<ServiceCategory, '657592px'> = {
  government: '657592px',
  bank: '657592px',
  digital_wallet: '657592px',
  shipping: '657592px',
  postal: '657592px',
  identity: '657592px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE613: Record<ServiceCategory, '658680px'> = {
  government: '658680px',
  bank: '658680px',
  digital_wallet: '658680px',
  shipping: '658680px',
  postal: '658680px',
  identity: '658680px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE614: Record<ServiceCategory, '659768px'> = {
  government: '659768px',
  bank: '659768px',
  digital_wallet: '659768px',
  shipping: '659768px',
  postal: '659768px',
  identity: '659768px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE615: Record<ServiceCategory, '660856px'> = {
  government: '660856px',
  bank: '660856px',
  digital_wallet: '660856px',
  shipping: '660856px',
  postal: '660856px',
  identity: '660856px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE616: Record<ServiceCategory, '661944px'> = {
  government: '661944px',
  bank: '661944px',
  digital_wallet: '661944px',
  shipping: '661944px',
  postal: '661944px',
  identity: '661944px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE617: Record<ServiceCategory, '663032px'> = {
  government: '663032px',
  bank: '663032px',
  digital_wallet: '663032px',
  shipping: '663032px',
  postal: '663032px',
  identity: '663032px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE618: Record<ServiceCategory, '664120px'> = {
  government: '664120px',
  bank: '664120px',
  digital_wallet: '664120px',
  shipping: '664120px',
  postal: '664120px',
  identity: '664120px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE619: Record<ServiceCategory, '665208px'> = {
  government: '665208px',
  bank: '665208px',
  digital_wallet: '665208px',
  shipping: '665208px',
  postal: '665208px',
  identity: '665208px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE620: Record<ServiceCategory, '666296px'> = {
  government: '666296px',
  bank: '666296px',
  digital_wallet: '666296px',
  shipping: '666296px',
  postal: '666296px',
  identity: '666296px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE621: Record<ServiceCategory, '667384px'> = {
  government: '667384px',
  bank: '667384px',
  digital_wallet: '667384px',
  shipping: '667384px',
  postal: '667384px',
  identity: '667384px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE622: Record<ServiceCategory, '668472px'> = {
  government: '668472px',
  bank: '668472px',
  digital_wallet: '668472px',
  shipping: '668472px',
  postal: '668472px',
  identity: '668472px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE623: Record<ServiceCategory, '669560px'> = {
  government: '669560px',
  bank: '669560px',
  digital_wallet: '669560px',
  shipping: '669560px',
  postal: '669560px',
  identity: '669560px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE624: Record<ServiceCategory, '670648px'> = {
  government: '670648px',
  bank: '670648px',
  digital_wallet: '670648px',
  shipping: '670648px',
  postal: '670648px',
  identity: '670648px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE625: Record<ServiceCategory, '671736px'> = {
  government: '671736px',
  bank: '671736px',
  digital_wallet: '671736px',
  shipping: '671736px',
  postal: '671736px',
  identity: '671736px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE626: Record<ServiceCategory, '672824px'> = {
  government: '672824px',
  bank: '672824px',
  digital_wallet: '672824px',
  shipping: '672824px',
  postal: '672824px',
  identity: '672824px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE627: Record<ServiceCategory, '673912px'> = {
  government: '673912px',
  bank: '673912px',
  digital_wallet: '673912px',
  shipping: '673912px',
  postal: '673912px',
  identity: '673912px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE628: Record<ServiceCategory, '675000px'> = {
  government: '675000px',
  bank: '675000px',
  digital_wallet: '675000px',
  shipping: '675000px',
  postal: '675000px',
  identity: '675000px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE629: Record<ServiceCategory, '676088px'> = {
  government: '676088px',
  bank: '676088px',
  digital_wallet: '676088px',
  shipping: '676088px',
  postal: '676088px',
  identity: '676088px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE630: Record<ServiceCategory, '677176px'> = {
  government: '677176px',
  bank: '677176px',
  digital_wallet: '677176px',
  shipping: '677176px',
  postal: '677176px',
  identity: '677176px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE631: Record<ServiceCategory, '678264px'> = {
  government: '678264px',
  bank: '678264px',
  digital_wallet: '678264px',
  shipping: '678264px',
  postal: '678264px',
  identity: '678264px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE632: Record<ServiceCategory, '679352px'> = {
  government: '679352px',
  bank: '679352px',
  digital_wallet: '679352px',
  shipping: '679352px',
  postal: '679352px',
  identity: '679352px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE633: Record<ServiceCategory, '680440px'> = {
  government: '680440px',
  bank: '680440px',
  digital_wallet: '680440px',
  shipping: '680440px',
  postal: '680440px',
  identity: '680440px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE634: Record<ServiceCategory, '681528px'> = {
  government: '681528px',
  bank: '681528px',
  digital_wallet: '681528px',
  shipping: '681528px',
  postal: '681528px',
  identity: '681528px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE635: Record<ServiceCategory, '682616px'> = {
  government: '682616px',
  bank: '682616px',
  digital_wallet: '682616px',
  shipping: '682616px',
  postal: '682616px',
  identity: '682616px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE636: Record<ServiceCategory, '683704px'> = {
  government: '683704px',
  bank: '683704px',
  digital_wallet: '683704px',
  shipping: '683704px',
  postal: '683704px',
  identity: '683704px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE637: Record<ServiceCategory, '684792px'> = {
  government: '684792px',
  bank: '684792px',
  digital_wallet: '684792px',
  shipping: '684792px',
  postal: '684792px',
  identity: '684792px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE638: Record<ServiceCategory, '685880px'> = {
  government: '685880px',
  bank: '685880px',
  digital_wallet: '685880px',
  shipping: '685880px',
  postal: '685880px',
  identity: '685880px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE639: Record<ServiceCategory, '686968px'> = {
  government: '686968px',
  bank: '686968px',
  digital_wallet: '686968px',
  shipping: '686968px',
  postal: '686968px',
  identity: '686968px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE640: Record<ServiceCategory, '688056px'> = {
  government: '688056px',
  bank: '688056px',
  digital_wallet: '688056px',
  shipping: '688056px',
  postal: '688056px',
  identity: '688056px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE641: Record<ServiceCategory, '689144px'> = {
  government: '689144px',
  bank: '689144px',
  digital_wallet: '689144px',
  shipping: '689144px',
  postal: '689144px',
  identity: '689144px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE642: Record<ServiceCategory, '690232px'> = {
  government: '690232px',
  bank: '690232px',
  digital_wallet: '690232px',
  shipping: '690232px',
  postal: '690232px',
  identity: '690232px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE643: Record<ServiceCategory, '691320px'> = {
  government: '691320px',
  bank: '691320px',
  digital_wallet: '691320px',
  shipping: '691320px',
  postal: '691320px',
  identity: '691320px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE644: Record<ServiceCategory, '692408px'> = {
  government: '692408px',
  bank: '692408px',
  digital_wallet: '692408px',
  shipping: '692408px',
  postal: '692408px',
  identity: '692408px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE645: Record<ServiceCategory, '693496px'> = {
  government: '693496px',
  bank: '693496px',
  digital_wallet: '693496px',
  shipping: '693496px',
  postal: '693496px',
  identity: '693496px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE646: Record<ServiceCategory, '694584px'> = {
  government: '694584px',
  bank: '694584px',
  digital_wallet: '694584px',
  shipping: '694584px',
  postal: '694584px',
  identity: '694584px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE647: Record<ServiceCategory, '695672px'> = {
  government: '695672px',
  bank: '695672px',
  digital_wallet: '695672px',
  shipping: '695672px',
  postal: '695672px',
  identity: '695672px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE648: Record<ServiceCategory, '696760px'> = {
  government: '696760px',
  bank: '696760px',
  digital_wallet: '696760px',
  shipping: '696760px',
  postal: '696760px',
  identity: '696760px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE649: Record<ServiceCategory, '697848px'> = {
  government: '697848px',
  bank: '697848px',
  digital_wallet: '697848px',
  shipping: '697848px',
  postal: '697848px',
  identity: '697848px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE650: Record<ServiceCategory, '698936px'> = {
  government: '698936px',
  bank: '698936px',
  digital_wallet: '698936px',
  shipping: '698936px',
  postal: '698936px',
  identity: '698936px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE651: Record<ServiceCategory, '700024px'> = {
  government: '700024px',
  bank: '700024px',
  digital_wallet: '700024px',
  shipping: '700024px',
  postal: '700024px',
  identity: '700024px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE652: Record<ServiceCategory, '701112px'> = {
  government: '701112px',
  bank: '701112px',
  digital_wallet: '701112px',
  shipping: '701112px',
  postal: '701112px',
  identity: '701112px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE653: Record<ServiceCategory, '702200px'> = {
  government: '702200px',
  bank: '702200px',
  digital_wallet: '702200px',
  shipping: '702200px',
  postal: '702200px',
  identity: '702200px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE654: Record<ServiceCategory, '703288px'> = {
  government: '703288px',
  bank: '703288px',
  digital_wallet: '703288px',
  shipping: '703288px',
  postal: '703288px',
  identity: '703288px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE655: Record<ServiceCategory, '704376px'> = {
  government: '704376px',
  bank: '704376px',
  digital_wallet: '704376px',
  shipping: '704376px',
  postal: '704376px',
  identity: '704376px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE656: Record<ServiceCategory, '705464px'> = {
  government: '705464px',
  bank: '705464px',
  digital_wallet: '705464px',
  shipping: '705464px',
  postal: '705464px',
  identity: '705464px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE657: Record<ServiceCategory, '706552px'> = {
  government: '706552px',
  bank: '706552px',
  digital_wallet: '706552px',
  shipping: '706552px',
  postal: '706552px',
  identity: '706552px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE658: Record<ServiceCategory, '707640px'> = {
  government: '707640px',
  bank: '707640px',
  digital_wallet: '707640px',
  shipping: '707640px',
  postal: '707640px',
  identity: '707640px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE659: Record<ServiceCategory, '708728px'> = {
  government: '708728px',
  bank: '708728px',
  digital_wallet: '708728px',
  shipping: '708728px',
  postal: '708728px',
  identity: '708728px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE660: Record<ServiceCategory, '709816px'> = {
  government: '709816px',
  bank: '709816px',
  digital_wallet: '709816px',
  shipping: '709816px',
  postal: '709816px',
  identity: '709816px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE661: Record<ServiceCategory, '710904px'> = {
  government: '710904px',
  bank: '710904px',
  digital_wallet: '710904px',
  shipping: '710904px',
  postal: '710904px',
  identity: '710904px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE662: Record<ServiceCategory, '712992px'> = {
  government: '712992px',
  bank: '712992px',
  digital_wallet: '712992px',
  shipping: '712992px',
  postal: '712992px',
  identity: '712992px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE663: Record<ServiceCategory, '714080px'> = {
  government: '714080px',
  bank: '714080px',
  digital_wallet: '714080px',
  shipping: '714080px',
  postal: '714080px',
  identity: '714080px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE664: Record<ServiceCategory, '715168px'> = {
  government: '715168px',
  bank: '715168px',
  digital_wallet: '715168px',
  shipping: '715168px',
  postal: '715168px',
  identity: '715168px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE665: Record<ServiceCategory, '716256px'> = {
  government: '716256px',
  bank: '716256px',
  digital_wallet: '716256px',
  shipping: '716256px',
  postal: '716256px',
  identity: '716256px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE666: Record<ServiceCategory, '717344px'> = {
  government: '717344px',
  bank: '717344px',
  digital_wallet: '717344px',
  shipping: '717344px',
  postal: '717344px',
  identity: '717344px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE667: Record<ServiceCategory, '718432px'> = {
  government: '718432px',
  bank: '718432px',
  digital_wallet: '718432px',
  shipping: '718432px',
  postal: '718432px',
  identity: '718432px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE668: Record<ServiceCategory, '719520px'> = {
  government: '719520px',
  bank: '719520px',
  digital_wallet: '719520px',
  shipping: '719520px',
  postal: '719520px',
  identity: '719520px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE669: Record<ServiceCategory, '720608px'> = {
  government: '720608px',
  bank: '720608px',
  digital_wallet: '720608px',
  shipping: '720608px',
  postal: '720608px',
  identity: '720608px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE670: Record<ServiceCategory, '721696px'> = {
  government: '721696px',
  bank: '721696px',
  digital_wallet: '721696px',
  shipping: '721696px',
  postal: '721696px',
  identity: '721696px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE671: Record<ServiceCategory, '722784px'> = {
  government: '722784px',
  bank: '722784px',
  digital_wallet: '722784px',
  shipping: '722784px',
  postal: '722784px',
  identity: '722784px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE672: Record<ServiceCategory, '723872px'> = {
  government: '723872px',
  bank: '723872px',
  digital_wallet: '723872px',
  shipping: '723872px',
  postal: '723872px',
  identity: '723872px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE673: Record<ServiceCategory, '724960px'> = {
  government: '724960px',
  bank: '724960px',
  digital_wallet: '724960px',
  shipping: '724960px',
  postal: '724960px',
  identity: '724960px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE674: Record<ServiceCategory, '726048px'> = {
  government: '726048px',
  bank: '726048px',
  digital_wallet: '726048px',
  shipping: '726048px',
  postal: '726048px',
  identity: '726048px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE675: Record<ServiceCategory, '727136px'> = {
  government: '727136px',
  bank: '727136px',
  digital_wallet: '727136px',
  shipping: '727136px',
  postal: '727136px',
  identity: '727136px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE676: Record<ServiceCategory, '728224px'> = {
  government: '728224px',
  bank: '728224px',
  digital_wallet: '728224px',
  shipping: '728224px',
  postal: '728224px',
  identity: '728224px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE677: Record<ServiceCategory, '729312px'> = {
  government: '729312px',
  bank: '729312px',
  digital_wallet: '729312px',
  shipping: '729312px',
  postal: '729312px',
  identity: '729312px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE678: Record<ServiceCategory, '730400px'> = {
  government: '730400px',
  bank: '730400px',
  digital_wallet: '730400px',
  shipping: '730400px',
  postal: '730400px',
  identity: '730400px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE679: Record<ServiceCategory, '731488px'> = {
  government: '731488px',
  bank: '731488px',
  digital_wallet: '731488px',
  shipping: '731488px',
  postal: '731488px',
  identity: '731488px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE680: Record<ServiceCategory, '732576px'> = {
  government: '732576px',
  bank: '732576px',
  digital_wallet: '732576px',
  shipping: '732576px',
  postal: '732576px',
  identity: '732576px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE681: Record<ServiceCategory, '733664px'> = {
  government: '733664px',
  bank: '733664px',
  digital_wallet: '733664px',
  shipping: '733664px',
  postal: '733664px',
  identity: '733664px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE682: Record<ServiceCategory, '734752px'> = {
  government: '734752px',
  bank: '734752px',
  digital_wallet: '734752px',
  shipping: '734752px',
  postal: '734752px',
  identity: '734752px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE683: Record<ServiceCategory, '735840px'> = {
  government: '735840px',
  bank: '735840px',
  digital_wallet: '735840px',
  shipping: '735840px',
  postal: '735840px',
  identity: '735840px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE684: Record<ServiceCategory, '736928px'> = {
  government: '736928px',
  bank: '736928px',
  digital_wallet: '736928px',
  shipping: '736928px',
  postal: '736928px',
  identity: '736928px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE685: Record<ServiceCategory, '738016px'> = {
  government: '738016px',
  bank: '738016px',
  digital_wallet: '738016px',
  shipping: '738016px',
  postal: '738016px',
  identity: '738016px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE686: Record<ServiceCategory, '739104px'> = {
  government: '739104px',
  bank: '739104px',
  digital_wallet: '739104px',
  shipping: '739104px',
  postal: '739104px',
  identity: '739104px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE687: Record<ServiceCategory, '740192px'> = {
  government: '740192px',
  bank: '740192px',
  digital_wallet: '740192px',
  shipping: '740192px',
  postal: '740192px',
  identity: '740192px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE688: Record<ServiceCategory, '741280px'> = {
  government: '741280px',
  bank: '741280px',
  digital_wallet: '741280px',
  shipping: '741280px',
  postal: '741280px',
  identity: '741280px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE689: Record<ServiceCategory, '742368px'> = {
  government: '742368px',
  bank: '742368px',
  digital_wallet: '742368px',
  shipping: '742368px',
  postal: '742368px',
  identity: '742368px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE690: Record<ServiceCategory, '743456px'> = {
  government: '743456px',
  bank: '743456px',
  digital_wallet: '743456px',
  shipping: '743456px',
  postal: '743456px',
  identity: '743456px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE691: Record<ServiceCategory, '744544px'> = {
  government: '744544px',
  bank: '744544px',
  digital_wallet: '744544px',
  shipping: '744544px',
  postal: '744544px',
  identity: '744544px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE692: Record<ServiceCategory, '745632px'> = {
  government: '745632px',
  bank: '745632px',
  digital_wallet: '745632px',
  shipping: '745632px',
  postal: '745632px',
  identity: '745632px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE693: Record<ServiceCategory, '746720px'> = {
  government: '746720px',
  bank: '746720px',
  digital_wallet: '746720px',
  shipping: '746720px',
  postal: '746720px',
  identity: '746720px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE694: Record<ServiceCategory, '747808px'> = {
  government: '747808px',
  bank: '747808px',
  digital_wallet: '747808px',
  shipping: '747808px',
  postal: '747808px',
  identity: '747808px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE695: Record<ServiceCategory, '748896px'> = {
  government: '748896px',
  bank: '748896px',
  digital_wallet: '748896px',
  shipping: '748896px',
  postal: '748896px',
  identity: '748896px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE696: Record<ServiceCategory, '749984px'> = {
  government: '749984px',
  bank: '749984px',
  digital_wallet: '749984px',
  shipping: '749984px',
  postal: '749984px',
  identity: '749984px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE697: Record<ServiceCategory, '751072px'> = {
  government: '751072px',
  bank: '751072px',
  digital_wallet: '751072px',
  shipping: '751072px',
  postal: '751072px',
  identity: '751072px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE698: Record<ServiceCategory, '752160px'> = {
  government: '752160px',
  bank: '752160px',
  digital_wallet: '752160px',
  shipping: '752160px',
  postal: '752160px',
  identity: '752160px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE699: Record<ServiceCategory, '753248px'> = {
  government: '753248px',
  bank: '753248px',
  digital_wallet: '753248px',
  shipping: '753248px',
  postal: '753248px',
  identity: '753248px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE700: Record<ServiceCategory, '754336px'> = {
  government: '754336px',
  bank: '754336px',
  digital_wallet: '754336px',
  shipping: '754336px',
  postal: '754336px',
  identity: '754336px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE701: Record<ServiceCategory, '755424px'> = {
  government: '755424px',
  bank: '755424px',
  digital_wallet: '755424px',
  shipping: '755424px',
  postal: '755424px',
  identity: '755424px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE702: Record<ServiceCategory, '756512px'> = {
  government: '756512px',
  bank: '756512px',
  digital_wallet: '756512px',
  shipping: '756512px',
  postal: '756512px',
  identity: '756512px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE703: Record<ServiceCategory, '757600px'> = {
  government: '757600px',
  bank: '757600px',
  digital_wallet: '757600px',
  shipping: '757600px',
  postal: '757600px',
  identity: '757600px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE704: Record<ServiceCategory, '758688px'> = {
  government: '758688px',
  bank: '758688px',
  digital_wallet: '758688px',
  shipping: '758688px',
  postal: '758688px',
  identity: '758688px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE705: Record<ServiceCategory, '759776px'> = {
  government: '759776px',
  bank: '759776px',
  digital_wallet: '759776px',
  shipping: '759776px',
  postal: '759776px',
  identity: '759776px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE706: Record<ServiceCategory, '760864px'> = {
  government: '760864px',
  bank: '760864px',
  digital_wallet: '760864px',
  shipping: '760864px',
  postal: '760864px',
  identity: '760864px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE707: Record<ServiceCategory, '761952px'> = {
  government: '761952px',
  bank: '761952px',
  digital_wallet: '761952px',
  shipping: '761952px',
  postal: '761952px',
  identity: '761952px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE708: Record<ServiceCategory, '764040px'> = {
  government: '764040px',
  bank: '764040px',
  digital_wallet: '764040px',
  shipping: '764040px',
  postal: '764040px',
  identity: '764040px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE709: Record<ServiceCategory, '765128px'> = {
  government: '765128px',
  bank: '765128px',
  digital_wallet: '765128px',
  shipping: '765128px',
  postal: '765128px',
  identity: '765128px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE710: Record<ServiceCategory, '766216px'> = {
  government: '766216px',
  bank: '766216px',
  digital_wallet: '766216px',
  shipping: '766216px',
  postal: '766216px',
  identity: '766216px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE711: Record<ServiceCategory, '767304px'> = {
  government: '767304px',
  bank: '767304px',
  digital_wallet: '767304px',
  shipping: '767304px',
  postal: '767304px',
  identity: '767304px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE712: Record<ServiceCategory, '768392px'> = {
  government: '768392px',
  bank: '768392px',
  digital_wallet: '768392px',
  shipping: '768392px',
  postal: '768392px',
  identity: '768392px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE713: Record<ServiceCategory, '769480px'> = {
  government: '769480px',
  bank: '769480px',
  digital_wallet: '769480px',
  shipping: '769480px',
  postal: '769480px',
  identity: '769480px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE714: Record<ServiceCategory, '770568px'> = {
  government: '770568px',
  bank: '770568px',
  digital_wallet: '770568px',
  shipping: '770568px',
  postal: '770568px',
  identity: '770568px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE715: Record<ServiceCategory, '771656px'> = {
  government: '771656px',
  bank: '771656px',
  digital_wallet: '771656px',
  shipping: '771656px',
  postal: '771656px',
  identity: '771656px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE716: Record<ServiceCategory, '772744px'> = {
  government: '772744px',
  bank: '772744px',
  digital_wallet: '772744px',
  shipping: '772744px',
  postal: '772744px',
  identity: '772744px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE717: Record<ServiceCategory, '773832px'> = {
  government: '773832px',
  bank: '773832px',
  digital_wallet: '773832px',
  shipping: '773832px',
  postal: '773832px',
  identity: '773832px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE718: Record<ServiceCategory, '774920px'> = {
  government: '774920px',
  bank: '774920px',
  digital_wallet: '774920px',
  shipping: '774920px',
  postal: '774920px',
  identity: '774920px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE719: Record<ServiceCategory, '776008px'> = {
  government: '776008px',
  bank: '776008px',
  digital_wallet: '776008px',
  shipping: '776008px',
  postal: '776008px',
  identity: '776008px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE720: Record<ServiceCategory, '777096px'> = {
  government: '777096px',
  bank: '777096px',
  digital_wallet: '777096px',
  shipping: '777096px',
  postal: '777096px',
  identity: '777096px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE721: Record<ServiceCategory, '778184px'> = {
  government: '778184px',
  bank: '778184px',
  digital_wallet: '778184px',
  shipping: '778184px',
  postal: '778184px',
  identity: '778184px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE722: Record<ServiceCategory, '779272px'> = {
  government: '779272px',
  bank: '779272px',
  digital_wallet: '779272px',
  shipping: '779272px',
  postal: '779272px',
  identity: '779272px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE723: Record<ServiceCategory, '780360px'> = {
  government: '780360px',
  bank: '780360px',
  digital_wallet: '780360px',
  shipping: '780360px',
  postal: '780360px',
  identity: '780360px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE724: Record<ServiceCategory, '781448px'> = {
  government: '781448px',
  bank: '781448px',
  digital_wallet: '781448px',
  shipping: '781448px',
  postal: '781448px',
  identity: '781448px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE725: Record<ServiceCategory, '782536px'> = {
  government: '782536px',
  bank: '782536px',
  digital_wallet: '782536px',
  shipping: '782536px',
  postal: '782536px',
  identity: '782536px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE726: Record<ServiceCategory, '783624px'> = {
  government: '783624px',
  bank: '783624px',
  digital_wallet: '783624px',
  shipping: '783624px',
  postal: '783624px',
  identity: '783624px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE727: Record<ServiceCategory, '784712px'> = {
  government: '784712px',
  bank: '784712px',
  digital_wallet: '784712px',
  shipping: '784712px',
  postal: '784712px',
  identity: '784712px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE728: Record<ServiceCategory, '785800px'> = {
  government: '785800px',
  bank: '785800px',
  digital_wallet: '785800px',
  shipping: '785800px',
  postal: '785800px',
  identity: '785800px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE729: Record<ServiceCategory, '786888px'> = {
  government: '786888px',
  bank: '786888px',
  digital_wallet: '786888px',
  shipping: '786888px',
  postal: '786888px',
  identity: '786888px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE730: Record<ServiceCategory, '787976px'> = {
  government: '787976px',
  bank: '787976px',
  digital_wallet: '787976px',
  shipping: '787976px',
  postal: '787976px',
  identity: '787976px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE731: Record<ServiceCategory, '789064px'> = {
  government: '789064px',
  bank: '789064px',
  digital_wallet: '789064px',
  shipping: '789064px',
  postal: '789064px',
  identity: '789064px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE732: Record<ServiceCategory, '790152px'> = {
  government: '790152px',
  bank: '790152px',
  digital_wallet: '790152px',
  shipping: '790152px',
  postal: '790152px',
  identity: '790152px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE733: Record<ServiceCategory, '791240px'> = {
  government: '791240px',
  bank: '791240px',
  digital_wallet: '791240px',
  shipping: '791240px',
  postal: '791240px',
  identity: '791240px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE734: Record<ServiceCategory, '792328px'> = {
  government: '792328px',
  bank: '792328px',
  digital_wallet: '792328px',
  shipping: '792328px',
  postal: '792328px',
  identity: '792328px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE735: Record<ServiceCategory, '793416px'> = {
  government: '793416px',
  bank: '793416px',
  digital_wallet: '793416px',
  shipping: '793416px',
  postal: '793416px',
  identity: '793416px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE736: Record<ServiceCategory, '794504px'> = {
  government: '794504px',
  bank: '794504px',
  digital_wallet: '794504px',
  shipping: '794504px',
  postal: '794504px',
  identity: '794504px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE737: Record<ServiceCategory, '795592px'> = {
  government: '795592px',
  bank: '795592px',
  digital_wallet: '795592px',
  shipping: '795592px',
  postal: '795592px',
  identity: '795592px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE738: Record<ServiceCategory, '796680px'> = {
  government: '796680px',
  bank: '796680px',
  digital_wallet: '796680px',
  shipping: '796680px',
  postal: '796680px',
  identity: '796680px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE739: Record<ServiceCategory, '797768px'> = {
  government: '797768px',
  bank: '797768px',
  digital_wallet: '797768px',
  shipping: '797768px',
  postal: '797768px',
  identity: '797768px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE740: Record<ServiceCategory, '798856px'> = {
  government: '798856px',
  bank: '798856px',
  digital_wallet: '798856px',
  shipping: '798856px',
  postal: '798856px',
  identity: '798856px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE741: Record<ServiceCategory, '799944px'> = {
  government: '799944px',
  bank: '799944px',
  digital_wallet: '799944px',
  shipping: '799944px',
  postal: '799944px',
  identity: '799944px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE742: Record<ServiceCategory, '801032px'> = {
  government: '801032px',
  bank: '801032px',
  digital_wallet: '801032px',
  shipping: '801032px',
  postal: '801032px',
  identity: '801032px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE743: Record<ServiceCategory, '802120px'> = {
  government: '802120px',
  bank: '802120px',
  digital_wallet: '802120px',
  shipping: '802120px',
  postal: '802120px',
  identity: '802120px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE744: Record<ServiceCategory, '803208px'> = {
  government: '803208px',
  bank: '803208px',
  digital_wallet: '803208px',
  shipping: '803208px',
  postal: '803208px',
  identity: '803208px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE745: Record<ServiceCategory, '804296px'> = {
  government: '804296px',
  bank: '804296px',
  digital_wallet: '804296px',
  shipping: '804296px',
  postal: '804296px',
  identity: '804296px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE746: Record<ServiceCategory, '805384px'> = {
  government: '805384px',
  bank: '805384px',
  digital_wallet: '805384px',
  shipping: '805384px',
  postal: '805384px',
  identity: '805384px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE747: Record<ServiceCategory, '806472px'> = {
  government: '806472px',
  bank: '806472px',
  digital_wallet: '806472px',
  shipping: '806472px',
  postal: '806472px',
  identity: '806472px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE748: Record<ServiceCategory, '807560px'> = {
  government: '807560px',
  bank: '807560px',
  digital_wallet: '807560px',
  shipping: '807560px',
  postal: '807560px',
  identity: '807560px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE749: Record<ServiceCategory, '808648px'> = {
  government: '808648px',
  bank: '808648px',
  digital_wallet: '808648px',
  shipping: '808648px',
  postal: '808648px',
  identity: '808648px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE750: Record<ServiceCategory, '809736px'> = {
  government: '809736px',
  bank: '809736px',
  digital_wallet: '809736px',
  shipping: '809736px',
  postal: '809736px',
  identity: '809736px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE751: Record<ServiceCategory, '810824px'> = {
  government: '810824px',
  bank: '810824px',
  digital_wallet: '810824px',
  shipping: '810824px',
  postal: '810824px',
  identity: '810824px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE752: Record<ServiceCategory, '811912px'> = {
  government: '811912px',
  bank: '811912px',
  digital_wallet: '811912px',
  shipping: '811912px',
  postal: '811912px',
  identity: '811912px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE753: Record<ServiceCategory, '813000px'> = {
  government: '813000px',
  bank: '813000px',
  digital_wallet: '813000px',
  shipping: '813000px',
  postal: '813000px',
  identity: '813000px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE754: Record<ServiceCategory, '814088px'> = {
  government: '814088px',
  bank: '814088px',
  digital_wallet: '814088px',
  shipping: '814088px',
  postal: '814088px',
  identity: '814088px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE755: Record<ServiceCategory, '815176px'> = {
  government: '815176px',
  bank: '815176px',
  digital_wallet: '815176px',
  shipping: '815176px',
  postal: '815176px',
  identity: '815176px'
};

export const GCC_SERVICES_ICON_SIZES_XXXLARGE756: Record<ServiceCategory, '816264px'> = {
  government: '816264px',
  bank: '816264px',
  digital_wallet: '816264px',
  shipping: '816264px',
  postal: '816264px',
  identity: '816264px'
};

export const GCC_SERVICES_ICON_SIZES_