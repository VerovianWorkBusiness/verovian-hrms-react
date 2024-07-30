import React, { useEffect, useState } from 'react'
import TrainingsLayout from '../../../../components/layout/TrainingsLayout'
import TextField from '../../../../components/elements/form/TextField';
import TextareaField from '../../../../components/elements/form/TextareaField';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, SET_SUCCESS_MESSAGE } from '../../../../store/types';
import { clearCreatedTrainingModule, createTrainingModule, getTrainingMaterials } from '../../../../store/actions/trainingsActions';
import FormButton from '../../../../components/elements/form/FormButton';
import FileUpload from '../../../../components/elements/form/FileUpload';
import DragDropList from '../../../../components/elements/DragDropList';
import PlusIcon from '../../../../components/elements/icons/PlusIcon';
import MaterialCardHorizontal from '../../../../components/partials/trainings/materials/MaterialCardHorizontal';
import ModalLayout from '../../../../components/layout/ModalLayout';
import Checkbox from '../../../../components/elements/form/Checkbox';
import TextIcon from '../../../../components/elements/icons/TextIcon';
import PhotoIcon from '../../../../components/elements/icons/PhotoIcon';
import AudioIcon from '../../../../components/elements/icons/AudioIcon';
import VideoIcon from '../../../../components/elements/icons/VideoIcon';
import { useNavigate } from 'react-router-dom';

