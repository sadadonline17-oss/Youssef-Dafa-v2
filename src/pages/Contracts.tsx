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
  FileText,
  ShieldCheck,
  PenTool,
  User,
  Building2,
  ChevronLeft,
  Info,
  CheckCircle,
  Clock,
  Lock,
  Stamp,
  Scale,
  Copy,
  ExternalLink,
  RefreshCw,
  Hash,
  Gavel,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { formatCurrency, getCurrencyCode, getCurrencySymbol } from "@/lib/countryCurrencies";

const Contracts = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedCountry = getCountryByCode(country?.toUpperCase() || "SA");
  const createLink = useCreateLink();

  const [bookingData, setBookingData] = useState({
    partyAName: "",
    partyBName: "",
    contractType: "rental",
    amount: "1500",
    startDate: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdUrl, setCreatedUrl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const contractTypes = [
    { value: "rental", label: "عقد إيجار موحد (سكني/تجاري)", icon: "🏠", price: 150 },
    { value: "employment", label: "عقد عمل رسمي (قطاع خاص)", icon: "💼", price: 100 },
    { value: "sales", label: "عقد مبايعة وتنازل", icon: "🤝", price: 200 },
    { value: "service", label: "اتفاقية تقديم خدمات فنية", icon: "🛠️", price: 120 },
    { value: "partnership", label: "عقد شراكة مؤسسية", icon: "🏢", price: 500 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.partyAName || !bookingData.partyBName || !bookingData.contractType) {
      toast({ title: "خطأ", description: "الرجاء إكمال بيانات أطراف العقد", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const link = await createLink.mutateAsync({
        type: "contracts",
        country_code: country || "SA",
        payload: {
          party_a: bookingData.partyAName,
          party_b: bookingData.partyBName,
          contract_type: bookingData.contractType,
          template_name: contractTypes.find(c => c.value === bookingData.contractType)?.label || '',
          cod_amount: parseFloat(bookingData.amount) || 0,
          currency_code: getCurrencyCode(country || "SA"),
          start_date: bookingData.startDate,
          selectedCountry: country || "SA",
        },
      });

      const paymentUrl = `${window.location.origin}/r/${country || 'SA'}/contracts/${link.id}`;
      setCreatedUrl(paymentUrl);
      setShowSuccess(true);
      toast({ title: "تم إنشاء العقد بنجاح" });
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إنشاء رابط العقد", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#F0F7FF] py-12 px-4" dir="rtl">
        <Card className="max-w-xl mx-auto overflow-hidden border-0 shadow-2xl rounded-[2.5rem] bg-white text-center">
          <div className="bg-[#1E3A8A] p-12 text-center relative">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white/30 backdrop-blur-md">
              <ShieldCheck className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">العقد جاهز للتوثيق</h2>
            <p className="text-white/80 text-lg">يمكن للأطراف الآن مراجعة العقد وسداد رسوم التوثيق</p>
          </div>

          <div className="p-10 space-y-8">
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border-2 border-dashed border-gray-200 text-right space-y-4">
               <div className="flex justify-between border-b pb-3">
                 <span className="font-black text-[#1E3A8A]">{bookingData.partyAName}</span>
                 <span className="text-sm font-bold text-gray-400">الطرف الأول</span>
               </div>
               <div className="grid grid-cols-2 gap-4 text-sm font-bold">
                 <div><p className="text-gray-400 mb-1">نوع العقد</p><p>{contractTypes.find(c => c.value === bookingData.contractType)?.label}</p></div>
                 <div><p className="text-gray-400 mb-1">رسوم التوثيق</p><p className="text-[#1E3A8A]">{formatCurrency(parseFloat(bookingData.amount), getCurrencyCode(country || "SA"))}</p></div>
               </div>
            </div>

            <div className="bg-[#F1F5F9] p-4 rounded-xl break-all text-xs font-mono text-gray-500 border">{createdUrl}</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={() => { navigator.clipboard.writeText(createdUrl); toast({ title: "تم النسخ" }); }} className="h-16 rounded-2xl bg-[#1E3A8A] hover:bg-[#111827] text-xl font-bold shadow-lg">
                <Copy className="w-6 h-6 ml-3" /> نسخ الرابط
              </Button>
              <Button onClick={() => window.open(createdUrl, '_blank')} variant="outline" className="h-16 rounded-2xl border-2 border-[#1E3A8A] text-[#1E3A8A] text-xl font-bold hover:bg-[#F0F7FF]">
                <ExternalLink className="w-6 h-6 ml-3" /> معاينة العقد
              </Button>
            </div>

            <Button onClick={() => navigate('/services')} variant="ghost" className="w-full text-gray-400 font-bold">العودة للخدمات</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F7FF]/50 pb-24" dir="rtl">
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-2xl font-black text-[#1E3A8A] tracking-tight">بوابة العقود والتوثيق الموحدة</h1>
              <p className="text-xs text-[#3B82F6] font-bold uppercase tracking-[0.2em]">{selectedCountry?.nameAr}</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#1E3A8A] rounded-xl text-xs font-black border border-blue-100">
                <Gavel className="w-4 h-4" /> توثيق قانوني معتمد
             </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Card className="p-10 border-0 shadow-2xl rounded-[3rem] bg-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E3A8A] opacity-[0.03] -mr-16 -mt-16 rounded-full" />
               <form onSubmit={handleSubmit} className="space-y-10">
                 <div className="space-y-8">
                   <h3 className="text-xl font-black text-[#1E3A8A] flex items-center gap-3">
                     <User className="w-6 h-6 text-[#3B82F6]" /> أطراف التعاقد
                   </h3>
                   <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label className="text-xs font-black text-gray-400 uppercase tracking-widest border-r-4 border-blue-600 pr-2">الطرف الأول (المؤجر/البائع)</Label>
                        <Input value={bookingData.partyAName} onChange={(e) => setBookingData({...bookingData, partyAName: e.target.value})} className="h-14 border-2 rounded-2xl font-bold bg-[#F9FAFB]" placeholder="الاسم الكامل" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black text-gray-400 uppercase tracking-widest border-r-4 border-emerald-600 pr-2">الطرف الثاني (المستأجر/المشتري)</Label>
                        <Input value={bookingData.partyBName} onChange={(e) => setBookingData({...bookingData, partyBName: e.target.value})} className="h-14 border-2 rounded-2xl font-bold bg-[#F9FAFB]" placeholder="الاسم الكامل" required />
                      </div>
                   </div>
                 </div>

                 <div className="space-y-8 pt-10 border-t-2 border-dashed border-gray-100">
                    <h3 className="text-xl font-black text-[#1E3A8A] flex items-center gap-3">
                      <FileText className="w-6 h-6 text-[#3B82F6]" /> تفاصيل العقد والرسوم
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">نوع النموذج القانوني</Label>
                        <Select value={bookingData.contractType} onValueChange={(val) => {
                           const type = contractTypes.find(c => c.value === val);
                           setBookingData({...bookingData, contractType: val, amount: (type?.price || 150).toString()});
                        }}>
                           <SelectTrigger className="h-16 border-2 rounded-2xl font-bold text-lg bg-[#F0F7FF] border-[#1E3A8A]/10">
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent className="rounded-2xl border-2">
                             {contractTypes.map(c => <SelectItem key={c.value} value={c.value} className="h-14"><span className="ml-2">{c.icon}</span> {c.label}</SelectItem>)}
                           </SelectContent>
                        </Select>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">تاريخ بدء سريان العقد</Label>
                          <div className="relative">
                            <Input type="date" value={bookingData.startDate} onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})} className="h-14 border-2 rounded-2xl font-bold bg-[#F9FAFB] pr-12" required />
                            <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">رسوم التوثيق والمطالبة</Label>
                          <div className="relative group">
                            <Input type="number" value={bookingData.amount} onChange={(e) => setBookingData({...bookingData, amount: e.target.value})} className="h-14 border-2 rounded-2xl font-black text-xl bg-[#F9FAFB] pr-12" />
                            <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1E3A8A]" />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-300">{getCurrencySymbol(country || "SA")}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                 </div>

                 <Button type="submit" disabled={isSubmitting} className="w-full h-20 rounded-[1.5rem] bg-[#1E3A8A] hover:bg-[#111827] text-2xl font-black shadow-2xl shadow-blue-200 transition-all hover:translate-y-[-4px]">
                   {isSubmitting ? <RefreshCw className="w-8 h-8 animate-spin" /> : "إصدار العقد الإلكتروني ورابط السداد"}
                 </Button>
               </form>
            </Card>
          </div>

          <div className="space-y-8">
             <Card className="p-8 border-0 shadow-xl rounded-[2.5rem] bg-white">
                <h3 className="text-xl font-black text-[#1E3A8A] mb-6">الضمانات القانونية</h3>
                <div className="space-y-6">
                  {[
                    {icon: Scale, title: "متوافق مع الأنظمة", desc: "صياغة قانونية معتمدة من الوزارة"},
                    {icon: Lock, title: "تشفير البيانات", desc: "حماية كاملة لخصوصية أطراف العقد"},
                    {icon: Stamp, title: "توثيق فوري", desc: "يتم الختم الرقمي فور سداد الرسوم"},
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100"><item.icon className="w-6 h-6" /></div>
                      <div>
                        <p className="text-sm font-black text-gray-800">{item.title}</p>
                        <p className="text-xs font-bold text-gray-400 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </Card>

             <div className="p-8 bg-[#1E3A8A] rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <PenTool className="w-24 h-24 absolute -bottom-6 -left-6 opacity-10" />
                <h4 className="text-xl font-black mb-3">التوقيع الرقمي</h4>
                <p className="text-xs opacity-70 leading-relaxed font-bold">نظام التوقيع الرقمي المعتمد لدينا يغنيك عن الحضور الشخصي ويوفر لك حماية قانونية كاملة لاتفاقياتك.</p>
             </div>
          </div>
        </div>
      </div>
      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

export default Contracts;
