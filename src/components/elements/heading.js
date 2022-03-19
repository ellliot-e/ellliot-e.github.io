import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// const HugeHeadline = styled.h1`
//   ${({ theme }) => theme.typography.h1};
// `;

// const LargeHeadline = styled.h2`
//   ${({ theme }) => theme.typography.h2};
// `;

// const MediumHeadline = styled.h3`
//   ${({ theme }) => theme.typography.h3};
// `;

// const SmallHeadline = styled.h4`
//   ${({ theme }) => theme.typography.h4};
// `;

// const ExtraSmallHeadline = styled.h5`
//   ${({ theme }) => theme.typography.h5};
// `;

const HugeHeadline = styled.h1`
`;

const LargeHeadline = styled.h2`
`;

const MediumHeadline = styled.h3`
`;

const SmallHeadline = styled.h4`
`;

const ExtraSmallHeadline = styled.h5`
`;

const Heading = ({
  children,
  id,
  size = "medium",
  // * Allow styled-components "as" prop
  ...props
}) => {
  const HeadlineComponent = (() => {
    switch (size) {
      case "huge":
        return HugeHeadline;
      case "large":
        return LargeHeadline;
      case "medium":
        return MediumHeadline;
      case "extraSmall":
        return ExtraSmallHeadline;
      default:
        return SmallHeadline;
    }
  })();

  return (
    <HeadlineComponent
      id={id}
      {...props}
    >
      {children}
    </HeadlineComponent>
  );
};

Heading.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  size: PropTypes.oneOf(["huge", "large", "medium", "small", "extraSmall"]),
};

export { Heading };
