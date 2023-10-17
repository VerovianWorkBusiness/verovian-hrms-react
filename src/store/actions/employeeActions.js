import axios from "axios"
import { authHeader } from "../../utils"
import { EMPLOYEES_ERROR, GETTING_EMPLOYEES, GET_EMPLOYEES, INVITE_EMPLOYEE, INVITING_EMPLOYEE, SIGNING_UP_EMPLOYEE, SIGNUP_EMPLOYEE } from "../types"

export const inviteEmployee = (designationPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: INVITING_EMPLOYEE,
            payload: true
        })
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/employees/invite`, designationPayload, { headers })
        
        dispatch({
            type: INVITE_EMPLOYEE,
            payload: response.data.data
        })
        
    }
    catch(error){
        // console.log(error)
        dispatch({
            type: EMPLOYEES_ERROR,
            // payload: error.response.data
            error
        })
    }
}

export const signupEmployee = (designationPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: SIGNING_UP_EMPLOYEE,
            payload: true
        })
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/designations`, designationPayload, { headers })
        
        dispatch({
            type: SIGNUP_EMPLOYEE,
            payload: response.data.data
        })
        
    }
    catch(error){
        // console.log(error)
        dispatch({
            type: EMPLOYEES_ERROR,
            // payload: error.response.data
            error
        })
    }
}

export const fetchEmployees = (pagination, filters, sort, action) => async dispatch => {    
    try{
        const headers = authHeader()
        let requestUrl = 'designations'
        // if(userPermissions().includes('wallets.list.self') && !userPermissions().includes('wallets.*')) {
        //     requestUrl = 'wallets/self'
        // }

        dispatch( {
            type: GETTING_EMPLOYEES,
            payload: true
        })

        // let appliedFilters =''
        // if (filters && filters!==null && filters.length > 0) {
        //     appliedFilters = parseFilters(filters, action, 'WALLETS')
        // }


        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}}`, { headers })
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}?expand=custodian&limit=${pagination.perPage}&page=${pagination.page}&${appliedFilters}&${applySort(sort)}`, { headers })

        dispatch( {
            type: GET_EMPLOYEES,
            payload: response.data
        })
        
    }
    catch(error){
        dispatch( {
            type: EMPLOYEES_ERROR,
            // payload: error.response.data,
            error
        })
    }
}

// export const getWalletDetails = (walletId) => async dispatch => {    
//     try{
//         const headers = authHeader()
//         dispatch({
//             type: GETTING_WALLET_DETAILS,
//             payload: true
//         })
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/wallets/${walletId}?expand=custodian`, { headers })
//         dispatch( {
//             type: GET_WALLET_DETAILS,
//             payload: response.data.data
//         })
//     }
//     catch(error){
//         dispatch( {
//             type: WALLET_DETAILS_ERROR,
//             error
//             // payload: error.response.data,
//         })
//     }
// }