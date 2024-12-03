export interface IAdminAction {
  id?: any;
  itemId?: string;
  status?: any;
  payload?: IAdminPayload;
  error?: string;
  type: string;
}

export interface IAdminState {
  trustData?: any;
  trustLoading?: any;
  itemQrLoading?: any;
  itemQrCodes?: any;
  itemsTrustList?: any;
  loading?: boolean;
  error?: string;
}

export interface IAdminPayload {
  [key: string]: any;
}
