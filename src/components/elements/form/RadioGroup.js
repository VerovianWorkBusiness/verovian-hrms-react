import React, { useState } from 'react'

const RadioGroup = ({items, returnSelected, hasError}) => {

    const [selectedOption, setSelectedOption] = useState(null)

    const selectOption = (index, item) => {
        setSelectedOption(index)
        returnSelected(item)
    }

    return (
        <>
            {items.map((item, itemIndex)=>(
            <button key={itemIndex} onClick={()=>{selectOption(itemIndex, item)}} className={`w-full flex items-center gap-x-4 my-1 transition duration-200 rounded hover:bg-verovian-purple hover:bg-opacity-10 px-4 py-3 ${selectedOption === itemIndex ? 'border-verovian-purple' : ''}`}>
                <div 
                        className={`flex items-center justify-center rounded-full w-5 h-5 border-4 transition duration-200 text-whit
                        ${selectedOption === itemIndex ? 'bg-verovian-purple bg-opacity-50' : 'bg-transparent border-black'}
                        ${hasError ? 'border-red-600' : 'border-black'}`
                    } 
                    
                />
                
                <label className={`text-sm ${hasError ? 'text-red-600' : 'text-black'}`}>
                {item.label}
                </label>
            </button>
            ))
            }
        </>
    )
}

export default RadioGroup