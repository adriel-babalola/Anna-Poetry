'use client'
import { assets } from '@/assets/images/assets'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const MobileNav = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close menu when route changes
  useEffect(() => {
    return () => setOpen(false)
  }, [pathname])

  const links = [
    { href: '/admin', label: 'Dashboard', icon: assets.add_icon },
    { href: '/admin/addProduct', label: 'Add Poem', icon: assets.add_icon },
    { href: '/admin/blogList', label: 'Blog List', icon: assets.blog_icon },
    { href: '/admin/subscriptions', label: 'Subscribers', icon: assets.email_icon },
  ]

  const isActive = (href) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <div className='sm:hidden'>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className='flex flex-col justify-center items-center w-8 h-8 gap-1.5'
        aria-label='Menu'
      >
        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className='absolute top-full left-0 right-0 bg-white border-b border-black shadow-lg z-40'>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 border-b border-gray-200 text-sm font-medium transition ${
                isActive(link.href)
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Image src={link.icon} alt='' width={20} className={isActive(link.href) ? 'invert' : ''} />
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileNav
