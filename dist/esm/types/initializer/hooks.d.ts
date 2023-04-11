export type IUseReactContextToolkitReturn = {
    functions?: any;
    state?: any;
    dispatch?: (action: any) => void;
    [k: string]: any;
};
export declare function useReactContextToolkit(): Partial<import("./initializer").IReactContextToolkitContext> & {
    [k: string]: any;
};
