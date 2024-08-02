import React, { useState } from 'react'
import FormButton from '../../elements/form/FormButton'
import TextField from '../../elements/form/TextField'
import { useDispatch, useSelector } from 'react-redux';
import { ERROR } from '../../../store/types';
import { createHoliday } from '../../../store/actions/holidayActions';
import RadioGroup from '../../elements/form/RadioGroup';
import TextareaField from '../../elements/form/TextareaField';
import { Switch } from '@headlessui/react';
import DateField from '../../elements/form/DateField';

const NewHoliday = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [holidayPayload, setHolidayPayload] = useState({
        name: "",
        type: "",
        description: "",
        dates: [""],
        daysOffAllowed: false,
        daysOff: [""]
    });

    const dispatch = useDispatch()
    const holidaysState = useSelector(state => state.holidays)

    const validateForm = () => {
        let errors = {}
        if (!holidayPayload.name || holidayPayload.name === '') {
            errors.name = true
        }

        setValidationErrors(errors)
        return errors
    }

    const triggerCreateHoliday = () => {
        if (Object.values(validateForm()).includes(true)) {
            dispatch({
                type: ERROR,
                error: {response: {data: {
                    message: 'Please check the highlighted fields'
                }}}
            });
            return
        }
        dispatch(createHoliday(holidayPayload))
    }

    const toggleDaysOffAllowed = () => {
        setHolidayPayload({...holidayPayload, daysOffAllowed: !holidayPayload.daysOffAllowed})
    }

    const updateDate = (index, value) => {
        let tempData = {...holidayPayload}
        tempData.dates[index] = value
        setHolidayPayload(tempData)
    }

    const updateDayOff = (index, value) => {
        let tempData = {...holidayPayload}
        tempData.daysOff[index] = value
        setHolidayPayload(tempData)
    }

    return (
        <div>
            <div>
                <div className='my-4 w-full'>
                    <TextField
                        inputLabel="Holiday name" 
                        fieldId="dept-name" 
                        inputType="text" 
                        preloadValue={''}
                        hasError={validationErrors.name} 
                        returnFieldValue={(value)=>{setHolidayPayload({...holidayPayload, ...{name: value}})}}
                    />
                </div>
                <div className='my-4 w-full'>
                    <RadioGroup
                        inputLabel="Holiday type"
                        items={[
                            {label: 'Religious', value: 'RELIGIOUS'},
                            {label: 'National', value: 'NATIONAL'},
                            {label: 'Company', value: 'COMPANY'},
                        ]} 
                        hasError={validationErrors.gender} 
                        returnSelected={(value)=>{setHolidayPayload({...holidayPayload, ...{type: value.value}})}}
                    />
                </div>
                <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
                    <div  className='w-full'>
                        <p className="text-sm text-gray-600">
                            Allow days off for this holiday?
                        </p>
                    </div>
                    <div className='w-24'>
                        <Switch
                            checked={holidayPayload.daysOffAllowed}
                            onChange={()=>{toggleDaysOffAllowed()}}
                            className={`${
                                holidayPayload.daysOffAllowed ? 'bg-verovian-purple' : 'bg-gray-200'
                            } relative inline-flex items-center h-5 rounded-full w-10`}
                            >
                            {/* <span className="sr-only">Display stock levels</span> */}
                            <span
                                className={`transform transition ease-in-out duration-200 ${
                                    holidayPayload.daysOffAllowed ? 'translate-x-6' : 'translate-x-1'
                                } inline-block w-3 h-3 transform bg-white rounded-full`}
                            />
                        </Switch>
                    </div>
                </div>
                <div className='my-4 w-full'>
                    <TextareaField
                        inputLabel="Description" 
                        fieldId="dept-description" 
                        inputType="text" 
                        preloadValue={''}
                        hasError={false} 
                        returnFieldValue={(value)=>{setHolidayPayload({...holidayPayload, ...{description: value}})}}
                    />
                </div>

                {holidayPayload.dates.map((date, dateIndex) => (
                    <div className='w-full my-4' key={dateIndex}>
                        <DateField
                            inputLabel="Date" 
                            inputPlaceholder="" 
                            fieldId={`holiday-date-${dateIndex}`} 
                            inputType="date" 
                            hasError={validationErrors.course} 
                            returnFieldValue={(value) => {updateDate(dateIndex, value)}}
                        />
                    </div>
                ))}
                <button onClick={()=>{setHolidayPayload({...holidayPayload, ...{dates: [...holidayPayload.dates, ...[""]]}})}} className="w-max rounded p-2 border border-verovian-purple text-verovian-purple bg-verovian-light-purple text-xs font-medium">Add date</button>

                {holidayPayload.daysOffAllowed && <>
                    {holidayPayload.daysOff.map((date, dateIndex) => (
                        <div className='w-full my-4' key={dateIndex}>
                            <DateField
                                inputLabel="Days off" 
                                inputPlaceholder="" 
                                fieldId={`holiday-day-off-${dateIndex}`} 
                                inputType="date" 
                                hasError={validationErrors[`dayOff-${dateIndex}`]} 
                                returnFieldValue={(value) => {updateDayOff(dateIndex, value)}}
                            />
                        </div>
                    ))}
                    <button onClick={()=>{setHolidayPayload({...holidayPayload, ...{dates: [...holidayPayload.dates, ...[""]]}})}} className="w-max rounded p-2 border border-verovian-purple text-verovian-purple bg-verovian-light-purple text-xs font-medium">Add day off</button>
                </>}

                <div className='my-8 flex flex-row-reverse items-center justify-between'>
                    <div className='w-full'>
                    <FormButton 
                        buttonLabel={`Create Holiday`} 
                        buttonAction={()=>{triggerCreateHoliday()}} 
                        processing={holidaysState.creatingHoliday}
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewHoliday