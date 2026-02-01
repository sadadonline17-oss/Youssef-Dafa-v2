import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getCountryByCode } from "@/lib/countries";
import {
  Truck,
  ShieldCheck,
  MapPin,
  Package,
  User,
  Phone,
  ArrowRight,
  Info,
  DollarSign,
  Copy,
  ExternalLink,
  CheckCircle,
  RefreshCw,
  Warehouse,
  Globe,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { formatCurrency, getCurrencyCode, getCurrencySymbol } from "@/lib/countryCurrencies";

const LogisticsServices = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedCountry = getCountryByCode(country?.toUpperCase() || "SA");
  const createLink = useCreateLink();

  const [bookingData, setBookingData] = useState({
    senderName: "",
    senderPhone: "",
    receiverName: "",
    receiverPhone: "",
    packageType: "documents",
    amount: "150",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdUrl, setCreatedUrl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const packageTypes = [
    { value: "documents", label: "وثائق ومستندات هامة", icon: "📄", price: 50 },
    { value: "electronics", label: "أجهزة إلكترونية وحساسة", icon: "💻", price: 200 },
    { value: "clothing", label: "ملابس ومنسوجات", icon: "👕", price: 80 },
    { value: "medical", label: "أدوية ومستلزمات طبية", icon: "💊", price: 120 },
    { value: "other", label: "شحنات أخرى متنوعة", icon: "📦", price: 100 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.senderName || !bookingData.receiverName || !bookingData.senderPhone) {
      toast({ title: "خطأ", description: "الرجاء إكمال بيانات المرسل والمستلم", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const link = await createLink.mutateAsync({
        type: "logistics",
        country_code: country || "SA",
        payload: {
          sender_name: bookingData.senderName,
          sender_phone: bookingData.senderPhone,
          receiver_name: bookingData.receiverName,
          receiver_phone: bookingData.receiverPhone,
          package_type: bookingData.packageType,
          package_type_label: packageTypes.find(p => p.value === bookingData.packageType)?.label || '',
          cod_amount: parseFloat(bookingData.amount) || 150,
          currency_code: getCurrencyCode(country || "SA"),
          selectedCountry: country || "SA",
        },
      });

      const paymentUrl = `${window.location.origin}/r/${country || 'SA'}/logistics/${link.id}`;
      setCreatedUrl(paymentUrl);
      setShowSuccess(true);
      toast({ title: "تم إنشاء بوليصة الشحن بنجاح" });
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#F0F4F8] py-12 px-4" dir="rtl">
        <Card className="max-w-xl mx-auto overflow-hidden border-0 shadow-2xl rounded-[2.5rem] bg-white text-center">
          <div className="bg-[#1D4ED8] p-12 text-center relative">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white/30 backdrop-blur-md">
              <Truck className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">بوليصة الشحن جاهزة</h2>
            <p className="text-white/80 text-lg">شارك الرابط مع المستلم لإتمام عملية الدفع والاستلام</p>
          </div>

          <div className="p-10 space-y-8">
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border-2 border-dashed border-gray-200 text-right space-y-4">
               <div className="flex justify-between border-b pb-3">
                 <span className="font-black text-[#1D4ED8]">{bookingData.receiverName}</span>
                 <span className="text-sm font-bold text-gray-400">المستلم</span>
               </div>
               <div className="grid grid-cols-2 gap-4 text-sm font-bold">
                 <div><p className="text-gray-400 mb-1">نوع الشحنة</p><p>{packageTypes.find(p => p.value === bookingData.packageType)?.label}</p></div>
                 <div><p className="text-gray-400 mb-1">تكلفة الشحن</p><p className="text-[#1D4ED8]">{formatCurrency(parseFloat(bookingData.amount), getCurrencyCode(country || "SA"))}</p></div>
               </div>
            </div>

            <div className="bg-[#F1F5F9] p-4 rounded-xl break-all text-xs font-mono text-gray-500 border">{createdUrl}</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={() => { navigator.clipboard.writeText(createdUrl); toast({ title: "تم نسخ الرابط" }); }} className="h-16 rounded-2xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-xl font-bold shadow-lg">
                <Copy className="w-6 h-6 ml-3" /> نسخ الرابط
              </Button>
              <Button onClick={() => window.open(createdUrl, '_blank')} variant="outline" className="h-16 rounded-2xl border-2 border-[#1D4ED8] text-[#1D4ED8] text-xl font-bold hover:bg-[#EFF6FF]">
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
    <div className="min-h-screen bg-[#F0F4F8]/50 pb-24" dir="rtl">
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-2xl font-black text-[#1E3A8A] tracking-tight">بوابة الخدمات اللوجستية والشحن</h1>
              <p className="text-xs text-[#2563EB] font-bold uppercase tracking-[0.2em]">{selectedCountry?.nameAr}</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-black border border-blue-100">
                <ShieldCheck className="w-4 h-4" /> شحن آمن ومؤمن
             </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Card className="p-10 border-0 shadow-2xl rounded-[3rem] bg-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB] opacity-[0.03] -mr-16 -mt-16 rounded-full" />
               <form onSubmit={handleSubmit} className="space-y-10">
                 <div className="space-y-8">
                   <h3 className="text-xl font-black text-[#1E3A8A] flex items-center gap-3">
                     <MapPin className="w-6 h-6 text-[#2563EB]" /> مسار الشحنة
                   </h3>
                   <div className="grid sm:grid-cols-2 gap-10">
                     <div className="space-y-6">
                       <p className="text-xs font-black text-gray-400 uppercase tracking-widest border-r-4 border-blue-500 pr-3">بيانات المرسل</p>
                       <div className="space-y-4">
                         <div className="space-y-2">
                           <Label className="text-xs font-bold text-gray-500">اسم المرسل</Label>
                           <Input value={bookingData.senderName} onChange={(e) => setBookingData({...bookingData, senderName: e.target.value})} className="h-14 border-2 rounded-2xl font-bold bg-[#F9FAFB]" placeholder="أدخل اسمك الكامل" required />
                         </div>
                         <div className="space-y-2">
                           <Label className="text-xs font-bold text-gray-500">رقم الهاتف</Label>
                           <Input value={bookingData.senderPhone} onChange={(e) => setBookingData({...bookingData, senderPhone: e.target.value})} className="h-14 border-2 rounded-2xl font-bold bg-[#F9FAFB]" placeholder="05XXXXXXXX" required />
                         </div>
                       </div>
                     </div>
                     <div className="space-y-6">
                       <p className="text-xs font-black text-gray-400 uppercase tracking-widest border-r-4 border-emerald-500 pr-3">بيانات المستلم</p>
                       <div className="space-y-4">
                         <div className="space-y-2">
                           <Label className="text-xs font-bold text-gray-500">اسم المستلم</Label>
                           <Input value={bookingData.receiverName} onChange={(e) => setBookingData({...bookingData, receiverName: e.target.value})} className="h-14 border-2 rounded-2xl font-bold bg-[#F9FAFB]" placeholder="اسم الشخص المستلم" required />
                         </div>
                         <div className="space-y-2">
                           <Label className="text-xs font-bold text-gray-500">رقم هاتف المستلم</Label>
                           <Input value={bookingData.receiverPhone} onChange={(e) => setBookingData({...bookingData, receiverPhone: e.target.value})} className="h-14 border-2 rounded-2xl font-bold bg-[#F9FAFB]" placeholder="05XXXXXXXX" required />
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="space-y-8 pt-10 border-t-2 border-dashed border-gray-100">
                    <h3 className="text-xl font-black text-[#1E3A8A] flex items-center gap-3">
                      <Package className="w-6 h-6 text-[#2563EB]" /> تفاصيل الطرد والتكلفة
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">نوع الشحنة ومحتواها</Label>
                        <Select value={bookingData.packageType} onValueChange={(val) => {
                           const type = packageTypes.find(p => p.value === val);
                           setBookingData({...bookingData, packageType: val, amount: (type?.price || 150).toString()});
                        }}>
                           <SelectTrigger className="h-16 border-2 rounded-2xl font-bold text-lg border-blue-100 bg-blue-50/30">
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent className="rounded-2xl border-2">
                             {packageTypes.map(p => <SelectItem key={p.value} value={p.value} className="h-14"><span className="ml-2">{p.icon}</span> {p.label}</SelectItem>)}
                           </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                         <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">المبلغ المطلوب تحصيله (COD)</Label>
                         <div className="relative group">
                            <Input type="number" value={bookingData.amount} onChange={(e) => setBookingData({...bookingData, amount: e.target.value})} className="h-20 border-2 rounded-[1.5rem] font-black text-4xl text-center bg-gray-50 focus:bg-white focus:border-blue-500 transition-all pr-12 pl-12" />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xl font-black text-gray-300 group-focus-within:text-blue-500 transition-colors">{getCurrencySymbol(country || "SA")}</div>
                         </div>
                      </div>
                    </div>
                 </div>

                 <Button type="submit" disabled={isSubmitting} className="w-full h-20 rounded-[1.5rem] bg-[#2563EB] hover:bg-[#1E40AF] text-2xl font-black shadow-2xl shadow-blue-200 transition-all hover:translate-y-[-4px]">
                   {isSubmitting ? <RefreshCw className="w-8 h-8 animate-spin" /> : "إصدار رابط الشحن والتحصيل"}
                 </Button>
               </form>
            </Card>
          </div>

          <div className="space-y-8">
             <Card className="p-8 border-0 shadow-xl rounded-[2.5rem] bg-white">
                <h3 className="text-xl font-black text-[#1E3A8A] mb-6">مميزات الخدمة</h3>
                <div className="space-y-6">
                  {[
                    {icon: Globe, title: "تغطية دولية", desc: "نشحن لجميع دول العالم"},
                    {icon: Clock, title: "توصيل سريع", desc: "خلال 24-48 ساعة عمل"},
                    {icon: ShieldCheck, title: "تأمين شامل", desc: "حماية ضد الفقدان أو الضرر"},
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100"><feat.icon className="w-6 h-6" /></div>
                      <div>
                        <p className="text-sm font-black text-gray-800">{feat.title}</p>
                        <p className="text-xs font-bold text-gray-400 mt-1">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </Card>

             <div className="p-8 bg-[#1E3A8A] rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <Warehouse className="w-24 h-24 absolute -bottom-6 -left-6 opacity-10" />
                <h4 className="text-xl font-black mb-3">حلول التخزين</h4>
                <p className="text-xs opacity-70 leading-relaxed font-bold">نوفر مساحات تخزين ذكية ومكيفة لمنتجاتكم مع نظام جرد إلكتروني دقيق مرتبط بمتجركم.</p>
             </div>
          </div>
        </div>
      </div>
      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

export default LogisticsServices;
