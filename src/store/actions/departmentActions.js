import axios from "axios"
import { authHeader } from "../../utils"
import { CREATE_DEPARTMENT, CREATING_DEPARTMENT, DEPARTMENTS_ERROR, GETTING_DEPARTMENTS, GET_DEPARTMENTS } from "../types"

export const createDepartment = (departmentPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_DEPARTMENT,
            payload: true
        })
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/departments`, departmentPayload, { headers })
        
        dispatch({
            type: CREATE_DEPARTMENT,
            payload: response.data.data
        })
        
    }
    catch(error){
        // console.log(error)
        dispatch({
            type: DEPARTMENTS_ERROR,
            // payload: error.response.data
            error
        })
    }
}

export const updateDepartment = (departmentId, departmentPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_DEPARTMENT,
            payload: true
        })
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/departments/update/${departmentId}`, departmentPayload, { headers })
        
        dispatch({
            type: CREATE_DEPARTMENT,
            payload: response.data.data
        })
        
    }
    catch(error){
        // console.log(error)
        dispatch({
            type: DEPARTMENTS_ERROR,
            // payload: error.response.data
            error
        })
    }
}

export const updateDepartmentLeavePolicies = (departmentId, leavePolicyPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_DEPARTMENT,
            payload: true
        })
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/leave-policies/update/${departmentId}`, leavePolicyPayload, { headers })
        
        dispatch({
            type: CREATE_DEPARTMENT,
            payload: response.data.data
        })
        
    }
    catch(error){
        console.log(error)
        dispatch({
            type: DEPARTMENTS_ERROR,
            // payload: error.response.data
            error
        })
    }
}

// export const fetchDepartmentLeavePolicies = (departmentId) => async (dispatch) => {    
//     try{
//         const headers = authHeader()

//         dispatch({
//             type: CREATING_DEPARTMENT,
//             payload: true
//         })
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/leave-policies/update/${departmentId}`, { headers })
        
//         dispatch({
//             type: CREATE_DEPARTMENT,
//             payload: response.data.data
//         })
        
//     }
//     catch(error){
//         console.log(error)
//         dispatch({
//             type: DEPARTMENTS_ERROR,
//             // payload: error.response.data
//             error
//         })
//     }
// }

export const deleteDepartment = (departmentId) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_DEPARTMENT,
            payload: true
        })
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/departments/${departmentId}`, { headers })
        
        dispatch({
            type: CREATE_DEPARTMENT,
            payload: response.data.data
        })
        
    }
    catch(error){
        // console.log(error)
        dispatch({
            type: DEPARTMENTS_ERROR,
            // payload: error.response.data
            error
        })
    }
}

export const clearCreatedDepartment = () => async (dispatch) => {    
    dispatch({
        type: CREATE_DEPARTMENT,
        payload: null
    })
}

export const fetchDepartments = (pagination, filters, sort, action) => async dispatch => {    
    try{
        const headers = authHeader()
        let requestUrl = 'departments'

        dispatch( {
            type: GETTING_DEPARTMENTS,
            payload: true
        })

        // let appliedFilters =''
        // if (filters && filters!==null && filters.length > 0) {
        //     appliedFilters = parseFilters(filters, action, 'WALLETS')
        // }


        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}`, { headers })
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}?expand=custodian&limit=${pagination.perPage}&page=${pagination.page}&${appliedFilters}&${applySort(sort)}`, { headers })

        dispatch( {
            type: GET_DEPARTMENTS,
            payload: response.data.data.departments
        })
        
    }
    catch(error){
        dispatch( {
            type: DEPARTMENTS_ERROR,
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