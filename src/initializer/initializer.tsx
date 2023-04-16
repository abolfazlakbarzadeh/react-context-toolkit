import * as _ from "lodash";
import React, { createContext, useMemo, useReducer } from "react";
import { getDatatypeName } from "../utils/helper-functions";
import { functionsMaker } from "./functions-maker";

export interface IContextToolkitProvider {
    reducer?: {
        [k: string]: (state: any, action: any) => any
    };
    initialState: any
    functions?: (dispatch: (action: any) => void, state: any) => {
        [k: string]: Function | object
    };
}
export interface IReactContextToolkitContext {
    initialState: any,
    functions: any,
    state: any;
    dispatch: (action: any) => void
}
export const ReactContextToolkitContext = createContext<Partial<IReactContextToolkitContext> & { [k: string]: any }>({})

export function ContextToolkitInitializer({
    reducer,
    children,
    initialState,
    functions: _functions
}: React.PropsWithChildren<IContextToolkitProvider>) {


    const [state, dispatch] = useReducer((state: any, action: any) => {
        const { type, data, subType } = action || {}
        if (reducer?.[type] && typeof reducer?.[type] == "function") {
            return reducer[type](_.cloneDeep(state), action)
        }
        if (type === "update-state") {
            return _.update(_.cloneDeep(state), data.path, (stateValue) => {
                switch (subType) {
                    case "array-add-item": {
                        if (data.data && getDatatypeName(stateValue) === "array") {
                            (stateValue as Array<any>).splice(data.index + 1, 0, data.data)
                        }
                        break
                    }
                    default: {
                        if (getDatatypeName(data.key) === "object") {
                            for (const [key, value] of Object.entries(data.key)) {
                                stateValue[key] = value
                            }
                        } else {
                            stateValue[data.key] = data.value
                        }
                    }
                }
                return stateValue
            })
        }
        return state
    }, initialState)

    const functions = useMemo(() => functionsMaker(reducer)(state, dispatch, "", false), [state])

    return useMemo(() => (
        <ReactContextToolkitContext.Provider value={{
            state,
            dispatch,
            functions: _functions && typeof _functions == "function" ? _.merge(functions, _functions(dispatch, state)) : functions,
            initialState: _.cloneDeep(initialState),
            ...state
        }}>
            {children}
        </ReactContextToolkitContext.Provider>
    ), [_functions, children, functions, state])
}
