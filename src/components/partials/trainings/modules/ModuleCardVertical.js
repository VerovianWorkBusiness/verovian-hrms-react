import React from 'react'
import ClockIcon from '../../../elements/icons/ClockIcon'
import ArrowIcon from '../../../elements/icons/ArrowIcon'
import { Link } from 'react-router-dom'

const ModuleCardVertical = ({data, hideLink}) => {
  return (
    <div className='w-full relative'>
        <div className='w-full bg-gray-400 bg-opacity-20 flex items-center justify-center' style={{
            width: '100%',
            height: '200px',
            backgroundImage: `url(${(data.coverImage)}`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            position: 'relative'
        }} />
        <div className='w-full px-[20px] pb-[20px] pt-[5px] relative'>

            <h3 className='text-[15px] mt-[15px] mb-[10px] font-[500]'>{data.title}</h3>
            <div className='flex items-center gap-x-[5px] mb-[10px]'>
                <ClockIcon classes={`w-5 h-5 text-gray-500`} />
                <p className='text-xs text-gray-500'>{data.estimatedTime} minutes</p>
            </div>
            <p className='text-[13px]'>{data.description}</p>

            {!hideLink && <Link to={`/user/trainings/training-modules/module/${data._id}`} className='text-xs text-gray-700 font-[400] flex items-center gap-x-2 hover:text-verovian-purple duration-200 transition mt-3'>See module <ArrowIcon className={`w-4 h-4 -rotate-90`}/></Link>}
        </div>
    </div>
  )
}

export default ModuleCardVertical