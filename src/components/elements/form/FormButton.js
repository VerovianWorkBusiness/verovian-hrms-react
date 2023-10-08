import React from 'react'
import InlinePreloader from '../InlinePreloader'

const FormButton = ({buttonLabel, buttonAction, processing}) => {
  return (
    <button 
      onClick={()=>{buttonAction()}} 
      disabled={processing}
      className='w-full p-4 rounded-md bg-verovian-purple text-verovian-light-purple font-medium hover:bg-[#000] border border-transparent text-md transition duration-200 flex items-center justify-center'>
        {processing ? <InlinePreloader /> : buttonLabel}
      </button>
  )
}

export default FormButton