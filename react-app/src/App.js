import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Users from "./pages/Users";
import Products from "./pages/Products";
import { Home } from "./pages/Home";

const PAGE_LABELS = {
  "/users": "Users",
  "/products": "Products",
};

const App = () => {
  const location = useLocation();
  const pageName = location.pathname;

  return (
    <div>
      {PAGE_LABELS[pageName] && <div style={{ marginBottom: "20px" }}>Home / {PAGE_LABELS[pageName]}</div>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
};

export default App;
