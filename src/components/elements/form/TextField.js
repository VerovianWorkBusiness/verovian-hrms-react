import React, { useState } from 'react'
import EyeIcon from '../icons/EyeIcon'
import EyeOffIcon from '../icons/EyeOffIcon'
import PasswordMeter from './PasswordMeter'

const TextField = ({inputLabel, inputPlaceholder, fieldId, preloadValue, inputType, hasError, returnFieldValue, helperText, disabled, showPasswordMeter, passwordEvaluation}) => {
    const [ fieldValue, setFieldValue ] = useState(preloadValue || '')
    const [ hiddenInput, setHiddenInput ] = useState(true)

    const setValue = (value) => {
        setFieldValue(value)
        returnFieldValue(value)
    }

    return (
        <div 
            className={`w-full relative`} 
        >
            {/* ${isFocused || fieldValue !== '' ? '-translate-y-8' : 'translate-y-0'}   */}
            <label 
            className={`font-montserrat cursor-text bg-transparent text-sm z-10 font-outfit font-medium transition duration-200  
            ${hasError ? 'text-red-600' : 'text-gray-500'}`}>
                {inputLabel}
            </label>
            <input 
                id={fieldId} 
                type={hiddenInput && inputType === 'password' ? inputType : "text"} 
                className={`font-montserrat mt-2 outline-none bg-transparent w-full cursor-text border p-3 rounded relative z-0 border-gray-400 placeholder:text-gray-400 placeholder:text-sm focus:border-black ${hasError && 'border-red-600'}`}
                value={fieldValue}
                disabled={disabled}
                placeholder={inputPlaceholder || ''}
                onChange={(e)=>{setValue(e.target.value)}}
            />

            {inputType === 'password' && 
                <button className='absolute z-40 right-4 top-12 text-gray-400' onClick={()=>{setHiddenInput(!hiddenInput)}}>
                    {hiddenInput ?
                        <EyeIcon />
                    :
                        <EyeOffIcon />
                    }
                </button>
            }

            {inputType==='password' && showPasswordMeter && showPasswordMeter === true && <div className='py-5'>
                <PasswordMeter passwordString={fieldValue} returnEvaluation={(value)=>{passwordEvaluation(value)}} />
            </div>
            }

            {helperText !== '' && 
                <p className='text-sm text-gray-500 my-3'>
                    {helperText}
                </p>
            }
        </div>
    )
}

export default TextField