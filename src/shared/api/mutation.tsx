import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { mutate } from 'swr';
import { getInstance } from './axios-instance';
import { ERROR_DETAIL_CONDITIONS } from '../utils/constants';
import { useToast } from '../overlay-manager';
import { ToastContent } from '../ui/src';

const instance = getInstance();

type Headers = Record<string, any>;

type WriteFn<TData> = (data?: unknown, headers?: Headers) => Promise<TData>;

type UpdateFn<TData> = (
  url: string,
  data?: unknown,
  headers?: Headers
) => Promise<TData>;

type DeleteFn<TData> = (url: string, headers?: Headers) => Promise<TData>;

export type CustomMutationT<TData> = {
  post: WriteFn<TData>;
  put: UpdateFn<TData>;
  patch: UpdateFn<TData>;
  delete: DeleteFn<TData>;
  loading: boolean;
  error: string | null;
};

export type UseCustomMutationProps<TData, TError = unknown> = {
  url: string;
  mutateKey?: string | string[];
  onError?: (error: TError) => void;
  onSuccess?: (data: TData) => void;
};

export const useCustomMutation = <TData = unknown, TError = unknown>({
  url,
  mutateKey,
  onError,
  onSuccess,
}: UseCustomMutationProps<TData, TError>): CustomMutationT<TData> => {
  const { open } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const refresh = () => {
    if (mutateKey) {
      if (typeof mutateKey === 'string') {
        mutate(mutateKey);
      } else {
        mutateKey.forEach((key) => mutate(key));
      }
    } else {
      mutate(url);
    }
  };

  const request = async (
    method: 'post' | 'put' | 'patch' | 'delete',
    requestUrl: string,
    data?: unknown,
    headers?: Headers
  ): Promise<TData> => {
    try {
      setLoading(true);
      setError(null);

      const response: AxiosResponse<TData> = await instance({
        url: requestUrl,
        method,
        data,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      refresh();

      onSuccess?.(response.data);

      return response.data;
    } catch (err) {
      try {
        const errorStr: string | null =
          (err as any)?.response?.data?.error || null;

        if (!errorStr) {
          throw new Error();
        }

        const errorsToSet: string[] = [];

        const errParsed = JSON.parse(errorStr.substring(7, errorStr.length));

        const parsedErrors: {
          code: string;
          details: unknown;
        }[] = JSON.parse(errParsed?.message);

        parsedErrors.forEach((error) => {
          const transformedError = ERROR_DETAIL_CONDITIONS[error.code];

          errorsToSet.push(transformedError.message);

          open({
            type: 'error',
            duration: 0,
            content: (
              <ToastContent
                title="Error"
                subtitle={transformedError.message}
                description={
                  transformedError.extraData
                    ? transformedError.extraData(error.details)
                    : undefined
                }
              />
            ),
          });
        });

        setError(errorsToSet.join(','));
      } catch {
        setError((err as any)?.response?.data ?? 'Something went wrong');

        onError?.(err as TError);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    post: (data, headers) => request('post', url, data, headers),

    put: (requestUrl, data, headers) =>
      request('put', requestUrl, data, headers),

    patch: (requestUrl, data, headers) =>
      request('patch', requestUrl, data, headers),

    delete: (requestUrl, headers) =>
      request('delete', requestUrl, undefined, headers),

    loading,
    error,
  };
};
