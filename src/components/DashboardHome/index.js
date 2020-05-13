import React from "react";
import Nav from "../elements/nav";
import Dashboard from "./Dashboard";
import Navbar from "../Navbar";
import Orders from "../Orders/Orders";

const Home = () => {
  return (
    <div>
      <Navbar />

      <Orders />
    </div>
  );
};

export default Home;
