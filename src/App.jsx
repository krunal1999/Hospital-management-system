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
import Layout from "./layout/Layout.jsx";
import Doctors from "./pages/doctor/Doctors.jsx";
import Services from "./pages/public/Services.jsx";
import Contact from "./pages/public/Contact.jsx";
import ProtectedRoute from "./layout/ProtectedRoute.jsx";
import Demo from "./pages/doctor/Demo.jsx";
import FaqItem from "./pages/public/FaqItem.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          // public routes
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="home" element={<Home />} />
          <Route path="finddoctors" element={<Doctors />} />
          {/* <Route path="doctor/:id" element={<Home />} /> */}
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />

          // protected routes
          <Route
            path="patient"
            element={<ProtectedRoute allowedRoles={["patient"]} />}
          >
            <Route path="profile" element={<Demo />} />
          </Route>



          <Route
            path="doctor"
            element={<ProtectedRoute allowedRoles={["doctor"]} />}
          >
            <Route path="profile" element={<Demo />} />
          </Route>

        </Route>

        


      </>
    )
  );

  return (
    <>
      <Provider store={store}>
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
        />
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </>
  );
}

export default App;
