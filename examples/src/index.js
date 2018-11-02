import React from "react"
import {render} from "react-dom"

import "./stylesheets/normalize.css"
import "./stylesheets/stylesheet.css"
import "./stylesheets/github-light.css"
import "./stylesheets/styles.css"

import Toggle from "../../src"
import "../../styles.css"

class App extends React.Component {

  constructor( props )
  {
    super( props );

    this.state = {
      theme        : "round",
      themeChecked : false,
      checked      : false,
    };
  }

  onToggle( e )
  {
    const theme = (this.state.theme === "square") ? "round" : "square";

    this.setState(
      {
        theme        : theme,
        themeChecked : (this.state.theme === "round"),
      }
    );
  }

  render()
  {

    const code = [
      {
        label  : "Basic usage",
        code   : `import React from "react"

import Toggle from "react-toggle"
import "react-toggle-component/styles.css"

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
                    onToggle={value => { this.setState( { checked : !this.state.checked } )}}/>

                <div key="info"> Value: {this.state.checked ? "TRUE" : "FALSE"}</div>
            </div>
        );
    }
}`,
        object : [ <Toggle key="switch"
                           label="Click me"
                           theme={this.state.theme}
                           onToggle={value => { this.setState( { checked : !this.state.checked } )}}
                           checked={this.state.checked}
                           name="toggle-1"/>,
          <div key="info"> Value: {this.state.checked ? "TRUE" : "FALSE"}</div>
        ]
      },
      {
        label  : "Set Theme",
        code   : `<Toggle name="toggle-2" 
        theme="square" 
        checked={true} />`,
        object : <Toggle name="toggle-2"
                         theme="square"
                         checked={true}/>
      },
      {
        label  : "Set initial status",
        code   : `<Toggle name="toggle-3" 
        checked={true} />`,
        object : <Toggle name="toggle-3"
                         theme={this.state.theme}
                         checked={true}/>
      },
      {
        label  : "Set initial status",
        code   : `<Toggle name="toggle-4" 
        checked={false} />`,
        object : <Toggle name="toggle-4"
                         theme={this.state.theme}
                         checked={false}/>
      },
      {
        label  : "Add left label",
        code   : `<Toggle name="toggle-5" 
        label="Click me" 
        checked={true} />'`,
        object : <Toggle name="toggle-5"
                         theme={this.state.theme}
                         label="Click me"
                         checked={true}/>
      },
      {
        label  : "Add right label",
        code   : `<Toggle name="toggle-6" 
        labelRight="Click me" 
        checked={true} />`,
        object : <Toggle name="toggle-6"
                         theme={this.state.theme}
                         labelRight="Click me"
                         checked={true}/>
      },
      {
        label  : "Add left and right label",
        code   : `<Toggle name="toggle-7" 
        label="Both" 
        label_right="Click me" 
        checked={true} />`,
        object : <Toggle name="toggle-7"
                         theme={this.state.theme}
                         label="Both"
                         labelRight="Click me"
                         checked={true}/>
      },
      {
        label  : "Disabled when On",
        code   : `<Toggle name="toggle-8" 
        label="Disabled" 
        disabled={true} 
        checked={true} />`,
        object : <Toggle name="toggle-8"
                         theme={this.state.theme}
                         label="Disabled"
                         disabled={true}
                         checked={true}/>
      },
      {
        label  : "Disabled when Off",
        code   : `<Toggle name="toggle-9" 
        label="Disabled" 
        disabled={true} />`,
        object : <Toggle name="toggle-9"
                         theme={this.state.theme}
                         label="Disabled"
                         disabled={true}/>
      },
      {
        label  : "Mode select",
        code   : `<Toggle name="toggle-10" 
        label="Switch mode" 
        mode="select" 
        labelRight="Turn right" 
        label="Turn left"/>`,
        object : <Toggle name="toggle-10"
                         mode="select"
                         theme={this.state.theme}
                         labelRight="Turn right"
                         label="Turn left"/>
      },
      {
        label  : "Change theme",
        code   : `<Toggle name="toggle-11" 
        label="Switch mode" 
        mode="select" 
        labelRight="Theme Round" 
        label="Theme Square"/>`,
        object : <Toggle name="toggle-11"
                         mode="select"
                         theme={this.state.theme}
                         checked={(this.state.theme === "square")}
                         onToggle={value => this.setState( { theme : (value ? "square" : "round") } )}
                         labelRight="Theme Square"
                         label="Theme Round"/>
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

render( <App/>, document.getElementById( "root" ) );