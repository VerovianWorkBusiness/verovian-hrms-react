import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";

const rootReducer = combineReducers({
    // Add reducers here
    errors: errorReducer,
});

export default rootReducer;