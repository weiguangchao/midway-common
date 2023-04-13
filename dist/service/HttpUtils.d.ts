import { HttpService } from '@midwayjs/axios';
declare type RequestMethod = 'get' | 'post';
export declare class HttpUtils {
    httpService: HttpService;
    get(url: string, params?: any): Promise<any>;
    post(url: string, params?: any, data?: any): Promise<any>;
    request(url: string, method: RequestMethod, params?: any, data?: any, headers?: any): Promise<any>;
}
export {};
