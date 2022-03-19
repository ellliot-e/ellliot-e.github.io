import * as React from "react";
import PropTypes from "prop-types";
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  html {
    --mono: #000000;
    --background: #FFFFFF;
  }
  body {
    margin: 0;
  }
`

const Layout = ({ children }) => (
  <React.Fragment>
    <GlobalStyle />
    {children}
  </React.Fragment>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;