import { CSSProperties } from "jsx-dom";
import React from "../jsx-dom-shim";

const commentBox: CSSProperties = {
  display: "flex",
  flexFlow: "column wrap",
  width: "fit-content",
  height: "320px",
  margin: "10px 10px 10px 10px",
};

const commentStyle: CSSProperties = {
  fontSize: "40px",
  fontWeight: 700,
  WebkitTextStrokeWidth: "1px",
  WebkitTextStrokeColor: "#FFF",
};

const commentPositionStyle = (x: number) => ({
  transform: `translateY(-100px) translateX(${x}px)`,
});

type CommentProps = {
  comments?: string[];
};

const Comment = ({ comments }: CommentProps) => {
  return (
    <div>
      <div style={commentBox}>
        {comments &&
          comments.map((c, i) => {
            return (
              <div style={commentPositionStyle(Math.random() * 10 * 10)}>
                <div style={commentStyle}>{c}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comment;
