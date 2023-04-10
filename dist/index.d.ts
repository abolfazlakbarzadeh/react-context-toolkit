import { AxiosInstance, CreateAxiosDefaults, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ReactElement } from 'react';

interface IApiClientsOptions {
    clientOptions?: CreateAxiosDefaults;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    onRequest?: (req: InternalAxiosRequestConfig) => any;
    onResponse?: (res: AxiosResponse) => any;
}
declare function ApiClient(options?: IApiClientsOptions): AxiosInstance;

interface IContextToolkitProvider {
    reducer: (state: any, action: any) => any;
    initialState: any;
    children: any;
}
interface IReactContextToolkitContext {
    state: any;
    dispatch: (action: any) => void;
}
declare function ContextToolkitInitializer({ reducer, children, initialState }: IContextToolkitProvider): ReactElement;

declare function useReactContextToolkit(): Partial<IReactContextToolkitContext> & {
    [k: string]: any;
};

export { ApiClient, ContextToolkitInitializer, IContextToolkitProvider, useReactContextToolkit };
