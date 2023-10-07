import React, { useEffect, useState } from 'react'
import {NumericFormat} from 'react-number-format';
import InlinePreloader from '../InlinePreloader';

const CurrencyField = ({
    inputLabel, 
    fieldId, 
    // inputType, 
    hasError, 
    returnFieldValue, 
    preloadValue, 
    disabled, 
    // includeButton, 
    // buttonLabel, 
    // buttonProcessing,
    // buttonAction,
    // bgClass,
    currencySymbol,
    // showPasswordMeter,
    autoFocus
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
            className={`w-full relative`} 
        >
            {/* {fieldValue} */}
            <label 
            className={`cursor-text bg-transparent text-sm z-10 font-outfit font-medium transition duration-200  
            ${hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-500'}`}>
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
                prefix={currencySymbol && currencySymbol !== '' ? currencySymbol : "$"}
                decimalSeparator="."
                displayType="input"
                type="text"
                thousandSeparator={true}
                allowNegative={false}
                decimalScale={2}
                disabled={disabled}
                fixedDecimalScale={true}
                className={`mt-2 outline-none bg-transparent w-full cursor-text border p-4 relative z-0 border-gray-400 dark:border-gray-500 dark:focus:border-gray-500 placeholder:text-gray-400 placeholder:text-sm dark:placeholder:text-gray-600 focus:border-black dark:text-white ${hasError && 'border-red-600 dark:border-red-400'}`}
                onValueChange={(values, sourceInfo)=>{setValue(values.floatValue)}}
            />
            {/* {includeButton && includeButton === true && 
            <button disabled={buttonProcessing} className={`flex items-center justify-center w-24 text-center py-2 text-sm rounded bg-gray-200 text-black absolute z-40 right-4 top-3 hover:bg-black hover:text-white transition duration-200`} onClick={()=>{buttonAction()}}>
               {buttonProcessing && buttonProcessing === true ? <InlinePreloader /> : buttonLabel}
            </button>
            } */}
        </div>
    )
}

export default CurrencyField