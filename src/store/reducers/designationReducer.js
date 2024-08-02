import { CREATE_DESIGNATION, CREATING_DESIGNATION, DESIGNATIONS_ERROR, GETTING_DESIGNATIONS, GET_DESIGNATIONS } from "../types"

const initialState = {
    designations: [],
    loadingDesignations: false,
    designationsError: null,
    creatingDesignation: false,
    createdDesignation: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){

    switch(action.type){
        case GETTING_DESIGNATIONS:
        return {
            ...state,
            loadingDesignations: action.payload,
            // fetchingMembers:false
        }
        case GET_DESIGNATIONS:
        return{
            ...state,
            loadingDesignations: false,
            designationsError: false,
            designations: action.payload,
        }
        case CREATING_DESIGNATION:
        return {
            ...state,
            creatingDesignation: action.payload,
            // fetchingMembers:false
        }
        case CREATE_DESIGNATION:
        return{
            ...state,
            creatingDesignation:false,
            designationsError: null,
            createdDesignation: action.payload,
        }
        case DESIGNATIONS_ERROR:
        return{
            ...state,
            loadingDesignations:false,
            designationsError: action.payload 
        }
        default: return state
    }

}