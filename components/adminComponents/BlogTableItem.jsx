import { assets } from '@/assets/images/assets'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const BlogTableItem = ({ authorImg, title, author, date, deleteBlog, mongoId}) => {
const BlogDate = new Date(date)

  return (
    <tr className='bg-white border-b'>
      <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        
        <Image className="rounded-full object-center w-10 h-10" width={40} height={40} src={authorImg ? authorImg : assets.profile_rose} alt='' />
        <p>{author ? author : 'No Author'}</p>
      </th>
      <td className='px-6 py-4'>
        {title ? title : 'No Title'}
      </td>
      <td className='px-6 py-4'>
        {BlogDate.toDateString()}
      </td>
      <td className='px-6 py-4 flex gap-2'>
        <Link href={`/admin/editBlog/${mongoId}`} className='px-3 py-1  bg-white text-black border text-sm cursor-pointer hover:bg-gray-800 hover:text-white transition'>
          Edit
        </Link>
        <button onClick={() => { deleteBlog(mongoId) }} className='px-3 py-1 bg-black text-white border text-sm cursor-pointer hover:bg-gray-700 transition'>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default BlogTableItem
