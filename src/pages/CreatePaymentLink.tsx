import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { getCurrencySymbol, getCurrencyName, getCurrencyCode } from "@/lib/countryCurrencies";
import {
  CreditCard,
  DollarSign,
  Copy,
  ExternalLink,
  ShieldCheck,
  Lock,
  Info,
  CheckCircle,
  Zap,
  Building2,
  ChevronLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

const CreatePaymentLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const countryData = getCountryByCode(country?.toUpperCase() || "SA");

  const [paymentAmount, setPaymentAmount] = useState("500");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdUrl, setCreatedUrl] = useState("");
  const [linkId, setLinkId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast({ title: "خطأ", description: "الرجاء إدخال مبلغ صحيح", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const link = await createLink.mutateAsync({
        type: "payment",
        country_code: country || "SA",
        payload: {
          payment_amount: parseFloat(paymentAmount) || 500,
          currency_code: getCurrencyCode(country || "SA"),
          payment_method: paymentMethod,
          selectedCountry: country || "SA",
        },
      });

      const paymentUrl = `${window.location.origin}/r/${country || 'SA'}/payment/${link.id}`;
      setCreatedUrl(paymentUrl);
      setLinkId(link.id);
      setShowSuccess(true);
      toast({ title: "تم إنشاء الرابط بنجاح" });
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!countryData) return null;

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4" dir="rtl">
        <Card className="max-w-xl mx-auto overflow-hidden border-0 shadow-2xl rounded-[2rem] bg-white">
          <div className="bg-[#10B981] p-12 text-center relative">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white/30 backdrop-blur-md">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">رابط الدفع جاهز!</h2>
            <p className="text-white/80 text-lg">أرسل الرابط للعميل لإتمام عملية الدفع الفوري</p>
          </div>

          <div className="p-10 space-y-8">
            <div className="bg-[#F1F5F9] p-8 rounded-2xl border-2 border-dashed border-[#CBD5E1]">
              <p className="text-xs font-black text-gray-400 mb-3 uppercase tracking-[0.2em]">رابط الدفع السريع</p>
              <div className="bg-white p-5 rounded-xl border border-gray-200 break-all text-sm font-mono shadow-inner text-[#334155]">
                {createdUrl}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(createdUrl);
                  toast({ title: "تم نسخ الرابط" });
                }}
                className="h-16 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-xl font-bold shadow-lg transition-all"
              >
                <Copy className="w-6 h-6 ml-3" /> نسخ الرابط
              </Button>
              <Button
                onClick={() => window.open(createdUrl, '_blank')}
                variant="outline"
                className="h-16 rounded-2xl border-2 border-[#10B981] text-[#10B981] text-xl font-bold hover:bg-[#ECFDF5] transition-all"
              >
                <ExternalLink className="w-6 h-6 ml-3" /> معاينة
              </Button>
            </div>

            <div className="pt-6 flex flex-col gap-3">
              <Button
                onClick={() => navigate(`/pay/${linkId}/data`)}
                className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
              >
                إكمال البيانات يدوياً
              </Button>
              <Button
                onClick={() => navigate('/services')}
                variant="ghost"
                className="w-full text-gray-400 font-bold"
              >
                العودة للخدمات
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24" dir="rtl">
      {/* Dynamic Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-2xl font-black text-[#1E293B] tracking-tight">إنشاء رابط دفع محلي</h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{countryData.nameAr}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black">
              <ShieldCheck className="w-4 h-4" /> مدفوعات مشفرة
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-xs font-black">
              <Lock className="w-4 h-4" /> حماية 256-bit
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* Main Card */}
          <div className="lg:col-span-3">
            <Card className="p-10 border-0 shadow-2xl rounded-[2.5rem] bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#10B981] opacity-[0.03] -mr-20 -mt-20 rounded-full" />

              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="space-y-6">
                  <Label className="text-xl font-black text-[#334155] flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-[#10B981] rounded-full" /> حدد المبلغ المطلوب
                  </Label>
                  <div className="relative group">
                    <Input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="h-24 border-4 border-[#F1F5F9] group-focus-within:border-[#10B981]/30 rounded-[2rem] text-5xl font-black text-center text-[#1E293B] transition-all bg-[#F8FAFC]"
                      placeholder="0.00"
                    />
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300">
                      {getCurrencySymbol(country || "SA")}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2">
                    {['100', '500', '1000', '2500'].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setPaymentAmount(amt)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                          paymentAmount === amt
                            ? 'bg-[#10B981] text-white shadow-md'
                            : 'bg-[#F1F5F9] text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {amt} {getCurrencySymbol(country || "SA")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 pt-10 border-t-2 border-[#F1F5F9]">
                  <Label className="text-xl font-black text-[#334155] flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-[#10B981] rounded-full" /> وسيلة التحصيل
                  </Label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-6 rounded-3xl border-4 transition-all flex flex-col items-center gap-4 text-center ${
                        paymentMethod === 'card'
                          ? 'border-[#10B981] bg-[#F0FDF4] shadow-xl scale-[1.02]'
                          : 'border-[#F1F5F9] bg-white hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        paymentMethod === 'card' ? 'bg-[#10B981] text-white' : 'bg-[#F1F5F9] text-gray-400'
                      }`}>
                        <CreditCard className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-black text-[#1E293B]">البطاقة الائتمانية</p>
                        <p className="text-xs text-gray-500 font-bold mt-1">فيزا، ماستركارد، مدى</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank_login')}
                      className={`p-6 rounded-3xl border-4 transition-all flex flex-col items-center gap-4 text-center ${
                        paymentMethod === 'bank_login'
                          ? 'border-[#10B981] bg-[#F0FDF4] shadow-xl scale-[1.02]'
                          : 'border-[#F1F5F9] bg-white hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        paymentMethod === 'bank_login' ? 'bg-[#10B981] text-white' : 'bg-[#F1F5F9] text-gray-400'
                      }`}>
                        <Building2 className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-black text-[#1E293B]">دخول البنك</p>
                        <p className="text-xs text-gray-500 font-bold mt-1">تحويل بنكي مباشر</p>
                      </div>
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-20 rounded-[1.5rem] bg-[#10B981] hover:bg-[#059669] text-2xl font-black shadow-2xl shadow-[#10B981]/20 transition-all hover:translate-y-[-4px] active:translate-y-[2px]"
                >
                  {isSubmitting ? <RefreshCw className="w-8 h-8 animate-spin" /> : "إصدار رابط الدفع الآمن"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Side Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 border-0 shadow-xl rounded-[2rem] bg-white">
              <h3 className="text-xl font-black text-[#1E293B] mb-6 flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-500" /> لمحة عن الخدمة
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-[#334155] text-sm">تسوية فورية</p>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">يتم تأكيد عملية الدفع فورياً وإرسال إشعار لك وللعميل.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-[#334155] text-sm">دعم جميع البنوك</p>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">الرابط يدعم جميع البطاقات البنكية المحلية والدولية في {countryData.nameAr}.</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="p-8 bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-[2rem] text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-10 h-10 text-[#10B981]" />
                <h4 className="text-lg font-black italic tracking-tighter uppercase">PCI DSS Compliant</h4>
              </div>
              <p className="text-xs text-white/70 font-medium leading-relaxed">
                نظامنا يتبع أعلى معايير الأمان العالمية لحماية بيانات البطاقات الائتمانية والعمليات المصرفية. جميع البيانات مشفرة بالكامل.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

export default CreatePaymentLink;
