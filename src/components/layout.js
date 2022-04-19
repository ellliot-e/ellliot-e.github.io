import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Header } from "./header";

const Wrapper = styled.div`
  min-height: 100%;
`;

const Layout = ({ children }) => (
  <Wrapper>
    <Header>HEADER</Header>
      {children}
  </Wrapper>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Layout };