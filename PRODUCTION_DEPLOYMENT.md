# Production Deployment Configuration

## ⚠️ BEFORE YOU DEPLOY - IMPORTANT STEPS

Your CORS implementation is complete and working. Before deploying to production, you **must** update the allowed origins configuration.

---

## Current Configuration

**File**: `/lib/cors.js` (lines 3-8)

```javascript
const ALLOWED_ORIGINS = [
    'http://localhost:3000',    // ✅ Local dev
    'http://localhost:3001',    // ✅ Local dev
    'https://yourdomain.com',   // ⚠️ UPDATE THIS
]
```

---

## Option 1: Hardcoded Domains (Simple)

### For Single Domain
```javascript
// /lib/cors.js
const ALLOWED_ORIGINS = [
    'https://yourblog.com',
    'https://www.yourblog.com',
]
```

### For Multiple Domains
```javascript
// /lib/cors.js
const ALLOWED_ORIGINS = [
    'https://yourblog.com',
    'https://www.yourblog.com',
    'https://admin.yourblog.com',
    'https://api.yourblog.com',
]
```

---

## Option 2: Environment Variables (Recommended)

### Step 1: Update `/lib/cors.js`
Replace lines 3-8 with:
```javascript
// Define allowed origins from environment variable or default
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : ['http://localhost:3000', 'http://localhost:3001']
```

### Step 2: Create `.env.production` (or `.env.local` for local)
```
ALLOWED_ORIGINS=https://yourblog.com,https://www.yourblog.com
```

### Step 3: Create `.env.development`
```
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Step 4: Update `next.config.mjs` (Optional - for verification)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    },
};

export default nextConfig;
```

---

## Option 3: Dynamic Configuration (Most Flexible)

### Use different origins based on environment:

```javascript
// /lib/cors.js
let ALLOWED_ORIGINS = []

if (process.env.NODE_ENV === 'production') {
    ALLOWED_ORIGINS = [
        'https://yourblog.com',
        'https://www.yourblog.com',
    ]
} else {
    ALLOWED_ORIGINS = [
        'http://localhost:3000',
        'http://localhost:3001',
    ]
}

// ... rest of code
```

---

## Where Your App is Deployed?

Choose based on your hosting platform:

### Vercel (Recommended for Next.js)
1. Go to Project Settings → Environment Variables
2. Add variable `ALLOWED_ORIGINS`
3. Set value: `https://yourdomain.vercel.app,https://yourdomain.com`
4. Use Option 2 configuration above

### Netlify
1. Go to Build & Deploy → Environment
2. Add variable `ALLOWED_ORIGINS`
3. Set value: `https://yourdomain.netlify.app,https://yourdomain.com`
4. Use Option 2 configuration above

### Railway
1. Go to Variables
2. Add variable `ALLOWED_ORIGINS`
3. Set value: `https://yourdomain.railway.app,https://yourdomain.com`
4. Use Option 2 configuration above

### Self-Hosted (Docker, VPS, etc.)
1. Set environment variable before running:
   ```bash
   export ALLOWED_ORIGINS="https://yourdomain.com"
   npm run start
   ```
2. Or add to your deployment script:
   ```bash
   ALLOWED_ORIGINS=https://yourdomain.com npm run start
   ```

### Traditional Hosting (cPanel, etc.)
1. Update file directly: Edit `/lib/cors.js` (Option 1)
2. Or set in hosting panel environment settings

---

## Testing Your Configuration

