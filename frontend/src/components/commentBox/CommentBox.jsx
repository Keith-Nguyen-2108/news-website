import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosUser from "../axios";
import "./commentBox.css";
import Comments from "./Comments";

const CommentBox = ({ postId, like }) => {
  const [numberOfLikes, setNumberOfLikes] = useState(like);
  const [numberOfViews, setNumberOfViews] = useState("");
  // const [disabled, setDisabled] = useState(true);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (postId) {
      const updateView = async () => {
        await axiosUser.patch("/post/updateView/" + postId).then((res) => {
          let value = res.data;
          // console.log(value);
          setNumberOfViews(value.view);
        });
      };
      updateView();
    }
  }, [postId]);

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
        {user && (
          <div className="total-like d-flex">
            <i
              className="far fa-thumbs-up"
              disabled
              onClick={() => updateLike()}
            ></i>
            <p>{numberOfLikes}</p>
          </div>
        )}

        {/* <div className="total-comment d-flex">
          <i className="far fa-comment-alt"></i>
          
          <p>{like}</p>
        </div> */}
        <div className="total-view d-flex">
          <i className="far fa-eye"></i>
          <p>{numberOfViews}</p>
        </div>
      </div>
      <hr style={{ borderTop: "1px solid rgb(221, 221, 221)" }} />

      <Comments postId={postId} />
    </div>
  );
};

export default CommentBox;
