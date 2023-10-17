import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'; 
// import HorizontalMenuIcon  from '../../assets/images/icons/horizontal-menu-icon.svg'
import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'
import DotsVertical from './icons/DotsVertical';
import ChevronIcon from './icons/ChevronIcon';

const DataTable = ({
    tableData, 
    tableHeaders, 
    columnWidths, 
    columnDataStyles, 
    allFields, 
    onSelectItems, 
    tableOptions, 
    pagination,
    updatePerPage,
    changePage,
    expandedIndex,
    expansion
}) => {

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let { styles, attributes } = usePopper(referenceElement, popperElement)

    const [allItems, setAllItems] = useState([])
    const [selectedItemsCount, setSelectedItemsCount] = useState(0)

    useEffect(() => {
        setAllItems(tableData)
    }, []);
    

    const toggleAllSelection = () => {
        let newItems = allItems
        newItems.forEach((singleItem, index) => {
            if (selectedItemsCount > 1) {
                singleItem.selected = false
            } else {
                singleItem.selected = true
            }
        })

        const itemsCount = newItems.filter((item) => {
            return item.selected;
        }).length

        setSelectedItemsCount(itemsCount)

        onSelectItems(itemsCount)
        setAllItems(newItems)
    }

    const toggleSelection = (itemIndex) => {
        let newItems = allItems
        newItems.forEach((singleItem, index) => {
            if (index === itemIndex ) {
                singleItem.selected = !singleItem.selected
            }
        })

        const itemsCount = newItems.filter((item) => {
            return item.selected;
        }).length

        setSelectedItemsCount(itemsCount)

        onSelectItems(itemsCount)
        setAllItems(newItems)
    }

    const fieldIsSelected = (fieldName) => {
        let isSelected = false
        allFields.forEach((field) => {
            if(field.name === fieldName && field.selected) {
                isSelected = true
            }
        })
        return isSelected
    }

    const performRowAction = (index) => {
        if(!tableOptions.clickableRows || tableOptions.clickableRows === false) {
            return
        }
        tableOptions.rowAction(index.toString())
    }
    

    const previousPage = () => {
        if(pagination.currentPage > 1) {
            changePage(pagination.currentPage - 1)
        }
    }

    const nextPage = () => {
        let pages = Math.ceil(pagination.totalItems / pagination.perPage)
        if(pagination.currentPage < pages) {
            changePage(pagination.currentPage + 1)
        }
    }

    const changePerPage = (input) => {
        let pages = Math.ceil(pagination.totalItems / pagination.perPage)
        console.log(pages)
        updatePerPage(input)
    }

    const changeCurrentPage = (input) => {
        let pages = Math.ceil(pagination.totalItems / pagination.perPage)
        if(!input || input === 0 || input > pages) {
            return
        }
        changePage(input)
    }

    const lastPage = () => {
        changePage(Math.ceil(pagination.totalItems / pagination.perPage))
    }
    
    const firstPage = () => {
        changePage(1)
    }

    const perPageOptions = [
        25, 50, 75, 100
    ]
    
    return (
        <Fragment>
            {/* Table */}
            {!tableData || tableData.length === 0 ? 

                <div className='px-44 py-4'>
                    <p className="p-5 w-full text-xs text-center bg-black bg-opacity-20 rounded-lg mt-8">Sorry, no data available at the moment</p>
                </div>

                :
                
                <div className="pt-2">
                    {/* table header */}
                    <ul className="bg-primary flex flex-row justify-between items-center w-full bg-transparent bg-opacity-40 text-xs mt-1 px-3 py-1 relative font-medium">
                       {/* <li className="w-1/12" />  */}
                        {tableOptions.selectable && <input type="checkbox" className="mr-2 absolute left-1" onChange={()=>{toggleAllSelection()}} checked={tableData.length === selectedItemsCount} />}
                        {tableHeaders.map((header, headerIndex) => (
                            !header.forPopover && fieldIsSelected(header.columnDisplayName) &&
                            <li className={`${columnWidths[header.column]} flex flex-row items-center uppercase justify-between ml-2`} key={headerIndex} >
                                {header.columnDisplayName}
                                {header.sortable && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                                </svg>}
                            </li> 
                        ))}
                        <span className="absolute right-1">
                            <Popover className="relative">
                                <Popover.Button 
                                    ref={setReferenceElement}
                                >
                                    {/* <img alt="" src={DotsVertical} className="transform rotate-90 w-4" /> */}
                                    <DotsVertical classes="h-6 w-6" />
                                </Popover.Button>

                                <Popover.Panel 
                                    ref={setPopperElement}
                                    style={styles.popper}
                                    {...attributes.popper} 
                                    className="absolute z-10"
                                >
                                    <div className="bg-primary p-4 shadow-md border rounded border-secondary mt-3">
                                        {/* {allFields.map((field, fieldIndex) => )} */}
                                        <p className="font-medium text-gray-400 text-sm pb-2 mb-2 border-b border-gray-200 text-center">All Fields</p>

                                        {allFields.map((field, fieldIndex) => (
                                            <div className="flex flex-row justify-between w-36 items-center my-2" key={fieldIndex}>
                                                <p className="text-xs">{field.name} </p>
                                                <input type="checkbox" checked={field.selected} className="mr-2" />
                                            </div>
                                        ))}
                                    </div>

                                </Popover.Panel>
                            </Popover>
                        </span>
                    </ul>

                    {/* Table rows */}
                    {allItems.map((data, dataIndex) => (
                        <Fragment key={dataIndex} >
                            {/* {dataIndex} == {expandedIndex} */}
                            <ul className={`border 
                                ${tableOptions.dark && tableOptions.dark === true ? 'bg-gray-700 text-gray-100' : 'bg-opacity-40'} rounded 
                                ${tableOptions.expandable && tableOptions.expandable === true ? 'cursor-pointer transition duration-200 hover:bg-gray-100 hover:bg-opacity-50' : ''}
                                ${expandedIndex === dataIndex.toString() ? 'border-blue-700' : 'border-gray-200'} 
                                 text-sm mt-3 font-sofia-pro text-gray-500 relative 
                                ${data.selected ? 'bg-black bg-opacity-20' : ''}`}  
                                onClick={()=>{performRowAction(dataIndex)}}
                            >
                                <div className='px-2 py-3 flex flex-row items-center w-full bg-[#fff]'>
                                    {tableOptions.selectable ? <input type="checkbox" onChange={()=>toggleSelection(dataIndex)} checked={data.selected} className="mr-2" /> : <span className="inline-block mr-5" />}
                                    {tableHeaders.map((header, headerIndex) => (
                                        !header.forPopover && fieldIsSelected(header.columnDisplayName) &&                                  
                                        <li key={headerIndex} className={`${columnWidths[header.column]}`} >
                                            <span className='w-full flex flex-row items-center block'>
                                                <span className={columnDataStyles[header.column] && columnDataStyles[header.column].isConditional ? columnDataStyles[header.column].conditionals[data[header.column]] : columnDataStyles[header.column]}>
                                                    {header.columnDataType === 'image' &&
                                                    <img src={data[header.column]} alt="" />
                                                    }

                                                    {/* {header.columnDataType === 'link' &&
                                                    <Link href={data[header.column]} alt="" className="text-ink-navy font-medium"> {data[header.column]} </Link>
                                                    } */}

                                                    {header.columnDataType === 'text' &&
                                                    <div> {data[header.column]} </div>
                                                    }

                                                    {header.columnDataType === 'JSX' &&
                                                    <div> {data[header.column]} </div>
                                                    }

                                                    {header.columnDataType === 'popoverTrigger' &&
                                                    <button> {data[header.column]} </button>
                                                    }
                                                </span>
                                            </span>
                                            
                                        </li>
                                    ))}
                                    {tableOptions.expandable && tableOptions.expandable === true && 
                                        <ChevronIcon className={`absolute right-[15px] top-[35px] w-4 h-4 transform transition duration-200 ${expandedIndex === dataIndex.toString() ? 'rotate-180 text-blue-700' : ''}`} 
                                    />}
                                </div>
                                {/* Expansion */}
                                {expandedIndex === dataIndex.toString() &&
                                    <>
                                        {expansion}
                                    </>
                                }
                            </ul>

                            
                        </Fragment>
                    ))}

                    {pagination && <div className='w-full flex flex-row items-center justify-between py-5 mt-5'>
                        <div className='flex flex-row items-center gap-x-2'>
                            <button onClick={()=>{firstPage()}} className='rounded bg-secondary text-accent py-2 px-4 transition duration-200 hover:bg-opacity-30'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                </svg>
                            </button>
                            <button onClick={()=>{previousPage()}} className='rounded bg-secondary text-accent py-2 px-4 transition duration-200 hover:bg-opacity-30'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        </div>

                        <div className='flex flex-row gap-x-2 items-center'>
                            <p className='text-accent text-xs'>Page</p>
                            <input type='number' className='text-xs p-2 border rounded border-secondary w-12 focus:border-blue-700 bg-transparent text-gray-500 focus:outline-none' onChange={(e)=>{changeCurrentPage(e.target.value)}} value={pagination.currentPage} /> 
                            <p className='text-accent text-xs'>of {Math.ceil(pagination.totalItems / pagination.perPage)}</p>
                        </div>
                        
                        <div className='flex flex-row items-center gap-x-2'>
                            <div className='flex flex-row gap-x-2 items-center mr-3'>
                                <p className='text-accent text-xs'>Items per page:</p>
                                <select value={pagination.perPage} onChange={(e)=>{changePerPage(e.target.value)}} className='text-xs p-2 border rounded border-secondary w-20 focus:border-blue-700 bg-transparent text-gray-500 focus:outline-none'>
                                    {perPageOptions.map((option, optionIndex)=>(
                                        <option key={optionIndex} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={()=>{nextPage()}} className='rounded bg-secondary text-accent py-2 px-4 transition duration-200 hover:bg-opacity-30'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button onClick={()=>{lastPage()}} className='rounded bg-secondary text-accent py-2 px-4 transition duration-200 hover:bg-opacity-30'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>}
                </div>
            }
        </Fragment>
    )
}

DataTable.propTypes = {
    tableData: PropTypes.array.isRequired,
    tableHeaders: PropTypes.array.isRequired,
    allFields: PropTypes.array.isRequired,
    columnWidths: PropTypes.object.isRequired,
    columnDataStyles: PropTypes.object,
    expandable: PropTypes.bool,

    // element: PropTypes.arrayOf(PropTypes.element).isRequired
  };

export default DataTable
