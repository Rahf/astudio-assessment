import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const TableCategories = ({ categories = [] }) => {
  const { state, setState } = useContext(AppContext);

  const handleCategoryChange = (value) => {
    if (value === "") {
      return setState((prevState) => ({ ...prevState, productCategory: "" }));
    }
    setState((prevState) => ({ ...prevState, productCategory: value }));
  };

  return (
    <div style={{ marginLeft: "10px" }}>
      <span style={{ marginRight: "5px" }}>Category</span>
      <select onChange={(e) => handleCategoryChange(e.target.value)}>
        {[{ label: "ALL", value: "" }, ...categories].map((option) => (
          <option key={option.value} value={option.value} selected={state.product_category === option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
