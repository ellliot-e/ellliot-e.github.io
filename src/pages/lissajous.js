import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import { Heading, Button } from "grommet";
import { Range } from "../components/slider";
import { PadBox, Split, Stack } from "@bedrock-layout/primitives";
import { random } from "lodash";
import SaveButton from "../components/save-button";
import { ThemeContext } from "../context/theme-context";
import * as d3Shape from "d3-shape";
import { range, sortBy } from "lodash";
import { getScale, getRange, linearizePath } from "../utils/helpers";

const getLissajousData = (options = {}) => {
  const { A = 2, B = 3, D = Math.PI, samples = 2 * Math.PI, step = 0.1} = options;
  const data = range(0, samples, step).map((t) => ({
    t,
    x: Math.sin(A * t + D),
    y: Math.sin(B * t)
  }));
  return sortBy(data, "t");
};

// lissajous lines svg
const Lines = React.forwardRef((props, ref) => {
  const {
    xDim = 1200,
    yDim = 900,
    A,
    B,
    D,
    samples = 50,
    xOffset = 4,
    yOffset = 3,
    basePadding = 40
  } = props;

  const domain = {x: [-1, 1], y: [-1, 1]};
  const xPadding = [basePadding, samples * xOffset + basePadding];
  const yPadding = [basePadding, samples * yOffset + basePadding];
  const svgRange = getRange(xDim, yDim, xPadding, yPadding);
  const theme = useContext(ThemeContext);
  const data = getLissajousData({ A, B, D });
  const scale = getScale(domain, svgRange);

  const pathFunction = d3Shape
    .line()
    .curve(d3Shape.curveBasisClosed)
    .x((d) => scale.x(d.x))
    .y((d) => scale.y(d.y));

  const d = linearizePath(pathFunction(data));

  return (
    <div style={{ maxHeight: "100vh"}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        viewBox={`0 0 ${xDim} ${yDim}`}
        style={{ background: theme.background, maxHeight: "100vh" }}
      >
        {range(0, samples, 1).map((i) => {
          return (
            <path
              key={i}
              d={d}
              transform={`translate(${(i - 1) * xOffset} ${(i - 1) * yOffset })`}
              style={{ stroke: theme.mono, fill: "none" }}
            />
            );
        })}
      </svg>
    </div>
  );
});


const CustomRange = props => {
  const { title, ...rest } = props;
  return (
    <div>
    <Heading level="5" size="small" alignSelf="center" margin={{bottom: "none"}}>
      {title}
    </Heading>
    <Range {...rest} />
    </div>

  );
}

const BackgroundButton = () => {
  const {setBackground} = React.useContext(ThemeContext);

  const changeColor = () => {
    const colors = ["orange", "tomato", "gold", "deepSkyBlue", "YellowGreen", "hotPink", "lightSeaGreen", "orchid", "salmon", "yellow"];
    const newColor = colors[random(colors.length - 1)];
    document.documentElement.style.setProperty(
      '--background',
      newColor
    );
    setBackground(newColor);
  }

  return (
     <Button label="Background!" size="medium" onClick={changeColor}/>
  )
}

const MonoButton = () => {
  const {setMono} = React.useContext(ThemeContext);

  const changeColor = () => {
    const colors = ["cyan", "grey", "pink", "black"];
    const newColor = colors[random(colors.length - 1)];
    document.documentElement.style.setProperty(
      '--mono',
      newColor
    );
    setMono(newColor);
  }

  return (
     <Button label="Color!" size="medium" onClick={changeColor}/>
  )
}

const SidebarBox = styled(PadBox)`
  border-right: 4px solid var(--mono);
  height: 100vh;
  min-width: 20rem;
`;

const Lissajous= () => {

  const svgRef = useRef();

  const [A, setA] = useState(2);
  const [B, setB] = useState(5);
  const [D, setD] = useState(Math.PI);
  const [samples, setSamples] = useState(50);
  const [xOffset, setXOffset] = useState(4);
  const [yOffset, setYOffset] = useState(3);
  const [playing, setPlaying] = useState(false);
  const [count, setCount] = useState(0);


  const togglePlaying = () => {
    setPlaying(!playing);
  }

  const update = () => {
    console.log("UPDATE", playing)

  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        setA(() => A + 0.01)
        setCount(() => count + 1);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [playing, count, A]);

  const randomize = () => {
    setA(random(1, 10, true));
    setB(random(1, 10, true));
    setD(random(0, Math.PI * 2, true));
  }

  return (
    <main style={{ height: "100vh" }}>
      <Split
        gutter="none" fraction="auto-start"
      >
        <SidebarBox padding="xl">
          <Heading level="3" size="medium">Controls</Heading>
          <Stack gutter="lg">
            <Button label="Randomize!" size="medium" onClick={randomize}/>
            <BackgroundButton />
            <Button label={playing ? "Pause!" : "Play!"} size="medium" onClick={togglePlaying}/>
            {/* <MonoButton /> */}
          </Stack>

          <CustomRange
            title="A Value"
            value={A}
            min={1}
            max={10}
            step={0.01}
            onChange={setA}
          />
          <CustomRange
            title="B Value"
            value={B}
            min={1}
            max={10}
            step={0.01}
            onChange={setB}
          />
          <CustomRange
            title="D value"
            value={D}
            min={0}
            max={Math.PI * 2}
            step={0.01}
            onChange={setD}
          />
          <CustomRange
            title="samples"
            value={samples}
            min={1}
            max={100}
            step={1}
            onChange={setSamples}
          />
          <CustomRange
            title="x offset"
            value={xOffset}
            min={0}
            max={15}
            step={0.1}
            onChange={setXOffset}
          />
          <CustomRange
            title="y offset"
            value={yOffset}
            min={0}
            max={15}
            step={0.1}
            onChange={setYOffset}
          />
          <Stack style={{ marginTop: "20px" }}>
            <SaveButton ref={svgRef} fileName={`lissajous-${Date.now()}`}/>
          </Stack>
        </SidebarBox>
        <PadBox padding="xl" style={{ height: "100vh", overflow: "scroll"}}>
          <Lines ref={svgRef} A={A} B={B} D={D} samples={samples} xOffset={xOffset} yOffset={yOffset} />
        </PadBox>
      </Split>
    </main>
  );
};

export default Lissajous;
