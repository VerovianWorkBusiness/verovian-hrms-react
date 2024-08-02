import React, { useState } from 'react'
import TextField from '../../elements/form/TextField'
import TextareaField from '../../elements/form/TextareaField'
import FormButton from '../../elements/form/FormButton'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR } from '../../../store/types'
import SelectField from '../../elements/form/SelectField'
import { createGroup } from '../../../store/actions/groupActions'

const NewGroup = () => {
    const dispatch = useDispatch()
    const departmentsState = useSelector(state => state.departments)
    const groupsState = useSelector(state => state.groups)

    const [groupPayload, setGroupPayload] = useState({});
    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        let errors = {}
        if (!groupPayload.name || groupPayload.name === '') {
            errors.name = true
        }

        setValidationErrors(errors)
        return errors
    }
    
    const triggerCreateDesignation = () => {
        if (Object.values(validateForm()).includes(true)) {
            dispatch({
                type: ERROR,
                error: {response: {data: {
                    message: 'Please check the highlighted fields'
                }}}
            });
            return
        }
        dispatch(createGroup(groupPayload))
    }
    return (
        <div>
            <div>
                <div className='my-8 w-full'>
                    <TextField
                        inputLabel="Group name" 
                        fieldId="group-name" 
                        inputType="text" 
                        preloadValue={''}
                        hasError={validationErrors.name} 
                        returnFieldValue={(value)=>{setGroupPayload({...groupPayload, ...{name: value}})}}
                    />
                </div>
                <div className='mt-3 w-full'>
                    <SelectField
                        selectOptions={departmentsState.departments}
                        inputLabel="Select Department"
                        titleField="name"
                        displayImage={false}
                        imageField=""
                        preSelected=''
                        fieldId="designation-department"
                        hasError={false}
                        // return id of accounts of the selected option
                        returnFieldValue={(value) => {setGroupPayload({...groupPayload, ...{department: value._id}})}}
                    />
                </div>
                <div className='my-8 w-full'>
                    <TextareaField
                        inputLabel="Description" 
                        fieldId="dept-description" 
                        inputType="text" 
                        preloadValue={''}
                        hasError={false} 
                        returnFieldValue={(value)=>{setGroupPayload({...groupPayload, ...{description: value}})}}
                    />
                </div>

                <div className='my-8 flex flex-row-reverse items-center justify-between'>
                    <div className='w-full'>
                    <FormButton 
                        buttonLabel={`Create Group`} 
                        buttonAction={()=>{triggerCreateDesignation()}} 
                        processing={groupsState.creatingGroup}
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewGroup