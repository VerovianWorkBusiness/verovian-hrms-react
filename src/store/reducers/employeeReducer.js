import { EMPLOYEES_ERROR, GETTING_EMPLOYEES, GET_EMPLOYEES, INVITE_EMPLOYEE, INVITING_EMPLOYEE, SIGNING_UP_EMPLOYEE, SIGNUP_EMPLOYEE } from "../types"

const initialState = {
    employees: [],
    loadingEmployees: false,
    employeesError: null,
    invitingEmployee: false,
    invitedEmployee: null,
    signingUpEmployee: false,
    signedUpEmployee: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){

    switch(action.type){
        case GETTING_EMPLOYEES:
        return {
            ...state,
            loadingDesignations: action.payload,
            // fetchingMembers:false
        }
        case GET_EMPLOYEES:
        return{
            ...state,
            loadingEmployees: false,
            designationsError: false,
            employees: action.payload,
        }
        case INVITING_EMPLOYEE:
        return {
            ...state,
            invitingEmployee: action.payload,
            // fetchingMembers:false
        }
        case INVITE_EMPLOYEE:
        return{
            ...state,
            invitingEmployee:false,
            employeesError: false,
            invitedEmployee: action.payload,
        }
        case SIGNING_UP_EMPLOYEE:
        return {
            ...state,
            signingUpEmployee: action.payload,
            // fetchingMembers:false
        }
        case SIGNUP_EMPLOYEE:
        return{
            ...state,
            signupEmployee:false,
            employeesError: false,
            signedUpEmployee: action.payload,
        }
        case EMPLOYEES_ERROR:
        return{
            ...state,
            loadingEmployees:false,
            employees: null,
            invitingEmployee: false,
            employeesError: action.payload 
        }
        default: return state
    }

}