// Government Payment Services Configuration
// خدمات الدفع الحكومية القابلة للاختيار كخدمات

export interface GovernmentService {
  id: string;
  key: string;
  name: string;
  nameAr: string;
  country: string;
  type: 'government';
  supportsPaymentLinks: boolean;
  description: string;
  logo?: string;
  heroImage?: string;
}

// تعريف خدمات الدفع الحكومية
export const governmentServices: GovernmentService[] = [
  {
    id: 'sadad',
    key: 'sadad',
    name: 'SADAD',
    nameAr: 'سداد',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'نظام المدفوعات الوطني السعودي للخدمات الحكومية والفواتير',
    logo: '/gov-sadad-official.png',
    heroImage: '/gov-sadad-official.png',
  },
  {
    id: 'benefit',
    key: 'benefit',
    name: 'BENEFIT',
    nameAr: 'بنفت',
    country: 'BH',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'الشبكة الإلكترونية البحرينية للمعاملات المالية',
    logo: '/gov-benefit-logo.png',
    heroImage: '/gov-benefit-logo.png',
  },
  {
    id: 'knet',
    key: 'knet',
    name: 'KNET',
    nameAr: 'كي نت',
    country: 'KW',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'شبكة الكويت الوطنية للمدفوعات الإلكترونية',
    logo: '/gov-knet-logo.png',
    heroImage: '/gov-knet-logo.png',
  },
  {
    id: 'omannet',
    key: 'omannet',
    name: 'OmanNet',
    nameAr: 'عُمان نت',
    country: 'OM',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'شبكة عُمان للمدفوعات الإلكترونية - بطاقة مال',
    logo: '/gov-maal-logo.jpg',
    heroImage: '/gov-maal-logo.jpg',
  },
  {
    id: 'jaywan',
    key: 'jaywan',
    name: 'Jaywan',
    nameAr: 'جيوان',
    country: 'AE',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'نظام البطاقة الوطنية الإماراتي للدفع الإلكتروني',
    logo: '/gov-uae-logo.jpg',
    heroImage: '/gov-uae-logo.jpg',
  },
  {
    id: 'qatar-gov',
    key: 'qatar-gov',
    name: 'Qatar Gov Payment',
    nameAr: 'بوابة الدفع الحكومي القطرية',
    country: 'QA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'نظام الدفع الإلكتروني للخدمات الحكومية القطرية',
    logo: '/gov-qatar-logo.png',
    heroImage: '/gov-qatar-logo.png',
  },
  {
    id: 'sa_absher',
    key: 'sa_absher',
    name: 'Absher',
    nameAr: 'أبشر',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'الخدمات الإلكترونية لوزارة الداخلية السعودية',
    logo: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/absher-logo.png',
  },
  {
    id: 'sa_najiz',
    key: 'sa_najiz',
    name: 'Najiz',
    nameAr: 'ناجز',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'بوابة الخدمات العدلية الإلكترونية',
    logo: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/najiz-logo.png',
  },
  {
    id: 'sa_qiwa',
    key: 'sa_qiwa',
    name: 'Qiwa',
    nameAr: 'قوى',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'المنصة الموحدة لخدمات منظومة العمل',
    logo: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/qiwa-logo.png',
  },
];

/**
 * Get government services by country code
 * الحصول على خدمات الدفع الحكومية حسب رمز الدولة
 */
export const getGovernmentServicesByCountry = (countryCode: string): GovernmentService[] => {
  return governmentServices.filter(service => service.country === countryCode.toUpperCase());
};

/**
 * Get government service by key
 * الحصول على خدمة دفع حكومية بواسطة المفتاح
 */
export const getGovernmentServiceByKey = (key: string): GovernmentService | undefined => {
  return governmentServices.find(service => service.key === key);
};

/**
 * Check if a service key is a government service
 * التحقق من أن المفتاح يشير إلى خدمة حكومية
 */
export const isGovernmentService = (key: string): boolean => {
  return governmentServices.some(service => service.key === key);
};

/**
 * Get all government services
 * الحصول على جميع خدمات الدفع الحكومية
 */
export const getAllGovernmentServices = (): GovernmentService[] => {
  return governmentServices;
};
