import { call, put } from 'redux-saga/effects'
import BatchApi from '../../api/BatchApi'
import {
    GetBatchSuccess, GetBatchFailed, GetOneBatchSuccess, GetOneBatchFailed
    , EditBatchSuccess, EditBatchFailed, DeleteBatchSuccess, DeleteBatchFailed
} from '../Action/BatchAction'

function* handleGetBatch() {
    try {
        const result = yield call(BatchApi.getBatch)
        yield put(GetBatchSuccess(result))
    } catch (error) {
        yield put(GetBatchFailed(error))
    }
}

// function* handleGetOneBatch(action) {
//     const { payload } = action
//     try {
//         const result = yield call(BatchApi.FindOne, payload)
//         yield put(GetOneBatchSuccess(result))
//     } catch (error) {
//         yield put(GetOneBatchFailed(error))
//     }
// }

function* handleEditBatch(action) {
    const { payload } = action
    try {
        const result = yield call(BatchApi.updateBatch, payload)
        yield put(EditBatchSuccess(result.data))
    } catch (error) {
        yield put(EditBatchFailed(error))
    }
}

function* handleDeleteBatch(action) {
    const { payload } = action
    try {
        const result = yield call(BatchApi.deleteBatch, payload)
        yield put(DeleteBatchSuccess(result.data))
    } catch (error) {
        yield put(DeleteBatchFailed(error))
    }
}

export {
    handleEditBatch,
    //handleGetOneBatch,
    handleGetBatch,
    handleDeleteBatch

}