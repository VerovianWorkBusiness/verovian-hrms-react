import React, { useState } from 'react'
import {NumericFormat} from 'react-number-format';

const NumberField = ({
    inputLabel, 
    fieldId, 
    inputType, 
    hasError, 
    returnFieldValue, 
    preloadValue, 
    disabled, 
    includeButton, 
    buttonLabel, 
    buttonAction,
    bgClass,
    showPasswordMeter,
    autoFocus,
    maxLength,
    allowDecimal,
    decimalScale
}) => {
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
            className={`font-montserrat cursor-text bg-transparent text-sm z-10 font-outfit font-medium transition duration-200  
            ${hasError ? 'text-red-600' : 'text-gray-500'}`}>
                {inputLabel}
            </label>
            <NumericFormat
                id={fieldId}
                thousandsGroupStyle="thousand"
                value={fieldValue}
                prefix=""
                decimalSeparator="."
                displayType="input"
                type="text"
                maxLength={maxLength}
                thousandSeparator={true}
                allowNegative={false}
                decimalScale={allowDecimal ? decimalScale : 0}
                fixedDecimalScale={true}
                className={`font-montserrat mt-2 text-sm outline-none bg-transparent w-full cursor-text border p-3 rounded relative z-0 border-gray-400 placeholder:text-gray-400 placeholder:text-sm focus:border-black ${hasError && 'border-red-600'}`}
                onValueChange={(values, sourceInfo)=>{setValue(values.floatValue)}}
            />
        </div>
    )

}

export default NumberField