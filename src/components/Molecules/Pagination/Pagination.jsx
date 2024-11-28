import React from "react";

export const Pagination = ({ currentPage, onPageChange, isLastPage }) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (!isLastPage) onPageChange(currentPage + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        margin: "16px",
      }}
    >
      <div
        onClick={handlePrev}
        style={{
          width: "8rem",
          textAlign: "center",
          border: "1px solid",
          borderRadius: "4px",
          padding: "4px",
          cursor: "pointer",
        }}
      >
        Previous
      </div>

      <div>{currentPage}</div>
      <div
        onClick={handleNext}
        style={{
          width: "8rem",
          textAlign: "center",
          border: "1px solid",
          borderRadius: "4px",
          padding: "4px",
          cursor: isLastPage ? "not-allowed" : "pointer",
        }}
      >
        Next
      </div>
    </div>
  );
};
