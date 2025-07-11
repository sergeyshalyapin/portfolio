[Understanding React's UI Rendering Process](https://www.youtube.com/watch?v=i793Qm6kv3U&ab_channel=CrossComm%2CInc.) - conf video

```
const MyComponent = () => {
  return (
    <main>
      <h1 id="title">Look ma!</h1>
    </main>
  )
}
```

React recognises jsx structre in this example as an object
```
{
  type: "main",
  key: null,
  ref: null,
  "$$typeof": Symbol(react.element),
  props: {
    children: {
      type: "h1",
      key: null,
      ref: null,
      props: {
        id: "title",
        children: "Look ma!"
      }
    }
  }
}
```

- **type** is a name of the tag or the reference to component if it has been imported.
- **key** is a unique identificator among the siblings. Used when you mapping in array of components.
- **ref** is a reference to the actual DOM node. Used for example to focusing inputs or read by the 3d party libraries that require access to the DOM node.
- **`$$typeof`** In this case Symbol represents unique atonomous hash, like uuid. Used to transmit element to return typeof symbol. Important: when react gets jsx to render from API, it will reject it unless $$typeof is Symbol(react.element).
- **props** are properties. children property could be a string, object or an array.

-- This is virtual DOM --

Reconciliation

Creating a virtual DOM is part of rendering process called a reconciliation. It is responsble for maintaining the tree of components, when components props or state changes, every time the render function is called. It housing the difference algorithm that determines which part of the tree need to be replaced.

When the type is changed - the whole tree unerneath is replaced. When tearing down a tree, all down of node detroyed. Component receives "ComponentWillUnmount" (equivalent: useEffect hook will fire)