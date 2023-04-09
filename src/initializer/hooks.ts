import { useContext } from "react";
import { ReactContextToolkitContext } from "./initializer";

export function useReactContextToolkit() {
  const context = useContext(ReactContextToolkitContext);
  if (context) return context;
  return {};
}
