import React from 'react'
import VideoIcon from '../../../elements/icons/VideoIcon'
import AudioIcon from '../../../elements/icons/AudioIcon'
import PhotoIcon from '../../../elements/icons/PhotoIcon'
import TextIcon from '../../../elements/icons/TextIcon'

const MaterialCardHorizontal = ({data}) => {
  return (
    <div className={`flex items-start gap-x-2 mb-2 cursor-pointer w-full`}>
      <div className='w-[80px]'>
        <div className='rounded flex items-center justify-center bg-gray-100 w-[70px] h-[70px]'>
          {data?.content?.contentType === 'VIDEO' && <VideoIcon className={`w-5 h-5 text-gray-500 mt-[5px]`} />}
          {data?.content?.contentType === 'AUDIO' && <AudioIcon className={`w-5 h-5 text-gray-500 mt-[5px]`} />}
          {data?.content?.contentType === 'INFOGRAPHIC' && <PhotoIcon className={`w-5 h-5 text-gray-500 mt-[5px]`} />}
          {(data?.content?.contentType === 'TEXT' || data?.content?.contentType === 'DOCUMENT')  && <TextIcon className={`w-5 h-5 text-gray-500 mt-[5px]`} />}
        </div>
      </div>
      <div className='w-full'>
        <p className='text-sm text-gray-700 font-medium'>{data?.title} <span className='text-xs text-gray-500'>({data?.estimatedTime} minutes)</span></p>
        <div className='my-1 w-[90%]'>
          <p className='text-xs truncate w-[90%]'>{data?.description}</p>
        </div>
        {data.instructor.name && <p className='text-xs text-gray-500'>By {data?.instructor?.name}</p>}
      </div>
    </div>
  )
}

export default MaterialCardHorizontal