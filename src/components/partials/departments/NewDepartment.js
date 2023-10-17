import React, { useState } from 'react'
import TextField from '../../elements/form/TextField'
import TextareaField from '../../elements/form/TextareaField'
import FormButton from '../../elements/form/FormButton'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR } from '../../../store/types'
import { createDepartment } from '../../../store/actions/departmentActions'

const NewDepartment = () => {
  const dispatch = useDispatch()
  const departmentsState = useSelector(state => state.departments)

  const [departmentPayload, setDepartmentPayload] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    let errors = {}
      if (!departmentPayload.name || departmentPayload.email === '') {
          errors.name = true
      }

      setValidationErrors(errors)
      return errors
  }
  
  const triggerCreateDepartment = () => {
    if (Object.values(validateForm()).includes(true)) {
      dispatch({
          type: ERROR,
          error: {response: {data: {
              message: 'Please check the highlighted fields'
          }}}
      });
      return
    }
    dispatch(createDepartment(departmentPayload))
  }

  return (
    <div>
      <div>
          <div className='my-8 w-full'>
            <TextField
              inputLabel="Department name" 
              fieldId="dept-name" 
              inputType="text" 
              preloadValue={''}
              hasError={validationErrors.name} 
              returnFieldValue={(value)=>{setDepartmentPayload({...departmentPayload, ...{name: value}})}}
            />
          </div>
          <div className='my-8 w-full'>
            <TextareaField
              inputLabel="Description" 
              fieldId="dept-description" 
              inputType="text" 
              preloadValue={''}
              hasError={false} 
              returnFieldValue={(value)=>{setDepartmentPayload({...departmentPayload, ...{description: value}})}}
            />
          </div>

          <div className='my-8 flex flex-row-reverse items-center justify-between'>
            <div className='w-full'>
              <FormButton 
                buttonLabel={`Create Department`} 
                buttonAction={()=>{triggerCreateDepartment()}} 
                processing={departmentsState.creatingDepartments}
              />
            </div>
          </div>
      </div>
    </div>
  )
}

export default NewDepartment