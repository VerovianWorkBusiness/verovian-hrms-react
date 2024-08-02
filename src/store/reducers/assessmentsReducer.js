import { ASSESSMENTS_ERROR, CREATE_ASSESSMENT, CREATING_ASSESSMENT, GET_ASSESSMENTS, GETTING_ASSESSMENTS, UPDATE_ASSESSMENT, UPDATING_ASSESSMENT } from "../types"


const initialState = {
    assessments: [],
    loadingAssessments: false,
    assessmentsError: null,
    creatingAssessment: false,
    createdAssessment: null,
    updatingAssessment: false,
    updatedAssessment: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){

    switch(action.type){
        case GETTING_ASSESSMENTS:
        return {
            ...state,
            loadingAssessments: action.payload,
            // fetchingMembers:false
        }
        case GET_ASSESSMENTS:
        return{
            ...state,
            loadingAssessments: false,
            assessmentsError: false,
            assessments: action.payload,
        }
        case CREATING_ASSESSMENT:
        return {
            ...state,
            creatingAssessment: action.payload,
            // fetchingMembers:false
        }
        case CREATE_ASSESSMENT:
        return{
            ...state,
            creatingAssessment:false,
            assessmentsError: false,
            createdAssessment: action.payload,
        }
        case UPDATING_ASSESSMENT:
        return {
            ...state,
            updatingAssessment: action.payload,
            // fetchingMembers:false
        }
        case UPDATE_ASSESSMENT:
        return{
            ...state,
            updatingAssessment:false,
            assessmentsError: false,
            updatedAssessment: action.payload,
        }
        case ASSESSMENTS_ERROR:
        return{
            ...state,
            loadingAssessments:false,
            creatingAssessment:false,
            updatingAssessment:false,
            assessmentsError: action.payload 
        }
        default: return state
    }

}