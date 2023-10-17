import React, { useEffect, useState } from 'react'
import UserLayout from '../../../../components/layout/UserLayout'
import CompanyPageLayout from '../../../../components/layout/CompanyPageLayout'
import { Switch } from '@headlessui/react'
import TimeInputField from '../../../../components/elements/form/TimeInputField'
import TextField from '../../../../components/elements/form/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR, SET_SUCCESS_MESSAGE } from '../../../../store/types'
import { createShift } from '../../../../store/actions/shiftActions'
import FormButton from '../../../../components/elements/form/FormButton'
import TextareaField from '../../../../components/elements/form/TextareaField'
import { useNavigate } from 'react-router-dom'

const NewShift = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const shiftsState = useSelector(state => state.shifts)

    useEffect(() => {
        if(shiftsState.createdShift && shiftsState.createdShift !== null) {
            dispatch({
              type: SET_SUCCESS_MESSAGE,
              payload: 'Shift created successfully!'
            })
		    navigate('/user/company/shifts')

        }
        return () => {
            
        };
    }, [dispatch, navigate, shiftsState.createdShift]);

    const shiftPayloadFields = {
        name: '',
        description: '',
        active: true,
        activeDays: {
            monday: {
                active: false,
                openingTime: '',
                closingTime: ''
            },
            tuesday: {
                active: false,
                openingTime: '',
                closingTime: ''
            },
            wednesday: {
                active: false,
                openingTime: '',
                closingTime: ''
            },
            thursday: {
                active: false,
                openingTime: '',
                closingTime: ''
            },
            friday: {
                active: false,
                openingTime: '',
                closingTime: ''
            },
            saturday: {
                active: false,
                openingTime: '',
                closingTime: ''
            },
            sunday: {
                active: false,
                openingTime: '',
                closingTime: ''
            },
        }
    }

    const [shiftPayload, setShiftPayload] = useState(shiftPayloadFields);
    const [validationErrors, setValidationErrors] = useState({});

    const updateShiftTimes = (day, time, value) => {
        const tempShift = {...shiftPayload}
        tempShift.activeDays[day][time] = value
        setShiftPayload(tempShift) 
    }

    const toggleShiftDay = (day) => {
        const tempShift = {...shiftPayload}
        tempShift.activeDays[day].active = !tempShift.activeDays[day].active
        setShiftPayload(tempShift) 
    }

    const validateForm = () => {
        let errors = {}
          if (!shiftPayload.name || shiftPayload.name === '') {
              errors.name = true
          }
    
          setValidationErrors(errors)
          return errors
      }
      
      const triggerCreateShift = () => {
        if (Object.values(validateForm()).includes(true)) {
          dispatch({
              type: ERROR,
              error: {response: {data: {
                  message: 'Please check the highlighted fields'
              }}}
          });
          return
        }
        dispatch(createShift(shiftPayload))
      }
    return (
        <UserLayout pageTitle={`Company`}>
            <CompanyPageLayout sectionTitle={'New Shift'}>
                <div className='w-8/12 mx-auto'>
                    <h3 className='text-gray-600 text-md font-medium mt-12'>Shift details</h3>
                    <p className='text-sm mb-3'>Please provide Shift details below</p>

                    {/* <div className='w-full my-4'> */}
                        {/* <label className="block text-xs text-gray-400 my-2">Email Address </label> */}
                    <div className='my-8 w-full'>
                        <TextField
                            inputLabel="Shift name" 
                            fieldId="dept-name" 
                            inputType="text" 
                            preloadValue={''}
                            hasError={validationErrors.name} 
                            returnFieldValue={(value)=>{setShiftPayload({...shiftPayload, ...{name: value}})}}
                        />
                    </div>

                    <div className='my-8 w-full'>
                        <TextareaField
                            inputLabel="Description" 
                            fieldId="dept-description" 
                            inputType="text" 
                            preloadValue={''}
                            hasError={false} 
                            returnFieldValue={(value)=>{setShiftPayload({...shiftPayload, ...{description: value}})}}
                        />
                    </div>

                    <div className='w-full flex items-center gap-x-3'>
                        <Switch
                            checked={shiftPayload.active}
                            onChange={()=>{setShiftPayload({...shiftPayload, ...{active: !shiftPayload.active}})}}
                            className={`${
                                shiftPayload.active ? 'bg-verovian-purple' : 'bg-gray-200'
                            } relative inline-flex items-center h-5 rounded-full w-10`}
                            >
                            {/* <span className="sr-only">Display stock levels</span> */}
                            <span
                                className={`transform transition ease-in-out duration-200 ${
                                    shiftPayload.active ? 'translate-x-6' : 'translate-x-1'
                                } inline-block w-3 h-3 transform bg-white rounded-full`}
                            />
                        </Switch>
                        <p className=''>Set shift as active</p>

                    </div>

                    <h3 className='text-gray-600 text-md font-medium mt-12'>Working hours</h3>
                    <p className='text-sm mb-3'>Toggle days for this shift and provide the working hours</p>
                    <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
                        <div  className='w-44'>
                            <p className="text-xs text-gray-600">
                                Monday
                            </p>
                        </div>
                        <div className='w-24'>
                            <Switch
                                checked={shiftPayload.activeDays.monday.active}
                                onChange={()=>{toggleShiftDay('monday')}}
                                className={`${
                                    shiftPayload.activeDays.monday.active ? 'bg-verovian-purple' : 'bg-gray-200'
                                } relative inline-flex items-center h-5 rounded-full w-10`}
                                >
                                {/* <span className="sr-only">Display stock levels</span> */}
                                <span
                                    className={`transform transition ease-in-out duration-200 ${
                                        shiftPayload.activeDays.monday.active ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block w-3 h-3 transform bg-white rounded-full`}
                                />
                            </Switch>
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Opening time" 
                                fieldId="monday-opening-time" 
                                preloadValue={shiftPayload.activeDays.monday.openingTime || ''}
                                hasError={validationErrors.mondayOpeningTime} 
                                returnFieldValue={(value)=>{
                                    console.log(value)
                                    updateShiftTimes('monday', 'openingTime', value)}}
                            />
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Closing time" 
                                fieldId="monday-closing-time" 
                                preloadValue={shiftPayload.activeDays.monday.closingTime || ''}
                                hasError={validationErrors.mondayClosingTime} 
                                returnFieldValue={(value)=>{updateShiftTimes('monday', 'closingTime', value)}}
                            />
                        </div>
                    </div>
                    <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
                        <div  className='w-44'>
                            <p className="text-xs text-gray-600">
                                Tuesday
                            </p>
                        </div>
                        <div className='w-24'>
                            <Switch
                                checked={shiftPayload.activeDays.tuesday.active}
                                onChange={()=>{toggleShiftDay('tuesday')}}
                                className={`${
                                    shiftPayload.activeDays.tuesday.active ? 'bg-verovian-purple' : 'bg-gray-200'
                                } relative inline-flex items-center h-5 rounded-full w-10`}
                                >
                                {/* <span className="sr-only">Display stock levels</span> */}
                                <span
                                    className={`transform transition ease-in-out duration-200 ${
                                        shiftPayload.activeDays.tuesday.active ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block w-3 h-3 transform bg-white rounded-full`}
                                />
                            </Switch>
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Opening time" 
                                fieldId="tuesday-opening-time" 
                                preloadValue={shiftPayload.activeDays.tuesday.openingTime || ''}
                                hasError={validationErrors.tuesdayOpeningTime} 
                                returnFieldValue={(value)=>{updateShiftTimes('tuesday', 'openingTime', value)}}
                            />
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Closing time" 
                                fieldId="tuesday-closing-time" 
                                preloadValue={shiftPayload.activeDays.tuesday.closingTime || ''}
                                hasError={validationErrors.tuesdayClosingTime} 
                                returnFieldValue={(value)=>{updateShiftTimes('tuesday', 'closingTime',  value)}}
                            />
                        </div>
                    </div>
                    <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
                        <div  className='w-44'>
                            <p className="text-xs text-gray-600">
                                Wednesday
                            </p>
                        </div>
                        <div className='w-24'>
                            <Switch
                                checked={shiftPayload.activeDays.wednesday.active}
                                onChange={()=>{toggleShiftDay('wednesday')}}
                                className={`${
                                    shiftPayload.activeDays.wednesday.active ? 'bg-verovian-purple' : 'bg-gray-200'
                                } relative inline-flex items-center h-5 rounded-full w-10`}
                                >
                                {/* <span className="sr-only">Display stock levels</span> */}
                                <span
                                    className={`transform transition ease-in-out duration-200 ${
                                        shiftPayload.activeDays.wednesday.active ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block w-3 h-3 transform bg-white rounded-full`}
                                />
                            </Switch>
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Opening time" 
                                fieldId="wednesday-opening-time" 
                                preloadValue={shiftPayload.activeDays.wednesday.openingTime || ''}
                                hasError={validationErrors.wednesdayOpeningTime} 
                                returnFieldValue={(value)=>{updateShiftTimes('wednesday', 'openingTime', value)}}
                            />
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Closing time" 
                                fieldId="wednesday-closing-time" 
                                preloadValue={shiftPayload.activeDays.wednesday.closingTime || ''}
                                hasError={validationErrors.wednesdayClosingTime} 
                                returnFieldValue={(value)=>{updateShiftTimes('wednesday', 'closingTime', value)}}
                            />
                        </div>
                    </div>
                    <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
                        <div  className='w-44'>
                            <p className="text-xs text-gray-600">
                                Thursday
                            </p>
                        </div>
                        <div className='w-24'>
                            <Switch
                                checked={shiftPayload.activeDays.thursday.active}
                                onChange={()=>{toggleShiftDay('thursday')}}
                                className={`${
                                    shiftPayload.activeDays.thursday.active ? 'bg-verovian-purple' : 'bg-gray-200'
                                } relative inline-flex items-center h-5 rounded-full w-10`}
                                >
                                {/* <span className="sr-only">Display stock levels</span> */}
                                <span
                                    className={`transform transition ease-in-out duration-200 ${
                                        shiftPayload.activeDays.thursday.active ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block w-3 h-3 transform bg-white rounded-full`}
                                />
                            </Switch>
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Opening time" 
                                fieldId="thursday-opening-time" 
                                preloadValue={shiftPayload.activeDays.thursday.openingTime || ''}
                                hasError={validationErrors.thursdayOpeningTime} 
                                returnFieldValue={(value)=>{updateShiftTimes('thursday', 'openingTime', value)}}
                            />
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Closing time" 
                                fieldId="thursday-closing-time" 
                                preloadValue={shiftPayload.activeDays.thursday.closingTime || ''}
                                hasError={validationErrors.thursdayClosingTime} 
                                returnFieldValue={(value)=>{updateShiftTimes('thursday', 'closingTime', value)}}
                            />
                        </div>
                    </div>
                    
                    <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
                        <div  className='w-44'>
                            <p className="text-xs text-gray-600">
                                Friday
                            </p>
                        </div>
                        <div className='w-24'>
                            <Switch
                                checked={shiftPayload.activeDays.friday.active}
                                onChange={()=>{toggleShiftDay('friday')}}
                                className={`${
                                    shiftPayload.activeDays.friday.active ? 'bg-verovian-purple' : 'bg-gray-200'
                                } relative inline-flex items-center h-5 rounded-full w-10`}
                                >
                                <span
                                    className={`transform transition ease-in-out duration-200 ${
                                        shiftPayload.activeDays.friday.active ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block w-3 h-3 transform bg-white rounded-full`}
                                />
                            </Switch>
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Opening time" 
                                fieldId="friday-opening-time" 
                                preloadValue={shiftPayload.activeDays.friday.openingTime || ''}
                                hasError={validationErrors.fridayOpeningTime} 
                                returnFieldValue={(value)=>{updateShiftTimes('friday', 'openingTime', value)}}
                            />
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Closing time" 
                                fieldId="friday-closing-time" 
                                preloadValue={shiftPayload.activeDays.friday.closingTime || ''}
                                hasError={validationErrors.fridayClosingTime} 
                                returnFieldValue={(value)=>{updateShiftTimes('friday', 'closingTime', value)}}
                            />
                        </div>
                    </div>

                    <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
                        <div  className='w-44'>
                            <p className="text-xs text-gray-600">
                                Saturday
                            </p>
                        </div>
                        <div className='w-24'>
                            <Switch
                                checked={shiftPayload.activeDays.saturday.active}
                                onChange={()=>{toggleShiftDay('saturday')}}
                                className={`${
                                    shiftPayload.activeDays.saturday.active ? 'bg-verovian-purple' : 'bg-gray-200'
                                } relative inline-flex items-center h-5 rounded-full w-10`}
                                >
                                <span
                                    className={`transform transition ease-in-out duration-200 ${
                                        shiftPayload.activeDays.saturday.active ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block w-3 h-3 transform bg-white rounded-full`}
                                />
                            </Switch>
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Opening time" 
                                fieldId="saturday-opening-time" 
                                preloadValue={shiftPayload.activeDays.saturday.openingTime || ''}
                                hasError={validationErrors.saturdayOpeningTime} 
                                returnFieldValue={(value)=>{updateShiftTimes('saturday', 'openingTime', value)}}
                            />
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Closing time" 
                                fieldId="saturday-closing-time" 
                                preloadValue={shiftPayload.activeDays.saturday.closingTime || ''}
                                hasError={validationErrors.saturdayClosingTime} 
                                returnFieldValue={(value)=>{updateShiftTimes('saturday', 'closingTime', value)}}
                            />
                        </div>
                    </div>

                    <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
                        <div  className='w-44'>
                            <p className="text-xs text-gray-600">
                                Sunday
                            </p>
                        </div>
                        <div className='w-24'>
                            <Switch
                                checked={shiftPayload.activeDays.sunday.active}
                                onChange={()=>{toggleShiftDay('sunday')}}
                                className={`${
                                    shiftPayload.activeDays.sunday.active ? 'bg-verovian-purple' : 'bg-gray-200'
                                } relative inline-flex items-center h-5 rounded-full w-10`}
                                >
                                <span
                                    className={`transform transition ease-in-out duration-200 ${
                                        shiftPayload.activeDays.sunday.active ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block w-3 h-3 transform bg-white rounded-full`}
                                />
                            </Switch>
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Opening time" 
                                fieldId="sunday-opening-time" 
                                preloadValue={shiftPayload.activeDays.sunday.openingTime || ''}
                                hasError={validationErrors.sundayOpeningTime} 
                                returnFieldValue={(value)=>{updateShiftTimes('sunday', 'openingTime', value)}}
                            />
                        </div>
                        <div className='w-full'>
                            <TimeInputField
                                inputLabel="Closing time" 
                                fieldId="sunday-closing-time" 
                                preloadValue={shiftPayload.activeDays.sunday.closingTime || ''}
                                hasError={validationErrors.sundayClosingTime} 
                                returnFieldValue={(value)=>{updateShiftTimes('sunday', 'closingTime', value)}}
                            />
                        </div>
                    </div>

                    <div className='my-8 flex flex-row-reverse items-center justify-between'>
                        <div className='w-5/12'>
                            <FormButton 
                                buttonLabel={`Create Shift`} 
                                buttonAction={()=>{triggerCreateShift()}} 
                                processing={shiftsState.creatingShift}
                            />
                        </div>
                    </div>
                </div>
        </CompanyPageLayout>
    </UserLayout>
    )
}

export default NewShift