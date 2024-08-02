import { CLEAR_SUCCESS_MESSAGE, SET_SUCCESS_MESSAGE } from "../types";

const initialState = {
    successMessage: null,
};
  
const successReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUCCESS_MESSAGE:
        return { 
            successMessage: action.payload 
        };
        case CLEAR_SUCCESS_MESSAGE:
        return { 
            successMessage: null 
        };
        default:
        return state;
    }
};
  
export default successReducer;