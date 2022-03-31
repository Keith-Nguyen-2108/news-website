import React from "react";
import CommentForm from "./CommentForm";
import { linkAvt } from "../axios";

const Comment = ({
  comment,
  activeComment,
  setActiveComment,
  addNewComment,
  replies,
  calculateDate,
  parentID = null,
}) => {
  const isReply =
    activeComment !== null &&
    activeComment.id === comment._id &&
    activeComment.type === "reply";
  const replyId = parentID ? parentID : comment._id;

  return (
    <div key={comment._id} className="highest-level">
      <div className="enter-comment">
        <img
          src={linkAvt + comment?.authorID.avatar}
          alt=""
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            marginRight: "20px",
            borderRadius: "50%",
          }}
        />
        <div className="detail-comment">
          <div className="d-flex">
            <p>{comment?.authorID.username}</p>
            <span
              style={{
                marginLeft: "20px",
                color: "rgb(206, 206, 206)",
              }}
            >
              {calculateDate(new Date(comment.createdAt))}
            </span>
          </div>
          <div className="content-comment">
            <p>
              {comment.content}
              <i
                className="fas fa-reply reply-icon"
                onClick={() =>
                  setActiveComment({ id: comment._id, type: "reply" })
                }
              >
                <span className="tooltiptext">Reply</span>
              </i>
            </p>
          </div>
          {isReply && (
            <CommentForm
              isReply={isReply}
              setActiveComment={setActiveComment}
              handleSubmit={(text) => addNewComment(text, replyId)}
            />
          )}
          {replies &&
            replies.map((reply) => (
              <Comment
                key={reply._id}
                comment={reply}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addNewComment={addNewComment}
                replies={[]}
                calculateDate={calculateDate}
                parentID={comment._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default Comment;
