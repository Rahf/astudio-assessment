import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Pagination = ({ currentPage, totalPages, maxDisplayPages = 5 }) => {
  const { setState } = useContext(AppContext);
  const [showAllPages, setShowAllPages] = useState(false);

  const onPageChange = (page) => {
    setState((prevState) => ({ ...prevState, currentPage: page }));
  };

  const pageLength = totalPages < maxDisplayPages ? totalPages : maxDisplayPages;
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
      <button style={{ background: "transparent" }} disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        ←
      </button>
      {Array.from({ length: !showAllPages ? pageLength : totalPages }, (_, i) => (
        <button key={i + 1} onClick={() => onPageChange(i + 1)} style={{ margin: "0 5px 5px", backgroundColor: i + 1 === currentPage ? "#fdc936" : "#ebebeb" }}>
          {i + 1}
        </button>
      ))}
      {!showAllPages && totalPages > maxDisplayPages && (
        <>
          <button style={{ background: "transparent" }} onClick={() => setShowAllPages(true)}>
            ...
          </button>
          <button onClick={() => onPageChange(totalPages)} style={{ margin: "0 5px 5px", backgroundColor: totalPages === currentPage ? "#fdc936" : "#ebebeb" }}>
            {totalPages}
          </button>
        </>
      )}
      <button style={{ background: "transparent" }} disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        →
      </button>
      {showAllPages && (
        <button style={{ background: "transparent" }} onClick={() => setShowAllPages(false)}>
          Hide Extra Pages
        </button>
      )}
    </div>
  );
};

export default Pagination;
