import { ConnectDB } from '@/lib/config/db'
import AdminModel from '@/lib/model/AdminModel'
import { NextResponse } from 'next/server'
import { applyCORS, handleCORSPreflight, verifyCORS } from '@/lib/cors'

export async function OPTIONS(request) {
    return handleCORSPreflight(request)
}

export async function GET(req) {
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
        
        const admins = await AdminModel.find({}, { email: 1, name: 1, password: 1 })
        
        const response = NextResponse.json(
            { 
                success: true, 
                count: admins.length,
                admins: admins
            },
            { status: 200 }
        )
        
        return applyCORS(response, req.headers.get('origin') || '')
    } catch (error) {
        console.error('Error:', error)
        const response = NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
        return applyCORS(response, req.headers.get('origin') || '')
    }
}
