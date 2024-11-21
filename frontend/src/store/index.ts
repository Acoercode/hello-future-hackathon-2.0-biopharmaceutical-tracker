import { combineReducers } from "redux";
import { adminReducer } from "../components/administrator/AdminReducer";
import { IAdminState } from "../common/model/AdminModels";

// Root Reducer
const indexReducer = combineReducers({
  admin: adminReducer,
});

export interface IAppStore {
  admin?: IAdminState;
}

export default indexReducer;
