import { takeEvery, all } from "redux-saga/effects";
import * as ActionTypeUsr from '../Constants/UsrConstant'
import * as ActionTypeBatch from '../Constants/BatchConstant'
import * as ActionTypeCand from '../Constants/CandConstant'
import { handleUsrSignin,handleUsrSignout,handleUsrSignup } from "./UsrMidle";
import { handleGetBatch } from "./BatchMiddle";
import { handleGetCand } from "./CandMiddle";
import { handleGetUser } from "./CandMiddle";
import { handleEditCand } from "./CandMiddle";
function* watchAll(){
    yield all([
        
        takeEvery(ActionTypeUsr.GET_SIGNIN_REQUEST,handleUsrSignin),
        takeEvery(ActionTypeUsr.POST_SIGNOUT_REQUEST,handleUsrSignout),
        takeEvery(ActionTypeUsr.ADD_SIGNUP_REQUEST,handleUsrSignup),
        takeEvery(ActionTypeBatch.GET_BATCH_REQUEST,handleGetBatch),
        takeEvery(ActionTypeCand.GET_CAND_REQUEST,handleGetCand),
        takeEvery(ActionTypeCand.GET_USER_REQUEST,handleGetUser),
        takeEvery(ActionTypeCand.EDIT_CAND_REQUEST,handleGetUser),
    ])
}

export default watchAll