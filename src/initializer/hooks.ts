import { useContext } from "react";
import { ReactContextToolkitContext } from "./initializer";

export type IUseReactContextToolkitReturn = {
  functions?: any;
  state?: any;
  dispatch?: (action: any) => void;
  [k: string]: any;
}

export function useReactContextToolkit() {
  const context = useContext(ReactContextToolkitContext);
  if (context) return context;
  else
  return {};
}
