import { NextResponse } from 'next/server'
import { applyCORS, handleCORSPreflight, verifyCORS } from '@/lib/cors'

export async function OPTIONS(request) {
    return handleCORSPreflight(request)
}

export async function POST(req) {
    // Check CORS
    if (!verifyCORS(req)) {
        const response = NextResponse.json(
            { success: false, message: 'CORS policy violation' },
            { status: 403 }
        )
        return applyCORS(response, req.headers.get('origin') || '')
    }

    try {
        const response = NextResponse.json(
            { success: true, message: 'Logout successful' },
            { status: 200 }
        )
        
        response.cookies.set('adminToken', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        
        return applyCORS(response, req.headers.get('origin') || '')
    } catch (error) {
        console.error('Logout error:', error)
        const response = NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        )
        return applyCORS(response, req.headers.get('origin') || '')
    }
}
