import axios from "axios"
import { authHeader } from "../../utils"
import { CREATE_DOCUMENT, CREATING_DOCUMENT, DOCUMENTS_ERROR, GETTING_DOCUMENTS, GET_DOCUMENTS, UPDATE_DOCUMENT, UPDATING_DOCUMENT} from "../types"

export const createDocument = (designationPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_DOCUMENT,
            payload: true
        })
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/documents`, designationPayload, { headers })
        
        dispatch({
            type: CREATE_DOCUMENT,
            payload: response.data.data
        })
        
    }
    catch(error){
        // console.log(error)
        dispatch({
            type: DOCUMENTS_ERROR,
            // payload: error.response.data
            error
        })
    }
}

export const fetchDocuments = (pagination, filters, sort, action) => async dispatch => {    
    try{
        const headers = authHeader()
        let requestUrl = 'documents'

        dispatch( {
            type: GETTING_DOCUMENTS,
            payload: true
        })

        // let appliedFilters =''
        // if (filters && filters!==null && filters.length > 0) {
        //     appliedFilters = parseFilters(filters, action, 'WALLETS')
        // }


        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}`, { headers })
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}?expand=custodian&limit=${pagination.perPage}&page=${pagination.page}&${appliedFilters}&${applySort(sort)}`, { headers })

        dispatch( {
            type: GET_DOCUMENTS,
            payload: response.data.data.documents
        })
        
    }
    catch(error){
        dispatch( {
            type: DOCUMENTS_ERROR,
            // payload: error.response.data,
            error
        })
    }
}

export const updateDocument = (documentId, documentPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_DOCUMENT,
            payload: true
        })
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/documents/update/${documentId}`, documentPayload, { headers })
        
        dispatch({
            type: UPDATE_DOCUMENT,
            payload: response.data.data
        })
        
    }
    catch(error){
        // console.log(error)
        dispatch({
            type: DOCUMENTS_ERROR,
            // payload: error.response.data
            error
        })
    }
}

