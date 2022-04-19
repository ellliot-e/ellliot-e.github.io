import React, { useContext } from "react";
import { ThemeContext } from "../../context/theme-context";
import * as d3Shape from "d3-shape";
import { range, sortBy } from "lodash";
import { InlineMath } from "react-katex";
import { getScale, getRange, linearizePath } from "../../utils/helpers";


const getLissajousData = (options = {}) => {
  const { A = 2, B = 3, C = Math.PI, samples = 2 * Math.PI, step = 0.1} = options;
  const data = range(0, samples, step).map((t) => ({
    t,
    x: Math.sin(A * t + C),
    y: Math.sin(B * t)
  }));
  return sortBy(data, "t");
};

// lissajous lines svg
const Lissajous = React.forwardRef((props, ref) => {
  const {
    xDim = 1152,
    yDim = 864,
    A,
    B,
    C,
    samples = 50,
    xOffset = 4,
    yOffset = 3,
    basePadding = 40,
    optimizePath
  } = props;

  const domain = {x: [-1, 1], y: [-1, 1]};
  const xPadding = [basePadding, samples * xOffset + basePadding];
  const yPadding = [basePadding, samples * yOffset + basePadding];
  const svgRange = getRange(xDim, yDim, xPadding, yPadding);
  const theme = useContext(ThemeContext);
  const data = getLissajousData({ A, B, C });
  const scale = getScale(domain, svgRange);

  const pathFunction = d3Shape
    .line()
    .curve(d3Shape.curveBasisClosed)
    .x((d) => scale.x(d.x))
    .y((d) => scale.y(d.y));

  const d = optimizePath ? linearizePath(pathFunction(data)) : pathFunction(data);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      viewBox={`0 0 ${xDim} ${yDim}`}
      style={{ background: theme.background }}
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
  );
});

const lissajousVariables = [
  {
    name: "A",
    title: <InlineMath>\omega_x</InlineMath>,
    initial: 2,
    min: 1,
    max: 10,
    step: 0.01,
    animate: true
  },
  {
    name: "B",
    title: <InlineMath>\omega_y</InlineMath>,
    initial: 5,
    min: 1,
    max: 10,
    step: 0.01,
    animate: true
  },
  {
    name: "C",
    title: <InlineMath>\delta_x</InlineMath>,
    initial: Math.PI,
    min: 0,
    max: Math.PI * 2,
    step: 0.01,
    animate: true
  },
  {
    name: "samples",
    title: "samples",
    initial: 50,
    min: 1,
    max: 100,
    step: 1
  },
  {
    name: "xOffset",
    title: "x offset",
    initial: 4,
    min: 0,
    max: 15,
    step: 0.1
  },
  {
    name: "yOffset",
    title: "y offset",
    initial: 3,
    min: 0,
    max: 15,
    step: 0.1
  }
];

export { Lissajous, lissajousVariables };
