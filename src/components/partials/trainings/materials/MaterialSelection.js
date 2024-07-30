import React, { useState } from 'react'
import Checkbox from '../../../elements/form/Checkbox'
import FormButton from '../../../elements/form/FormButton';
import VideoIcon from '../../../elements/icons/VideoIcon';
import AudioIcon from '../../../elements/icons/AudioIcon';
import PhotoIcon from '../../../elements/icons/PhotoIcon';
import TextIcon from '../../../elements/icons/TextIcon';

const MaterialSelection = ({materials, selectedMaterials, closeModal}) => {
    const [materialsList, setMaterialsList] = useState(selectedMaterials || []);
    const toggleMaterialSelection = (materialToToggle) => {
        const tempList = [...materialsList]
        const index = tempList.findIndex((material) => 
          material._id === materialToToggle._id
        )
    
        if(index > -1) {
          tempList.splice(index, 1)
        } else {
          tempList.push(materialToToggle)
        }
    
        setMaterialsList(tempList)
      }
    
      const materialSelected = (materialToCheck) => {
        const index = materialsList.findIndex((material) => 
          material._id === materialToCheck._id
        )
        return index > -1
    }
    
        
  return (
    <div>
        <div className='max-h-[500px] overflow-y-scroll scrollbar-hidden'>
        {materials?.length > 0 ? 
          <div className='w-full'>
            {materials?.map((material, materialIndex) => (
              <div key={materialIndex} className={`flex items-start gap-x-2 mb-4 cursor-pointer`} onClick={(()=>{toggleMaterialSelection(material)})}>
                <div className='w-[25px] pt-[5px]'>
                  <Checkbox 
                    isChecked={materialSelected(material)}
                    checkboxToggleFunction={()=>{}}
                    checkboxLabel=''
                  />
                </div>
                <div className='rounded flex items-center justify-center'>
                  {material.content.contentType === 'VIDEO' && <VideoIcon className={`w-5 h-5 text-gray-500 mt-[5px]`} />}
                  {material.content.contentType === 'AUDIO' && <AudioIcon className={`w-5 h-5 text-gray-500 mt-[5px]`} />}
                  {material.content.contentType === 'INFOGRAPHIC' && <PhotoIcon className={`w-5 h-5 text-gray-500 mt-[5px]`} />}
                  {(material.content.contentType === 'TEXT' ||material.content.contentType === 'DOCUMENT')  && <TextIcon className={`w-5 h-5 text-gray-500 mt-[5px]`} />}
                </div>
                <div className='w-full'>
                  <p className='text-sm text-gray-700 font-medium'>{material.title} <span className='text-xs text-gray-500'>({material.estimatedTime} minutes)</span></p>
                  <div className='my-1 max-w-[80%]'>
                    <p className='text-xs truncate'>{material.description}</p>
                  </div>
                  <p className='text-xs text-gray-500'>By {material.instructor.name}</p>
                </div>
              </div>
            ))}
          </div> 
          :
          <div className='p-5 bg-gray-100 rounded-[8px] tex-center'>
            <p className='text-sm text-gray-700 font-[550]'>No materials found</p>
            <p className='mt-1 text-xs text-gray-500'>Navigate to the training materials page and create some materials first.</p>
          </div>  
        } 
      </div>
      <div className='flex flex-row-reverse mt-[20px]'>
        <div className='w-max'>
          <FormButton buttonLabel={`Save Selection`} buttonAction={()=>{closeModal()}} />
        </div>
      </div>
    </div>
  )
}

export default MaterialSelection