import { useState, useMemo } from "react";
import { Home, Package, FileText, Heart, Truck, Building2, CreditCard, Landmark, Zap, PhoneCall } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { Country, COUNTRIES } from "@/lib/countries";
import SEOHead from "@/components/SEOHead";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { getGovernmentServicesByCountry } from "@/lib/governmentPaymentServices";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  // Get government services for the selected country
  const governmentServices = useMemo(() => {
    if (!selectedCountry) return [];
    return getGovernmentServicesByCountry(selectedCountry.code);
  }, [selectedCountry]);

  const services = [
    {
      title: "Chalet Booking",
      titleAr: "حجز الشاليهات",
      description: "احجز شاليه أحلامك بأسعار مخصصة",
      icon: Home,
      href: selectedCountry ? `/create/${selectedCountry.code}/chalet` : "#",
      gradient: "var(--gradient-primary)",
    },
    {
      title: "Shipping Services",
      titleAr: "خدمات الشحن",
      description: "شحن سريع وآمن مع شركات محلية معتمدة",
      icon: Package,
      href: selectedCountry ? `/create/${selectedCountry.code}/shipping` : "#",
      gradient: "var(--gradient-success)",
    },
    {
      title: "Invoices",
      titleAr: "الفواتير",
      description: "إنشاء وإدارة الفواتير بسهولة",
      icon: FileText,
      href: selectedCountry ? `/invoices/create/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, hsl(210 95% 50%), hsl(220 90% 60%))",
      sublinks: [
        {
          title: "إنشاء فاتورة جديدة",
          href: selectedCountry ? `/invoices/create/${selectedCountry.code}` : "#",
        },
        {
          title: "عرض جميع الفواتير",
          href: selectedCountry ? `/invoices/list/${selectedCountry.code}` : "#",
        },
      ],
    },
    {
      title: "Health Services",
      titleAr: "الخدمات الصحية",
      description: "خدمات طبية وصحية معتمدة",
      icon: Heart,
      href: selectedCountry ? `/health/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, hsl(0 85% 55%), hsl(10 80% 60%))",
      sublinks: [
        {
          title: "إنشاء رابط دفع صحي",
          href: selectedCountry ? `/create/${selectedCountry.code}/health-payment` : "#",
        },
        {
          title: "عرض الخدمات الصحية",
          href: selectedCountry ? `/health/${selectedCountry.code}` : "#",
        },
      ],
    },
    {
      title: "Logistics",
      titleAr: "الخدمات اللوجستية",
      description: "حلول لوجستية متكاملة",
      icon: Truck,
      href: selectedCountry ? `/logistics/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, hsl(260 95% 55%), hsl(280 90% 60%))",
      sublinks: [
        {
          title: "إنشاء رابط دفع لوجستي",
          href: selectedCountry ? `/create/${selectedCountry.code}/logistics-payment` : "#",
        },
        {
          title: "عرض خدمات اللوجستية",
          href: selectedCountry ? `/logistics/${selectedCountry.code}` : "#",
        },
      ],
    },
    {
      title: "Contracts",
      titleAr: "العقود",
      description: "إدارة وتوثيق العقود الإلكترونية",
      icon: Building2,
      href: selectedCountry ? `/contracts/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, hsl(40 95% 55%), hsl(30 90% 50%))",
      sublinks: [
        {
          title: "إنشاء رابط دفع عقد",
          href: selectedCountry ? `/create/${selectedCountry.code}/contract-payment` : "#",
        },
        {
          title: "عرض العقود",
          href: selectedCountry ? `/contracts/${selectedCountry.code}` : "#",
        },
      ],
    },
    {
      title: "Payment Links",
      titleAr: "روابط الدفع",
      description: "إنشاء روابط دفع متغيرة وسريعة",
      icon: CreditCard,
      href: selectedCountry ? `/create/${selectedCountry.code}/payment` : "#",
      gradient: "linear-gradient(135deg, hsl(260 85% 55%), hsl(200 90% 60%))",
    },
    {
      title: "Utility Bills",
      titleAr: "فواتير الكهرباء والمياه",
      description: "سداد فواتير الخدمات العامة والكهرباء",
      icon: Zap,
      href: "#",
      gradient: "linear-gradient(135deg, #00C6FF, #0072FF)",
      isUtility: true,
    },
    {
      title: "Telecom Services",
      titleAr: "خدمات الاتصالات",
      description: "شحن رصيد وسداد فواتير الهاتف والإنترنت",
      icon: PhoneCall,
      href: "#",
      gradient: "linear-gradient(135deg, #FF0000, #4F008C)",
      isTelecom: true,
    },
  ];

  // Utility services mapping by country
  const countryUtilities = {
    SA: [
      { key: 'stc', nameAr: 'إس تي سي', icon: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/stc-logo.png' },
      { key: 'mobily', nameAr: 'موبايلي', icon: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/mobily-logo.png' },
      { key: 'zain', nameAr: 'زين', icon: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/zain-logo.png' },
    ],
    AE: [
      { key: 'dewa', nameAr: 'ديوا', icon: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/dewa-logo.png' },
      { key: 'addc', nameAr: 'شركة أبوظبي للتوزيع', icon: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/addc-logo.png' },
      { key: 'etisalat', nameAr: 'اتصالات', icon: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/etisalat-logo.png' },
    ],
    QA: [
      { key: 'kahramaa', nameAr: 'كهرماء', icon: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/kahramaa-logo.png' },
      { key: 'ooredoo', nameAr: 'أوريدو', icon: 'https://vmsmjmzhclqshrtidmsh.supabase.co/storage/v1/object/public/logos/ooredoo-logo.png' },
    ]
  };

  // Add government payment services dynamically based on selected country
  const allServices = useMemo(() => {
    let baseServices = [...services];
    
    if (selectedCountry) {
       // Filter utility/telecom placeholders and replace with real ones or remove if not applicable
       baseServices = baseServices.filter(s => !s.isUtility && !s.isTelecom);

       const utilities = countryUtilities[selectedCountry.code as keyof typeof countryUtilities] || [];
       utilities.forEach(util => {
          baseServices.push({
            title: util.key.toUpperCase(),
            titleAr: util.nameAr,
            description: `سداد فواتير ${util.nameAr} الرسمية`,
            icon: Landmark,
            href: `/local-payment?service=${util.key}&country=${selectedCountry.code}`,
            gradient: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
            isUtility: true,
            customIcon: util.icon
          });
       });
    }

    // Add government services as separate cards
    if (governmentServices.length > 0) {
      governmentServices.forEach(govService => {
        baseServices.push({
          title: govService.name,
          titleAr: govService.nameAr,
          description: govService.description,
          icon: Landmark,
          href: selectedCountry ? `/create/${selectedCountry.code}/government/${govService.key}` : "#",
          gradient: "linear-gradient(135deg, #F58220, #E67317)",
          isGovernment: true,
        });
      });
    }
    
    return baseServices;
  }, [services, governmentServices, selectedCountry]);

  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES.find((c) => c.code === countryCode);
    setSelectedCountry(country);
  };

  return (
    <>
      <SEOHead 
        title="خدمات الشحن في دول الخليج"
        description="اختر شركة الشحن المفضلة لديك من بين جميع شركات الشحن الكبرى في دول الخليج: أرامكس، دي إتش إل، فيديكس، يو بي إس، سمسا، زاجل، ناقل، والبريد الوطني"
        image="/og-aramex.jpg"
        type="website"
      />
      <div className="min-h-screen py-6 bg-gradient-to-br from-background via-background to-muted/20" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-4">
          <BackButton />
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            اختر خدمتك
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            ابدأ بتحديد الدولة، ثم اختر الخدمة المناسبة
          </p>
        </div>

        <div className="mb-12">
          <div className="max-w-lg mx-auto">
            <label className="block text-xl font-bold mb-4 text-center text-gray-900">
              اختر الدولة
            </label>
            <Select onValueChange={handleCountryChange}>
              <SelectTrigger className="w-full h-16 text-lg bg-white backdrop-blur-sm border-2 border-gray-300 hover:border-blue-500 focus:border-blue-600 transition-all shadow-xl rounded-2xl">
                <SelectValue placeholder="اختر دولة..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {COUNTRIES.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={country.code}
                    className="text-base py-3 cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div className="text-right">
                        <div className="font-bold text-base">{country.nameAr}</div>
                        <div className="text-sm text-muted-foreground">
                          {country.name}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedCountry ? (
          <div className="animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">
              الخدمات المتاحة في {selectedCountry.nameAr}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {allServices.map((service, index) => (
                <ServiceCard key={`${service.title}-${index}`} {...service} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse shadow-2xl">
              <Package className="w-10 h-10 text-primary-foreground" />
            </div>
            <p className="text-base text-muted-foreground">
              الرجاء اختيار دولة لعرض الخدمات المتاحة
            </p>
          </div>
        )}
      </div>
      <div className="h-20" />
    </div>
    <BottomNav />
    </>
  );
};

export default Services;
