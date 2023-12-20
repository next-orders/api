import { NextFetchRequestConfig } from '../types/next';
import type { Client } from '../types/objects';
import { RequestAPI } from '../types/request';

export class ClientEntity {
  private readonly request: RequestAPI;

  constructor(request: RequestAPI) {
    this.request = request;
  }

  public async list(externalConfig?: NextFetchRequestConfig) {
    return this.request<Client[]>(
      'client/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getById(
    clientId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<Client>(
      `client/${clientId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }
}
