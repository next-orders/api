import { NextFetchRequestConfig } from '../types/next';
import type { MenuCategory } from '../types/objects';
import { RequestAPI } from '../types/request';
import {
  MenuCategoryCreateRequest,
  MenuCategoryCreateResponse,
  MenuCategoryUpdateRequest,
  MenuCategoryUpdateResponse,
} from '../endpoints';

export class MenuCategoryEntity {
  private readonly request: RequestAPI;

  constructor(request: RequestAPI) {
    this.request = request;
  }

  public async listInMenu(
    menuId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<MenuCategory[]>(
      `menu-category/${menuId}/list`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getBySlug(
    slug: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<MenuCategory>(
      `menu-category/slug/${slug}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getById(id: string, externalConfig?: NextFetchRequestConfig) {
    return this.request<MenuCategory>(
      `menu-category/id/${id}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async create(
    data: MenuCategoryCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<MenuCategoryCreateResponse>(
      'menu-category',
      'POST',
      data,
      externalConfig,
    );
  }

  public async update(
    categoryId: string,
    data: MenuCategoryUpdateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<MenuCategoryUpdateResponse>(
      `menu-category/${categoryId}`,
      'PATCH',
      data,
      externalConfig,
    );
  }
}
