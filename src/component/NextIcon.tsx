import React from "../jsx-dom-shim";

const imgStyle = {
  width: 40,
  height: 40,
  position: "absolute",
  right: 20,
  bottom: 20,
  "-webkit-animation": "blink 0.4s ease-in-out infinite alternate",
  "-moz-animation": "blink 0.4s ease-in-out infinite alternate",
  animation: "blink 0.4s ease-in-out infinite alternate",
} as const;

const NextIcon = () => {
  return (
    <img
      src="src/assets/img/partScenario/scenario_next_icon.png"
      style={imgStyle}
    />
  );
};

export default NextIcon;
