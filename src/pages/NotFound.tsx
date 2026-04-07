import { useNavigate } from "react-router-dom";
import { Home, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4" dir="rtl">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto shadow-inner border border-red-100">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>

        <div className="space-y-3">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter">404</h1>
          <p className="text-xl font-bold text-slate-600">عذراً، الصفحة غير موجودة</p>
          <p className="text-lg text-slate-500">Sorry, page not found</p>
          <p className="text-base text-slate-400">Oops! Page not found</p>
          <p className="text-sm text-slate-400">This page has been moved or deleted.</p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure Payment Gateway</span>
        </div>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg shadow-xl hover:translate-y-[-2px] transition-all active:scale-[0.98]"
        >
          <span>العودة للرئيسية</span>
          <Home className="w-5 h-5" />
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NotFound;
