import React from "../jsx-dom-shim";
import { CSSProperties } from "jsx-dom";

type ImageProps = {
  width: number;
  height: number;
  src: string;
  dropShadow?: string;
  className?: string;
};

const imageStyle = (width: number, height: number): CSSProperties => ({
  width: width,
  height: height,
});

const dropShadowStyle = (dropShadow: string): CSSProperties => ({
  filter: dropShadow || "drop-shadow(0px 0px 10px #4444dd)",
});

const Image = ({ width, height, src, dropShadow, className }: ImageProps) => {
  return (
    <div style={imageStyle(width, height)} className={className}>
      <img
        src={src}
        width={width}
        height={height}
        style={dropShadowStyle(dropShadow)}
      />
    </div>
  );
};

export default Image;
