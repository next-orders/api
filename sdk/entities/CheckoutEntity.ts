import { NextFetchRequestConfig } from '../types/next';
import {
  CheckoutAddOneToLineResponse,
  CheckoutChangeDeliveryMethodRequest,
  CheckoutChangeDeliveryMethodResponse,
  CheckoutCreateRequest,
  CheckoutCreateResponse,
  CheckoutRemoveOneFromLineResponse,
  ProductVariantAddToCheckoutRequest,
  ProductVariantAddToCheckoutResponse,
} from '../endpoints';
import type { Checkout } from '../types/objects';
import { RequestAPI } from '../types/request';

export class CheckoutEntity {
  private readonly request: RequestAPI;

  constructor(request: RequestAPI) {
    this.request = request;
  }

  public async get(id: string, externalConfig?: NextFetchRequestConfig) {
    return this.request<Checkout>(
      `checkout/${id}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async create(
    data: CheckoutCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<CheckoutCreateResponse>(
      'checkout',
      'POST',
      data,
      externalConfig,
    );
  }

  public async changeDeliveryMethod(
    checkoutId: string,
    data: CheckoutChangeDeliveryMethodRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<CheckoutChangeDeliveryMethodResponse>(
      `checkout/${checkoutId}/method`,
      'POST',
      data,
      externalConfig,
    );
  }

  public async addProduct(
    checkoutId: string,
    data: ProductVariantAddToCheckoutRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariantAddToCheckoutResponse>(
      `checkout/${checkoutId}/add`,
      'POST',
      data,
      externalConfig,
    );
  }

  public async addOneToCheckoutLine(
    checkoutId: string,
    lineId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<CheckoutAddOneToLineResponse>(
      `checkout/${checkoutId}/${lineId}/add-one`,
      'POST',
      undefined,
      externalConfig,
    );
  }

  public async removeOneFromCheckoutLine(
    checkoutId: string,
    lineId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<CheckoutRemoveOneFromLineResponse>(
      `checkout/${checkoutId}/${lineId}/remove-one`,
      'POST',
      undefined,
      externalConfig,
    );
  }
}
