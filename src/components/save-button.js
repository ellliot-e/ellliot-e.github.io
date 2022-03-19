import React from "react";
import PropTypes from "prop-types";
import { saveAs } from "file-saver";
import { Button } from "grommet";

const SaveButton = React.forwardRef((props, ref) => {
  const handleDownload = () => {
    const element = ref.current.cloneNode(true);
    const style = getComputedStyle(document.documentElement);
    const viewBoxStr = element.getAttribute("viewBox");
    if (viewBoxStr) {
      const viewBox = viewBoxStr.split(" ");
      element.setAttribute("width", viewBox[2]);
      element.setAttribute("height", viewBox[3]);
    }
    element.setAttribute(
      "style",
      `background: ${style.getPropertyValue("--background")};`
    );
    const serializer = new XMLSerializer();
    const str = serializer.serializeToString(element);
    const svgBlob = new Blob([str], {type: "image/svg+xml"});
    saveAs(svgBlob, `${props.fileName || "test"}.svg`);
  }

  return (
      <Button size="medium" onClick={handleDownload} label="Download!" margin={{ top: "large" }}/>
  );
});

SaveButton.displayName = "SaveButton";
SaveButton.propTypes = {
  fileName: PropTypes.string
}


export default SaveButton;
