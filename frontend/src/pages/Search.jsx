import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./searchpage.css";
import { axiosGetData, linkAvtPost } from ".././components/axios";
import RightBar from "../components/rightSide/RightBar";

const Search = () => {
  const location = useLocation();
  const query = location.search;
  const search = query.split("=")[1];
  const [listPosts, setListPosts] = useState([]);

  const cutArray = (array, size) => {
    var newArr = [];
    for (var i = 0; i < array.length; i += size) {
      newArr.push(array.slice(i, i + size));
    }
    setListPosts(newArr);
  };

  useEffect(() => {
    const getPostFollowSearch = async () => {
      await axiosGetData.post("/post/search/" + query).then((res) => {
        cutArray(res.data, 2);
      });
    };
    getPostFollowSearch();
  }, [query]);

  const history = useHistory();

  return (
    <div className="search__container">
      <h1 className="search__page__title">Search: {search}</h1>

      <div className="search__page__section2 row d-flex justify-content-between">
        <div className="col-sm-12 col-xl-9">
          {listPosts.length > 0 ? (
            listPosts &&
            listPosts.map((arr, index) => (
              <div className="row__search__post" key={index}>
                {arr &&
                  arr.map((item, i) => (
                    <div
                      className="search__post__result"
                      key={item._id}
                      onClick={() => history.push("/article/" + item._id)}
                    >
                      <img
                        src={linkAvtPost + item.avatar}
                        alt="post-avatar"
                        style={{
                          width: "100%",
                          height: "300px",
                        }}
                      />
                      <p className="search__title__post">
                        <span>{item.title.substring(0, 60) + "..."}</span>
                        <span>
                          <i className="fas fa-arrow-right"></i>
                        </span>
                      </p>
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <h1 className="search__page__title">Nothing</h1>
          )}
        </div>
        <div className="col-sm-12 col-xl-3">
          <RightBar line={true} quantity={4} leftOrder={1} rightOrder={2} />
        </div>
      </div>
    </div>
  );
};

export default Search;
