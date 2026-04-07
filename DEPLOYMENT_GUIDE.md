# 🚀 Netlify Deployment Guide

## Quick Deploy

### Option 1: Deploy via Netlify CLI (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy to production
netlify deploy --prod
```

### Option 2: Deploy via Git Integration

1. **Connect Repository:**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select the `paym` repository

2. **Configure Build Settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Set Environment Variables:**
   In Netlify Dashboard → Site Settings → Environment Variables, add:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy:**
   - Click "Deploy site"
   - Netlify will automatically build and deploy

### Option 3: Deploy via Netlify API

```bash
# Set your Netlify token and site ID
export NETLIFY_AUTH_TOKEN="your_personal_access_token"
export NETLIFY_SITE_ID="your_site_id"

# Run the deployment script
./deploy-netlify.sh
```

## 📋 Pre-Deployment Checklist

- ✅ GitHub repository created: `https://github.com/you3333ef/paym`
- ✅ All code committed and pushed
- ✅ Netlify configuration file: `netlify.toml` present
- ✅ Build command: `npm run build`
- ✅ Publish directory: `dist`
- ⏳ Environment variables configured
- ⏳ Site deployed

## 🔧 Environment Variables Required

Add these in Netlify Dashboard → Site Settings → Environment Variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🌐 Access Your Site

After successful deployment:
- Check build logs in Netlify Dashboard
- Access your site at the provided URL
- Test all payment flows

## 🔍 Troubleshooting

### Build Fails
- Check environment variables
- Verify Node.js version (Netlify uses Node 18.x)
- Check build logs for errors

### 404 Errors on Page Refresh
- Ensure `_redirects` file exists with SPA routing rules
- Netlify config includes this, but verify it's in `public/` folder

### Environment Variables Not Working
- Prefix with `VITE_` for Vite to access them
- Redeploy after adding new variables

## 📊 Features Deployed

### Payment System
- ✅ 14 Courier support (FedEx, DHL, Aramex, UPS, SMSA, SPL, iMile, J&T, Ay Makan, Postaplus, Ubex, Emirates Post, Zajil, Naqel)
- ✅ Dynamic currency detection (SAR, AED, KWD, QAR, OMR, BHD)
- ✅ Pixel-perfect UI with SSL security badge
- ✅ Month/Year dropdown for expiry date
- ✅ URL params navigation (country & currency)
- ✅ Payment flow: Recipient → Details → Card → OTP → Receipt

### Technical
- ✅ React 18 + TypeScript
- ✅ Tailwind CSS
- ✅ Shadcn/ui components
- ✅ React Router DOM
- ✅ Supabase integration
- ✅ React Query

## 🎯 Next Steps

1. Test payment flows with all 14 couriers
2. Verify currency detection works correctly
3. Check responsive design on mobile/desktop
4. Test OTP flow
5. Verify SSL certificate
6. Set up custom domain (optional)

---

**Need Help?**
- Netlify Docs: https://docs.netlify.com/
- GitHub Repo: https://github.com/you3333ef/paym
