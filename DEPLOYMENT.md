# Deployment Guide

## Option 1: GitHub Pages (Easiest - Free)

### Steps:

1. **Push your code to GitHub** (if you haven't already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub: `https://github.com/PolicLL/java-quiz-app`
   - Click on **Settings** tab
   - Scroll down to **Pages** section (in the left sidebar)
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

3. **Your site will be live at**:
   ```
   https://policll.github.io/java-quiz-app/
   ```
   (It may take 1-2 minutes to go live)

---

## Option 2: Netlify (Free - Very Easy)

### Steps:

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select your `java-quiz-app` repository
4. Build settings:
   - **Build command**: Leave empty (no build needed)
   - **Publish directory**: Leave as `/` (root)
5. Click **"Deploy site"**
6. Your site will be live at: `https://your-app-name.netlify.app`

### Custom Domain:
- You can add a custom domain in Netlify settings

---

## Option 3: Vercel (Free - Great Performance)

### Steps:

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New Project"**
3. Import your GitHub repository `java-quiz-app`
4. Framework Preset: **Other**
5. Click **"Deploy"**
6. Your site will be live at: `https://your-app-name.vercel.app`

---

## Option 4: Surge.sh (Free - Command Line)

### Steps:

1. Install Surge:
   ```bash
   npm install -g surge
   ```

2. Deploy:
   ```bash
   cd /Users/lukapolic/Desktop/Quiz
   surge
   ```
   - Enter your email
   - Choose a domain name (e.g., `java-quiz-app.surge.sh`)
   - Done! Your site is live.

---

## Important Notes:

### For GitHub Pages:
- Your site URL will be: `https://policll.github.io/java-quiz-app/`
- Make sure `index.html` is in the root directory (it is!)
- The `questions.json` file will load correctly via HTTPS

### Update Blog URL:
Before deploying, update the blog URL in `script.js`:
```javascript
const BLOG_URL = 'https://your-actual-blog-url.com';
```

### Testing Locally:
You can test your deployment locally using:
```bash
python3 -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## Recommended: GitHub Pages
Since you already have GitHub set up, **GitHub Pages is the easiest option**. Just enable it in your repository settings!

---

## Using a Custom Domain

You can buy a domain and connect it to your deployed site! Here's how:

### Step 1: Buy a Domain

**Popular Domain Registrars:**
- **Namecheap** (Recommended - ~$10-15/year): https://namecheap.com
- **Google Domains** (~$12/year): https://domains.google
- **Cloudflare** (~$8-10/year - cheapest): https://cloudflare.com/products/registrar
- **GoDaddy** (~$12-15/year): https://godaddy.com

**Tips:**
- Look for `.com`, `.dev`, `.io`, or `.app` domains
- Use discount codes (often available for first-time buyers)
- Cloudflare offers domains at cost (no markup)

### Step 2: Connect Domain to GitHub Pages

1. **In your domain registrar**, add DNS records:
   - Type: `A` records
   - Add these 4 IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - OR add a `CNAME` record:
     - Name: `@` or `www`
     - Value: `policll.github.io`

2. **In GitHub repository**:
   - Go to Settings → Pages
   - Under "Custom domain", enter your domain (e.g., `javaquiz.com`)
   - Check "Enforce HTTPS" (after DNS propagates)

3. **Wait for DNS propagation** (can take 24-48 hours, usually faster)

### Step 3: Connect Domain to Netlify (Alternative)

If using Netlify instead:

1. Deploy your site on Netlify
2. Go to **Site settings** → **Domain management**
3. Click **Add custom domain**
4. Enter your domain
5. Netlify will show you DNS records to add:
   - Add `A` record pointing to Netlify's IP
   - OR add `CNAME` record pointing to your Netlify site
6. Netlify will automatically provision SSL certificate (HTTPS)

### Step 4: Connect Domain to Vercel (Alternative)

1. Deploy on Vercel
2. Go to **Settings** → **Domains**
3. Add your domain
4. Follow Vercel's instructions to add DNS records
5. Vercel handles SSL automatically

---

## Domain Setup Examples

### Example 1: Using GitHub Pages with Custom Domain

**Domain:** `javaquiz.com` (bought from Namecheap)

**DNS Settings in Namecheap:**
```
Type: A Record
Host: @
Value: 185.199.108.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.109.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.110.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.111.153
TTL: Automatic

Type: CNAME Record
Host: www
Value: policll.github.io
TTL: Automatic
```

**In GitHub:**
- Settings → Pages → Custom domain: `javaquiz.com`
- Check "Enforce HTTPS"

### Example 2: Using Netlify with Custom Domain

**Domain:** `javaquiz.com`

**DNS Settings:**
```
Type: A Record
Host: @
Value: [Netlify IP shown in dashboard]
TTL: Automatic

Type: CNAME Record
Host: www
Value: your-site.netlify.app
TTL: Automatic
```

**In Netlify:**
- Site settings → Domain management → Add custom domain
- Netlify automatically sets up SSL

---

## Cost Breakdown

- **Domain:** $8-15/year (one-time annual cost)
- **Hosting:** FREE (GitHub Pages, Netlify, Vercel all offer free hosting)
- **SSL Certificate:** FREE (automatically provided)
- **Total:** ~$10-15/year for a custom domain

---

## Recommended Setup

1. **Buy domain from Cloudflare** (cheapest, ~$8-10/year)
2. **Deploy on Netlify** (easiest custom domain setup)
3. **Connect domain** (Netlify guides you through it)

OR

1. **Buy domain from Namecheap** (good UI, ~$12/year)
2. **Deploy on GitHub Pages** (you're already set up)
3. **Add DNS records** (as shown above)

---

## Quick Start: Buy & Deploy

1. **Buy domain:** Go to namecheap.com or cloudflare.com
2. **Search for domain:** e.g., `javaquiz`, `javainterview`, `javaquizapp`
3. **Purchase domain** (~$10-15)
4. **Deploy site** (GitHub Pages, Netlify, or Vercel)
5. **Connect domain** (follow steps above)
6. **Wait 1-24 hours** for DNS to propagate
7. **Your site is live at your custom domain!** 🎉

---

## Tips

- **Domain name ideas:**
  - `javaquiz.com`
  - `javainterviewquiz.com`
  - `learnjavaquiz.com`
  - `javaquiz.dev`
  - `javaprep.app`

- **Check domain availability:** Use domain registrar's search tool

- **DNS propagation:** Can take 1-48 hours, but usually works within 1-2 hours

- **SSL/HTTPS:** Automatically provided by GitHub Pages, Netlify, and Vercel (free)

- **Subdomains:** You can also use subdomains like `quiz.yourdomain.com` (free with your domain)
