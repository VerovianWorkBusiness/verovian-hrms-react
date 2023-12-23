import { CREATE_DEPARTMENT, CREATING_DEPARTMENT, DEPARTMENTS_ERROR, GETTING_DEPARTMENTS, GET_DEPARTMENTS, UPDATE_LEAVE_POLICIES, UPDATING_LEAVE_POLICIES } from "../types"


const initialState = {
    departments: [],
    loadingDepartments: false,
    departmentsError: null,
    creatingDepartments: false,
    createdDepartment: null,
    updatingPolicies: false,
    updatedPolicies: null,
    policiesError: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){

    switch(action.type){
        case GETTING_DEPARTMENTS:
        return {
            ...state,
            loadingDepartments:action.payload,
            // fetchingMembers:false
        }
        case GET_DEPARTMENTS:
        return{
            ...state,
            loadingDepartments:false,
            departmentsError: false,
            departments: action.payload,
        }
        case CREATING_DEPARTMENT:
        return {
            ...state,
            creatingDepartments:action.payload,
            // fetchingMembers:false
        }
        case CREATE_DEPARTMENT:
        return{
            ...state,
            creatingDepartment:false,
            departmentsError: false,
            createdDepartment: action.payload,
        }
        case UPDATING_LEAVE_POLICIES:
        return {
            ...state,
            updatingPolicies: action.payload,
            // fetchingMembers:false
        }
        case UPDATE_LEAVE_POLICIES:
        return{
            ...state,
            updatingPolicies:false,
            policiesError: false,
            updatedPolicies: action.payload,
        }
        case DEPARTMENTS_ERROR:
        return{
            ...state,
            loadingDepartments:false,
            // departments: null,
            departmentsError: action.payload 
        }
        default: return state
    }

}