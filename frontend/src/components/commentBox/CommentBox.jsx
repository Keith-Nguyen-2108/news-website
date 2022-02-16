import "./commentBox.css";
import Comments from "./Comments";

const CommentBox = () => {
  return (
    <div className="w-100 mt-4">
      <div className="header-commentbox">
        <div className="total-comment d-flex">
          <i className="far fa-comment-alt"></i>
          <p>6</p>
        </div>
        <div className="total-view d-flex">
          <i className="far fa-eye"></i>
          <p>6</p>
        </div>
      </div>
      <hr style={{ borderTop: "1px solid rgb(221, 221, 221)" }} />

      <Comments />
    </div>
  );
};

export default CommentBox;
