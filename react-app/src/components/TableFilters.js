import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const TableFilters = ({ filters = [] }) => {
  const { state, setState } = useContext(AppContext);
  const selectedValue = state.filters[0]?.value;

  const handleFilterChange = (filter, value) => {
    if (value === "") {
      return setState((prevState) => ({ ...prevState, filters: [] }));
    }
    setState((prevState) => ({ ...prevState, filters: [{ name: filter.name, value }] }));
  };

  return (
    <div style={{ marginLeft: "20px", display: "flex" }}>
      {filters.map((filter) => (
        <div style={{ marginLeft: "10px" }} key={filter.name}>
          <span style={{ marginRight: "5px" }}>{filter.label}</span>
          <select onChange={(e) => handleFilterChange(filter, e.target.value)}>
            {[{ label: "ALL", value: "" }, ...filter.options].map((option) => (
              <option key={option.value} value={option.value} selected={selectedValue === option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};
