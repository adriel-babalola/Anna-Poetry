import { ConnectDB } from '@/lib/config/db'
import AdminModel from '@/lib/model/AdminModel'
import { generateToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'
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
        await ConnectDB()
        
        const { email, password } = await req.json()

        // Validation
        if (!email || !password) {
            const response = NextResponse.json(
                { success: false, message: 'Please provide email and password' },
                { status: 400 }
            )
            return applyCORS(response, req.headers.get('origin') || '')
        }

        // Find admin by email
        const admin = await AdminModel.findOne({ email: email.toLowerCase() })
        
        if (!admin) {
            const response = NextResponse.json(
                { success: false, message: 'Invalid email or password' },
                { status: 401 }
            )
            return applyCORS(response, req.headers.get('origin') || '')
        }
        
        // Check password
        const isPasswordValid = await bcrypt.compare(password, admin.password)
        
        if (!isPasswordValid) {
            const response = NextResponse.json(
                { success: false, message: 'Invalid email or password' },
                { status: 401 }
            )
            return applyCORS(response, req.headers.get('origin') || '')
        }

        // Generate token
        const token = generateToken(admin._id.toString())

        // Create response with cookie
        const response = NextResponse.json(
            { 
                success: true, 
                message: 'Login successful',
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email
                }
            },
            { status: 200 }
        )

        // Set cookie in the response
        response.cookies.set('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // Changed from 'strict' to 'lax' for cross-origin
            maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
        })

        return applyCORS(response, req.headers.get('origin') || '')
    } catch (error) {
        console.error('Login error:', error)
        const response = NextResponse.json(
            { success: false, message: 'Server error: ' + error.message },
            { status: 500 }
        )
        return applyCORS(response, req.headers.get('origin') || '')
    }
}
