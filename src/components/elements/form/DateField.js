import React, { useState } from 'react'

const DateField = ({inputLabel, fieldId, disabled, hasError, preloadValue, returnFieldValue}) => {
    const [ fieldValue, setFieldValue ] = useState(preloadValue || '')

    const setValue = (value) => {
        setFieldValue(value)
        returnFieldValue(value)
    }

    return (
        <div 
            className={`w-full relative`} 
        >
            <label 
            className={`cursor-text bg-transparent text-sm z-10 font-outfit font-medium transition duration-200  
            ${hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-500'}`}>
                {inputLabel}
            </label>
            <input 
                id={fieldId} 
                type="date" 
                className={`mt-2 text-sm outline-none bg-transparent w-full cursor-text border p-3 relative z-0 border-gray-400 dark:border-gray-500 dark:focus:border-gray-500 placeholder:text-gray-400 placeholder:text-sm dark:placeholder:text-gray-600 focus:border-black dark:text-white ${hasError && 'border-red-600 dark:border-red-400'}`}
                onChange={(e)=>{setValue(e.target.value)}}
                value={fieldValue}
                disabled={disabled}
            />
        </div>
    )
}

export default DateField