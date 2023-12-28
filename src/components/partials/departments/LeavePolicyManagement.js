import { Switch } from '@headlessui/react';
import React, { useState } from 'react'
import SelectField from '../../elements/form/SelectField';
import NumberField from '../../elements/form/NumberField';
import TrashIcon from '../../elements/icons/TrashIcon';
import FormButton from '../../elements/form/FormButton';
import { useDispatch, 
    // useSelector 
} from 'react-redux';
import { ERROR } from '../../../store/types';
import { updateDepartmentLeavePolicies } from '../../../store/actions/departmentActions';

const LeavePolicyManagement = ({departmentId, currentPolicies}) => {
    const dispatch = useDispatch()
    // const departmentsState = useSelector(state => state.departments)
    
    const leaveTypeSchema = {
        leaveType: "", // 'SICK', 'ANNUAL', 'CASUAL', 'PERSONAL'
        maxDays: 0,
        maxTimesPerYear: 0,
        allowRollover: false,
        rolloverLimit: 0
    }

    const leavePoliciesSchema = {
        maximumOnLeave: {
            active: false,
            value: 0
        },
        subtractHolidays: {
            active: false,
        },
        allowedMonths: {
            active: false,
            value: []
        },
        allowedLeaveTypes: {
            active: false,
            types: [
                leaveTypeSchema
            ]
        }
    }
    const [leavePolicies, setLeavePolicies] = useState(currentPolicies !== null ? currentPolicies : leavePoliciesSchema);

    const leaveTypes = [
        {
            label: "Select leave type",
            value: ""
        },
        {
            label: "Sick leave",
            value: "SICK"
        },
        {
            label: "Annual leave",
            value: "ANNUAL"
        },
        {
            label: "Casual leave",
            value: "CASUAL"
        },
        {
            label: "Personal Days",
            value: "CASUAL"
        },
    ]

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const toggleMonthSelection = (month) => {
        let tempLeavePolicies = {...leavePolicies}
        if(tempLeavePolicies.allowedMonths.value.includes(month)) {
            const index = tempLeavePolicies.allowedMonths.value.indexOf(month);
            tempLeavePolicies.allowedMonths.value.splice(index, 1)
            setLeavePolicies(tempLeavePolicies.allowedMonths.value)

            return
        }
        tempLeavePolicies.allowedMonths.value.push(month)
        setLeavePolicies(tempLeavePolicies)
    }

    const togglePolicy = (policy) => {
        let temp = { ...leavePolicies}
        temp[policy].active = !temp[policy].active
        setLeavePolicies(temp)
    }
    
    const addLeaveType = (index, field, value) => {
        let temp = { ...leavePolicies}
        temp.allowedLeaveTypes.types.push(leaveTypeSchema)
        setLeavePolicies(temp)
    }
    
    const updateLeaveType = (index, field, value) => {
        let temp = { ...leavePolicies}
        temp.allowedLeaveTypes.types[index][field] = value
        setLeavePolicies(temp)
    }

    const removeLeaveType = (index, field, value) => {
        let temp = {...leavePolicies}
        temp.allowedLeaveTypes.types.splice(index, 1)
        setLeavePolicies(temp)
      }

    const updatePolicyValue = (field, value) => {
        let temp = { ...leavePolicies}
        temp[field].value = value
    }
    const [ValidationErrors, setValidationErrors] = useState({});

    const findDuplicateLeaveTypes = (leaves) => {
        const leaveTypeSet = new Set();
        const duplicateLeaveTypes = [];
    
        for (const leave of leaves) {
            if (leaveTypeSet.has(leave.leaveType)) {
                duplicateLeaveTypes.push(leave.leaveType);
            } 
            else {
                leaveTypeSet.add(leave.leaveType);
            }
        }
    
        return duplicateLeaveTypes;
    }

    const validateLeavePolicies = () => {
        let errors = {}
        
        if(leavePolicies.maximumOnLeave.active && (leavePolicies.maximumOnLeave.value === '' || leavePolicies.maximumOnLeave.value === 0)) {
            errors.maximumOnLeave = true
        }
        
        if(leavePolicies.allowedMonths.active && leavePolicies.allowedMonths.value.length === 0) {
            errors.allowedMonths = true
        }

        if(leavePolicies.allowedLeaveTypes.active) {
            const duplicates = findDuplicateLeaveTypes(leavePolicies.allowedLeaveTypes.types)
            if(duplicates.length > 0) {
                errors.allowedLeaveTypes = `There are one or more duplicate leave types - ${duplicates.join(', ').toLowerCase()}`
            }

            leavePolicies.allowedLeaveTypes.types.forEach((type, index) => {
                if(!type.leaveType || type.leaveType === '') {
                    errors[`leave-type-${index}`] = true
                }
                
                if(!type.maxDays || type.maxDays === '' || type.maxDays === 0) {
                    errors[`leave-max-days-${index}`] = true
                }

                if(!type.maxTimesPerYear || type.maxTimesPerYear === '' || type.maxTimesPerYear === 0) {
                    errors[`leave-max-times-${index}`] = true
                }
            })
        }
        console.log(errors)
        setValidationErrors(errors)
        return errors
    }

    const triggerPolicyUpdate = () => {
        if (Object.values(validateLeavePolicies()).includes(true)) {
            dispatch({
                type: ERROR,
                error: {response: {data: {
                    message: 'Please check the highlighted fields'
                }}}
            });
            return
        }

        // maximumOnLeave: {
        //     active: false,
        //     value: 0
        // },
        // subtractHolidays: {
        //     active: false,
        // },
        // allowedMonths: {
        //     active: false,
        //     value: []
        // },
        // allowedLeaveTypes: {
        //     active: false,
        //     types: [
        //         leaveTypeSchema
        //     ]
        // }

        const payload = {
            policies: leavePolicies
          }
        
        dispatch(updateDepartmentLeavePolicies(departmentId, payload))
    }

    return (
        <div className='w-full'>
            <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
                <div  className='w-full'>
                    <p className="text-sm text-gray-600">
                        Leave types
                    </p>
                    <p className='text-xs text-gray-400'>Set the types of leave allowed and restrict applications to only these , allowed types.</p>
                </div>
                <div className='w-24 flex flex-row-reverse'>
                    <Switch
                        checked={leavePolicies?.allowedLeaveTypes?.active}
                        onChange={()=>{togglePolicy('allowedLeaveTypes')}}
                        className={`${
                            leavePolicies?.allowedLeaveTypes?.active ? 'bg-verovian-purple' : 'bg-gray-200'
                        } relative inline-flex items-center h-5 rounded-full w-10`}
                        >
                        {/* <span className="sr-only">Display stock levels</span> */}
                        <span
                            className={`transform transition ease-in-out duration-200 ${
                            leavePolicies?.allowedLeaveTypes?.active ? 'translate-x-6' : 'translate-x-1'
                            } inline-block w-3 h-3 transform bg-white rounded-full`}
                        />
                    </Switch>
                </div>
            </div>

            {leavePolicies.allowedLeaveTypes?.active && 
                <div className='py-5 px-5 border-t border-b border-gray-200 bg-gray-100 bg-opacity-40'>
                {ValidationErrors.allowedLeaveTypes && ValidationErrors.allowedLeaveTypes !== '' && 
                    <p className='text-sm text-red-500 my-2'>{ValidationErrors.allowedLeaveTypes}</p>
                }
                    {leavePolicies.allowedLeaveTypes?.types.map((type, typeIndex)=>(<span key={typeIndex} className="block pb-8 border-b border-gray-300 mb-8">
                        {typeIndex > 0 && <div className='flex flex-row-reverse mb-2'>
                            <button onClick={()=>{removeLeaveType()}} className='flex items-center gap-x-2 text-red-600 hover:text-reg-800 duration-200 transition text-xs'>
                            <TrashIcon className={`w-5 h-5`} />
                            Remove leave type 
                            </button>
                        </div>}
                        <div className='mt-3 w-full'>
                            <SelectField
                                selectOptions={leaveTypes}
                                inputLabel="Select leave type"
                                titleField="label"
                                displayImage={false}
                                imageField=""
                                preSelected={type.leaveType || ''}
                                preSelectedLabel={`label`}
                                fieldId={`type-${typeIndex}`}
                                hasError={ValidationErrors[`leave-type-${typeIndex}`]}
                                returnFieldValue={(value) => {updateLeaveType(typeIndex, 'leaveType', value.value)}}
                            />
                        </div>
                        <div className='mt-3 w-full'>
                            <NumberField
                                inputLabel="Maximum days" 
                                fieldId={`max-days-${typeIndex}`}
                                inputType="text" 
                                preloadValue={type.maxDays || ''}
                                hasError={ValidationErrors[`leave-max-days-${typeIndex}`]} 
                                returnFieldValue={(value)=>{updateLeaveType(typeIndex, 'maxDays', value)}}
                            />
                        </div>
                        <div className='mt-3 w-full'>
                            <NumberField
                                inputLabel="Maximum number of times per year" 
                                fieldId={`max-days-per-year-${typeIndex}`}
                                inputType="text" 
                                preloadValue={type.maxTimesPerYear || ''}
                                hasError={ValidationErrors[`leave-max-times-${typeIndex}`]} 
                                returnFieldValue={(value)=>{updateLeaveType(typeIndex, 'maxTimesPerYear', value)}}
                            />
                            <label className='text-xs block mt-2 text-gray-400'>How many times can the total allotted days for this leave type be split in a single year?</label>
                        </div>
                        <div className='w-full mt-3 flex gap-x-4 items-center justify-between'>
                            <div  className='w-full'>
                                <p className="text-sm text-gray-600">
                                    Allow rollover
                                </p>
                                <p className='text-xs text-gray-400'>Keeping this on, allows unused leave days for this leave type to be rolled over into the next year. This increases the number of leave days for the next year for affected employees</p>
                            </div>
                            <div className='w-24 flex flex-row-reverse'>
                                <Switch
                                    checked={leavePolicies.allowedLeaveTypes.types[typeIndex].allowRollover}
                                    onChange={()=>{updateLeaveType(typeIndex, 'allowRollover', !leavePolicies.allowedLeaveTypes.types[typeIndex].allowRollover)}}
                                    className={`${
                                        leavePolicies.allowedLeaveTypes.types[typeIndex].allowRollover ? 'bg-verovian-purple' : 'bg-gray-200'
                                    } relative inline-flex items-center h-5 rounded-full w-10`}
                                    >
                                    {/* <span className="sr-only">Display stock levels</span> */}
                                    <span
                                        className={`transform transition ease-in-out duration-200 ${
                                            leavePolicies.allowedLeaveTypes.types[typeIndex].allowRollover ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block w-3 h-3 transform bg-white rounded-full`}
                                    />
                                </Switch>
                            </div>
                        </div>
                        {leavePolicies.allowedLeaveTypes.types[typeIndex].allowRollover && <div className='mt-3 w-full'>
                            <NumberField
                                inputLabel="Rollover limit" 
                                fieldId={`max-days-per-year-${typeIndex}`}
                                inputType="text" 
                                preloadValue={type.rolloverLimit || ''}
                                hasError={false} 
                                returnFieldValue={(value)=>{updateLeaveType(typeIndex, 'rolloverLimit', value)}}
                            />
                            <label className='text-xs block mt-2 text-gray-400'>How many times can this leave type be rolled over consecutively?</label>
                        </div>}
                        
                    </span>))}
                    <button onClick={()=>{addLeaveType()}} className='w-max p-3 text-sm bg-black text-white rounded mt-6'>Add another leave type</button>

                </div>
            }
            <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
                <div  className='w-full'>
                    <p className="text-sm text-gray-600">
                        On leave maximum
                    </p>
                    <p className='text-xs text-gray-400'>Set a maximum number of employees on leave at any given period</p>
                </div>
                <div className='w-24 flex flex-row-reverse'>
                    <Switch
                        checked={leavePolicies?.maximumOnLeave?.active}
                        onChange={()=>{togglePolicy('maximumOnLeave')}}
                        className={`${
                            leavePolicies?.maximumOnLeave?.active ? 'bg-verovian-purple' : 'bg-gray-200'
                        } relative inline-flex items-center h-5 rounded-full w-10`}
                        >
                        {/* <span className="sr-only">Display stock levels</span> */}
                        <span
                            className={`transform transition ease-in-out duration-200 ${
                            leavePolicies?.maximumOnLeave?.active ? 'translate-x-6' : 'translate-x-1'
                            } inline-block w-3 h-3 transform bg-white rounded-full`}
                        />
                    </Switch>
                </div>
            </div>
            {leavePolicies?.maximumOnLeave?.active && 
                <div className='py-5 px-5 border-t border-b border-gray-200 bg-gray-100 bg-opacity-40'>
                    <div className='mt-3 w-full'>
                        <NumberField
                            inputLabel="Maximum employees" 
                            fieldId={`max-on-leave`}
                            inputType="text" 
                            preloadValue={leavePolicies?.maximumOnLeave?.value || ''}
                            hasError={false} 
                            returnFieldValue={(value)=>{updatePolicyValue('maximumOnLeave', value)}}
                        />
                    </div>
                </div>
            }
            <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
                <div  className='w-full'>
                    <p className="text-sm text-gray-600">
                        Subtract holidays from employee leaves
                    </p>
                    <p className='text-xs text-gray-400'>Set a maximum number of employees on leave at any given period</p>
                </div>
                <div className='w-24 flex flex-row-reverse'>
                    <Switch
                        checked={leavePolicies?.subtractHolidays?.active}
                        onChange={()=>{togglePolicy('subtractHolidays')}}
                        className={`${
                            leavePolicies?.subtractHolidays?.active ? 'bg-verovian-purple' : 'bg-gray-200'
                        } relative inline-flex items-center h-5 rounded-full w-10`}
                        >
                        {/* <span className="sr-only">Display stock levels</span> */}
                        <span
                            className={`transform transition ease-in-out duration-200 ${
                            leavePolicies?.subtractHolidays?.active ? 'translate-x-6' : 'translate-x-1'
                            } inline-block w-3 h-3 transform bg-white rounded-full`}
                        />
                    </Switch>
                </div>
            </div>
            <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
                <div  className='w-full'>
                    <p className="text-sm text-gray-600">
                        Restrict months allowed
                    </p>
                    <p className='text-xs text-gray-400'>Choose what months employees of this department are allowed to be on leave</p>
                </div>
                <div className='w-24 flex flex-row-reverse'>
                    <Switch
                        checked={leavePolicies?.allowedMonths?.active}
                        onChange={()=>{togglePolicy('allowedMonths')}}
                        className={`${
                            leavePolicies?.allowedMonths?.active ? 'bg-verovian-purple' : 'bg-gray-200'
                        } relative inline-flex items-center h-5 rounded-full w-10`}
                        >
                        {/* <span className="sr-only">Display stock levels</span> */}
                        <span
                            className={`transform transition ease-in-out duration-200 ${
                            leavePolicies?.allowedMonths?.active ? 'translate-x-6' : 'translate-x-1'
                            } inline-block w-3 h-3 transform bg-white rounded-full`}
                        />
                    </Switch>
                </div>
            </div>
            {leavePolicies?.allowedMonths?.active && 
                <div className='w-full relative my-4'>
                    <p className='text-xs text-gray-400 mb-3'>Select allowed months below</p>
                    {months.map((month, monthIndex) => (
                    <button onClick={()=>{toggleMonthSelection(month)}} key={monthIndex} className={`rounded border py-2 px-3 text-xs mr-2 mb-3 ${leavePolicies?.allowedMonths?.value.includes(month) ? 'bg-verovian-purple border-verovian-purple text-white' : 'bg-gray-100 text-gray-500 border-gray-300'}`}>{month}</button>))}
                </div>
            }

            <div className='w-1/2 mt-8 mb-8'>
            <FormButton 
              buttonLabel={`Update leave policies`} 
              buttonAction={()=>{triggerPolicyUpdate()}} 
              processing={false}
            />
          </div>
        </div>
        
    )
}

export default LeavePolicyManagement