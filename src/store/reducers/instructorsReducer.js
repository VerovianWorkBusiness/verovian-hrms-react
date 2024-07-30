import { CREATE_INSTRUCTOR, CREATING_INSTRUCTOR, GET_INSTRUCTORS, GETTING_INSTRUCTORS, INSTRUCTORS_ERROR, UPDATE_INSTRUCTOR, UPDATING_INSTRUCTOR } from "../types"

const initialState = {
    instructors: [],
    loadingInstructors: false,
    instructorsError: null,
    creatingInstructor: false,
    createdInstructor: null,
    updatingInstructor: false,
    updatedInstructor: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){

    switch(action.type){
        case GETTING_INSTRUCTORS:
        return {
            ...state,
            loadingInstructors: action.payload,
            // fetchingMembers:false
        }
        case GET_INSTRUCTORS:
        return{
            ...state,
            loadingInstructors: false,
            instructorsError: false,
            instructors: action.payload,
        }
        case CREATING_INSTRUCTOR:
        return {
            ...state,
            creatingInstructor: action.payload,
            // fetchingMembers:false
        }
        case CREATE_INSTRUCTOR:
        return{
            ...state,
            creatingInstructor:false,
            instructorsError: false,
            createdInstructor: action.payload,
        }
        case UPDATING_INSTRUCTOR:
        return {
            ...state,
            updatingInstructor: action.payload,
            // fetchingMembers:false
        }
        case UPDATE_INSTRUCTOR:
        return{
            ...state,
            updatingInstructors:false,
            instructorsError: false,
            updatedInstructors: action.payload,
        }
        case INSTRUCTORS_ERROR:
        return{
            ...state,
            loadingInstructors:false,
            creatingInstructor:false,
            updatingInstructor:false,
            instructorsError: action.payload 
        }
        default: return state
    }

}