import { combineReducers } from "redux";
import BatchReducer from "./BatchReducer";
import CandReducer from "./CandReducer";
import UsrReducer from "./UsrReducer";

const rootReducer = combineReducers({
    usrStated: UsrReducer,
    batchStated: BatchReducer,
    candidateStated: CandReducer,
})

export default rootReducer