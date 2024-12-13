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
  GET_TRUST_REQUEST: "GET_TRUST_REQUEST",
  GET_TRUST_SUCCESS: "GET_TRUST_SUCCESS",
  GET_TRUST_FAILURE: "GET_TRUST_FAILURE",
  GET_BATCH_QR_REQUEST: "GET_BATCH_QR_REQUEST",
  GET_BATCH_QR_SUCCESS: "GET_BATCH_QR_SUCCESS",
  GET_BATCH_ITEMS_QR_SUCCESS: "GET_BATCH_ITEMS_QR_SUCCESS",
  GET_BATCH_QR_FAILURE: "GET_BATCH_QR_FAILURE",
  FACET_QUERY_REQUEST: "FACET_QUERY_REQUEST",
  FACET_QUERY_SUCCESS: "FACET_QUERY_SUCCESS",
  FACET_QUERY_FAILURE: "FACET_QUERY_FAILURE",
  GET_PREDICTION_REQUEST: "GET_PREDICTION_REQUEST",
  GET_PREDICTION_SUCCESS: "GET_PREDICTION_SUCCESS",
  GET_PREDICTION_FAILURE: "GET_PREDICTION_FAILURE",
  CLEAR_BATCH_DETAILS: "CLEAR_BATCH_DETAILS",
  CLEAR_ITEM_DETAILS: "GET_BATCH_QR_FAILURE",
  CLEAR_QR_CODES: "CLEAR_QR_CODES",
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
        params: {
          limit: 1000,
        },
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
      return response.data;
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
export const checkTrustness: ActionCreator<
  // @ts-ignore
  ThunkAction<Promise<any>, IAdminState, null, IAdminAction>
> =
  (id: string, itemId?: string) =>
  async (
    dispatch: (arg0: {
      type: string;
      payload?: { id: string; data?: any; error?: undefined };
      error?: string;
    }) => void,
  ) => {
    dispatch({
      type: types.GET_TRUST_REQUEST,
      payload: {
        id: itemId ? itemId : id,
      },
    });

    let url = `${API_ROOT}/batches/${id}/trust`;
    if (itemId) {
      url = `${API_ROOT}/batches/${id}/items/${itemId}/trust`;
    }

    try {
      const response = await axios({
        method: "GET",
        url,
      });

      dispatch({
        type: types.GET_TRUST_SUCCESS,
        payload: {
          id: itemId ? itemId : id,
          data: response.data,
          error: undefined,
        },
      });
    } catch (error) {
      console.log("Get Trust Error", error);
      dispatch({
        type: types.GET_TRUST_FAILURE,
        error: "There was an issue fetching trust. Please try again later.",
      });
    }
  };

// @ts-ignore
export const getBatchQrCode: ActionCreator<
  // @ts-ignore
  ThunkAction<Promise<any>, IAdminState, null, IAdminAction>
> =
  (id: string, itemId?: string, itemNumber?: string) =>
  async (
    dispatch: (arg0: {
      itemId: string | undefined;
      itemNumber: string | undefined;
      payload?: { data: any; error: undefined };
      type: string;
    }) => void,
  ) => {
    dispatch({
      type: types.GET_BATCH_QR_REQUEST,
      itemId,
      itemNumber,
    });

    let url = `${API_ROOT}/batches/${id}/qr-code`;
    if (itemId) {
      url = `${API_ROOT}/batches/${id}/items/${itemId}/qr-code`;
    }

    try {
      const response = await axios({
        method: "GET",
        url,
      });

      if (itemId) {
        dispatch({
          type: types.GET_BATCH_ITEMS_QR_SUCCESS,
          itemId,
          itemNumber,
          payload: {
            data: response.data,
            error: undefined,
          },
        });
      } else {
        dispatch({
          type: types.GET_BATCH_QR_SUCCESS,
          payload: {
            data: response.data,
            error: undefined,
          },
          itemId: undefined,
          itemNumber: undefined,
        });
      }
    } catch (error) {
      console.log("Get Item Detail Error", error);
      dispatch({
        type: types.GET_BATCH_QR_FAILURE,
        itemId: undefined,
        itemNumber: undefined,
        // @ts-ignore
        error:
          "There was an issue fetching item details. Please try again later.",
      });
    }
  };

// @ts-ignore
export const facetQuery: ActionCreator<
  // @ts-ignore
  ThunkAction<Promise<any>, IAdminState, null, IAdminAction>
> =
  () =>
  async (
    dispatch: (arg0: {
      payload?: { data: any; error: undefined };
      type: any;
      error?: string;
    }) => void,
  ) => {
    dispatch({
      type: types.FACET_QUERY_REQUEST,
    });

    let url = `${API_ROOT}/batches/facets`;
    try {
      const response = await axios({
        method: "GET",
        url,
      });
      dispatch({
        type: types.FACET_QUERY_SUCCESS,
        payload: {
          data: response.data,
          error: undefined,
        },
      });
    } catch (error) {
      console.log("Get Item Detail Error", error);
      dispatch({
        type: types.GET_BATCH_QR_FAILURE,
        error:
          "There was an issue fetching item details. Please try again later.",
      });
    }
  };

// @ts-ignore
export const getPrediction: ActionCreator<
  // @ts-ignore
  ThunkAction<Promise<any>, IAdminState, null, IAdminAction>
> =
  (id: string, safetyStock: string, manufacturingDelay: string) =>
  async (
    dispatch: (arg0: {
      payload?: { data: any; error: undefined };
      type: any;
      error?: string;
    }) => void,
  ) => {
    dispatch({
      type: types.GET_PREDICTION_REQUEST,
    });

    let url = `${API_ROOT}/ai/predict/${id}`;
    try {
      const response = await axios({
        method: "GET",
        url,
        params: {
          safetyStock,
          manufacturingDelay,
        },
      });
      dispatch({
        type: types.GET_PREDICTION_SUCCESS,
        payload: {
          data: response.data,
          error: undefined,
        },
      });
    } catch (error) {
      console.log("Get Item Detail Error", error);
      dispatch({
        type: types.GET_PREDICTION_FAILURE,
        error:
          "There was an issue fetching item details. Please try again later.",
      });
    }
  };

export const clearBatchDetails = () => {
  return {
    type: types.CLEAR_BATCH_DETAILS,
  };
};
export const clearItemDetails = () => {
  return {
    type: types.CLEAR_ITEM_DETAILS,
  };
};

export const clearQrCodes = () => {
  return {
    type: types.CLEAR_QR_CODES,
  };
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
  getItemDetails,
  checkTrustness,
  getBatchQrCode,
  clearBatchDetails,
  clearItemDetails,
  clearQrCodes,
  facetQuery,
  getPrediction,
};
