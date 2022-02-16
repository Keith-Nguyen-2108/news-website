import React, { useMemo } from "react";

export const DOTS = "...";

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const pagePagination = useMemo(() => {
    const totalPage = Math.ceil(totalCount / pageSize);

    const firstPageIndex = 1;
    const lastPageIndex = totalPage;

    // Total page display includes siblingCount with firstPage + lastPage + currentPage + DOTS (left and right)
    const totalPageDisplay = siblingCount + 5;

    // If total page less than 6, we will show all pages
    if (totalPageDisplay >= totalPage) {
      return range(1, totalPage);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

    // Will show left dot if current page is equal 5
    const showLeftDot = leftSiblingIndex > 3;
    // Will show right dot if current page is equal n page - 4
    const showRightDot = rightSiblingIndex < totalPage - 2;

    // Just show right dot, like: 1 2 3 4 5 ... n
    if (!showLeftDot && showRightDot) {
      const len = 3 + 2 * siblingCount;
      const newArray = range(1, len);
      return [...newArray, DOTS, lastPageIndex];
    }
    // Just show left dot, like: 1 ... 46 47 48 49 50 (n=50)
    else if (showLeftDot && !showRightDot) {
      const len = 3 + 2 * siblingCount;
      const newArray = range(totalPage - len + 1, totalPage);
      return [firstPageIndex, DOTS, ...newArray];
    }
    // Show left and right dot, like: 1 ... 24 25 26 ... 50 .25 is current page
    else if (showLeftDot && showRightDot) {
      const middleArray = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleArray, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return pagePagination;
};
