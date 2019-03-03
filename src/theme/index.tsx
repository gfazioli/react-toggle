/**
 * Default theme provider.
 *
 */
import React, {FunctionComponent} from 'react';
import {ThemeProvider} from "styled-components";
import theme from "./theme";


interface Props {
  children?: React.ReactChild;
}

const SULUThemeProvider: FunctionComponent<Props> = ({children}) => <ThemeProvider theme={theme}>
  {children}
</ThemeProvider>;

export default SULUThemeProvider;