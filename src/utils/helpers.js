import SVGPathCommander from "svg-path-commander";
import { pointsOnBezierCurves } from 'points-on-curve';
import { scaleLinear as scale } from "d3-scale";

const getRange = (xDim, yDim, xPadding, yPadding) => {
  const x = [xPadding[0], xDim - xPadding[1]];
  const y = [yPadding[0], yDim - yPadding[1]];
  return { x, y };
};

const getScale = (domain, range) => {
  const x = scale()
    .range([range.x[0], range.x[1]])
    .domain([domain.x[0], domain.x[1]]);
  const y = scale()
    .range([range.y[0], range.y[1]])
    .domain([domain.y[0], domain.y[1]]);
  return { x, y };
};

const defaultOptions = { tolerance: 0.15, distance: 0.3, precision: 2 };

const getPointsFromBezierSegment = (segment, options = defaultOptions) => {

  // find relevant points to represent a bezier curve segment
  // https://github.com/pshihn/bezier-points
  return pointsOnBezierCurves(segment, options.tolerance, options.distance);
};

const getPointsFromPath = (d, options = defaultOptions) => {
  // convert all path commands into equivalent absolute bezier curves
  // https://github.com/thednp/svg-path-commander
  const path = new SVGPathCommander(d).toAbsolute().toCurve();
  const segments = path.segments;
  const { precision } = options || 4;
  return segments.reduce((pts, segment, i) => {
    if (segment[0] === "M") {
      pts.push([segment[1].toFixed(precision), segment[2].toFixed(precision)]);
      return pts;
    } else if (segment[0] === "C") {
      const start = segments[i - 1].slice(-2);
      const c1 = segment.slice(1, 3);
      const c2 = segment.slice(3, 5);
      const end = segment.slice(5);
      const points = getPointsFromBezierSegment([start, c1, c2, end], options);
      pts.push(...points.map(p => [p[0].toFixed(precision), p[1].toFixed(precision)]));
      return pts;
    }
    return pts;
  }, []);
};

const linearizePath = (d, options = defaultOptions) => {
  const points = getPointsFromPath(d, options);
  return "M " + points.join(" L ") + "Z"
};

export { getRange, getScale, linearizePath, getPointsFromPath };
