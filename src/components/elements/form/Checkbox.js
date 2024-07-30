import React from 'react'
import CheckIcon from '../icons/CheckIcon'
const Checkbox = ({checkboxLabel, checkboxToggleFunction, isChecked, hasError}) => {
  return (
    <div className='w-full flex items-center gap-x-4'>
      <div className='w-[20px]'>
          <button 
              className={`flex items-center justify-center rounded w-[18px] h-[18px] border transition duration-200 text-white 
              ${isChecked ? 'bg-verovian-purple border-verovian-purple' : 'bg-transparent border-verovian-purple'}
              ${hasError ? 'border-red-600' : 'border-verovian-purple'}`
            } 
            onClick={checkboxToggleFunction}
          >
              {isChecked && <CheckIcon />}
          </button>
      </div>
      <label className={`${hasError ? 'text-red-600' : 'text-gray-600'} text-sm`}>
        {checkboxLabel}
      </label>
    </div>
  )
}

export default Checkbox