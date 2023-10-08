import { GET_USER_PROFILE, USER_PROFILE_ERROR } from "../types"

const initialState = {
    profile: null,
    profileError: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){

    switch(action.type){
        case GET_USER_PROFILE:
        return {
            ...state,
            profile:action.payload,
            // fetchingMembers:false
        }
        case USER_PROFILE_ERROR:
        return{
            ...state,
            // fetchingMembers: false, 
            profileError: action.payload 
        }
        default: return state
    }

}