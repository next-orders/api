import { NextFetchRequestConfig } from './types/next';

export async function client<T = unknown, E = Error>(
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

  const errorMessage = await response.text();
  return (await Promise.reject(
    new Error(`${response.status}: ${response.statusText}, ${errorMessage}`),
  )) as E;
}
