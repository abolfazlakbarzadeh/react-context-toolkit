import * as _ from "lodash";
import React, { createContext, ReactElement, useReducer } from "react";
import { functionsMaker } from "./functions-maker";

export interface IContextToolkitProvider {
    reducer: (state: any, action: any) => any;
    initialState: any
    children: any
}
export interface IReactContextToolkitContext {
    state: any;
    dispatch: (action: any) => void
}
export const ReactContextToolkitContext = createContext<Partial<IReactContextToolkitContext> & { [k: string]: any }>({})

export function ContextToolkitInitializer({
    reducer,
    children,
    initialState
}: IContextToolkitProvider): ReactElement {


    const [state, dispatch] = useReducer((state: any, action: any) => {
        return reducer?.(_.cloneDeep(state), action)
    }, initialState)

    const functions = functionsMaker(state, dispatch, "", false)

    return (
        <ReactContextToolkitContext.Provider value={{
            state,
            dispatch,
            functions,
            ...state
        }}>
            {children}
        </ReactContextToolkitContext.Provider>
    )


}
