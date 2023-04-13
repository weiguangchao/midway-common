import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { HttpService } from '@midwayjs/axios';

type RequestMethod = 'get' | 'post';

const timeout = 5 * 1000;

@Provide()
@Scope(ScopeEnum.Singleton)
export class HttpUtils {
  @Inject()
  httpService: HttpService;

  async get(url: string, params?: any): Promise<any> {
    return await this.request(url, 'get', params);
  }

  async post(url: string, params?: any, data?: any): Promise<any> {
    return await this.request(url, 'post', params, data);
  }

  async request(
    url: string,
    method: RequestMethod,
    params?: any,
    data?: any,
    headers?: any
  ) {
    // default header
    let h = headers;
    if (!headers) {
      h = {
        'Content-Type': 'application/json',
      };
    }

    const response = await this.httpService.request({
      url,
      method,
      headers: h,
      params,
      data,
      timeout,
    });

    const { status, statusText } = response;
    if (status !== 200 || statusText !== 'OK') {
      throw new Error(
        `request error status: ${statusText}, statusText: ${statusText}`
      );
    }

    return response?.data?.data;
  }
}
