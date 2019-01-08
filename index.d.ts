import * as React from "react";
interface ToggleProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id?: string | undefined;
  name?: string | undefined;
  label?: string | undefined;
  labelRight?: string | undefined;
  className?: string | undefined;
  checked: boolean;
  defaultChecked?: boolean | undefined;
  mode?: "toggle" | "switch" | "select";
  theme?: "round" | "square" | undefined;
  disabled?: boolean | undefined;
  onToggle?: (newState: boolean, event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
}
interface ToggleState {
  checked: boolean;
}
declare class Toggle extends React.Component<ToggleProps, ToggleState> {
  public displayName: string;
  private onToggle;
  constructor(propublic ps: ToggleProps);
  rendepublic r(): JSX.Element;
  componentWillReceiveProps(nextProps: ToggleProps): void;
}
export default Toggle;
