import { assets } from '@/assets/images/assets'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const BlogTableItem = ({ authorImg, title, author, date, deleteBlog, mongoId}) => {
  const BlogDate = new Date(date)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteBlog(mongoId)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <tr className='bg-white border-b text-xs sm:text-sm'>
      <th scope='row' className='items-center gap-3 hidden sm:flex px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 whitespace-nowrap'>
        
        <Image className="rounded-full object-center w-8 h-8 sm:w-10 sm:h-10" width={40} height={40} src={authorImg ? authorImg : assets.profile_rose} alt='' />
        <p className='hidden md:block'>{author ? author : 'No Author'}</p>
      </th>
      <td className='px-3 sm:px-6 py-3 sm:py-4 max-w-xs sm:max-w-none truncate sm:truncate-none'>
        {title ? title : 'No Title'}
      </td>
      <td className='px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap'>
        {BlogDate.toDateString()}
      </td>
      <td className='px-3 sm:px-6 py-3 sm:py-4 flex gap-1 sm:gap-2 flex-wrap'>
        <Link href={`/admin/editBlog/${mongoId}`} className='px-2 sm:px-3 py-1 bg-white text-black border text-xs sm:text-sm cursor-pointer hover:bg-gray-800 hover:text-white transition whitespace-nowrap'>
          Edit
        </Link>
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm border whitespace-nowrap transition ${
            isDeleting
              ? 'bg-gray-600 text-white cursor-not-allowed opacity-70'
              : 'bg-black text-white cursor-pointer hover:bg-gray-700'
          }`}
        >
          {isDeleting ? '...' : 'Delete'}
        </button>
      </td>
    </tr>
  )
}

export default BlogTableItem
