import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { comments } from "./listComments";
import { useSelector } from "react-redux";

const Comments = () => {
  const user = useSelector((state) => state.user.user);
  const [totalComments, setTotalComments] = useState(comments);
  const [activeComment, setActiveComment] = useState(null);
  // console.log(totalComments);
  const highestLevelComment = totalComments.filter(
    (comment) => comment.parentId === null
  );

  // console.log(highestLevelComment);

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
    return countDate > 0 ? countDate + " days ago" : "Today";
  };

  const createComment = (text, parentId = null) => {
    return {
      id: Math.floor(Math.random() * (400 - 10 + 1) + 10), // Generate a random number between 10 and 400
      content: text,
      userId: 1,
      parentId,
      createAt:
        new Date().getMonth() +
        1 +
        "/" +
        new Date().getDate() +
        "/" +
        new Date().getFullYear(),
    };
  };

  const addNewComment = (text, parentId) => {
    const newComment = createComment(text, parentId);
    // console.log(newComment);
    setTotalComments([newComment, ...totalComments]);

    setActiveComment(null);
  };

  const repliesComment = (id) => {
    let listRelies = totalComments.filter((comment) => comment.parentId === id);
    listRelies = listRelies.sort(
      (a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
    );
    return listRelies;
  };

  return (
    <div className="body-commentbox">
      {user ? (
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
          <CommentForm handleSubmit={addNewComment} submitLabel="Post" />
        </div>
      ) : (
        <h6 className="text-white">Login to comment</h6>
      )}
      {highestLevelComment &&
        highestLevelComment.map((item) => (
          <Comment
            key={item.id}
            comment={item}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addNewComment={addNewComment}
            replies={repliesComment(item.id)}
            calculateDate={calculateDate}
          />
        ))}
    </div>
  );
};

export default Comments;
