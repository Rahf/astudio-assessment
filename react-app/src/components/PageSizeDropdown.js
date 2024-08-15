import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const PageSizeDropdown = ({ label = "Entries" }) => {
  const { state, setState } = useContext(AppContext);

  const handlePageSizeChange = (e) => {
    const newPageSize = parseInt(e.target.value);
    setState((prevState) => ({
      ...prevState,
      pageSize: newPageSize,
      currentPage: 1, // Reset to first page when page size changes
    }));
  };

  return (
    <div>
      <select id="pageSize" value={state.pageSize} onChange={handlePageSizeChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      <label htmlFor="pageSize" style={{ marginLeft: "5px" }}>
        {label}
      </label>
    </div>
  );
};

export default PageSizeDropdown;
