import React from 'react'

const SubTabelItem = ({email, mongoId,deleteEmail, date}) => {

    const emailDate = new Date(date)
  return (
    <tr className='bg-white border-b text-xs sm:text-sm text-left'>
        <th scope='row' className='px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 whitespace-nowrap text-xs sm:text-sm break-all sm:break-normal'>
        {email? email : 'No Email'}
        </th>
        <td className='px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell'>{emailDate.toDateString()}</td>
        <td className='px-3 sm:px-6 py-3 sm:py-4 cursor-pointer text-center hover:text-red-600 font-bold' onClick={() => { deleteEmail(mongoId) }}>X</td>
      
    </tr>
  )
}

export default SubTabelItem
