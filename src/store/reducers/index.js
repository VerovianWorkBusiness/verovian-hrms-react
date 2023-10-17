import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";
import departmentReducer from "./departmentReducer";
import designationReducer from "./designationReducer";

const rootReducer = combineReducers({
    // Add reducers here
    errors: errorReducer,
    departments: departmentReducer,
    designations: designationReducer,
});

export default rootReducer;