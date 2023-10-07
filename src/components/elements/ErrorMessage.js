import React from 'react'
import CloseIconCircled from './icons/CloseIconCircled'


const ErrorMessage = ({toggleClose, messageTitle, messageText}) => {
  return (
    <div className='relative rounded-md text-white p-4 bg-red-700 shadow-lg shadow-red-500/30 transition duration-200  animate__animated animate__fadeIn'>
        <button className='absolute -right-8 -top-8' onClick={()=>{toggleClose()}}>
            <CloseIconCircled className={`w-8 h-8 text-red-500`} />
        </button>
        <p className='font-medium text-md'>{messageTitle}</p>
        <p className='text-sm text-white'>
            {messageText}
        </p>

    </div>
  )
}

export default ErrorMessage