import React from "react";
import Header from "../../Shared/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <Header />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
