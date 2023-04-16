import React from "react";
export interface IContextToolkitProvider {
    reducer?: {
        [k: string]: (state: any, action: any) => any;
    };
    initialState: any;
    functions?: (dispatch: (action: any) => void, state: any) => {
        [k: string]: Function | object;
    };
}
export interface IReactContextToolkitContext {
    initialState: any;
    functions: any;
    state: any;
    dispatch: (action: any) => void;
}
export declare const ReactContextToolkitContext: React.Context<Partial<IReactContextToolkitContext> & {
    [k: string]: any;
}>;
export declare function ContextToolkitInitializer({ reducer, children, initialState, functions: _functions }: React.PropsWithChildren<IContextToolkitProvider>): JSX.Element;
