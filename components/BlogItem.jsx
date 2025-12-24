import { assets, blog_data } from '@/assets/images/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogItem = ({title, description, category, image, id}) => {
  return (
    <div className='w-full max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000] transition'>

      <Link href={`/blogs/${id}`}>
      <Image src={image} alt='' width={400} height={400} className='border-b h-[200px] object-center object-cover border-black'/>
      </Link>
      <p className='ml-5 mt-5 px-3 inline-block bg-black text-white text-xs sm:text-sm'>{category}</p>

      <div className='p-4 sm:p-5'>
        <h5 className='mb-2 text-base sm:text-lg font-medium tracking-tight text-gray-900 line-clamp-2'>{title}</h5>
        <p className='mb-3 text-xs sm:text-sm tracking-tight text-gray-700' 
        dangerouslySetInnerHTML={{__html:description.slice(0,120)}}>
        </p>
        <Link href={`/blogs/${id}`} className='inline-flex items-center py-2 font-semibold text-center text-xs sm:text-sm'>
          Read more <Image className='ml-2' src={assets.arrow} alt='' width={12}/>
        </Link>
      </div>
    </div>
  )
}

export default BlogItem
