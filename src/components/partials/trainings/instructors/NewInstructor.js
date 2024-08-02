import React, { useState } from 'react'
import TextField from '../../../elements/form/TextField'
import TextareaField from '../../../elements/form/TextareaField';
import FileUpload from '../../../elements/form/FileUpload';
import FormButton from '../../../elements/form/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR } from '../../../../store/types';
import { createInstructor } from '../../../../store/actions/instructorsActions';
import RadioGroup from '../../../elements/form/RadioGroup';

const NewInstructor = () => {
  const dispatch = useDispatch()
  const instructorsSelector = useSelector((state => state.instructors))
  const [validationErrors, setValidationErrors] = useState({});
  const [instructorPayload, setInstructorPayload] = useState({});
  const [avatarFile, setAvatarFile] = useState(null)
  const [instructorSocials, setInstructorSocials] = useState({});

  const validateForm = () => {
    let errors = {}
      if (!instructorPayload.name || instructorPayload.name === '') {
        errors.name = true
      }
      if (!instructorPayload.email || instructorPayload.email === '') {
        errors.email = true
      }
      if (!instructorPayload.profession || instructorPayload.profession === '') {
        errors.profession = true
      }
      if (!instructorPayload.about || instructorPayload.about === '' || instructorPayload.about.length > 240) {
        errors.about = true
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

  const pushInstructor = async () => {
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
      ...instructorPayload,
      ...{
        socials: instructorSocials
      }
    }

    if(avatarFile) {
      const uploaded = await handleUpload(avatarFile)
      payload.avatar = uploaded.data.file
    }
	
    dispatch(createInstructor(payload))
  }

  return (
    <div className='w-full'>
      <div className='w-full flex items-start justify-between gap-x-4'>
        <div className='w-full'>
          <div className='mb-4 mt-2 w-full'>
              <TextField
                  inputLabel="Name" 
                  fieldId="instructor-name" 
                  inputType="text" 
                  preloadValue={''}
                  hasError={validationErrors.name } 
                  returnFieldValue={(value)=>{setInstructorPayload({...instructorPayload, ...{name: value}})}}
              />
          </div>
          <div className='my-4 w-full'>
              <TextField
                  inputLabel="Email Address" 
                  fieldId="instructor-email" 
                  inputType="text" 
                  preloadValue={''}
                  hasError={validationErrors.email} 
                  returnFieldValue={(value)=>{setInstructorPayload({...instructorPayload, ...{email: value}})}}
              />
          </div>
          <div className='my-4 w-full'>
              <TextField
                  inputLabel="Profession" 
                  fieldId="instructor-profession" 
                  inputType="text" 
                  preloadValue={''}
                  hasError={validationErrors.profession} 
                  returnFieldValue={(value)=>{setInstructorPayload({...instructorPayload, ...{profession: value}})}}
              />
          </div>
          <div className='my-4 w-full'>
              <TextareaField
                  inputLabel="About" 
                  fieldId="instructor-email" 
                  inputType="text" 
                  preloadValue={''}
                  hasError={validationErrors.name} 
                  returnFieldValue={(value)=>{setInstructorPayload({...instructorPayload, ...{about: value}})}}
              />
              {instructorPayload?.about?.length > 240 && <p className='text-xs text-red-500 mt-[10px]'>About text is too long, please make it 240 characters or less</p>}

          </div>
          <div className='my-4 w-full'>
            <RadioGroup
                inputLabel="Instructor Gender"
                inline={true}
                items={[
                    {label: 'Female', value: 'FEMALE'},
                    {label: 'Male', value: 'MALE'},
                ]} 
                hasError={validationErrors.gender} 
                returnSelected={(value)=>{setInstructorPayload({...instructorPayload, ...{gender: value.value}})}}
            />
          </div>
        </div>
        <div className='w-full'>
          <div className='w-full mb-4'>
            <FileUpload
              hasError={false}
              fieldLabel={`Instructor avatar`}
              returnFileDetails={(details)=>{
                setAvatarFile(details)
              }}
              acceptedFormats={['jpeg', 'jpg', 'png']}
            />
            <label className='block mt-3 text-xs text-gray-400'>Upload the instructor's avatar</label>
          </div>

          <p className='text-sm font-medium text-gray-800 mb-1'>Socials</p>
          <p className='text-sm text-gray-800 mb-4'>Provide instructor social media links below (if available)</p>
          <div className='my-3 w-full'>
              <TextField
                  inputLabel="Twitter" 
                  fieldId="instructor-profession" 
                  inputType="text" 
                  preloadValue={''}
                  hasError={false} 
                  returnFieldValue={(value)=>{setInstructorSocials({...instructorSocials, ...{twitter: value}})}}
              />
          </div>

          <div className='my-3 w-full'>
              <TextField
                  inputLabel="Facebook" 
                  fieldId="instructor-profession" 
                  inputType="text" 
                  preloadValue={''}
                  hasError={false} 
                  returnFieldValue={(value)=>{setInstructorSocials({...instructorSocials, ...{facebook: value}})}}
              />
          </div>

          <div className='my-3 w-full'>
              <TextField
                  inputLabel="Linkedin" 
                  fieldId="instructor-profession" 
                  inputType="text" 
                  preloadValue={''}
                  hasError={false} 
                  returnFieldValue={(value)=>{setInstructorSocials({...instructorSocials, ...{linkedin: value}})}}
              />
          </div>
        </div>
      </div>
      <div className='flex flex-row-reverse mt-[10px]'>
            <div className='w-max'>
              <FormButton buttonLabel={`Create Instructor`} processing={instructorsSelector.creatingInstructor} buttonAction={()=>{pushInstructor()}} />
            </div>
      </div>
    </div>
  )
}

export default NewInstructor