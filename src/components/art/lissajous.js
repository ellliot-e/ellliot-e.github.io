import React, { useContext } from "react";
import { ThemeContext } from "../../context/theme-context";
import * as d3Shape from "d3-shape";
import { range, sortBy } from "lodash";
import { getScale, getRange, linearizePath } from "../../utils/helpers";

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
const Lissajous = React.forwardRef((props, ref) => {
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

export default Lissajous;
