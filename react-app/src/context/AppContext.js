import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    users: [],
    products: [],
    pageSize: 5,
    currentPage: 1,
    totalUsers: 0,
    totalProducts: 0,
    filters: [],
    productCategory: "",
  });

  return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>;
};

export default AppProvider;
