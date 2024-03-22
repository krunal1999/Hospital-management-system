import React from "react";

// import Router from "../../routes/Router";

import Footer from "../componets/footer/Footer";
import Header from "../componets/header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
