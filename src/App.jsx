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
import Dashboard from "./dashboard/Doctor-Account/Dashboard.jsx";
import MyAccount from "./dashboard/patient-account/MyAccount.jsx";
import DoctorDetails from "./pages/public/DoctorDetails.jsx";
import CheckoutSuccess from "./pages/public/CheckoutSuccess.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          // public routes
          <Route path="success/:id" element={<CheckoutSuccess />} />
          <Route path="cancel" element={<RegisterPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="home" element={<Home />} />
          <Route path="demo" element={<Demo />} />
          <Route path="finddoctors" element={<Doctors />} />
          <Route path="doctors/:id" element={<DoctorDetails />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          // patint protected routes
          <Route
            path="patient"
            element={<ProtectedRoute allowedRoles={["patient"]} />}
          >
            <Route path="profile" element={<MyAccount />} />
          </Route>
          // doctor protected Route
          <Route
            path="doctor"
            element={<ProtectedRoute allowedRoles={["doctor"]} />}
          >
            <Route path="profile" element={<Dashboard />} />
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
