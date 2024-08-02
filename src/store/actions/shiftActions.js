import axios from "axios"
import { authHeader } from "../../utils"
import { CREATE_SHIFT, CREATING_SHIFT, GETTING_SHIFTS, GETTING_SHIFT_DETAILS, GET_SHIFTS, GET_SHIFT_DETAILS, SHIFTS_ERROR } from "../types"

export const createShift = (shiftPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_SHIFT,
            payload: true
        })
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/shifts`, shiftPayload, { headers })
        
        dispatch({
            type: CREATE_SHIFT,
            payload: response.data.data
        })
        
    }
    catch(error){
        // console.log(error)
        dispatch({
            type: SHIFTS_ERROR,
            // payload: error.response.data
            error
        })
    }
}

export const fetchShifts = (pagination, filters, sort, action) => async dispatch => {    
    try{
        const headers = authHeader()
        let requestUrl = 'shifts'
        // if(userPermissions().includes('wallets.list.self') && !userPermissions().includes('wallets.*')) {
        //     requestUrl = 'wallets/self'
        // }

        dispatch( {
            type: GETTING_SHIFTS,
            payload: true
        })

        // let appliedFilters =''
        // if (filters && filters!==null && filters.length > 0) {
        //     appliedFilters = parseFilters(filters, action, 'WALLETS')
        // }


        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}`, { headers })
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}?expand=custodian&limit=${pagination.perPage}&page=${pagination.page}&${appliedFilters}&${applySort(sort)}`, { headers })

        dispatch( {
            type: GET_SHIFTS,
            payload: response.data.data.shifts
        })
        
    }
    catch(error){
        dispatch( {
            type: SHIFTS_ERROR,
            // payload: error.response.data,
            error
        })
    }
}

export const fetchShiftDetails = (shiftId) => async dispatch => {    
    try{
        const headers = authHeader()
        let requestUrl = `shifts/${shiftId}`

        dispatch( {
            type: GETTING_SHIFT_DETAILS,
            payload: true
        })

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}`, { headers })
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}?expand=custodian&limit=${pagination.perPage}&page=${pagination.page}&${appliedFilters}&${applySort(sort)}`, { headers })
        dispatch( {
            type: GET_SHIFT_DETAILS,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch( {
            type: SHIFTS_ERROR,
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