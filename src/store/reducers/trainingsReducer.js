import { CREATE_TRAINING, CREATE_TRAINING_MATERIAL, CREATE_TRAINING_MODULE, CREATING_TRAINING, CREATING_TRAINING_MATERIAL, CREATING_TRAINING_MODULE, GET_TRAINING_MATERIALS, GET_TRAINING_MODULES, GET_TRAININGS, GETTING_TRAINING_MATERIALS, GETTING_TRAINING_MODULES, GETTING_TRAININGS, TRAININGS_ERROR, UPDATE_TRAINING, UPDATE_TRAINING_MATERIAL, UPDATE_TRAINING_MODULE, UPDATING_TRAINING, UPDATING_TRAINING_MATERIAL, UPDATING_TRAINING_MODULE } from "../types"

const initialState = {
    trainingModules: [],
    trainingMaterials: [],
    trainings: [],
    loadingTrainings: true,
    loadingTrainingModules: true,
    loadingTrainingMaterials: true,
    trainingsError: null,
    creatingTraining: false,
    creatingTrainingModule: false,
    creatingTrainingMaterial: false,
    createdTraining: null,
    createdTrainingModule: null,
    createdTrainingMaterial: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){

    switch(action.type){
        case GETTING_TRAININGS:
        return {
            ...state,
            loadingTrainings: action.payload,
            // fetchingMembers:false
        }
        case GET_TRAININGS:
        return{
            ...state,
            loadingTrainings: false,
            trainingsError: null,
            trainings: action.payload,
        }
        case CREATING_TRAINING:
        return {
            ...state,
            creatingTraining: action.payload,
            // fetchingMembers:false
        }
        case CREATE_TRAINING:
        return{
            ...state,
            creatingTraining: false,
            trainingsError: null,
            createdTraining: action.payload,
        }
        case UPDATING_TRAINING:
        return {
            ...state,
            updatingTraining: action.payload,
            // fetchingMembers:false
        }
        case UPDATE_TRAINING:
        return{
            ...state,
            updatingTraining:false,
            trainingsError: null,
            updatedTraining: action.payload,
        }
        case GETTING_TRAINING_MODULES:
        return {
            ...state,
            loadingTrainingModules: action.payload,
            // fetchingMembers:false
        }
        case GET_TRAINING_MODULES:
        return{
            ...state,
            loadingTrainingModules:false,
            trainingsError: null,
            trainingModules: action.payload,
        }
        case CREATING_TRAINING_MODULE:
        return {
            ...state,
            creatingTrainingModule: action.payload,
            // fetchingMembers:false
        }
        case CREATE_TRAINING_MODULE:
        return{
            ...state,
            creatingTrainingModule:false,
            trainingsError: false,
            createdTrainingModule: action.payload,
        }
        case UPDATING_TRAINING_MODULE:
        return {
            ...state,
            updatingTrainingModule: action.payload,
            // fetchingMembers:false
        }
        case UPDATE_TRAINING_MODULE:
        return{
            ...state,
            updateTrainingModule:false,
            trainingsError: false,
            updatedTrainingModule: action.payload,
        }
        case GETTING_TRAINING_MATERIALS:
        return {
            ...state,
            loadingTrainingMaterials: action.payload,
            // fetchingMembers:false
        }
        case GET_TRAINING_MATERIALS:
        return{
            ...state,
            loadingTrainingMaterials:false,
            trainingsError: null,
            trainingMaterials: action.payload,
        }
        case CREATING_TRAINING_MATERIAL:
        return {
            ...state,
            creatingTrainingMaterial: action.payload,
            // fetchingMembers:false
        }
        case CREATE_TRAINING_MATERIAL:
        return{
            ...state,
            creatingTrainingMaterial:false,
            trainingsError: false,
            createdTrainingMaterial: action.payload,
        }
        case UPDATING_TRAINING_MATERIAL:
        return {
            ...state,
            updatingTrainingMaterial: action.payload,
            // fetchingMembers:false
        }
        case UPDATE_TRAINING_MATERIAL:
        return{
            ...state,
            updateTrainingMaterial:false,
            trainingsError: false,
            updatedTrainingMaterial: action.payload,
        }
        case TRAININGS_ERROR:
        return{
            ...state,
            loadingHolidays:false,
            holidaysError: action.payload 
        }
        default: return state
    }

}