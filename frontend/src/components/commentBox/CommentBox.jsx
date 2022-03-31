import { useState } from "react";
import axiosUser from "../axios";
import "./commentBox.css";
import Comments from "./Comments";

const CommentBox = ({ postId, like, view }) => {
  const [numberOfLikes, setNumberOfLikes] = useState(like);
  // const [disabled, setDisabled] = useState(true);

  const updateLike = async () => {
    // if (disabled) {
    await axiosUser.patch("/post/updateLike/" + postId).then((res) => {
      let value = res.data;
      // console.log(value);
      setNumberOfLikes(value.like);
    });
    // setDisabled(false);
    // }
  };

  return (
    <div className="w-100 mt-4">
      <div className="header-commentbox">
        <div className="total-like d-flex">
          <i
            className="far fa-thumbs-up"
            disabled
            onClick={() => updateLike()}
          ></i>
          <p>{numberOfLikes}</p>
        </div>
        {/* <div className="total-comment d-flex">
          <i className="far fa-comment-alt"></i>
          
          <p>{like}</p>
        </div> */}
        <div className="total-view d-flex">
          <i className="far fa-eye"></i>
          <p>{view}</p>
        </div>
      </div>
      <hr style={{ borderTop: "1px solid rgb(221, 221, 221)" }} />

      <Comments postId={postId} />
    </div>
  );
};

export default CommentBox;
