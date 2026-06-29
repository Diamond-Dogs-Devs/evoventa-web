import useSWR, { SWRConfiguration, Key, BareFetcher } from "swr";
import axios, { AxiosResponse } from "axios";
import { getInstance } from "./axios-instance";

export type SWRQueryResponse<TData = unknown, TError = unknown> = {
  data?: TData;
  error?: TError;
  mutate: () => void;
  loading: boolean;
  isValidating: boolean;
};

const instance = getInstance();

export async function fetcher<T = unknown>(url: string): Promise<T> {
  try {
    const response: AxiosResponse<T> = await instance.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        status: error.response?.status,
        data: error.response?.data,
      };
    }
    throw error;
  }
}

export function useCustomSWR<TData, TError = unknown>(
  key: Key,
  fetcher: BareFetcher<TData>,
  config?: SWRConfiguration<TData, TError>,
): SWRQueryResponse<TData, TError> {
  const { data, error, mutate, isValidating } = useSWR<TData, TError>(
    key,
    fetcher,
    config,
  );

  return {
    data,
    error,
    mutate,
    loading: isValidating,
    isValidating,
  };
}
