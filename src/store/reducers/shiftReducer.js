import { CREATE_SHIFT, CREATING_SHIFT, GETTING_SHIFTS, GET_SHIFTS, SHIFTS_ERROR } from "../types"

const initialState = {
    shifts: [],
    loadingShifts: true,
    shiftsError: null,
    creatingShift: false,
    createdShift: null
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