import { assets } from '@/assets/images/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Header = () => {
  const [email, setEmail] = useState('')
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email)

    const response = await axios.post('/api/email', formData)
    if (response.data.success) {
      toast.success(response.data.msg)
      setEmail('')
    } else {
      toast.error('Error')
    }
  }

  return (
    <div className='py-5 px-4 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center gap-2'>
        <Image src={assets.cover} width={255} alt='logo' className='w-45 sm:w-35 md:w-auto mt-2'/>
       <button className='flex items-center gap-2 font-medium text-sm sm:text-sm py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]'> Get Started <Image src={assets.arrow} alt='arrow' className='hidden sm:inline'/></button>
      </div>

      <div className='text-center mt-20 sm:mt-20 mb-5'>
        <h1 className='text-2xl sm:text-4xl md:text-5xl font-medium'>The Realest Lines Live Here</h1>
        <p className='mt-6 sm:mt-10 max-w-185 mx-auto text-xs sm:text-sm md:text-base px-2'>&quot;Humanity is so adaptable... Truly amazing, what people can get used to, as long as there are a few compensations.&quot; <i>[The Handmaid&quot;s Tale]</i> </p>
        <form onSubmit={onSubmitHandler} className='flex sm:flex-row justify-between max-w-125 mx-auto mt-8 sm:mt-10 border border-black shadow-[-7px_7px_0px_#000000]' action="">
          <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Enter your email' className='pl-4 py-2 sm:py-4 outline-none text-sm'/>
          <button type='submit' className='border-t-0 border-l border-black py-2 sm:py-4 px-3 sm:px-8 active:bg-gray-600 active:text-white text-sm sm:text-sm'>Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Header
