import * as ActionType from '../Constants/BatchConstant'

export const GetBatchRequest = () => ({
    type: ActionType.GET_BATCH_REQUEST

})

export const GetBatchSuccess = (payload) =>({
    type: ActionType.GET_BATCH_SUCCESS,
    payload
})

export const GetBatchFailed = (payload) => ({
    type:ActionType.GET_BATCH_FAILED,
    payload
})


export const GetOneBatchRequest = (payload) => ({
    type: ActionType.GETONE_BATCH_REQUEST,
    payload

})

export const GetOneBatchSuccess = (payload) =>({
    type: ActionType.GETONE_BATCH_SUCCESS,
    payload
})

export const GetOneBatchFailed = (payload) => ({
    type:ActionType.GETONE_BATCH_FAILED,
    payload
})


export const EditBatchRequest = (payload) =>({
    type:ActionType.EDIT_BATCH_REQUEST,
    payload
})

export const EditBatchSuccess = (payload) => ({
    type:ActionType.EDIT_BATCH_SUCCESS,
    payload
})

export const EditBatchFailed =(payload)=>({
    type:ActionType.EDIT_BATCH_FAILED,
    payload
})
