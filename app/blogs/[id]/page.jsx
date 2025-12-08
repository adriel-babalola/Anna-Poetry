'use client'
import { assets, blog_data } from '@/assets/images/assets'
import React from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation' // 1. Import useParams
import Footer from '@/components/Footer'
import Link from 'next/link'


const Page = () => { // 2. Remove 'async' and capitalize component name 'Page'

  const params = useParams(); // 3. Get params using the hook
  const id = params.id; // Get the ID

  // 4. Find the blog post directly (no need for useState or useEffect)
  const data = blog_data.find((blog) => blog.id === Number(id));

  // Optional: Handle case where data isn't found
  if (!data) {
    return <div>Blog post not found</div>
  }

  return (data ? <>
    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Link href='/'>
        <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' />
        </Link>
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>Get Started
          <Image src={assets.arrow} alt='' />
        </button>
      </div>

      <div className='text-center my-24 '>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
        <Image src={data.author_img} className='mx-auto mt-6 border border-white rounded-full ' width={60} height={60} alt='' />
        <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
      </div>


    </div>
    <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
      <Image className='border-4 border-white' src={data.image} alt='' width={1280} height={720} />
      <h1 className='my-8 text-[26px] font-semibold'>Introduction : </h1>
      <p>{data.description}</p>
      <h3 className='my-5 text-[18px] font-semibold'>Step 1 : Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
      <p className='my-3'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae laborum rem quasi ducimus ratione eveniet aliquid libero voluptate maiores unde, dolorem sequi labore tempora dolore fuga adipisci maxime, expedita eius.</p>
      <p className='my-3'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae laborum rem quasi ducimus ratione eveniet aliquid libero voluptate maiores unde, dolorem sequi labore tempora dolore fuga adipisci maxime, expedita eius.</p>
      <h3 className='my-5 text-[18px] font-semibold'>Step 2 : Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
      <p className='my-3'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae laborum rem quasi ducimus ratione eveniet aliquid libero voluptate maiores unde, dolorem sequi labore tempora dolore fuga adipisci maxime, expedita eius.</p>
      <p className='my-3'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae laborum rem quasi ducimus ratione eveniet aliquid libero voluptate maiores unde, dolorem sequi labore tempora dolore fuga adipisci maxime, expedita eius.</p>
      <h3 className='my-5 text-[18px] font-semibold'>Step 3 : Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
      <p className='my-3'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae laborum rem quasi ducimus ratione eveniet aliquid libero voluptate maiores unde, dolorem sequi labore tempora dolore fuga adipisci maxime, expedita eius.</p>
      <p className='my-3'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae laborum rem quasi ducimus ratione eveniet aliquid libero voluptate maiores unde, dolorem sequi labore tempora dolore fuga adipisci maxime, expedita eius.</p>
    <h3 className='my-5 text-[18px] font-semibold'>Conclusion: </h3>
      <p className='my-3'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla ea magnam architecto iste accusamus vitae cumque at natus, dolores voluptate ducimus sunt magni odio debitis quas fuga voluptatibus adipisci omnis! Beatae laborum rem quasi ducimus ratione eveniet aliquid libero voluptate maiores unde, dolorem sequi labore tempora dolore fuga adipisci maxime, expedita eius.</p>
   

   <div className='my-24'>
    <p className='text-black font font-semibold my-4'>Share this article on social media</p>
    <div className='flex'>
      <Image src={assets.facebook_icon} width={50} alt=''/>
      <Image src={assets.twitter_icon} width={50} alt=''/>
      <Image src={assets.googleplus_icon} width={50} alt=''/>
    </div>
   </div>
    </div>
    <Footer />
  </> : <></>
  )
}

export default Page