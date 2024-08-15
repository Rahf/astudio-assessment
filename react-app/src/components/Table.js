import React, { useEffect, useState } from "react";
import PageSizeDropdown from "./PageSizeDropdown";
import { TableFilters } from "./TableFilters";
import { TableCategories } from "./TableCategories";

const Table = ({ data, columns, filters = [], categories = [] }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = () => {
    // this filters entire "word"
    // const filteredUsers = state.users.filter((user) => Object.values(user).some((val) => String(val).includes(value)));
    const filtered = data.filter((row) => Object.values(row).join(" ").toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredData(filtered);
  };

  const handleKeyUpSearch = (e) => {
    if (e?.code?.toLowerCase() === "enter") {
      return handleSearch();
    }
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <PageSizeDropdown />
        <div style={{ marginLeft: "20px" }}>
          <input type="text" value={searchValue} onKeyUp={handleKeyUpSearch} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search..." />
          <button onClick={handleSearch}>Search</button>
        </div>
        <TableFilters filters={filters} />
        {categories.length > 0 && <TableCategories categories={categories} />}
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.name}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.name}>{row[col.name]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
