import React from "react";

// import Router from "../../routes/Router";

import Footer from "../componets/footer/Footer";
import Header from "../componets/header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
