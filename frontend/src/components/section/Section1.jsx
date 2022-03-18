import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosGetData, linkAvtPost } from "../axios";

const Section1 = ({ category }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const takeTheFirstThreePosts = async () => {
      await axiosGetData.get("/post/").then((res) => {
        let value = res.data.splice(0, 3);
        setPosts(value);
      });
    };
    takeTheFirstThreePosts();
  }, []);

  // console.log(posts);

  return (
    <div className=" mt-3">
      <div className="section-1">
        <ul className="section-1-list list-unstyled">
          {posts.map((item) => (
            <li className="section-1-item" key={item._id}>
              <Link to={`/article/${item._id}`}>
                <div className="d-flex">
                  <img src={linkAvtPost + item.avatar} alt="" />
                  <div className="section-1-item-content">
                    <h5>{item.categoriesID.cateName}</h5>
                    <p>{item.title}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Section1;
