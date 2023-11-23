import { client } from './client';
import {
  AvatarParams,
  Channel,
  Checkout,
  Client,
  Domain,
  Media,
  Menu,
  MenuCategory,
  Product,
  ProductVariant,
  Shop,
} from './types/objects';
import {
  ChannelCreateRequest,
  ChannelCreateResponse,
  CheckoutAddOneToLineResponse,
  CheckoutChangeDeliveryMethodRequest,
  CheckoutChangeDeliveryMethodResponse,
  CheckoutRemoveOneFromLineResponse,
  ProductCreateRequest,
  ProductCreateResponse,
  ProductVariantAddToCheckoutRequest,
  ProductVariantAddToCheckoutResponse,
  ShopCreateRequest,
  ShopCreateResponse,
  SignInByEmailRequest,
  SignInByEmailResponse,
  UploadMediaResponse,
} from './endpoints';
import { NextFetchRequestConfig } from './types/next';
import { JWTEmployeeAccessTokenPayload } from './types/jwt';
import { ErrorBase } from './errors';

export class MainAPI {
  private readonly apiUrl: string;
  private readonly apiToken: string;

  constructor(apiUrl: string, apiToken: string) {
    this.apiUrl = apiUrl;
    this.apiToken = apiToken;
  }

  public async getApiVersion(externalConfig?: NextFetchRequestConfig) {
    return this.coreRequest<{ ok: boolean; version: string }>(
      'version',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getShop(externalConfig?: NextFetchRequestConfig) {
    return this.coreRequest<Shop>(`shop`, 'GET', undefined, externalConfig);
  }

  public async createShop(
    data: ShopCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<ShopCreateResponse>(
      'shop',
      'POST',
      data,
      externalConfig,
    );
  }

  public async getChannel(
    channelId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<Channel>(
      `channel/${channelId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getChannels(externalConfig?: NextFetchRequestConfig) {
    return this.coreRequest<Channel[]>(
      'channel/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async createChannel(
    data: ChannelCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<ChannelCreateResponse>(
      'channel',
      'POST',
      data,
      externalConfig,
    );
  }

  public async getAllMedia(externalConfig?: NextFetchRequestConfig) {
    return this.coreRequest<Media[]>(
      'media/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async uploadMedia(
    data: FormData,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequestWithFiles<UploadMediaResponse>(
      'media/upload',
      data,
      externalConfig,
    );
  }

  public async getAllDomains(externalConfig?: NextFetchRequestConfig) {
    return this.coreRequest<Domain[]>(
      'domain/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getAllMenusInChannel(
    channelId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<Menu[]>(
      `menu/list/${channelId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getMenuById(
    menuId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<Menu>(
      `menu/${menuId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getClients(externalConfig?: NextFetchRequestConfig) {
    return this.coreRequest<Client[]>(
      'client/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getClientById(
    clientId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<Client>(
      `client/${clientId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getProducts(externalConfig?: NextFetchRequestConfig) {
    return this.coreRequest<Product[]>(
      'product/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getProductById(
    id: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<Product>(
      `product/${id}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async createProduct(
    data: ProductCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<ProductCreateResponse>(
      'product',
      'POST',
      data,
      externalConfig,
    );
  }

  public async getProductVariantsInCategory(
    categoryId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<ProductVariant[]>(
      `product-variant/category/${categoryId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getProductVariantBySlug(
    slug: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<ProductVariant>(
      `product-variant/slug/${slug}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getCheckout(
    id: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<Checkout>(
      `checkout/${id}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async changeCheckoutDeliveryMethod(
    checkoutId: string,
    data: CheckoutChangeDeliveryMethodRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<CheckoutChangeDeliveryMethodResponse>(
      `checkout/${checkoutId}/method`,
      'POST',
      data,
      externalConfig,
    );
  }

  public async addProductToCheckout(
    checkoutId: string,
    data: ProductVariantAddToCheckoutRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<ProductVariantAddToCheckoutResponse>(
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
    return this.coreRequest<CheckoutAddOneToLineResponse>(
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
    return this.coreRequest<CheckoutRemoveOneFromLineResponse>(
      `checkout/${checkoutId}/${lineId}/remove-one`,
      'POST',
      undefined,
      externalConfig,
    );
  }

  public async getMenuCategories(
    menuId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<MenuCategory[]>(
      `menu-category/${menuId}/list`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getMenuCategoryBySlug(
    slug: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<MenuCategory>(
      `menu-category/slug/${slug}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async signInEmployeeByEmail(
    data: SignInByEmailRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<SignInByEmailResponse>(
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
    return this.coreRequest<JWTEmployeeAccessTokenPayload>(
      `auth/verify/${token}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async signInDemoData(externalConfig?: NextFetchRequestConfig) {
    return this.coreRequest<{ email: string; password: string }>(
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

  private async coreRequest<T, E = ErrorBase>(
    endpoint: string,
    method: 'POST' | 'GET' = 'POST',
    data?: unknown,
    externalConfig?: NextFetchRequestConfig,
  ): Promise<T | E> {
    return client<T, E>(
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

  private async coreRequestWithFiles<T, E = ErrorBase>(
    endpoint: string,
    data: unknown,
    externalConfig?: NextFetchRequestConfig,
  ): Promise<T | E> {
    return client<T, E>(
      {
        token: this.apiToken,
        url: this.apiUrl,
      },
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
