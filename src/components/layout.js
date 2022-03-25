import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100%;
`;

const Header = styled.header`
  height: 50px;
  border-bottom: 3px solid black;
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