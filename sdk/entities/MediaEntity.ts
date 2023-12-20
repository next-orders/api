import { NextFetchRequestConfig } from '../types/next';
import { UploadMediaResponse } from '../endpoints';
import type { Media } from '../types/objects';
import type { RequestAPI, RequestAPIWithFiles } from '../types/request';

export class MediaEntity {
  private readonly request: RequestAPI;
  private readonly requestWithFiles: RequestAPIWithFiles;

  constructor(request: RequestAPI, requestWithFiles: RequestAPIWithFiles) {
    this.request = request;
    this.requestWithFiles = requestWithFiles;
  }

  public async list(externalConfig?: NextFetchRequestConfig) {
    return this.request<Media[]>(
      'media/list',
      'GET',
      undefined,
      externalConfig,
    );
  }

  public async upload(data: FormData, externalConfig?: NextFetchRequestConfig) {
    return this.requestWithFiles<UploadMediaResponse>(
      'media/upload',
      data,
      externalConfig,
    );
  }
}
