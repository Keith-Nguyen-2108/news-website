import React from "react";
import "./item.css";

const TotalItem = ({ style }) => {
  return (
    <div className="list-total-card">
      <div className="cards d-flex flex-wrap justify-content-between">
        <div className="card-total" style={style}>
          <div>
            <h1>09</h1>
            <span>Total reader</span>
          </div>
          <div>
            <i className="fas fa-book-reader"></i>
          </div>
        </div>
        <div className="card-total" style={style}>
          <div>
            <h1>10</h1>
            <span>Total Articles</span>
          </div>
          <div>
            <i className="fas fa-newspaper" aria-hidden="true"></i>
          </div>
        </div>
        <div className="card-total" style={style}>
          <div>
            <h1>20</h1>
            <span>Total author</span>
          </div>
          <div>
            <i className="fas fa-users" aria-hidden="true"></i>
          </div>
        </div>
        <div className="card-total" style={style}>
          <div>
            <h1>00</h1>
            <span>Total ...</span>
          </div>
          <div>
            <i className="fa fa-th-list" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalItem;
