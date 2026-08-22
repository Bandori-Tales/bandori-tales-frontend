export interface BaseRequestParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface ResponseMeta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  next: number | null;
  prev: number | null;
}

interface BaseApiResponse {
  success: boolean;
  statusCode: number;
  message?: string;
}

export interface SuccessApiResponse<T> extends BaseApiResponse {
  data: T;
}

export interface ErrorApiResponse extends BaseApiResponse {
  stack?: string;
}

export interface PaginatedApiResponse<T> extends BaseApiResponse {
  data: T[];
  meta: ResponseMeta;
}
