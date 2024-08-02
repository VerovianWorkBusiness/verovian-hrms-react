import React, { useEffect } from 'react'
import CloseIconCircled from './icons/CloseIconCircled'

const SuccessMessage = ({toggleClose, messageTitle, messageText}) => {
  useEffect(() => {
    setTimeout(() => {
      toggleClose()
  }, 10000);
    return () => {
      
    };
  }, []);
  return (
    <div className='fixed top-5 left-5 mt-5 w-96 rounded-md text-white p-4 bg-green-700 shadow-lg shadow-green-400/30 transition duration-200 animate__animated animate__fadeIn'  style={{zIndex: '999'}}>
        <button className='absolute -right-8 -top-8' onClick={()=>{toggleClose()}} >
            <CloseIconCircled className={`w-8 h-8 text-green-700`} />
        </button>
        <p className='font-medium text-md'>{messageTitle}</p>
        <p className='text-sm text-white'>
            {messageText}
        </p>

    </div>
  )
}

export default SuccessMessage