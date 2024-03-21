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
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import Home from "./pages/public/Home.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="demo" element={<DemoForm />} />
        <Route path="home" element={<Home />} />
      </Route>
    )
  );

  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </>
  );
}

export default App;
