import React, { Fragment, useState } from 'react'

const DragDropList = ({listItems, ItemTemplate, returnSorting}) => {

    const [draggedOver, setDraggedOver] = useState('')
    const [activeDrag, setActiveDrag] = useState('')

    const allowDrop = (event) => {
        event.preventDefault();
    }

    const reSortData = () => {
        let newIndex = draggedOver
        let oldIndex = activeDrag

        if (!newIndex) {
            setActiveDrag('')
            setDraggedOver('')
        }

        if (newIndex >= listItems.length) {
            var k = newIndex - listItems.length + 1;
            while (k--) {
                listItems.push(undefined);
            }
        }
        listItems.splice(newIndex, 0, listItems.splice(oldIndex, 1)[0]);

        setActiveDrag('')
        setDraggedOver('')
        // return arr; // for testing
        // console.log('re-sorted......')
        returnSorting(listItems)
    }

  return (
    <div className='w-full'>
        {listItems.map((data, dataIndex) => (
            // {tableOptions.sortable && tableOp}

            <Fragment key={dataIndex}>
                {dataIndex > 0 && <div 
                    id={dataIndex} 
                    onDrop={(e)=>{reSortData(e)}} 
                    onDragOver={(e)=>{
                        setDraggedOver(dataIndex)
                        allowDrop(e)
                    }}
                    className={`py-1 w-full rounded transition duration-300 ${draggedOver === dataIndex ? 'h-12 border border-dashed border-blue-300 bg-blue-200 bg-opacity-20' : ''}`}
                />}
                <div
                    draggable="true" 
                    className={
                        `block lg:flex flex-row items-center justify-between w-full bg-opacity-40 text-xs py-2 px-1 font-sofia-pro text-gray-500 relative 
                        ${data.selected ? 'bg-blue-200' : ''}
                        ${activeDrag === dataIndex ? 'bg-blue-100' : ''}
                        `} 
                    // key={dataIndex}
                    onDragStart={()=>{setActiveDrag(dataIndex)}}
                    onDragEnd={()=>{
                        // setActiveDrag('')
                        // setDraggedOver('')
                    }}
                >
                    <ItemTemplate data={data} />
                </div>
            </Fragment>
            ))}
    </div>
  )
}

export default DragDropList