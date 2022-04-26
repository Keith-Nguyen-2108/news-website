import React, { useEffect, useState } from "react";
import "./rightbar.css";
import { axiosGetData, linkAvtPost } from "../axios";
import { useHistory } from "react-router-dom";

const RightBar = ({ line, quantity, leftOrder, rightOrder }) => {
  const [posts, setPosts] = useState([]);
  // const pf = "http://localhost:5000/images/post/"

  useEffect(() => {
    const getArticals = async () => {
      await axiosGetData.get("/post").then((res) => {
        let value = res.data;
        value = value.sort(() => 0.5 - Math.random()).slice(0, quantity);
        setPosts(value);
      });
    };

    getArticals();
  }, [quantity]);

  let history = useHistory();

  return (
    // <div className="col-sm-12 col-xl-3">
    <div
      className="sub-news"
      // style={{
      //   backgroundColor: currentTheme.backgroundColor,
      //   color: currentTheme.color,
      // }}
    >
      {line && (
        <div className="d-flex">
          <p className="decor">Recommend </p>
        </div>
      )}

      {posts &&
        posts.map((item) => (
          <div
            className="d-flex rightbar pb-3"
            key={item._id}
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/article/${item._id}`)}
          >
            <img
              className="image-rightbar"
              src={linkAvtPost + item.avatar}
              alt=""
              style={{ order: leftOrder }}
            />
            <p
              className="title-rightbar"
              style={{
                order: rightOrder,
                margin: rightOrder === 2 ? "0 0 0 20px" : "0 20px 0 0",
              }}
            >
              {item.title.substring(0, 60) + "..."}
            </p>
          </div>
        ))}
    </div>
    // </div>
  );
};

export default RightBar;
