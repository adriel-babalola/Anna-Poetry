import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/model/EmailModel";
import { NextResponse } from "next/server";
import { applyCORS, handleCORSPreflight, verifyCORS } from "@/lib/cors";

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

export async function OPTIONS(request) {
    return handleCORSPreflight(request)
}

export async function POST(request) {
    // Check CORS
    if (!verifyCORS(request)) {
        const response = NextResponse.json(
            { success: false, message: 'CORS policy violation' },
            { status: 403 }
        )
        return applyCORS(response, request.headers.get('origin') || '')
    }

    try {
        const formData = await request.formData();
        const emailData = {
            email:`${formData.get('email')}`,
        }
        await EmailModel.create(emailData);
        
        const response = NextResponse.json({success:true, msg: 'Email Subscribed'})
        return applyCORS(response, request.headers.get('origin') || '')
    } catch (error) {
        console.error('Error:', error);
        const response = NextResponse.json({ success: false, msg: error.message }, { status: 500 })
        return applyCORS(response, request.headers.get('origin') || '')
    }
}

export async function GET(request) {
    // Check CORS
    if (!verifyCORS(request)) {
        const response = NextResponse.json(
            { success: false, message: 'CORS policy violation' },
            { status: 403 }
        )
        return applyCORS(response, request.headers.get('origin') || '')
    }

    try {
        const emails = await EmailModel.find({})
        const response = NextResponse.json({emails})
        return applyCORS(response, request.headers.get('origin') || '')
    } catch (error) {
        console.error('Error:', error);
        const response = NextResponse.json({ success: false, msg: error.message }, { status: 500 })
        return applyCORS(response, request.headers.get('origin') || '')
    }
}

export async function DELETE(request) {
    // Check CORS
    if (!verifyCORS(request)) {
        const response = NextResponse.json(
            { success: false, message: 'CORS policy violation' },
            { status: 403 }
        )
        return applyCORS(response, request.headers.get('origin') || '')
    }

    try {
        const id = await request.nextUrl.searchParams.get('id')
        await EmailModel.findByIdAndDelete(id);
        
        const response = NextResponse.json({success:true, msg: 'Email Deleted' })
        return applyCORS(response, request.headers.get('origin') || '')
    } catch (error) {
        console.error('Error:', error);
        const response = NextResponse.json({ success: false, msg: error.message }, { status: 500 })
        return applyCORS(response, request.headers.get('origin') || '')
    }
}