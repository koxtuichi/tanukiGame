import React from "../jsx-dom-shim";
import { CSSProperties } from "jsx-dom";

const postPaperStyle: CSSProperties = {
  position: "absolute",
  width: "1280px",
  height: "720px",
  background: "rgba(255,255,255, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const PostCommentFilter = () => {
  return <div style={postPaperStyle}></div>;
};

export default PostCommentFilter;
