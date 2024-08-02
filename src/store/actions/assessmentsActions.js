import axios from "axios"
import { authHeader } from "../../utils"
import { ASSESSMENTS_ERROR, CREATE_ASSESSMENT, CREATING_ASSESSMENT, GET_ASSESSMENTS, GETTING_ASSESSMENTS, UPDATE_ASSESSMENT, UPDATING_ASSESSMENT } from "../types"


export const createAssessment = (assessmentPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_ASSESSMENT,
            payload: true
        })
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/training/assessments`, assessmentPayload, { headers })
        
        dispatch({
            type: CREATE_ASSESSMENT,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: ASSESSMENTS_ERROR,
            error
        })
    }
}

export const clearCreatedAssessment = () => async (dispatch) => {    
    dispatch({
        type: CREATE_ASSESSMENT,
        payload: null
    })
}

export const getAssessments = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${process.env.REACT_APP_API_URL}/training/assessments`
        if(filterString && filterString !== '') {
            url += `${url.includes('?') ? '&' : '?'}${filterString}`
        }

        if(page && page!=='') {
            url += `${url.includes('?') ? '&' : '?'}page=${page}`
        }

        if(perPage && perPage!=='') {
            url += `${url.includes('?') ? '&' : '?'}perPage=${perPage}`
        }

        dispatch({
            type: GETTING_ASSESSMENTS,
            payload: true
        })

        const response = await axios.get(url, { headers })
        
        dispatch({
            type: GET_ASSESSMENTS,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: ASSESSMENTS_ERROR,
            error
        })
    }
}

export const updateAssessment = (assessmentId) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_ASSESSMENT,
            payload: true
        })

        const response = await axios.put(`${process.env.REACT_APP_API_URL}/training/assessments/${assessmentId}`, { headers })
        
        dispatch({
            type: UPDATE_ASSESSMENT,
            payload: response.data.data
        })
    }
    catch(error){
        dispatch({
            type: ASSESSMENTS_ERROR,
            error
        })
    }
}

export const clearUpdatedAssessment = () => async (dispatch) => {    
    dispatch({
        type: UPDATE_ASSESSMENT,
        payload: null
    })
}

