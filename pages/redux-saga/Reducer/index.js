import { combineReducers } from "redux";
import UsrReducer from "./UsrReducer";

const rootReducer = combineReducers({
    usrStated: UsrReducer,
})

export default rootReducer