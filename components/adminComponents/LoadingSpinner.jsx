import React from 'react'

const LoadingSpinner = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm'>
        <div className='bg-white p-8 rounded-lg shadow-lg'>
          <div className='flex flex-col items-center gap-4'>
            <div className='relative w-12 h-12'>
              <div className='absolute inset-0 border-4 border-gray-200 rounded-full'></div>
              <div className='absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin'></div>
            </div>
            <p className='text-gray-700 font-medium'>Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex items-center justify-center py-12'>
      <div className='flex flex-col items-center gap-4'>
        <div className='relative w-12 h-12'>
          <div className='absolute inset-0 border-4 border-gray-200 rounded-full'></div>
          <div className='absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin'></div>
        </div>
        <p className='text-gray-700 font-medium'>Loading...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
