import * as _ from "lodash";
import React, { createContext, ReactElement, useMemo, useReducer } from "react";
import { getDatatypeName } from "../utils/helper-functions";
import { functionsMaker } from "./functions-maker";

export interface IContextToolkitProvider {
    reducer: {
        [k: string]: (state: any, action: any) => any
    };
    initialState: any
    children: any;
    customFunctions?: (dispatch: (action: any) => void, state: any) => {
        [k: string]: Function | object
    };
}
export interface IReactContextToolkitContext {
    state: any;
    dispatch: (action: any) => void
}
export const ReactContextToolkitContext = createContext<Partial<IReactContextToolkitContext> & { [k: string]: any }>({})

export function ContextToolkitInitializer({
    reducer,
    children,
    initialState,
    customFunctions
}: IContextToolkitProvider): ReactElement {


    const [state, dispatch] = useReducer((state: any, action: any) => {
        const { type, data } = action || {}
        if (reducer[type] && typeof reducer[type] == "function") {
            return reducer[type](_.cloneDeep(state), action)
        }
        if (type === "update-state") {
            return _.update(_.cloneDeep(state), data.path, (stateValue) => {
                if (getDatatypeName(data.key) === "object") {
                    for (const [key, value] of Object.entries(data.key)) {
                        stateValue[key] = value
                    }
                } else {
                    stateValue[data.key] = data.value
                }
                return stateValue
            })
        }
        return state
    }, initialState)

    const functions = functionsMaker(reducer)(state, dispatch, "", false)

    return useMemo(() => (
        <ReactContextToolkitContext.Provider value={{
            state,
            dispatch,
            functions: customFunctions && typeof customFunctions == "function" ? _.merge(functions, customFunctions(dispatch, state)) : functions,
            ...state
        }}>
            {children}
        </ReactContextToolkitContext.Provider>
    ), [state])
}
