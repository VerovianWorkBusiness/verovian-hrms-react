import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";
import departmentReducer from "./departmentReducer";
import designationReducer from "./designationReducer";
import groupReducer from "./groupReducer";
import successReducer from "./successReducer";
import shiftReducer from "./shiftReducer";

const rootReducer = combineReducers({
    // Add reducers here
    success: successReducer,
    errors: errorReducer,
    groups: groupReducer,
    shifts: shiftReducer,
    departments: departmentReducer,
    designations: designationReducer,
});

export default rootReducer;