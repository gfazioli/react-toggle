# Overview

> ⚠️ **IMPORTANT** This React component is the new version of [React Switch Button](https://github.com/gfazioli/react-switch-button).

### Backward compatibility

You can use this new version instead of [React Switch Button](https://github.com/gfazioli/react-switch-button). Currently, I'm still supporting the compatibility with the previous version. This means that there are some stuff **deprecated**. For example

| Deprecated                               | Description                                  | Use instead      |
| ---------------------------------------- | -------------------------------------------- | ---------------- |
| `onChange`                               | event fired when toggle changes              | `onToggle`       |
| `mode="switch"`                          | the new mode props are `toggle` and `select` | `mode="switch"`  |
| `theme="rsbc-switch-button-flat-round"`  | appearance theme                             | `theme="round"`  |
| `theme="rsbc-switch-button-flat-square"` | appearance theme                             | `theme="square"` |

*So, please, if you was using the previous version, update the new features as soon as possible, because they will be removed soon.*

## Demo

This component is designed to render an awesome switch/toggle component.
Visit the [online demo](https://gfazioli.github.io/react-toggle/).

## Installation

You can use either **npm**

```bash
npm i react-toggle-component
```

or **yarn**

```bash
yarn add react-toggle-component
```


## Basic Usage

First of all, remember to import the component.

```jsx
import React from "react"

import Toggle from "react-toggle-component"
import "react-toggle-component/styles.css"

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

```jsx
<Toggle />
```

Of course, you can create a left label, a right label, or both

```jsx
<Toggle label="Click me" />

<Toggle labelRight="Click me" />

<Toggle label="Click me on left" labelRight="Click me on right" />

```

## Default styles

Youmay import the default styles by using

```jsx
import "react-toggle-component/styles.css"
```

## Default checked

You can set the default state of component by `checked` props

```jsx
<Toggle checked={true} />
```

## Disabled

Of course, you can disable the component

```jsx
<Toggle disabled={true} />
```

## Events

You can use `onToggle` event to get when the toggle changes

```jsx
<Toggle checked={this.state.checked} onToggle={value => this.setState({checked:value})} />
```

### Backward compatibility

To mainteince the backward compatibility you may continue to use `onChange` handler

```jsx
<Toggle checked={this.state.checked} onChange={value => this.setState({checked:value})} />
```



| Event      | Params             | Note                                                         |
| ---------- | ------------------ | ------------------------------------------------------------ |
| `onToggle` | `(checked, event)` | The checked value may be true or false. You may use also the event to get the name or id of component. |

## Mode

You can also use the toggle as selected component. This mode is useful when you have to selected by two choices

```jsx
<Toggle mode="select"
        label="Theme Light"
        labelRight="Theme Dark"
        checked={this.state.checked}
        onChange={value => this.setState({checked:value})} />
```

## Props

| Prop         | Type     | Description                               |
| ------------ | ----------------------------------------- | --------------------- |
| `name`       | string | Component name, default `toggle`         |
| `id`         | string   | Component id, when null or undefined it'll be `name` |
| `label`      | string | Left label                               |
| `labelRight` | string | Right label                              |
| `className`  | string | Additional classes for the main container |
| `checked`    | boolean | Default checked status. Possibible values are `true` or `false`.  Default `false` |
| `mode`       | string | The toggle mode. Possible values are `toggle` or `select`. Default `toggle`. |
| `theme`      | string | The toggle appearance theme. Possible values are `round` or `square`. Default `round`. |
| `disabled` | boolean | If `true` the toggle is disabled. Default `false`. |

## Contributing

Thanks for any your contribute 👏🏻.

## Bugs 🐛

Use the GitHub issues.

## License

MIT Licensed. Copyright (c) Giovambattista Fazioli 2018.
