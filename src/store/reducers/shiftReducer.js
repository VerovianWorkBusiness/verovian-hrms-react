import { CREATE_SHIFT, CREATING_SHIFT, GETTING_SHIFTS, GETTING_SHIFT_DETAILS, GET_SHIFTS, GET_SHIFT_DETAILS, SHIFTS_ERROR, UPDATE_SHIFT, UPDATING_SHIFT } from "../types"

const initialState = {
    shifts: [],
    loadingShifts: true,
    shiftsError: null,
    creatingShift: false,
    createdShift: null,
    loadingShiftDetails: true,
    shiftDetails: null,
    updatingShift: false,
    updatedShift: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){

    switch(action.type){
        case GETTING_SHIFTS:
        return {
            ...state,
            loadingShifts:action.payload,
            // fetchingMembers:false
        }
        case GET_SHIFTS:
        return{
            ...state,
            loadingShifts:false,
            shiftsError: false,
            shifts: action.payload,
        }
        case GETTING_SHIFT_DETAILS:
        return {
            ...state,
            loadingShiftDetails: action.payload,
            // fetchingMembers:false
        }
        case GET_SHIFT_DETAILS:
        return{
            ...state,
            loadingShiftDetails:false,
            shiftsError: false,
            shiftDetails: action.payload,
        }
        case UPDATING_SHIFT:
        return {
            ...state,
            updatingShift: action.payload,
            // fetchingMembers:false
        }
        case UPDATE_SHIFT:
        return{
            ...state,
            updatingShift:false,
            shiftsError: false,
            updatedShift: action.payload,
        }
        case CREATING_SHIFT:
        return {
            ...state,
            creatingShift: action.payload,
        }
        case CREATE_SHIFT:
        return{
            ...state,
            creatingShift:false,
            shiftsError: false,
            createdShift: action.payload,
        }
        case SHIFTS_ERROR:
        return{
            ...state,
            loadingShifts:false,
            creatingShift:false,
            shiftsError: action.payload 
        }
        default: return state
    }

}