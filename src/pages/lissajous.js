import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Button, Heading, Range } from "../components/elements";
import Lissajous from "../components/art/lissajous";
import { random } from "lodash";
import SaveButton from "../components/save-button";
import { ThemeContext } from "../context/theme-context";
import { InlineMath } from "react-katex";
import { Shuffle, Play, Pause, Download } from "react-feather";


const CustomRange = props => {
  const { title, value, ...rest } = props;
  return (
    <>
      <Heading size="extraSmall" alignSelf="center" margin={{bottom: "none"}}>
        <span>{title}{` = ${value.toFixed(2)}`}</span>
      </Heading>
      <Range value={value} {...rest} />
    </>
  );
};

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
     <Button label="Background!" onClick={changeColor}/>
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
     <Button label="Color!" onClick={changeColor}/>
  )
}

const PageWrapper = styled.div`
  // set height to account for header
  height: calc(100vh - 50px);
`;

const DashboardWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(275px, 1fr) 4fr;
  height: 100%;
  grid-template-areas:
    "sidebar content";
`;

const SidebarBox = styled.div`
  grid-area: sidebar;
  padding: 1rem;
  border-right: var(--stroke) solid var(--mono);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: auto;
`;

const ContentBox = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 2rem;
  > svg {
    border: var(--stroke) solid var(--mono);
  }
`;

const ControlBox = styled.div`
  margin-top: 2rem;
`;


const LissajousPage = () => {

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
  };

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
  };

  return (
    <PageWrapper>
    <DashboardWrapper>
      <SidebarBox>
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
          <CustomRange
            title={<InlineMath>\omega_x</InlineMath>}
            value={A}
            min={1}
            max={10}
            step={0.01}
            onChange={setA}
          />
          <CustomRange
            title={<InlineMath>\omega_y</InlineMath>}
            value={B}
            min={1}
            max={10}
            step={0.01}
            onChange={setB}
          />
          <CustomRange
            title={<InlineMath>\delta_x</InlineMath>}
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
      </SidebarBox>
      <ContentBox>
          <Lissajous
            ref={svgRef}
            A={A}
            B={B}
            D={D}
            samples={samples}
            xOffset={xOffset}
            yOffset={yOffset}
          />
        <ControlBox>
          <Button label="Randomize!" size="medium" onClick={randomize}/>
          <BackgroundButton />
          <Button label={playing ? "Pause!" : "Play!"} size="medium" onClick={togglePlaying}/>
          <MonoButton />
          <SaveButton ref={svgRef} fileName={`lissajous-${Date.now()}`}/>
        </ControlBox>
      </ContentBox>
    </DashboardWrapper>
    </PageWrapper>
  );
};

export default LissajousPage;
