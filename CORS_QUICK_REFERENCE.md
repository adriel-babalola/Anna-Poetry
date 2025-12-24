# CORS Quick Reference

## Start Your Development Server
```bash
npm run dev
```
Server runs on `http://localhost:3000`

## Run CORS Tests (Automated)
```bash
node scripts/testCORS.js
```

## Manual Testing Commands

### ✅ Test 1: Preflight Request (Allowed Origin)
```bash
curl -X OPTIONS http://localhost:3000/api/blog \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```
**Expected**: Status 200 with CORS headers

### ✅ Test 2: GET Request (Allowed Origin)
```bash
curl -X GET http://localhost:3000/api/blog \
  -H "Origin: http://localhost:3000" \
  -v
```
**Expected**: Status 200 with CORS headers

### ❌ Test 3: GET Request (Disallowed Origin)
```bash
curl -X GET http://localhost:3000/api/blog \
  -H "Origin: http://malicious-site.com" \
  -v
```
**Expected**: Status 403 - CORS policy violation

### ✅ Test 4: Login Request
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Origin: http://localhost:3000" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}' \
  -v
```
**Expected**: Status 200 with cookie and CORS headers

### ✅ Test 5: Email Subscription
```bash
curl -X POST http://localhost:3000/api/email \
  -H "Origin: http://localhost:3000" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}' \
  -v
```
**Expected**: Status 200 with CORS headers

## Browser Console Testing

Open browser DevTools (F12) and run this from your app at `http://localhost:3000`:

```javascript
// Test API with proper CORS
fetch('http://localhost:3000/api/blog', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
})
.then(res => res.json())
.then(data => console.log('✅ Success:', data))
.catch(err => console.error('❌ Error:', err.message));
```

## Configuration

### Update Allowed Origins
Edit `/lib/cors.js` line 4-8:

```javascript
const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://your-actual-domain.com',  // ← Update this
    'https://www.your-actual-domain.com'
]
```

### For Production with Environment Variables

1. Update `/lib/cors.js`:
```javascript
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',')
```

2. Set in your `.env.production`:
```
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## What's Protected

All these endpoints now have CORS restrictions:
- ✅ `POST /api/auth/login` - Admin login
- ✅ `POST /api/auth/logout` - Admin logout
- ✅ `GET /api/auth/test` - Check admin status
- ✅ `GET /api/blog` - Get blogs
- ✅ `POST /api/blog` - Create blog
- ✅ `PUT /api/blog` - Update blog
- ✅ `DELETE /api/blog` - Delete blog
- ✅ `GET /api/email` - Get emails
- ✅ `POST /api/email` - Subscribe to email
- ✅ `DELETE /api/email` - Delete email

## Response Headers Examples

### ✅ Successful Request (Allowed Origin)
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 3600
Content-Type: application/json

{"blogs": [...]}
```

### ❌ Failed Request (Blocked Origin)
```
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"success": false, "message": "CORS policy violation"}
```

## Important Notes

1. **Same-origin requests** (from your own domain) are always allowed
2. **Preflight caching** is 1 hour (`Access-Control-Max-Age: 3600`)
3. **Credentials** (cookies) are supported with `credentials: 'include'`
4. **All HTTP methods** are allowed: GET, POST, PUT, DELETE, PATCH, OPTIONS

## Verify It's Working

1. Open your app in browser: `http://localhost:3000`
2. Open DevTools Console (F12)
3. Run the browser test above
4. Should see success message with API data

## Files Reference

- **Core CORS Logic**: `/lib/cors.js`
- **Test Script**: `/scripts/testCORS.js`
- **Full Documentation**: `CORS_IMPLEMENTATION.md`
- **Testing Guide**: `CORS_TEST.md`

## Common Issues

| Issue | Solution |
|-------|----------|
| CORS error in browser | Add origin to `ALLOWED_ORIGINS` |
| Preflight fails | Ensure `export async function OPTIONS` exists |
| Cookies not sent | Add `credentials: 'include'` to fetch |
| Wrong headers | Check `applyCORS()` function in `/lib/cors.js` |

---

**Status**: ✅ Implementation Complete
**Last Updated**: December 24, 2025
