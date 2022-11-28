import { call, put } from 'redux-saga/effects'
import CandidateApi from '../../api/CandidateApi'
import {
    GetCandSuccess, GetCandFailed, GetOneCandSuccess, GetOneCandFailed
    , EditCandSuccess, EditCandFailed,
} from '../Action/CandAction'

function* handleGetCand() {
    try {
        const result = yield call(CandidateApi.List)
        yield put(GetCandSuccess(result))
    } catch (error) {
        yield put(GetCandFailed(error))
    }
}

function* handleGetOneCand(action) {
    const { payload } = action
    try {
        const result = yield call(CandidateApi.FindOne, payload)
        yield put(GetOneCandSuccess(result))
    } catch (error) {
        yield put(GetOneCandFailed(error))
    }
}

function* handleEditCand(action) {
    const { payload } = action
    try {
        const result = yield call(CandidateApi.UpdateFile, payload)
        yield put(EditCandSuccess(result.data))
    } catch (error) {
        yield put(EditCandFailed(error))
    }
}


export {
    handleEditCand,
    handleGetOneCand,
    handleGetCand,

}