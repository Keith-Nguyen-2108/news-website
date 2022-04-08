import React, { useContext, useEffect, useRef, useState } from "react";
import "./search.css";
import { ThemeContext } from "../../context/Context";
import { Link, useHistory } from "react-router-dom";
import RightBar from "../rightSide/RightBar";
import { axiosGetData, linkAvtPost } from "../axios";

const SearchPopup = ({ clickToOpenSearch, isShowSearch = false, setShow }) => {
  const [{ currentComponentTheme }] = useContext(ThemeContext);

  const [top4Topic, setTop4Topic] = useState([]);
  const [top3NewestPost, setTop3NewestPost] = useState([]);

  useEffect(() => {
    const getTop4Topic = async () => {
      await axiosGetData.get("/post/groupByCategory").then((res) => {
        let value = res.data;
        setTop4Topic(value.slice(0, 4));
      });
    };

    const getTop3Posts = async () => {
      await axiosGetData.get("/post/").then((res) => {
        let value = res.data;
        setTop3NewestPost(value.slice(0, 3));
      });
    };

    getTop4Topic();
    getTop3Posts();
  }, []);

  const history = useHistory();

  const [search, setSearch] = useState("");
  const [postsAjax, setPostsAjax] = useState([]);
  const searchRef = useRef(null);
  const handleSearch = (e) => {
    let value = e.target.value;
    setSearch(value);

    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(() => {
      const ajaxPost = async () => {
        await axiosGetData.post("/post/search/?s=" + search).then((res) => {
          setPostsAjax(res.data);
        });
      };
      ajaxPost();
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(isShowSearch);
    history.push("/search/?s=" + search);
  };

  return (
    <div
      className={`search-popup ${isShowSearch === true ? "on" : ""}`}
      style={{
        backgroundColor: currentComponentTheme.backgroundColor,
        color: currentComponentTheme.color,
      }}
    >
      {/* <div className="search-popup__header"> */}
      <a href="#!" className="closebtn" onClick={clickToOpenSearch}>
        &times;
      </a>
      {/* </div> */}
      <div className="search-popup__below">
        <div className={`search-popup__form ${search.length > 0 && "active"}`}>
          <form
            id="search-main"
            // method="post"
            onSubmit={(e) => handleSubmit(e)}
            encType="multipart/form-data"
            className="d-flex"
          >
            <input
              type="text"
              placeholder="Search follow category, title post or author name"
              name="search"
              value={search}
              onChange={(e) => handleSearch(e)}
              required
            />
            <button className="btnSearch" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
          <div className="search-below-item">
            <div className="popular-post">
              <p>newest post</p>
              <ul className="list-unstyled">
                {top3NewestPost &&
                  top3NewestPost.map((post) => (
                    <li
                      className="popular-post-item"
                      key={post._id}
                      onClick={() => {
                        clickToOpenSearch();
                        history.push("/article/" + post._id);
                      }}
                    >
                      <h6>{post.title}</h6>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="popular-category">
              <p>popular categories</p>
              <ul className="list-unstyled">
                {top4Topic &&
                  top4Topic.map((topic) => (
                    <li
                      className="popular-category-item"
                      key={topic._id}
                      onClick={clickToOpenSearch}
                    >
                      <Link to={`/category/${topic.cateName[0].toLowerCase()}`}>
                        {topic.cateName[0]}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        {postsAjax.length > 0 && (
          <div
            className={`search-popup__search-results ${
              search.length > 0 && "active"
            }`}
          >
            <div style={{ opacity: 1 }}>
              <div
                className={`search-popup__search-results-content ${
                  search.length > 0 && "active"
                }`}
              >
                <div
                  className="search-popup__bg-big-post"
                  onClick={() => {
                    clickToOpenSearch();
                    history.push("/article/" + postsAjax[0]?._id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="search-popup__big-post">
                    <img
                      src={linkAvtPost + postsAjax[0]?.avatar}
                      alt=""
                      width={800}
                      height={400}
                    />
                  </div>
                  <div className="search-popup__big-post-container">
                    <div className="position-relative" style={{ width: "90%" }}>
                      <span className="category__post">
                        {postsAjax[0]?.categoriesID[0]?.cateName}
                      </span>
                      <h3 className="big-post__title__post mt-3">
                        {postsAjax[0]?.title.substring(0, 60) + "..."}
                      </h3>
                      <span className="big-post__date">
                        {new Date(postsAjax[0]?.createdAt).toUTCString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="search-popup__bg-list-post">
                  <div className="list-post__left-side">
                    <div
                      className="left-side__post"
                      onClick={() => {
                        clickToOpenSearch();
                        history.push("/article/" + postsAjax[1]?._id);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={linkAvtPost + postsAjax[1]?.avatar}
                        alt=""
                        width={800}
                        height={400}
                      />
                      <h3 className="left-side__post-title mt-3">
                        {postsAjax[1]?.title.substring(0, 60) + "..."}
                      </h3>
                    </div>
                  </div>
                  <div className="list-post__right-side">
                    <RightBar
                      line={false}
                      quantity={3}
                      leftOrder={2}
                      rightOrder={1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className="search-below">
        <div>
          <form
            id="search-main"
            method="post"
            encType="multipart/form-data"
            className="d-flex"
          >
            <input type="text" placeholder="Search.." name="search" />

            <div className="btnSearch">
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
          <div className="search-below-item">
            <div className="popular-category">
              <p>popular categories</p>
              <ul className="list-unstyled">
                <li className="popular-category-item">
                  <a href="#!">Hotel</a>
                </li>
                <li className="popular-category-item">
                  <a href="#!">Restaurant</a>
                </li>
                <li className="popular-category-item">
                  <a href="#!">Food</a>
                </li>
                <li className="popular-category-item">
                  <a href="#!">Check-in</a>
                </li>
              </ul>
            </div>
            <div className="popular-post">
              <p>popular post</p>
              <ul className="list-unstyled">
                <li className="popular-post-item">
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                </li>
                <li className="popular-post-item">
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                </li>
                <li className="popular-post-item">
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SearchPopup;
