import React from "react";
import styles from "./Pagination.module.css";

export const Pagination = ({ currentPage, onPageChange, isLastPage }) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (!isLastPage) onPageChange(currentPage + 1);
  };

  return (
    <div className={styles["pagination__main-container"]}>
      <div
        onClick={handlePrev}
        className={styles["pagination__cta-btn"]}
        style={{
          cursor: "pointer",
        }}
      >
        Previous
      </div>

      <div>{currentPage}</div>

      <div
        onClick={handleNext}
        className={styles["pagination__cta-btn"]}
        style={{
          cursor: isLastPage ? "not-allowed" : "pointer",
        }}
      >
        Next
      </div>
    </div>
  );
};
