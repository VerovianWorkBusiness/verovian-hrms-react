import { CREATE_HOLIDAY, CREATING_HOLIDAY, GETTING_HOLIDAYS, GET_HOLIDAYS, HOLIDAYS_ERROR } from "../types"

const initialState = {
    holidays: [],
    loadingHolidays: true,
    holidaysError: null,
    creatingHoliday: false,
    createdHoliday: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){

    switch(action.type){
        case GETTING_HOLIDAYS:
        return {
            ...state,
            loadingHolidays:action.payload,
            // fetchingMembers:false
        }
        case GET_HOLIDAYS:
        return{
            ...state,
            loadingHolidays:false,
            holidaysError: false,
            holidays: action.payload,
        }
        case CREATING_HOLIDAY:
        return {
            ...state,
            creatingHoliday: action.payload,
            // fetchingMembers:false
        }
        case CREATE_HOLIDAY:
        return{
            ...state,
            creatingHoliday:false,
            holidaysError: false,
            createdHoliday: action.payload,
        }
        case HOLIDAYS_ERROR:
        return{
            ...state,
            loadingHolidays:false,
            holidaysError: action.payload 
        }
        default: return state
    }

}