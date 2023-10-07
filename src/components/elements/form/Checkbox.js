import React from 'react'
import CheckIcon from '../icons/CheckIcon'
const Checkbox = ({CheckboxLabel, checkboxToggleFunction, isChecked, hasError}) => {
  return (
    <div className='w-full flex items-center gap-x-4'>
        <button 
            className={`flex items-center justify-center rounded w-12 md:w-8 h-7 border transition duration-200 text-white 
            ${isChecked ? 'bg-blue-500 border-black dark:border-blue-500' : 'bg-transparent border-black dark:border-blue-500'}
            ${hasError ? 'border-red-600' : 'border-black'}`
          } 
          onClick={checkboxToggleFunction}
        >
            {isChecked && <CheckIcon />}
        </button>
        <label className={`${hasError ? 'text-red-600' : 'text-black dark:text-gray-400'}`}>
          {CheckboxLabel}
        </label>
    </div>
  )
}

export default Checkbox