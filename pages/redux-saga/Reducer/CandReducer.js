import { EditFilterSuccess } from "../Action/CandAction";
import * as ActionType from "../Constants/CandConstant";

const INIT_STATE = {
  applies: [],
  filters: [],
  contracts: [],
  disqualifieds: [],
  notresponds: [],
  user: [],
  // candidate:[]
};

const CandReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionType.GET_APPLY_REQUEST:
      return { ...state };
    case ActionType.GET_APPLY_SUCCESS:
      return GetApplySuccessed(state, action);
    case ActionType.GET_FILTER_REQUEST:
      return { ...state };
    case ActionType.GET_FILTER_SUCCESS:
      return GetFilterSuccessed(state, action);
    case ActionType.GET_CONTRACT_REQUEST:
      return { ...state };
    case ActionType.GET_CONTRACT_SUCCESS:
      return GetContractSuccessed(state, action);
    case ActionType.GET_DISQUALIFIED_REQUEST:
      return { ...state };
    case ActionType.GET_DISQUALIFIED_SUCCESS:
      return GetDisqualifiedSuccessed(state, action);
    case ActionType.GET_NOTRESPOND_REQUEST:
      return { ...state };
    case ActionType.GET_NOTRESPOND_SUCCESS:
      return GetNotrespondSuccessed(state, action);

    case ActionType.GET_USER_REQUEST:
      return { ...state };
    case ActionType.GET_USER_SUCCESS:
      return GetUserSuccessed(state, action);

    // case ActionType.GETONE_CAND_REQUEST:
    //     return {...state}
    // case ActionType.GETONE_CAND_SUCCESS:
    //     return GetOneCandSuccessed(state,action)
    case ActionType.EDIT_APPLY_REQUEST:
      return { ...state };
    case ActionType.EDIT_APPLY_SUCCESS:
      return EditApplySuccessed(state, action);
      case ActionType.EDIT_FILTER_REQUEST:
      return { ...state };
    case ActionType.EDIT_FILTER_SUCCESS:
      return EditFilterSuccessed(state, action);
      case ActionType.EDIT_CONTRACT_REQUEST:
      return { ...state };
    case ActionType.EDIT_CONTRACT_SUCCESS:
      return EditContractSuccessed(state, action);
      case ActionType.EDIT_DISQUALIFIED_REQUEST:
      return { ...state };
    case ActionType.EDIT_DISQUALIFIED_SUCCESS:
      return EditDisqualifiedSuccessed(state, action);
      case ActionType.EDIT_NOTRESPOND_REQUEST:
      return { ...state };
    case ActionType.EDIT_NOTRESPOND_SUCCESS:
      return EditNotrespondSuccessed(state, action);
    default:
      return state;
  }
};

const GetApplySuccessed = (state, action) => {
  return {
    ...state,
    applies: action.payload,
  };
};

const GetFilterSuccessed= (state, action) => {
  return {
    ...state,
    filters: action.payload,
  };
};

const GetContractSuccessed = (state, action) => {
  return {
    ...state,
    contracts: action.payload,
  };
};

const GetDisqualifiedSuccessed = (state, action) => {
  return {
    ...state,
    disqualifieds: action.payload,
  };
};

const GetNotrespondSuccessed = (state, action) => {
  return {
    ...state,
    notresponds: action.payload,
  };
};

const GetUserSuccessed = (state, action) => {
  return {
    ...state,
    user: action.payload,
  };
};

// const GetOneCandSuccessed = (state,action) =>{
//     return {
//         ...state,
//         candidate:action.payload
//     }
// }

const EditApplySuccessed = (state, action) => {
  const { payload } = action;
  const editApply = state.applies.filter(
    (el) => el.boapEntityId !== payload.boapEntityId
  );
  if (payload.boapStatus !== 'Not Responding') {
    return {
      ...state,
      applies: [...editApply],
      filters: [...state.filters, payload]
    };
  } else {
    return {
      ...state,
      applies: [...editApply],
      notresponds: [...state.notresponds, payload]
    };
  }

};

const EditFilterSuccessed = (state, action) => {
  const { payload } = action;
  const editFilter = state.filters.filter(
    (el) => el.boapEntityId !== payload.boapEntityId
  );
  if (payload.boapStatus !== 'Failed') {
    return {
      ...state,
      filters: [...editFilter],
      contracts: [...state.contracts, payload]
    };
  } else {
    return {
      ...state,
      filters: [...editFilter],
      contracts: [...state.contracts, payload]
    };
  }
};

const EditContractSuccessed = (state, action) => {
  const { payload } = action;
  const editContract = state.contracts.filter(
    (el) => el.boapEntityId !== payload.boapEntityId
  );
  if (payload.boapStatus === 'Contract') {
    return {
      ...state,
      contracts: [...editContract],
      contracts: [...state.contracts, payload]
    };
  } else {
    return {
      ...state,
      contracts: [...editContract],
      contracts: [...state.contracts, payload]
    };
  }
};

const EditDisqualifiedSuccessed = (state, action) => {
  const { payload } = action;
  const editDisqualified = state.disqualifieds.filter(
    (el) => el.boapEntityId !== payload.boapEntityId
  );
  if (payload.boapStatus !== 'Not Responding') {
    return {
      ...state,
      disqualifieds: [...editDisqualified],
      filters: [...state.filters, payload]
    };
  } else {
    return {
      ...state,
      disqualifieds: [...editDisqualified],
      notresponds: [...state.notresponds, payload]
    };
  }
};

const EditNotrespondSuccessed = (state, action) => {
  const { payload } = action;
  const editNotrespond = state.notresponds.filter(
    (el) => el.boapEntityId !== payload.boapEntityId
  );
  if (payload.boapStatus !== 'Not Responding') {
    return {
      ...state,
      notresponds: [...editNotrespond],
      filters: [...state.filters, payload]
    };
  } else {
    return {
      ...state,
      notresponds: [...editNotrespond],
      notresponds: [...state.notresponds, payload]
    };
  }
};
export default CandReducer;
