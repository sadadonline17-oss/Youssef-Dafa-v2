export interface BrandingConfig {
  name: string;
  nameEn: string;
  logo: string;
  heroImage: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    surface: string;
    text: string;
    border: string;
  };
  fonts: {
    arabic: string;
    english: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  ogImage?: string;
  description?: string;
  isGovernment?: boolean;
}

export const bankBranding: Record<string, BrandingConfig> = {
  // SAUDI ARABIA
  alrajhi_bank: {
    name: "مصرف الراجحي",
    nameEn: "Al Rajhi Bank",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/alrajhi.png",
    heroImage: "https://www.alrajhibank.com.sa/-/media/Project/AlrajhiPBM/AlrajhiBanksa/Individual/Cards/Prepaid-Cards/Cash-Back-Plus-Signature/Cashback-Plus-Signature-Cards-mob.jpg",
    colors: {
      primary: "#004B91",
      secondary: "#003366",
      accent: "#FFD700",
      surface: "#F0F4F8",
      text: "#002147",
      border: "#D1D9E6"
    },
    fonts: {
      arabic: "'Cairo', sans-serif",
      english: "'Roboto', sans-serif"
    },
    borderRadius: { sm: "4px", md: "8px", lg: "12px" }
  },
  alahli_bank: {
    name: "البنك الأهلي السعودي",
    nameEn: "SNB (AlAhli Bank)",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/snb.png",
    heroImage: "https://www.alahli.com/en-us/Personal-Banking/Cards/Credit-Cards/PublishingImages/snb-cc-hero.jpg",
    colors: {
      primary: "#006747",
      secondary: "#B19149",
      accent: "#B19149",
      surface: "#F4F7F6",
      text: "#1D2120",
      border: "#E0E5E4"
    },
    fonts: {
      arabic: "'Cairo', sans-serif",
      english: "'Roboto', sans-serif"
    },
    borderRadius: { sm: "0px", md: "0px", lg: "0px" } // SNB uses sharp edges often
  },
  alinma_bank: {
    name: "مصرف الإنماء",
    nameEn: "Alinma Bank",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/alinma.png",
    heroImage: "https://www.alinma.com/wps/wcm/connect/alinma/1352488e-738b-4d7a-9a9c-7e6d0a7f1c1c/Personal-Cards-Hero-Banner-AR.jpg",
    colors: {
      primary: "#6A2D2B",
      secondary: "#8C3C3A",
      accent: "#E5C16C",
      surface: "#FAF7F7",
      text: "#4A1E1D",
      border: "#E8DFDF"
    },
    fonts: {
      arabic: "'Cairo', sans-serif",
      english: "'Roboto', sans-serif"
    },
    borderRadius: { sm: "8px", md: "12px", lg: "20px" }
  },
  riyad_bank: {
    name: "بنك الرياض",
    nameEn: "Riyad Bank",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/riyad.png",
    heroImage: "https://www.riyadbank.com/riyad-theme/images/hero-banner-personal.jpg",
    colors: {
      primary: "#144733",
      secondary: "#A89445",
      accent: "#A89445",
      surface: "#F5F7F6",
      text: "#1A1A1A",
      border: "#DDE2E0"
    },
    fonts: {
      arabic: "'Cairo', sans-serif",
      english: "'Roboto', sans-serif"
    },
    borderRadius: { sm: "4px", md: "8px", lg: "16px" }
  },
  albilad_bank: {
    name: "بنك البلاد",
    nameEn: "Bank Albilad",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/albilad.png",
    heroImage: "https://www.bankalbilad.com/Style%20Library/BankAlbilad/images/hero-home.jpg",
    colors: {
      primary: "#005696",
      secondary: "#898B8E",
      accent: "#FFD100",
      surface: "#F2F6F9",
      text: "#003057",
      border: "#D0D9E1"
    },
    fonts: {
      arabic: "'Cairo', sans-serif",
      english: "'Roboto', sans-serif"
    },
    borderRadius: { sm: "4px", md: "8px", lg: "12px" }
  },
  aljazira_bank: {
    name: "بنك الجزيرة",
    nameEn: "Bank AlJazira",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/aljazira.png",
    heroImage: "https://www.baj.com.sa/sites/default/files/styles/hero_banner/public/2021-03/Personal-Banking-Hero-Banner.jpg",
    colors: {
      primary: "#003F72",
      secondary: "#00294B",
      accent: "#00A9E0",
      surface: "#F0F5F9",
      text: "#001E36",
      border: "#C7D4DF"
    },
    fonts: {
      arabic: "'Cairo', sans-serif",
      english: "'Roboto', sans-serif"
    },
    borderRadius: { sm: "4px", md: "8px", lg: "12px" }
  },
  stc_bank: {
    name: "stc bank",
    nameEn: "stc bank",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/stcbank.png",
    heroImage: "https://www.stcpay.com.sa/wp-content/uploads/2021/04/stc-pay-app-hero.jpg",
    colors: {
      primary: "#FF0000",
      secondary: "#4F008C",
      accent: "#FF0000",
      surface: "#F9F9F9",
      text: "#1C1C1C",
      border: "#EAEAEA"
    },
    fonts: {
      arabic: "'Cairo', sans-serif",
      english: "'Roboto', sans-serif"
    },
    borderRadius: { sm: "12px", md: "20px", lg: "30px" }
  },

  // UAE
  fab: {
    name: "بنك أبوظبي الأول",
    nameEn: "FAB (First Abu Dhabi Bank)",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/fab.png",
    heroImage: "https://www.bankfab.com/-/media/fabpwa/uae/personal/hero-banners/personal-home-banner.jpg",
    colors: {
      primary: "#C8102E",
      secondary: "#00263E",
      accent: "#C8102E",
      surface: "#F8F9FA",
      text: "#001B2E",
      border: "#E9ECEF"
    },
    fonts: { arabic: "'Cairo', sans-serif", english: "'Roboto', sans-serif" },
    borderRadius: { sm: "2px", md: "4px", lg: "8px" }
  },
  emirates_nbd: {
    name: "بنك الإمارات دبي الوطني",
    nameEn: "Emirates NBD",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/enbd.png",
    heroImage: "https://www.emiratesnbd.com/-/media/enbd/images/personal-banking/hero-banners/home-banner.jpg",
    colors: {
      primary: "#00548B",
      secondary: "#E31837",
      accent: "#E31837",
      surface: "#F5F8FA",
      text: "#003355",
      border: "#D1DDE6"
    },
    fonts: { arabic: "'Cairo', sans-serif", english: "'Roboto', sans-serif" },
    borderRadius: { sm: "4px", md: "8px", lg: "12px" }
  },
  adcb: {
    name: "بنك أبوظبي التجاري",
    nameEn: "ADCB",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/adcb.png",
    heroImage: "https://www.adcb.com/en/personal/PublishingImages/hero-banners/personal-home.jpg",
    colors: {
      primary: "#CF142B",
      secondary: "#333333",
      accent: "#CF142B",
      surface: "#FAFAFA",
      text: "#222222",
      border: "#EEEEEE"
    },
    fonts: { arabic: "'Cairo', sans-serif", english: "'Roboto', sans-serif" },
    borderRadius: { sm: "0px", md: "0px", lg: "0px" }
  },
  dib: {
    name: "بنك دبي الإسلامي",
    nameEn: "Dubai Islamic Bank",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/dib.png",
    heroImage: "https://www.dib.ae/images/default-source/hero-banners/personal-home-banner.jpg",
    colors: {
      primary: "#947029",
      secondary: "#1A3B34",
      accent: "#947029",
      surface: "#F9F8F4",
      text: "#122B26",
      border: "#E8E4D9"
    },
    fonts: { arabic: "'Cairo', sans-serif", english: "'Roboto', sans-serif" },
    borderRadius: { sm: "4px", md: "8px", lg: "12px" }
  },

  // KUWAIT
  kfh: {
    name: "بيت التمويل الكويتي",
    nameEn: "KFH (Kuwait Finance House)",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/kfh.png",
    heroImage: "https://www.kfh.com/dam/jcr:1234567/kfh-hero.jpg",
    colors: {
      primary: "#006B3E",
      secondary: "#004D2C",
      accent: "#E3BC1E",
      surface: "#F4F9F6",
      text: "#002D1A",
      border: "#D1E3D9"
    },
    fonts: { arabic: "'Cairo', sans-serif", english: "'Roboto', sans-serif" },
    borderRadius: { sm: "4px", md: "8px", lg: "12px" }
  },
  nbk: {
    name: "بنك الكويت الوطني",
    nameEn: "NBK (National Bank of Kuwait)",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/nbk.png",
    heroImage: "https://www.nbk.com/dam/jcr:1234567/nbk-hero.jpg",
    colors: {
      primary: "#002F65",
      secondary: "#004B8D",
      accent: "#C8102E",
      surface: "#F0F3F7",
      text: "#001A38",
      border: "#CFDAE6"
    },
    fonts: { arabic: "'Cairo', sans-serif", english: "'Roboto', sans-serif" },
    borderRadius: { sm: "2px", md: "4px", lg: "8px" }
  },

  // QATAR
  qnb: {
    name: "بنك قطر الوطني",
    nameEn: "QNB",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/qnb.png",
    heroImage: "https://www.qnb.com/dam/jcr:1234567/qnb-hero.jpg",
    colors: {
      primary: "#4D0F28",
      secondary: "#7D1942",
      accent: "#4D0F28",
      surface: "#FAF4F6",
      text: "#2B0917",
      border: "#EAD6DC"
    },
    fonts: { arabic: "'Cairo', sans-serif", english: "'Roboto', sans-serif" },
    borderRadius: { sm: "4px", md: "8px", lg: "12px" }
  },

  // DEFAULT
  default: {
    name: "البنك الإلكتروني",
    nameEn: "Online Banking",
    logo: "/logo.png",
    heroImage: "/hero.jpg",
    colors: {
      primary: "#3b82f6",
      secondary: "#1e40af",
      surface: "#f8fafc",
      text: "#0f172a",
      border: "#e2e8f0"
    },
    fonts: {
      arabic: "'Cairo', sans-serif",
      english: "'Roboto', sans-serif"
    },
    borderRadius: { sm: "4px", md: "8px", lg: "16px" }
  }
};

export const shippingCompanyBranding: Record<string, BrandingConfig> = {
  aramex: {
    name: "أرامكس",
    nameEn: "Aramex",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/aramex.png",
    heroImage: "/hero-aramex.jpg",
    colors: { primary: "#E31837", secondary: "#B2122A", surface: "#FDF4F5", text: "#333333", border: "#F5D6D9" },
    fonts: { arabic: "'Cairo', sans-serif", english: "'Roboto', sans-serif" },
    borderRadius: { sm: "4px", md: "8px", lg: "12px" }
  },
  dhl: {
    name: "دي إتش إل",
    nameEn: "DHL",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/dhl.png",
    heroImage: "/hero-dhl.jpg",
    colors: { primary: "#D40511", secondary: "#FFCC00", surface: "#FFF9E6", text: "#333333", border: "#FFEB99" },
    fonts: { arabic: "'Cairo', sans-serif", english: "'Roboto', sans-serif" },
    borderRadius: { sm: "0px", md: "0px", lg: "0px" }
  }
};

export const getBranding = (id: string): BrandingConfig => {
  return bankBranding[id] || shippingCompanyBranding[id] || bankBranding.default;
};

export const getBrandingByCompany = getBranding;
