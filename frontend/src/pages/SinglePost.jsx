import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CommentBox from "../components/commentBox/CommentBox";
import RightBar from "../components/rightSide/RightBar";
import "./singlePost.css";
import { axiosGetData, linkAvtPost } from "../components/axios";

const SinglePost = ({ user }) => {
  const [news, setNew] = useState({});
  // const [username, setUserName] = useState("")
  // const [description, setDesc] = useState("")

  // const postImage = "http://localhost:5000/images/post/"
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  // const getUser = async (id)=>{
  //             const user = await axios.get("/users/" + id)
  //             setUserName(user.data.username)
  // }

  useEffect(() => {
    const getNew = async () => {
      const value = await axiosGetData.get("/post/" + path);
      // console.log(value);
      setNew(value.data);
    };
    getNew();
  }, [path]);
  // console.log(news);

  return (
    <div className="container-fuild" style={{ marginTop: "-5px" }}>
      {news._id && (
        <React.Fragment>
          <img
            className="image-post"
            src={linkAvtPost + news.avatar}
            alt="image1"
          ></img>
          <div className="container">
            <div className="row d-flex justify-content-between my-5">
              <div className="col-sm-12 col-xl-9">
                <div className="post">
                  <p className="categories-post">
                    {news.categoriesID.cateName}
                  </p>
                  <p className="title-post">{news.title}</p>
                  <p className="date-post">
                    <strong>Author: {news.authorID.username}</strong>
                    <span style={{ marginLeft: "20px" }}>
                      Date: {news.createdAt}
                    </span>
                  </p>
                  <hr
                    style={{
                      borderTop: "1px dashed rgb(226, 226, 226)",
                      width: "90%",
                      margin: "3% 0%",
                    }}
                  />
                  <div className="content-post">
                    <div
                      className="description-post"
                      dangerouslySetInnerHTML={{ __html: news.description }}
                    ></div>
                    {/* 
                                                            <div className="description-post" dangerouslySetInnerHTML={{__html: news.description}}>
                                                            </div>
                                                    } */}
                  </div>
                  <CommentBox
                    postId={news._id}
                    like={news.like}
                    view={news.view}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-xl-3">
                <RightBar
                  line={true}
                  quantity={4}
                  leftOrder={1}
                  rightOrder={2}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default SinglePost;
