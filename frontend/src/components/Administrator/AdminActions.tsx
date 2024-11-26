// import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
// import { ThunkAction } from "redux-thunk";
import axios from "axios";
import { IAdminAction, IAdminState } from "../../common/model/AdminModels";

const API_ROOT = process.env.REACT_APP_API_ROOT;

export const types = {
  GET_BATCH_LIST_REQUEST: "GET_BATCH_LIST_REQUEST",
  GET_BATCH_LIST_SUCCESS: "GET_BATCH_LIST_SUCCESS",
  GET_BATCH_LIST_FAILURE: "GET_BATCH_LIST_FAILURE",
  CREATE_BATCH_REQUEST: "CREATE_BATCH_REQUEST",
  CREATE_BATCH_SUCCESS: "CREATE_BATCH_SUCCESS",
  CREATE_BATCH_FAILURE: "CREATE_BATCH_FAILURE",
  GET_BATCH_DETAILS_REQUEST: "GET_BATCH_DETAILS_REQUEST",
  GET_BATCH_DETAILS_SUCCESS: "GET_BATCH_DETAILS_SUCCESS",
  GET_BATCH_DETAILS_FAILURE: "GET_BATCH_DETAILS_FAILURE",
  GET_BATCH_ITEMS_REQUEST: "GET_BATCH_ITEMS_REQUEST",
  GET_BATCH_ITEMS_SUCCESS: "GET_BATCH_ITEMS_SUCCESS",
  GET_BATCH_ITEMS_FAILURE: "GET_BATCH_ITEMS_FAILURE",
  GET_BATCH_ACTIVITY_REQUEST: "GET_BATCH_ACTIVITY_REQUEST",
  GET_BATCH_ACTIVITY_SUCCESS: "GET_BATCH_ACTIVITY_SUCCESS",
  GET_BATCH_ACTIVITY_FAILURE: "GET_BATCH_ACTIVITY_FAILURE",
  GET_ITEMS_DETAIL_REQUEST: "GET_ITEMS_DETAIL_REQUEST",
  GET_ITEMS_DETAIL_SUCCESS: "GET_ITEMS_DETAIL_SUCCESS",
  GET_ITEMS_DETAIL_FAILURE: "GET_ITEMS_DETAIL_FAILURE",
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
export const createBatch: ActionCreator<
  // @ts-ignore
  ThunkAction<Promise<any>, IAdminState, null, IAdminAction>
> =
  (data: any) =>
  async (
    dispatch: (arg0: {
      type: string;
      payload?: { data: any; error: undefined };
      error?: string;
    }) => void,
  ) => {
    dispatch({
      type: types.CREATE_BATCH_REQUEST,
    });

    try {
      const response = await axios({
        method: "POST",
        url: `${API_ROOT}/batches`,
        data,
      });

      dispatch({
        type: types.CREATE_BATCH_SUCCESS,
        payload: {
          data: response.data,
          error: undefined,
        },
      });
    } catch (error) {
      console.log("Get Batch List Error", error);
      dispatch({
        type: types.CREATE_BATCH_FAILURE,
        error:
          "There was an issue fetching batch data. Please try again later.",
      });
    }
  };

// @ts-ignore
export const getBatchDetails: ActionCreator<
  // @ts-ignore
  ThunkAction<Promise<any>, IAdminState, null, IAdminAction>
> =
  (id: string) =>
  async (
    dispatch: (arg0: {
      type: string;
      payload?: { data: any; error: undefined };
      error?: string;
    }) => void,
  ) => {
    dispatch({
      type: types.GET_BATCH_DETAILS_REQUEST,
    });

    try {
      const response = await axios({
        method: "GET",
        url: `${API_ROOT}/batches/${id}`,
      });

      dispatch({
        type: types.GET_BATCH_DETAILS_SUCCESS,
        payload: {
          data: response.data,
          error: undefined,
        },
      });
    } catch (error) {
      console.log("Get Batch Details Error", error);
      dispatch({
        type: types.GET_BATCH_DETAILS_FAILURE,
        error:
          "There was an issue fetching batch details. Please try again later.",
      });
    }
  };

// @ts-ignore
export const getBatchItems: ActionCreator<
  // @ts-ignore
  ThunkAction<Promise<any>, IAdminState, null, IAdminAction>
> =
  (id: string) =>
  async (
    dispatch: (arg0: {
      type: string;
      payload?: { data: any; error: undefined };
      error?: string;
    }) => void,
  ) => {
    dispatch({
      type: types.GET_BATCH_ITEMS_REQUEST,
    });

    try {
      const response = await axios({
        method: "GET",
        url: `${API_ROOT}/batches/${id}/items/list`,
        params: {
          limit: 100,
        },
      });

      dispatch({
        type: types.GET_BATCH_ITEMS_SUCCESS,
        payload: {
          data: response.data,
          error: undefined,
        },
      });
    } catch (error) {
      console.log("Get Batch Items Error", error);
      dispatch({
        type: types.GET_BATCH_ITEMS_FAILURE,
        error:
          "There was an issue fetching batch items. Please try again later.",
      });
    }
  };

// @ts-ignore
export const getBatchActivity: ActionCreator<
  // @ts-ignore
  ThunkAction<Promise<any>, IAdminState, null, IAdminAction>
> =
  (id: string) =>
  async (
    dispatch: (arg0: {
      type: string;
      payload?: { data: any; error: undefined };
      error?: string;
    }) => void,
  ) => {
    dispatch({
      type: types.GET_BATCH_ACTIVITY_REQUEST,
    });

    try {
      const response = await axios({
        method: "GET",
        url: `${API_ROOT}/batches/${id}/activity`,
      });

      dispatch({
        type: types.GET_BATCH_ACTIVITY_SUCCESS,
        payload: {
          data: response.data,
          error: undefined,
        },
      });
    } catch (error) {
      console.log("Get Batch Activity Error", error);
      dispatch({
        type: types.GET_BATCH_ACTIVITY_FAILURE,
        error:
          "There was an issue fetching batch activity. Please try again later.",
      });
    }
  };

// @ts-ignore
export const getItemDetails: ActionCreator<
  // @ts-ignore
  ThunkAction<Promise<any>, IAdminState, null, IAdminAction>
> =
  (id: string, itemId: string) =>
  async (
    dispatch: (arg0: {
      type: string;
      payload?: { data: any; error: undefined };
      error?: string;
    }) => void,
  ) => {
    dispatch({
      type: types.GET_ITEMS_DETAIL_REQUEST,
    });

    try {
      const response = await axios({
        method: "GET",
        url: `${API_ROOT}/batches/${id}/items/${itemId}`,
      });

      dispatch({
        type: types.GET_ITEMS_DETAIL_SUCCESS,
        payload: {
          data: response.data,
          error: undefined,
        },
      });
    } catch (error) {
      console.log("Get Item Detail Error", error);
      dispatch({
        type: types.GET_ITEMS_DETAIL_FAILURE,
        error:
          "There was an issue fetching item details. Please try again later.",
      });
    }
  };

// @ts-ignore
export const adminActions: ActionCreatorsMapObject<
  // @ts-ignore
  ThunkAction<Promise<any>, IAdminState, null, IAdminAction>
> = {
  getBatchList,
  createBatch,
  getBatchDetails,
  getBatchItems,
  getBatchActivity,
  getItemDetails,
};
