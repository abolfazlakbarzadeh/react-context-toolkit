import { AxiosInstance, CreateAxiosDefaults, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';

interface IApiClientsOptions {
    clientOptions?: CreateAxiosDefaults;
    onLoadingStart?: () => void;
    onLoadingEnd?: () => void;
    onRequest?: (req: InternalAxiosRequestConfig) => any;
    onResponse?: (res: AxiosResponse) => any;
}
declare function ApiClient(options?: IApiClientsOptions): AxiosInstance;

interface IContextToolkitProvider {
    reducer?: {
        [k: string]: (state: any, action: any) => any;
    };
    initialState: any;
    customFunctions?: (dispatch: (action: any) => void, state: any) => {
        [k: string]: Function | object;
    };
}
declare function ContextToolkitInitializer({ reducer, children, initialState, customFunctions }: React.PropsWithChildren<IContextToolkitProvider>): JSX.Element;

type IUseReactContextToolkitReturn = {
    functions?: any;
    state?: any;
    dispatch?: (action: any) => void;
    [k: string]: any;
};
declare function useReactContextToolkit(): IUseReactContextToolkitReturn;

export { ApiClient, ContextToolkitInitializer, IContextToolkitProvider, useReactContextToolkit };
