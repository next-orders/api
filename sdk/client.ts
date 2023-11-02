import { NextFetchRequestConfig } from './types/next';
import { ErrorBase } from './errors';
import { ErrorGeneral } from './types/errors';

export async function client<T = unknown, E = ErrorGeneral>(
  api: {
    token: string;
    url: string;
  },
  endpoint: string,
  customConfig: RequestInit = {},
  externalConfig: NextFetchRequestConfig = {},
) {
  const { body, ...otherConfig } = customConfig;

  const config: RequestInit = {
    method: otherConfig?.method || 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${api.token}`,
    },
    body,
    ...otherConfig,
    ...externalConfig,
  };

  const response = await fetch(`${api.url}/${endpoint}`, config);

  if (response.ok) {
    return (await response.json()) as T;
  }

  return (await Promise.reject(
    new ErrorBase(response.statusText, response.status),
  )) as E;
}
