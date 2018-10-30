import React from "react"

import './styles.css'

class Toggle extends React.Component {

  constructor( props )
  {
    super( props );

    this.state = {
      checked : props.defaultChecked ? props.defaultChecked : props.checked,
    };

    this.displayName = "Toggle";

    this.onChange = this.onChange.bind(this);

  }

  render()
  {
    const {
      id,
      name = "switch-button",
      label,
      labelRight,
      className,
      checked = false,
      defaultChecked,
      mode = "switch",
      theme = "rsbc-switch-button-flat-round",
      disabled,
      ...others
    } = this.props;

    const classes = [
      className,
      "rsbc-switch-button",
      `rsbc-mode-${mode}`,
      theme,
      disabled ? " disabled" : ""
    ];

    return (
      <div {...others} className={classes.join(" ").trim()}>
        {label ? <label htmlFor={id ? id : name}>{label}</label> : null}
        <input onChange={this.onChange}
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

  onChange( evt )
  {

    this.props.onChange( !this.state.checked );

    this.setState({checked : !this.state.checked});
  }
}

Toggle.defaultProps = {
  onChange : () => {}
}

export default Toggle;
