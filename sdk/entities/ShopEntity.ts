import { NextFetchRequestConfig } from '../types/next';
import { ShopCreateRequest, ShopCreateResponse } from '../endpoints';
import { ErrorBase } from '../errors';
import { Shop } from '../types/objects';
import { RequestAPI } from '../types/request';

interface IShopEntity {
  get: (externalConfig?: NextFetchRequestConfig) => Promise<Shop | ErrorBase>;
  create: (
    data: ShopCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) => Promise<ShopCreateResponse | ErrorBase>;
}

export class ShopEntity implements IShopEntity {
  private readonly request: RequestAPI;

  constructor(request: RequestAPI) {
    this.request = request;
  }

  public async get(externalConfig?: NextFetchRequestConfig) {
    return this.request<Shop>(`shop`, 'GET', undefined, externalConfig);
  }

  public async create(
    data: ShopCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ShopCreateResponse>(
      'shop',
      'POST',
      data,
      externalConfig,
    );
  }
}
