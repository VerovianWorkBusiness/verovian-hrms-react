import axios from "axios"
import { authHeader } from "../../utils"
import { CREATE_INSTRUCTOR, CREATING_INSTRUCTOR, GET_INSTRUCTORS, GETTING_INSTRUCTORS, INSTRUCTORS_ERROR, UPDATE_INSTRUCTOR, UPDATING_INSTRUCTOR } from "../types"

export const createInstructor = (instructorPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_INSTRUCTOR,
            payload: true
        })
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/training/instructors`, instructorPayload, { headers })
        
        dispatch({
            type: CREATE_INSTRUCTOR,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: INSTRUCTORS_ERROR,
            error
        })
    }
}

export const clearCreatedInstructor = () => async (dispatch) => {    
    dispatch({
        type: CREATE_INSTRUCTOR,
        payload: null
    })
}

export const getInstructors = () => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: GETTING_INSTRUCTORS,
            payload: true
        })
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/training/instructors`, { headers })
        // console.log(response.data.data)
        dispatch({
            type: GET_INSTRUCTORS,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: INSTRUCTORS_ERROR,
            error
        })
    }
}

export const updateInstructor = (instructorId) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_INSTRUCTOR,
            payload: true
        })

        const response = await axios.put(`${process.env.REACT_APP_API_URL}/training/instructors/${instructorId}`, { headers })
        
        dispatch({
            type: UPDATE_INSTRUCTOR,
            payload: response.data.data
        })
    }
    catch(error){
        dispatch({
            type: INSTRUCTORS_ERROR,
            error
        })
    }
}

export const clearUpdatedInstructor = (applicationId) => async (dispatch) => {    
    dispatch({
        type: UPDATE_INSTRUCTOR,
        payload: null
    })
}

