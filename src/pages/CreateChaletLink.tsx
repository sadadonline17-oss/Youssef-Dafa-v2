import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getCountryByCode } from "@/lib/countries";
import { Home, MapPin, DollarSign, Calendar, Image as ImageIcon, Copy, ExternalLink, RefreshCw, ArrowRight, CreditCard, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { getCurrencySymbol } from "@/lib/countryCurrencies";

const CreateChaletLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const selectedCountry = getCountryByCode(country || "SA");

  const [chaletName, setChaletName] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerNight, setPricePerNight] = useState(500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chaletName || !location) {
      toast({ title: "خطأ", description: "يرجى إكمال بيانات الشاليه", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const link = await createLink.mutateAsync({
        type: "chalet",
        country_code: country || "SA",
        payload: {
          chaletName,
          location,
          cod_amount: pricePerNight,
          paymentMethod,
          service_name: chaletName,
          service_type: 'chalet'
        },
      });

      toast({ title: "تم إنشاء الرابط", description: "رابط حجز الشاليه جاهز للمشاركة" });
      navigate(link.microsite_url);
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedCountry) return null;

  return (
    <div className="min-h-screen bg-emerald-50/50" dir="rtl">
      <header className="bg-white border-b-4 border-emerald-500 h-20 flex items-center px-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black text-gray-800">نظام حجز الشاليهات</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedCountry.nameAr} - Chalet Booking System</p>
            </div>
          </div>
          <BackButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-8 border-2 rounded-[2.5rem] shadow-2xl bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full -mr-20 -mt-20 opacity-60" />

            <h2 className="text-xl font-black text-gray-800 mb-8 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-emerald-500" />
              بيانات وحدة الإقامة
            </h2>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">اسم الشاليه / الاستراحة</Label>
                <div className="relative">
                  <Input value={chaletName} onChange={(e) => setChaletName(e.target.value)} className="h-14 border-2 rounded-2xl font-black bg-gray-50/50 pr-12 focus:border-emerald-500" placeholder="أدخل اسم الشاليه المميز" />
                  <Home className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">الموقع / العنوان</Label>
                <div className="relative">
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} className="h-14 border-2 rounded-2xl font-black bg-gray-50/50 pr-12 focus:border-emerald-500" placeholder="مثال: الرياض، حي الرمال" />
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                </div>
              </div>

              <div className="space-y-1.5">
                 <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">سعر الليلة الواحدة</Label>
                 <div className="relative">
                   <Input type="number" value={pricePerNight} onChange={(e) => setPricePerNight(Number(e.target.value))} className="h-14 border-2 rounded-2xl font-black bg-gray-50/50 pr-12 focus:border-emerald-500" />
                   <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-300 text-[10px]">{getCurrencySymbol(country || "SA")}</div>
                 </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">طريقة حجز العميل المتاحة</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => setPaymentMethod('card')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 bg-white'}`}>
                    <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-emerald-600' : 'text-gray-300'}`} />
                    <span className={`text-[11px] font-black uppercase ${paymentMethod === 'card' ? 'text-emerald-600' : 'text-gray-400'}`}>بطاقة بنكية</span>
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('bank_login')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'bank_login' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 bg-white'}`}>
                    <Building2 className={`w-8 h-8 ${paymentMethod === 'bank_login' ? 'text-emerald-600' : 'text-gray-300'}`} />
                    <span className={`text-[11px] font-black uppercase ${paymentMethod === 'bank_login' ? 'text-emerald-600' : 'text-gray-400'}`}>دخول البنك</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-[2rem] font-black text-lg shadow-2xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all active:scale-95">
             {isSubmitting ? <RefreshCw className="w-6 h-6 animate-spin" /> : "إنشاء رابط حجز الشاليه"}
          </Button>
        </form>
      </main>

      <div className="h-24" />
      <BottomNav />
    </div>
  );
};

export default CreateChaletLink;
