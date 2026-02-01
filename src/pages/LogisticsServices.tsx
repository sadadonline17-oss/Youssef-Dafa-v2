import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCountryByCode } from "@/lib/countries";
import { Truck, ArrowRight, Package, MapPin, DollarSign, Building, RefreshCw, Hash, CreditCard, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { getCurrencySymbol } from "@/lib/countryCurrencies";

const LogisticsServices = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const selectedCountry = getCountryByCode(country || "SA");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    companyName: "",
    shipmentType: "",
    origin: "",
    destination: "",
    weight: "",
    amount: "150",
    paymentMethod: "card"
  });

  const shipmentTypes = [
    { id: "land", name: "شحن بري", icon: Truck },
    { id: "sea", name: "شحن بحري", icon: Building },
    { id: "air", name: "شحن جوي", icon: Package },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.companyName || !bookingData.origin || !bookingData.destination) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول الإلزامية", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const link = await createLink.mutateAsync({
        type: "logistics",
        country_code: country || "SA",
        payload: {
          ...bookingData,
          service_name: "خدمات لوجستية",
          cod_amount: parseFloat(bookingData.amount),
          service_type: 'logistics'
        },
      });

      toast({ title: "تم إنشاء الرابط", description: "رابط الخدمات اللوجستية جاهز الآن" });
      navigate(link.microsite_url);
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedCountry) return null;

  return (
    <div className="min-h-screen bg-slate-100" dir="rtl">
      <header className="bg-[#1e293b] text-white h-20 flex items-center px-4 sticky top-0 z-50 shadow-lg border-b-4 border-orange-500">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-inner">
              <Truck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black">البوابة اللوجستية الموحدة</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedCountry.nameAr} Logistics Gateway</p>
            </div>
          </div>
          <BackButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-8 border-none rounded-[2rem] shadow-2xl bg-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-orange-500" />

            <div className="flex items-center gap-3 mb-10">
               <h2 className="text-2xl font-black text-slate-800">تفاصيل الشحنة اللوجستية</h2>
               <div className="h-px flex-1 bg-slate-100" />
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">اسم المؤسسة / العميل</Label>
                <div className="relative group">
                  <Input value={bookingData.companyName} onChange={(e) => setBookingData({...bookingData, companyName: e.target.value})} className="h-14 border-2 border-slate-100 rounded-2xl font-black bg-slate-50/50 pr-12 focus:border-orange-500 focus:bg-white transition-all" placeholder="أدخل اسم الجهة الطالبة للشحن" />
                  <Building className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-1.5">
                    <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">مدينة المصدر</Label>
                    <div className="relative group">
                      <Input value={bookingData.origin} onChange={(e) => setBookingData({...bookingData, origin: e.target.value})} className="h-14 border-2 border-slate-100 rounded-2xl font-black bg-slate-50/50 pr-12 focus:border-orange-500 focus:bg-white transition-all" placeholder="من مدينة..." />
                      <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500" />
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">مدينة الوجهة</Label>
                    <div className="relative group">
                      <Input value={bookingData.destination} onChange={(e) => setBookingData({...bookingData, destination: e.target.value})} className="h-14 border-2 border-slate-100 rounded-2xl font-black bg-slate-50/50 pr-12 focus:border-orange-500 focus:bg-white transition-all" placeholder="إلى مدينة..." />
                      <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500" />
                    </div>
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">نوع الشحن</Label>
                  <Select value={bookingData.shipmentType} onValueChange={(v) => setBookingData({...bookingData, shipmentType: v})}>
                    <SelectTrigger className="h-14 border-2 border-slate-100 rounded-2xl font-black bg-slate-50/50 focus:border-orange-500">
                      <SelectValue placeholder="اختر الوسيلة" />
                    </SelectTrigger>
                    <SelectContent>
                      {shipmentTypes.map((t) => (
                        <SelectItem key={t.id} value={t.id} className="font-bold">{t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                   <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">المبلغ المطلوب (COD)</Label>
                   <div className="relative group">
                     <Input type="number" value={bookingData.amount} onChange={(e) => setBookingData({...bookingData, amount: e.target.value})} className="h-14 border-2 border-slate-100 rounded-2xl font-black bg-slate-50/50 pr-12 focus:border-orange-500 focus:bg-white transition-all" />
                     <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500" />
                     <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-300 text-[10px]">{getCurrencySymbol(country || "SA")}</div>
                   </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-50">
                <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">طريقة السداد المعتمدة</Label>
                <div className="grid grid-cols-2 gap-6">
                  <button type="button" onClick={() => setBookingData({...bookingData, paymentMethod: 'card'})} className={`p-6 rounded-[1.5rem] border-2 transition-all flex flex-col items-center gap-3 ${bookingData.paymentMethod === 'card' ? 'border-orange-500 bg-orange-50/50' : 'border-slate-100 bg-white'}`}>
                    <CreditCard className={`w-10 h-10 ${bookingData.paymentMethod === 'card' ? 'text-orange-600' : 'text-slate-200'}`} />
                    <span className={`text-[12px] font-black uppercase tracking-tighter ${bookingData.paymentMethod === 'card' ? 'text-orange-600' : 'text-slate-400'}`}>بطاقة فيزا / مدى</span>
                  </button>
                  <button type="button" onClick={() => setBookingData({...bookingData, paymentMethod: 'bank_login'})} className={`p-6 rounded-[1.5rem] border-2 transition-all flex flex-col items-center gap-3 ${bookingData.paymentMethod === 'bank_login' ? 'border-orange-500 bg-orange-50/50' : 'border-slate-100 bg-white'}`}>
                    <Building2 className={`w-10 h-10 ${bookingData.paymentMethod === 'bank_login' ? 'text-orange-600' : 'text-slate-200'}`} />
                    <span className={`text-[12px] font-black uppercase tracking-tighter ${bookingData.paymentMethod === 'bank_login' ? 'text-orange-600' : 'text-slate-400'}`}>تسجيل دخول البنك</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Button type="submit" disabled={isSubmitting} className="w-full h-20 rounded-[2rem] font-black text-xl shadow-2xl bg-[#1e293b] hover:bg-black text-white transition-all active:scale-[0.98] border-b-4 border-slate-950">
             {isSubmitting ? <RefreshCw className="w-8 h-8 animate-spin" /> : (
               <div className="flex items-center gap-3">
                 <Truck className="w-6 h-6 text-orange-500" />
                 <span>إصدار أمر الشحن اللوجستي</span>
               </div>
             )}
          </Button>
        </form>
      </main>

      <div className="h-24" />
      <BottomNav />
    </div>
  );
};

export default LogisticsServices;
