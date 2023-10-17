import React from 'react'
import UserIcon from '../../elements/icons/UserIcon'

const EmployeeSnippet = ({name, phone, email, showIcon}) => {
    return (
      <div className='flex items-center gap-x-3'>
         {showIcon && <UserIcon
          className={`w-[50px] h-[50px] flex items-center justify-center rounded-sm text-[#7e7e7e] border border-[#666] bg-[#eeeeee] p-[10px]`} />}
          <div>
              <p className='font-medium text-gray-600 text-sm mb-[5px]'>{name}</p>
              <p className='text-gray-6400 text-sm'>{email} {phone}</p>
          </div>
      </div>
    )
  }

export default EmployeeSnippet