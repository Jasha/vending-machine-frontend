import {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { RefetchOptions } from 'axios-hooks';

export type UseAxios<TRequest, TResponse> = [
  {
    response?: AxiosResponse<TResponse>;
    data: TResponse;
    loading: boolean;
    error: AxiosError<any, any> | null;
  },
  (
    config?: AxiosRequestConfig<TRequest>,
    options?: RefetchOptions,
  ) => AxiosPromise<TResponse>,
];

export interface ApiPaginatedResponse<TResponse> {
  results: TResponse[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface IUser {
  id: string;
  username: string;
  role: string;
  deposit: number;
}

interface IToken {
  token: string;
  expires: string;
}

export interface ITokens {
  access: IToken;
  refresh: IToken;
}

export interface IProduct {
  id: string;
  amountAvailable: number;
  cost: number;
  productName: string;
}
