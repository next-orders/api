import {
  Category,
  Channel,
  Checkout,
  Domain,
  Media,
  Menu,
  MenuCategory,
  Product,
  ProductVariant,
  Shop,
} from './types/objects';
import { ProductVariantAddToCheckoutRequest } from './endpoints';

type NextFetchRequestConfig = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

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
    return this.coreRequest<Checkout>(
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

  private async client<T = unknown, E = Error>(
    endpoint: string,
    customConfig: RequestInit = {},
    externalConfig: NextFetchRequestConfig = {},
  ) {
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

    const response = await fetch(`${this.apiUrl}/${endpoint}`, config);

    if (response.ok) {
      return (await response.json()) as T;
    }

    const errorMessage = await response.text();
    return (await Promise.reject(
      new Error(`${response.status}: ${response.statusText}, ${errorMessage}`),
    )) as E;
  }

  private async coreRequest<T>(
    endpoint: string,
    method: 'POST' | 'GET' = 'POST',
    data?: unknown,
    externalConfig?: NextFetchRequestConfig,
  ) {
    try {
      return await this.client<T>(
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
