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

    this.shop = new ShopEntity(this.request);
    this.channel = new ChannelEntity(this.request);
    this.media = new MediaEntity(this.request, this.requestWithFiles);
    this.menu = new MenuEntity(this.request);
    this.menuCategory = new MenuCategoryEntity(this.request);
    this.client = new ClientEntity(this.request);
    this.checkout = new CheckoutEntity(this.request);
    this.product = new ProductEntity(this.request);
    this.productVariant = new ProductVariantEntity(this.request);
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

  private async fetchAPI<T = unknown, E = ErrorBase>(
    endpoint: string,
    customConfig: RequestInit = {},
    externalConfig: NextFetchRequestConfig = {},
  ): Promise<T | E> {
    const { body, ...otherConfig } = customConfig;

    const config: RequestInit = {
      method: otherConfig?.method || 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.apiToken}`,
      },
      body,
      ...otherConfig,
      ...externalConfig,
    };

    try {
      const response = await fetch(`${this.apiUrl}/${endpoint}`, config);
      if (response.ok) {
        return (await response.json()) as T;
      }

      const errorMessage = (await response.json()) as ErrorBase;
      return new ErrorBase(errorMessage.message, errorMessage.statusCode) as E;
    } catch (err) {
      console.warn(err);

      if (err instanceof Error) {
        return new ErrorBase(err.message, 0) as E;
      }

      return err as E;
    }
  }

  private async request<T, E = ErrorBase>(
    endpoint: string,
    method: 'POST' | 'GET' | 'PATCH' = 'POST',
    data?: unknown,
    externalConfig?: NextFetchRequestConfig,
  ): Promise<T | E> {
    return this.fetchAPI<T, E>(
      endpoint,
      {
        body: JSON.stringify(data),
        method,
      },
      externalConfig,
    );
  }

  private async requestWithFiles<T, E = ErrorBase>(
    endpoint: string,
    data: unknown,
    externalConfig?: NextFetchRequestConfig,
  ): Promise<T | E> {
    return this.fetchAPI<T, E>(
      endpoint,
      {
        body: data as BodyInit,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      },
      externalConfig,
    );
  }
}
