import React, { useEffect, useState } from 'react'
import UserLayout from '../../../components/layout/UserLayout'
import Wysiwyg from '../../../components/elements/form/Wysiwyg'
import TextField from '../../../components/elements/form/TextField'
import FormButton from '../../../components/elements/form/FormButton'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR, SET_SUCCESS_MESSAGE } from '../../../store/types'
import { createDocument } from '../../../store/actions/documentActions'
import CopyToClipboard from 'react-copy-to-clipboard'
import CopyIcon from '../../../components/elements/icons/CopyIcon'
import { useNavigate } from 'react-router-dom'

const NewDocument = () => {
    const navigate = useNavigate()
    const [validationErrors, setValidationErrors] = useState({});
    const [documentPayload, setDocumentPayload] = useState({});
    
    const dispatch = useDispatch()
    const documentsSelector = useSelector(state => state.documents)

    useEffect(() => {
      if(documentsSelector.createdDocument !== null){
        dispatch({
          type: SET_SUCCESS_MESSAGE,
          payload: {successMessage: "Document created successfully"}
        })
        setDocumentPayload({})
        navigate('user/documents')
      }
      return () => {
        
      };
    }, [dispatch, navigate, documentsSelector.createdDocument]);


    const validateForm = () => {
      let errors = {}
      if (!documentPayload.name || documentPayload.name === '') {
          errors.name = true
      }
      if (!documentPayload.description || documentPayload.description === '') {
          errors.description = true
      }
      if (!documentPayload.documentBody || documentPayload.documentBody === '') {
          errors.documentBody = true
      }

      setValidationErrors(errors)
      return errors
    }

    const triggerCreateDocument = () => {
      if (Object.values(validateForm()).includes(true)) {
        dispatch({
            type: ERROR,
            error: {response: {data: {
                message: 'Please check the highlighted fields'
            }}}
        });
        return
      }
      dispatch(createDocument(documentPayload))
    }

    const documentVariables = [
      {
        value: '[[firstName]]',
        description: 'Copy and paste this to insert employee first name'
      },
      {
        value: '[[middleName]]',
        description: 'opy and paste this to insert employee middle name'
      },
      {
        value: '[[lastName]]',
        description: 'Copy and paste this to insert employee last name'
      },
      {
        value: '[[email]]',
        description: 'Copy and paste this to insert employee email address'
      },
      {
        value: '[[phone]]',
        description: 'Copy and paste this to insert employee phone number'
      },
      {
        value: '[[dateOfBirth]]',
        description: 'Copy and paste this to insert employee date of birth'
      },
      {
        value: '[[startDate]]',
        description: 'Copy and paste this to insert employee start date'
      },
    ]
    return (
      <UserLayout pageTitle={`New document`}>
        <div className=''>
          <div className='w-full lg:flex flex-row gap-x-8'>
            <div className='w-full lg:w-10/12 pb-6 mx-auto px-12 mt-12'>
              <div className='flex justify-between items-center mt-4 mb-4'>
                <h3 className='font-medium text-lg text-gray-400'>Create a new document </h3>
              </div>

              <div className='w-full'>
                <div className='flex items-center justify-between gap-x-8 px-6'>
                    <div className='w-4/12'>
                        <div className='mb-8 w-full'>
                            <TextField
                                inputLabel="Document name" 
                                fieldId="document-name" 
                                inputType="text" 
                                preloadValue={''}
                                hasError={validationErrors.name} 
                                returnFieldValue={(value)=>{setDocumentPayload({...documentPayload, ...{name: value}})}}
                            />
                        </div>          
                    </div>
                    <div className='w-8/12'>
                        <div className='mb-8 w-full'>
                            <TextField
                                inputLabel="Description" 
                                fieldId="document-description" 
                                inputType="text" 
                                preloadValue={''}
                                hasError={validationErrors.description} 
                                returnFieldValue={(value)=>{setDocumentPayload({...documentPayload, ...{description: value}})}}
                            />
                        </div>                
                    </div>
                </div>
                <div className='w-full px-6 pb-6'>
                    <label 
                    className={`font-montserrat cursor-text bg-transparent text-sm z-10 font-outfit font-medium transition duration-200  
                    text-gray-500`}>
                        Document variables
                    </label>
                    <label className='text-xs block mt-2'>Document variables are placeholders for live employee data. The following list describes the useable variables. Just copy and paste them at the position where you want them replaced in the document</label>

                    {documentVariables.map((variable, variableIndex) => (
                      <div key={variableIndex} className='flex items-center gap-x-1'>
                        <CopyToClipboard text={variable.value}
                          onCopy={() =>  dispatch({
                              type: SET_SUCCESS_MESSAGE,
                              payload: {
                                successMessage: `${variable.value} copied to clipboard`
                              }
                          })}>
                          <button className='pt-1'><CopyIcon className={`w-5 h-5 text-gray-500`}/></button>
                        </CopyToClipboard>
                        <p className='text-xs my-4'><span className='p-1 bg-gray-200 items-center gap-x-1 inline'>
                        {variable.value}</span> : {variable.description}
                        </p>
                      </div>
                    ))}
                    
                </div>
                
                <div className='w-full px-6 pb-4'>
                    <label 
                    className={`font-montserrat cursor-text bg-transparent text-sm z-10 font-outfit font-medium transition duration-200  
                    ${validationErrors.documentBody ? 'text-red-600' : 'text-gray-500'}`}>
                        Document body
                    </label>
                    <label className='text-xs block mt-2'>Paste and format (or type in the contents of your document) in the editor below</label>
                </div>

                <div className='w-full'>
                  <div className='borderless px-6 long-text'>
                      <Wysiwyg 
                        fieldTitle=""
                        initialValue={''}
                        updateValue={(value)=>{setDocumentPayload({...documentPayload, ...{documentBody: value}})}}
                      />
                  </div>
                </div>

                <div className='my-8 flex flex-row-reverse items-center justify-between'>
                    <div className='w-3/12'>
                    <FormButton buttonLabel={`Save document`} buttonAction={()=>{triggerCreateDocument()}} processing={documentsSelector.creatingDocument} />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    )
}

export default NewDocument