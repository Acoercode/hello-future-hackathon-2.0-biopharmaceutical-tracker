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

    default:
      return state;
  }
};
