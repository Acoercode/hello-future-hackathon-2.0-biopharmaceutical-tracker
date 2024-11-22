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
    default:
      return state;
  }
};
