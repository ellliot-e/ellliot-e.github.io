import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Heading } from "./heading";

const CustomButton = styled.button`
  background: var(--background);
  color: var(--mono);
  border: var(--stroke) solid var(--mono);
  padding: 0.25em 1em;
  margin: 10px;
  min-width: 120px;
  &:hover {
    outline: var(--add-stroke) solid var(--mono);
  }
`;



const Button = ({
  children,
  id,
  label,
  size = "medium",
  // * Allow styled-components "as" prop
  ...props
}) => {
  const text = children ? children : <Heading size="extraSmall">{label}</Heading>;
  return (
      <CustomButton
        id={id}
        {...props}
      >
        {text}
      </CustomButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOf(["huge", "large", "medium", "small", "extraSmall"]),
};

export { Button };
