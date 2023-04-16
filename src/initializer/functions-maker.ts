import * as _ from "lodash";
import { getDatatypeName } from "../utils/helper-functions";

export const functionsMaker = (reducer?: any) =>
  function (
    state: any,
    dispatch: (action: any) => void,
    reducer_keys: string,
    isArray: boolean = false,
    statePath: string = ""
  ) {
    if (isArray) {
      if (getDatatypeName(state) !== "array") return;
      return function (index: number = -1) {
        let functions: {
          add(data?: any): void;
          remove(): void;
          update?(key: any, value: any): void;
          [k: string]: any;
        } = {
          add(data: any) {
            if (reducer?.[_.camelCase(reducer_keys)]) {
              dispatch({
                type: _.camelCase(`${reducer_keys}${_.startCase("add")}`),
                data: {
                  index,
                  data,
                },
              });
            } else {
              dispatch({
                type: "update-state",
                subType: "array-add-item",
                data: {
                  path: `${statePath}`,
                  index,
                  data,
                },
              });
            }
          },
          remove() {
            if (reducer?.[_.camelCase(reducer_keys)]) {
              dispatch({
                type: _.camelCase(`${reducer_keys}${_.startCase("remove")}`),
                data: {
                  index,
                },
              });
            } else {
              dispatch({
                type: "update-state",
                subType: "array-remove-item",
                data: {
                  path: `${statePath}`,
                  index,
                },
              });
            }
          },
        };
        if (state?.length) {
          functions.update = function (key: any, value: any) {
            const reducerKey = _.camelCase(
              `${reducer_keys}${_.startCase("item")}`
            );
            if (reducer?.[reducerKey]) {
              dispatch({
                type: reducerKey,
                data: {
                  index,
                  key,
                  value,
                },
              });
            } else {
              dispatch({
                type: "update-state",
                data: {
                  path: `${statePath}[${index}]`,
                  index,
                  key,
                  value,
                },
              });
            }
          };
          for (const [key, value] of Object.entries(state[0])) {
            if (getDatatypeName(value) === "object") {
              functions[key] = functionsMaker(reducer)(
                value,
                dispatch,
                reducer_keys.length
                  ? `${reducer_keys}${_.startCase(key)}`
                  : _.startCase(key),
                Array.isArray(value),
                statePath.length
                  ? `${statePath}[${index}].${key}`
                  : `[${index}].${key}`
              );
            }
          }
        }
        return functions;
      };
    } else if (getDatatypeName(state) === "object") {
      let functions: {
        update(key: any, value: any): void;
        [k: string]: any;
      } = {
        update(key: any, value: any) {
          if (reducer?.[_.camelCase(reducer_keys)]) {
            dispatch({
              type: _.camelCase(reducer_keys),
              data: {
                key,
                value,
              },
            });
          } else {
            dispatch({
              type: "update-state",
              data: {
                path: `${statePath}`,
                key,
                value,
              },
            });
          }
        },
      };

      for (const [key, value] of Object.entries(state)) {
        if (
          getDatatypeName(value) === "object" ||
          getDatatypeName(value) === "array"
        ) {
          functions[key] = functionsMaker(reducer)(
            value,
            dispatch,
            reducer_keys.length
              ? `${reducer_keys}${_.startCase(key)}`
              : _.startCase(key),
            Array.isArray(value),
            statePath.length ? `${statePath}.${key}` : key
          );
        }
      }

      return functions;
    }
    return {};
  };
