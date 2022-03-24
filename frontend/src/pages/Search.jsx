import React from "react";
import { useLocation } from "react-router-dom";
import "./searchpage.css";
// import { axiosGetData } from ".././components/axios";
import RightBar from "../components/rightSide/RightBar";

const Search = () => {
  const location = useLocation();
  const query = location.search;
  const search = query.split("=")[1];

  // useEffect(() => {
  // const getPostFollowSearch = async () => {
  //   await axiosGetData.get("/post/search/" + query).then((res) => {
  //     console.log(res.data);
  //   });
  // };
  // getPostFollowSearch();
  // }, [query]);

  return (
    <div className="search__container">
      <h1 className="search__page__title">Search: {search}</h1>
      <div className="search__page__section2 row d-flex justify-content-between">
        <div className="col-sm-12 col-xl-9">
          {[...Array(10).keys()].map((_, index) => (
            <div className="row__search__post" key={index}>
              {[...Array(2).keys()].map((_, i) => (
                <div className="search__post__result" key={i}>
                  <img
                    src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
                    alt="post-avatar"
                    style={{
                      width: "100%",
                      height: "300px",
                    }}
                  />
                  <p className="search__title__post">
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </span>
                    <span>
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="col-sm-12 col-xl-3">
          <RightBar line={true} quantity={4} leftOrder={1} rightOrder={2} />
        </div>
      </div>
    </div>
  );
};

export default Search;
