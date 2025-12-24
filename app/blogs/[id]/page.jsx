'use client'
import { assets, blog_data } from '@/assets/images/assets'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import axios from 'axios'


const Page = () => { 
  const params = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.get('/api/blog',{
                  params: {
                    id:params.id
                  }
                });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogData();
    }, [params.id]); 


  return (data ? <>
    <div className='bg-gray-200 py-5 px-4 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center gap-2'>
        <Link href='/'>
          <Image src={assets.cover} width={255} alt='logo' className='w-[120px] sm:w-[140px] md:w-auto mt-2'/>
        {/* <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' /> */}
        </Link>
        <button className='flex items-center gap-2 font-medium text-xs sm:text-sm py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>Get Started
          <Image src={assets.arrow} alt='' />
        </button>
      </div>

      <div className='text-center my-12 sm:my-24 '>
        <h1 className='text-2xl sm:text-4xl md:text-5xl font-semibold max-w-[700px] mx-auto px-2'>{data.title}</h1>
        <Image src={data.authorImg} className='mx-auto mt-4 sm:mt-6 border w-12 h-12 sm:w-15 sm:h-15 border-white rounded-full' width={60} height={60} alt='' />
        <p className='mt-1 pb-2 text-sm sm:text-lg max-w-[740px] mx-auto'>{data.author}</p>
      </div>


    </div>
    <div className='mx-4 sm:mx-5 max-w-[800px] md:mx-auto mt-[-50px] sm:mt-[-100px] mb-10 pb-8'>
      <Image className='border-4 border-white h-auto sm:h-100 object-center object-cover' src={data.image} alt='' width={1000} height={300} priority loading="eager" />

      <div className='blog-content text-sm sm:text-base' dangerouslySetInnerHTML={{__html:data.description}}></div>
    
   <div className='mb-24 -mt-5'>
    <p className='text-black font-semibold my-4 text-sm sm:text-base'>Share this article on social media</p>
    <div className='flex items-center gap-3 sm:gap-4 py-5 flex-wrap'>
        {/* Substack Icon */}
        <a href="#" className='flex rounded-full items-center justify-center w-9 h-9 sm:w-10 sm:h-10 border-2 border-black bg-white shadow-[-3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] transition-all'>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z" />
          </svg>
        </a>

        {/* Instagram Icon */}
        <a href="#" className='flex items-center rounded-full justify-center w-9 h-9 sm:w-10 sm:h-10 border-2 border-black bg-white shadow-[-3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] transition-all'>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        {/* TikTok Icon */}
        <a href="#" className='flex items-center rounded-full justify-center w-9 h-9 sm:w-10 sm:h-10 border-2 border-black bg-white shadow-[-3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] transition-all'>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
          </svg>
        </a>
      </div>
   </div>
    </div>
    <Footer />
  </> : <></>
  )
}

export default Page