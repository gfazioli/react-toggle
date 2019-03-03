import React, { FunctionComponent, useRef } from "react";
import styled from "styled-components";
import defaultTheme from "../../theme/theme";

interface Props {
  /**
   * Addition classes
   */
  className?: string;
  /**
   * Name of checkbox. You should alway assign a name
   *
   * @requires true
   */
  name?: string;
  /**
   * Value used when you'll post data
   *
   * @default
   */
  value?: string;
  /**
   * State of checked
   *
   * @default false
   */
  checked?: boolean;
  /**
   * Disable the toogle
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Trigged when the checkbox change
   *
   * @param {React.ChangeEvent} e
   */
  onToggle?: (e: React.ChangeEvent) => void;
  /**
   * Trigged when the toggle is on the left.
   */
  onRight?: (e: React.ChangeEvent) => void;
  /**
   * Trigged when the toggle is on the right.
   */
  onLeft?: (e: React.ChangeEvent) => void;
  /**
   * Default Background color
   */
  backgroundColor?: string;
  /**
   * Background color when the toggle turned on
   */
  backgroundColorRight?: string;
  /**
   * Background color when the toggle is disabled
   *
   */
  backgroundColorDisabled?: string;
  /**
   * Radius of container
   *
   * @default 8px
   */
  backgroundRadius?: string;
  /**
   * Border radius of knob
   */
  radius?: string;
  /**
   * Color knob
   */
  color?: string;
  /**
   * Color knob when turned on
   */
  colorRight?: string;
  /**
   * Width of component
   */
  width?: string;
  /**
   * Width of knob
   */
  widthKnob?: string;
  /**
   * Height of component
   */
  height?: string;
  /**
   * Height of knob
   */
  heightKnob?: string;
  /**
   * Border width when on the left. Set to 0 for no border
   */
  borderWidth?: string;
  /**
   * Border wifth when on the right. Set to 0 for no border
   */
  borderWidthRight?: string;
  /**
   * Border color when on the left. You may use transparent as well
   */
  borderColor?: string;
  /**
   * Border color when on the left. You may use transparent as well
   */
  borderColorRight?: string;
}

const ToggleContainer = styled.label``;

const ToggleBase = styled.span<Props>`
  position: relative;
  box-sizing: border-box;
  display:inline-grid;
  align-items: center;
  width: ${p => p.width || (p.theme && p.theme.width) || defaultTheme.width};
  height: ${p => p.height || (p.theme && p.theme.height) || defaultTheme.height};
  vertical-align: text-top;
  margin: 0 4px;
  
  input[type="checkbox"]  {
      position: absolute;
      margin-left: -9999px;
      visibility: hidden;
      
    // off state
    & + label {
      display:inline-grid;
      box-sizing: border-box;
      align-items: center;
      outline: none;
      user-select: none;
      width: ${p => p.width || (p.theme && p.theme.width) || defaultTheme.width};
      height: ${p => p.height || (p.theme && p.theme.height) || defaultTheme.height};
      background-color: ${p =>
        p.backgroundColor || (p.theme && p.theme.backgroundColor) || defaultTheme.backgroundColor};
      border:none;
      border-radius:${p => p.backgroundRadius || (p.theme && p.theme.backgroundRadius) || defaultTheme.backgroundRadius}
      cursor:pointer;
      transition : background ease-out 0.3s;
      box-shadow: 0 0 0 ${p =>
        p.borderWidth || (p.theme && p.theme.borderWidth) || defaultTheme.borderWidth} inset ${p =>
  p.borderColor || (p.theme && p.theme.borderColor) || defaultTheme.borderColor};
      
      &:after {
        display:block;
        position:absolute;
        content: "";
        width: ${p => p.widthKnob || (p.theme && p.theme.widthKnob) || defaultTheme.widthKnob};
        height: ${p => p.heightKnob || (p.theme && p.theme.heightKnob) || defaultTheme.heightKnob};
        border-radius: ${p => p.radius || (p.theme && p.theme.radius) || defaultTheme.radius};
        background-color: ${p => p.color || (p.theme && p.theme.color) || defaultTheme.color};
        margin-left:calc(${p => p.borderWidth || (p.theme && p.theme.borderWidth) || defaultTheme.borderWidth} + 1px);
        transition : all ease-out 0.4s;
      }
    }
    
    // on state
    &:checked {
      & + label {
        background-color: ${p =>
          p.backgroundColorRight || (p.theme && p.theme.backgroundColorRight) || defaultTheme.backgroundColorRight};
              box-shadow: 0 0 0 ${p =>
                p.borderWidthRight ||
                (p.theme && p.theme.borderWidthRight) ||
                defaultTheme.borderWidthRight} inset ${p =>
  p.borderColorRight || (p.theme && p.theme.borderColorRight) || defaultTheme.borderColorRight};
        
        &:after {
          margin-left:calc(100% - ${p => p.widthKnob || (p.theme && p.theme.widthKnob) || defaultTheme.widthKnob} - ${p => p.borderWidthRight || (p.theme && p.theme.borderWidthRight) || defaultTheme.borderWidthRight} - 1px);
          transition : all ease-out 0.2s;
          background-color: ${p => p.colorRight || (p.theme && p.theme.colorRight) || defaultTheme.colorRight};
        }
      }
      
      &:disabled {
        & + label {
          background-color: ${p =>
            p.backgroundColorDisabled ||
            (p.theme && p.theme.backgroundColorDisabled) ||
            defaultTheme.backgroundColorDisabled};
          &:after {
            box-shadow: none;
          }
        }
      }
    }
    
    // disabled
    &:disabled {
      & + label {
        background-color: ${p =>
          p.backgroundColorDisabled ||
          (p.theme && p.theme.backgroundColorDisabled) ||
          defaultTheme.backgroundColorDisabled};
        cursor:default;
        &:after {
          box-shadow: none;
        }
      }
    }
  }
`;

const Toggle: FunctionComponent<Props> = props => {
  const inputRef = useRef(null);

  const {
    className,
    name,
    checked = false,
    disabled = false,
    value = "",
    onToggle = () => true,
    onRight = () => true,
    onLeft = () => true,
    ...others
  } = props;

  const cs = ["react-toggle", className || ""].join(" ");

  const onChangeHandler = (e: React.ChangeEvent) => {
    if (!!onToggle) {
      // const i: any = inputRef.current;
      // console.log("onToggle", i.checked);
      onToggle(e);

      const target = e.target as HTMLInputElement;

      if (target && target.checked) {
        onRight(e);
      } else {
        onLeft(e);
      }
    }
  };

  return (
    <ToggleBase className={cs} {...others}>
      <input
        ref={inputRef}
        onChange={onChangeHandler}
        type={"checkbox"}
        defaultChecked={checked}
        id={name}
        name={name}
        value={value}
        disabled={disabled}
      />
      <ToggleContainer htmlFor={name} />
    </ToggleBase>
  );
};

export default Toggle;
