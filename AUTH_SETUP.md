# Admin Authentication Setup Guide

## Overview
Your admin panel now has email/password authentication with JWT tokens. Only authenticated admins can access `/admin` routes.

## Initial Setup

### 1. Add Environment Variables
Create or update your `.env.local` file:

```
JWT_SECRET=your-super-secret-key-change-in-production-12345
```

### 2. Create Admin Accounts
Run this command to create the initial 2 admin accounts:

```bash
node scripts/setupAdmins.js
```

**Default credentials (CHANGE THESE IMMEDIATELY):**
- Owner: `owner@example.com` / `Owner@12345`
- Admin: `admin@example.com` / `Admin@12345`

### 3. Update Passwords
After first login, you should:
- Connect to your MongoDB database
- Update the password hashes directly, or
- Create a password change endpoint

## How It Works

### Login Flow
1. User visits `/admin-login`
2. Enters email and password
3. API validates credentials against database
4. On success, JWT token is stored in an HTTP-only cookie
5. User is redirected to `/admin`

### Protected Routes
- Middleware in `middleware.js` checks for valid token on all `/admin/*` routes
- If token is invalid/missing, user is redirected to `/admin-login`

### Logout
- Click the "Logout" button in admin panel
- Clears the authentication cookie
- Redirects to login page

## Files Created/Modified

**New Files:**
- `lib/model/AdminModel.js` - Admin database schema with password hashing
- `lib/auth.js` - JWT and cookie utilities
- `app/api/auth/login/route.js` - Login endpoint
- `app/api/auth/logout/route.js` - Logout endpoint
- `app/admin-login/page.jsx` - Login page UI
- `middleware.js` - Route protection middleware
- `components/adminComponents/LogoutButton.jsx` - Logout button component
- `scripts/setupAdmins.js` - Setup script for initial admins

**Modified Files:**
- `app/admin/layout.jsx` - Added logout button
- `package.json` - Added bcryptjs and jsonwebtoken

## Security Notes

⚠️ **Important:**
1. Change the `JWT_SECRET` in `.env.local` - use a long random string
2. Change default passwords after initial setup
3. The cookies are HTTP-only and secure (in production)
4. Passwords are hashed with bcrypt before storing

## API Endpoints

### POST `/api/auth/login`
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### POST `/api/auth/logout`
No body required - clears cookie

## Next Steps (Optional)

1. **Password Change Endpoint**: Create an API to change admin passwords
2. **Admin Management**: Add ability to manage admin accounts
3. **Audit Logging**: Log admin actions
4. **2FA**: Add two-factor authentication for extra security
