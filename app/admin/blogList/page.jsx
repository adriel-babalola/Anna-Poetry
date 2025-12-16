'use client'
import axios from 'axios'
import BlogTableItem from '@/components/adminComponents/BlogTableItem'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [blogs, setBlogs] = useState([])

  // 1. Keep fetchBlogs stable
  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog')
      setBlogs(response.data.blogs)
    } catch (error) {
      console.error("Error fetching blogs:", error)
    }
  }, [])

  
  // 2. Wrap deleteBlog in useCallback to prevent child re-renders
  const deleteBlog = useCallback(async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog', {
        params: {
          id: mongoId
        }
      })
      toast.success(response.data.msg)
      fetchBlogs() // Refresh list
    } catch (error) {
      toast.error("Error deleting blog")
    }
  }, [fetchBlogs]) // Depends on fetchBlogs


  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])


  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Blogs</h1>
      <div className='relative h-auto max-h-[80vh] max-w-[990px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>Author Name</th>
              <th scope='col' className='px-6 py-3'>Blog Title</th>
              <th scope='col' className='px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item) => {
              return (
                <BlogTableItem
                  key={item._id} // ✅ FIXED: Use unique ID
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  authorImg={item.authorImg}
                  date={item.date}
                  deleteBlog={deleteBlog}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page