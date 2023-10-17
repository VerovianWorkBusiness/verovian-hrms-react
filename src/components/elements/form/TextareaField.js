import React, { useState } from 'react'

const TextareaField = ({inputLabel, inputPlaceholder, fieldId, hasError, returnFieldValue, preloadValue, disabled}) => {
    const [ fieldValue, setFieldValue ] = useState(preloadValue)
 
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

            <textarea 
                id={fieldId} 
                className={`mt-2 rounded outline-none bg-transparent min-h-[200px] h-inherit w-full cursor-text border p-4 relative z-0 border-gray-400  placeholder:text-gray-400 placeholder:text-sm focus:border-black  ${hasError && 'border-red-600 dark:border-red-400'}`} 
                onChange={(e)=>{setValue(e.target.value)}}
                value={fieldValue}
                placeholder={inputPlaceholder || ''}
                disabled={disabled}
                />
        </div>
    )
}

export default TextareaField