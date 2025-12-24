# CORS Implementation & Testing Guide

## Overview
CORS (Cross-Origin Resource Sharing) restrictions have been implemented across all API endpoints to ensure secure cross-origin requests. Only whitelisted origins are allowed to access your API.

## Configuration

### Allowed Origins
The CORS utility is configured in `/lib/cors.js` with the following allowed origins:
- `http://localhost:3000` (local development)
- `http://localhost:3001` (local development alternative)
- `https://yourdomain.com` (production - update this with your actual domain)

**To add more origins**, edit the `ALLOWED_ORIGINS` array in `/lib/cors.js`.

## Implemented CORS Features

1. **CORS Headers**: Automatically added to all API responses
   - `Access-Control-Allow-Origin`: Set to requesting origin if allowed
   - `Access-Control-Allow-Credentials`: true (for cookies)
   - `Access-Control-Allow-Methods`: GET, POST, PUT, DELETE, PATCH, OPTIONS
   - `Access-Control-Allow-Headers`: Content-Type, Authorization
   - `Access-Control-Max-Age`: 3600 seconds (1 hour cache)

2. **Preflight Request Handling**: OPTIONS method implemented on all routes
   - Handles preflight requests automatically
   - Returns proper CORS headers without executing the actual request

3. **Origin Verification**: Every request checks if origin is whitelisted
   - Disallowed origins receive 403 Forbidden response
   - Same-origin requests (no origin header) are always allowed

4. **Protected Routes**:
   - `/api/auth/login` - POST, OPTIONS
   - `/api/auth/logout` - POST, OPTIONS
   - `/api/auth/test` - GET, OPTIONS
   - `/api/blog` - GET, POST, PUT, DELETE, OPTIONS
   - `/api/email` - GET, POST, DELETE, OPTIONS

## Testing CORS

### Test 1: Preflight Request (Browser Automatic)
Browsers automatically send OPTIONS preflight requests before making cross-origin requests.

```bash
curl -X OPTIONS http://localhost:3000/api/blog \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

**Expected Response Headers**:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 3600
```

### Test 2: Allowed Origin Request
Test a request from a whitelisted origin:

```bash
curl -X GET http://localhost:3000/api/blog \
  -H "Origin: http://localhost:3000" \
  -v
```

**Expected Response**: 
- Status: 200 OK
- Header includes: `Access-Control-Allow-Origin: http://localhost:3000`

### Test 3: Disallowed Origin Request (Should Fail)
Test a request from a non-whitelisted origin:

```bash
curl -X GET http://localhost:3000/api/blog \
  -H "Origin: http://malicious-site.com" \
  -v
```

**Expected Response**: 
- Status: 403 Forbidden
- Message: "CORS policy violation"
- No `Access-Control-Allow-Origin` header (request blocked)

### Test 4: Login with CORS
Test authentication with CORS:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Origin: http://localhost:3000" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}' \
  -v
```

**Expected Response**:
- Status: 200 OK
- Contains CORS headers
- Sets `adminToken` cookie

### Test 5: Blog Submission with FormData
Test blog submission with CORS:

```bash
curl -X POST http://localhost:3000/api/blog \
  -H "Origin: http://localhost:3000" \
  -F "title=Test Blog" \
  -F "description=Test Description" \
  -F "category=Technology" \
  -F "author=John Doe" \
  -F "authorImg=/author.jpg" \
  -F "image=@./image.jpg" \
  -v
```

### Test 6: Browser-Based Testing
You can test CORS using browser console. From `http://localhost:3000`:

```javascript
// Test GET request
fetch('http://localhost:3000/api/blog', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include' // Include cookies
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));

// Test POST request (Login)
fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: 'admin@example.com',
        password: 'password123'
    }),
    credentials: 'include'
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));

// Test from unauthorized origin (will be blocked by browser)
// This would fail if run from a non-whitelisted domain
```

## CORS in Production

### Important Security Notes

1. **Update Allowed Origins**: Before deploying to production, update `ALLOWED_ORIGINS` with your actual domain:
   ```javascript
   const ALLOWED_ORIGINS = [
       'https://yourdomain.com',
       'https://www.yourdomain.com',
       // Any subdomains or related domains
   ]
   ```

2. **Enable Credentials**: The implementation allows credentials (cookies). Ensure this is intentional.

3. **HTTP Methods**: All necessary HTTP methods are allowed. Restrict if needed for your use case.

4. **Environment-Based Configuration**: Consider using environment variables:
   ```javascript
   const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [
       'http://localhost:3000'
   ]
   ```

### Optional: Restrict Origins by Environment

Edit `/lib/cors.js`:

```javascript
let ALLOWED_ORIGINS = []

if (process.env.NODE_ENV === 'production') {
    ALLOWED_ORIGINS = [
        'https://yourdomain.com',
        'https://www.yourdomain.com'
    ]
} else {
    ALLOWED_ORIGINS = [
        'http://localhost:3000',
        'http://localhost:3001'
    ]
}
```

## Troubleshooting

### Issue: "CORS policy violation" error
**Solution**: Add your origin to `ALLOWED_ORIGINS` in `/lib/cors.js`

### Issue: OPTIONS request fails
**Solution**: Ensure OPTIONS method is exported in your route file. All routes now have this.

### Issue: Cookies not being sent
**Solution**: Make sure to include `credentials: 'include'` in fetch requests:
```javascript
fetch(url, {
    credentials: 'include'
})
```

### Issue: Custom headers being blocked
**Solution**: Add them to `Access-Control-Allow-Headers` in the `applyCORS` function

## Files Modified/Created

- ✅ Created: `/lib/cors.js` - CORS utility functions
- ✅ Updated: `/app/api/auth/login/route.js` - Login endpoint
- ✅ Updated: `/app/api/auth/logout/route.js` - Logout endpoint
- ✅ Updated: `/app/api/auth/test/route.js` - Test endpoint
- ✅ Updated: `/app/api/blog/route.js` - Blog CRUD endpoints
- ✅ Updated: `/app/api/email/route.js` - Email subscription endpoints

## Next Steps

1. ✅ **Verify CORS works**: Run the test commands above
2. ✅ **Update production domains**: Replace placeholder domains in `ALLOWED_ORIGINS`
3. ✅ **Test from different origins**: Ensure only allowed origins can access
4. ✅ **Monitor for CORS errors**: Check browser console and server logs

## Summary

Your API now has comprehensive CORS protection that:
- ✅ Whitelist only approved origins
- ✅ Handle preflight requests automatically
- ✅ Reject requests from unauthorized origins
- ✅ Support credentials (cookies) securely
- ✅ Cache preflight responses for performance
