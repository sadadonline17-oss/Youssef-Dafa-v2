export interface Bank {
  id: string;
  name: string;
  nameAr: string;
  logo?: string;
  color: string;
  country: "SA" | "AE" | "KW" | "QA" | "BH" | "OM";
}

export interface BanksByCountry {
  [countryCode: string]: Bank[];
}

export const BANKS_BY_COUNTRY: BanksByCountry = {
  SA: [
    { id: "alrajhi_bank", name: "Al Rajhi Bank", nameAr: "مصرف الراجحي", logo: "/bank-logos/alrajhi-bank-new.svg", color: "#006C35", country: "SA" },
    { id: "alahli_bank", name: "Saudi National Bank (SNB)", nameAr: "البنك الأهلي السعودي", logo: "/bank-logos/saudi-national-bank.png", color: "#034638", country: "SA" },
    { id: "alinma_bank", name: "Alinma Bank", nameAr: "بنك الإنماء", logo: "/bank-logos/alinma-bank-new.png", color: "#a29061", country: "SA" },
    { id: "albilad_bank", name: "Bank AlBilad", nameAr: "بنك البلاد", logo: "/bank-logos/albilad-bank.png", color: "#1C4587", country: "SA" },
    { id: "samba", name: "Samba Financial Group", nameAr: "سامبا", logo: "/bank-logos/samba.png", color: "#004B8D", country: "SA" },
    { id: "riyad_bank", name: "Riyad Bank", nameAr: "بنك الرياض", logo: "/bank-logos/riyad-bank-new.svg", color: "#0066B2", country: "SA" },
    { id: "aljazira_bank", name: "Bank AlJazira", nameAr: "بنك الجزيرة", logo: "/bank-logos/aljazira-bank.png", color: "#005EB8", country: "SA" },
    { id: "arab_national_bank", name: "Arab National Bank (ANB)", nameAr: "البنك العربي الوطني", logo: "/bank-logos/arab-national-bank.svg", color: "#00A551", country: "SA" },
    { id: "saudi_fransi_bank", name: "Banque Saudi Fransi", nameAr: "البنك السعودي الفرنسي", logo: "/bank-logos/saudi-fransi.svg", color: "#1c3e92", country: "SA" },
    { id: "sab_bank", name: "SAB (Saudi Awwal Bank)", nameAr: "البنك السعودي الأول", logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/sab.png", color: "#db0011", country: "SA" },
    { id: "saudi_investment_bank", name: "Saudi Investment Bank", nameAr: "البنك السعودي للاستثمار", logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/saudi-investment-bank.png", color: "#004B87", country: "SA" },
    { id: "gib_saudi", name: "Gulf International Bank – Saudi", nameAr: "بنك الخليج الدولي - السعودية", logo: "/bank-logos/gib.png", color: "#003366", country: "SA" },
    { id: "stc_bank", name: "stc bank", nameAr: "stc bank", logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/stc-bank.png", color: "#FF0000", country: "SA" },
    { id: "d360_bank", name: "D360 Bank", nameAr: "بنك D360", logo: "/bank-logos/d360.png", color: "#6D28D9", country: "SA" },
    { id: "meem", name: "Meem Digital Bank", nameAr: "ميم", logo: "/bank-logos/meem.png", color: "#E20074", country: "SA" },
  ],
  AE: [
    { id: "fab", name: "First Abu Dhabi Bank", nameAr: "بنك أبوظبي الأول", logo: "/bank-logos/fab-uae-new.svg", color: "#003087", country: "AE" },
    { id: "emirates_nbd", name: "Emirates NBD", nameAr: "بنك الإمارات دبي الوطني", logo: "/bank-logos/emirates-nbd.png", color: "#D50032", country: "AE" },
    { id: "adcb", name: "Abu Dhabi Commercial Bank", nameAr: "بنك أبوظبي التجاري", logo: "/bank-logos/adcb-bank.svg", color: "#e2231a", country: "AE" },
    { id: "mashreq_bank", name: "Mashreq Bank", nameAr: "بنك المشرق", logo: "/bank-logos/mashreq-bank.svg", color: "#ff5d00", country: "AE" },
    { id: "dib", name: "Dubai Islamic Bank", nameAr: "بنك دبي الإسلامي", logo: "/bank-logos/dib-bank.svg", color: "#00923F", country: "AE" },
    { id: "adib", name: "Abu Dhabi Islamic Bank", nameAr: "مصرف أبوظبي الإسلامي", logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/adib.png", color: "#1e3a8a", country: "AE" },
    { id: "rakbank", name: "RAKBANK", nameAr: "بنك رأس الخيمة الوطني", logo: "/bank-logos/rakbank-uae.png", color: "#E31E24", country: "AE" },
    { id: "sharjah_islamic", name: "Sharjah Islamic Bank", nameAr: "مصرف الشارقة الإسلامي", logo: "/bank-logos/sib.png", color: "#1B4D3E", country: "AE" },
    { id: "cbd", name: "Commercial Bank of Dubai", nameAr: "بنك دبي التجاري", logo: "/bank-logos/cbd-dubai.png", color: "#004B87", country: "AE" },
    { id: "nbf", name: "National Bank of Fujairah", nameAr: "بنك الفجيرة الوطني", logo: "/bank-logos/nbf.png", color: "#004B87", country: "AE" },
    { id: "emirates_islamic", name: "Emirates Islamic", nameAr: "الإمارات الإسلامي", logo: "/bank-logos/emirates-islamic.png", color: "#6E2D91", country: "AE" },
    { id: "invest_bank", name: "Invest Bank", nameAr: "بنك الاستثمار", logo: "/bank-logos/investbank.png", color: "#004B87", country: "AE" },
    { id: "uab", name: "United Arab Bank", nameAr: "البنك العربي المتحد", logo: "/bank-logos/uab.png", color: "#E31E24", country: "AE" },
  ],
  KW: [
    { id: "nbk", name: "National Bank of Kuwait", nameAr: "بنك الكويت الوطني", logo: "/bank-logos/nbk-kuwait.png", color: "#003366", country: "KW" },
    { id: "kfh", name: "Kuwait Finance House", nameAr: "بيت التمويل الكويتي", logo: "/bank-logos/kfh-kuwait.png", color: "#007A33", country: "KW" },
    { id: "gulf_bank", name: "Gulf Bank", nameAr: "بنك الخليج", logo: "/bank-logos/gulf-bank.png", color: "#004B87", country: "KW" },
    { id: "boubyan_bank", name: "Boubyan Bank", nameAr: "بنك بوبيان", logo: "/bank-logos/boubyan-bank.jpg", color: "#0066B2", country: "KW" },
    { id: "cbk_kuwait", name: "Commercial Bank of Kuwait", nameAr: "البنك التجاري الكويتي", logo: "/bank-logos/cbk-kuwait.jpg", color: "#004b87", country: "KW" },
    { id: "abk", name: "Al Ahli Bank of Kuwait", nameAr: "البنك الأهلي الكويتي", logo: "https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/abk.png", color: "#004B87", country: "KW" },
    { id: "burgan_bank", name: "Burgan Bank", nameAr: "بنك برقان", logo: "/bank-logos/burgan-bank.png", color: "#004B87", country: "KW" },
    { id: "ahli_united_kuwait", name: "Ahli United Bank Kuwait", nameAr: "البنك الأهلي المتحد - الكويت", logo: "/bank-logos/aub-kuwait.png", color: "#004B87", country: "KW" },
    { id: "warba_bank", name: "Warba Bank", nameAr: "بنك وربة", logo: "/bank-logos/warba.png", color: "#004B87", country: "KW" },
    { id: "kib", name: "Kuwait International Bank", nameAr: "بنك الكويت الدولي", logo: "/bank-logos/kib.png", color: "#004B87", country: "KW" },
    { id: "alrajhi_kuwait", name: "Al Rajhi Bank Kuwait", nameAr: "مصرف الراجحي - الكويت", logo: "/bank-logos/alrajhi-bank.svg", color: "#006C35", country: "KW" },
  ],
  QA: [
    { id: "qnb", name: "Qatar National Bank", nameAr: "بنك قطر الوطني", logo: "/bank-logos/qnb-qatar-new.png", color: "#6E1D3E", country: "QA" },
    { id: "cbq", name: "Commercial Bank of Qatar", nameAr: "البنك التجاري القطري", logo: "/bank-logos/cbq-qatar.png", color: "#861F41", country: "QA" },
    { id: "doha_bank", name: "Doha Bank", nameAr: "بنك الدوحة", logo: "/bank-logos/doha-bank.jpg", color: "#E31E24", country: "QA" },
    { id: "qib", name: "Qatar Islamic Bank", nameAr: "مصرف قطر الإسلامي", logo: "/bank-logos/qib-qatar.png", color: "#00923F", country: "QA" },
    { id: "qiib", name: "Qatar International Islamic Bank", nameAr: "بنك قطر الدولي الإسلامي", logo: "/bank-logos/qiib.png", color: "#861F41", country: "QA" },
    { id: "masraf_alrayan", name: "Masraf Al Rayan", nameAr: "مصرف الريان", logo: "/bank-logos/masraf-alrayan.png", color: "#00A651", country: "QA" },
    { id: "dukhan_bank", name: "Dukhan Bank", nameAr: "بنك دخان", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Dukhan_Bank_logo.svg/512px-Dukhan_Bank_logo.svg.png", color: "#741d47", country: "QA" },
    { id: "ahlibank_qatar", name: "Ahlibank", nameAr: "البنك الأهلي", logo: "/bank-logos/ahlibank-qatar.jpg", color: "#004b87", country: "QA" },
    { id: "qdb", name: "Qatar Development Bank", nameAr: "بنك قطر للتنمية", logo: "/bank-logos/qdb.png", color: "#003087", country: "QA" },
  ],
  BH: [
    { id: "nbb", name: "National Bank of Bahrain", nameAr: "بنك البحرين الوطني", logo: "/bank-logos/nbb-bahrain.jpg", color: "#E31E24", country: "BH" },
    { id: "bbk", name: "Bank of Bahrain and Kuwait", nameAr: "بنك البحرين والكويت", logo: "/bank-logos/bbk-bahrain.png", color: "#004B87", country: "BH" },
    { id: "bisb", name: "Bahrain Islamic Bank", nameAr: "بنك البحرين الإسلامي", logo: "/bank-logos/bisb-bahrain.webp", color: "#00923F", country: "BH" },
    { id: "ahli_united_bahrain", name: "Ahli United Bank", nameAr: "البنك الأهلي المتحد", logo: "/bank-logos/ahli-united-bank.png", color: "#00843D", country: "BH" },
    { id: "al_salam_bank", name: "Al Salam Bank", nameAr: "مصرف السلام", logo: "/bank-logos/alsalam.png", color: "#003087", country: "BH" },
    { id: "bank_abc", name: "Arab Banking Corporation (Bank ABC)", nameAr: "المؤسسة العربية المصرفية (بنك ABC)", logo: "/bank-logos/abc.png", color: "#E31E24", country: "BH" },
    { id: "kfh_bahrain", name: "Kuwait Finance House Bahrain", nameAr: "بيت التمويل الكويتي - البحرين", logo: "/bank-logos/kfh-kuwait.png", color: "#007A33", country: "BH" },
    { id: "ithmaar_bank", name: "Ithmaar Bank", nameAr: "بنك إثمار", logo: "/bank-logos/ithmaar-bank.png", color: "#00A651", country: "BH" },
    { id: "al_baraka", name: "Al Baraka Islamic Bank", nameAr: "بنك البركة الإسلامي", logo: "/bank-logos/albaraka.png", color: "#003087", country: "BH" },
  ],
  OM: [
    { id: "bank_muscat", name: "Bank Muscat", nameAr: "بنك مسقط", logo: "/bank-logos/bank-muscat-new.png", color: "#E31E24", country: "OM" },
    { id: "bank_dhofar", name: "Bank Dhofar", nameAr: "بنك ظفار", logo: "/bank-logos/bank-dhofar.png", color: "#E31E24", country: "OM" },
    { id: "national_bank_oman", name: "National Bank of Oman", nameAr: "البنك الوطني العماني", logo: "/bank-logos/nbo-oman.png", color: "#00A651", country: "OM" },
    { id: "bank_sohar", name: "Sohar International", nameAr: "بنك صحار الدولي", logo: "/bank-logos/sohar-international.png", color: "#0066B2", country: "OM" },
    { id: "oman_arab_bank", name: "Oman Arab Bank", nameAr: "بنك عمان العربي", logo: "/bank-logos/oab.png", color: "#004B87", country: "OM" },
    { id: "ahli_bank_oman", name: "Ahli Bank", nameAr: "البنك الأهلي", logo: "/bank-logos/ahli-bank-oman.jpg", color: "#00843D", country: "OM" },
    { id: "alizz_islamic", name: "Alizz Islamic Bank", nameAr: "بنك العز الإسلامي", logo: "/bank-logos/alizz.png", color: "#004B87", country: "OM" },
    { id: "muscat_islamic", name: "Muscat Islamic Bank", nameAr: "بنك مسقط الإسلامي", logo: "/bank-logos/bank-muscat.png", color: "#E31E24", country: "OM" },
    { id: "hsbc_oman", name: "HSBC Oman", nameAr: "بنك إتش إس بي سي عمان", logo: "/bank-logos/hsbc.png", color: "#db0011", country: "OM" },
    { id: "standard_chartered_oman", name: "Standard Chartered Oman", nameAr: "بنك ستاندرد تشارترد عمان", logo: "/bank-logos/sc.png", color: "#003087", country: "OM" },
  ],
};

export const getBanksByCountry = (countryCode: string): Bank[] => {
  return BANKS_BY_COUNTRY[countryCode] || [];
};

export const getBankById = (bankId: string): Bank | undefined => {
  for (const banks of Object.values(BANKS_BY_COUNTRY)) {
    const bank = banks.find((b) => b.id === bankId);
    if (bank) return bank;
  }
  return undefined;
};

// API simulation function
export const fetchBanksByCountry = async (countryCode: string): Promise<Bank[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return getBanksByCountry(countryCode);
};
