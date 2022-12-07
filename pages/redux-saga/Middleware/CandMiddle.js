import { call, put } from 'redux-saga/effects'
import CandidateApi from '../../api/CandidateApi'
import {
     GetOneCandSuccess, GetOneCandFailed, GetUserRequest, GetUserFailed
    , GetApplySuccess, GetApplyFailed, GetFilterSuccess, GetFilterFailed, GetContractSuccess, GetContractFailed,
    GetDisqualifiedSuccess, GetDisqualifiedFailed, GetNotrespondSuccess, GetNotrespondFailed, EditApplySuccess, EditApplyFailed,
    EditContractSuccess, EditContractFailed, EditFilterSuccess, EditFilterFailed, EditDisqualifiedSuccess, EditDisqualifiedFailed,
    EditNotrespondSuccess, EditNotrespondFailed
} from '../Action/CandAction'

function* handleGetApply() {
    try {
        const result = yield call(CandidateApi.apply)
        yield put(GetApplySuccess(result))
    } catch (error) {
        yield put(GetApplyFailed(error))
    }
}

function* handleGetFilter() {
    try {
        const result = yield call(CandidateApi.filter)
        yield put(GetFilterSuccess(result))
    } catch (error) {
        yield put(GetFilterFailed(error))
    }
}

function* handleGetContract() {
    try {
        const result = yield call(CandidateApi.contract)
        yield put(GetContractSuccess(result))
    } catch (error) {
        yield put(GetContractFailed(error))
    }
}

function* handleGetDisqualified() {
    try {
        const result = yield call(CandidateApi.disqualified)
        yield put(GetDisqualifiedSuccess(result))
    } catch (error) {
        yield put(GetDisqualifiedFailed(error))
    }
}

function* handleGetNotrespond() {
    try {
        const result = yield call(CandidateApi.notrespond)
        yield put(GetNotrespondSuccess(result))
    } catch (error) {
        yield put(GetNotrespondFailed(error))
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

function* handleEditApply(action) {
    const { payload } = action
    try {
        const result = yield call(CandidateApi.editApply, payload)
        yield put(EditApplySuccess(result.data))
    } catch (error) {
        yield put(EditApplyFailed(error))
    }
}

function* handleEditFilter(action) {
    const { payload } = action
    try {
        const result = yield call(CandidateApi.editFilter, payload)
        yield put(EditFilterSuccess(result.data))
    } catch (error) {
        yield put(EditFilterFailed(error))
    }
}

function* handleEditContract(action) {
    const { payload } = action
    try {
        const result = yield call(CandidateApi.editContract, payload)
        yield put(EditContractSuccess(result.data))
    } catch (error) {
        yield put(EditContractFailed(error))
    }
}

function* handleEditDisqualified(action) {
    const { payload } = action
    try {
        const result = yield call(CandidateApi.editDisqualified, payload)
        yield put(EditDisqualifiedSuccess(result.data))
    } catch (error) {
        yield put(EditDisqualifiedFailed(error))
    }
}

function* handleEditNotrespond(action) {
    const { payload } = action
    try {
        const result = yield call(CandidateApi.editNotrespond, payload)
        yield put(EditNotrespondSuccess(result.data))
    } catch (error) {
        yield put(EditNotrespondFailed(error))
    }
}

export {
    handleEditApply,
    handleEditFilter,
    handleEditContract,
    handleEditDisqualified,
    handleEditNotrespond,
    handleGetUser,
    //handleGetOneCand,
    handleGetApply,
    handleGetFilter,
    handleGetContract,
    handleGetDisqualified,
    handleGetNotrespond,

}