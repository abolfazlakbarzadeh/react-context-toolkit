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
    reducer: {
        [k: string]: (state: any, action: any) => any;
    };
    initialState: any;
    children: any;
    customFunctions?: (dispatch: (action: any) => void, state: any) => {
        [k: string]: Function | object;
    };
}
interface IReactContextToolkitContext {
    state: any;
    dispatch: (action: any) => void;
}
declare function ContextToolkitInitializer({ reducer, children, initialState, customFunctions }: IContextToolkitProvider): ReactElement;

declare function useReactContextToolkit(): Partial<IReactContextToolkitContext> & {
    [k: string]: any;
};

export { ApiClient, ContextToolkitInitializer, IContextToolkitProvider, useReactContextToolkit };
