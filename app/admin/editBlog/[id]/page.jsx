'use client'
import { assets } from '@/assets/images/assets'
import axios from 'axios'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'

const QuillEditor = dynamic(() => import('@/components/QuillEditor'), { ssr: false })

const Page = () => {
  const router = useRouter()
  const params = useParams()
  const blogId = params.id

  const [image, setImage] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Midnight Thoughts",
    author: "Onimisi Anna",
    authorImg: "/profile_rose.jpg",
    image: ""
  })

  // Fetch blog data on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get('/api/blog', {
          params: { id: blogId }
        })
        setData({
          title: response.data.title,
          description: response.data.description,
          category: response.data.category,
          author: response.data.author,
          authorImg: response.data.authorImg,
          image: response.data.image
        })
        setLoading(false)
      } catch (error) {
        console.error("Error fetching blog:", error)
        toast.error("Error loading blog")
        setLoading(false)
      }
    }
    
    if (blogId) {
      fetchBlog()
    }
  }, [blogId])

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('id', blogId)
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('author', data.author)
    formData.append('authorImg', data.authorImg)
    if (image) {
      formData.append('image', image)
    }

    try {
      const response = await axios.put('/api/blog', formData)
      if (response.data.success) {
        toast.success(response.data.msg)
        setTimeout(() => {
          router.push('/admin/blogList')
        }, 800)
      } else {
        toast.error('Error updating blog')
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error updating blog')
    }
  }

  if (loading) {
    return (
      <div className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Loading blog...</p>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className='pt-5 px-4 sm:pt-12 sm:pl-16 pb-8'>
        <p className='text-lg sm:text-xl'>Update Thumbnail</p>
        <label htmlFor="image">
          <Image 
            className='mt-4 cursor-pointer' 
            alt='' 
            src={image ? URL.createObjectURL(image) : data.image} 
            width={140} 
            height={100}
          />
        </label>
        <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id="image" hidden />
        
        <p className='text-lg sm:text-xl mt-4'>Blog Title</p>
        <input 
          name='title' 
          onChange={onChangeHandler} 
          value={data.title} 
          className='w-full max-w-[500px] mt-4 px-4 py-3 border outline-0 text-sm sm:text-base' 
          type="text" 
          placeholder='Type Here' 
          required 
        />
        
        <p className='text-lg sm:text-xl mt-4'>Blog Description</p>
        <div className='mt-4 w-full'>
          <QuillEditor 
            value={data.description} 
            onChange={(content) => setData(data => ({ ...data, description: content }))}
          />
        </div>
        
        <p className='text-lg sm:text-xl mt-4'>Blog Category</p>
        <select 
          name="category" 
          onChange={onChangeHandler} 
          value={data.category} 
          className='w-full max-w-xs mt-4 px-4 py-3 border text-gray-500 text-sm sm:text-base'
        >
          <option value="Midnight Thoughts">Midnight Thoughts</option>
          <option value="Unfiltered">Unfiltered</option>
          <option value="Healing">Healing</option>
        </select>
        <br />
        
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 my-8'>
          <button 
            type='submit' 
            className='h-12 bg-black text-white w-full sm:w-40 hover:bg-gray-800 text-sm sm:text-base'
          >
            UPDATE
          </button>
          <button 
            type='button' 
            onClick={() => router.back()}
            className='h-12 bg-gray-500 text-white w-full sm:w-40 hover:bg-gray-600 text-sm sm:text-base'
          >
            CANCEL
          </button>
        </div>
      </form>
    </>
  )
}

export default Page
