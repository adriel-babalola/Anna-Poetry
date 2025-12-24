import { NextResponse } from 'next/server'

// Define allowed origins
const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://yourdomain.com',
    'https://therealestpoet.vercel.app',
    'http://localhost:5000',
    'http://127.0.0.1:3000',
     // Replace with your production domain
    // Add more allowed origins as needed
]

/**
 * Check if an origin is allowed (supports wildcards and patterns)
 * @param {string} origin - The origin to check
 * @returns {boolean} - True if origin is allowed
 */
function isOriginAllowed(origin) {
    if (!origin) return true // Allow requests without origin (like same-origin)
    
    // Direct match
    if (ALLOWED_ORIGINS.includes(origin)) return true
    
    // Allow localhost on any port (for development)
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return true
    }
    
    // Allow local network IPs (192.168.x.x, 10.x.x.x)
    if (origin.startsWith('http://192.168.') || origin.startsWith('http://10.')) {
        return true
    }
    
    // Allow any vercel.app domain (your deployment) - for production
    if (origin.includes('vercel.app')) {
        return true
    }
    
    // For production/Vercel: Allow any origin (since CORS is already handled by credentials)
    if (process.env.NODE_ENV === 'production') {
        return true
    }
    
    return false
}

/**
 * Apply CORS headers to a response
 * @param {NextResponse} response - The response object
 * @param {string} origin - The requesting origin
 * @returns {NextResponse} - Response with CORS headers
 */
export function applyCORS(response, origin) {
    // Check if origin is allowed
    const isAllowed = isOriginAllowed(origin)

    if (isAllowed) {
        response.headers.set('Access-Control-Allow-Origin', origin || '*')
        response.headers.set('Access-Control-Allow-Credentials', 'true')
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie')
        response.headers.set('Access-Control-Max-Age', '86400')
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
    return isOriginAllowed(origin)
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
