# React Context Toolkit v1.0.5

Hey everyone! 😃, so this is my first open-source package that helps React developers work with React-Context.
As you know, implementing an optimal context may take a lot of time or make our code dirty, although there are those who claim that there is no problem with this but the readability and extensibility of the code is a priority :)

# Key feature

- Automatic state-based function generator to make state updates easier.
- Add custom state updater functions

# Additional

There is an axios instance maker so you can use it and by a faw addition functions it have control something's.

## Installation

Install react-context-toolkit with npm

```bash
  npm install @abak/react-context-toolkit
```

# How to use

Next, we need to import the `ContextToolkitInitializer` into the component that is the parent of all the components we want to use the context inside:

```ts
import { ContextToolkitInitializer } from 'react-context-toolkit'

function TheParentComponent() {

    return (
        <ContextToolkitInitializer
            initialState={{ key: "value", key2: { key3: "value" } }} //[REQUIRED] your initial state
            reducer={{ // [OPTIONAL]
                key: (state, dispatch) => { // when you update { key: "" }
                    ...your state updates
                    return state
                },
                key2Key3: (state, dispatch) => { // when you update { key2: { key3: "" } }
                    ...your state updates
                    return state
                }
            }}
            customFunctions={(dispatch, state) => ({ // [OPTIONAL] these functions will merge or overwrite on built-in functions that React Context Toolkit makes.
                key2: {
                    updateSomething: (key, value) => {
                        dispatch({
                            type: "keyName", // [REQUIRED] the type name what will use in reducer key.
                            ...else
                        })
                    }
                }
            })}
        >
            your things...
        </ContextToolkitInitializer>
    )
}
```

and, in your nested components:

```ts
import { useReactContextToolkit } from "react-context-toolkit";

function TheChildComponent() {
  const { functions, dispatch, state } = useReactContextToolkit();

  const onClickHander = () => {
    functions.key2.update("keyName", keyValue);
    // or
    functions.key2.update({
      keyName: keyValue,
      keyName2: keyValue2,
      keyName3: keyValue3,
    });

    // your custom function
    functions.key2.updateSomething("keyName", keyValue);
  };

  return <button onClick={onClickHandler}>click me</button>;
}
```

## Contributing

Contributions are always welcome!

## License

[MIT](https://choosealicense.com/licenses/mit/)
