import { NextResponse } from 'next/server'

// Define allowed origins
const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://yourdomain.com',
    'https://therealestpoet.vercel.app/'
     // Replace with your production domain
    // Add more allowed origins as needed
]

/**
 * Apply CORS headers to a response
 * @param {NextResponse} response - The response object
 * @param {string} origin - The requesting origin
 * @returns {NextResponse} - Response with CORS headers
 */
export function applyCORS(response, origin) {
    // Check if origin is allowed
    const isAllowed = ALLOWED_ORIGINS.includes(origin)

    if (isAllowed) {
        response.headers.set('Access-Control-Allow-Origin', origin)
        response.headers.set('Access-Control-Allow-Credentials', 'true')
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response.headers.set('Access-Control-Max-Age', '3600')
    }

    return response
}

/**
 * Handle CORS preflight requests (OPTIONS)
 * @param {Request} request - The incoming request
 * @returns {NextResponse} - Preflight response
 */
export function handleCORSPreflight(request) {
    const origin = request.headers.get('origin') || ''
    const response = new NextResponse(null, { status: 200 })
    return applyCORS(response, origin)
}

/**
 * Middleware to verify CORS and reject disallowed origins
 * @param {Request} request - The incoming request
 * @returns {boolean} - True if origin is allowed or no origin header
 */
export function verifyCORS(request) {
    const origin = request.headers.get('origin')

    // If there's no origin header (same-origin request), allow it
    if (!origin) {
        return true
    }

    // Check if origin is in allowed list
    return ALLOWED_ORIGINS.includes(origin)
}

/**
 * Create a JSON error response with CORS headers
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @param {Request} request - The incoming request
 * @returns {NextResponse} - Error response with CORS headers
 */
export function corsErrorResponse(message, status, request) {
    const origin = request.headers.get('origin') || ''
    const response = NextResponse.json(
        { success: false, message },
        { status }
    )
    return applyCORS(response, origin)
}
