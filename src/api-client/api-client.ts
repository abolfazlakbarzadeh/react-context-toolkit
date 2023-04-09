import axios, {
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";

export interface IApiClientsOptions {
  clientOptions?: CreateAxiosDefaults;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
  onRequest?: (req: InternalAxiosRequestConfig) => any;
  onResponse?: (res: AxiosResponse) => any;
}

function ApiClient(options?: IApiClientsOptions): AxiosInstance {
  const axiosIns = axios.create(options?.clientOptions);
  axiosIns.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    options?.onLoadingStart?.();
    if (typeof options?.onRequest == "function")
      return options?.onRequest?.(req);
    return req;
  });
  axiosIns.interceptors.response.use((res: AxiosResponse) => {
    options?.onLoadingEnd?.();
    if (typeof options?.onResponse == "function")
      return options?.onResponse?.(res);
    return res;
  });
  return axiosIns;
}

export { ApiClient };
