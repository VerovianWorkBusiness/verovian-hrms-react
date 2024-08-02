import React from 'react'
import FolderOpenIcon from './FolderOpenIcon'

const EmptyState = ({emptyStateText}) => {
  return (
    <div className='flex items-center justify-center w-full h-[200px]'>
        <div className='text-center flex flex-col items-center'>
            <FolderOpenIcon className={`w-6 h-6 text-gray-300`} />
            <p className='text-sm text-gray-400 mt-5'>{emptyStateText}</p>
        </div>
    </div>
  )
}

export default EmptyState