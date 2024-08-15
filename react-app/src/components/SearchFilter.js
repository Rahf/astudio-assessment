import React, { useState } from "react";

const SearchFilter = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div>
      <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search..." />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchFilter;
