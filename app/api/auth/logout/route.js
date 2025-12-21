import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const response = NextResponse.json(
            { success: true, message: 'Logout successful' },
            { status: 200 }
        )
        
        response.cookies.set('adminToken', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        
        return response
    } catch (error) {
        console.error('Logout error:', error)
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        )
    }
}
