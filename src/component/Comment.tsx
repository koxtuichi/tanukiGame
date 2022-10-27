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
  color: "#FFF",
  WebkitTextStrokeWidth: "2px",
  WebkitTextStrokeColor: "#a9a9a9",
};

const commentPositionStyle = (x: number, isPostComment: boolean) =>
  ({
    transform: `translateY(-100px) translateX(${x}px)`,
    border: isPostComment ? "1px solid yellow" : "",
  } as const);

type CommentProps = {
  comments?: string[];
  isPostComment?: boolean;
};

const Comment = ({ comments, isPostComment = false }: CommentProps) => {
  return (
    <div>
      <div style={commentBox}>
        {comments &&
          comments.map((c, i) => {
            return (
              <div
                style={commentPositionStyle(
                  Math.random() * 10 * 10,
                  isPostComment
                )}
              >
                <div style={commentStyle}>{c}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comment;
