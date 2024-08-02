import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";
import departmentReducer from "./departmentReducer";
import designationReducer from "./designationReducer";
import groupReducer from "./groupReducer";
import successReducer from "./successReducer";
import shiftReducer from "./shiftReducer";
import employeeReducer from "./employeeReducer";
import holidayReducer from "./holidayReducer";
import documentReducer from "./documentReducer";
import newsReducer from "./newsReducer";
import leaveReducer from "./leaveReducer";
import trainingsReducer from "./trainingsReducer";
import instructorsReducer from "./instructorsReducer";
import assessmentsReducer from "./assessmentsReducer";

const rootReducer = combineReducers({
    // Add reducers here
    success: successReducer,
    errors: errorReducer,
    groups: groupReducer,
    shifts: shiftReducer,
    departments: departmentReducer,
    designations: designationReducer,
    employees: employeeReducer,
    holidays: holidayReducer,
    documents: documentReducer,
    news: newsReducer,
    leaves: leaveReducer,
    trainings: trainingsReducer,
    instructors: instructorsReducer,
    assessments: assessmentsReducer
});

export default rootReducer;