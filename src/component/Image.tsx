import React from "../jsx-dom-shim";

type ImageProps = {
  width: number;
  height: number;
  src: string;
};

const imageStyle = (width: number, height: number) => ({
  width: width,
  height: height,
});

const Image = ({ width, height, src }: ImageProps) => {
  return (
    <div style={imageStyle(width, height)}>
      <img src={src} width={width} height={height} />
    </div>
  );
};

export default Image;
