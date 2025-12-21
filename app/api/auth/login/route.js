import { ConnectDB } from '@/lib/config/db'
import AdminModel from '@/lib/model/AdminModel'
import { generateToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        await ConnectDB()
        
        const { email, password } = await req.json()

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Please provide email and password' },
                { status: 400 }
            )
        }

        // Find admin by email
        const admin = await AdminModel.findOne({ email: email.toLowerCase() })
        
        if (!admin) {
            return NextResponse.json(
                { success: false, message: 'Invalid email or password' },
                { status: 401 }
            )
        }
        
        // Check password
        const isPasswordValid = await bcrypt.compare(password, admin.password)
        
        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: 'Invalid email or password' },
                { status: 401 }
            )
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
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
        })

        return response
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { success: false, message: 'Server error: ' + error.message },
            { status: 500 }
        )
    }
}
