'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useCallback, useRef } from 'react'

const NavigationProgress = () => {
  const pathname = usePathname()
  const barRef = useRef(null)
  const timerRef = useRef(null)
  const activeRef = useRef(false)

  const finish = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (barRef.current) {
      barRef.current.style.width = '100%'
      setTimeout(() => {
        if (barRef.current) {
          barRef.current.parentElement.style.display = 'none'
          barRef.current.style.width = '0%'
        }
        activeRef.current = false
      }, 300)
    }
  }, [])

  // Finish on route change
  useEffect(() => {
    if (activeRef.current) {
      finish()
    }
  }, [pathname, finish])

  // Listen for link clicks
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('http') || href.startsWith('#') || href === pathname) return

      activeRef.current = true
      if (barRef.current) {
        barRef.current.parentElement.style.display = 'block'
        barRef.current.style.width = '20%'
      }

      if (timerRef.current) clearInterval(timerRef.current)
      let p = 20
      timerRef.current = setInterval(() => {
        p += Math.random() * 15
        if (p > 90) p = 90
        if (barRef.current) barRef.current.style.width = p + '%'
      }, 300)
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [pathname])

  return (
    <div className='fixed top-0 left-0 right-0 z-100 h-1 bg-gray-200' style={{ display: 'none' }}>
      <div
        ref={barRef}
        className='h-full bg-black transition-all duration-300 ease-out'
        style={{ width: '0%' }}
      />
    </div>
  )
}

export default NavigationProgress
