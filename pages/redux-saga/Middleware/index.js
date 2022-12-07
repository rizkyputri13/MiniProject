import { takeEvery, all } from "redux-saga/effects";
import * as ActionTypeUsr from '../Constants/UsrConstant'
import * as ActionTypeBatch from '../Constants/BatchConstant'
import * as ActionTypeCand from '../Constants/CandConstant'
import { handleUsrSignin,handleUsrSignout,handleUsrSignup } from "./UsrMidle";
import { handleGetBatch, handleEditBatch, handleDeleteBatch } from "./BatchMiddle";
import { handleEditApply, handleEditContract, handleEditDisqualified, handleEditFilter, handleEditNotrespond,
     handleGetApply, handleGetContract, handleGetDisqualified, handleGetFilter, handleGetNotrespond } from "./CandMiddle";
import { handleGetUser } from "./CandMiddle";
function* watchAll(){
    yield all([
        
        takeEvery(ActionTypeUsr.GET_SIGNIN_REQUEST,handleUsrSignin),
        takeEvery(ActionTypeUsr.POST_SIGNOUT_REQUEST,handleUsrSignout),
        takeEvery(ActionTypeUsr.ADD_SIGNUP_REQUEST,handleUsrSignup),
        takeEvery(ActionTypeBatch.GET_BATCH_REQUEST,handleGetBatch),
        takeEvery(ActionTypeBatch.EDIT_BATCH_REQUEST,handleEditBatch),
        takeEvery(ActionTypeBatch.DEL_BATCH_REQUEST,handleDeleteBatch),
        takeEvery(ActionTypeCand.GET_APPLY_REQUEST,handleGetApply),
        takeEvery(ActionTypeCand.GET_FILTER_REQUEST,handleGetFilter),
        takeEvery(ActionTypeCand.GET_CONTRACT_REQUEST,handleGetContract),
        takeEvery(ActionTypeCand.GET_DISQUALIFIED_REQUEST,handleGetDisqualified),
        takeEvery(ActionTypeCand.GET_NOTRESPOND_REQUEST,handleGetNotrespond),
        takeEvery(ActionTypeCand.GET_USER_REQUEST,handleGetUser),
        takeEvery(ActionTypeCand.EDIT_APPLY_REQUEST,handleEditApply),
        takeEvery(ActionTypeCand.EDIT_FILTER_REQUEST,handleEditFilter),
        takeEvery(ActionTypeCand.EDIT_CONTRACT_REQUEST,handleEditContract),
        takeEvery(ActionTypeCand.EDIT_DISQUALIFIED_REQUEST,handleEditDisqualified),
        takeEvery(ActionTypeCand.EDIT_NOTRESPOND_REQUEST,handleEditNotrespond),


    ])
}

export default watchAll