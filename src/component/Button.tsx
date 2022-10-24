import React from "../jsx-dom-shim";

type ButtonProps = {
  name: string;
  width: number;
  height: number;
};

const Button = ({ name, width, height }: ButtonProps) => (
  <button
    style={{
      width: width,
      height: height,
      backgroundColor: "#3cb371",
      color: "#fff",
      border: "4px solid #FFF",
      cursor: "pointer",
      borderRadius: "12px",
      fontSize: "20px",
    }}
  >
    {name}
  </button>
);

export default Button;
