import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RegisterPage from "./pages/authenticationPages/RegisterPage.jsx";

import LoginPage from "./pages/authenticationPages/LoginPage.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DemoForm from "./pages/authenticationPages/DemoForm.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="demo" element={<DemoForm />} />
      </Route>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
