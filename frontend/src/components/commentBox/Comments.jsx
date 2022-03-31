import React, { useCallback, useEffect, useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useSelector } from "react-redux";
import { axiosGetData, linkAvt } from "../axios";

const Comments = ({ postId }) => {
  const user = useSelector((state) => state.user.user);
  const [totalComments, setTotalComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const getCommentsFollowPost = useCallback(async () => {
    await axiosGetData
      .get("/comment/getCommentsFollowPost?postID=" + postId)
      .then((comment) => {
        // console.log(comment.data);
        setTotalComments(comment.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId]);

  useEffect(() => {
    getCommentsFollowPost();
  }, [getCommentsFollowPost]);

  const highestLevelComment = totalComments.filter(
    (comment) => comment.parentID === null
  );

  const calculateDate = (oldDate) => {
    const formatDate =
      new Date().getMonth() +
      1 +
      "/" +
      new Date().getDate() +
      "/" +
      new Date().getFullYear();
    const currentDate = new Date(formatDate);
    const countDate =
      (currentDate.getTime() - oldDate.getTime()) / (1000 * 60 * 60 * 24);
    return countDate >= 1 ? countDate + " days ago" : "Today";
  };

  // const createComment = (text, parentID = null) => {
  //   return {
  //     _id: Math.floor(Math.random() * (400 - 10 + 1) + 10), // Generate a random number between 10 and 400
  //     content: text,
  //     authorID: 1,
  //     parentID,
  //     createdAt:
  //       new Date().getMonth() +
  //       1 +
  //       "/" +
  //       new Date().getDate() +
  //       "/" +
  //       new Date().getFullYear(),
  //   };
  // };

  const formatComment = (text, parentID) => {
    let comment = {
      content: text,
      authorID: user.id,
      postID: postId,
      parentID,
    };
    return comment;
  };

  const submitComment = async (newComment) => {
    try {
      const res = await axiosGetData.post("/comment/create", newComment);
      if (res.data) {
        getCommentsFollowPost();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addNewComment = (text, parentId) => {
    setActiveComment(null);
    let newComment = formatComment(text, parentId);
    if (newComment) {
      submitComment(newComment);
    }
  };

  const repliesComment = (id) => {
    let listRelies = totalComments.filter((comment) => comment.parentID === id);
    listRelies = listRelies.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return listRelies;
  };

  return (
    <div className="body-commentbox">
      {user ? (
        <div className="enter-comment">
          <img
            src={linkAvt + user.avatar}
            alt=""
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              marginRight: "20px",
              borderRadius: "50%",
            }}
          />
          <CommentForm handleSubmit={addNewComment} submitLabel="Post" />
        </div>
      ) : (
        <h6>Login to comment</h6>
      )}
      {highestLevelComment &&
        highestLevelComment.map((item) => (
          <Comment
            key={item._id}
            comment={item}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addNewComment={addNewComment}
            replies={repliesComment(item._id)}
            calculateDate={calculateDate}
          />
        ))}
    </div>
  );
};

export default Comments;
