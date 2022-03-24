import React, { useEffect, useState } from "react";
import { category } from "../slider/sliderItem";
import "./rightbar.css";

const RightBar = ({ line, quantity, leftOrder, rightOrder }) => {
  const [posts, setPosts] = useState([]);
  // const pf = "http://localhost:5000/images/post/"

  // const getArticals = async() =>{
  //         await axios
  //             .get("/posts" )
  //             .then(res=>{
  //                 let value= res.data
  //                 value = value.reverse().sort(() => 0.5 - Math.random()).slice(0,5)
  //                 setRightNews(value)

  //             })
  //     }

  useEffect(() => {
    let value = category.slice(0, quantity);
    // console.log(value);
    setPosts(value);
    // getArticals()
  }, [quantity]);

  // let history = useHistory() - onClick={ () => history.push(`/news/${item._id}`)}

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
            className="d-flex rightbar"
            key={item.id}
            style={{ cursor: "pointer" }}
          >
            <img
              className="image-rightbar"
              src={item.src}
              alt={item.src}
              style={{ order: leftOrder }}
            />
            <p
              className="title-rightbar"
              style={{
                order: rightOrder,
                margin: rightOrder === 2 ? "0 0 0 20px" : "0 20px 0 0",
              }}
            >
              Mauris eget velit porttitor, sollicitudin turpis id, viverra leo
            </p>
          </div>
        ))}
    </div>
    // </div>
  );
};

export default RightBar;
