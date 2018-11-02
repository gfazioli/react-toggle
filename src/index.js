import React from "react"

class Toggle extends React.Component {

  constructor( props )
  {
    super( props );

    this.state = {
      checked : props.defaultChecked ? props.defaultChecked : props.checked,
    };

    this.displayName = "Toggle";

    this.onToggle = this.onToggle.bind( this );

  }

  render()
  {
    const {
            id,
            name    = "toggle",
            label,
            labelRight,
            className,
            checked = false,
            defaultChecked,
            mode    = "toggle",
            theme   = "round",
            disabled,
            ...others
          } = this.props;

    // backward compatibility
    const bcTheme = {
      round                            : "rsbc-switch-button-flat-round",
      square                           : "rsbc-switch-button-flat-square",
      "rsbc-switch-button-flat-round"  : "rsbc-switch-button-flat-round",
      "rsbc-switch-button-flat-square" : "rsbc-switch-button-flat-square",
    };

    // backward compatibility
    const bcMode = {
      toggle   : "switch",
      "switch" : "switch",
      select   : "select",
    };

    const classes = [
      className,
      "rsbc-switch-button",
      `rsbc-mode-${bcMode[ mode ]}`,
      bcTheme[ theme ],
      disabled ? " disabled" : ""
    ];

    return (
      <div {...others} className={classes.join( " " ).trim()}>
        {label ? <label htmlFor={id ? id : name}>{label}</label> : null}
        <input onChange={this.onToggle}
               checked={this.state.checked}
               disabled={disabled}
               id={id ? id : name}
               name={name}
               type="checkbox"
               value="1"/>
        <label htmlFor={id ? id : name}>
        </label>
        {labelRight ? <label htmlFor={id ? id : name}>{labelRight}</label> : null}
      </div>
    );
  }

  componentWillReceiveProps( nextProps )
  {
    this.setState(
      {
        checked : (nextProps.checked !== this.state.checked) ? nextProps.checked : this.state.checked,
      }
    );
  }

  onToggle( evt )
  {
    this.props.onChange( !this.state.checked ); // backward compatibility
    this.props.onToggle( !this.state.checked, evt );

    this.setState( { checked : !this.state.checked } );
  }
}

Toggle.defaultProps = {
  onChange : () => {}, // backward compatibility
  onToggle : () => {}
};

export default Toggle;
