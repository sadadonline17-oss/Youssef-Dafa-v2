# 🚀 Auto-Deployment Setup Guide

## ✅ What's Been Configured

### 1. GitHub Actions Workflow
- **Location:** `.github/workflows/deploy.yml`
- **Triggers:** Push to `main` branch
- **Action:** Automatically builds and deploys to Netlify

### 2. Netlify Configuration
- **File:** `netlify.toml` (already exists)
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

---

## 🔑 Required GitHub Secrets

To enable auto-deployment, you need to add these secrets in your GitHub repository:

### Step 1: Get Netlify Credentials

1. **Netlify Auth Token:**
   - Go to: https://app.netlify.com/user/applications#personal-access-tokens
   - Click "New token"
   - Name: `GitHub-Actions`
   - Copy the token

2. **Netlify Site ID:**
   - Go to: https://app.netlify.com/
   - Select your site
   - Go to Site settings > General > Site details
   - Copy the Site ID

### Step 2: Add Secrets to GitHub

1. Go to your GitHub repository: https://github.com/you3333ef/paym
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret:

   **Secret 1:**
   - Name: `NETLIFY_AUTH_TOKEN`
   - Value: `[paste your Netlify Auth Token]`

   **Secret 2:**
   - Name: `NETLIFY_SITE_ID`
   - Value: `[paste your Site ID]`

6. Click **Add secret** for each

---

## 🎯 How It Works

### Auto-Deployment Flow:
1. **Push to main** → GitHub detects change
2. **GitHub Actions** → Triggers workflow
3. **Build** → Runs `npm run build`
4. **Deploy** → Pushes `dist/` folder to Netlify
5. **Live!** → Site updates automatically

### Every Push Will:
- ✅ Run tests (if configured)
- ✅ Build the project
- ✅ Deploy to Netlify
- ✅ Provide deployment URL

---

## 📊 Example Deployment

After setup, every push will show:
```
✅ Deployment successful!
🌐 Site is live at: https://tubular-gaufre-62a1cf.netlify.app
```

---

## 🔧 Troubleshooting

### If Deployment Fails:
1. Check GitHub Actions tab for error details
2. Verify secrets are correct
3. Ensure `netlify.toml` exists in root
4. Check that build command works locally: `npm run build`

### If Secrets Not Found:
- Ensure you're adding to **Repository** secrets (not organization)
- Secrets are: `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`
- No extra spaces or quotes

---

## 🚀 Quick Start

1. ✅ Workflow created
2. ✅ Netlify config ready
3. ⏳ **Need to add GitHub secrets**

**Next Step:** Add the 2 GitHub secrets (see Step 2 above)

---

## 📝 Notes

- **Node Version:** 18 (configured in workflow)
- **Package Manager:** npm (using `npm ci`)
- **Branch:** main (only pushes to main trigger deployment)
- **Timeout:** 1 minute
- **Artifacts:** dist/ folder is deployed

---

## 🎉 That's It!

Once secrets are added, your site will auto-deploy on every push to main! 🚀

Generated: 2025-12-03
