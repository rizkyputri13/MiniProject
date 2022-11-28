import { call, put } from 'redux-saga/effects'
import BatchidateApi from '../../api/BatchidateApi'
import {
    GetBatchSuccess, GetBatchFailed, GetOneBatchSuccess, GetOneBatchFailed
    , EditBatchSuccess, EditBatchFailed,
} from '../Action/BatchAction'

function* handleGetBatch() {
    try {
        const result = yield call(BatchidateApi.List)
        yield put(GetBatchSuccess(result))
    } catch (error) {
        yield put(GetBatchFailed(error))
    }
}

function* handleGetOneBatch(action) {
    const { payload } = action
    try {
        const result = yield call(BatchidateApi.FindOne, payload)
        yield put(GetOneBatchSuccess(result))
    } catch (error) {
        yield put(GetOneBatchFailed(error))
    }
}

function* handleEditBatch(action) {
    const { payload } = action
    try {
        const result = yield call(BatchidateApi.UpdateFile, payload)
        yield put(EditBatchSuccess(result.data))
    } catch (error) {
        yield put(EditBatchFailed(error))
    }
}


export {
    handleEditBatch,
    handleGetOneBatch,
    handleGetBatch,

}