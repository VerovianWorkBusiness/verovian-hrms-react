import axios from "axios"
import { authHeader } from "../../utils"
import { CREATE_TRAINING, CREATE_TRAINING_MATERIAL, CREATE_TRAINING_MODULE, CREATING_TRAINING, CREATING_TRAINING_MATERIAL, CREATING_TRAINING_MODULE, GET_TRAINING_MATERIALS, GET_TRAINING_MODULES, GET_TRAININGS, GETTING_TRAINING_MATERIALS, GETTING_TRAINING_MODULES, GETTING_TRAININGS, TRAININGS_ERROR, UPDATE_TRAINING, UPDATE_TRAINING_MATERIAL, UPDATE_TRAINING_MODULE, UPDATING_TRAINING, UPDATING_TRAINING_MATERIAL, UPDATING_TRAINING_MODULE } from "../types"

export const createTrainingMaterial = (trainingMaterialPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_TRAINING_MATERIAL,
            payload: true
        })
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/training/materials`, trainingMaterialPayload, { headers })
        
        dispatch({
            type: CREATE_TRAINING_MATERIAL,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: TRAININGS_ERROR,
            error
        })
    }
}

export const getTrainingMaterials = () => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: GETTING_TRAINING_MATERIALS,
            payload: true
        })
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/training/materials?expand=instructor`, { headers })
        // console.log(response.data.data)
        dispatch({
            type: GET_TRAINING_MATERIALS,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: TRAININGS_ERROR,
            error
        })
    }
}

export const createTrainingModule = (trainingModulePayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_TRAINING_MODULE,
            payload: true
        })
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/training/modules`, trainingModulePayload, { headers })
        
        dispatch({
            type: CREATE_TRAINING_MODULE,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: TRAININGS_ERROR,
            error
        })
    }
}

export const getTrainingModules = () => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: GETTING_TRAINING_MODULES,
            payload: true
        })
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/training/modules`, { headers })
        // console.log(response.data.data)
        dispatch({
            type: GET_TRAINING_MODULES,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: TRAININGS_ERROR,
            error
        })
    }
}

export const createTraining = (trainingPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_TRAINING,
            payload: true
        })
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/training/trainings`, trainingPayload, { headers })
        
        dispatch({
            type: CREATE_TRAINING,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: TRAININGS_ERROR,
            error
        })
    }
}

export const getTrainings = () => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: GETTING_TRAININGS,
            payload: true
        })
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/training/trainings`, { headers })
        // console.log(response.data.data)
        dispatch({
            type: GET_TRAININGS,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: TRAININGS_ERROR,
            error
        })
    }
}

export const updateTrainingMaterial = (trainingId) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_TRAINING_MATERIAL,
            payload: true
        })

        const response = await axios.put(`${process.env.REACT_APP_API_URL}/training/materials/${trainingId}`, { headers })
        
        dispatch({
            type: UPDATE_TRAINING_MATERIAL,
            payload: response.data.data
        })
    }
    catch(error){
        dispatch({
            type: TRAININGS_ERROR,
            error
        })
    }
}

export const updateTrainingModule = (applicationId) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_TRAINING_MODULE,
            payload: true
        })

        const response = await axios.put(`${process.env.REACT_APP_API_URL}/leaves/applications/${applicationId}`, { headers })
        
        dispatch({
            type: UPDATE_TRAINING_MODULE,
            payload: response.data.data
        })
    }
    catch(error){
        dispatch({
            type: TRAININGS_ERROR,
            error
        })
    }
}

export const updateTraining = (applicationId) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_TRAINING,
            payload: true
        })

        const response = await axios.put(`${process.env.REACT_APP_API_URL}/leaves/applications/${applicationId}`, { headers })
        
        dispatch({
            type: UPDATE_TRAINING,
            payload: response.data.data
        })
    }
    catch(error){
        dispatch({
            type: TRAININGS_ERROR,
            error
        })
    }
}

export const clearCreatedTraining = () => async (dispatch) => {    
    dispatch({
        type: CREATE_TRAINING,
        payload: null
    })
}

export const clearUpdatedTraining = () => async (dispatch) => {    
    dispatch({
        type: UPDATE_TRAINING,
        payload: null
    })
}

export const clearCreatedTrainingMaterial = () => async (dispatch) => {    
    dispatch({
        type: CREATE_TRAINING_MATERIAL,
        payload: null
    })
}

export const clearUpdatedTrainingMaterial = () => async (dispatch) => {    
    dispatch({
        type: UPDATE_TRAINING_MATERIAL,
        payload: null
    })
}

export const clearCreatedTrainingModule = () => async (dispatch) => {    
    dispatch({
        type: CREATE_TRAINING_MODULE,
        payload: null
    })
}

export const clearUpdatedTrainingModule = () => async (dispatch) => {    
    dispatch({
        type: UPDATE_TRAINING_MODULE,
        payload: null
    })
}

