import { getDatatypeName } from "../utils/helper-functions";

export function functionsMaker(
  state: any,
  dispatch: (action: any) => void,
  reducer_keys: string,
  isArray: boolean = false
) {
  if (isArray) {
    if (getDatatypeName(state) != "array") return;
    return function (index: number) {
      let functions: {
        add(data?: any): void;
        remove(): void;
        update?(key: any, value: any): void;
        [k: string]: any;
      } = {
        add(data?: any) {
          dispatch({
            type: reducer_keys,
            data: {
              index,
              data,
            },
          });
        },
        remove() {
          dispatch({
            type: reducer_keys,
            data: {
              index,
            },
          });
        },
      };
      if (state?.length) {
        functions.update = function (key: any, value: any) {
          dispatch({
            type: `${reducer_keys}_item`,
            data: {
              index,
              key,
              value,
            },
          });
        };
        for (const [key, value] of Object.entries(state)) {
          if (getDatatypeName(value) == "object") {
            functions[key] = functionsMaker(
              value,
              dispatch,
              `${reducer_keys}_${key}`,
              Array.isArray(value)
            );
          }
        }
      }
      return functions;
    };
  } else if (getDatatypeName(state) == "object") {
    let functions: {
      update(key: any, value: any): void;
      [k: string]: any;
    } = {
      update(key: any, value: any) {
        dispatch({
          type: `${reducer_keys}_item`,
          data: {
            key,
            value,
          },
        });
      },
    };

    for (const [key, value] of Object.entries(state)) {
      if (
        getDatatypeName(value) == "object" ||
        getDatatypeName(value) == "array"
      ) {
        functions[key] = functionsMaker(
          value,
          dispatch,
          `${reducer_keys}_${key}`,
          Array.isArray(value)
        );
      }
    }

    return functions;
  }
  return {};
}
