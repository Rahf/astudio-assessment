import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

const PRODUCT_COLUMNS = [
  {
    name: "title",
    label: "Title",
  },
  {
    name: "brand",
    label: "Brand",
  },
  {
    name: "category",
    label: "Category",
  },
];

const PRODUCT_CATEGORIES = [
  {
    label: "Laptops",
    value: "laptops",
  },
];

const Products = () => {
  const { state, setState } = useContext(AppContext);

  const fetchProducts = async () => {
    const baseUrl = state.productCategory === "" ? "https://dummyjson.com/products" : `https://dummyjson.com/products/category/${state.productCategory}`;
    const response = await axios.get(`${baseUrl}?limit=${state.pageSize}&skip=${(state.currentPage - 1) * state.pageSize}`);
    setState((prevState) => ({
      ...prevState,
      products: response.data.products,
      totalProducts: response.data.total,
    }));
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.pageSize, state.currentPage, state.productCategory]);

  const handlePageChange = (page) => {
    setState((prevState) => ({ ...prevState, currentPage: page }));
  };

  return (
    <div>
      <Table data={state.products} columns={PRODUCT_COLUMNS} categories={PRODUCT_CATEGORIES} />
      <Pagination currentPage={state.currentPage} totalPages={Math.ceil(state.totalProducts / state.pageSize)} onPageChange={handlePageChange} />
    </div>
  );
};

export default Products;
