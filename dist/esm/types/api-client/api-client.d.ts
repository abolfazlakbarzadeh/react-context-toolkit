import { AxiosInstance, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";
export interface IApiClientsOptions {
    clientOptions?: CreateAxiosDefaults;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    onRequest?: (req: InternalAxiosRequestConfig) => any;
    onResponse?: (res: AxiosResponse) => any;
}
declare function ApiClient(options?: IApiClientsOptions): AxiosInstance;
export { ApiClient };
