import * as ActionType from '../Constants/BatchConstant'

const INIT_STATE = {
    batchs:[],
    batch:[]
}

const BatchReduce =(state = INIT_STATE,action) => {
    switch (action.type) {
        case ActionType.GET_BATCH_REQUEST:
            return {...state}
        case ActionType.GET_BATCH_SUCCESS:
            return GetBatchSuccessed(state,action)
        case ActionType.GETONE_BATCH_REQUEST:
            return {...state}
        case ActionType.GETONE_BATCH_SUCCESS:
            return GetOneBatchSuccessed(state,action)
        case ActionType.EDIT_BATCH_REQUEST:
            return {...state}
        case ActionType.EDIT_BATCH_SUCCESS:
            return EditBatchSuccessed(state,action)
    }
}

const GetBatchSuccessed = (state,action) => {
    return {
        ...state,
        batchs: action.payload
    }
}

const GetOneBatchSuccessed = (state,action) =>{
    return {
        ...state,
        batch:action.payload
    }
}

const EditBatchSuccessed = (state,action) =>{
    const {payload}=action
    const filterBatch = state.batchs.filter(el=>el.userEntityId !== payload.userEntityId)
    return {
        ...state,
        batchs: [...filterBatch,payload]
    }
}


export default BatchReduce