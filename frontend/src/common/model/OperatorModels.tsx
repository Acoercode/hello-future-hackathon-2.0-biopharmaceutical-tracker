export interface IOperatorAction {
  status?: any;
  payload?: IOperatorPayload;
  error?: string;
  type: string;
}

export interface IOperatorState {
  itemsTrustList?: any;
  loading?: boolean;
  error?: string;
}

export interface IOperatorPayload {
  [key: string]: any;
}
