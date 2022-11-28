import * as ActionType from '../Constants/CandConstant'

const INIT_STATE = {
    candidates:[],
    candidate:[]
}

const CandReduce =(state = INIT_STATE,action) => {
    switch (action.type) {
        case ActionType.GET_CAND_REQUEST:
            return {...state}
        case ActionType.GET_CAND_SUCCESS:
            return GetCandSuccessed(state,action)
        case ActionType.GETONE_CAND_REQUEST:
            return {...state}
        case ActionType.GETONE_CAND_SUCCESS:
            return GetOneCandSuccessed(state,action)
        case ActionType.EDIT_CAND_REQUEST:
            return {...state}
        case ActionType.EDIT_CAND_SUCCESS:
            return EditCandSuccessed(state,action)
    }
}

const GetCandSuccessed = (state,action) => {
    return {
        ...state,
        candidates: action.payload
    }
}

const GetOneCandSuccessed = (state,action) =>{
    return {
        ...state,
        candidate:action.payload
    }
}

const EditCandSuccessed = (state,action) =>{
    const {payload}=action
    const filterCand = state.candidates.filter(el=>el.userEntityId !== payload.userEntityId)
    return {
        ...state,
        candidates: [...filterCand,payload]
    }
}


export default CandReduce