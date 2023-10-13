import { Category, Checkout, Product } from './types/objects';

export class MainAPI {
  private readonly apiUrl: string;
  private readonly apiToken: string;

  constructor(apiUrl: string, apiToken: string) {
    this.apiUrl = apiUrl;
    this.apiToken = apiToken;
  }

  public async getProductsInCategory(categoryId: string) {
    return this.coreRequest<Product[]>(`product/category/${categoryId}`, 'GET');
  }

  public async getProductBySlug(slug: string) {
    return this.coreRequest<Product>(`product/slug/${slug}`, 'GET');
  }

  public async getProductById(id: string) {
    return this.coreRequest<Product>(`product/${id}`, 'GET');
  }

  public async getCheckout(id: string) {
    return this.coreRequest<Checkout>(`checkout/${id}`, 'GET');
  }

  public async getCategories() {
    return this.coreRequest<Category[]>('category/list', 'GET');
  }

  public async getCategoryBySlug(slug: string) {
    return this.coreRequest<Category>(`category/slug/${slug}`, 'GET');
  }

  private async client<T = unknown, E = Error>(
    endpoint: string,
    customConfig: RequestInit = {},
  ) {
    const { body, ...otherConfig } = customConfig;

    const config: RequestInit = {
      method: otherConfig?.method || 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.apiToken}`,
      },
      body,
      cache: 'no-store',
      ...otherConfig,
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
  ) {
    try {
      return await this.client<T>(endpoint, {
        body: JSON.stringify(data),
        method,
      });
    } catch (e) {
      if (e instanceof Error) {
        return e;
      }
    }

    return Error(`Error unknown on coreRequest: endpoint ${endpoint}`);
  }
}
