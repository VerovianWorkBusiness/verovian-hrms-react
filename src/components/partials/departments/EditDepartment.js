import React, { useState } from 'react'
import TextField from '../../elements/form/TextField';
import TextareaField from '../../elements/form/TextareaField';
import FormButton from '../../elements/form/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR } from '../../../store/types';
import { updateDepartment } from '../../../store/actions/departmentActions';

const EditDepartment = ({department}) => {
  const [departmentPayload, setDepartmentPayload] = useState(department);

  const dispatch = useDispatch()
  const departmentsState = useSelector(state => state.departments)

  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    let errors = {}
      if (!departmentPayload.name || departmentPayload.name === '') {
          errors.name = true
      }

      setValidationErrors(errors)
      return errors
  }
  
  const triggerUpdateDepartment = () => {
    if (Object.values(validateForm()).includes(true)) {
      dispatch({
          type: ERROR,
          error: {response: {data: {
              message: 'Please check the highlighted fields'
          }}}
      });
      return
    }
    dispatch(updateDepartment(departmentPayload._id, departmentPayload))
  }

  return (
    <div>
    <div>
        <div className='my-8 w-full'>
          <TextField
            inputLabel="Department name" 
            fieldId="dept-name" 
            inputType="text" 
            preloadValue={departmentPayload.name || ''}
            hasError={validationErrors.name} 
            returnFieldValue={(value)=>{setDepartmentPayload({...departmentPayload, ...{name: value}})}}
          />
        </div>
        <div className='my-8 w-full'>
          <TextareaField
            inputLabel="Description" 
            fieldId="dept-description" 
            inputType="text" 
            preloadValue={departmentPayload.description || ''}
            hasError={false} 
            returnFieldValue={(value)=>{setDepartmentPayload({...departmentPayload, ...{description: value}})}}
          />
        </div>

        <div className='my-8 flex flex-row-reverse items-center justify-between'>
          <div className='w-full'>
            <FormButton 
              buttonLabel={`Update Department`} 
              buttonAction={()=>{triggerUpdateDepartment()}} 
              processing={departmentsState.creatingDepartments}
            />
          </div>
        </div>
    </div>
  </div>
  )
}

export default EditDepartment