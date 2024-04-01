import { useEffect, useState } from "react";
import starIcon from "../../assets/images/Star.png";
import HashLoader from "react-spinners/HashLoader";
import Tabs from "./Tabs";
import AdminDoctorManagement from "./AdminDoctorManagement ";
import AdminPatientManagement from "./AdminPatientManagement";
// import Profile from "./Profile";
// import DoctorAbout from "../../pages/doctor/DoctorAbout";
// import Appointments from "./Appointments";
// import doctoreService from "../../services/DoctorService";
// import PatientDetails from "./PatientDetails";

const AdminDashboard = () => {
  const [tab, setTab] = useState("Doctor");

  let doctorData = JSON.parse(localStorage.getItem("user"));
  const storedStatus = localStorage.getItem("status") === "true" ? true : false;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await doctoreService.getCurrentDoctor(
  //         doctorData?.loggedUser._id
  //       );
  //       console.log(res.data.data);
  //       doctorData = { ...doctorData, loggedUser: res.data.data };
  //       localStorage.setItem("user", JSON.stringify(doctorData));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  //   return () => {};
  // }, [doctorData?.loggedUser._id]);

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {!storedStatus && (
          <div className="flex items-center justify-center w-full h-full">
            <HashLoader color="#0067FF" />
          </div>
        )}

        {storedStatus && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px] ">
            <Tabs tab={tab} setTab={setTab} />

            <div className="lg:col-span-2">
              <div className="mt-8">
                {tab === "Doctor" && <>{<AdminDoctorManagement />}</>}
                {tab === "Patient" && <>{<AdminPatientManagement />}</>}
                {tab === "Settings" && <>{`st`}</>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
