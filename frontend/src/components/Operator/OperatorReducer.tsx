import { Reducer } from "redux";
import { types } from "./OperatorActions";
import {
  IOperatorState,
  IOperatorAction,
} from "../../common/model/OperatorModels";

// @ts-ignore
export const operatorReducer: Reducer<IOperatorState, IOperatorAction> = (
  state: IOperatorState = {},
  action: IOperatorAction,
) => {
  switch (action.type) {
    // WORKSPACE STORE
    case types.RECORD_ACTIVITY_REQUEST: {
      return {
        ...state,
        recordActivityLoading: true,
      };
    }
    case types.RECORD_ACTIVITY_SUCCESS: {
      return {
        ...state,
        recordActivityLoading: false,
        recordedActivity: action.payload?.data,
      };
    }
    case types.RECORD_ACTIVITY_FAILURE: {
      return {
        ...state,
        recordActivityLoading: false,
        recordActivityError: action.error,
      };
    }
    case types.CLEAR_RECORDED_ACTIVITY: {
      return {
        ...state,
        recordedActivity: null,
      };
    }
    default:
      return state;
  }
};
