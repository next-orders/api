import type { AvatarParams } from './types/objects';
import { SignInByEmailRequest, SignInByEmailResponse } from './endpoints';
import { NextFetchRequestConfig } from './types/next';
import { JWTEmployeeAccessTokenPayload } from './types/jwt';
import { ErrorBase } from './errors';
import {
  ChannelEntity,
  CheckoutEntity,
  ClientEntity,
  MediaEntity,
  MenuCategoryEntity,
  MenuEntity,
  ProductEntity,
  ProductVariantEntity,
  ShopEntity,
} from './entities';
import { fetchAPI } from './fetchAPI';

export class MainAPI {
  private readonly apiUrl: string;
  private readonly apiToken: string;

  public readonly shop: ShopEntity;
  public readonly channel: ChannelEntity;
  public readonly media: MediaEntity;
  public readonly menu: MenuEntity;
  public readonly menuCategory: MenuCategoryEntity;
  public readonly client: ClientEntity;
  public readonly checkout: CheckoutEntity;
  public readonly product: ProductEntity;
  public readonly productVariant: ProductVariantEntity;

  constructor(apiUrl: string, apiToken: string) {
    this.apiUrl = apiUrl;
    this.apiToken = apiToken;

    this.shop = new ShopEntity(apiUrl, apiToken);
    this.channel = new ChannelEntity(apiUrl, apiToken);
    this.media = new MediaEntity(apiUrl, apiToken);
    this.menu = new MenuEntity(apiUrl, apiToken);
    this.menuCategory = new MenuCategoryEntity(apiUrl, apiToken);
    this.client = new ClientEntity(apiUrl, apiToken);
    this.checkout = new CheckoutEntity(apiUrl, apiToken);
    this.product = new ProductEntity(apiUrl, apiToken);
    this.productVariant = new ProductVariantEntity(apiUrl, apiToken);
  }

  public async getApiVersion(externalConfig?: NextFetchRequestConfig) {
    return this.request<{ ok: boolean; version: string }>(
      'version',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async signInEmployeeByEmail(
    data: SignInByEmailRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<SignInByEmailResponse>(
      'auth/employee/email',
      'POST',
      data,
      externalConfig,
    );
  }

  public async verifyToken(
    token: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<JWTEmployeeAccessTokenPayload>(
      `auth/verify/${token}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async signInDemoData(externalConfig?: NextFetchRequestConfig) {
    return this.request<{ email: string; password: string }>(
      'auth/employee/demo',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public getAvatarURL(avatarId: string, size: number, params?: AvatarParams) {
    const gender = params?.gender ? `&gender=${params.gender}` : '';
    const emotion = params?.emotion ? `&emotion=${params.emotion}` : '';
    const clothing = params?.clothing ? `&clothing=${params.clothing}` : '';

    return `${this.apiUrl}/avatar/${avatarId}?size=${size}${gender}${emotion}${clothing}`;
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
}
