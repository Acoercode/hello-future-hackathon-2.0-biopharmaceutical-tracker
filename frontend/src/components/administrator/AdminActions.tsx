import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";
import { IAdminAction, IAdminState } from "../../common/model/AdminModels";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const types = {
  GET_BATCH_LIST_REQUEST: "GET_BATCH_LIST_REQUEST",
  GET_BATCH_LIST_SUCCESS: "GET_BATCH_LIST_SUCCESS",
  GET_BATCH_LIST_FAILURE: "GET_BATCH_LIST_FAILURE",
};

// @ts-ignore
export const getBatchList: ActionCreator<
  // @ts-ignore
  ThunkAction<Promise<any>, IAdminState, null, IAdminAction>
> =
  () =>
  async (
    dispatch: (arg0: {
      type: string;
      payload?: { data: any; error: undefined };
      error?: string;
    }) => void,
  ) => {
    dispatch({
      type: types.GET_BATCH_LIST_REQUEST,
    });

    try {
      const response = await axios({
        method: "GET",
        url: `${API_ROOT}/batches/list`,
      });

      dispatch({
        type: types.GET_BATCH_LIST_SUCCESS,
        payload: {
          data: response.data,
          error: undefined,
        },
      });
    } catch (error) {
      console.log("Get Batch List Error", error);
      dispatch({
        type: types.GET_BATCH_LIST_FAILURE,
        error:
          "There was an issue fetching batch data. Please try again later.",
      });
    }
  };

// @ts-ignore
export const adminActions: ActionCreatorsMapObject<
  // @ts-ignore
  ThunkAction<Promise<any>, IAdminState, null, IAdminAction>
> = {
  getBatchList,
};
