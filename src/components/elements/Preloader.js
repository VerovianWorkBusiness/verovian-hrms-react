import React from 'react'
import InlinePreloader from './InlinePreloader'

const Preloader = ({preloadingText}) => {
  return (
    <div className='flex items-center justify-center w-full h-[200px]'>
        <div className='text-center flex flex-col items-center'>
            <InlinePreloader />
            <p className='text-sm text-gray-400 mt-5'>{preloadingText}</p>
        </div>
    </div>
  )
}

export default Preloader