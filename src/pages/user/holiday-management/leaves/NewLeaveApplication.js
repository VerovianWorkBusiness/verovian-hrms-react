import React, { useEffect, useState } from 'react'
import LeavesHolidaysLayout from '../../../../components/layout/LeavesHolidaysLayout'
import { authHeader, userDetails } from '../../../../utils'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR, SET_SUCCESS_MESSAGE } from '../../../../store/types'
import DateField from '../../../../components/elements/form/DateField'
import SelectField from '../../../../components/elements/form/SelectField'
import FormButton from '../../../../components/elements/form/FormButton'
import TextareaField from '../../../../components/elements/form/TextareaField'
import Preloader from '../../../../components/elements/Preloader'
import NumberField from '../../../../components/elements/form/NumberField'
import { createLeaveApplication, clearCreatedLeaveApplication } from '../../../../store/actions/leaveActions'
import FileUpload from '../../../../components/elements/form/FileUpload'
import TextField from '../../../../components/elements/form/TextField'

const NewLeaveApplication = () => {
  const dispatch = useDispatch()
  const leavesState = useSelector(state => state.leaves)
  const leaveApplicationSchema = {
    leaveType: '',
    description: '',
    proposedStartDay: '',
    daysOff:  '',
  }

  const [loading, setLoading] = useState(true);
  const [departmentLeavePolicies, setDepartmentLeavePolicies] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchEmployeeDetails = async () => {    
      try{
        const headers = authHeader()
        const requestUrl = `employees/${userDetails().employeeProfile}`
        setLoading(true)

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}`, { headers })

        setEmployeeDetails(response.data.data)
        fetchDepartmentLeavePolicies(response.data.data.department)
      }
      catch(error){
        dispatch( {
            type: ERROR,
            error
        })
      }
    }

    const fetchDepartmentLeavePolicies = async (departmentId) => {    
      try{
        const headers = authHeader()
        const requestUrl = `leave-policies/${departmentId}`
        setLoading(true)

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}`, { headers })

        setDepartmentLeavePolicies(response.data.data.data)
        setLoading(false)
      }
      catch(error){
        dispatch( {
            type: ERROR,
            error
        })
      }
    }

    fetchEmployeeDetails()

    if(leavesState.createdLeaveApplication !== null) {
      dispatch(clearCreatedLeaveApplication())
      dispatch({
        type: SET_SUCCESS_MESSAGE,
        payload: {
          successMessage: 'Submitted successfully! You will be notified via email about the progress of your application.'
        }
      })
    }
    return () => {
      
    };
  }, [dispatch, leavesState.createdLeaveApplication]);

  const [leaveApplicationPayload, setLeaveApplicationPayload] = useState(leaveApplicationSchema);
  // const [supportingDocuments, setSupportingDocuments] = useState([]);

  const validateForm = () => {
    let errors = {}
      // if (!departmentPayload.name || departmentPayload.name === '') {
      //     errors.name = true
      // }

      setValidationErrors(errors)
      return errors
  }

	const [files, setFiles] = useState([
    { file: '', name: '' }
  ]);

  const updateFileName = (index, name) => {
    let tempFiles = [...files]
    tempFiles[index].name = name
    setFiles(tempFiles)
  }

  const addFile = (index, doc, file) => {
		let tempFiles = [...files]
		// tempFiles.push({
		// 	name: doc,
		// 	file: file
		// })

    tempFiles[index].name = doc
    tempFiles[index].file = file
    
		setFiles(tempFiles)
	}

  const addDocument = () => {
    let tempFiles = [...files]
		tempFiles.push({
			name: '',
			file: ''
		})
		setFiles(tempFiles)
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

  const submitLeaveApplication = async () => {
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
      ...leaveApplicationPayload, 
      ...{employee: employeeDetails._id}
    }

    let uploadedDocuments = []
    if(files.length > 0 && files[0].name !== '' && files[0].file !== ''){
			for (let index = 0; index < files.length; index++) {
				const element = files[index];
				const uploaded = await handleUpload(element.file)
	
				uploadedDocuments.push({
          name: element.document.name,
          documentUrl: uploaded.data.file
				})
			}
    }

    if(uploadedDocuments.length > 0) {
      payload.supportingDocuments = uploadedDocuments
    }

    dispatch(createLeaveApplication(payload))
  }

  return (
    <LeavesHolidaysLayout sectionTitle={`NEW LEAVE APPLICATION`}>
      <div className='w-full lg:flex flex-row gap-x-8'>
        <div className='w-full pb-6 px-12 mt-6 bg-white p-8'>
          {loading ? 
            <Preloader preloadingText={`Loading data`} /> :
            <>
              
              <div className='flex flex-row justify-between items-center mt-4 mb-4'>
                <div className='w-full'>
                  {/* <h3 className='font-medium text-lg text-gray-700 mb-2'>Apply for leave</h3> */}
                  <p className='text-sm'>Please provide details of your leave below to start an application</p>

                  <div className='w-2/3 mt-8'>
                    {(!departmentLeavePolicies || departmentLeavePolicies === null) && <div className='bg-red-100 bg-opacity-40 border border-red-300 rounded-lg p-5'>
                      <p className='text-sm text-red-500'>SOrry, you cannot apply for leaves at the moment. Your department currently has no leave policies set. You will be able to apply once some policies have been set.</p>
                    </div>}
                    <div className='mt-3 w-full'>
                      <SelectField
                        selectOptions={departmentLeavePolicies.policies.allowedLeaveTypes.types}
                        inputLabel="Select leave type"
                        titleField="leaveType"
                        displayImage={false}
                        imageField=""
                        preSelected=''
                        fieldId="account"
                        hasError={validationErrors.leaveType}
                        // return id of accounts of the selected option
                        returnFieldValue={(value) => {setLeaveApplicationPayload({...leaveApplicationPayload, ...{leaveType: value.leaveType}})}}
                      />
                    </div>

                    <div className='mt-6 w-full'>
                      <TextareaField
                        inputLabel="Description" 
                        fieldId="dept-description" 
                        inputType="text" 
                        preloadValue={leaveApplicationPayload.description || ''}
                        hasError={false} 
                        returnFieldValue={(value)=>{setLeaveApplicationPayload({...leaveApplicationPayload, ...{description: value}})}}
                      />
                      {leaveApplicationPayload.description.length > 250 && <p className='mt-3 text-xs text-red-600'>Description is too long. Must be 250 characters max.</p>}
                    </div>

                    <div className='mt-6 w-full flex items-center justify-between gap-x-6'>
                        <div className='w-full'>
                          <DateField
                            inputLabel="Start date" 
                            inputPlaceholder="" 
                            fieldId="leave-start-date" 
                            inputType="date" 
                            hasError={validationErrors[`startDate`]} 
                            returnFieldValue={(value) => {setLeaveApplicationPayload({...leaveApplicationPayload, ...{proposedStartDay: value}})}}
                          />
                        </div>
                        <div className='w-full'>
                          <NumberField
                            inputLabel="Days off needed" 
                            fieldId={`days-off`}
                            inputType="text" 
                            preloadValue={leaveApplicationPayload.daysOff || ''}
                            hasError={validationErrors[`daysOff`]} 
                            returnFieldValue={(value) => {setLeaveApplicationPayload({...leaveApplicationPayload, ...{daysOff: value}})}}
                          />
                        </div>
                      </div>
                      <p className='text-md text-gray-800 mt-6'>Supporting Documents</p>
							        <p className='mt-3 dark:text-gray-500 text-sm'>If you have any supporting documents for your leave application, please add them below. Click on the 'add another document' button to add more documents if required</p>
                      {files.map((doc, docIndex)=>(
                        <div className='w-full mt-8' key={docIndex}>
                          <div className='mt-3 w-full'>
                            <TextField
                              inputLabel="Document name" 
                              inputPlaceholder="Document name" 
                              fieldId="first-name" 
                              inputType="first-name" 
                              disabled={false}
                              preloadValue={doc.name || ''}
                              hasError={validationErrors.firstName} 
                              returnFieldValue={(value)=>{updateFileName(docIndex, value)}}
                            />
                            <label className='block mt-3 text-xs text-gray-400'>Name of the document you are uploading (eg: medical report)</label>
                          </div>
                          <div className='mt-3 w-full'>
                            <FileUpload
                              hasError={false}
                              fieldLabel={doc.documentName}
                              returnFileDetails={(details)=>{
                                addFile(doc, details)
                              }}
                              acceptedFormats={['pdf', 'jpeg', 'jpg', 'png']}
                            />
                          </div>
                        </div>
                      ))}
                      <button onClick={()=>{addDocument()}} className='w-max p-3 text-sm bg-black text-white rounded mt-5'>Add another document</button>


                      {departmentLeavePolicies !== null && <div className='animate__animated animate__fadeIn mb-4 mt-8 w-1/2'>
                        <FormButton 
                          buttonLabel={`Submit application`} 
                          buttonAction={()=>{submitLeaveApplication()}} />
                      </div>}
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </LeavesHolidaysLayout>
  )
}

export default NewLeaveApplication