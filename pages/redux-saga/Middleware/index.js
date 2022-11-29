import { takeEvery, all } from "redux-saga/effects";
import * as ActionTypeUsr from '../Constants/UsrConstant'
import * as ActionTypeBatch from '../Constants/BatchConstant'
import { handleUsrSignin,handleUsrSignout,handleUsrSignup } from "./UsrMidle";
import { handleGetBatch } from "./BatchMiddle";
function* watchAll(){
    yield all([
        
        takeEvery(ActionTypeUsr.GET_SIGNIN_REQUEST,handleUsrSignin),
        takeEvery(ActionTypeUsr.POST_SIGNOUT_REQUEST,handleUsrSignout),
        takeEvery(ActionTypeUsr.ADD_SIGNUP_REQUEST,handleUsrSignup),
        takeEvery(ActionTypeBatch.GET_BATCH_REQUEST,handleGetBatch)
    ])
}

export default watchAll