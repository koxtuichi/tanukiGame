import { CSSProperties } from "jsx-dom";
import React from "../jsx-dom-shim";

const commentsBox: CSSProperties = {
  display: "flex",
  flexFlow: "column wrap",
  width: "auto",
  height: "320px",
};

const commentsStyle: CSSProperties = {
  fontSize: "40px",
  fontWeight: 700,
  color: "#FFF",
  WebkitTextStrokeWidth: "2px",
  WebkitTextStrokeColor: "#a9a9a9",
};

const commentsPositionStyle = (x: number, isPostComment: boolean) =>
  ({
    transform: `translateY(-100px) translateX(${x}px)`,
    border: isPostComment ? "1px solid yellow" : "",
  } as const);

type CommentProps = {
  comments?: string[];
  isPostComment?: boolean;
};

const Comments = ({ comments, isPostComment = false }: CommentProps) => {
  return (
    <div>
      <div style={commentsBox}>
        {comments &&
          comments.map((c, i) => {
            return (
              <div
                style={commentsPositionStyle(
                  Math.random() * 10 * 10,
                  isPostComment
                )}
              >
                <div style={commentsStyle}>{c}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comments;
