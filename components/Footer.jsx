import { assets } from '@/assets/images/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex sm:pt-0 pt-6 justify-around flex-col gap-2 right-0 sm:gap-0 sm:flex-row bg-black  items-center'>
      <span className='text-white text-2xl'>TheRealestPoet</span>
      <p className='text-sm text-white '>All right reserved. Copyright @therealestpoet</p>
      <div className='flex items-center gap-4 py-5'>
        {/* Substack Icon */}
        <a href="#" className='flex rounded-full items-center justify-center w-10 h-10 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all'>
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z" />
          </svg>
        </a>

        {/* Instagram Icon */}
        <a href="#" className='flex items-center rounded-full justify-center w-10 h-10 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all'>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        {/* TikTok Icon */}
        <a href="#" className='flex items-center rounded-full justify-center w-10 h-10 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all'>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default Footer
