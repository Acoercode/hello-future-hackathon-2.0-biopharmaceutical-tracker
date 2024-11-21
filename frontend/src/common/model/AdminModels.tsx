export interface IAdminAction {
  status?: any;
  payload?: IAdminPayload;
  error?: string;
  type: string;
}

export interface IAdminState {
  loading?: boolean;
  error?: string;
}

export interface IAdminPayload {
  [key: string]: any;
}
