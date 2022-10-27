import React from "../jsx-dom-shim";

const paperStyle = (width: number | string, height: number | string) => ({
  width: width,
  height: height,
  background: "#FFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

const scenarioTitleStyle = {
  animationName: "fadeInAnime",
  animationDuration: "3s",
  animationFillMode: "forwards",
  background: "black",
  width: "80vw",
  height: "140px",
  borderRadius: "12px",
  color: "#FFF",
  fontSize: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

type SceneStart = {
  titleText: string;
  width: number | string;
  height: number | string;
};

const SceneStart = ({ titleText, width, height }: SceneStart) => {
  return (
    <div style={paperStyle(width, height)}>
      <div style={scenarioTitleStyle}>{titleText}</div>
    </div>
  );
};

export default SceneStart;
