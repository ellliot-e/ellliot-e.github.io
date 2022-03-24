import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Header = styled.header`
  height: 50px;
  border-bottom: 3px solid black;
`;

const Footer = styled.footer`
  padding: 16px;
  border-top: 3px solid black;
  margin-top: auto;
`;

const Layout = ({ children }) => (
  <Wrapper>
    <Header>HEADER</Header>
      {children}
    <Footer>FOOTER</Footer>
  </Wrapper>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Layout };