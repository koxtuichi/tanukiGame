import React from "../jsx-dom-shim";

const nameStyle = {
  height: "20px",
  padding: "16px",
  fontSize: "20px",
};

const textStyle = (size: number) => ({
  width: "1120px",
  height: "120px", //30px(文字)を3行 + 余白(40px)
  background: "black",
  padding: "45px",
  color: "#FFF",
  fontSize: size + "px",
  borderRadius: "12px",
});

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

type TextDialogBoxProps = {
  text?: string;
  name?: string;
  size: number;
};

const TextDialogBox = ({ text, name, size = 30 }: TextDialogBoxProps) => {
  return (
    <div>
      <div style={nameStyle}>{name}</div>
      <div style={textStyle(size)}>{text}</div>
      <img
        src="src/assets/img/partScenario/scenario_next_icon.png"
        style={imgStyle}
      />
    </div>
  );
};

export default TextDialogBox;