### Local Testing (Before Deploying)
```bash
# Test with your production domain
curl -X GET http://localhost:3000/api/blog \
  -H "Origin: https://yourdomain.com" \
  -v
```
Expected: 403 (because localhost:3000 doesn't match https://yourdomain.com)

### After Deploying
```bash
# Test from your actual domain
curl -X GET https://yourdomain.com/api/blog \
  -H "Origin: https://yourdomain.com" \
  -v
```
Expected: 200 OK with CORS headers

---

## Deployment Checklist

### Before You Deploy:
- [ ] Identify your production domain(s)
  - Primary: `https://yourdomain.com`
  - WWW: `https://www.yourdomain.com`
  - Admin: `https://admin.yourdomain.com`
  - Other subdomains?

- [ ] Choose configuration method
  - [ ] Option 1 (Simple hardcoded) - For single domain
  - [ ] Option 2 (Environment variables) - Recommended
  - [ ] Option 3 (Environment-based) - Most flexible

- [ ] Update `/lib/cors.js`
  - [ ] Replace placeholder domain with your domain
  - [ ] Include both `yourdomain.com` and `www.yourdomain.com`
  - [ ] Include any subdomains you use

- [ ] Test locally
  - [ ] Run `npm run dev`
  - [ ] Run `node scripts/testCORS.js`
  - [ ] All tests pass: ✅

- [ ] Set environment variables (if using Option 2)
  - [ ] Create `.env.production` with your domains
  - [ ] Set in hosting platform environment settings

- [ ] Deploy
  - [ ] Push code to your repository
  - [ ] Deploy to hosting platform
  - [ ] Verify domain name is correct in browser

- [ ] Test in production
  - [ ] Open your domain in browser
  - [ ] Open DevTools Console (F12)
  - [ ] Run the browser test:
    ```javascript
    fetch('/api/blog')
      .then(r => r.json())
      .then(d => console.log('✅ Success:', d));
    ```

---

## Example Configurations

### Example 1: Simple Blog Site
```javascript
// /lib/cors.js
const ALLOWED_ORIGINS = [
    'https://myblog.com',
    'https://www.myblog.com',
]
```

### Example 2: Multi-Site Setup
```javascript
// /lib/cors.js
const ALLOWED_ORIGINS = [
    'https://myblog.com',
    'https://www.myblog.com',
    'https://admin.myblog.com',
    'https://staging.myblog.com',
]
```

### Example 3: Development & Production
```javascript
// /lib/cors.js
let ALLOWED_ORIGINS = []

if (process.env.NODE_ENV === 'production') {
    // Production domains
    ALLOWED_ORIGINS = [
        'https://myblog.com',
        'https://www.myblog.com',
    ]
} else {
    // Development domains
    ALLOWED_ORIGINS = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000',
    ]
}

// ... rest of your code
```

### Example 4: Environment Variable Based
```javascript
// /lib/cors.js
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : ['http://localhost:3000']

// .env.production
ALLOWED_ORIGINS=https://myblog.com,https://www.myblog.com

// .env.development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

---

## Quick Reference: Common Domains

### Local Development
```javascript
'http://localhost:3000',
'http://localhost:3001',
'http://127.0.0.1:3000',
'http://localhost:8000',
```

### Popular Hosting Platforms
```javascript
// Vercel
'https://yourproject.vercel.app',

// Netlify
'https://yourproject.netlify.app',

// Railway
'https://yourproject.railway.app',

// Heroku
'https://yourapp.herokuapp.com',

// Custom Domain (Any Platform)
'https://yourdomain.com',
'https://www.yourdomain.com',
```

---

## Important Security Notes

### DO ✅
- ✅ Include both `yourdomain.com` and `www.yourdomain.com`
- ✅ Use HTTPS in production (not HTTP)
- ✅ Use exact domain names
- ✅ Whitelist only domains you trust
- ✅ Review origins regularly

### DON'T ❌
- ❌ Use `*` (wildcard) - extremely insecure
- ❌ Use HTTP in production
- ❌ Include localhost in production config
- ❌ Whitelist unknown domains
- ❌ Leave default placeholder domains

---

## Verification Commands

### Check Your Configuration
```bash
# See what's in the whitelist (local only)
cat /lib/cors.js | grep -A 5 "ALLOWED_ORIGINS"
```

### Test Specific Domain
```bash
# Test your production domain locally
curl -X OPTIONS http://localhost:3000/api/blog \
  -H "Origin: https://yourdomain.com" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

### Test After Deployment
```bash
# Test from your live domain
curl https://yourdomain.com/api/blog \
  -H "Origin: https://yourdomain.com" \
  -v | grep "Access-Control"
```

---

## FAQ

**Q: Should I include `www.` version?**
A: Yes, always include both versions if you use both

**Q: Can I have different origins for different endpoints?**
A: Not with current implementation. Extend `/lib/cors.js` if needed

**Q: What if I have subdomains?**
A: Add them to the list: `'https://admin.yourdomain.com'`

**Q: Can I test environment variables locally?**
A: Yes! Create `.env.local` and they'll be loaded in development

**Q: What about staging/preview deployments?**
A: Add their URLs: `'https://staging.yourdomain.com'`

---

## Deployment Command Cheat Sheet

### For Vercel
```bash
vercel env add ALLOWED_ORIGINS
# Enter: https://yourdomain.com,https://www.yourdomain.com
vercel deploy --prod
```

### For Railway
```bash
railway link  # Link to your project
railway variables  # Add ALLOWED_ORIGINS
railway up  # Deploy
```

### For Self-Hosted
```bash
ALLOWED_ORIGINS=https://yourdomain.com npm run build
ALLOWED_ORIGINS=https://yourdomain.com npm run start
```

---

## Summary

Before deploying to production:

1. **Identify** your production domain(s)
2. **Choose** a configuration method
3. **Update** `/lib/cors.js` OR set environment variables
4. **Test** locally with your domain
5. **Deploy** to production
6. **Verify** CORS works on live site

**After deployment**, open your site and test from the browser console!

---

**Remember**: If you forget to update this and deploy, users will see CORS errors. Take 2 minutes now to prevent issues later! ⏰

