import { combineReducers } from "redux";
import BatchReducer from "./BatchReducer";
import UsrReducer from "./UsrReducer";

const rootReducer = combineReducers({
    usrStated: UsrReducer,
    batchStated: BatchReducer,
})

export default rootReducer