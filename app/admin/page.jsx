'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { assets } from '@/assets/images/assets'
import Image from 'next/image'

const AdminCard = ({ href, icon, title, description }) => {
  const [clicked, setClicked] = useState(false)
  return (
    <Link href={href} className='group' onClick={() => setClicked(true)}>
      <div className='bg-white border border-black p-6 shadow-[-5px_5px_0px_#000000] hover:shadow-[-8px_8px_0px_#000000] transition duration-200 h-full'>
        <div className='flex items-center gap-3 mb-4'>
          <Image src={icon} alt={title} width={32} />
          <h3 className='text-xl font-bold text-gray-900'>{title}</h3>
          {clicked && (
            <div className='ml-auto w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin' />
          )}
        </div>
        <p className='text-gray-600 text-sm'>{description}</p>
      </div>
    </Link>
  )
}

const page = () => {
  return (
    <div className='flex-1 py-5 px-5 sm:pt-12 sm:pl-16 bg-linear-to-br from-slate-50 to-slate-100 min-h-screen'>
      {/* Welcome Section */}
      <div className='max-w-4xl mb-16'>
        <h1 className='text-5xl sm:text-6xl font-bold text-gray-900 mb-4'>
          Hi Anna
        </h1>
        <p className='text-xl text-gray-700 mb-2'>
          Hope you like it
        </p>
        <div className='w-24 h-1 bg-black mb-6'></div>
        <p className='text-lg text-gray-600 max-w-2xl leading-relaxed'>
          Your poems deserve to be read. This is your space to share your voice with the world. Manage your verses, connect with your readers, and let your poetry shine. Every word you&apos;ve written matters.
        </p>
      </div>

      {/* Quick Start Section */}
      <div className='max-w-4xl'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8'>Get Started</h2>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Add Blog Card */}
          <AdminCard
            href='/admin/addProduct'
            icon={assets.add_icon}
            title='Create Poem'
            description='Write and publish a new poem to share with your audience'
          />

          {/* Blog List Card */}
          <AdminCard
            href='/admin/blogList'
            icon={assets.blog_icon}
            title='All Poems'
            description='View, edit, and manage all your published poems'
          />

          {/* Subscriptions Card */}
          <AdminCard
            href='/admin/subscriptions'
            icon={assets.email_icon}
            title='Subscribers'
            description='Connect with your readers and manage email subscriptions'
          />
        </div>
      </div>

      {/* Personal Message Section */}
      <div className='max-w-4xl mt-16 mb-10 bg-white border border-black p-8 shadow-[-5px_5px_0px_#000000]'>
        <p className='text-gray-700 text-lg'>
          This was supposed to be your birthday present, but hey — better late than never. So consider this a combo gift: happy belated birthday and Merry Christmas! 🎁
        </p>
        <p className='text-gray-600 text-sm mt-4'>— Adriel</p>
      </div>
    </div>
  )
}

export default page
