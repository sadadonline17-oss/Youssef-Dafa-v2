# 🚨 URGENT: إصلاح صفحة دفع فارغة على Netlify

## الرابط المعطل
```
https://fancy-figolla-897775.netlify.app/pay/b18a9f55-0aeb-4cee-b42b-542d5709a5de/recipient?company=ups&currency=AED&title=Payment%20in%20UAE
```

## المطلوب
إصلاح بأقل تغييرات ليصبح مطابقاً للرابط المرجعي الذي يعمل:
```
https://monumental-licorice-ed3ee1.netlify.app/pay/7fa3e250-bea3-49ce-a15c-c9fdf24712a3/recipient?company=fedex&currency=AED&title=Payment%20in%20UAE
```

## ✅ الحلول السريعة (كل سطر = خطوة)

1. **إضافة SPA redirect في `public/_redirects`:**
   ```
   /*    /index.html   200
   ```

2. **فحص `vite.config.ts`:**
   ```typescript
   base: '/',  // تأكد من '/'
   build: { outDir: 'dist' }
   ```

3. **فحص React Router في `src/App.tsx`:**
   ```typescript
   <BrowserRouter>
     <Routes>
       <Route path="/pay/:paymentId/recipient" element={<RecipientPage />} />
       {/* ... باقي المسارات */}
     </Routes>
   </BrowserRouter>
   ```

4. **إصلاح RecipientPage لقراءة البيانات:**
   ```typescript
   import { useParams, useSearchParams } from 'react-router-dom';

   function RecipientPage() {
     const { paymentId } = useParams();
     const [searchParams] = useSearchParams();
     const company = searchParams.get('company');
     const currency = searchParams.get('currency');
     const title = decodeURIComponent(searchParams.get('title') || '');

     // التحقق من UUID
     if (!/^[0-9a-fA-F-]{36}$/.test(paymentId)) {
       return <div>خطأ في معرف الدفع</div>;
     }

     return <div>{title} - {company} - {currency}</div>;
   }
   ```

## 🧪 اختبار سريع

```bash
npm run build
npm run preview
# افتح: http://localhost:4173/pay/test-uuid-1234-4567-8901-234567890123/recipient?company=ups&currency=AED&title=Test
```

## ✅ النتيجة المطلوبة

- [ ] الرابط يفتح صفحةRecipient بنجاح
- [ ] البيانات تظهر (title, company, currency)
- [ ] لا أخطاء في Console

---

**Time Estimate:** 10-15 min ⏱️
