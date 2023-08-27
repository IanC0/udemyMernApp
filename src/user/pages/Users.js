import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Max Scwhartz",
      image: "https://jpeg.org/images/jpeg-home.jpg",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
