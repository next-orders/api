import { NextFetchRequestConfig } from '../types/next';
import type { Menu } from '../types/objects';
import { ErrorBase } from '../errors';
import { fetchAPI } from '../fetchAPI';

export class MenuEntity {
  private readonly apiUrl: string;
  private readonly apiToken: string;

  constructor(apiUrl: string, apiToken: string) {
    this.apiUrl = apiUrl;
    this.apiToken = apiToken;
  }

  private async request<T, E = ErrorBase>(
    endpoint: string,
    method: 'POST' | 'GET' | 'PATCH' = 'POST',
    data?: unknown,
    externalConfig?: NextFetchRequestConfig,
  ): Promise<T | E> {
    return fetchAPI<T, E>(
      {
        token: this.apiToken,
        url: this.apiUrl,
      },
      endpoint,
      {
        body: JSON.stringify(data),
        method,
      },
      externalConfig,
    );
  }

  public async listInChannel(
    channelId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<Menu[]>(
      `menu/list/${channelId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getById(
    menuId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<Menu>(
      `menu/${menuId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }
}
