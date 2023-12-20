import { NextFetchRequestConfig } from '../types/next';
import type { Menu } from '../types/objects';
import { RequestAPI } from '../types/request';

export class MenuEntity {
  private readonly request: RequestAPI;

  constructor(request: RequestAPI) {
    this.request = request;
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
