import { GET_USER_PROFILE, USER_PROFILE_ERROR } from '../types'

import axios from 'axios'
import { authHeader } from '../../utils'

export const getUserProfile = () => async dispatch => {    
    try{
        const headers = authHeader()
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/me/?expand=roles`, { headers })

        let profile=response.data.data
        // const permissions = []
        profile.allPermissions = []

        await Promise.all(response.data.data.roles.map(async (role) => {
            role.permissions.forEach((permission) => {
                profile.allPermissions.push(permission)
            })
        }))

        // localStorage.setItem("userProfile", JSON.stringify(profile));
        localStorage.setItem("userPermissions", JSON.stringify(profile.allPermissions));

        dispatch({
            type: GET_USER_PROFILE,
            payload: profile
        })
    }
    catch(error){

        dispatch( {
            type: USER_PROFILE_ERROR,
            // payload: error.response.data,
            error,
        })
    }
}

export const clearUserProfileError = () => async dispatch => {    
    dispatch( {
        type: USER_PROFILE_ERROR,
        payload: null,
    })
}