/** biome-ignore-all lint/suspicious/noExplicitAny: _ */
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import type { ErrorApiResponse, PaginatedApiResponse, SuccessApiResponse } from '@/schemas/types';

export const BASE_URL = import.meta.env.VITE_API_URL;

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

interface CustomAxiosInstance
  extends Omit<AxiosInstance, 'get' | 'post' | 'put' | 'patch' | 'delete'> {
  <T = any>(config: AxiosRequestConfig): Promise<T>;
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  get<T = any>(
    url: string,
    config?: { isPaginated?: false } & AxiosRequestConfig
  ): Promise<SuccessApiResponse<T>>;
  get<T = any>(
    url: string,
    config?: { isPaginated: true } & AxiosRequestConfig
  ): Promise<PaginatedApiResponse<T>>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<SuccessApiResponse<T>>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<SuccessApiResponse<T>>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<SuccessApiResponse<T>>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<SuccessApiResponse<T>>;
}

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
  timeoutErrorMessage: 'No Internet Connection.',
  withCredentials: true,
}) as CustomAxiosInstance;

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer') {
      return response;
    }

    return response.data;
  },
  async (error: AxiosError<ErrorApiResponse>) => {
    const originalRequest = error.config;
    const cookieHeader = error.config?.headers.get('Cookie');

    if (
      error.response?.status === 401 &&
      (error.response.data.message === 'Token not found' ||
        error.response.data.message === 'Invalid Token') &&
      !originalRequest?._retry
    ) {
      if (originalRequest) {
        originalRequest._retry = true;
      }
      try {
        await api.post(
          '/auth/refresh-token',
          {},
          { headers: cookieHeader ? { Cookie: cookieHeader } : {} }
        );
        return originalRequest ? api(originalRequest) : Promise.reject(error);
      } catch (error) {
        await api.post('/auth/logout');
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
