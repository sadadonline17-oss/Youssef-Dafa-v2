import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Shield, Zap, Package, Truck, Heart, Home, Scale, CreditCard } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  const services = [
    { name: "شحن وتوصيل", icon: Truck, path: "/services/shipping", color: "bg-blue-500" },
    { name: "خدمات صحية", icon: Heart, path: "/services/health", color: "bg-rose-500" },
    { name: "عقود وتوثيق", icon: Scale, path: "/services/contracts", color: "bg-emerald-500" },
    { name: "لوجستيات", icon: Package, path: "/services/logistics", color: "bg-orange-500" },
    { name: "حجز شاليهات", icon: Home, path: "/services/chalet", color: "bg-teal-500" },
    { name: "دفع سريع", icon: CreditCard, path: "/services/payment", color: "bg-indigo-500" },
  ];

  return (
    <>
      <SEOHead 
        title="نظام الدفع الآمن - روابط دفع ذكية للشاليهات والشحن"
        description="أنشئ روابط دفع آمنة ومحمية للشاليهات وخدمات الشحن في دول الخليج. دعم جميع شركات الشحن الكبرى مثل أرامكس، دي إتش إل، فيديكس، سمسا والمزيد"
        image="/og-aramex.jpg"
        type="website"
      />
      <div className="min-h-screen bg-slate-50" dir="rtl">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-16 pb-12 border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-black text-blue-700 uppercase tracking-widest">المنصة الموحدة لدول الخليج</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 leading-tight">
                أصدر روابط الدفع <br />
                <span className="text-blue-600">بشكل رسمي 1:1</span>
              </h1>

              <p className="text-lg text-slate-500 mb-10 font-bold leading-relaxed">
                نظام متكامل لإنشاء روابط دفع رسمية تحاكي التصاميم الأصلية للبوابات الحكومية، شركات الشحن، والبنوك.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/services">
                  <Button size="lg" className="h-16 px-10 rounded-2xl font-black text-lg bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200">
                    ابدأ الآن
                    <ArrowLeft className="w-5 h-5 mr-3" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl font-black text-lg border-2">
                  عرض النماذج
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-slate-900 mb-4">خدماتنا المتاحة</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">اختر نوع الخدمة لإنشاء رابط دفع خاص بها</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              {services.map((service, idx) => (
                <Link key={idx} to={service.path} className="group">
                  <Card className="p-6 h-full border-2 border-white rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
                    <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-current/20`}>
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-black text-slate-800 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-20 -mr-48 -mt-48" />
          <div className="container mx-auto px-4 relative">
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black">أمان مطلق</h4>
                <p className="text-slate-400 text-sm font-bold leading-relaxed">تشفير كامل للبيانات وحماية ضد الاحتيال مع توافق تام لمعايير الأمان العالمية.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black">سرعة الإصدار</h4>
                <p className="text-slate-400 text-sm font-bold leading-relaxed">أصدر رابط دفع رسمي خلال أقل من 10 ثوانٍ وشاركه فوراً مع عميلك.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black">تصميم 1:1</h4>
                <p className="text-slate-400 text-sm font-bold leading-relaxed">واجهات دفع مطابقة تماماً للأصل تعزز من ثقة العميل وتزيد من معدلات الدفع.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="h-24" />
      </div>
      <BottomNav />
    </>
  );
};

export default Index;
