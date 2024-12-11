import { Reducer } from "redux";
import { types } from "./AdminActions";
import { IAdminState, IAdminAction } from "../../common/model/AdminModels";

// @ts-ignore
export const adminReducer: Reducer<IAdminState, IAdminAction> = (
  state: IAdminState = {},
  action: IAdminAction,
) => {
  switch (action.type) {
    case types.CREATE_BATCH_REQUEST: {
      return {
        ...state,
        createBatchLoading: true,
      };
    }
    case types.CREATE_BATCH_SUCCESS: {
      return {
        ...state,
        createBatchLoading: false,
      };
    }
    case types.CREATE_BATCH_FAILURE: {
      return {
        ...state,
        createBatchLoading: false,
        createBatchError: action.error,
      };
    }
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
        batchList: [...action.payload?.data.items],
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
        batchItems: [...action.payload?.data.items],
      };
    }
    case types.GET_BATCH_ITEMS_FAILURE: {
      return {
        ...state,
        batchItemsLoading: false,
        batchItemsError: action.error,
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
        trustLoading: {
          ...state.trustLoading,
          [action.payload?.id]: true,
        },
      };
    }
    case types.GET_TRUST_SUCCESS: {
      return {
        ...state,
        trustLoading: {
          ...state.trustLoading,
          // @ts-ignore
          [action.payload.id]: false,
        },
        trustData: {
          ...state.trustData,
          [action.payload?.id]: action.payload?.data,
        },
      };
    }
    case types.GET_TRUST_FAILURE: {
      return {
        ...state,
        trustLoading: false,
        trustError: action.error,
      };
    }
    case types.GET_BATCH_QR_REQUEST: {
      if (action.itemId) {
        return {
          ...state,
          itemQrLoading: {
            ...state.itemQrLoading,
            [action.itemId]: true,
          },
        };
      }
      return {
        ...state,
        batchQrLoading: true,
      };
    }
    case types.GET_BATCH_QR_SUCCESS: {
      return {
        ...state,
        batchQrLoading: false,
        batchQrCode: action.payload?.data,
      };
    }
    case types.GET_BATCH_ITEMS_QR_SUCCESS: {
      return {
        ...state,
        itemQrLoading: {
          ...state.itemQrLoading,
          // @ts-ignore
          [action.itemId]: false,
        },
        itemQrCodes: state.itemQrCodes
          ? [...state.itemQrCodes, action.payload?.data]
          : [action.payload?.data],
      };
    }
    case types.GET_BATCH_QR_FAILURE: {
      return {
        ...state,
        batchQrLoading: false,
        batchQrError: action.error,
      };
    }
    case types.FACET_QUERY_REQUEST: {
      return {
        ...state,
        facetsLoading: true,
      };
    }
    case types.FACET_QUERY_SUCCESS: {
      return {
        ...state,
        facetsLoading: false,
        facets: action.payload?.data,
      };
    }
    case types.FACET_QUERY_FAILURE: {
      return {
        ...state,
        facetsLoading: false,
        facetsError: action.error,
      };
    }
    case types.GET_PREDICTION_REQUEST: {
      return {
        ...state,
        predictionLoading: true,
      };
    }
    case types.GET_PREDICTION_SUCCESS: {
      return {
        ...state,
        predictionLoading: false,
        prediction: action.payload?.data,
      };
    }
    case types.GET_PREDICTION_FAILURE: {
      return {
        ...state,
        predictionLoading: false,
        predictionError: action.error,
      };
    }
    case types.CLEAR_BATCH_DETAILS:
      return {
        ...state,
        batchDetails: null, // or initial value
        batchItems: [],
        batchActivity: [],
      };
    case types.CLEAR_ITEM_DETAILS:
      return {
        ...state,
        itemDetails: null,
      };
    case types.CLEAR_QR_CODES:
      return {
        ...state,
        qrCode: null,
        itemQrCodes: [],
      };
    default:
      return state;
  }
};
