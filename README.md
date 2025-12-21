# Moonshot Blog Platform

A modern, full-featured blogging platform built with Next.js, React, and MongoDB. Features a public-facing blog interface with an admin dashboard for managing content, user subscriptions, and email communications.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Installation](#installation)
  - [Initial Admin Setup](#initial-admin-setup)
- [Project Structure](#project-structure)
- [How to Use](#how-to-use)
  - [Public Features](#public-features)
  - [Admin Features](#admin-features)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)

## ✨ Features

### Public Features
- **Blog Feed**: Browse all published blog posts with titles, descriptions, images, and author information
- **Blog Details**: Read full blog posts with rich text formatting
- **Email Subscription**: Subscribe to newsletter with email notifications
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Modern UI**: Clean, professional design with smooth animations

### Admin Features
- **Admin Dashboard**: Centralized control panel for managing all content
- **Blog Management**:
  - Create new blog posts with rich text editor (Quill)
  - Edit existing blog posts
  - View all published blogs
  - Publish/unpublish posts
- **Subscription Management**: View all email subscribers
- **Admin Authentication**: Secure JWT-based login system
- **Admin Accounts**: Create and manage multiple admin users

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Quill 2.0.3** - Rich text editor
- **React Toastify 11.0.5** - Toast notifications
- **Axios 1.13.2** - HTTP client

### Backend
- **Next.js API Routes** - Backend API endpoints
- **MongoDB** - NoSQL database
- **Mongoose 9.0.1** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **Bcryptjs 3.0.3** - Password hashing

### Development
- **ESLint 9** - Code linting
- **Tailwind CSS** - Styling
- **PostCSS 4** - CSS processing

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.x or higher
- **npm** or **yarn** package manager
- **MongoDB Atlas account** (cloud database)
- A text editor (VS Code recommended)

### Environment Setup

1. **Create `.env.local` file** in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# Authentication
JWT_SECRET=your-super-secret-key-change-in-production-12345
```

⚠️ **Important**: Change the `JWT_SECRET` to a long random string for production.

### Installation

1. **Clone or download the project**

2. **Install dependencies**:

```bash
npm install
```

3. **Set up the database** (see [Initial Admin Setup](#initial-admin-setup))

4. **Run the development server**:

```bash
npm run dev
```

5. **Open your browser** and navigate to:
   - Public site: `http://localhost:3000`
   - Admin login: `http://localhost:3000/admin-login`
   - Admin dashboard: `http://localhost:3000/admin` (after login)

### Initial Admin Setup

After installation, create initial admin accounts:

```bash
node scripts/setupAdmins.js
```

**Default credentials** (⚠️ Change these immediately after first login):
- **Owner Account**
  - Email: `owner@example.com`
  - Password: `Owner@12345`

- **Admin Account**
  - Email: `admin@example.com`
  - Password: `Admin@12345`

## 📁 Project Structure

```
my-app/
├── app/                          # Next.js App Router
│   ├── page.js                   # Home page
│   ├── layout.js                 # Root layout
│   ├── globals.css               # Global styles
│   ├── admin/                    # Admin dashboard
│   │   ├── layout.jsx            # Admin layout with sidebar
│   │   ├── page.jsx              # Dashboard home
│   │   ├── addProduct/           # Add blog post
│   │   ├── blogList/             # List all blogs
│   │   ├── editBlog/[id]/        # Edit blog post
│   │   └── subscriptions/        # Email subscribers list
│   ├── admin-login/              # Admin login page
│   ├── api/                      # API endpoints
│   │   ├── auth/
│   │   │   ├── login/            # POST login endpoint
│   │   │   ├── logout/           # POST logout endpoint
│   │   │   └── test/             # GET test endpoint
│   │   ├── blog/                 # Blog CRUD endpoints
│   │   └── email/                # Email subscription endpoint
│   ├── blogs/[id]/               # Blog detail page
│   └── fonts/                    # Custom fonts
├── components/                   # React components
│   ├── BlogItem.jsx              # Blog card component
│   ├── BlogList.jsx              # Blog feed component
│   ├── Header.jsx                # Navigation header
│   ├── Footer.jsx                # Footer component
│   ├── QuillEditor.jsx           # Rich text editor wrapper
│   └── adminComponents/
│       ├── Sidebar.jsx           # Admin sidebar navigation
│       ├── BlogTableItem.jsx     # Blog table row
│       ├── SubTabelItem.jsx      # Subscriber table row
│       └── LogoutButton.jsx      # Logout button
├── lib/                          # Utility functions
│   ├── auth.js                   # JWT & cookie utilities
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   └── model/
│       ├── AdminModel.js         # Admin schema & model
│       ├── BlogModel.js          # Blog schema & model
│       └── EmailModel.js         # Email subscription schema
├── public/                       # Static files (images, etc.)
├── scripts/
│   └── setupAdmins.js            # Initial admin setup script
├── middleware.js                 # Route protection middleware
├── next.config.mjs               # Next.js configuration
├── package.json                  # Project dependencies
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── AUTH_SETUP.md                 # Authentication documentation
```

## 📖 How to Use

### Public Features

#### 1. **Browse Blog Posts**
- Visit `http://localhost:3000`
- See all published blog posts with images and summaries
- Click on any post to read the full content

#### 2. **Read Full Blog Posts**
- Click on a blog post to view details at `/blogs/[id]`
- See full content, author info, and publication date

#### 3. **Subscribe to Newsletter**
- Enter your email in the subscription form
- Get notifications about new blog posts

### Admin Features

#### 1. **Admin Login**
- Navigate to `http://localhost:3000/admin-login`
- Enter email and password
- JWT token stored in secure HTTP-only cookie

#### 2. **Dashboard Overview**
- See admin dashboard at `/admin`
- Access all admin features from sidebar

#### 3. **Create Blog Post**
- Click "Add Product" in sidebar
- Fill in:
  - Title
  - Description (optional preview text)
  - Content (using rich text editor)
  - Category
  - Author name
  - Featured image URL
  - Author image URL
- Click save to publish

#### 4. **Manage Blog Posts**
- Click "Blog List" to see all posts
- Edit any post by clicking edit icon
- Delete posts (if available)

#### 5. **View Subscribers**
- Click "Subscriptions" to see all email subscribers
- View subscriber emails and subscription dates

#### 6. **Logout**
- Click "Logout" button (top right)
- Session ends and redirected to login page

## 🔌 API Endpoints

### Authentication Endpoints

```
POST /api/auth/login
├─ Body: { email: string, password: string }
└─ Response: { success: boolean, message: string }

POST /api/auth/logout
├─ Body: (none)
└─ Response: { success: boolean, message: string }

GET /api/auth/test
└─ Response: { message: string }
```

### Blog Endpoints

```
GET /api/blog
├─ Query: ?id=<id> (optional - get single blog or all blogs)
└─ Response: blog object(s)

POST /api/blog
├─ Body: { title, description, content, category, author, image, authorImg }
└─ Response: { success: boolean, blog: object }

PUT /api/blog/:id
├─ Body: { title, description, content, category, author, image, authorImg }
└─ Response: { success: boolean, blog: object }

DELETE /api/blog/:id
└─ Response: { success: boolean, message: string }
```

### Email Subscription Endpoint

```
POST /api/email
├─ Body: { email: string }
└─ Response: { success: boolean, message: string }
```

## 💾 Database Schema

### Admin Model
```javascript
{
  email: String (required, unique),
  password: String (hashed with bcrypt, required),
  fullName: String,
  role: String (e.g., "owner", "admin"),
  createdAt: Date
}
```

### Blog Model
```javascript
{
  title: String (required),
  description: String (required),
  category: String (required),
  author: String (required),
  image: String (required - featured image URL),
  authorImg: String (required - author profile image URL),
  date: Date (default: current date)
}
```

### Email Subscription Model
```javascript
{
  email: String (required, unique),
  subscribedAt: Date (default: current date)
}
```

## 🔐 Authentication

### How Authentication Works

1. **Login**: User submits email & password → Verified against hashed password in database
2. **Token Generation**: Server creates JWT token with user info
3. **Cookie Storage**: Token stored in HTTP-only, secure cookie
4. **Route Protection**: Middleware checks for valid token on `/admin/*` routes
5. **Logout**: Token cookie cleared, user redirected to login

### Protected Routes

All routes under `/admin/*` are protected:
- `/admin` - Dashboard
- `/admin/addProduct` - Create blog
- `/admin/blogList` - Manage blogs
- `/admin/editBlog/[id]` - Edit blog
- `/admin/subscriptions` - View subscribers

Middleware in [middleware.js](middleware.js) handles route protection.

### Password Security

- Passwords hashed with **bcryptjs** before storing
- Never stored in plain text
- Salt rounds: 10 (bcryptjs default)

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
4. Deploy

### Other Deployment Options

- **Netlify**: Similar to Vercel
- **Railway**: Node.js hosting
- **Render**: Cloud hosting
- **Self-hosted**: Any Node.js server

⚠️ **Production Checklist**:
- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Update MongoDB connection string
- [ ] Change default admin passwords
- [ ] Enable HTTPS
- [ ] Set up MongoDB backups
- [ ] Monitor error logs

## 🔒 Security

### Current Security Features
✅ Password hashing with bcryptjs (10 salt rounds)
✅ HTTP-only, secure cookies for JWT storage
✅ JWT token expiration
✅ Route protection middleware
✅ Email validation on subscription

### Recommended Enhancements
- [ ] Add CSRF protection tokens
- [ ] Implement rate limiting on login
- [ ] Add two-factor authentication (2FA)
- [ ] Implement admin activity logging
- [ ] Add email verification for subscriptions
- [ ] Use environment variables for sensitive data
- [ ] Enable CORS restrictions
- [ ] Add request validation and sanitization

## 📝 Contributing

### Development Workflow

1. Create a feature branch
2. Make your changes
3. Test thoroughly on `http://localhost:3000`
4. Commit with clear messages
5. Push and create a pull request

### Code Standards

- Follow ESLint rules: `npm run lint`
- Use functional components with React hooks
- Keep components modular and reusable
- Add comments for complex logic
- Use meaningful variable and function names

## 📞 Support & Questions

If you encounter issues:

1. Check the [AUTH_SETUP.md](AUTH_SETUP.md) for authentication-specific help
2. Review the MongoDB connection string in [lib/config/db.js](lib/config/db.js)
3. Check browser console for client-side errors
4. Check terminal for server-side errors
5. Verify all environment variables are set correctly

## 📄 License

This project is part of Hack Club Hackathons - Moonshot Challenge

---

**Last Updated**: December 21, 2025
**Version**: 0.1.0
