import React from "react";
import ThemeContextProvider  from "./src/context/theme-context";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./src/styles/global-style";
import { theme } from "./src/styles/theme";
import { Layout } from "./src/components/layout";
import "@fontsource/roboto-mono";
import "katex/dist/katex.min.css";

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

export const wrapPageElement = ({ element }) => {
  return (
    <Layout>
      {element}
    </Layout>
  );
};
