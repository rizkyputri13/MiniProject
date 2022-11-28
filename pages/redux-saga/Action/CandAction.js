import * as ActionType from '../Constants/CandConstant'

export const GetCandRequest = () => ({
    type: ActionType.GET_CAND_REQUEST

})

export const GetCandSuccess = (payload) =>({
    type: ActionType.GET_CAND_SUCCESS,
    payload
})

export const GetCandFailed = (payload) => ({
    type:ActionType.GET_CAND_FAILED,
    payload
})


export const GetOneCandRequest = (payload) => ({
    type: ActionType.GETONE_CAND_REQUEST,
    payload

})

export const GetOneCandSuccess = (payload) =>({
    type: ActionType.GETONE_CAND_SUCCESS,
    payload
})

export const GetOneCandFailed = (payload) => ({
    type:ActionType.GETONE_CAND_FAILED,
    payload
})


export const EditCandRequest = (payload) =>({
    type:ActionType.EDIT_CAND_REQUEST,
    payload
})

export const EditCandSuccess = (payload) => ({
    type:ActionType.EDIT_CAND_SUCCESS,
    payload
})

export const EditCandFailed =(payload)=>({
    type:ActionType.EDIT_CAND_FAILED,
    payload
})
