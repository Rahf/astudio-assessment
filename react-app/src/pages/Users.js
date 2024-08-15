import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

const USER_COLUMNS = [
  {
    name: "id",
    label: "ID",
  },
  {
    name: "firstName",
    label: "First Name",
  },
  {
    name: "lastName",
    label: "Last Name",
  },
  {
    name: "maidenName",
    label: "Maiden Name",
  },
  {
    name: "age",
    label: "Age",
  },
  {
    name: "gender",
    label: "Gender",
  },
  {
    name: "email",
    label: "Email",
  },
  {
    name: "username",
    label: "Username",
  },
  {
    name: "bloodGroup",
    label: "BloodGroup",
  },
  {
    name: "eyeColor",
    label: "EyeColor",
  },
];

const USER_FILTERS = [
  {
    name: "gender",
    label: "Gender",
    options: [
      {
        label: "Male",
        value: "male",
      },
      {
        label: "Female",
        value: "female",
      },
    ],
  },
  {
    name: "eyeColor",
    label: "Eye Color",
    options: [
      {
        label: "Green",
        value: "Green",
      },
      {
        label: "Red",
        value: "Red",
      },
      {
        label: "Hazel",
        value: "Hazel",
      },
      {
        label: "Amber",
        value: "Amber",
      },
    ],
  },
];

const Users = () => {
  const { state, setState } = useContext(AppContext);

  const fetchUsers = async () => {
    const pagination = `limit=${state.pageSize}&skip=${(state.currentPage - 1) * state.pageSize}`;
    let url = "";
    if (state.filters.length > 0) {
      const filter = `key=${state.filters[0].name}&value=${state.filters[0].value}`;
      url = `https://dummyjson.com/users/filter?${pagination}&${filter}`;
    } else {
      url = `https://dummyjson.com/users?${pagination}`;
    }

    const { data } = await axios.get(url);

    const parsedUsers = data.users.map((user) =>
      Object.fromEntries(
        Object.entries(user).filter(([key]) => {
          return USER_COLUMNS.map((c) => c.name).includes(key);
        })
      )
    );

    setState((prevState) => ({
      ...prevState,
      users: parsedUsers,
      totalUsers: data.total,
    }));
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.pageSize, state.currentPage, state.filters]);

  return (
    <div>
      <Table data={state.users} columns={USER_COLUMNS} filters={USER_FILTERS} />
      <Pagination currentPage={state.currentPage} totalPages={Math.ceil(state.totalUsers / state.pageSize)} />
    </div>
  );
};

export default Users;
