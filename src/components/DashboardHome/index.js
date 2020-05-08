import React from "react";
// import EditProfile from './EditProfile'
import Nav from "../elements/nav";
import Dashboard from "./Dashboard";
import Navbar from "../Navbar";
import Orders from "../Orders/Orders";

// import Footer from '../DashboardHome/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* <Dashboard /> */}
      <Orders />
      {/* <Nav /> */}
    </div>
  );
};

export default Home;
