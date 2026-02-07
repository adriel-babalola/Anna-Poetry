import { assets } from '@/assets/images/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SidebarLink from './SidebarLink'

const Sidebar = () => {
    return (
        <div className='h-screen sticky top-0 bottom-0 hidden sm:block'>
        <div className='flex flex-col bg-slate-100 '>
            <Link href='/'>
            <div className='px-2 sm:pl-14 py-3 border border-black border-b'>
                <Image src={assets.cover} width={200} alt='' />
            </div>
            </Link>
            <div className='w-80 h-screen sticky top-0 py-12 border border-b-0 '>
                <div className='w-[80%] absolute right-0'>
                    <SidebarLink href='/admin/addProduct' icon={assets.add_icon} label='Add Blogs' />
                    <SidebarLink href='/admin/blogList' icon={assets.blog_icon} label='Blog List' />
                    <SidebarLink href='/admin/subscriptions' icon={assets.email_icon} label='Subscriptions' />
                </div>

            </div>
            </div>
        </div>
    )
}

export default Sidebar
