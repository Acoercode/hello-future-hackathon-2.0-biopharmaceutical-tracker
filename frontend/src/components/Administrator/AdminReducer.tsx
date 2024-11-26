import { Reducer } from "redux";
import { types } from "./AdminActions";
import { IAdminState, IAdminAction } from "../../common/model/AdminModels";

// @ts-ignore
export const adminReducer: Reducer<IWorkspaceState, IWorkspaceAction> = (
  state: IAdminState = {},
  action: IAdminAction,
) => {
  switch (action.type) {
    // WORKSPACE STORE
    case types.GET_BATCH_LIST_REQUEST: {
      return {
        ...state,
        batchListLoading: true,
      };
    }
    case types.GET_BATCH_LIST_SUCCESS: {
      return {
        ...state,
        batchListLoading: false,
        batchList: action.payload?.data,
      };
    }
    case types.GET_BATCH_LIST_FAILURE: {
      return {
        ...state,
        batchListLoading: false,
        batchListError: action.error,
      };
    }
    case types.GET_BATCH_DETAILS_REQUEST: {
      return {
        ...state,
        batchDetailsLoading: true,
      };
    }
    case types.GET_BATCH_DETAILS_SUCCESS: {
      return {
        ...state,
        batchDetailsLoading: false,
        batchDetails: action.payload?.data,
      };
    }
    case types.GET_BATCH_DETAILS_FAILURE: {
      return {
        ...state,
        batchDetailsLoading: false,
        batchDetailsError: action.error,
      };
    }
    case types.GET_BATCH_ITEMS_REQUEST: {
      return {
        ...state,
        batchItemsLoading: true,
      };
    }
    case types.GET_BATCH_ITEMS_SUCCESS: {
      return {
        ...state,
        batchItemsLoading: false,
        batchItems: action.payload?.data,
      };
    }
    case types.GET_BATCH_ITEMS_FAILURE: {
      return {
        ...state,
        batchItemsLoading: false,
        batchItemsError: action.error,
      };
    }
    case types.GET_BATCH_ACTIVITY_REQUEST: {
      return {
        ...state,
        batchActivityLoading: true,
      };
    }
    case types.GET_BATCH_ACTIVITY_SUCCESS: {
      return {
        ...state,
        batchActivityLoading: false,
        batchActivity: action.payload?.data,
      };
    }
    case types.GET_BATCH_ACTIVITY_FAILURE: {
      return {
        ...state,
        batchActivityLoading: false,
        batchActivityError: action.error,
      };
    }
    case types.GET_ITEMS_DETAIL_REQUEST: {
      return {
        ...state,
        itemDetailsLoading: true,
      };
    }
    case types.GET_ITEMS_DETAIL_SUCCESS: {
      return {
        ...state,
        itemDetailsLoading: false,
        itemDetails: action.payload?.data,
      };
    }
    case types.GET_ITEMS_DETAIL_FAILURE: {
      return {
        ...state,
        itemDetailsLoading: false,
        itemDetailsError: action.error,
      };
    }
    case types.GET_TRUST_REQUEST: {
      return {
        ...state,
        [`trustLoading_${action.payload?.id}`]: true,
      };
    }
    case types.GET_TRUST_SUCCESS_ITEMS: {
      return {
        ...state,
        [`trustLoading_${action.payload?.id}`]: false,
        itemsTrustList: [...state.itemsTrustList, action.payload?.data],
      };
    }
    case types.GET_TRUST_SUCCESS_BATCH: {
      return {
        ...state,
        [`trustLoading_${action.payload?.id}`]: false,
        batchTrust: action.payload?.data,
      };
    }
    case types.GET_TRUST_FAILURE: {
      return {
        ...state,
        [`trustLoading_${action.payload?.id}`]: false,
        itemDetailsError: action.error,
      };
    }
    default:
      return state;
  }
};
