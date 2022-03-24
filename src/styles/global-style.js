import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  *, *:before, *:after {
    box-sizing: border-box;
  }

  :root {
    --mono: #000000;
    --background: #FFFFFF;
    --primaryFont: 'Roboto Mono';
    --stroke: 3px;
    --add-stroke: 1px;
    --hover-stroke: calc(var(--stroke) + var(--add-stroke));
  }

  html {
    height: 100%;
  }

  body {
    background-color: var(--background);
    height: 100%;
  }
`