import axios from "axios"
import { authHeader } from "../../utils"
import { CREATE_LEAVE_APPLICATION, CREATING_LEAVE_APPLICATION, GETTING_LEAVE_APPLICATIONS, GET_LEAVE_APPLICATIONS, LEAVES_ERROR, UPDATE_LEAVE_APPLICATION, UPDATING_LEAVE_APPLICATION } from "../types"

export const createLeaveApplication = (leaveApplicationPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_LEAVE_APPLICATION,
            payload: true
        })
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/leaves/applications`, leaveApplicationPayload, { headers })
        
        dispatch({
            type: CREATE_LEAVE_APPLICATION,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: LEAVES_ERROR,
            error
        })
    }
}

export const getLeaveApplications = () => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: GETTING_LEAVE_APPLICATIONS,
            payload: true
        })
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/leaves/applications`, { headers })
        // console.log(response.data.data)
        dispatch({
            type: GET_LEAVE_APPLICATIONS,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: LEAVES_ERROR,
            error
        })
    }
}

export const updateLeaveApplication = (applicationId) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_LEAVE_APPLICATION,
            payload: true
        })

        const response = await axios.put(`${process.env.REACT_APP_API_URL}/leaves/applications/${applicationId}`, { headers })
        
        dispatch({
            type: UPDATE_LEAVE_APPLICATION,
            payload: response.data.data
        })
    }
    catch(error){
        dispatch({
            type: LEAVES_ERROR,
            error
        })
    }
}

export const clearCreatedLeaveApplication = (applicationId) => async (dispatch) => {    
    dispatch({
        type: CREATE_LEAVE_APPLICATION,
        payload: null
    })
}

