import { NextFetchRequestConfig } from '../types/next';
import { ProductCreateRequest, ProductCreateResponse } from '../endpoints';
import type { Product } from '../types/objects';
import { RequestAPI } from '../types/request';

export class ProductEntity {
  private readonly request: RequestAPI;

  constructor(request: RequestAPI) {
    this.request = request;
  }

  public async list(externalConfig?: NextFetchRequestConfig) {
    return this.request<Product[]>(
      'product/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getById(id: string, externalConfig?: NextFetchRequestConfig) {
    return this.request<Product>(
      `product/${id}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async create(
    data: ProductCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductCreateResponse>(
      'product',
      'POST',
      data,
      externalConfig,
    );
  }
}
