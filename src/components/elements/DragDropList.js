import React, { Fragment, useState } from 'react'
import ArrowIcon from './icons/ArrowIcon'

const DragDropList = ({ listItems, ItemTemplate, returnSorting }) => {
    const [items, setItems] = useState(listItems)
    const [draggedOver, setDraggedOver] = useState('')
    const [activeDrag, setActiveDrag] = useState('')

    const allowDrop = (event) => {
        event.preventDefault();
    }

    const reSortData = (event) => {
        event.preventDefault();
        const newIndex = parseInt(draggedOver);
        const oldIndex = parseInt(activeDrag);

        console.log(`Dragging item from index ${oldIndex} to ${newIndex}`);

        if (isNaN(newIndex) || isNaN(oldIndex)) {
            console.error('Invalid indices for re-sorting');
            setActiveDrag('')
            setDraggedOver('')
            return;
        }

        let updatedItems = [...items];
        const [movedItem] = updatedItems.splice(oldIndex, 1);
        updatedItems.splice(newIndex, 0, movedItem);

        console.log('Updated list after sorting:', updatedItems);

        setItems(updatedItems);
        returnSorting(updatedItems);
        setActiveDrag('')
        setDraggedOver('')
    }

    const moveUp = (itemIndex) => {
        if (itemIndex <= 0) return;
        let updatedItems = [...items];
        [updatedItems[itemIndex], updatedItems[itemIndex - 1]] = [updatedItems[itemIndex - 1], updatedItems[itemIndex]];
        setItems(updatedItems);
        returnSorting(updatedItems);
    }

    const moveDown = (itemIndex) => {
        if (itemIndex >= items.length - 1) return;
        let updatedItems = [...items];
        [updatedItems[itemIndex], updatedItems[itemIndex + 1]] = [updatedItems[itemIndex + 1], updatedItems[itemIndex]];
        setItems(updatedItems);
        returnSorting(updatedItems);
    }

    return (
        <div className='w-full'>
            {items.map((data, dataIndex) => (
                <Fragment key={dataIndex}>
                    
                        <div
                            id={dataIndex}
                            onDrop={reSortData}
                            onDragOver={(e) => {
                                setDraggedOver(dataIndex.toString());
                                allowDrop(e);
                            }}
                            className={`py-1 w-full rounded transition duration-300 ${draggedOver === dataIndex.toString() ? 'h-12 border border-dashed border-blue-300 bg-blue-200 bg-opacity-20' : ''}`}
                        />
                    <div
                        draggable="true"
                        className={`block lg:flex flex-row items-center justify-between gap-x-[10px] w-full bg-opacity-40 text-xs py-2 px-1 font-sofia-pro text-gray-500 relative 
                            ${data.selected ? 'bg-blue-200' : ''}
                            ${activeDrag === dataIndex.toString() ? 'bg-blue-100' : ''}
                        `}
                        onDragStart={() => { setActiveDrag(dataIndex.toString()) }}
                        onDragEnd={() => {
                            setActiveDrag('');
                            setDraggedOver('');
                        }}
                    >
                        <div className='w-[20px] flex flex-col items-center justify-between'>
                            {dataIndex > 0 && <button onClick={() => { moveUp(dataIndex) }} className='w-full py-[5px] flex items-center justify-center rounded text-gray-400 hover:text-gray-700 transition duration-200'><ArrowIcon className={`w-4 h-4  -rotate-180`} /></button>}
                            {dataIndex < items.length - 1 && <button onClick={() => { moveDown(dataIndex) }} className='w-full py-[5px] flex items-center justify-center rounded text-gray-400 hover:text-gray-700 transition duration-200'><ArrowIcon className={`w-4 h-4`} /></button>}
                        </div>
                        <ItemTemplate data={data} />
                    </div>
                </Fragment>
            ))}
        </div>
    )
}

export default DragDropList
