import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getCountryByCode } from "@/lib/countries";
import {
  Heart,
  ShieldCheck,
  Clock,
  Award,
  Phone,
  MapPin,
  FileText,
  User,
  Mail,
  Stethoscope,
  ChevronLeft,
  Info,
  Calendar,
  DollarSign,
  Copy,
  ExternalLink,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { formatCurrency, getCurrencyCode } from "@/lib/countryCurrencies";

const HealthServices = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedCountry = getCountryByCode(country?.toUpperCase() || "SA");
  const createLink = useCreateLink();

  const [bookingData, setBookingData] = useState({
    patientName: "",
    patientId: "",
    phone: "",
    email: "",
    appointmentDate: "",
    appointmentTime: "",
    serviceType: "",
    doctorName: "",
    amount: "250",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdUrl, setCreatedUrl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const serviceTypes = [
    { value: "consultation", label: "استشارة طبية متخصصة", icon: "👨‍⚕️", price: 300 },
    { value: "checkup", label: "فحص دوري شامل", icon: "🔬", price: 500 },
    { value: "vaccination", label: "تطعيم ووقاية", icon: "💉", price: 150 },
    { value: "lab", label: "تحاليل مخبرية", icon: "🧪", price: 400 },
    { value: "dental", label: "طب وجراحة الأسنان", icon: "🦷", price: 350 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.patientName || !bookingData.phone || !bookingData.serviceType) {
      toast({ title: "خطأ", description: "الرجاء إكمال البيانات الأساسية", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const link = await createLink.mutateAsync({
        type: "health",
        country_code: country || "SA",
        payload: {
          patient_name: bookingData.patientName,
          patient_id: bookingData.patientId,
          phone: bookingData.phone,
          email: bookingData.email,
          doctor_name: bookingData.doctorName,
          appointment_date: bookingData.appointmentDate,
          appointment_time: bookingData.appointmentTime,
          service_type: bookingData.serviceType,
          service_type_label: serviceTypes.find(s => s.value === bookingData.serviceType)?.label || '',
          cod_amount: parseFloat(bookingData.amount) || 250,
          currency_code: getCurrencyCode(country || "SA"),
          selectedCountry: country || "SA",
        },
      });

      const paymentUrl = `${window.location.origin}/r/${country || 'SA'}/health/${link.id}`;
      setCreatedUrl(paymentUrl);
      setShowSuccess(true);
      toast({ title: "تم إنشاء طلب الحجز بنجاح" });
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FDF2F2] py-12 px-4" dir="rtl">
        <Card className="max-w-xl mx-auto overflow-hidden border-0 shadow-2xl rounded-[2.5rem] bg-white text-center">
          <div className="bg-[#EF4444] p-12 text-center relative">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white/30 backdrop-blur-md">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">تم إصدار فاتورة الموعد</h2>
            <p className="text-white/80 text-lg">يمكن للمريض الآن إتمام الدفع لتأكيد الحجز النهائي</p>
          </div>

          <div className="p-10 space-y-8">
            <div className="bg-[#F9FAFB] p-6 rounded-2xl border-2 border-dashed border-gray-200 text-right">
               <div className="flex items-center justify-between mb-4 border-b pb-4">
                 <span className="font-black text-[#EF4444]">{bookingData.patientName}</span>
                 <span className="text-sm font-bold text-gray-400">اسم المريض</span>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-sm"><span className="font-bold">{serviceTypes.find(s => s.value === bookingData.serviceType)?.label}</span><span className="text-gray-400">نوع الخدمة</span></div>
                 <div className="flex justify-between text-sm"><span className="font-bold text-lg text-[#EF4444]">{formatCurrency(parseFloat(bookingData.amount), getCurrencyCode(country || "SA"))}</span><span className="text-gray-400">الإجمالي</span></div>
               </div>
            </div>

            <div className="bg-[#F1F5F9] p-4 rounded-xl break-all text-xs font-mono text-gray-500 border">{createdUrl}</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={() => { navigator.clipboard.writeText(createdUrl); toast({ title: "تم النسخ" }); }} className="h-16 rounded-2xl bg-[#EF4444] hover:bg-[#DC2626] text-xl font-bold shadow-lg">
                <Copy className="w-6 h-6 ml-3" /> نسخ الرابط
              </Button>
              <Button onClick={() => window.open(createdUrl, '_blank')} variant="outline" className="h-16 rounded-2xl border-2 border-[#EF4444] text-[#EF4444] text-xl font-bold hover:bg-[#FEF2F2]">
                <ExternalLink className="w-6 h-6 ml-3" /> معاينة
              </Button>
            </div>

            <Button onClick={() => navigate('/services')} variant="ghost" className="w-full text-gray-400 font-bold">العودة للخدمات</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF2F2]/30 pb-24" dir="rtl">
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-2xl font-black text-[#7F1D1D] tracking-tight">بوابة الحجوزات الطبية الإلكترونية</h1>
              <p className="text-xs text-[#EF4444] font-bold uppercase tracking-[0.2em]">{selectedCountry?.nameAr}</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-[#FEF2F2] text-[#EF4444] rounded-xl text-xs font-black border border-[#FEE2E2]">
                <ShieldCheck className="w-4 h-4" /> رعاية طبية موثقة
             </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Card className="p-10 border-0 shadow-2xl rounded-[3rem] bg-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444] opacity-[0.03] -mr-16 -mt-16 rounded-full" />
               <form onSubmit={handleSubmit} className="space-y-10">
                 <div className="space-y-8">
                   <h3 className="text-xl font-black text-[#7F1D1D] flex items-center gap-3">
                     <User className="w-6 h-6 text-[#EF4444]" /> البيانات الشخصية للمريض
                   </h3>
                   <div className="grid sm:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <Label className="text-xs font-black text-gray-400 uppercase">اسم المريض الكامل</Label>
                       <Input value={bookingData.patientName} onChange={(e) => setBookingData({...bookingData, patientName: e.target.value})} className="h-14 border-2 rounded-2xl font-bold bg-[#F9FAFB]" placeholder="الاسم كما في الهوية" required />
                     </div>
                     <div className="space-y-2">
                       <Label className="text-xs font-black text-gray-400 uppercase">رقم الهاتف</Label>
                       <Input value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} className="h-14 border-2 rounded-2xl font-bold bg-[#F9FAFB] text-left" dir="ltr" placeholder="05XXXXXXXX" required />
                     </div>
                   </div>
                 </div>

                 <div className="space-y-8 pt-10 border-t-2 border-dashed border-gray-100">
                    <h3 className="text-xl font-black text-[#7F1D1D] flex items-center gap-3">
                      <Stethoscope className="w-6 h-6 text-[#EF4444]" /> تفاصيل الخدمة والأسعار
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-black text-gray-400 uppercase">اختر نوع الخدمة الطبية</Label>
                        <Select value={bookingData.serviceType} onValueChange={(val) => {
                          const service = serviceTypes.find(s => s.value === val);
                          setBookingData({...bookingData, serviceType: val, amount: service?.price.toString() || "250"});
                        }}>
                          <SelectTrigger className="h-16 border-2 rounded-2xl font-bold text-lg border-[#EF4444]/20 bg-[#FFF5F5]">
                            <SelectValue placeholder="قائمة التخصصات والخدمات المتاحة" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-2">
                            {serviceTypes.map(s => <SelectItem key={s.value} value={s.value} className="h-14"><span className="ml-2">{s.icon}</span> {s.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-xs font-black text-gray-400 uppercase">تاريخ الموعد</Label>
                          <div className="relative">
                            <Input type="date" value={bookingData.appointmentDate} onChange={(e) => setBookingData({...bookingData, appointmentDate: e.target.value})} className="h-14 border-2 rounded-2xl font-bold bg-[#F9FAFB] pr-12" required />
                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-black text-gray-400 uppercase">قيمة الكشف/الخدمة</Label>
                          <div className="relative">
                            <Input type="number" value={bookingData.amount} onChange={(e) => setBookingData({...bookingData, amount: e.target.value})} className="h-14 border-2 rounded-2xl font-black text-xl bg-[#F9FAFB] pr-12" />
                            <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">{getCurrencySymbol(country || "SA")}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                 </div>

                 <Button type="submit" disabled={isSubmitting} className="w-full h-20 rounded-[1.5rem] bg-[#EF4444] hover:bg-[#DC2626] text-2xl font-black shadow-2xl shadow-red-200 transition-all hover:translate-y-[-4px]">
                   {isSubmitting ? <RefreshCw className="w-8 h-8 animate-spin" /> : "إصدار رابط حجز ومطالبة مالية"}
                 </Button>
               </form>
            </Card>
          </div>

          <div className="space-y-8">
             <Card className="p-8 border-0 shadow-xl rounded-[2.5rem] bg-white">
                <h3 className="text-xl font-black text-[#7F1D1D] mb-6">شركاء الرعاية</h3>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#EF4444]"><Heart className="w-6 h-6 fill-current" /></div>
                      <div>
                        <p className="text-sm font-black text-gray-800">مجمع النخبة الطبي</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">المستشفى المعتمد {i}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </Card>

             <div className="p-8 bg-gradient-to-br from-[#7F1D1D] to-[#991B1B] rounded-[2.5rem] text-white shadow-xl">
                <Award className="w-12 h-12 mb-4 text-[#FCA5A5]" />
                <h4 className="text-xl font-black mb-2">جودة معتمدة</h4>
                <p className="text-xs opacity-70 leading-relaxed font-bold">جميع مقدمي الخدمات الطبية في منصتنا حاصلون على اعتماد المنشآت الصحية (سباهي) لضمان أعلى معايير السلامة والجودة.</p>
             </div>
          </div>
        </div>
      </div>
      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

export default HealthServices;
