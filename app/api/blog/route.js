import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/model/BlogModel";
import { writeFile } from "fs/promises";
const { NextResponse } = require("next/server");
const fs = require('fs/promises')

let isConnected = false;

const LoadDB = async () => {
    if (!isConnected) {
        await ConnectDB();
        isConnected = true;
    }
}
// API End Point to get all Blogs
export async function GET(request) {
    try {
        await LoadDB();
        const blogId = request.nextUrl.searchParams.get('id')
        if (blogId) {
            const blog = await BlogModel.findById(blogId)
            return NextResponse.json(blog)
        } else {
            const blogs = await BlogModel.find({})
            return NextResponse.json({ blogs })
        }
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// API EndPoint for uploading Blogs
export async function POST(request) {
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

        return NextResponse.json({ success: true, msg: 'Blog Added' })
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, msg: error.message }, { status: 500 })
    }
}

// API Endpoint for updating Blogs
export async function PUT(request) {
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

        return NextResponse.json({ success: true, msg: 'Blog Updated' })
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, msg: error.message }, { status: 500 })
    }
}

// Creating API EndpOINT TO DELETE BLOG
export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get('id')
    const blog = await BlogModel.findById(id);

    fs.unlink(`./public${blog.image}`, () => {})
    await BlogModel.findByIdAndDelete(id)
    return NextResponse.json({msg: 'Blog Deleted'})   
}