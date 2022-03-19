import React from "react";
import ThemeContextProvider  from "./src/context/theme-context";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./src/styles/global-style";
import { theme } from "./src/styles/theme";

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {element}
      </ThemeProvider>
    </ThemeContextProvider>
  )
};
