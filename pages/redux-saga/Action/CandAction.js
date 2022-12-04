import * as ActionTypeCand from '../Constants/CandConstant'

export const GetCandRequest = () => ({
    type: ActionTypeCand.GET_CAND_REQUEST

})

export const GetCandSuccess = (payload) =>({
    type: ActionTypeCand.GET_CAND_SUCCESS,
    payload
})

export const GetCandFailed = (payload) => ({
    type:ActionTypeCand.GET_CAND_FAILED,
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


export const EditCandRequest = (payload) =>({
    type:ActionTypeCand.EDIT_CAND_REQUEST,
    payload
})

export const EditCandSuccess = (payload) => ({
    type:ActionTypeCand.EDIT_CAND_SUCCESS,
    payload
})

export const EditCandFailed =(payload)=>({
    type:ActionTypeCand.EDIT_CAND_FAILED,
    payload
})
