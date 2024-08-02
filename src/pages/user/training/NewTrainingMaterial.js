import React, { useEffect, useState } from 'react'
import TrainingsLayout from '../../../components/layout/TrainingsLayout'
import TextField from '../../../components/elements/form/TextField'
import TextareaField from '../../../components/elements/form/TextareaField';
import RadioGroup from '../../../components/elements/form/RadioGroup';
import Wysiwyg from '../../../components/elements/form/Wysiwyg';
import FileUpload from '../../../components/elements/form/FileUpload';
import FormButton from '../../../components/elements/form/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, SET_SUCCESS_MESSAGE } from '../../../store/types';
import { clearCreatedTrainingMaterial, createTrainingMaterial } from '../../../store/actions/trainingsActions';
import SelectField from '../../../components/elements/form/SelectField';
import { fetchDepartments } from '../../../store/actions/departmentActions';
import { getInstructors } from '../../../store/actions/instructorsActions';
import { useNavigate } from 'react-router-dom';
// import TimeInputField from '../../../components/elements/form/TimeInputField';

const NewTrainingMaterial = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const trainingsSelector = useSelector((state => state.trainings))
  const departmentsSelector = useSelector(state => state.departments)
  const instructorsSelector = useSelector(state => state.instructors)

  const [materialPayload, setMaterialPayload] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [content, setContent] = useState({});
  const [file, setFile] = useState(null);

  const formats = {
    'INFOGRAPHIC': ['jpeg', 'jpg', 'png'],
    'VIDEO': ['mp4'],
    'AUDIO': ['mp3', 'wav'],
    'DOCUMENT': ['pdf']
  }

  useEffect(() => {
    dispatch(fetchDepartments())
    dispatch(getInstructors())

    if(trainingsSelector.createdTrainingMaterial !== null){
      dispatch({
        type: SET_SUCCESS_MESSAGE,
        payload: {successMessage: "Training material created successfully"}
      })
      dispatch(clearCreatedTrainingMaterial())
      navigate('/user/trainings/training-materials')
    }
    return () => {
      
    };
  }, [dispatch, navigate, trainingsSelector.createdTrainingMaterial]);

  const [showContent, setShowContent] = useState(false);
  const selectContentType = (type) => {
    setShowContent(false)
    setContent({...content, ...{contentType: type.value}})
    setTimeout(() => {
      setShowContent(true)
    }, 200);
  }

  const validateForm = () => {
    let errors = {}
      if (!materialPayload.title || materialPayload.title === '') {
        errors.title = true
      }
      if (!materialPayload.description || materialPayload.description === '' || materialPayload.description.length > 400) {
        errors.description = true
      }
      if (!content.contentType || content.contentType === '') {
        errors.contentType = true
      }
      if ((!content.content || content.content === '') && !file) {
        errors.content = true
      }
      if (!materialPayload.instructor || materialPayload.instructor === '') {
        errors.instructor = true
      }
      if (!materialPayload.estimatedTime || materialPayload.estimatedTime === '') {
        errors.estTime = true
      }

      setValidationErrors(errors)
      return errors
  }

  const handleUpload = async (file) => {
	  console.log(file)

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

  const pushMaterial = async () => {
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
      ...materialPayload,
      ...{
        content: content
      }
    }

    if(file && fileSource === "UPLOAD") {
      const uploaded = await handleUpload(file)
      payload.content.content = uploaded.data.file
    }

    dispatch(createTrainingMaterial(payload))
  }

  const [fileSource, setFileSource] = useState('UPLOAd');

  return (
    <TrainingsLayout sectionTitle={`New Training Material`}>
      <div className='w-8/12 mb-[100px] px-[20px] pb-[20px] pt-[10px]  bg-white mt-[20px]'>
        <p className='mt-[20px] font-medium text-[15px]'>Material Details</p>
        <p className='text-[14px] '>Please provide training material details below to create a new training material</p>

        <div>
          <div className='w-full'>
            <div className='mb-4 mt-2 w-full'>
              <TextField
                inputLabel="Title" 
                fieldId="material-name" 
                inputType="text" 
                preloadValue={''}
                hasError={validationErrors.title } 
                returnFieldValue={(value)=>{setMaterialPayload({...materialPayload, ...{title: value}})}}
              />
            </div>

            <div className='mb-4 mt-2 w-full'>
              <TextareaField
                inputLabel="Description" 
                fieldId="material-description" 
                inputType="text" 
                preloadValue={''}
                hasError={validationErrors.description} 
                returnFieldValue={(value)=>{setMaterialPayload({...materialPayload, ...{description: value}})}}
              />
              {materialPayload?.description?.length > 400 && <p className='text-xs text-red-500 mt-[10px]'>Description text is too long, please make it 400 characters or less</p>}
            </div>


            {!departmentsSelector.loadingDepartments && departmentsSelector.departments && departmentsSelector.departments.length > 0 && <div className='my-4 w-full'>
              <SelectField
                  selectOptions={departmentsSelector.departments}
                  inputLabel="Select Department"
                  titleField="name"
                  displayImage={false}
                  imageField=""
                  preSelected=''
                  fieldId="designation-department"
                  hasError={false}
                  // return id of accounts of the selected option
                  returnFieldValue={(value) => {setMaterialPayload({...materialPayload, ...{department: value._id}})}}
              />
            </div>}

            <p className='mt-[50px] font-medium text-[15px]'>Instructor and Content</p>
            <p className='text-xs mt-[10px]'>Description text is too long, please make it 240 characters or less</p>

            {!instructorsSelector.loadingInstructors && instructorsSelector?.instructors?.instructors && instructorsSelector?.instructors?.instructors?.length > 0 && <div className='my-4 w-full'>
              <SelectField
                  selectOptions={instructorsSelector?.instructors?.instructors}
                  inputLabel="Select Instructor"
                  titleField="name"
                  displayImage={false}
                  imageField=""
                  preSelected=''
                  fieldId="designation-department"
                  hasError={validationErrors.instructor}
                  // return id of accounts of the selected option
                  returnFieldValue={(value) => {setMaterialPayload({...materialPayload, ...{instructor: value._id}})}}
              />
              <p className='text-xs mt-[10px]'>Select the instructor for this training material above</p>
            </div>}

            <div className='my-4 w-full'>
              {/* <TimeInputField
                inputLabel="Estimated completion time (in minutes)" 
                fieldId="monday-opening-time" 
                preloadValue={''}
                hasError={validationErrors.estTime} 
                returnFieldValue={(value)=>{
                  setMaterialPayload({...materialPayload, ...{estimatedTime: value}})}}
              /> */}
              <TextField
                inputLabel="Estimated completion time (in minutes)" 
                fieldId="instructor-name" 
                inputType="text" 
                preloadValue={''}
                hasError={validationErrors.estTime } 
                returnFieldValue={(value)=>{setMaterialPayload({...materialPayload, ...{estimatedTime: value}})}}
              />
            </div>

            <div className='my-4 w-full'>
              <RadioGroup
                inputLabel="Content type"
                inline={true}
                items={[
                    {label: 'Text', value: 'TEXT'},
                    {label: 'Audio', value: 'AUDIO'},
                    {label: 'Video', value: 'VIDEO'},
                    {label: 'Infographic', value: 'INFOGRAPHIC'},
                    {label: 'Document', value: 'DOCUMENT'},
                ]} 
                hasError={validationErrors.contentType} 
                returnSelected={(value)=>{selectContentType(value)}}
              />
            </div>


            {content.contentType && content.contentType !== '' && showContent && <div className='w-full'>
              {content?.contentType === 'TEXT' && <div className='w-full my-4'>
                <p className='mt-[50px] font-medium text-[15px]'>Text Content</p>
                <p className='text-xs mt-[10px]'>Please provide the text content for this material below</p>
                <div className='borderless long-text'>
                    <Wysiwyg 
                      fieldTitle=""
                      initialValue={content.content || ''}
                      updateValue={(value)=>{setContent({...content, ...{content: value}})}}
                    />
                </div>
              </div>}

              {content?.contentType !== 'TEXT' && <div className='w-full my-4'>
                <p className='mt-[50px] font-medium text-[15px]'><span className='capitalize'>{content.contentType.toLowerCase()}</span> Content</p>
                {content.contentType !== "TEXT" && 
                  <>
                    <p className='text-xs mt-[10px] mb-[20px]'>Please drop your <span className=''>{content.contentType.toLowerCase()}</span> You can add your content from an external url or upload it directly. Please choose an option below.</p>

                    <div className='my-4 w-full'>
                      <RadioGroup
                        inputLabel="File Source"
                        inline={true}
                        items={[
                            {label: 'Upload video', value: 'UPLOAD'},
                            {label: 'Use External link', value: 'URL'},
                        ]} 
                        hasError={false} 
                        returnSelected={(value)=>{setFileSource(value.value)}}
                      />
                    </div>
                  </>
                
                }
                
                {content.contentType !== 'TEXT' && fileSource === 'UPLOAD' &&
                  <>
                    <p className='text-xs mt-[10px] mb-[20px]'>Please drop your <span className=''>{content.contentType.toLowerCase()}</span> content in the box below to upload.</p>
                    <FileUpload
                      hasError={validationErrors.content}
                      noSizeRestrict={true}
                      fieldLabel={`Material ${content.contentType.toLowerCase()}`}
                      returnFileDetails={(details)=>{
                        setFile(details)
                      }}
                      acceptedFormats={formats[content.contentType]}
                    />
                    <label className='block mt-3 text-xs text-gray-400'>Upload the file by clicking above or dropping the file</label>
                  </>
                }
                {content.contentType !== 'TEXT' && fileSource === 'URL' &&
                  <>
                    <p className='text-xs mt-[10px] mb-[20px]'>Paste the source url of your video/audio file here</p>
                    <TextField
                      inputLabel="File URL" 
                      fieldId="file-url" 
                      inputType="text" 
                      preloadValue={''}
                      hasError={validationErrors.content } 
                      returnFieldValue={(value)=>{setContent({...content, ...{content: value}})}}
                    />
                  </>
                }
              </div>
              }
            </div>}


          </div>

          <div className='w-max mt-[40px]'>
            <FormButton buttonLabel={`Create Training Material`} processing={trainingsSelector.creatingTrainingMaterial} buttonAction={()=>{pushMaterial()}} />
          </div>
        </div>
      </div>
    </TrainingsLayout>
  )
}

export default NewTrainingMaterial