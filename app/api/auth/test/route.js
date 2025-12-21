import { ConnectDB } from '@/lib/config/db'
import AdminModel from '@/lib/model/AdminModel'
import { NextResponse } from 'next/server'

export async function GET(req) {
    try {
        await ConnectDB()
        
        const admins = await AdminModel.find({}, { email: 1, name: 1, password: 1 })
        
        return NextResponse.json(
            { 
                success: true, 
                count: admins.length,
                admins: admins
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}
