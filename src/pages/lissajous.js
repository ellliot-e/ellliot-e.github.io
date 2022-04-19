import React, { useEffect, useRef, useReducer } from "react";
import styled from "styled-components";
import { Button, Heading, Range } from "../components/elements";
import { Lissajous, lissajousVariables } from "../components/art/lissajous";
import { random, filter } from "lodash";
import SaveButton from "../components/save-button";
import { InlineMath } from "react-katex";
import { QUERIES } from "../constants";

const CustomRange = props => {
  const { title, value, ...rest } = props;
  return (
    <>
      <Heading size="extraSmall">
        <span>{title}{` = ${value.toFixed(2)}`}</span>
      </Heading>
      <Range value={value} {...rest} />
    </>
  );
};


const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(275px, 1fr) 4fr;
  grid-template-areas:
    "sidebar main";
  height: calc(100vh - var(--header-height));
`;

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  padding: 1rem;
  border-right: var(--stroke) solid var(--mono);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: auto;
`;

const MainWrapper = styled.div`
  grid-area: main;
  overflow: auto;
  text-align: center;
`;

const SvgWrapper = styled.div`
  --svg-width: 700px;
  width: 100%;
  > svg {
    width: clamp(60%, var(--svg-width), 80%);
    border: var(--stroke) solid var(--mono);
  }

  @media ${QUERIES.desktopAndUp} {
    --svg-width: 900px;
  }
`;

const ButtonWrapper = styled.div`
  padding: 2rem;
`;

const reducer = (state, action) => {
  switch (action.type) {
    case "set":
      return { ...state, [action.target]: action.value };
    case "togglePlaying":
      return { ...state, playing: !state.playing };
    case "randomize":
      const randomValues = filter(lissajousVariables, "animate");
      return randomValues.reduce((memo, val) => {
        memo[val.name] = random(val.min, val.max, true);
        return memo;
      }, {...state});
    case "tick":
      const animatingValues = filter(lissajousVariables, "animate");
      return animatingValues.reduce((memo, val) => {
        let sign = state.signs[val.name] || 1;
        if (state[val.name] + sign * val.step > val.max || state[val.name] + sign * val.step < val.min) {
          sign = sign * -1;
        }
        memo[val.name] = state[val.name] + sign * val.step;
        memo.signs[val.name] = sign;
        return memo;
      }, {...state});
    default:
      throw new Error();
  }
};

const initialState = lissajousVariables.reduce(
  (memo, val) => {
    memo[val.name] = val.initial;
    return memo;
  }, {
  playing: false,
  signs: {}
});


const LissajousPage = () => {
  const svgRef = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.playing) {
        dispatch({ type: "tick" });
      }
    }, 32);
    return () => clearInterval(interval);
  }, [state]);


  return (
    <GridWrapper>
      <SidebarWrapper>
          <Heading size="medium">Math</Heading>
          <div>
            <Heading size="extraSmall">
              <InlineMath>
                x=sin(\omega_xt +\delta_x)
              </InlineMath>
            </Heading>
            <Heading size="extraSmall">
              <InlineMath>
                y=sin(\omega_yt)
              </InlineMath>
            </Heading>
          </div>
          {lissajousVariables.map(v => (
            <CustomRange
              key={v.name}
              title={v.title}
              value={state[v.name]}
              min={v.min}
              max={v.max}
              step={v.step}
              onChange={(value) => dispatch({ type: "set", target: v.name, value })}
            />
          ))}
      </SidebarWrapper>
      <MainWrapper>
        <ButtonWrapper>
          <Button label="Randomize!" size="medium" onClick={() => dispatch({ type: "randomize" })}/>
          <Button label={state.playing ? "Pause!" : "Play!"} size="medium" onClick={() => dispatch({ type: "togglePlaying" })}/>
          <SaveButton ref={svgRef} fileName={`lissajous-${Date.now()}`}/>
        </ButtonWrapper>
        <SvgWrapper>
          <Lissajous
            ref={svgRef}
           {...state}
            optimizePath={!state.playing}
          />
        </SvgWrapper>
      </MainWrapper>
    </GridWrapper>
  );
};

export default LissajousPage;
