import React, { useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import styled from "styled-components";
import { Link } from "gatsby"
import { Button, Heading } from "./elements";
import { random } from "lodash";

const HeaderWrapper = styled.header`
  background: var(--background);
  color: var(--mono);
  border-bottom: var(--stroke) solid var(--mono);
  width: 100%;
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-left: 1rem;
`;

// const colors = ["orange", "tomato", "gold", "deepSkyBlue", "YellowGreen", "hotPink", "lightSeaGreen", "orchid", "salmon", "yellow"];

const BackgroundButton = () => {
  const { mono, background, setBackground, setMono } = useContext(ThemeContext);

  const changeColors = () => {
    const randomColor = `hsl(${random(0, 360)}deg 75% 60%)`;
    let newBackground;
    let newColor;
    if (background === "#FFFFFF") {
        newBackground = mono === "#000000" ? randomColor : mono;
        newColor = mono === "#000000" ? "#000000" : "#FFFFFF";
    } else if (background === "#000000") {
      newBackground = "#FFFFFF";
      newColor = mono === "#FFFFFF" ? "#000000" : mono;
    } else {
      newBackground = "#000000";
      newColor = mono === "#FFFFFF" ? "#FFFFFF" : background;
    }
    document.documentElement.style.setProperty("--background", newBackground);
    document.documentElement.style.setProperty("--mono", newColor);
    setBackground(newBackground);
    setMono(newColor);
  }

  return (
     <Button label="!!!" onClick={changeColors}/>
  )
}


const Header = () => {
  return (
      <HeaderWrapper>
        <Heading>
          <Link to="/">e///iot</Link>
        </Heading>
        <BackgroundButton />
      </HeaderWrapper>
  );
};

export { Header };
