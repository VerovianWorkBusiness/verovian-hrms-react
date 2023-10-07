/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import TwoWayChevronIcon from '../icons/TwoWayChevronIcon';
import { UseOutsideClickCloser } from '../UseOutsideClickCloser';

const AutocompleteSelect = ({
    selectOptions, 
    inputLabel, 
    displayImage, 
    imageField, 
    titleField, 
    preSelected, 
    preSelectedLabel,
    hasError, 
    returnFieldValue,
    disabled,
    conditionalItemStyling,
    inputPlaceholder,
    displayInitialsIcon
}) => {
    const [activeValue, setActiveValue] = useState(preSelected)
    const [visibleOptions, setVisibleOptions] = useState(selectOptions)
    const [optionsOpen, setOptionsOpen] = useState(false)

    useEffect(() => {
        const preSelect = () => {
            if(!preSelected || preSelected === undefined) {
                return
            }
    
            selectOptions.forEach((option) => {
                if (option[preSelectedLabel] && option[preSelectedLabel] === preSelected) {
                    setActiveValue(option[titleField])
                }
            })
        }
        preSelect()
    
    }, [preSelected, preSelectedLabel, selectOptions, titleField])

    // const [ isFocused, setIsFocused ] = useState(false)
    // // const [ fieldValue, setFieldValue ] = useState(value || '')

    // const focusField = () => {
    //     if(disabled) {return}
    //     setIsFocused(true)
    //     // document.getElementById(fieldId).focus()
    // }

    const openOptions = () => {
        if(disabled) {return}
        setOptionsOpen(true)
    }

    const closeOptions = () => {
        setOptionsOpen(false)
    }

    const filterOptions = (term) => {
        const filtered = selectOptions.filter((option)=> {
            if (titleField && titleField !== '') {
                return option[titleField].toLowerCase().includes(term.toLowerCase())
            } else {
                return option.toLowerCase().includes(term.toLowerCase())
            }
        })
        setActiveValue(term)
        setVisibleOptions(filtered)
    }

    const changeActiveValue = (value, object) => {
        setActiveValue(value)
        returnFieldValue(object)
        closeOptions()
    }

    const wrapperRef = useRef(null);
    UseOutsideClickCloser(wrapperRef, closeOptions);

    return (
        // <div className='w-full relative'>
        <div ref={wrapperRef} className='relative w-full'>

            <label 
            className={`cursor-text bg-transparent text-sm z-10 font-outfit font-medium transition duration-200  
            ${hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-500'}`}>
                {inputLabel}
            </label>
            <input 
                type={"text"} 
                className={`mt-2 outline-none bg-transparent w-full cursor-text border p-4 relative z-0 border-gray-400 dark:border-gray-500 dark:focus:border-gray-500 placeholder:text-gray-400 placeholder:text-sm dark:placeholder:text-gray-600 focus:border-black dark:text-white ${hasError && 'border-red-600 dark:border-red-400'}`}
                disabled={disabled}
                onClick={()=>{openOptions()}} 
                onChange={(e)=>{filterOptions(e.target.value)}}
                placeholder={inputPlaceholder || ''}
                value={activeValue} 
            />
                <button onClick={()=>{openOptions()}} className='absolute top-[55px] right-3'>
                    <TwoWayChevronIcon className="w-5 h-5 text-black" />
                </button>

            {optionsOpen &&
                <div className='absolute top-24 w-full left-0 py-3 border dark:border-none dark:bg-[#010103] scrollbar-hidden overflow-y-scroll pt-10 z-40' style={{maxHeight: '550px', paddingBottom:'25px'}}>
                    <button className='absolute top-3 right-3 text-gray-600 hover:text-gray-400 transition duration-200' onClick={()=>{closeOptions()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className='relative'>
                        {visibleOptions.map((option, optionIndex) => (
                            <button key={optionIndex} 
                                className={
                                    `capitalize relative w-full px-5 py-4 my-1 flex flex-row items-center gap-x-3 text-sm transition duration-200 hover:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-80
                                    ${conditionalItemStyling && option[conditionalItemStyling.conditionTriggerKey] == true 
                                        ? conditionalItemStyling.classes 
                                        : 'text-gray-500'}`
                                } 
                                
                                onClick={()=>{changeActiveValue(titleField !== '' ? option[titleField] : option, option)}}
                            >

                                {displayImage && 
                                    <img alt="" src={option[imageField]} className='w-8' />
                                }

                                {displayInitialsIcon && 
                                    <div className={`w-[40px] h-[40px] rounded-md flex items-center mt-[5px] mr-4 justify-center bg-kt-orange`}>
                                        {titleField !== '' && option[titleField].split(' ').length > 1 && <h1 className='font-medium text-white dark:text-kt-navy-dark'>
                                            { option[titleField].split(' ')[0].charAt(0)}{ option[titleField].split(' ')[1].charAt(0)}
                                        </h1>}
                                        {titleField === '' && option.split(' ').length > 1 && <h1 className='font-medium text-white dark:text-kt-navy-dark'>
                                            { option.split(' ')[0].charAt(0)}{ option.split(' ')[1].charAt(0)}
                                        </h1>}
                                    </div>
                                }

                                {titleField !== '' ? option[titleField].toLowerCase() : option.toLowerCase()}

                            </button>
                        ))}

                    </div>
                </div>
            }

        </div>
    )
}

AutocompleteSelect.propTypes = {
    selectOptions: PropTypes.array.isRequired,
    inputLabel: PropTypes.string.isRequired,
    titleField: PropTypes.string.isRequired,
    displayImage: PropTypes.bool.isRequired,
    imageField: PropTypes.string,
    fieldId: PropTypes.string.isRequired,
    hasError: PropTypes.bool,
    includeButton: PropTypes.bool,
    buttonLabel: PropTypes.string,
    buttonAction: PropTypes.func,
    returnFieldValue: PropTypes.func.isRequired
};

export default AutocompleteSelect
