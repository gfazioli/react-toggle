## React Toggle Component

This component is designed to render an awesome switch/toggle component.
Visit the [online demo](https://gfazioli.github.io/react-toggle/).

### Installation

```
npm -i react-toggle-component
```

### Basic Usage

First of all, remember to import the component.

```js
import React from "react"

import Toggle from "react-toggle"

class Application extends React.Component {

    constructor( props )
    {
      super( props );
    }

    render() {
        return (
            <Toggle label="Click me" />
        );
    }

}
```

You may use the toggle button without any label, by using

```js
<Toggle />
```

Of course, you can create a left label, a right label, or both

```js
<Toggle label="Click me" />

<Toggle labelRight="Click me" />

<Toggle label="Click me on left" labelRight="Click me on right" />

```

# Contributing

Thanks for any your contribute.

# License

MIT Licensed. Copyright (c) Giovambattista Fazioli 2018.
