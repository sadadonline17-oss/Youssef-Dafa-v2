# 🤖 Copy-Paste Prompt for AI Assistant

## Copy everything below and paste into ChatGPT/Claude/Gemini:

---

**You are an expert React/Netlify developer. Please fix the following Netlify SPA routing issue:**

**PROBLEM:**
The link `https://fancy-figolla-897775.netlify.app/pay/b18a9f55-0aeb-4cee-b42b-542d-ddda/recipient?company=ups&currency=AED&title=Payment%20in%20UAE` shows a blank page.

**REFERENCE:**
The working link `https://monumental-licorice-ed3ee1.netlify.app/pay/7fa3e250-bea3-49ce-a15c-c9fdf24712a3/recipient?company=fedex&currency=AED&title=Payment%20in%20UAE` works correctly.

**REQUIRED FIXES (implement all):**

1. **Add Netlify redirect:**
   Create `public/_redirects` file with:
   ```
   /*    /index.html   200
   ```

2. **Fix Vite config:**
   In `vite.config.ts`, ensure:
   ```typescript
   export default defineConfig({
     base: '/',  // Must be '/', not './'
     build: { outDir: 'dist' }
   });
   ```

3. **Verify React Router:**
   In `src/App.tsx`, ensure BrowserRouter with proper routes:
   ```typescript
   <BrowserRouter>
     <Routes>
       <Route path="/pay/:paymentId/recipient" element={<RecipientPage />} />
       {/* other routes */}
     </Routes>
   </BrowserRouter>
   ```

4. **Fix RecipientPage component:**
   In `src/pages/RecipientPage.tsx`:
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

**TEST:**
```bash
npm run build
npm run preview
# Test: http://localhost:4173/pay/test-uuid-1234-4567-8901-234567890123/recipient?company=ups&currency=AED&title=Test
```

**EXPECTED RESULT:**
- Direct URL access works without blank page
- Query params display correctly
- No console errors

Please implement these fixes and provide the exact code changes needed.

---

**END OF PROMPT**

## 🎯 Quick Usage:

1. **Select all text above** (from "You are an expert..." to "**END OF PROMPT**")
2. **Copy it** (Ctrl+C / Cmd+C)
3. **Paste into ChatGPT/Claude/Gemini**
4. **Add:** "Please implement all these fixes"
5. **Send!**

## 📝 Expected Response:

The AI will provide:
- ✅ Exact code changes
- ✅ File modifications
- ✅ Step-by-step instructions
- ✅ Testing commands

## 🚀 Time to Fix: 10-15 minutes with AI assistance!
