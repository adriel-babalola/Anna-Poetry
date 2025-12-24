import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/model/BlogModel";
import { writeFile } from "fs/promises";
import { applyCORS, handleCORSPreflight, verifyCORS } from "@/lib/cors";
const { NextResponse } = require("next/server");
const fs = require('fs/promises')

let isConnected = false;

const LoadDB = async () => {
    if (!isConnected) {
        try {
            await ConnectDB();
            isConnected = true;
        } catch (error) {
            console.error('Database connection failed:', error);
            throw error;
        }
    }
}

export async function OPTIONS(request) {
    return handleCORSPreflight(request)
}

// API End Point to get all Blogs
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
        await LoadDB();
        const blogId = request.nextUrl.searchParams.get('id')
        const response = blogId 
            ? NextResponse.json(await BlogModel.findById(blogId))
            : NextResponse.json({ blogs: await BlogModel.find({}) })
        
        return applyCORS(response, request.headers.get('origin') || '')
    } catch (error) {
        console.error('Error fetching blogs:', error);
        const response = NextResponse.json({ error: error.message }, { status: 500 })
        return applyCORS(response, request.headers.get('origin') || '')
    }
}

// API EndPoint for uploading Blogs
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
        await LoadDB();

        const formData = await request.formData()
        const timeStamp = Date.now();

        const image = formData.get('image');
        const imageByteData = await image.arrayBuffer()
        const buffer = Buffer.from(imageByteData)
        const path = `./public/${timeStamp}_${image.name}`

        await writeFile(path, buffer);

        const imgUrl = `/${timeStamp}_${image.name}`

        const blogData = {
            title: `${formData.get('title')}`,
            description: `${formData.get('description')}`,
            category: `${formData.get('category')}`,
            author: `${formData.get('author')}`,
            image: `${imgUrl}`,
            authorImg: `${formData.get('authorImg')}`
        }

        await BlogModel.create(blogData)

        console.log('blog saved')

        const response = NextResponse.json({ success: true, msg: 'Blog Added' })
        return applyCORS(response, request.headers.get('origin') || '')
    } catch (error) {
        console.error('Error:', error);
        const response = NextResponse.json({ success: false, msg: error.message }, { status: 500 })
        return applyCORS(response, request.headers.get('origin') || '')
    }
}

// API Endpoint for updating Blogs
export async function PUT(request) {
    // Check CORS
    if (!verifyCORS(request)) {
        const response = NextResponse.json(
            { success: false, message: 'CORS policy violation' },
            { status: 403 }
        )
        return applyCORS(response, request.headers.get('origin') || '')
    }

    try {
        await LoadDB();

        const formData = await request.formData()
        const blogId = formData.get('id')
        
        const blog = await BlogModel.findById(blogId)
        
        let imgUrl = blog.image // Keep existing image by default

        // Check if new image is provided
        const image = formData.get('image')
        if (image && image.size > 0) {
            // Delete old image
            fs.unlink(`./public${blog.image}`, () => {})
            
            // Save new image
            const timeStamp = Date.now();
            const imageByteData = await image.arrayBuffer()
            const buffer = Buffer.from(imageByteData)
            const path = `./public/${timeStamp}_${image.name}`

            await writeFile(path, buffer);
            imgUrl = `/${timeStamp}_${image.name}`
        }

        const blogData = {
            title: `${formData.get('title')}`,
            description: `${formData.get('description')}`,
            category: `${formData.get('category')}`,
            author: `${formData.get('author')}`,
            image: `${imgUrl}`,
            authorImg: `${formData.get('authorImg')}`
        }

        await BlogModel.findByIdAndUpdate(blogId, blogData)

        console.log('blog updated')

        const response = NextResponse.json({ success: true, msg: 'Blog Updated' })
        return applyCORS(response, request.headers.get('origin') || '')
    } catch (error) {
        console.error('Error:', error);
        const response = NextResponse.json({ success: false, msg: error.message }, { status: 500 })
        return applyCORS(response, request.headers.get('origin') || '')
    }
}

// Creating API EndpOINT TO DELETE BLOG
export async function DELETE(request){
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
        const blog = await BlogModel.findById(id);

        fs.unlink(`./public${blog.image}`, () => {})
        await BlogModel.findByIdAndDelete(id)
        
        const response = NextResponse.json({msg: 'Blog Deleted'})
        return applyCORS(response, request.headers.get('origin') || '')
    } catch (error) {
        console.error('Error:', error);
        const response = NextResponse.json({ success: false, msg: error.message }, { status: 500 })
        return applyCORS(response, request.headers.get('origin') || '')
    }
}