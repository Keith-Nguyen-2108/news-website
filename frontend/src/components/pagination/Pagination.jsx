import React from "react";
import { usePagination, DOTS } from "./usePagination";
import "./pagination.css";

const Pagination = (props) => {
  const {
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
    onChangePage,
    style
  } = props;

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  // paginationRange && console.log(paginationRange);

  if (currentPage === 0) {
    return null;
  }

  const goNextPage = () => {
    onChangePage(currentPage + 1);
  };

  const goPreviousPage = () => {
    onChangePage(currentPage - 1);
  };

  const lastPage =
    paginationRange && paginationRange[paginationRange.length - 1];

  return (
    <ul className="pagination-container pagination-bar" style={style}>
      <li
        className={`pagination-item ${currentPage === 1 && "disabled"}`}
        onClick={goPreviousPage}
      >
        <i className="fas fa-arrow-left"></i>
      </li>
      {paginationRange &&
        paginationRange.map((item) => {
          // Show dots
          if (item === DOTS) {
            return <li className="pagination-item">...</li>;
          }
          // Show page number
          return (
            <li
              className={`pagination-item ${
                item === currentPage && "selected"
              }`}
              onClick={() => onChangePage(item)}
            >
              {item}
            </li>
          );
        })}
      <li
        className={`pagination-item ${currentPage === lastPage && "disabled"}`}
        onClick={goNextPage}
      >
        <i className="fas fa-arrow-right"></i>
      </li>
    </ul>
  );
};

export default Pagination;