const NewTrainingModule = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const trainingsSelector = useSelector((state => state.trainings))
  const [modulePayload, setModulePayload] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [materialsList, setMaterialsList] = useState([]);

  useEffect(() => {
    dispatch(getTrainingMaterials())

    if(trainingsSelector.createdTrainingModule !== null){
      dispatch({
        type: SET_SUCCESS_MESSAGE,
        payload: {successMessage: "Training module created successfully"}
      })
      dispatch(clearCreatedTrainingModule())
      navigate('/user/trainings/training-modules')
    }
    return () => {
      
    };
  }, [dispatch, navigate, trainingsSelector.createdTrainingModule]);

  const [addingMaterials, setAddingMaterials] = useState(false);

  const validateForm = () => {
    let errors = {}
      if (!modulePayload.title || modulePayload.title === '') {
        errors.title = true
      }
      if (!modulePayload.description || modulePayload.description === '' || modulePayload.description.length > 400) {
        errors.description = true
      }
      if (!materialsList || materialsList.length === 0) {
        errors.estTime = true
      }

      setValidationErrors(errors)
      return errors
  }

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const handleUpload = async (file) => {
    setUploading(true)

	  var formData = new FormData()
	  formData.append('file', file.file )
	  const headers = new Headers();

	  try {
		  const doUpload = await fetch(`${process.env.REACT_APP_API_URL}/files/new`, {
			  method: "POST",
			  headers,
			  body: formData,
		  });
		  const response = await doUpload.json();
  
		 return response
	  } catch (error) {
		  dispatch({
			  type: ERROR,
			  error,
		  });
	  }
  }

  const pushModule = async () => {
    if (Object.values(validateForm()).includes(true)) {
      dispatch({
          type: ERROR,
          error: {response: {data: {
              message: 'Please check the highlighted fields'
          }}}
      });
      return
    }

    const payload = {
      ...modulePayload,
      ...{
        materials: materialsList.map((material, materialIndex) => {return {
          order: materialIndex,
          material: material._id
        }})
      }
    }

    if(file) {
      const uploaded = await handleUpload(file)
      payload.coverImage = uploaded.data.file
    }

    dispatch(createTrainingModule(payload))
    setUploading(false)
  }

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
    <>
      <TrainingsLayout sectionTitle={`New Training Module`}>
        <div className='w-8/12 max-w-[60%] mb-[100px] px-[20px] pb-[20px] pt-[10px] bg-white mt-[20px]'>
          <p className='mt-[20px] font-medium text-[15px]'>Module Details</p>
          <p className='text-[12px] mt-2'>Please provide training module details below to create a new module</p>

          <div>
            <div className='w-full max-w-[100%]'>
              <div className='mb-4 mt-2 w-full'>
                <TextField
                  inputLabel="Title" 
                  fieldId="material-name" 
                  inputType="text" 
                  preloadValue={''}
                  hasError={validationErrors.title } 
                  returnFieldValue={(value)=>{setModulePayload({...modulePayload, ...{title: value}})}}
                />
              </div>

              <div className='mb-4 mt-2 w-full'>
                <TextareaField
                  inputLabel="Description" 
                  fieldId="material-description" 
                  inputType="text" 
                  preloadValue={''}
                  hasError={validationErrors.description} 
                  returnFieldValue={(value)=>{setModulePayload({...modulePayload, ...{description: value}})}}
                />
                {modulePayload?.description?.length > 400 && <p className='text-xs text-red-500 mt-[10px]'>Description text is too long, please make it 400 characters or less</p>}
              </div>

              <>
                {/* <p className='text-xs mt-[10px] mb-[20px]'>Please drop your <span className=''>{content.contentType.toLowerCase()}</span> content in the box below to upload.</p> */}
                <FileUpload
                  hasError={validationErrors.content}
                  noSizeRestrict={true}
                  fieldLabel={`Add a cover image for this module`}
                  returnFileDetails={(details)=>{
                    setFile(details)
                  }}
                  acceptedFormats={['jpeg', 'jpg', 'png']}
                />
                <label className='block mt-3 text-xs text-gray-400'>Upload the file by clicking above or dropping the file</label>
              </>
            </div>

            <p className='mt-[20px] font-medium text-[15px]'>Module Content</p>
            <p className='text-[12px] mt-2'>Add materials required for this training module. You can drag the materials to place them in the order you want your employees to use them</p>

            <div className='p-5 border border-gray-200 rounded-[8px] mt-4 max-w-[100%]'>
              {materialsList && materialsList.length > 0 && <DragDropList listItems={materialsList} returnSorting={(list)=>{setMaterialsList(list)}} ItemTemplate={MaterialCardHorizontal} />}
              <button onClick={()=>{setAddingMaterials(true)}} className='rounded-[8px] mt-[12px] p-3 border border-dashed border-gray-300 w-full text-xs text-gray-400 text-center hover:border-gray-600 hover:text-gray-600 transition duration-200'>
                <span className='flex items-center justify-center gap-x-[5px] uppercase tracking-[0.2em] '>
                  <PlusIcon className={`w-5 h-5`} />
                  add new material
                </span>
                click to add a new training material
              </button>
            </div>
          </div>

          <div className='w-max mt-[40px]'>
            <FormButton buttonLabel={`Create Training Module`} processing={trainingsSelector.creatingTrainingMaterial} buttonAction={()=>{pushModule()}} />
          </div>
        </div>
      </TrainingsLayout>

      <ModalLayout
        isOpen={addingMaterials} 
        closeModal={()=>{setAddingMaterials(false)}} 
        actionFunction={()=>{}} 
        actionFunctionLabel='Add materials' 
        dialogTitle='Add materials'
        dialogIntro={`Select the materials required for this module below`}
        maxWidthClass='max-w-xl'
      >
      <div className='max-h-[500px] overflow-y-scroll scrollbar-hidden'>
        {trainingsSelector.trainingMaterials?.materials?.length > 0 ? 
          <div className='w-full'>
            {trainingsSelector.trainingMaterials?.materials?.map((material, materialIndex) => (
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
          <FormButton buttonLabel={`Save Selection`} buttonAction={()=>{setAddingMaterials(false)}} processing={uploading || trainingsSelector.creatingTrainingModule} />
        </div>
      </div>
      </ModalLayout>
    </>
  )
}

export default NewTrainingModule