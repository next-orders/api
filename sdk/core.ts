import { client } from './client';
import {
  AvatarParams,
  Category,
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
  ProductVariantAddToCheckoutRequest,
  ProductVariantAddToCheckoutResponse,
  SignInByEmailRequest,
  SignInByEmailResponse,
} from './endpoints';
import { NextFetchRequestConfig } from './types/next';
import { JWTEmployeeAccessTokenPayload } from './types/jwt';

export class MainAPI {
  private readonly apiUrl: string;
  private readonly apiToken: string;

  constructor(apiUrl: string, apiToken: string) {
    this.apiUrl = apiUrl;
    this.apiToken = apiToken;
  }

  public async getShop(
    shopId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<Shop>(
      `shop/${shopId}`,
      'GET',
      undefined,
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
      `channel/list`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getAllMedia(externalConfig?: NextFetchRequestConfig) {
    return this.coreRequest<Media[]>(
      `media/list`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getAllDomains(externalConfig?: NextFetchRequestConfig) {
    return this.coreRequest<Domain[]>(
      `domain/list`,
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
      `client/list`,
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
      `product/list`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getProductsInCategory(
    categoryId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<Product[]>(
      `product/category/${categoryId}`,
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

  public async getCategories(externalConfig?: NextFetchRequestConfig) {
    return this.coreRequest<Category[]>(
      'category/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getMenuCategories(externalConfig?: NextFetchRequestConfig) {
    return this.coreRequest<MenuCategory[]>(
      'menu-category/list',
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

  public getMenuCategoryIconURL(categoryCode: string) {
    return `${this.apiUrl}/image/static/${categoryCode}.png`;
  }

  public async signInEmployeeByEmail(
    data: SignInByEmailRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.coreRequest<SignInByEmailResponse>(
      `auth/employee/email`,
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
      `auth/employee/demo`,
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

  private async coreRequest<T>(
    endpoint: string,
    method: 'POST' | 'GET' = 'POST',
    data?: unknown,
    externalConfig?: NextFetchRequestConfig,
  ) {
    try {
      return await client<T>(
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
    } catch (e) {
      if (e instanceof Error) {
        return e;
      }
    }

    return Error(`Error unknown on coreRequest: endpoint ${endpoint}`);
  }
}
