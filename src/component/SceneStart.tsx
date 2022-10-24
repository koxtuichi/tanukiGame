import React from "../jsx-dom-shim";

const paperStyle = {
  width: "1280px",
  height: "720px",
  background: "#FFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

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
};

const SceneStart = ({ titleText }: SceneStart) => {
  return (
    <div style={paperStyle}>
      <div style={scenarioTitleStyle}>{titleText}</div>
    </div>
  );
};

export default SceneStart;
