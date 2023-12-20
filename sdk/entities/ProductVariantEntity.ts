import { NextFetchRequestConfig } from '../types/next';
import {
  ProductVariantCreateRequest,
  ProductVariantCreateResponse,
} from '../endpoints';
import type { ProductVariant } from '../types/objects';
import { RequestAPI } from '../types/request';

export class ProductVariantEntity {
  private readonly request: RequestAPI;

  constructor(request: RequestAPI) {
    this.request = request;
  }

  public async listInCategory(
    categoryId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariant[]>(
      `product-variant/category/${categoryId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getById(id: string, externalConfig?: NextFetchRequestConfig) {
    return this.request<ProductVariant>(
      `product-variant/${id}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getBySlug(
    slug: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariant>(
      `product-variant/slug/${slug}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async addMedia(
    productVariantId: string,
    mediaId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariant>(
      `product-variant/${productVariantId}/media/${mediaId}`,
      'POST',
      undefined,
      externalConfig,
    );
  }

  public async create(
    data: ProductVariantCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariantCreateResponse>(
      'product-variant',
      'POST',
      data,
      externalConfig,
    );
  }
}
