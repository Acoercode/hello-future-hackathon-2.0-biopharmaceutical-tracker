import { combineReducers } from "redux";
import { adminReducer } from "../components/Administrator/AdminReducer";
import { operatorReducer } from "../components/Operator/OperatorReducer";
import { IAdminState } from "../common/model/AdminModels";
import { IOperatorState } from "../common/model/OperatorModels";

// Root Reducer
const indexReducer = combineReducers({
  admin: adminReducer,
  operator: operatorReducer,
});

export interface IAppStore {
  admin?: IAdminState;
  operator?: IOperatorState;
}

export default indexReducer;
