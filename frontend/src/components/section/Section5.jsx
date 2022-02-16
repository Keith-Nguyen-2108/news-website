import React, { useRef } from "react";

const Section5 = ({ category }) => {
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
      {category.slice(0, 4).map((item, index) => (
        <div
          className={`card card-header ${index === 0 && "active"}`}
          key={item.id}
          style={{ cursor: "pointer" }}
          onMouseOver={() => handleHover(index)}
        >
          <p className="card-text card-categories">{item.name}</p>
          <div className="card-body">
            <h5 className="card-title card-item-title">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </h5>
            <h5
              className="card-description"
              // dangerouslySetInnerHTML={{
              //   __html: item.description.substr(0, 80) + "....",
              // }}
            >
              Aenean vel massa semper, congue lorem fermentum, ornare eros.
              Quisque non lacinia dolor, eget tempus augue. Integer arcu justo,
              pharetra in erat eu, rhoncus tincidunt nibh.
            </h5>
            <h5 className="card-date">{new Date().toDateString()}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Section5;
