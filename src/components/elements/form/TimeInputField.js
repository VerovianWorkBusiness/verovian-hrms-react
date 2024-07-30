import React, { useState } from 'react'
import TimeField from 'react-simple-timefield-for-react18-temp';
import TimeIcon from '../icons/TimeIcon';

const TimeInputField = ({inputLabel, fieldId, inputType, hasError, preloadValue,  returnFieldValue}) => {
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
            className={`font-montserrat cursor-text bg-transparent text-xs z-10 font-outfit font-medium transition duration-200  
            ${hasError ? 'text-red-600' : 'text-gray-500'}`}>
                {inputLabel}
            </label>

            <TimeField
                value={fieldValue}                      
                onChange={(event, value) => {setValue(value)}}
                input={<input id={fieldId} type='text' className={`font-montserrat mt-2 outline-none bg-transparent w-full cursor-text border p-3 rounded relative z-0 border-gray-400 placeholder:text-gray-400 placeholder:text-sm focus:border-black ${hasError && 'border-red-600'}`} />}   
                colon=":"                
                showSeconds={false}
            />
            <TimeIcon className='absolute top-[50px] right-4 w-5 h-5 z-50 dark:text-white' />
        </div>
    )
}

export default TimeInputField