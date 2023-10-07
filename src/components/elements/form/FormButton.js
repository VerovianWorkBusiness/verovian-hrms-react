import React from 'react'
import InlinePreloader from '../InlinePreloader'

const FormButton = ({buttonLabel, buttonAction, processing}) => {
  return (
    <button 
      onClick={()=>{buttonAction()}} 
      disabled={processing}
      className='w-full p-3 rounded bg-verovian-purple hover:bg-black border border-transparent dark:hover:bg-kt-navy-dark font-outfit text-white text-md transition duration-200 flex items-center justify-center'>
        {processing ? <InlinePreloader /> : buttonLabel}
      </button>
  )
}

export default FormButton