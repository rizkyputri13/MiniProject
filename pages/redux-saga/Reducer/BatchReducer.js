import * as ActionTypeBatch from '../Constants/BatchConstant'

const INIT_STATE = {
    batchs:[],
    //batch:[]
}

const BatchReducer =(state = INIT_STATE,action) => {
    switch (action.type) {
        case ActionTypeBatch.GET_BATCH_REQUEST:
            return {...state}
        case ActionTypeBatch.GET_BATCH_SUCCESS:
            return GetBatchSuccessed(state,action)
        // case ActionTypeBatch.GETONE_BATCH_REQUEST:
        //     return {...state}
        // case ActionTypeBatch.GETONE_BATCH_SUCCESS:
        //     return GetOneBatchSuccessed(state,action)
        case ActionTypeBatch.EDIT_BATCH_REQUEST:
            return {...state}
        case ActionTypeBatch.EDIT_BATCH_SUCCESS:
            return EditBatchSuccessed(state,action)
            case ActionTypeBatch.DEL_BATCH_REQUEST:
            return {...state}
        case ActionTypeBatch.EDIT_BATCH_SUCCESS:
            return DeleteBatchSuccessed(state,action)
        default:
            return state
    }
}

const GetBatchSuccessed = (state,action) => {
    return {
        ...state,
        batchs: action.payload
    }
}

// const GetOneBatchSuccessed = (state,action) =>{
//     return {
//         ...state,
//         batch:action.payload
//     }
// }

const EditBatchSuccessed = (state,action) =>{
    const {payload}=action
    const editBatch = state.batchs.filter(el=>el.batchId !== payload.batchId)
    return {
        ...state,
        batchs: [...editBatch,payload]
    }
}

const DeleteBatchSuccessed = (state,action) =>{
    const {payload}=action
    const deleteBatch = state.batchs.filter(el=>el.batchId !== payload.batchId)
    return {
        ...state,
        batchs: [...deleteBatch]
    }
}


export default BatchReducer