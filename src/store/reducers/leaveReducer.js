import { CREATE_LEAVE_APPLICATION, CREATING_LEAVE_APPLICATION, GETTING_LEAVES, GETTING_LEAVE_APPLICATIONS, GET_LEAVES, GET_LEAVE_APPLICATIONS, LEAVES_ERROR, UPDATE_LEAVE, UPDATE_LEAVE_APPLICATION, UPDATING_LEAVE, UPDATING_LEAVE_APPLICATION } from "../types"

const initialState = {
    leaves: [],
    leaveApplications: [],
    loadingLeaveApplications: true,
    loadingLeaves: true,
    leavesError: null,
    creatingLeaveApplication: false,
    updatingLeaveApplication: false,
    createdLeaveApplication : null,
    updatedLeaveApplication : null,
    updatingLeave: false,
    updatedLeave: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){

    switch(action.type){
        case GETTING_LEAVE_APPLICATIONS:
        return {
            ...state,
            loadingLeaveApplications:action.payload,
        }
        case GET_LEAVE_APPLICATIONS:
        return{
            ...state,
            loadingLeaveApplications:false,
            leavesError: false,
            leaveApplications: action.payload,
        }
        case GETTING_LEAVES:
        return {
            ...state,
            loadingLeaves:action.payload,
            // fetchingMembers:false
        }
        case GET_LEAVES:
        return{
            ...state,
            loadingLeaves:false,
            leavesError: false,
            leaves: action.payload,
        }
        case CREATING_LEAVE_APPLICATION:
        return {
            ...state,
            creatingLeaveApplication: action.payload,
        }
        case CREATE_LEAVE_APPLICATION:
        return{
            ...state,
            creatingLeaveApplication: false,
            leavesError: false,
            createdLeaveApplication: action.payload,
        }
        case UPDATING_LEAVE_APPLICATION:
        return {
            ...state,
            updatingLeaveApplication: action.payload,
        }
        case UPDATE_LEAVE_APPLICATION:
        return{
            ...state,
            updatingLeaveApplication: false,
            leavesError: false,
            updatedLeaveApplication: action.payload,
        }
        case UPDATING_LEAVE:
        return {
            ...state,
            updatingLeave: action.payload,
        }
        case UPDATE_LEAVE:
        return{
            ...state,
            updatingLeave: false,
            leavesError: false,
            updatedLeave: action.payload,
        }
        case LEAVES_ERROR:
        return{
            ...state,
            loadingNewsArticles:false,
            creatingNewsArticles:false,
            newsError: action.payload 
        }
        default: return state
    }

}