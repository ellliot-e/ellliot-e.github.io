import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  *, *:before, *:after {
    box-sizing: border-box;
  }
  html {
    --mono: #000000;
    --background: #FFFFFF;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  body {
    background-color: var(--background);
  }
`