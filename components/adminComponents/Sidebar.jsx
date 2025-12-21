import { assets } from '@/assets/images/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <div className='h-screen sticky top-0 bottom-0'>
        <div className='flex flex-col bg-slate-100 '>
            <Link href='/'>
            <div className='px-2 sm:pl-14 py-3 border border-black border-b'>
                <Image src={assets.cover} width={200} alt='' />
            </div>
            </Link>
            <div className='w-28 sm:w-80 h-screen sticky top-0 py-12 border border-b-0 '>
                <div className='w-[50%] sm:w-[80%] absolute right-0'>
                    <Link href='/admin/addProduct' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <Image src={assets.add_icon} alt='' width={28} /> <p>Add Blogs</p>
                    </Link>
                    <Link href='/admin/blogList' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <Image src={assets.blog_icon} alt='' width={28} /> <p>Blog List</p>
                    </Link>
                    <Link href='/admin/subscriptions' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <Image src={assets.email_icon} alt='' width={28} /> <p>Subscrptions</p>
                    </Link>
                </div>

            </div>
            </div>
        </div>
    )
}

export default Sidebar
