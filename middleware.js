import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
)

export async function middleware(request) {
    const { pathname } = request.nextUrl

    // Only protect /admin routes
    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get('adminToken')?.value

        if (!token) {
            return NextResponse.redirect(new URL('/admin-login', request.url))
        }

        try {
            await jwtVerify(token, JWT_SECRET)
        } catch (error) {
            return NextResponse.redirect(new URL('/admin-login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*']
}
