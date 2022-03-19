import React from "react";
import styled from "styled-components";

const thumbHeight = 20;
const trackHeight = "4px";

const StyledRange = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: ${trackHeight};
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: 700px;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: ${trackHeight};
    background: var(--mono);
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    height: ${thumbHeight}px;
    width: ${thumbHeight}px;
    background: var(--background);
    outline: 4px solid var(--mono);
    border-radius: 100%;
    border: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: background-color 150ms;
    transition: outline 0.1s linear;

  }

  &::-moz-range-track {
    width: 100%;
    height: ${trackHeight};
    background:  var(--mono);
  }

  &::-moz-range-thumb {
    -moz-appearance: none;
    appearance: none;
    margin: 0;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background:  var(--mono);
    border-radius: 100%;
    border: 0;
  }

  &::-ms-track {
    width: 100%;
    height: ${trackHeight};
    border: 0;
    /* color needed to hide track marks */
    color: transparent;
    background: transparent;
  }
}

  &::-ms-thumb {
    -ms-appearance: none;
    appearance: none;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background:  var(--mono);
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
    top: 0;
    margin: 0;
    box-shadow: none;
  }

  &:hover {
    &::-webkit-slider-thumb {
      outline: 6px solid var(--mono);
    }
    &::-moz-range-thumb {
      outline: 6px solid var(--mono);
    }
    &::-ms-thumb {
      outline: 6px solid var(--mono);
    }
  }
`;


export const Range = props => {
  const { value, min, max, step, onChange } = props;
  return (
    <StyledRange
      type="range"
      step={step}
      min={min}
      max={max}
      value={value}
      onChange={e => onChange(+e.currentTarget.value)}
    />
  );
};
