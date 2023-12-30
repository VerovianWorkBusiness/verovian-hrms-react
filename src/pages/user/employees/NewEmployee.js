import React, { useEffect, useState } from 'react'
import UserLayout from '../../../components/layout/UserLayout'
import TextField from '../../../components/elements/form/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShifts } from '../../../store/actions/shiftActions';
import { fetchDepartments } from '../../../store/actions/departmentActions';
import { fetchDesignations } from '../../../store/actions/designationActions';
import { fetchGroups } from '../../../store/actions/groupActions';
import RadioGroup from '../../../components/elements/form/RadioGroup';
import { Switch } from '@headlessui/react';
import SelectField from '../../../components/elements/form/SelectField';
import FormButton from '../../../components/elements/form/FormButton';
import { ERROR, SET_SUCCESS_MESSAGE } from '../../../store/types';
import { clearInvitedEmployee, inviteEmployee } from '../../../store/actions/employeeActions';
import { slugify } from '../../../utils';
import TrashIcon from '../../../components/elements/icons/TrashIcon';
import { fetchDocuments } from '../../../store/actions/documentActions';
import { useNavigate } from 'react-router-dom';
import DateField from '../../../components/elements/form/DateField';
import Preloader from '../../../components/elements/Preloader';

const NewEmployee = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const shiftsState = useSelector(state => state.shifts)
  const employeesState = useSelector(state => state.employees)
  const designationsState = useSelector(state => state.designations)
  const departmentsState = useSelector(state => state.departments)
  const documentsState = useSelector(state => state.documents)

  const requiredDocumentUploadSchema = 
  {
    documentName: "",
    slug: "",
    description: ""
  }


  const employeeSchema = {
    firstName: "",
    middleName: "",
    employeeId: "",
    lastName: "",
    phone: "",
    email: "",
    createUserProfile: false,
    userType: "USER",
    department: "",
    designation: "",
    gender: "",
    address: {
      address: "",
      city: "",
      state: ""
    },
    requiredDocumentUploads: [requiredDocumentUploadSchema],
    requiredDocumentSignings: [""]

  }

  const accountPermissionsList = {
    sections: [
      {
        title: 'Departments',
        permissions: [
          {
            label: 'All department actions',
            value: 'DEPARTMENTS',
            selected: false
          },
          {
            label: 'Create departments',
            value: 'CREATE_DEPARTMENTS',
            selected: false
          },
          {
            label: 'Only see their own department',
            value: 'READ_OWN_DEPARTMENTS',
            selected: false
          },
          {
            label: 'See all departments',
            value: 'READ_DEPARTMENTS',
            selected: false
          },
          {
            label: 'Edit departments',
            value: 'UPDATE_DEPARTMENTS',
            selected: false
          },
          {
            label: 'Delete departments',
            value: 'DELETE_DEPARTMENTS',
            selected: false
          },
        ]
      },    
      {
        title: 'Groups',
        permissions: [
          {
            label: 'All group actions',
            value: 'GROUPS',
            selected: false
          },
          {
            label: 'Create groups',
            value: 'CREATE_GROUPS',
            selected: false
          },
          {
            label: 'Only see their own groups',
            value: 'READ_OWN_GROUPS',
            selected: false
          },
          {
            label: 'See all groups',
            value: 'READ_GROUPS',
            selected: false
          },
          {
            label: 'Edit groups',
            value: 'UPDATE_GROUPS',
            selected: false
          },
          {
            label: 'Delete groups',
            value: 'DELETE_GROUPS',
            selected: false
          },
        ]
      },
      {
        title: 'Shifts',
        permissions: [
          {
            label: 'All shifts actions',
            value: 'SHIFTS',
            selected: false
          },
          {
            label: 'Create shifts',
            value: 'CREATE_SHIFTS',
            selected: false
          },
          {
            label: 'Only see their own shifts',
            value: 'READ_OWN_SHIFTS',
            selected: false
          },
          {
            label: 'See all shifts',
            value: 'READ_SHIFTS',
            selected: false
          },
          {
            label: 'Edit shifts',
            value: 'UPDATE_SHIFTS',
            selected: false
          },
          {
            label: 'Delete shifts',
            value: 'DELETE_SHIFTS',
            selected: false
          },
        ]
      },
      {
        title: 'Employee Invitations & Onboarding',
        permissions: [
          {
            label: 'All invitation actions',
            value: 'INVITATIONS',
            selected: false
          },
          {
            label: 'Invite users/employees',
            value: 'CREATE_INVITATIONS',
            selected: false
          },
          {
            label: 'See all invitations',
            value: 'READ_INVITATIONS',
            selected: false
          },
          {
            label: 'Update invitations',
            value: 'UPDATE_INVITATIONS',
            selected: false
          },
          {
            label: 'Rescind/delete shifts',
            value: 'DELETE_INVITATIONS',
            selected: false
          },
        ]
      },
      {
        title: 'Designations',
        permissions: [
          {
            label: 'All designations actions',
            value: 'DESIGNATIONS',
            selected: false
          },
          {
            label: 'Create designations',
            value: 'READ_DESIGNATIONS',
            selected: false
          },
          {
            label: 'Update designations',
            value: 'UPDATE_DESIGNATIONS',
            selected: false
          },
          {
            label: 'Delete designations',
            value: 'DELETE_DESIGNATIONS',
            selected: false
          },
        ]
      },
      {
        title: 'Employees',
        permissions: [
          {
            label: 'All employee actions',
            value: 'EMPLOYEES',
            selected: false
          },
          {
            label: 'Read all employee',
            value: 'READ_EMPLOYEES',
            selected: false
          },
          {
            label: 'Update employees',
            value: 'UPDATE_EMPLOYEES',
            selected: false
          },
          {
            label: 'Delete employees',
            value: 'DELETE_EMPLOYEES',
            selected: false
          },
        ]
      },
      {
        title: 'Documents',
        permissions: [
          {
            label: 'All document actions',
            value: 'DOCUMENTS',
            selected: false
          },
          {
            label: 'Create documents',
            value: 'CREATE_DOCUMENTS',
            selected: false
          },
          {
            label: 'Read all documents',
            value: 'READ_DOCUMENTS',
            selected: false
          },
          {
            label: 'Update documents',
            value: 'UPDATE_DOCUMENTS',
            selected: false
          },
          {
            label: 'Delete documents',
            value: 'DELETE_DOCUMENTS',
            selected: false
          },
        ]
      },
      {
        title: 'Leave Policies',
        permissions: [
          {
            label: 'All leave policies actions',
            value: 'LEAVE_POLICIES',
            selected: false
          },
          {
            label: 'Update leave policies',
            value: 'CREATE_DOCUMENTS',
            selected: false
          },
          {
            label: 'Read all leave policies',
            value: 'READ_DOCUMENTS',
            selected: false
          },
        ]
      },
      {
        title: 'Leave Applications',
        permissions: [
          {
            label: 'All leave application actions',
            value: 'LEAVE_APPLICATIONS',
            selected: false
          },
          {
            label: 'Create documents',
            value: 'CREATE_DOCUMENTS',
            selected: false
          },
          {
            label: 'Read all leave applications',
            value: 'READ_LEAVE_APPLICATIONS',
            selected: false
          },
          {
            label: 'Read own leave applications',
            value: 'READ_OWN_LEAVE_APPLICATIONS',
            selected: false
          },
          {
            label: 'Update leave applications',
            value: 'UPDATE_LEAVE_APPLICATIONS',
            selected: false
          },
          {
            label: 'Delete leave applications',
            value: 'DELETE_LEAVE_APPLICATIONS',
            selected: false
          },
        ]
      },
      {
        title: 'Leaves',
        permissions: [
          {
            label: 'All leave actions',
            value: 'LEAVES',
            selected: false
          },
          {
            label: 'Create documents',
            value: 'CREATE_DOCUMENTS',
            selected: false
          },
          {
            label: 'Read all leaves',
            value: 'READ_LEAVES',
            selected: false
          },
          {
            label: 'Read own leaves',
            value: 'READ_OWN_LEAVES',
            selected: false
          },
          {
            label: 'Update leaves',
            value: 'UPDATE_LEAVES',
            selected: false
          },
          {
            label: 'Delete leaves',
            value: 'DELETE_LEAVES',
            selected: false
          },
        ]
      },
    ]
  }

  const [permissions, setPermissions] = useState(accountPermissionsList);

  const [validationErrors, setValidationErrors] = useState({});
  const [employeePayload, setEmployeePayload] = useState(employeeSchema);

  // const [accountPermissionsList, setAccountPermissionsList] = useState(initialState);

  const togglePermissionSelection = (sectionIndex, permissionIndex) => {
    let tempPermissions = {...permissions}

    if(permissionIndex === 0 && tempPermissions.sections[sectionIndex].permissions[permissionIndex].selected === false) {
      tempPermissions.sections[sectionIndex].permissions.forEach((option) => {
        option.selected = true
      })
    } else if (permissionIndex === 0 && tempPermissions.sections[sectionIndex].permissions[permissionIndex].selected === true) {
      tempPermissions.sections[sectionIndex].permissions.forEach((option) => {
        option.selected = false
      })
    } else {
      tempPermissions.sections[sectionIndex].permissions[permissionIndex].selected = !tempPermissions.sections[sectionIndex].permissions[permissionIndex].selected
    }

    setPermissions(tempPermissions)
  }

  useEffect(() => {
    dispatch(fetchShifts())
    dispatch(fetchDepartments())
    dispatch(fetchDesignations())
    dispatch(fetchGroups())
    dispatch(fetchDocuments())

    if(employeesState.invitedEmployee !== null) {
      dispatch({
        type: SET_SUCCESS_MESSAGE,
        payload: {successMessage: "Employee created successfully. An email has been sent to the user."}
      })
      dispatch(clearInvitedEmployee())
      navigate('/user/employees')
    }
    
    return () => {
      
    };
  }, [dispatch, employeesState.invitedEmployee, navigate]);

  const updateRequiredDocuments = (index, field, value) => {
    let temp = {...employeePayload}
    temp.requiredDocumentUploads[index][field] = value
    if (field === 'documentName') {
      temp.requiredDocumentUploads[index].slug = slugify(value)
    }

    setEmployeePayload(temp)
  }

  const addRequiredDocumentUpload = (index, field, value) => {
    let temp = {...employeePayload}
    temp.requiredDocumentUploads.push(requiredDocumentUploadSchema)

    setEmployeePayload(temp)
  }

  const removeRequiredDocument = (index) => {
    let temp = {...employeePayload}
    temp.requiredDocumentUploads.splice(index, 1)
    setEmployeePayload(temp)
  }

  const updateRequiredDocumentSigning = (index, value) => {
    let temp = {...employeePayload}
    temp.requiredDocumentSignings[index] = value

    setEmployeePayload(temp)
  }

  const addRequiredDocumentSigning = () => {
    let temp = {...employeePayload}
    temp.requiredDocumentSignings.push("")

    setEmployeePayload(temp)
  }

  const removeRequiredDocumentSigning = (index, field, value) => {
    let temp = {...employeePayload}
    temp.requiredDocumentSignings.splice(index, 1)
    setEmployeePayload(temp)
  }

  const validateForm = () => {
    let errors = {}
    // if (!employeePayload.name || employeePayload.name === '') {
    //     errors.name = true
    // }

    setValidationErrors(errors)
    return errors
  }

  const triggerCreateEmployee = () => {
    // validateForm÷
    if (Object.values(validateForm()).includes(true)) {
      dispatch({
          type: ERROR,
          error: {response: {data: {
              message: 'Please check the highlighted fields'
          }}}
      });
      return
    }
    dispatch(inviteEmployee(employeePayload))
  }

  return (
    <UserLayout pageTitle={`New Employee`}>
      <div className='w-10/12 xl:w-8/12 2xl:w-5/12 mx-auto mt-12 p-8 bg-white'>
        <h3 className='font-medium'>Employee Details</h3>
        <p className='text-sm mb-3'>Please provide employee details below</p>

        {/* <div className='w-full my-4'> */}
            {/* <label className="block text-xs text-gray-400 my-2">Email Address </label> */}
        <div className='my-4 w-full'>
          <TextField
            inputLabel="Employee ID number" 
            fieldId="first-name" 
            inputType="text" 
            preloadValue={''}
            hasError={false} 
            returnFieldValue={(value)=>{setEmployeePayload({...employeePayload, ...{employeeId: value}})}}
          />
        </div>
        <div className='my-4 w-full'>
          <TextField
            inputLabel="First name" 
            fieldId="first-name" 
            inputType="text" 
            preloadValue={''}
            hasError={validationErrors.firstName} 
            returnFieldValue={(value)=>{setEmployeePayload({...employeePayload, ...{firstName: value}})}}
          />
        </div>
        <div className='my-4 w-full'>
          <TextField
            inputLabel="Middle name" 
            fieldId="middle-name" 
            inputType="text" 
            preloadValue={''}
            hasError={false} 
            returnFieldValue={(value)=>{setEmployeePayload({...employeePayload, ...{middleName: value}})}}
          />
        </div>
        <div className='my-4 w-full'>
          <TextField
            inputLabel="Last name" 
            fieldId="last-name" 
            inputType="text" 
            preloadValue={''}
            hasError={validationErrors.lastName} 
            returnFieldValue={(value)=>{setEmployeePayload({...employeePayload, ...{lastName: value}})}}
          />
        </div>

        <h3 className='font-medium mt-12'>Contact details</h3>
        <p className='text-sm mb-3'>How can this employee be reached
        </p>
        <div className='my-4 w-full'>
          <TextField
            inputLabel="Employee email address" 
            fieldId="employee-email" 
            inputType="text" 
            preloadValue={''}
            hasError={validationErrors.email} 
            returnFieldValue={(value)=>{setEmployeePayload({...employeePayload, ...{email: value}})}}
          />
        </div>
        <div className='my-4 w-full'>
          <TextField
            inputLabel="Employee phone number" 
            fieldId="employee-phone" 
            inputType="text" 
            preloadValue={''}
            hasError={validationErrors.phone} 
            returnFieldValue={(value)=>{setEmployeePayload({...employeePayload, ...{phone: value}})}}
          />
        </div>
        <div className='my-4 w-full'>
          <TextField
            inputLabel="Address" 
            fieldId="employee-address" 
            inputType="text" 
            preloadValue={''}
            hasError={validationErrors.address} 
            returnFieldValue={(value)=>{setEmployeePayload({
              ...employeePayload, 
              ...{
                ...employeePayload.address, 
                ...{address: value}
              }
            })}}
          />
        </div>
        <div className='my-4 w-full'>
          <TextField
            inputLabel="City" 
            fieldId="employee-address-city" 
            inputType="text" 
            preloadValue={''}
            hasError={validationErrors.city} 
            returnFieldValue={(value)=>{setEmployeePayload({
              ...employeePayload, 
              ...{
                ...employeePayload.address, 
                ...{city: value}
              }
            })}}
          />
        </div>
        <div className='my-4 w-full'>
          <TextField
            inputLabel="State" 
            fieldId="employee-address-state" 
            inputType="text" 
            preloadValue={''}
            hasError={validationErrors.state} 
            returnFieldValue={(value)=>{setEmployeePayload({
              ...employeePayload, 
              ...{
                ...employeePayload.address, 
                ...{state: value}
              }
            })}}
          />
        </div>

        <h3 className='font-medium mt-12'>Company placement</h3>
        <p className='text-sm mb-3'>Please designate employees placement in the company
        </p>

        {departmentsState.fetchingDepartments ? 
          <Preloader preloadingText={`fetching departments...`} />
          :
          <div className='my-4 w-full'>
            <SelectField
              selectOptions={departmentsState.departments}
              inputLabel="Select Department"
              titleField="name"
              displayImage={false}
              imageField=""
              preSelected=''
              fieldId="employee-department"
              hasError={false}
              // return id of accounts of the selected option
              returnFieldValue={(value) => {setEmployeePayload({...employeePayload, ...{department: value._id}})}}
            />
          <p className='text-xs mt-2 text-gray-400'>Select a department above to assign this user to a department</p>
        </div>}

        {designationsState.fetchingDesignations ? 
          <Preloader preloadingText={`fetching designations...`} />
          :
          <div className='my-4 w-full'>
            <SelectField
              selectOptions={designationsState.designations}
              inputLabel="Select Designation"
              titleField="name"
              displayImage={false}
              imageField=""
              preSelected=''
              fieldId="employee-designation"
              hasError={false}
              // return id of accounts of the selected option
              returnFieldValue={(value) => {setEmployeePayload({...employeePayload, ...{designation: value._id}})}}
            />
            <p className='text-xs mt-2 text-gray-400'>Assign the user a designation by selecting one above</p>
          </div>
        }

        <div className='my-4 w-full'>
          <DateField
            inputLabel="Start date" 
            fieldId="employee-start-date" 
            inputType="text" 
            preloadValue={''}
            hasError={validationErrors.phone} 
            returnFieldValue={(value)=>{setEmployeePayload({...employeePayload, ...{startDate: value}})}}
          />
          <p className='text-xs mt-2 text-gray-400'>Choose the date when the employee should resume work</p>
        </div>

        <h3 className='font-medium mt-12'>User Onboarding</h3>
        <p className='text-sm mb-3'>What is required of the user while onboarding?
        </p>

        <p className='text-sm mt-6 mb-3'>Add documents that this employee will be required to upload as part of their onboarding process</p>

        <div className='w-full px-8 py-4 rounded bg-gray-100 bg-opacity-60 mb-6 border border-gray-200'>
          {employeePayload.requiredDocumentUploads.map((requiredUpload, requiredUploadIndex)=>(
            <div key={requiredUploadIndex} className='w-full mt-12'>
              {requiredUploadIndex > 0 && <div className='flex flex-row-reverse mb-2'>
                <button onClick={()=>{removeRequiredDocument()}} className='flex items-center gap-x-2 text-red-600 hover:text-reg-800 duration-200 transition text-xs'>
                  <TrashIcon className={`w-5 h-5`} />
                  Remove document
                </button>
              </div>}
              <div className='my-4 w-full'>
                <TextField
                  inputLabel="Document name" 
                  fieldId="document-name" 
                  inputType="text" 
                  preloadValue={requiredUpload.documentName || ''}
                  hasError={validationErrors.firstName} 
                  returnFieldValue={(value)=>{updateRequiredDocuments(requiredUploadIndex, 'documentName', value)}}
                />
              </div>
              {/* <div className='my-4 w-full'>
                <TextField
                  inputLabel="Slug" 
                  fieldId="document-slug" 
                  inputType="text" 
                  preloadValue={requiredUpload.slug || ''}
                  hasError={false} 
                  returnFieldValue={(value)=>{updateRequiredDocuments(requiredUploadIndex, 'slug', value)}}
                />
              </div> */}
              <div className='my-4 w-full'>
                <TextField
                  inputLabel="Document description" 
                  fieldId="last-name" 
                  inputType="text" 
                  preloadValue={''}
                  hasError={false} 
                  returnFieldValue={(value)=>{updateRequiredDocuments(requiredUploadIndex, 'description', value)}}
                />
              </div>

            </div>
          ))}

          <button onClick={()=>{addRequiredDocumentUpload()}} className='w-max p-3 text-sm bg-black text-white rounded'>Add another document</button>
        </div>

        <p className='text-sm mt-6 mb-3'>Select documents that this employee will be required to sign as part of their onboarding</p>
        <div className='w-full px-8 py-4 rounded bg-gray-100 bg-opacity-60 mb-6 border border-gray-200'>
          {employeePayload.requiredDocumentSignings.map((requiredSigning, requiredSigningIndex)=>(
            <div key={requiredSigningIndex} className='w-full mt-12'>
              {requiredSigningIndex > 0 && <div className='flex flex-row-reverse mb-2'>
                <button onClick={()=>{removeRequiredDocumentSigning()}} className='flex items-center gap-x-2 text-red-600 hover:text-reg-800 duration-200 transition text-xs'>
                  <TrashIcon className={`w-5 h-5`} />
                  Remove document 
                </button>
              </div>}
              {documentsState.fetchingDocuments ? 
              <Preloader preloadingText={`fetching documents...`} />
              :
              <div className='my-4 w-full'>
                <SelectField
                  selectOptions={documentsState.documents}
                  inputLabel="Select Document"
                  titleField="name"
                  displayImage={false}
                  imageField=""
                  preSelected={requiredSigning}
                  fieldId={`required-document-signing-${requiredSigningIndex}`}
                  hasError={false}
                  returnFieldValue={(value) => {updateRequiredDocumentSigning(requiredSigningIndex, value._id)}}
                />
                {/* <p className='text-xs mt-2 text-gray-400'>Select a department above to assign this user to a department</p> */}
              </div>
              }

            </div>
          ))}

          <button onClick={()=>{addRequiredDocumentSigning()}} className='w-max p-3 text-sm bg-black text-white rounded'>Add another document</button>
        </div>

        <div className='my-4 w-full'>
            <RadioGroup
                inputLabel="Gender"
                inline={true}
                items={[
                    {label: 'Female', value: 'FEMALE'},
                    {label: 'Male', value: 'MALE'},
                ]} 
                hasError={validationErrors.gender} 
                returnSelected={(value)=>{setEmployeePayload({...employeePayload, ...{gender: value.value}})}}
            />
        </div>

        <h3 className='font-medium mt-12'>User Access</h3>
        <p className='text-sm mb-3'>Designate user's access to this platform</p>

        <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
            <div  className='w-full'>
                <p className="text-sm text-gray-600">
                    Create a user profile?
                </p>
                <p className='text-xs text-gray-400'>Creating a user profile means the user will have access to this platform.</p>
            </div>
            <div className='w-24 flex flex-row-reverse'>
                <Switch
                    checked={employeePayload.createUserProfile}
                    onChange={()=>{setEmployeePayload({...employeePayload, ...{createUserProfile: !employeePayload.createUserProfile}})}}
                    className={`${
                      employeePayload.createUserProfile ? 'bg-verovian-purple' : 'bg-gray-200'
                    } relative inline-flex items-center h-5 rounded-full w-10`}
                    >
                    {/* <span className="sr-only">Display stock levels</span> */}
                    <span
                        className={`transform transition ease-in-out duration-200 ${
                          employeePayload.createUserProfile ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-3 h-3 transform bg-white rounded-full`}
                    />
                </Switch>
            </div>
        </div>

        {employeePayload.createUserProfile && <>
          <div className='my-4 w-full'>
              <RadioGroup
                  inputLabel="User type"
                  inline={true}
                  items={[
                      {label: 'Normal user', value: 'USER'},
                      {label: 'Administrator', value: 'ADMIN'},
                  ]} 
                  hasError={validationErrors.gender} 
                  returnSelected={(value)=>{setEmployeePayload({...employeePayload, ...{userType: value.value}})}}
              />
          </div>

          {employeePayload.userType && employeePayload.userType === 'ADMIN' && <div className='my-4 w-full'>
            <h3 className='font-medium mt-6 mb-2'>User Account permissions</h3>
            <p className='text-sm mb-12'>Use the toggles below to grant the user's account permissions to different modules of the system</p>

            {permissions.sections.map((section, sectionIndex)=>(<div className='w-full mb-8' key={sectionIndex}>
                <h3 className="font-medium text-sm">{section.title}</h3>
                {section.permissions.map((permission, permissionIndex)=>(<div key={permissionIndex} className='w-full my-4 flex gap-x-4 items-center justify-between'>
                  <div className='w-full'>
                    <p className="text-sm text-gray-600">
                        {permission.label}
                    </p>
                    {/* <p className='text-xs text-gray-400'>Creating a user profile means the user will have access to this platform.</p> */}
                  </div>
                  <div className='w-24'>
                    <Switch
                        checked={permission.selected}
                        onChange={()=>{togglePermissionSelection(sectionIndex, permissionIndex)}}
                        className={`${
                          permission.selected ? 'bg-verovian-purple' : 'bg-gray-200'
                        } relative inline-flex items-center h-5 rounded-full w-10`}
                        >
                        {/* <span className="sr-only">Display stock levels</span> */}
                        <span
                            className={`transform transition ease-in-out duration-200 ${
                              permission.selected ? 'translate-x-6' : 'translate-x-1'
                          } inline-block w-3 h-3 transform bg-white rounded-full`}
                        />
                    </Switch>
                  </div>
                </div>))}
              </div>
              
            ))}
          </div>}
        </>}

        <div className='my-8 flex flex-row-reverse items-center justify-between'>
          <div className='w-full'>
            <FormButton 
                buttonLabel={`Create Employee`} 
                buttonAction={()=>{triggerCreateEmployee()}} 
                processing={employeesState.invitingEmployee}
            />
          </div>
        </div>

      </div>
    </UserLayout>
  )
;}

export default NewEmployee