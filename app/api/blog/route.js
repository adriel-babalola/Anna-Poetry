import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/model/BlogModel";
import { writeFile } from "fs/promises";
const { NextResponse } = require("next/server");

let isConnected = false;

const LoadDB = async () => {
    if (!isConnected) {
        await ConnectDB();
        isConnected = true;
    }
}

// API End Point to get all Blogs
export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get('id')
    
    const blogs = await BlogModel.find({})
    return NextResponse.json({blogs})  
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

        return NextResponse.json({success: true, msg: 'Blog Added'})
    } catch(error) {
        console.error('Error:', error);
        return NextResponse.json({success: false, msg: error.message}, {status: 500})
    }
}