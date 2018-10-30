import React from "react"
import {render} from "react-dom"

import "./stylesheets/normalize.css"
import "./stylesheets/stylesheet.css"
import "./stylesheets/github-light.css"
import "./stylesheets/styles.css"

import Toggle from '../../src'

class App extends React.Component {

  constructor( props )
  {
    super( props );

    this.state = {
      theme        : "rsbc-switch-button-flat-round",
      themeChecked : false,
      checked      : false,
    };
  }

  onChange( e )
  {
    const theme = (this.state.theme === "rsbc-switch-button-flat-square") ? "rsbc-switch-button-flat-round" : "rsbc-switch-button-flat-square";

    this.setState(
      {
        theme        : theme,
        themeChecked : (this.state.theme === "rsbc-switch-button-flat-round"),
      }
    );
  }

  render()
  {

    const code = [
      {
        label  : "Basic usage",
        code   : `
import React from "react"

import Toggle from "react-toggle"

class Application extends React.Component {

    constructor( props )
    {
      super( props );

      this.state = {checked:false}
    }

    render() {
        return (
            <div>
              <Toggle label="Click me"
                    checked={this.state.checked}
                    onChange={value => { this.setState( { checked : !this.state.checked } )}}/>

                <div key="info"> Value: {this.state.checked ? "TRUE" : "FALSE"}</div>
            </div>
        );
    }
}
                  `,
        object : [ <Toggle key="switch"
                           label="Click me"
                           theme={this.state.theme}
                           onChange={value => { this.setState( { checked : !this.state.checked } )}}
                           checked={this.state.checked}
                           name="toggle-1"/>,
                   <div key="info"> Value: {this.state.checked ? "TRUE" : "FALSE"}</div>
                 ]
      },
      {
        label  : "Set Theme",
        code   : '<Toggle name="toggle-2" theme="rsbc-switch-button-flat-square" checked={true} />',
        object : <Toggle name="toggle-2"
                         theme="rsbc-switch-button-flat-square"
                         checked={true}/>
      },
      {
        label  : "Set initial status",
        code   : '<Toggle name="toggle-3" checked={true} />',
        object : <Toggle name="toggle-3"
                         theme={this.state.theme}
                         checked={true}/>
      },
      {
        label  : "Set initial status",
        code   : '<Toggle name="toggle-4" checked={false} />',
        object : <Toggle name="toggle-4"
                         theme={this.state.theme}
                         checked={false}/>
      },
      {
        label  : "Add left label",
        code   : '<Toggle name="toggle-5" label="Click me" checked={true} />',
        object : <Toggle name="toggle-5"
                         theme={this.state.theme}
                         label="Click me"
                         checked={true}/>
      },
      {
        label  : "Add right label",
        code   : '<Toggle name="toggle-6" labelRight="Click me" checked={true} />',
        object : <Toggle name="toggle-6"
                         theme={this.state.theme}
                         labelRight="Click me"
                         checked={true}/>
      },
      {
        label  : "Add left and right label",
        code   : '<Toggle name="toggle-7" label="Both" label_right="Click me" checked={true} />',
        object : <Toggle name="toggle-7"
                         theme={this.state.theme}
                         label="Both"
                         labelRight="Click me"
                         checked={true}/>
      },
      {
        label  : "Disabled when On",
        code   : '<Toggle name="toggle-8" label="Disabled" disabled={true} checked={true} />',
        object : <Toggle name="toggle-8"
                         theme={this.state.theme}
                         label="Disabled"
                         disabled={true}
                         checked={true}/>
      },
      {
        label  : "Disabled when Off",
        code   : '<Toggle name="toggle-9" label="Disabled" disabled={true} />',
        object : <Toggle name="toggle-9"
                         theme={this.state.theme}
                         label="Disabled"
                         disabled={true}/>
      },
      {
        label  : "Mode select",
        code   : '<Toggle name="toggle-10" label="Switch mode" mode="select" labelRight="Turn right" label="Turn left"/>',
        object : <Toggle name="toggle-10"
                         mode="select"
                         theme={this.state.theme}
                         labelRight="Turn right"
                         label="Turn left"/>
      }
    ];

    const rows = code.map( function( o, i ) {

      return (
        <div className="example"
             key={i}>
          <h3>{o.label}</h3>
          <pre>{o.code}</pre>
          <div className="result">
            {o.object}
          </div>
        </div>
      );

    } );

    return (
      <div className="examples">
        {rows}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
