import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { axiosGetData, linkAvtPost } from "../components/axios";
import RightBar from "../components/rightSide/RightBar";
import "./categorypage.css";

const CategoryPage = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const history = useHistory();

  const [listPost, setListPost] = useState([]);
  const [headerPost, setHeaderPost] = useState([]);

  const cutArray = (array, size) => {
    var newArr = [];
    for (var i = 0; i < array.length; i += size) {
      newArr.push(array.slice(i, i + size));
    }
    setHeaderPost(newArr);
    setListPost(array);
  };

  useEffect(() => {
    const getPostsFollowCategory = async () => {
      await axiosGetData.get("/post/getPostsFollowCate").then((res) => {
        let value = res.data;
        value = value.filter((item) => item.cateName[0].toLowerCase() === path);
        cutArray(value[0].post, 3);
      });
    };
    getPostsFollowCategory();
  }, [path]);

  return (
    <div className="category__container">
      <h1 className="category__page__title">{path}</h1>
      <div className="category__section1 row">
        {headerPost &&
          headerPost.slice(0, 2).map((item, i) => (
            <div
              className="col-sm-12 col-xl-6"
              style={{ display: "flex", flexDirection: "column" }}
              key={i}
            >
              {item && item.length > 2 && (
                <div
                  className="category__big_image"
                  style={{
                    order: i % 2 === 0 ? 1 : 2,
                    marginTop: i % 2 !== 0 ? "30px" : null,
                    marginBottom: i % 2 === 0 ? "30px" : null,
                  }}
                >
                  <img
                    src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
                    alt="big-img"
                  />
                  <div className="category-page__short-desc">
                    <span className="category__post">{path}</span>
                    <p className="category-page__title__post">
                      {item[0].title}
                    </p>
                  </div>
                </div>
              )}
              <div
                className="small-image__container"
                style={{
                  order: i % 2 === 0 ? 2 : 1,
                }}
              >
                {item &&
                  item.length > 2 &&
                  item.slice(1, 3).map((post) => (
                    <div className="category__small_image" key={post._id}>
                      <Link to={`/article/${post._id}`}>
                        <img
                          src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
                          alt="small-img"
                        />
                        <div className="category-page__short-desc">
                          <span className="category__post">{path}</span>
                          <p className="category-page__title__post">
                            {post.title}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
      <div className="category__section2 row d-flex justify-content-between">
        <div className="col-sm-12 col-xl-9">
          <div className="category__section2__listpost mx-auto">
            {listPost &&
              listPost.splice(0, 6).map((item, index) => (
                <div
                  className="category__post__container"
                  key={index}
                  onClick={() => history.push("/article/" + item._id)}
                >
                  <img
                    className="rounded float-left category__avatar__post"
                    src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
                    alt="post-avatar"
                  />
                  <div className="category__content__post">
                    <p className="category__post__cate-name">{path}</p>
                    <p className="category__title__post">{item.title}</p>

                    <label className="category__post__created-date">
                      <b>Date: </b>
                      {new Date(item.createdAt).toDateString()}
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="col-sm-12 col-xl-3">
          <RightBar line={true} quantity={4} leftOrder={1} rightOrder={2} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
