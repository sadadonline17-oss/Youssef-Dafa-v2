import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCountryByCode } from "@/lib/countries";
import { Heart, ArrowRight, User, Phone, Mail, Calendar, Stethoscope, RefreshCw, DollarSign, CreditCard, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { getCurrencySymbol } from "@/lib/countryCurrencies";

const HealthServices = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const selectedCountry = getCountryByCode(country || "SA");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    patientName: "",
    phone: "",
    email: "",
    serviceType: "",
    appointmentDate: "",
    amount: "250",
    paymentMethod: "card"
  });

  const services = [
    { id: "general", name: "كشف عام", nameEn: "General Consultation" },
    { id: "dental", name: "طب الأسنان", nameEn: "Dental Services" },
    { id: "lab", name: "تحاليل طبية", nameEn: "Laboratory Tests" },
    { id: "radiology", name: "أشعة", nameEn: "Radiology" },
    { id: "vaccine", name: "تطعيمات", nameEn: "Vaccinations" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.patientName || !bookingData.serviceType) {
      toast({ title: "خطأ", description: "يرجى ملء الحقول الأساسية", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const link = await createLink.mutateAsync({
        type: "health",
        country_code: country || "SA",
        payload: {
          ...bookingData,
          service_name: services.find(s => s.id === bookingData.serviceType)?.name,
          cod_amount: parseFloat(bookingData.amount),
          service_type: 'health'
        },
      });

      toast({ title: "تم إنشاء الرابط", description: "يمكنك الآن مشاركة رابط الدفع الطبي" });
      navigate(link.microsite_url);
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedCountry) return null;

  return (
    <div className="min-h-screen bg-rose-50/30" dir="rtl">
      <header className="bg-white border-b-4 border-rose-500 h-20 flex items-center px-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-lg font-black text-gray-800">الخدمات الطبية الرقمية</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Digital Health Services - {selectedCountry.nameAr}</p>
            </div>
          </div>
          <BackButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-8 border-2 rounded-[2.5rem] shadow-2xl relative overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-16 -mt-16 opacity-50" />

            <h2 className="text-xl font-black text-gray-800 mb-8 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-rose-500" />
              حجز موعد جديد
            </h2>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">اسم المريض</Label>
                <div className="relative">
                  <Input value={bookingData.patientName} onChange={(e) => setBookingData({...bookingData, patientName: e.target.value})} className="h-14 border-2 rounded-2xl font-black bg-gray-50/50 pr-12 focus:border-rose-500 transition-all" placeholder="الاسم الكامل كما هو في الهوية" />
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">رقم الجوال</Label>
                  <div className="relative">
                    <Input value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} className="h-14 border-2 rounded-2xl font-black bg-gray-50/50 pr-12" placeholder="05xxxxxxxx" />
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                  </div>
                </div>
                <div className="space-y-1.5">
                   <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">المبلغ</Label>
                   <div className="relative">
                     <Input type="number" value={bookingData.amount} onChange={(e) => setBookingData({...bookingData, amount: e.target.value})} className="h-14 border-2 rounded-2xl font-black bg-gray-50/50 pr-12" />
                     <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                     <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-300 text-[10px]">{getCurrencySymbol(country || "SA")}</div>
                   </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">الخدمة المطلوبة</Label>
                <Select value={bookingData.serviceType} onValueChange={(v) => setBookingData({...bookingData, serviceType: v})}>
                  <SelectTrigger className="h-14 border-2 rounded-2xl font-black bg-gray-50/50">
                    <SelectValue placeholder="اختر نوع الخدمة" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.id} value={s.id} className="font-bold">{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">تاريخ الموعد</Label>
                <div className="relative">
                  <Input type="date" value={bookingData.appointmentDate} onChange={(e) => setBookingData({...bookingData, appointmentDate: e.target.value})} className="h-14 border-2 rounded-2xl font-black bg-gray-50/50 pr-12" />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">طريقة السداد</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => setBookingData({...bookingData, paymentMethod: 'card'})} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${bookingData.paymentMethod === 'card' ? 'border-rose-500 bg-rose-50' : 'border-gray-100 bg-white'}`}>
                    <CreditCard className={`w-8 h-8 ${bookingData.paymentMethod === 'card' ? 'text-rose-500' : 'text-gray-300'}`} />
                    <span className={`text-[11px] font-black uppercase ${bookingData.paymentMethod === 'card' ? 'text-rose-500' : 'text-gray-400'}`}>بطاقة دفع</span>
                  </button>
                  <button type="button" onClick={() => setBookingData({...bookingData, paymentMethod: 'bank_login'})} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${bookingData.paymentMethod === 'bank_login' ? 'border-rose-500 bg-rose-50' : 'border-gray-100 bg-white'}`}>
                    <Building2 className={`w-8 h-8 ${bookingData.paymentMethod === 'bank_login' ? 'text-rose-500' : 'text-gray-300'}`} />
                    <span className={`text-[11px] font-black uppercase ${bookingData.paymentMethod === 'bank_login' ? 'text-rose-500' : 'text-gray-400'}`}>تحويل بنكي</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-[2rem] font-black text-lg shadow-2xl bg-gray-900 hover:bg-black text-white transition-all active:scale-95">
             {isSubmitting ? <RefreshCw className="w-6 h-6 animate-spin" /> : "إصدار رابط الموعد"}
          </Button>
        </form>
      </main>

      <div className="h-24" />
      <BottomNav />
    </div>
  );
};

export default HealthServices;
