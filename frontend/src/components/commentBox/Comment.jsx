import React from "react";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  activeComment,
  setActiveComment,
  addNewComment,
  replies,
  calculateDate,
  parentId = null,
}) => {
  const isReply =
    activeComment !== null &&
    activeComment.id === comment.id &&
    activeComment.type === "reply";
  const replyId = parentId ? parentId : comment.id;

  return (
    <div key={comment.id} className="highest-level">
      <div className="enter-comment">
        <img
          src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
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
            <p>Nguyen Minh Nha</p>
            <span
              style={{
                marginLeft: "20px",
                color: "rgb(206, 206, 206)",
              }}
            >
              {calculateDate(new Date(comment.createAt))}
            </span>
          </div>
          <div className="content-comment">
            <p>
              {comment.content}
              <i
                className="fas fa-reply reply-icon"
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "reply" })
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
                key={reply.id}
                comment={reply}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addNewComment={addNewComment}
                replies={[]}
                calculateDate={calculateDate}
                parentId={comment.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default Comment;
