'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const SidebarLink = ({ href, icon, label }) => {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href + '/')
  const [navigating, setNavigating] = useState(false)

  // When pathname changes, navigation is done
  useEffect(() => {
    return () => setNavigating(false)
  }, [pathname])

  const handleClick = () => {
    if (!isActive) {
      setNavigating(true)
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`flex items-center border border-black gap-3 font-medium px-3 py-2 transition-all duration-200 ${
        label !== 'Add Blogs' ? 'mt-5' : ''
      } ${
        isActive
          ? 'bg-black text-white shadow-[-5px_5px_0px_#444444]'
          : 'bg-white shadow-[-5px_5px_0px_#000000] hover:bg-gray-100'
      }`}
    >
      <Image src={icon} alt='' width={28} className={isActive ? 'invert' : ''} />
      <p>{label}</p>
      {navigating && !isActive && (
        <div className='ml-auto w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin' />
      )}
    </Link>
  )
}

export default SidebarLink
