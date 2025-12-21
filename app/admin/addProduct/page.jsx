'use client'
import { assets } from '@/assets/images/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState, useEffect, dynamic } from 'react'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'

const QuillEditor = dynamic(() => import('@/components/QuillEditor'), { ssr: false })

const Page = () => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Midnight Thoughts",
    author: "Onimisi Anna",
    authorImg: "/profile_rose.jpg"
  })

  useEffect(() => {
    console.log(data);
  }, [data])

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('author', data.author)
    formData.append('authorImg', data.authorImg)
    formData.append('image', image)

    const response = await axios.post('/api/blog', formData)
    if (response.data.success) {
      toast.success(response.data.msg)
      setImage(false)
      setData({
        title: "",
        description: "",
        category: "Midnight Thoughts",
        author: "Onimisi Anna",
        authorImg: "/profile_rose.jpg"
      })

    }
    else {
      toast.error('Error')
    }
  }
  return (
    <>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload Thumbnail</p>
        <label htmlFor="image">
          <Image className='mt-4' alt='' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} height={20} />
        </label>
        <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id="image" hidden required />
        <p className='text-xl mt-4'>Blog Title</p>
        <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border outline-0' type="text" placeholder='Type Here' required />
        <p className='text-xl mt-4'>Blog Description</p>
        <div className='mt-4'>
          <QuillEditor 
            value={data.description} 
            onChange={(content) => setData(data => ({ ...data, description: content }))}
          />
        </div>
        <p className='text-xl mt-4'>Blog Category</p>
        <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
          <option value="Midnight Thoughts">Midnight Thoughts</option>
          <option value="Unfiltered">Unfiltered</option>
          <option value="Healing">Healing</option>
        </select>
        <br />
        <button type='submit' className='my-8 h-12 bg-black text-white w-40'>ADD</button>
      </form>
    </>
  )
}

export default Page
