import React, { useState } from 'react'

const RadioGroup = ({items, inputLabel, returnSelected, hasError, inline, preSelected, disabled}) => {

    const [selectedOption, setSelectedOption] = useState(items.indexOf(preSelected) || null)

    const selectOption = (index, item) => {
        if(disabled) {
            return
        }
        setSelectedOption(index)
        returnSelected(item)
    }

    return (
        <>
            <label 
            className={`font-montserrat cursor-text bg-transparent text-xs z-10 font-outfit font-medium transition duration-200  
            ${hasError ? 'text-red-600' : 'text-gray-500'}`}>
                {inputLabel}
            </label>
            <div className={`${inline && inline === true && 'flex items-center gap-x-4'}`}>
                {items.map((item, itemIndex)=>(
                <button key={itemIndex} onClick={()=>{selectOption(itemIndex, item)}} className={`cursor-pointer flex items-center gap-x-4 my-1 transition duration-200 rounded border hover:bg-verovian-purple hover:bg-opacity-10 px-4 py-3 ${selectedOption === itemIndex ? 'border-verovian-purple bg-verovian-purple bg-opacity-10' : 'border-transparent'} ${inline ? 'w-max' : 'w-full'}`}>
                    <div 
                        className={`flex items-center justify-center rounded-full w-5 h-5 border-4 transition duration-200 cursor-pointer
                            ${selectedOption === itemIndex ? 'bg-verovian-purple border-white' : 'bg-transparent border-black'}
                            ${hasError ? 'border-red-600' : 'border-black'}`
                        }
                    />
                    
                    <label className={`text-sm cursor-pointer ${hasError ? 'text-red-600' : 'text-black'}`}>
                    {item.label}
                    </label>
                </button>
                ))
                }
            </div>
        </>
    )
}

export default RadioGroup