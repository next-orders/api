import { NextFetchRequestConfig } from '../types/next';
import { ChannelCreateRequest, ChannelCreateResponse } from '../endpoints';
import type { Channel, ProductVariant } from '../types/objects';
import { RequestAPI } from '../types/request';

export class ChannelEntity {
  private readonly request: RequestAPI;

  constructor(request: RequestAPI) {
    this.request = request;
  }

  public async get(channelId: string, externalConfig?: NextFetchRequestConfig) {
    return this.request<Channel>(
      `channel/${channelId}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async list(externalConfig?: NextFetchRequestConfig) {
    return this.request<Channel[]>(
      'channel/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async create(
    data: ChannelCreateRequest,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ChannelCreateResponse>(
      'channel',
      'POST',
      data,
      externalConfig,
    );
  }

  public async search(
    channelId: string,
    query: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariant[] | null>(
      `channel/${channelId}/search/${query}`,
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async getTopSearch(
    channelId: string,
    externalConfig?: NextFetchRequestConfig,
  ) {
    return this.request<ProductVariant[] | null>(
      `channel/${channelId}/search`,
      'GET',
      undefined,
      externalConfig,
    );
  }
}
