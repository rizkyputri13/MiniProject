import { call, put } from 'redux-saga/effects'
import CandidateApi from '../../api/CandidateApi'
import {
    GetCandSuccess, GetCandFailed, GetOneCandSuccess, GetOneCandFailed, GetUserRequest, GetUserFailed
    , EditCandSuccess, EditCandFailed,
} from '../Action/CandAction'

function* handleGetCand() {
    try {
        const result = yield call(CandidateApi.bootcamp)
        yield put(GetCandSuccess(result))
    } catch (error) {
        yield put(GetCandFailed(error))
    }
}

function* handleGetUser() {
    try {
        const result = yield call(CandidateApi.user)
        yield put(GetUserSuccess(result))
    } catch (error) {
        yield put(GetUserFailed(error))
    }
}

// function* handleGetOneCand(action) {
//     const { payload } = action
//     try {
//         const result = yield call(CandidateApi.FindOne, payload)
//         yield put(GetOneCandSuccess(result))
//     } catch (error) {
//         yield put(GetOneCandFailed(error))
//     }
// }

function* handleEditCand(action) {
    const { payload } = action
    try {
        const result = yield call(CandidateApi.user, payload)
        yield put(EditCandSuccess(result.data))
    } catch (error) {
        yield put(EditCandFailed(error))
    }
}


export {
    handleEditCand,
    handleGetUser,
    //handleGetOneCand,
    handleGetCand,

}