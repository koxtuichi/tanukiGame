import React from "../jsx-dom-shim";

type ButtonProps = {
  name: string;
  width: number | string;
  height: number | string;
  color?: string;
  background?: string;
  border?: string;
  padding?: string;
  fontSize?: string;
};

const buttonStyle = (
  width: number | string,
  height: number | string,
  color: string = "#fff",
  background: string = "#3cb371",
  border: string = "4px solid white",
  padding: string = "",
  fontSize: string = "20px"
) =>
  ({
    width: width,
    height: height,
    background: background,
    color: color,
    border: border,
    cursor: "pointer",
    borderRadius: "12px",
    fontSize: fontSize,
    padding: padding,
  } as const);

const Button = ({
  name,
  width,
  height,
  color,
  background,
  border,
  padding,
  fontSize,
}: ButtonProps) => (
  <button
    style={buttonStyle(
      width,
      height,
      color,
      background,
      border,
      padding,
      fontSize
    )}
  >
    {name}
  </button>
);

export default Button;
