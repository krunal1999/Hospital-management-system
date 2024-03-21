import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
//   Route,
// } from "react-router-dom";
// import RegisterPage from "./pages/authenticationPages/RegisterPage.jsx";

// import LoginPage from "./pages/authenticationPages/LoginPage.jsx";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/">
//       <Route path="register" element={<RegisterPage />} />
//       <Route path="login" element={<LoginPage />} />
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
