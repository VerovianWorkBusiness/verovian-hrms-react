import axios from "axios"
import { authHeader } from "../../utils"
import { CREATE_HOLIDAY, CREATING_HOLIDAY, GETTING_HOLIDAYS, GET_HOLIDAYS, HOLIDAYS_ERROR } from "../types"

export const createHoliday = (walletPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_HOLIDAY,
            payload: true
        })
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/holidays`, walletPayload, { headers })
        
        dispatch({
            type: CREATE_HOLIDAY,
            payload: response.data.data
        })
        
    }
    catch(error){
        // console.log(error)
        dispatch({
            type: HOLIDAYS_ERROR,
            // payload: error.response.data
            error
        })
    }
}

export const fetchHolidays = (pagination, filters, sort, action) => async dispatch => {    
    try{
        const headers = authHeader()
        let requestUrl = 'holidays'
        // if(userPermissions().includes('wallets.list.self') && !userPermissions().includes('wallets.*')) {
        //     requestUrl = 'wallets/self'
        // }

        dispatch( {
            type: GETTING_HOLIDAYS,
            payload: true
        })

        // let appliedFilters =''
        // if (filters && filters!==null && filters.length > 0) {
        //     appliedFilters = parseFilters(filters, action, 'WALLETS')
        // }


        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}`, { headers })
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}?expand=custodian&limit=${pagination.perPage}&page=${pagination.page}&${appliedFilters}&${applySort(sort)}`, { headers })

        dispatch( {
            type: GET_HOLIDAYS,
            payload: response.data.data.holidays
        })
        
    }
    catch(error){
        dispatch( {
            type: HOLIDAYS_ERROR,
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