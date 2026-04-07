# 🚀 دليل الاستخدام السريع - نظام الثيمات

## 📖 مثال عملي: تطبيق الثيم على صفحة موجودة

### قبل (الصفحة الأصلية):

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PaymentDetails = () => {
  return (
    <div>
      <h1>تفاصيل الدفع</h1>
      <Card>
        <Button style={{ backgroundColor: '#D22128' }}>
          الدفع الآن
        </Button>
      </Card>
    </div>
  );
};
```

### بعد (مع نظام الثيمات):

```tsx
import { useTheme } from "@/themes/ThemeContext";
import { PaymentHeader, PaymentCard, PaymentButton } from "@/components/payment";
import "@/themes/themeStyles.css";

const PaymentDetailsTheme = () => {
  const { theme } = useTheme();

  if (!theme) return <div className="spinner" />;

  return (
    <div style={{ backgroundColor: theme.colors.background }}>
      <PaymentHeader
        title="تفاصيل الدفع"
        subtitle="خدمة آمنة"
        showBackButton={true}
      />

      <PaymentCard title="معلومات الدفعة">
        <PaymentButton variant="primary" size="lg" fullWidth>
          الدفع الآن
        </PaymentButton>
      </PaymentCard>
    </div>
  );
};
```

---

## 🎯 خطوات التطبيق السريع

### الخطوة 1: استيراد النظام
```tsx
import { useTheme } from "@/themes/ThemeContext";
import { PaymentHeader, PaymentCard, PaymentButton } from "@/components/payment";
import "@/themes/themeStyles.css";
```

### الخطوة 2: استخدام useTheme Hook
```tsx
const { theme } = useTheme();

if (!theme) {
  return <div className="spinner" />;
}
```

### الخطوة 3: تطبيق المكونات
```tsx
<PaymentHeader title="العنوان" subtitle="الوصف" />
<PaymentCard title="عنوان البطاقة">المحتوى</PaymentCard>
<PaymentButton variant="primary">النص</PaymentButton>
```

### الخطوة 4: استخدام متغيرات الثيم (إذا لزم الأمر)
```tsx
<div style={{
  backgroundColor: theme.colors.primary,
  color: theme.colors.text,
  fontFamily: theme.fonts.family,
  padding: theme.spacing.lg,
}}>
  محتوى
</div>
```

---

## 🎨 أمثلة أكثر تقدماً

### مثال 1: صفحة كاملة مع جميع المكونات

```tsx
import React from 'react';
import { useTheme } from "@/themes/ThemeContext";
import {
  PaymentHeader,
  PaymentCard,
  PaymentButton,
  PaymentFormField,
  PaymentProgress
} from "@/components/payment";
import "@/themes/themeStyles.css";

