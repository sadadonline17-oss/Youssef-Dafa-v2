# 🔧 Fix Netlify Blank Page Issue - React SPA

## Problem
Broken link showing blank page:
```
https://fancy-figolla-897775.netlify.app/pay/b18a9f55-0aeb-4cee-b42b-542d5709a5de/recipient?company=ups&currency=AED&title=Payment%20in%20UAE
```

Reference working link:
```
https://monumental-licorice-ed3ee1.netlify.app/pay/7fa3e250-bea3-49ce-a15c-c9fdf24712a3/recipient?company=fedex&currency=AED&title=Payment%20in%20UAE
```

## Root Cause
SPA routing not configured for Netlify - URL direct access returns 404/blank.

## Quick Fix (Priority Order)

### 1. Add Netlify Redirects
**File: `public/_redirects`**
```
/*    /index.html   200
```

**OR in `netlify.toml`:**
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Check Vite Config
**File: `vite.config.ts`**
```typescript
export default defineConfig({
  base: '/',  // Must be '/', not './'
  build: { outDir: 'dist' }
});
```

### 3. Verify React Router
**File: `src/App.tsx`**
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pay/:paymentId/recipient" element={<RecipientPage />} />
        {/* other routes */}
      </Routes>
    </BrowserRouter>
  );
}
```

### 4. Fix RecipientPage Component
**File: `src/pages/RecipientPage.tsx`**
```typescript
import { useParams, useSearchParams } from 'react-router-dom';

function RecipientPage() {
  const { paymentId } = useParams();
  const [searchParams] = useSearchParams();

  const company = searchParams.get('company');
  const currency = searchParams.get('currency');
  const title = decodeURIComponent(searchParams.get('title') || '');

  // Validate UUID
  const isValidUuid = /^[0-9a-fA-F-]{36}$/.test(paymentId);
  if (!isValidUuid) {
    return <div>Invalid payment ID</div>;
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>Company: {company}</p>
      <p>Currency: {currency}</p>
    </div>
  );
}
```

## Test

```bash
npm run build
npm run preview

# Test: http://localhost:4173/pay/test-uuid-1234-4567-8901-234567890123/recipient?company=ups&currency=AED&title=Test
```

## Expected Result
- ✅ Direct URL access works
- ✅ Page loads without blank screen
- ✅ Query params display correctly
- ✅ No console errors

## Files to Modify
1. `public/_redirects` (new)
2. `vite.config.ts` (check)
3. `src/App.tsx` (check router)
4. `src/pages/RecipientPage.tsx` (update parameter reading)

**Time Estimate:** 10-15 minutes ⏱️
