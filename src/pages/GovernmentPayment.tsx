import { useState } from 'react';
import { DynamicIdentityProvider, DynamicIdentityWrapper } from '@/components/DynamicIdentityProvider';
import { DynamicIdentityTopBar } from '@/components/DynamicIdentityTopBar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Shield, FileText, CreditCard, CheckCircle2, AlertCircle, Lock, Clock } from 'lucide-react';

const GovernmentPayment = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    nationalId: '',
    referenceNumber: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.serviceType) newErrors.serviceType = 'اختر نوع الخدمة';
    if (!formData.nationalId) newErrors.nationalId = 'رقم الهوية مطلوب';
    if (formData.nationalId && formData.nationalId.length !== 10) newErrors.nationalId = 'يجب أن يكون رقم الهوية 10 أرقام';
    if (!formData.referenceNumber) newErrors.referenceNumber = 'الرقم المرجعي مطلوب';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('بيانات النموذج:', formData);
    }
  };

  return (
    <DynamicIdentityProvider entityKey="government_payment">
      <div className="min-h-screen dynamic-bg">
        <DynamicIdentityTopBar 
          entityKey="government_payment" 
          title="بوابة الدفع الحكومي" 
          showLogo={true}
        />
        
        <div className="container mx-auto px-4 py-8">
          <DynamicIdentityWrapper
            entityKey="government_payment"
            showLogo={false}
            showAnimatedHeader={true}
            variant="card"
            className="max-w-3xl mx-auto"
          >
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Shield className="w-16 h-16 mx-auto dynamic-primary-text mb-4" />
                <h1 className="text-3xl font-bold dynamic-primary-text mb-2">
                  سداد الرسوم الحكومية
                </h1>
                <p className="text-gray-600 dynamic-font-primary">
                  سداد سريع وآمن للخدمات الحكومية
                </p>
              </div>

              <Card className="p-6 space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="service-type" className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4" />
                      نوع الخدمة *
                    </Label>
                    <Select value={formData.serviceType} onValueChange={(value) => setFormData({...formData, serviceType: value})}>
                      <SelectTrigger className={`mt-2 ${errors.serviceType ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="اختر الخدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passport">تجديد جواز السفر</SelectItem>
                        <SelectItem value="id">بطاقة الهوية الوطنية</SelectItem>
                        <SelectItem value="license">رخصة القيادة</SelectItem>
                        <SelectItem value="visa">تأشيرة زيارة</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.serviceType && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.serviceType}</p>}
                  </div>

                  <div>
                    <Label htmlFor="national-id" className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4" />
                      رقم الهوية الوطنية *
                    </Label>
                    <Input 
                      id="national-id" 
                      placeholder="1234567890"
                      maxLength={10}
                      value={formData.nationalId}
                      onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                      className={`mt-2 ${errors.nationalId ? 'border-red-500' : ''}`}
                    />
                    {errors.nationalId && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.nationalId}</p>}
                  </div>

                  <div>
                    <Label htmlFor="reference-number" className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4" />
                      الرقم المرجعي *
                    </Label>
                    <Input 
                      id="reference-number" 
                      placeholder="REF-2024-XXXXX"
                      value={formData.referenceNumber}
                      onChange={(e) => setFormData({...formData, referenceNumber: e.target.value})}
                      className={`mt-2 ${errors.referenceNumber ? 'border-red-500' : ''}`}
                    />
                    {errors.referenceNumber && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.referenceNumber}</p>}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-900 mb-1">معلومات السداد</h4>
                        <div className="space-y-1 text-sm text-blue-800">
                          <div className="flex justify-between">
                            <span>رسوم الخدمة:</span>
                            <span className="font-semibold">300 ر.س</span>
                          </div>
                          <div className="flex justify-between">
                            <span>رسوم إدارية:</span>
                            <span className="font-semibold">50 ر.س</span>
                          </div>
                          <div className="flex justify-between border-t border-blue-300 pt-1 mt-2">
                            <span className="font-bold">المجموع:</span>
                            <span className="font-bold text-lg">350 ر.س</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold"
                  >
                    <Lock className="w-5 h-5" />
                    متابعة إلى الدفع الآمن
                  </Button>
                </form>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 border-l-4 border-l-green-500 bg-green-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-900">أمان عالي</h4>
                      <p className="text-sm text-green-700">تشفير عالمي للبيانات</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-900">معالجة فورية</h4>
                      <p className="text-sm text-blue-700">تأكيد في لحظة</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-l-4 border-l-purple-500 bg-purple-50">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-purple-600" />
                    <div>
                      <h4 className="font-semibold text-purple-900">إيصالات رسمية</h4>
                      <p className="text-sm text-purple-700">قابلة للطباعة</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </DynamicIdentityWrapper>
        </div>
      </div>
    </DynamicIdentityProvider>
  );
};

export default GovernmentPayment;
