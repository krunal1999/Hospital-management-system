import { useEffect, useState } from "react";

import HashLoader from "react-spinners/HashLoader";
import Tabs from "./Tabs";
import AdminDoctorManagement from "./AdminDoctorManagement ";
import AdminPatientManagement from "./AdminPatientManagement";


const AdminDashboard = () => {
  const [tab, setTab] = useState("Doctor");
  const storedStatus = localStorage.getItem("status") === "true" ? true : false;

 
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
