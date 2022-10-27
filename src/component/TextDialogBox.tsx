import React from "../jsx-dom-shim";
import { CSSProperties } from "jsx-dom";

const nameStyle: CSSProperties = {
  width: "fit-content",
  height: "20px",
  margin: "0 0 10px 0",
  display: "flex",
  alignItems: "center",
  padding: "16px",
  fontSize: "20px",
  background: "black",
  color: "white",
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
    </div>
  );
};

export default TextDialogBox;
