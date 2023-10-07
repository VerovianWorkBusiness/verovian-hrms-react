import React, { useEffect, useState } from 'react'
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
  // const toCurrency = (number) => {
    //     const formatter = new Intl.NumberFormat("sv-SE", {
    //       style: "decimal",
    //       currency: "SEK"
    //     });
      
    //     return formatter.format(number);
    // }

    const [ isFocused, setIsFocused ] = useState(false)
    const [ fieldValue, setFieldValue ] = useState(preloadValue)
    // const [displayValue, setDisplayValue] = useState('')
    // const id = generateCode(12)

    // const [fieldId, setFieldId] = useState(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const focusField = () => {
        setIsFocused(true)
        document.getElementById(fieldId).focus()
    }

    useEffect(() => {
    //   setFieldValue(preloadValue)
        if (autoFocus && autoFocus === true) {
            focusField()
        }
    // eslint-disable-next-line no-use-before-define
    }, [autoFocus, focusField])

    // const isNumeric = (str) => {
    //     return /^\d+$/.test(str)
    // }

    // const [plainValue, setPlainValue] = useState(0)

    const setValue = (value) => {
        setFieldValue(value)
        returnFieldValue(value)
    }

    // const formatNumber = () => {
    //     console.log('...formatting', fieldValue.split(','))
    //     const formatted = plainValue.toLocaleString()
    //     console.log(formatted)
    //     // setFieldValue( parseInt(fieldValue.split(',').join()).toLocaleString())
    // }

    return (
        <div 
            className={`w-full cursor-text border rounded p-4 relative z-0 ${isFocused || fieldValue !== '' ? 'border-black' : 'border-black'} ${hasError && 'border-red-600'}`} 
            onClick={()=>{focusField()}} 
            onBlur={()=>{setIsFocused(false)}}
        >
            {/* {fieldValue} */}
            <label 
                className={`text-sm lg:text-md cursor-text z-10 absolute top-3 left-4 px-3 py-1 transition duration-200  
                ${isFocused || fieldValue !== '' ? '-translate-y-8' : 'translate-y-0'}
                ${bgClass && bgClass !== '' ? bgClass : 'bg-white'}  
                ${hasError ? 'text-red-600' : 'text-gray-500'}`}
            >
                {inputLabel}
            </label>

            {/* <input 
                id={fieldId} 
                type="text" 
                className={`z-30 border-transparent bg-transparent outline-none w-full`} 
                onFocus={()=>{setIsFocused(true)}} 
                onChange={(e)=>{setValue(e.target.value)}}
                // onKeyUp={()=>{formatNumber()}}
                value={fieldValue}
                disabled={disabled}
            /> */}

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
                className="z-30 border-transparent bg-transparent outline-none w-full"
                onValueChange={(values, sourceInfo)=>{setValue(values.floatValue)}}
            />
        </div>
    )

}

export default NumberField