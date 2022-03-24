import React from "react";
import styled from "styled-components";
import { Inline } from "@bedrock-layout/primitives";
import { MinusCircle, PlusCircle } from "react-feather";


const thumbHeight = 10;
const trackHeight = "3px";

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
    height: ${thumbHeight * 1.5}px;
    width: ${thumbHeight * 1.5}px;
    background: var(--background);
    outline: var(--stroke) solid var(--mono);
    border-radius: 100%;
    border: 0;
    top: 50%;
    transform: translateY(-50%);
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
    background:  var(--background);
    outline: var(--stroke) solid var(--mono);
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
    outline: var(--stroke) solid var(--mono);
    border-radius: 100%;
    border: 0;
    top: 0;
    margin: 0;
    box-shadow: none;
  }

  &:hover {
    &::-webkit-slider-thumb {
      outline: var(--hover-stroke) solid var(--mono);
    }
    &::-moz-range-thumb {
      outline: var(--hover-stroke) solid var(--mono);
    }
    &::-ms-thumb {
      outline: var(--hover-stroke) solid var(--mono);
    }
  }
`;

const Control = styled.div`
  cursor: pointer;
  height: ${2 * thumbHeight}px;
  line-height: ${2 * thumbHeight}px;
  > svg {
    stroke: var(--mono);
    fill: var(--background);
    stroke-width: var(--stroke);
    overflow: visible;
  }
  &:hover {
    > svg > circle {
      stroke-width: var(--hover-stroke);
    }
  }

`;


export const Range = props => {
  const { value, min, max, step, onChange } = props;
  return (
    <Inline justify="center" align="center" gutter="lg">
      <Control onClick={() => onChange(value - step)}>
        <MinusCircle size={2 * thumbHeight} />
      </Control>
      <StyledRange
        type="range"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(+e.currentTarget.value)}
      />
      <Control onClick={() => onChange(value + step)}>
        <PlusCircle size={2 * thumbHeight} />
      </Control>
    </Inline>

  );
};
