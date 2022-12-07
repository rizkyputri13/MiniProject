import * as ActionTypeBatch from '../Constants/BatchConstant'

export const GetBatchRequest = () => ({
    type: ActionTypeBatch.GET_BATCH_REQUEST

})

export const GetBatchSuccess = (payload) =>({
    type: ActionTypeBatch.GET_BATCH_SUCCESS,
    payload
})

export const GetBatchFailed = (payload) => ({
    type:ActionTypeBatch.GET_BATCH_FAILED,
    payload
})


// export const GetOneBatchRequest = (payload) => ({
//     type: ActionTypeBatch.GETONE_BATCH_REQUEST,
//     payload

// })

// export const GetOneBatchSuccess = (payload) =>({
//     type: ActionTypeBatch.GETONE_BATCH_SUCCESS,
//     payload
// })

// export const GetOneBatchFailed = (payload) => ({
//     type:ActionTypeBatch.GETONE_BATCH_FAILED,
//     payload
// })


export const EditBatchRequest = (payload) =>({
    type:ActionTypeBatch.EDIT_BATCH_REQUEST,
    payload
})

export const EditBatchSuccess = (payload) => ({
    type:ActionTypeBatch.EDIT_BATCH_SUCCESS,
    payload
})

export const EditBatchFailed =(payload)=>({
    type:ActionTypeBatch.EDIT_BATCH_FAILED,
    payload
})


export const DeleteBatchRequest = (payload) =>({
    type:ActionTypeBatch.DEL_BATCH_REQUEST,
    payload
})

export const DeleteBatchSuccess = (payload) => ({
    type:ActionTypeBatch.DEL_BATCH_SUCCESS,
    payload
})

export const DeleteBatchFailed =(payload)=>({
    type:ActionTypeBatch.DEL_BATCH_FAILED,
    payload
})