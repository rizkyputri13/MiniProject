import * as ActionTypeCand from '../Constants/CandConstant'

export const GetApplyRequest = () => ({
    type: ActionTypeCand.GET_APPLY_REQUEST

})

export const GetApplySuccess = (payload) =>({
    type: ActionTypeCand.GET_APPLY_SUCCESS,
    payload
})

export const GetApplyFailed = (payload) => ({
    type:ActionTypeCand.GET_APPLY_FAILED,
    payload
})

export const GetFilterRequest = () => ({
    type: ActionTypeCand.GET_FILTER_REQUEST

})

export const GetFilterSuccess = (payload) =>({
    type: ActionTypeCand.GET_FILTER_SUCCESS,
    payload
})

export const GetFilterFailed = (payload) => ({
    type:ActionTypeCand.GET_FILTER_FAILED,
    payload
})

export const GetContractRequest = () => ({
    type: ActionTypeCand.GET_CONTRACT_REQUEST

})

export const GetContractSuccess = (payload) =>({
    type: ActionTypeCand.GET_CONTRACT_SUCCESS,
    payload
})

export const GetContractFailed = (payload) => ({
    type:ActionTypeCand.GET_CONTRACT_FAILED,
    payload
})

export const GetDisqualifiedRequest = () => ({
    type: ActionTypeCand.GET_DISQUALIFIED_REQUEST

})

export const GetDisqualifiedSuccess = (payload) =>({
    type: ActionTypeCand.GET_DISQUALIFIED_SUCCESS,
    payload
})

export const GetDisqualifiedFailed = (payload) => ({
    type:ActionTypeCand.GET_DISQUALIFIED_FAILED,
    payload
})


export const GetNotrespondRequest = () => ({
    type: ActionTypeCand.GET_NOTRESPOND_REQUEST

})

export const GetNotrespondSuccess = (payload) =>({
    type: ActionTypeCand.GET_NOTRESPOND_SUCCESS,
    payload
})

export const GetNotrespondFailed = (payload) => ({
    type:ActionTypeCand.GET_NOTRESPOND_FAILED,
    payload
})







export const GetUserRequest = () => ({
    type: ActionTypeCand.GET_USER_REQUEST

})

export const GetUserSuccess = (payload) =>({
    type: ActionTypeCand.GET_USER_SUCCESS,
    payload
})

export const GetUserFailed = (payload) => ({
    type:ActionTypeCand.GET_USER_FAILED,
    payload
})

// export const GetOneCandRequest = (payload) => ({
//     type: ActionTypeCand.GETONE_CAND_REQUEST,
//     payload

// })

// export const GetOneCandSuccess = (payload) =>({
//     type: ActionTypeCand.GETONE_CAND_SUCCESS,
//     payload
// })

// export const GetOneCandFailed = (payload) => ({
//     type:ActionTypeCand.GETONE_CAND_FAILED,
//     payload
// })


export const EditApplyRequest = (payload) =>({
    type:ActionTypeCand.EDIT_APPLY_REQUEST,
    payload
})

export const EditApplySuccess = (payload) => ({
    type:ActionTypeCand.EDIT_APPLY_SUCCESS,
    payload
})

export const EditApplyFailed =(payload)=>({
    type:ActionTypeCand.EDIT_APPLY_FAILED,
    payload
})

export const EditFilterRequest = (payload) =>({
    type:ActionTypeCand.EDIT_FILTER_REQUEST,
    payload
})

export const EditFilterSuccess = (payload) => ({
    type:ActionTypeCand.EDIT_FILTER_SUCCESS,
    payload
})

export const EditFilterFailed =(payload)=>({
    type:ActionTypeCand.EDIT_FILTER_FAILED,
    payload
})

export const EditContractRequest = (payload) =>({
    type:ActionTypeCand.EDIT_CONTRACT_REQUEST,
    payload
})

export const EditContractSuccess = (payload) => ({
    type:ActionTypeCand.EDIT_CONTRACT_SUCCESS,
    payload
})

export const EditContractFailed =(payload)=>({
    type:ActionTypeCand.EDIT_CONTRACT_FAILED,
    payload
})

export const EditDisqualifiedRequest = (payload) =>({
    type:ActionTypeCand.EDIT_DISQUALIFIED_REQUEST,
    payload
})

export const EditDisqualifiedSuccess = (payload) => ({
    type:ActionTypeCand.EDIT_DISQUALIFIED_SUCCESS,
    payload
})

export const EditDisqualifiedFailed =(payload)=>({
    type:ActionTypeCand.EDIT_DISQUALIFIED_FAILED,
    payload
})

export const EditNotrespondRequest = (payload) =>({
    type:ActionTypeCand.EDIT_NOTRESPOND_REQUEST,
    payload
})

export const EditNotrespondSuccess = (payload) => ({
    type:ActionTypeCand.EDIT_NOTRESPOND_SUCCESS,
    payload
})

export const EditNotrespondFailed =(payload)=>({
    type:ActionTypeCand.EDIT_NOTRESPOND_FAILED,
    payload
})