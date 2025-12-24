'use client'
import axios from 'axios'
import SubTabelItem from '@/components/adminComponents/SubTabelItem'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {

  const [emails, setEmails] = useState([])

  const fetchEmails = useCallback(async () => {
    const response = await axios.get('/api/email')
    setEmails(response.data.emails)
  }, [])

  useEffect(() => {
    fetchEmails()
  }, [fetchEmails])

  const deleteEmail = async (mongoId) => {
    const response = await axios.delete('/api/email', {
      params: {
        id: mongoId
      }
    })
    if (response.data.success) {
      toast.success(response.data.msg)
      fetchEmails()
    } else {
      toast.error('Error')
    }
  }

  return (
    <div className='flex-1 pt-5 px-4 sm:pt-12 sm:pl-16 pb-8'>
      <h1 className='text-lg sm:text-xl font-bold mb-4'>All Subscriptions</h1>
      <div className="relative w-full max-w-2xl h-auto overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className='w-full text-xs sm:text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-3 py-3'>
                Email Subscription
              </th>
              <th scope='col' className='px-3 py-3 hidden sm:block'>
                Date
              </th>
              <th scope='col' className='px-3 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item, index) => {
              return <SubTabelItem key={index} mongoId={item._id} deleteEmail={deleteEmail} email={item.email} date={item.date} />
            })}

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Page
