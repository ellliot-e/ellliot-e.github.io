import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const Button = ({
  children,
  id,
  label,
  size = "medium",
  // * Allow styled-components "as" prop
  ...props
}) => {
  const text = children ? children : label;
  return (
    <button
      id={id}
      {...props}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOf(["huge", "large", "medium", "small", "extraSmall"]),
};

export { Button };
