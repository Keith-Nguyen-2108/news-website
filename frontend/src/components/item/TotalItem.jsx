import React, { useEffect, useState } from "react";
import "./item.css";
import { axiosGetData } from "../axios";
import useFetch from "../useFetch";

const TotalItem = ({ style }) => {
  const [totalUsers] = useFetch("/user/amountOfUsers");
  const [totalPosts] = useFetch("/post/amountOfPosts");
  const [totalViews, setTotalViews] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    // const getTotalUsers = async () => {
    //   await axiosGetData.get("/user/amountOfUsers").then((res) => {
    //     setTotalUsers(res.data);
    //   });
    // };

    // const getTotalPosts = async () => {
    //   await axiosGetData.get("/post/amountOfPosts").then((res) => {
    //     setTotalPosts(res.data);
    //   });
    // };

    const getTotalViews = async () => {
      await axiosGetData.get("/post/getAllViews").then((res) => {
        setTotalViews(res.data[0].views);
      });
    };

    const getTotalLikes = async () => {
      await axiosGetData.get("/post/getAllLikes").then((res) => {
        setTotalLikes(res.data[0].likes);
      });
    };

    // getTotalPosts();
    // getTotalUsers();
    getTotalViews();
    getTotalLikes();
  }, []);

  console.log("re-render");

  return (
    <div className="list-total-card">
      <div className="cards d-flex flex-wrap justify-content-between">
        <div className="card-total" style={style}>
          <div>
            <h1>{("0" + totalUsers).slice(-2)}</h1>
            <span>Total user</span>
          </div>
          <div>
            <i className="fas fa-users"></i>
          </div>
        </div>
        <div className="card-total" style={style}>
          <div>
            <h1>{("0" + totalPosts).slice(-2)}</h1>
            <span>Total Articles</span>
          </div>
          <div>
            <i className="fas fa-newspaper" aria-hidden="true"></i>
          </div>
        </div>
        <div className="card-total" style={style}>
          <div>
            <h1>{totalViews}</h1>
            <span>Total views</span>
          </div>
          <div>
            <i className="fas fa-book-reader" aria-hidden="true"></i>
          </div>
        </div>
        <div className="card-total" style={style}>
          <div>
            <h1>{totalLikes}</h1>
            <span>Total likes</span>
          </div>
          <div>
            <i className="far fa-thumbs-up" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalItem;
