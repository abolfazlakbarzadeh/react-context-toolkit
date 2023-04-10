import React, { ReactElement } from "react";
export interface IContextToolkitProvider {
    reducer: (state: any, action: any) => any;
    initialState: any;
    children: any;
}
export interface IReactContextToolkitContext {
    state: any;
    dispatch: (action: any) => void;
}
export declare const ReactContextToolkitContext: React.Context<Partial<IReactContextToolkitContext> & {
    [k: string]: any;
}>;
export declare function ContextToolkitInitializer({ reducer, children, initialState }: IContextToolkitProvider): ReactElement;
