import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyCode, getCurrencySymbol } from "@/lib/countryCurrencies";
import { getBanksByCountry } from "@/lib/banks";
import { useChalets, useCreateLink } from "@/hooks/useSupabase";
import {
  ArrowRight,
  Home,
  Copy,
  Check,
  Building2,
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Star,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

const CreateChaletLink = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const countryData = getCountryByCode(country?.toUpperCase() || "SA");
  
  const { data: chalets, isLoading } = useChalets(country);
  const createLink = useCreateLink();
  
  const [selectedChaletId, setSelectedChaletId] = useState<string>("");
  const [pricePerNight, setPricePerNight] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [linkId, setLinkId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const selectedChalet = chalets?.find((c) => c.id === selectedChaletId);
  const totalAmount = pricePerNight * nights;
  const banks = useMemo(() => getBanksByCountry(country?.toUpperCase() || "SA"), [country]);
  
  useEffect(() => {
    if (selectedChalet) {
      setPricePerNight(selectedChalet.default_price);
    }
  }, [selectedChalet]);
  
  const handleCreate = async () => {
    if (!selectedChalet || !countryData) return;
    setIsSubmitting(true);
    try {
      const link = await createLink.mutateAsync({
        type: "chalet",
        country_code: country || "SA",
        provider_id: selectedChalet.provider_id || undefined,
        payload: {
          chalet_id: selectedChalet.id,
          chalet_name: selectedChalet.name,
          price_per_night: pricePerNight,
          nights,
          guest_count: guestCount,
          total_amount: totalAmount,
          currency: countryData.currency,
          currency_code: getCurrencyCode(country || "SA"),
          selected_bank: selectedBank || null,
        },
      });

      const micrositeUrl = `${window.location.origin}/r/${country || 'SA'}/chalet/${link.id}`;
      setCreatedLink(micrositeUrl);
      setLinkId(link.id);
      toast({ title: "تم إنشاء رابط الحجز" });
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!countryData) return null;

  if (createdLink) {
    return (
      <div className="min-h-screen bg-[#F0FDF4] py-12 px-4" dir="rtl">
        <Card className="max-w-xl mx-auto overflow-hidden border-0 shadow-2xl rounded-[2.5rem] bg-white text-center">
          <div className="bg-[#16A34A] p-12 text-center relative">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white/30 backdrop-blur-md">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">تم تجهيز طلب الحجز</h2>
            <p className="text-white/80 text-lg">شارك الرابط مع العميل لإتمام الدفع وتأكيد الحجز</p>
          </div>

          <div className="p-10 space-y-8">
            <div className="bg-[#F9FAFB] p-6 rounded-2xl border-2 border-dashed border-gray-200 text-right">
              <div className="flex items-center justify-between mb-4 border-b pb-4">
                <span className="font-black text-[#16A34A]">{selectedChalet?.name}</span>
                <span className="text-sm font-bold text-gray-400">اسم الشاليه</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 font-bold mb-1">المدة</p>
                  <p className="font-black">{nights} ليالي</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold mb-1">المبلغ الإجمالي</p>
                  <p className="font-black text-[#16A34A] text-lg">{formatCurrency(totalAmount, getCurrencyCode(country || "SA"))}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#F1F5F9] p-4 rounded-xl break-all text-xs font-mono text-gray-500 border">
              {createdLink}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(createdLink);
                  toast({ title: "تم نسخ الرابط" });
                }}
                className="h-16 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] text-xl font-bold"
              >
                <Copy className="w-6 h-6 ml-3" /> نسخ الرابط
              </Button>
              <Button
                onClick={() => window.open(createdLink, '_blank')}
                variant="outline"
                className="h-16 rounded-2xl border-2 border-[#16A34A] text-[#16A34A] text-xl font-bold hover:bg-[#F0FDF4]"
              >
                <ExternalLink className="w-6 h-6 ml-3" /> معاينة
              </Button>
            </div>

            <Button onClick={() => navigate('/services')} variant="ghost" className="w-full text-gray-400 font-bold">
              إنشاء رابط حجز جديد
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0FDF4]/30 pb-24" dir="rtl">
      {/* Premium Header */}
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-2xl font-black text-[#064E3B] tracking-tight">بوابة إدارة حجوزات الشاليهات</h1>
              <p className="text-xs text-[#16A34A] font-bold uppercase tracking-[0.2em]">{countryData.nameAr}</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#F0FDF4] text-[#16A34A] rounded-xl text-xs font-black border border-[#DCFCE7]">
              <ShieldCheck className="w-4 h-4" /> حجز مؤكد وموثق
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-10 border-0 shadow-2xl rounded-[3rem] bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#16A34A] to-transparent opacity-50" />

              <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }} className="space-y-10">
                {/* Chalet Choice */}
                <div className="space-y-6">
                  <Label className="text-xl font-black text-[#064E3B] flex items-center gap-3">
                    <Home className="w-6 h-6 text-[#16A34A]" /> اختر الشاليه المتاح
                  </Label>
                  <Select onValueChange={setSelectedChaletId} value={selectedChaletId}>
                    <SelectTrigger className="h-16 border-2 rounded-2xl text-lg font-bold border-gray-100 focus:border-[#16A34A] bg-[#F9FAFB]">
                      <SelectValue placeholder={isLoading ? "جاري تحميل الشاليهات..." : "قائمة الشاليهات المتاحة"} />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-2">
                      {chalets?.map((chalet) => (
                        <SelectItem key={chalet.id} value={chalet.id} className="h-14">
                          <div className="flex items-center justify-between w-full gap-2">
                            <span className="font-bold">{chalet.name}</span>
                            {chalet.verified && <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-black">Verified</span>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedChalet && (
                    <div className="p-6 rounded-[2rem] bg-[#F0FDF4] border-2 border-[#DCFCE7] flex items-start gap-5">
                      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md shrink-0 border border-emerald-50">
                        <MapPin className="w-10 h-10 text-[#16A34A]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-[#064E3B] mb-1">{selectedChalet.name}</h3>
                        <p className="text-sm text-gray-500 font-bold mb-3">{selectedChalet.city} - {selectedChalet.address}</p>
                        <div className="flex gap-2">
                          <span className="bg-white/60 px-3 py-1 rounded-full text-[10px] font-black text-[#16A34A] border border-[#DCFCE7]">يتسع لـ {selectedChalet.capacity} ضيف</span>
                          <div className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-current" /><span className="text-[10px] font-black">4.9</span></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {selectedChalet && (
                  <>
                    <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t-2 border-dashed border-gray-100">
                      <div className="space-y-4">
                        <Label className="text-sm font-black text-gray-400 uppercase tracking-widest">سعر الليلة الواحدة</Label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={pricePerNight}
                            onChange={(e) => setPricePerNight(Number(e.target.value))}
                            className="h-14 border-2 rounded-2xl text-xl font-black pr-12 bg-gray-50"
                          />
                          <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-sm font-black text-gray-400 uppercase tracking-widest">عدد الليالي</Label>
                        <div className="relative">
                          <Input
                            type="number"
                            min="1"
                            value={nights}
                            onChange={(e) => setNights(Number(e.target.value))}
                            className="h-14 border-2 rounded-2xl text-xl font-black pr-12 bg-gray-50"
                          />
                          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-sm font-black text-gray-400 uppercase tracking-widest">عدد الضيوف</Label>
                        <div className="relative">
                          <Input
                            type="number"
                            min="1"
                            value={guestCount}
                            onChange={(e) => setGuestCount(Number(e.target.value))}
                            className="h-14 border-2 rounded-2xl text-xl font-black pr-12 bg-gray-50"
                          />
                          <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-sm font-black text-gray-400 uppercase tracking-widest">تحديد البنك (اختياري)</Label>
                        <Select value={selectedBank} onValueChange={setSelectedBank}>
                          <SelectTrigger className="h-14 border-2 rounded-2xl font-bold bg-gray-50">
                            <SelectValue placeholder="تلقائي" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="skip">اختيار العميل</SelectItem>
                            {banks.map(b => <SelectItem key={b.id} value={b.id}>{b.nameAr}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="bg-[#064E3B] p-8 rounded-[2rem] text-white flex items-center justify-between shadow-xl shadow-emerald-900/20">
                      <div>
                        <p className="text-xs font-black opacity-60 uppercase tracking-tighter mb-1">المبلغ الإجمالي للحجز</p>
                        <p className="text-4xl font-black">{formatCurrency(totalAmount, getCurrencyCode(country || "SA"))}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold opacity-60">شامل الضرائب والرسوم</p>
                        <div className="flex gap-1 mt-1 justify-end grayscale opacity-50">
                          <img src="/visa-logo.png" className="h-3" />
                          <img src="/mastercard-logo.png" className="h-3" />
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleCreate}
                      disabled={isSubmitting}
                      className="w-full h-20 rounded-[1.5rem] bg-[#16A34A] hover:bg-[#15803D] text-2xl font-black shadow-2xl transition-all hover:translate-y-[-4px]"
                    >
                      {isSubmitting ? <CheckCircle className="w-8 h-8 animate-spin" /> : "إصدار رابط حجز الشاليه"}
                    </Button>
                  </>
                )}
              </form>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="p-8 border-0 shadow-xl rounded-[2.5rem] bg-white">
              <h3 className="text-xl font-black text-[#064E3B] mb-6 flex items-center gap-3">
                <Info className="w-6 h-6 text-emerald-500" /> دليل الاستخدام
              </h3>
              <div className="space-y-6 text-sm text-gray-500 font-bold">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">1</div>
                  <p>اختر الشاليه من القائمة الموثقة لدينا.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">2</div>
                  <p>حدد السعر المتفق عليه ومدة الإقامة.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">3</div>
                  <p>أرسل الرابط للعميل وسيصلك إشعار فور السداد.</p>
                </div>
              </div>
            </Card>

            <div className="p-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
               <ShieldCheck className="w-20 h-20 absolute -bottom-6 -left-6 opacity-10" />
               <h4 className="text-xl font-black mb-3">حماية الحجوزات</h4>
               <p className="text-xs opacity-80 leading-relaxed font-bold">
                 جميع العمليات المالية تتم عبر بوابات دفع آمنة ومشفرة. نضمن حقوق المؤجر والمستأجر عبر نظام توثيق ذكي.
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

export default CreateChaletLink;
