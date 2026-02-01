export interface GovBranding {
  id: string;
  nameAr: string;
  nameEn: string;
  logo: string;
  banner: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
  };
  fields: GovField[];
}

export interface GovField {
  name: string;
  labelAr: string;
  labelEn: string;
  placeholderAr: string;
  placeholderEn: string;
  type: "text" | "number" | "select" | "date";
  options?: { value: string; labelAr: string; labelEn: string }[];
  required?: boolean;
  value?: string;
}

export const governmentPaymentSystems: Record<string, GovBranding> = {
  sa_absher: {
    id: "sa_absher",
    nameAr: "أبشر - وزارة الداخلية",
    nameEn: "Absher - Ministry of Interior",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/absher.png",
    banner: "https://www.absher.sa/portal/landing/images/slider/banner1.jpg",
    colors: {
      primary: "#006747",
      secondary: "#008450",
      accent: "#E2B05E",
      bg: "#F4F7F6",
      text: "#1D2120",
    },
    fields: [
      { name: "id_number", labelAr: "رقم الهوية / الإقامة", labelEn: "ID / Iqama Number", placeholderAr: "10xxxxxxxx", placeholderEn: "10xxxxxxxx", type: "number", required: true },
      { name: "service_type", labelAr: "نوع الخدمة", labelEn: "Service Type", placeholderAr: "اختر الخدمة", placeholderEn: "Select Service", type: "select", options: [
        { value: "traffic_violations", labelAr: "المخالفات المرورية", labelEn: "Traffic Violations" },
        { value: "passport_fees", labelAr: "رسوم الجوازات", labelEn: "Passport Fees" },
        { value: "driving_license", labelAr: "رخصة القيادة", labelEn: "Driving License" }
      ], required: true },
      { name: "amount", labelAr: "المبلغ", labelEn: "Amount", placeholderAr: "0.00", placeholderEn: "0.00", type: "number", required: true }
    ]
  },
  sa_najiz: {
    id: "sa_najiz",
    nameAr: "ناجز - وزارة العدل",
    nameEn: "Najiz - Ministry of Justice",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/najiz.png",
    banner: "https://najiz.sa/resources/images/najiz-banner.jpg",
    colors: {
      primary: "#144733",
      secondary: "#A89445",
      accent: "#A89445",
      bg: "#F9FAF9",
      text: "#1A1A1A",
    },
    fields: [
      { name: "case_number", labelAr: "رقم القضية / الطلب", labelEn: "Case / Request Number", placeholderAr: "44xxxxxxx", placeholderEn: "44xxxxxxx", type: "text", required: true },
      { name: "id_number", labelAr: "رقم هوية مقدم الطلب", labelEn: "Applicant ID", placeholderAr: "10xxxxxxxx", placeholderEn: "10xxxxxxxx", type: "number", required: true },
      { name: "amount", labelAr: "المبلغ الإجمالي", labelEn: "Total Amount", placeholderAr: "0.00", placeholderEn: "0.00", type: "number", required: true }
    ]
  },
  sa_qiwa: {
    id: "sa_qiwa",
    nameAr: "قوى - وزارة الموارد البشرية",
    nameEn: "Qiwa - Ministry of HR",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/qiwa.png",
    banner: "https://qiwa.sa/themes/custom/qiwa/images/hero-home.jpg",
    colors: {
      primary: "#111827",
      secondary: "#3B82F6",
      accent: "#3B82F6",
      bg: "#F9FAFB",
      text: "#111827",
    },
    fields: [
      { name: "establishment_number", labelAr: "رقم المنشأة", labelEn: "Establishment Number", placeholderAr: "1-xxxxxxx", placeholderEn: "1-xxxxxxx", type: "text", required: true },
      { name: "id_number", labelAr: "رقم هوية الموظف", labelEn: "Employee ID", placeholderAr: "10xxxxxxxx", placeholderEn: "10xxxxxxxx", type: "number", required: true },
      { name: "amount", labelAr: "رسوم الخدمة", labelEn: "Service Fee", placeholderAr: "0.00", placeholderEn: "0.00", type: "number", required: true }
    ]
  },
  ae_dubaipolice: {
    id: "ae_dubaipolice",
    nameAr: "شرطة دبي",
    nameEn: "Dubai Police",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/dubaipolice.png",
    banner: "https://www.dubaipolice.gov.ae/common/banners/home_banner.jpg",
    colors: {
      primary: "#004B23",
      secondary: "#BF9B30",
      accent: "#BF9B30",
      bg: "#F1F4F2",
      text: "#002311",
    },
    fields: [
      { name: "tc_number", labelAr: "رقم الملف المروري", labelEn: "T.C. Number", placeholderAr: "xxxxxxx", placeholderEn: "xxxxxxx", type: "text", required: true },
      { name: "id_number", labelAr: "رقم الهوية الإماراتية", labelEn: "Emirates ID", placeholderAr: "784-xxxx-xxxxxxx-x", placeholderEn: "784-xxxx-xxxxxxx-x", type: "text", required: true },
      { name: "amount", labelAr: "قيمة المخالفة", labelEn: "Fine Amount", placeholderAr: "0.00", placeholderEn: "0.00", type: "number", required: true }
    ]
  },
  ae_mohap: {
    id: "ae_mohap",
    nameAr: "وزارة الصحة ووقاية المجتمع",
    nameEn: "MOHAP UAE",
    logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mohap.png",
    banner: "https://mohap.gov.ae/images/default-source/home/mohap-banner.jpg",
    colors: {
      primary: "#005596",
      secondary: "#9C824A",
      accent: "#9C824A",
      bg: "#F5F8FA",
      text: "#00335A",
    },
    fields: [
      { name: "reference_number", labelAr: "رقم المرجع", labelEn: "Reference Number", placeholderAr: "REF-xxxxxx", placeholderEn: "REF-xxxxxx", type: "text", required: true },
      { name: "id_number", labelAr: "رقم الهوية", labelEn: "ID Number", placeholderAr: "xxxxxxxx", placeholderEn: "xxxxxxxx", type: "text", required: true },
      { name: "amount", labelAr: "رسوم الخدمة الطبية", labelEn: "Medical Service Fee", placeholderAr: "0.00", placeholderEn: "0.00", type: "number", required: true }
    ]
  }
};

export const getGovernmentPaymentSystem = (id: string): GovBranding | undefined => {
  return governmentPaymentSystems[id];
};

export const getGovBranding = getGovernmentPaymentSystem;