const CompletePaymentPage = () => {
  const { theme } = useTheme();

  const steps = [
    { id: '1', label: 'الخطوة 1', description: 'التفاصيل' },
    { id: '2', label: 'الخطوة 2', description: 'المعلومات' },
    { id: '3', label: 'الخطوة 3', description: 'الدفع' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
    }}>
      <PaymentHeader
        title="عنوان الصفحة"
        subtitle="وصف الصفحة"
        showBackButton={true}
      />

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        {/* Progress */}
        <PaymentProgress
          steps={steps}
          currentStepIndex={1}
        />

        {/* Card */}
        <PaymentCard
          title="عنوان البطاقة"
          subtitle="وصف البطاقة"
          headerAction={<Button>إجراء</Button>}
        >
          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <PaymentFormField
              label="الاسم"
              type="text"
              placeholder="أدخل اسمك"
              leftIcon={<User size={20} />}
            />

            <PaymentFormField
              label="البريد الإلكتروني"
              type="email"
              placeholder="example@email.com"
              error="بريد إلكتروني غير صحيح"
              variant="outlined"
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <PaymentButton variant="secondary" size="md">
              إلغاء
            </PaymentButton>
            <PaymentButton variant="primary" size="md" fullWidth>
              متابعة
            </PaymentButton>
          </div>
        </PaymentCard>
      </div>
    </div>
  );
};
```

### مثال 2: تخصيص متقدم

```tsx
const CustomSection = () => {
  const { theme } = useTheme();

  const customStyles = {
    section: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.xl,
      boxShadow: theme.style.shadow === 'light'
        ? '0 2px 8px rgba(0,0,0,0.08)'
        : 'none',
      border: `1px solid ${theme.colors.border}`,
    },
    title: {
      color: theme.colors.primary,
      fontSize: theme.fonts.sizes.xl,
      fontWeight: theme.fonts.weights.bold,
      marginBottom: theme.spacing.md,
    },
    content: {
      color: theme.colors.text,
      fontSize: theme.fonts.sizes.base,
      lineHeight: 1.6,
    },
  };

  return (
    <section style={customStyles.section}>
      <h2 style={customStyles.title}>عنوان مخصص</h2>
      <p style={customStyles.content}>محتوى مخصص</p>
    </section>
  );
};
```

### مثال 3: تصميم متجاوب

```tsx
const ResponsiveComponent = () => {
  const { theme } = useTheme();

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: theme.spacing.lg,
      padding: theme.spacing.md,
    },
    card: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>بطاقة 1</div>
      <div style={styles.card}>بطاقة 2</div>
    </div>
  );
};
```

---

## 🔧 تخصيص الثيم ديناميكياً

### تغيير الثيم عند حدث

```tsx
const CompanySelector = () => {
  const { setTheme } = useTheme();

  const companies = [
    { id: 'aramex', name: 'Aramex' },
    { id: 'dhl', name: 'DHL' },
    { id: 'fedex', name: 'FedEx' },
  ];

  return (
    <div>
      {companies.map(company => (
        <button
          key={company.id}
          onClick={() => setTheme(company.id)}
          style={{
            padding: '12px 24px',
            margin: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          {company.name}
        </button>
      ))}
    </div>
  );
};
```

---

## 📱 مثال متكامل: صفحة دفع كاملة

```tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from "@/themes/ThemeContext";
import {
  PaymentHeader,
  PaymentCard,
  PaymentButton,
  PaymentFormField,
  PaymentProgress
} from "@/components/payment";
import "@/themes/themeStyles.css";

const FullPaymentPage = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const [step, setStep] = useState(1);

  const steps = [
    { id: '1', label: 'التفاصيل' },
    { id: '2', label: 'المعلومات' },
    { id: '3', label: 'الدفع' },
  ];

  if (!theme) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="fade-in" style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    }}>
      <PaymentHeader
        title={`الدفع - الخطوة ${step}`}
        subtitle="خدمة آمنة ومحمية"
        showBackButton={step > 1}
      />

      <div style={{
        maxWidth: '600px',
        margin: `${theme.spacing.lg} auto`,
      }}>
        <PaymentProgress
          steps={steps}
          currentStepIndex={step - 1}
        />

        <div style={{ marginTop: theme.spacing.lg }}>
          {step === 1 && (
            <PaymentCard title="الخطوة 1: التفاصيل">
              <p>محتوى الخطوة الأولى</p>
              <PaymentButton
                variant="primary"
                fullWidth
                onClick={() => setStep(2)}
              >
                التالي
              </PaymentButton>
            </PaymentCard>
          )}

          {step === 2 && (
            <PaymentCard title="الخطوة 2: المعلومات">
              <PaymentFormField
                label="الاسم الكامل"
                type="text"
                placeholder="أدخل اسمك"
              />
              <PaymentButton
                variant="primary"
                fullWidth
                onClick={() => setStep(3)}
              >
                التالي
              </PaymentButton>
            </PaymentCard>
          )}

          {step === 3 && (
            <PaymentCard title="الخطوة 3: الدفع">
              <p>محتوى الخطوة الأخيرة</p>
              <PaymentButton
                variant="primary"
                fullWidth
                onClick={() => alert('تم الدفع!')}
              >
                تأكيد الدفع
              </PaymentButton>
            </PaymentCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullPaymentPage;
```

---

## ✅ قائمة التحقق

قبل استخدام الثيم في صفحة جديدة، تأكد من:

- [ ] استيراد `useTheme` من `@/themes/ThemeContext`
- [ ] استيراد المكونات من `@/components/payment`
- [ ] استيراد `@/themes/themeStyles.css`
- [ ] استخدام `{ theme } = useTheme()`
- [ ] التحقق من وجود `theme` قبل الاستخدام
- [ ] استخدام مكونات الدفع بدلاً من ui المدمجة
- [ ] تطبيق متغيرات الثيم عند الحاجة
- [ ] اختبار التصميم على الأجهزة المختلفة

---

## 🎓 نصائح وحيل

### نصيحة 1: استخدام CSS Classes
```tsx
// بدلاً من inline styles
<div style={{ backgroundColor: 'red' }}>

// استخدم classes
<div className="payment-card">
```

### نصيحة 2: تجميع الأنماط
```tsx
const cardStyles = {
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
  },
  title: {
    color: theme.colors.primary,
  },
};
```

### نصيحة 3: استخدام الأيقونات من Lucide
```tsx
import { CreditCard, Lock, User } from 'lucide-react';

<PaymentFormField
  leftIcon={<CreditCard size={20} />}
  rightIcon={<Lock size={20} />}
/>
```

### نصيحة 4: تحسين الأداء
```tsx
// تجنب إعادة حسابات مكلفة في كل render
const memoizedStyles = React.useMemo(() => ({
  container: { /* styles */ },
}), [theme]);
```

---

## 🐛 أخطاء شائعة وحلولها

### الخطأ 1: "useTheme must be used within a ThemeProvider"
**الحل:**
```tsx
<ThemeProvider companyId="aramex">
  <YourComponent />
</ThemeProvider>
```

### الخطأ 2: الشعار لا يظهر
**الحل:**
- تحقق من وجود الملف في `public/logos/`
- تأكد من اسم الملف في `themeConfig.ts`

### الخطأ 3: الألوان لا تتغير
**الحل:**
```tsx
// تأكد من استيراد CSS
import "@/themes/themeStyles.css";
```

### الخطأ 4: TypeScript Errors
**الحل:**
```tsx
// استخدم type assertion إذا لزم الأمر
style={customStyles as React.CSSProperties}
```

---

## 📚 المزيد من الموارد

- 📖 [الوثائق الكاملة](./THEME-SYSTEM-DOCUMENTATION.md)
- 🎨 [أمثلة الثيمات](./src/themes/themeConfig.ts)
- 💻 [المكونات](./src/components/payment/)
- 🔧 [API Reference](./src/themes/ThemeContext.tsx)

---

**Happy Coding! 🎉**
