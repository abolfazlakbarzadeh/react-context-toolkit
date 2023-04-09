import * as _ from "lodash";
import React, { createContext, ReactElement, useContext, useReducer } from "react";

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

    return (
        <ReactContextToolkitContext.Provider value={{
            state,
            dispatch,
            ...state
        }}>
            {children}
        </ReactContextToolkitContext.Provider>
    )


}
