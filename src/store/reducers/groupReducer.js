import { CREATE_GROUP, CREATING_GROUP, GETTING_GROUPS, GET_GROUPS, GROUPS_ERROR } from "../types"

const initialState = {
    groups: null,
    loadingGroups: false,
    groupsError: null,
    creatingGroup: false,
    createdGroup: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){

    switch(action.type){
        case GETTING_GROUPS:
        return {
            ...state,
            loadingGroups:action.payload,
            // fetchingMembers:false
        }
        case GET_GROUPS:
        return{
            ...state,
            loadingGroups:false,
            groupsError: false,
            groups: action.payload,
        }
        case CREATING_GROUP:
        return {
            ...state,
            creatingGroup: action.payload,
            // fetchingMembers:false
        }
        case CREATE_GROUP:
        return{
            ...state,
            creatingGroup:false,
            groupsError: false,
            createdGroup: action.payload,
        }
        case GROUPS_ERROR:
        return{
            ...state,
            loadingGroups:false,
            groups: null,
            groupsError: action.payload 
        }
        default: return state
    }

}