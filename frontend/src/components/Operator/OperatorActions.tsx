// import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
// import { ThunkAction } from "redux-thunk";
import axios from "axios";
import {
  IOperatorAction,
  IOperatorState,
} from "../../common/model/OperatorModels";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const types = {
  RECORD_ACTIVITY_REQUEST: "RECORD_ACTIVITY_REQUEST",
  RECORD_ACTIVITY_SUCCESS: "RECORD_ACTIVITY_SUCCESS",
  RECORD_ACTIVITY_FAILURE: "RECORD_ACTIVITY_FAILURE",
  CLEAR_RECORDED_ACTIVITY: "CLEAR_RECORDED_ACTIVITY",
};

// @ts-ignore
export const recordActivity: ActionCreator<
  // @ts-ignore
  ThunkAction<Promise<any>, IOperatorState, null, IOperatorAction>
> =
  (type: string, batchId: string, data: any, itemId?: string) =>
  async (
    dispatch: (arg0: {
      type: string;
      payload?: { data: any; error: undefined };
      error?: string;
    }) => void,
  ) => {
    dispatch({
      type: types.RECORD_ACTIVITY_REQUEST,
    });

    let url = "";
    if (type === "item") {
      url = `${API_ROOT}/batches/${batchId}/items/${itemId}/activity`;
    } else if (type === "batch") {
      url = `${API_ROOT}/batches/${batchId}/activity`;
    }

    try {
      const response = await axios({
        method: "POST",
        url,
        data,
      });

      dispatch({
        type: types.RECORD_ACTIVITY_SUCCESS,
        payload: {
          data: response.data,
          error: undefined,
        },
      });
    } catch (error) {
      console.log("Record Activity Error", error);
      dispatch({
        type: types.RECORD_ACTIVITY_FAILURE,
        error:
          "There was an issue recording the activity. Please try again later.",
      });
    }
  };

export const clearRecordedActivity = () => {
  return {
    type: types.CLEAR_RECORDED_ACTIVITY,
  };
};

// @ts-ignore
export const operatorActions: ActionCreatorsMapObject<
  // @ts-ignore
  ThunkAction<Promise<any>, IOperatorState, null, IOperatorAction>
> = {
  recordActivity,
  clearRecordedActivity,
};
