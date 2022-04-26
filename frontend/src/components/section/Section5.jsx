import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Section5 = ({ posts }) => {
  const cardRef = useRef();

  const handleHover = (index) => {
    console.log(cardRef.current?.children);
    const list = cardRef.current?.children;
    for (let i = 0; i < list.length; i++) {
      list[i].className = list[i].className.replace("active", "");
    }
    // console.log(list[index].className);
    list[index].className = list[index].className + " active";
  };
  return (
    <div
      className="d-flex justify-content-start flex-wrap mt-1"
      ref={cardRef}
      id="section5"
    >
      {posts.slice(0, 4).map((item, index) => (
        <div
          className={`card card-header ${index === 0 && "active"}`}
          key={item._id}
          style={{ cursor: "pointer" }}
          onMouseOver={() => handleHover(index)}
        >
          <Link to={`/article/${item._id}`}>
            <p className="card-text card-categories">
              {item?.categoriesID.cateName}
            </p>
            <div className="card-body">
              <h5 className="card-title card-item-title">{item?.title}</h5>
              <h5
                className="card-description"
                // dangerouslySetInnerHTML={{
                //   __html: item.description.substr(0, 80) + "....",
                // }}
              >
                {item.shortDescription.substring(0, 150)}
              </h5>
              <h5 className="card-date">
                {new Date(item.createdAt).toDateString()}
              </h5>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Section5;
