import React, { useState } from 'react'
import VideoIcon from '../../../elements/icons/VideoIcon'
import AudioIcon from '../../../elements/icons/AudioIcon'
import TextIcon from '../../../elements/icons/TextIcon'
import ArrowIcon from '../../../elements/icons/ArrowIcon'
import ClockIcon from '../../../elements/icons/ClockIcon'
import PhotoIcon from '../../../elements/icons/PhotoIcon'
import ModalLayout from '../../../layout/ModalLayout'
import VideoPlayer from '../../../elements/VideoPlayer'
import AudioPlayer from '../../../elements/AudoPlayer'

const MaterialCardVertical = ({material}) => {
    const [materialOpen, setMaterialOpen] = useState(false);
    return (
        <>
            <div className='w-full relative'>
                <div className='w-full h-[150px] bg-gray-400 bg-opacity-20 flex items-center justify-center'>
                    {material.content.contentType === 'VIDEO' && <VideoIcon className={`w-8 h-8 text-gray-300`} />}
                    {material.content.contentType === 'AUDIO' && <AudioIcon className={`w-8 h-8 text-gray-300`} />}
                    {material.content.contentType === 'INFOGRAPHIC' && <PhotoIcon className={`w-8 h-8 text-gray-300`} />}
                    {(material.content.contentType === 'TEXT' ||material.content.contentType === 'DOCUMENT')  && <TextIcon className={`w-8 h-8 text-gray-300`} />}
                </div>
                <div className='w-full px-[20px] pb-[20px] pt-[5px] relative'>

                    <div className='flex items-center gap-x-[10px] my-[10px]'>
                        <div className='w-[45px]'>
                            <div className='w-[40px] h-[40px] rounded-full' 
                                style={{
                                    backgroundImage: `url(${material.instructor.avatar})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }} 
                            />
                        </div>
                        <div className='w-full'>
                            <h3 className='text-black text-[14px]'>{material.instructor.name}</h3>
                            <p className='text-[12px] my-[2px]'>{material.instructor.email}</p>
                        </div>
                    </div>
                    <h3 className='text-[15px] mt-[15px] mb-[10px]'>{material.title}</h3>
                    <div className='flex items-center gap-x-[5px] mb-[10px]'>
                        <ClockIcon classes={`w-5 h-5 text-gray-500`} />
                        <p className='text-xs text-gray-500'>{material.estimatedTime} minutes</p>
                    </div>
                    <p className='text-[13px]'>{material.description}</p>

                    <button onClick={()=>{setMaterialOpen(true)}} className='text-sm text-gray-700 font-[500] flex items-center gap-x-2 hover:text-verovian-purple duration-200 transition mt-3'>See material <ArrowIcon className={`w-4 h-4 -rotate-90`}/></button>


                    
                </div>
            </div>

            <ModalLayout
                isOpen={materialOpen} 
                closeModal={()=>{setMaterialOpen(false)}} 
                actionFunction={()=>{}} 
                actionFunctionLabel='Create instructor' 
                dialogTitle='Create a new instructor'
                dialogIntro={`Provide instructor details below to create a new instructor profile`}
                maxWidthClass='max-w-7xl'
            >
                {/* <NewInstructor /> */}
                {material.content.contentType === 'VIDEO' && <VideoPlayer videoSrc={material.content.content} /> }
                {material.content.contentType === 'AUDIO' && <AudioPlayer audioSrc={material.content.content} /> }

            </ModalLayout>
        </>
    )
}

export default MaterialCardVertical